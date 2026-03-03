import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { notFound, serverError } from "@/lib/api";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const card = await prisma.logCard.findUnique({ where: { id } });
    if (!card || card.type !== "SCENE") return notFound("Scene");

    const payload = JSON.parse(card.payloadJson);
    const views = (payload.views ?? 0) + 1;
    payload.views = views;

    await prisma.logCard.update({
      where: { id },
      data: { payloadJson: JSON.stringify(payload) },
    });

    return NextResponse.json({ views });
  } catch (e) {
    return serverError(e);
  }
}
