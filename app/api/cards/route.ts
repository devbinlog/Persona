import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { serverError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

    const cards = await prisma.logCard.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({
      cards: cards.map((c) => ({
        id: c.id,
        type: c.type,
        payload: JSON.parse(c.payloadJson),
        createdAt: c.createdAt.toISOString(),
      })),
    });
  } catch (e) {
    return serverError(e);
  }
}
