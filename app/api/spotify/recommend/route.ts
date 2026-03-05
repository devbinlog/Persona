import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isSpotifyConfigured, spotifyRecommend } from "@/lib/spotify";
import { recommendBySignals } from "@/lib/recommend/seed";
import { zodErrorResponse, serverError } from "@/lib/api";

const Schema = z.object({
  energy:  z.number().min(0).max(100),
  valence: z.number().min(-1).max(1),
  genres:  z.array(z.string()).default([]),
  limit:   z.number().min(1).max(20).default(12),
});

// POST /api/spotify/recommend
export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { energy, valence, genres, limit } = parsed.data;

    if (isSpotifyConfigured()) {
      const tracks = await spotifyRecommend({ energy, valence, genres, limit });
      return NextResponse.json({ tracks, source: "spotify" });
    }

    // Fallback — seed data
    const seed = recommendBySignals(energy / 100, (valence + 1) / 2, genres, limit);
    const tracks = seed.map((t) => ({
      id:         t.id,
      name:       t.title,
      artist:     t.artist,
      album:      t.genre,
      albumArt:   "",
      previewUrl: null,
      spotifyUrl: "",
      durationMs: 0,
      popularity: Math.round((t.energy ?? 0.5) * 100),
    }));
    return NextResponse.json({ tracks, source: "seed" });
  } catch (e) {
    return serverError(e);
  }
}
