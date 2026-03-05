import { NextRequest, NextResponse } from "next/server";
import { isSpotifyConfigured, spotifySearch } from "@/lib/spotify";
import { searchTracks as seedSearch } from "@/lib/recommend/seed";
import { serverError } from "@/lib/api";

// GET /api/spotify/search?q=...&limit=10
export async function GET(req: NextRequest) {
  try {
    const q     = req.nextUrl.searchParams.get("q")?.trim() ?? "";
    const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? "12"), 20);

    if (!q) return NextResponse.json({ tracks: [], total: 0 });

    if (isSpotifyConfigured()) {
      const tracks = await spotifySearch(q, limit);
      return NextResponse.json({ tracks, total: tracks.length, source: "spotify" });
    }

    // Fallback — seed data (converted to similar shape)
    const seed = seedSearch(q, limit);
    const tracks = seed.map((t) => ({
      id:         t.id,
      name:       t.title,
      artist:     t.artist,
      album:      t.genre,
      albumArt:   "",
      previewUrl: null,
      spotifyUrl: "",
      durationMs: 0,
      popularity: Math.round(t.energy ?? 50),
    }));
    return NextResponse.json({ tracks, total: tracks.length, source: "seed" });
  } catch (e) {
    return serverError(e);
  }
}
