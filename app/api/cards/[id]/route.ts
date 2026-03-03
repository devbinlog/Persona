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
    if (!card) return notFound("Card");

    return NextResponse.json({
      id: card.id,
      type: card.type,
      payload: JSON.parse(card.payloadJson),
      createdAt: card.createdAt.toISOString(),
    });
  } catch (e) {
    return serverError(e);
  }
}
