import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { getAIProvider } from "@/lib/ai/provider";
import { computeEmotionState, defaultSignals, getStateConstraints } from "@/lib/ai/emotion";
import { getDefaultPersonaConfig, buildSystemPrompt } from "@/lib/ai/persona";
import { getUserMemory, buildMemoryContextBlock, upsertUserMemory } from "@/lib/ai/memory";
import { moderateText } from "@/lib/ai/moderation";
import { recommendBySignals } from "@/lib/recommend/seed";

export const runtime = "nodejs";

const ChatSchema = z.object({
  message: z.string().min(1).max(1000),
  userId: z.string().min(1),
  conversationId: z.string().nullish(),
});

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) =>
        controller.enqueue(encoder.encode(sseChunk(data)));

      try {
        /* ── 1. Parse & validate ── */
        const body = await req.json().catch(() => ({}));
        const parsed = ChatSchema.safeParse(body);
        if (!parsed.success) {
          send({ type: "error", message: "잘못된 요청이야." });
          controller.close();
          return;
        }
        const { message, userId, conversationId } = parsed.data;

        /* ── 2. Moderation ── */
        const modResult = moderateText(message);
        if (modResult.decision === "HARD_BLOCK") {
          send({ type: "error", message: "⚠ 메시지가 필터링됐어. 다른 표현을 써줘." });
          controller.close();
          return;
        }

        /* ── 3. Ensure user ── */
        let user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          user = await prisma.user.create({
            data: { id: userId, nickname: `user_${userId.slice(0, 8)}` },
          });
        }

        /* ── 4. Get or create conversation ── */
        let conv = conversationId
          ? await prisma.conversation.findUnique({ where: { id: conversationId } })
          : null;
        if (!conv) {
          conv = await prisma.conversation.create({
            data: { type: "AI", ownerUserId: userId, updatedAt: new Date() },
          });
        }

        /* ── 5. Memory + emotion ── */
        const memory = await getUserMemory(userId);
        const memoryBlock = buildMemoryContextBlock(memory);
        const signals = defaultSignals();
        const emotionState = computeEmotionState(signals);
        const stateConstraint = getStateConstraints(emotionState);
        const personaConfig = getDefaultPersonaConfig();
        const systemPrompt = buildSystemPrompt(personaConfig, emotionState, stateConstraint) + memoryBlock;

        /* ── 6. Conversation history ── */
        const recentMessages = await prisma.message.findMany({
          where: { conversationId: conv.id },
          orderBy: { createdAt: "desc" },
          take: 10,
        });
        const history = recentMessages.reverse().map((m) => ({
          role: (m.authorType === "USER" ? "user" : "assistant") as "user" | "assistant",
          content: m.content,
        }));

        /* ── 7. Save user message ── */
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

        /* ── 8. AI call ── */
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

        /* ── 9. Parse AI response ── */
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

        const replyText = aiParsed.followUpQuestion
          ? `${aiParsed.reply}\n\n${aiParsed.followUpQuestion}`
          : aiParsed.reply;

        /* ── 10. Stream reply word-by-word ── */
        // Signal to client that content is starting
        send({ type: "start" });

        const tokens = replyText.match(/\S+|\s+/g) ?? [replyText];
        for (const token of tokens) {
          send({ type: "chunk", text: token });
          // Longer pause after punctuation, short pause between words
          const isPunct = /[.!?。]$/.test(token.trim());
          const isNewline = /\n/.test(token);
          const delay = isNewline ? 120 : isPunct ? 80 : 30 + Math.random() * 20;
          await wait(delay);
        }

        /* ── 11. Post-stream DB writes ── */
        const recs = recommendBySignals(signals.energy, signals.valence, signals.genres, 4);

        await prisma.message.create({
          data: { conversationId: conv.id, authorType: "AI", content: replyText },
        });

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

        await prisma.emotionState.upsert({
          where: { userId },
          create: { userId, state: emotionState, signalsJson: JSON.stringify(signals) },
          update: { state: emotionState, signalsJson: JSON.stringify(signals) },
        });

        await upsertUserMemory(userId, {
          preferences: {
            ...memory.preferences,
            moodHistory: [...(memory.preferences.moodHistory ?? []), emotionState].slice(-10),
          },
        });

        /* ── 12. Done event with metadata ── */
        send({
          type: "done",
          emotionState,
          recommendations: recs,
          conversationId: conv.id,
          logCardId: card.id,
        });
      } catch (e) {
        console.error("[chat/stream]", e);
        send({ type: "error", message: "AI 응답 중 오류가 발생했어. 다시 시도해줘." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
