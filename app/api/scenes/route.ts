import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { serverError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const sort = searchParams.get("sort") ?? "latest";
    const characterId = searchParams.get("characterId") ?? "";
    const tag = searchParams.get("tag") ?? "";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

    const cards = await prisma.logCard.findMany({
      where: { type: "SCENE" },
      orderBy: { createdAt: "desc" },
      take: 200, // fetch more for filtering
    });

    let scenes = cards.map((c) => {
      const payload = JSON.parse(c.payloadJson);
      return { id: c.id, ...payload, cardCreatedAt: c.createdAt.toISOString() };
    });

    // Filter by tag
    if (tag) {
      scenes = scenes.filter((s) =>
        (s.tags ?? []).some((t: string) => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // Filter by characterId
    if (characterId) {
      scenes = scenes.filter((s) =>
        (s.characterIds ?? []).includes(characterId)
      );
    }

    // Sort
    if (sort === "popular") {
      scenes = scenes.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    } else {
      scenes = scenes.sort(
        (a, b) =>
          new Date(b.createdAt ?? b.cardCreatedAt).getTime() -
          new Date(a.createdAt ?? a.cardCreatedAt).getTime()
      );
    }

    return NextResponse.json({ scenes: scenes.slice(0, limit) });
  } catch (e) {
    return serverError(e);
  }
}
