import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { notFound, serverError } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const card = await prisma.logCard.findUnique({ where: { id } });
    if (!card || card.type !== "SCENE") return notFound("Scene");

    const payload = JSON.parse(card.payloadJson);
    const sceneConvId = payload.sceneId as string | undefined;

    let messages: Array<{ speaker: string; content: string; createdAt: string }> = [];
    let characters: Array<{ id: string; slug: string; displayNameHint: string; visualConfigJson: string }> = [];

    if (sceneConvId) {
      const rawMessages = await prisma.message.findMany({
        where: { conversationId: sceneConvId, authorType: "CHARACTER" },
        orderBy: { createdAt: "asc" },
        include: { authorCharacter: true },
      });

      messages = rawMessages.map((m) => ({
        speaker: m.authorCharacter?.slug ?? "unknown",
        content: m.content,
        createdAt: m.createdAt.toISOString(),
      }));

      if (payload.characterIds?.length) {
        const chars = await prisma.character.findMany({
          where: { id: { in: payload.characterIds } },
        });
        characters = chars.map((c) => ({
          id: c.id,
          slug: c.slug,
          displayNameHint: c.displayNameHint,
          visualConfigJson: c.visualConfigJson,
        }));
      }
    }

    return NextResponse.json({
      sceneCard: { id: card.id, ...payload },
      messages,
      characters,
    });
  } catch (e) {
    return serverError(e);
  }
}
