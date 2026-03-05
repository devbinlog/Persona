import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { serverError } from "@/lib/api";

export async function GET() {
  try {
    const since = new Date();
    since.setFullYear(since.getFullYear() - 1);

    const cards = await prisma.logCard.findMany({
      where: { createdAt: { gte: since } },
      select: { payloadJson: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date → pick dominant emotion state per day
    const dayMap: Record<string, Record<string, number>> = {};
    for (const card of cards) {
      const date = card.createdAt.toISOString().split("T")[0];
      let state = "CALM";
      try {
        const payload = JSON.parse(card.payloadJson);
        state = payload.emotionState ?? "CALM";
      } catch {}
      if (!dayMap[date]) dayMap[date] = {};
      dayMap[date][state] = (dayMap[date][state] ?? 0) + 1;
    }

    const days = Object.entries(dayMap).map(([date, stateCounts]) => {
      const dominant = Object.entries(stateCounts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      );
      const count = Object.values(stateCounts).reduce((s, n) => s + n, 0);
      return { date, state: dominant[0], count };
    });

    return NextResponse.json({ days });
  } catch (e) {
    return serverError(e);
  }
}
