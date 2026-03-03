import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sseBus, LoungeMessage } from "@/lib/lounge/sseBus";
import { moderateLounge } from "@/lib/ai/moderation";
import { checkRateLimit } from "@/lib/lounge/rateLimit";
import { zodErrorResponse, errorResponse, serverError } from "@/lib/api";

const MessageSchema = z.object({
  content: z.string().min(1).max(500),
  userId: z.string().min(1),
  nickname: z.string().min(1).max(30),
  cardId: z.string().optional(),
});

// Shared LOUNGE conversation (or get/create per-session)
async function getLoungeConversation() {
  const existing = await prisma.conversation.findFirst({
    where: { type: "LOUNGE" },
    orderBy: { createdAt: "asc" },
  });
  if (existing) return existing;
  return prisma.conversation.create({
    data: { type: "LOUNGE", updatedAt: new Date() },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MessageSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { content, userId, nickname, cardId } = parsed.data;

    // Rate limit
    const rl = checkRateLimit(userId);
    if (!rl.allowed) {
      return errorResponse(
        "RATE_LIMITED",
        `Too many messages. Retry in ${Math.ceil((rl.retryAfterMs ?? 0) / 1000)}s`,
        429
      );
    }

    // Moderation
    const mod = moderateLounge(content);
    if (!mod.ok) {
      return errorResponse("MODERATION_BLOCK", mod.reason ?? "Message blocked", 400);
    }

    // Ensure user
    await prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, nickname },
      update: { nickname },
    });

    // Get lounge conversation
    const conv = await getLoungeConversation();

    // Save message
    const msg = await prisma.message.create({
      data: {
        conversationId: conv.id,
        authorType: "USER",
        authorUserId: userId,
        content,
      },
    });

    // Build card preview if cardId provided
    let cardPreview: LoungeMessage["cardPreview"] | undefined;
    if (cardId) {
      const card = await prisma.logCard.findUnique({ where: { id: cardId } });
      if (card) {
        const payload = JSON.parse(card.payloadJson);
        cardPreview = {
          cardId: card.id,
          type: card.type,
          shortLore: payload.shortLore ?? "",
        };
      }
    }

    // Publish to SSE
    const loungeMsg: LoungeMessage = {
      id: msg.id,
      content,
      authorNickname: nickname,
      authorUserId: userId,
      createdAt: msg.createdAt.toISOString(),
      cardPreview,
    };
    sseBus.publish(loungeMsg);

    return NextResponse.json({ ok: true, messageId: msg.id });
  } catch (e) {
    return serverError(e);
  }
}
