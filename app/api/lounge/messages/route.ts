import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { serverError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

    // Find lounge conversation
    const conv = await prisma.conversation.findFirst({
      where: { type: "LOUNGE" },
      orderBy: { createdAt: "asc" },
    });

    if (!conv) return NextResponse.json({ messages: [] });

    const messages = await prisma.message.findMany({
      where: { conversationId: conv.id, isFlagged: false },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { authorUser: { select: { nickname: true } } },
    });

    const result = messages.reverse().map((m) => ({
      id: m.id,
      content: m.content,
      authorNickname: m.authorUser?.nickname ?? "unknown",
      authorUserId: m.authorUserId,
      createdAt: m.createdAt.toISOString(),
    }));

    return NextResponse.json({ messages: result });
  } catch (e) {
    return serverError(e);
  }
}
