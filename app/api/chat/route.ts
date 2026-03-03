import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { getAIProvider } from "@/lib/ai/provider";
import { computeEmotionState, defaultSignals, getStateConstraints } from "@/lib/ai/emotion";
import { getDefaultPersonaConfig, buildSystemPrompt } from "@/lib/ai/persona";
import { getUserMemory, buildMemoryContextBlock, upsertUserMemory } from "@/lib/ai/memory";
import { moderateText } from "@/lib/ai/moderation";
import { recommendBySignals } from "@/lib/recommend/seed";
import { errorResponse, zodErrorResponse, serverError } from "@/lib/api";

const ChatSchema = z.object({
  message: z.string().min(1).max(1000),
  userId: z.string().min(1),
  conversationId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ChatSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { message, userId, conversationId } = parsed.data;

    // Moderation check
    const modResult = moderateText(message);
    if (modResult.decision === "HARD_BLOCK") {
      return errorResponse("MODERATION_BLOCK", "Message blocked by safety filter", 400, {
        suggestedRewrite: modResult.suggestedRewrite,
      });
    }

    // Ensure user exists
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: { id: userId, nickname: `user_${userId.slice(0, 8)}` },
      });
    }

    // Get or create conversation
    let conv = conversationId
      ? await prisma.conversation.findUnique({ where: { id: conversationId } })
      : null;
    if (!conv) {
      conv = await prisma.conversation.create({
        data: { type: "AI", ownerUserId: userId, updatedAt: new Date() },
      });
    }

    // Load memory
    const memory = await getUserMemory(userId);
    const memoryBlock = buildMemoryContextBlock(memory);

    // Compute emotion state from signals (simple keyword parse for MVP)
    const signals = defaultSignals();
    const emotionState = computeEmotionState(signals);
    const stateConstraint = getStateConstraints(emotionState);

    // Build prompt
    const personaConfig = getDefaultPersonaConfig();
    const systemPrompt = buildSystemPrompt(personaConfig, emotionState, stateConstraint) + memoryBlock;

    // Get recent conversation history
    const recentMessages = await prisma.message.findMany({
      where: { conversationId: conv.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    const history = recentMessages
      .reverse()
      .map((m) => ({
        role: (m.authorType === "USER" ? "user" : "assistant") as "user" | "assistant",
        content: m.content,
      }));

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: conv.id,
        authorType: "USER",
        authorUserId: userId,
        content: message,
        isFlagged: modResult.decision === "SOFT_BLOCK",
        flaggedReason: modResult.decision === "SOFT_BLOCK" ? modResult.reasons[0] : null,
      },
    });

    // AI call
    const provider = getAIProvider();
    const aiResult = await provider.complete({
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.7,
      maxTokens: 1024,
    });

    // Parse AI response
    let aiParsed: {
      reply: string;
      followUpQuestion: string | null;
      recommendationNarrative: string;
      logCard: { emotionState: string; intent: string; tags: string[]; shortLore: string };
    };

    try {
      const cleaned = aiResult.content.replace(/```json\n?|\n?```/g, "").trim();
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      aiParsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      aiParsed = {
        reply: aiResult.content,
        followUpQuestion: null,
        recommendationNarrative: "음악으로 이야기해보자.",
        logCard: {
          emotionState,
          intent: "record",
          tags: ["ambient"],
          shortLore: "지금 이 순간을 소리로 기억한다.",
        },
      };
    }

    const replyText =
      aiParsed.followUpQuestion
        ? `${aiParsed.reply}\n\n${aiParsed.followUpQuestion}`
        : aiParsed.reply;

    // Save AI message
    await prisma.message.create({
      data: {
        conversationId: conv.id,
        authorType: "AI",
        content: replyText,
      },
    });

    // Music recommendations
    const recs = recommendBySignals(signals.energy, signals.valence, signals.genres, 4);

    // Save LogCard
    const card = await prisma.logCard.create({
      data: {
        type: "DAILY",
        userId,
        conversationId: conv.id,
        payloadJson: JSON.stringify({
          ...aiParsed.logCard,
          recommendationNarrative: aiParsed.recommendationNarrative,
          recommendations: recs.map((r) => ({ title: r.title, artist: r.artist, genre: r.genre })),
          timestamp: new Date().toISOString(),
        }),
      },
    });

    // Update emotion state
    await prisma.emotionState.upsert({
      where: { userId },
      create: { userId, state: emotionState, signalsJson: JSON.stringify(signals) },
      update: { state: emotionState, signalsJson: JSON.stringify(signals) },
    });

    // Update memory
    await upsertUserMemory(userId, {
      preferences: {
        ...memory.preferences,
        moodHistory: [...(memory.preferences.moodHistory ?? []), emotionState].slice(-10),
      },
    });

    return NextResponse.json({
      reply: replyText,
      emotionState,
      recommendations: recs,
      logCardId: card.id,
      conversationId: conv.id,
    });
  } catch (e) {
    return serverError(e);
  }
}
