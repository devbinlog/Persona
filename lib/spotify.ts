/**
 * Spotify Web API — Client Credentials flow
 * Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE  = "https://api.spotify.com/v1";

// In-memory token cache (survives hot-reload in dev via global)
const g = global as typeof global & {
  _spotifyToken?: { value: string; expiresAt: number };
};

export function isSpotifyConfigured(): boolean {
  return !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET);
}

async function getToken(): Promise<string> {
  if (g._spotifyToken && Date.now() < g._spotifyToken.expiresAt - 30_000) {
    return g._spotifyToken.value;
  }
  const id     = process.env.SPOTIFY_CLIENT_ID!;
  const secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify token error: ${res.status}`);
  const data = await res.json() as { access_token: string; expires_in: number };
  g._spotifyToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return g._spotifyToken.value;
}

// ── Data types ──────────────────────────────────────────────────────────────

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string | null;
  spotifyUrl: string;
  durationMs: number;
  popularity: number;
}

function mapTrack(item: Record<string, unknown>): SpotifyTrack {
  const album = item.album as Record<string, unknown> | undefined;
  const images = (album?.images as Array<{ url: string }> | undefined) ?? [];
  const artists = (item.artists as Array<{ name: string }> | undefined) ?? [];
  const ext = item.external_urls as Record<string, string> | undefined;
  return {
    id:          String(item.id ?? ""),
    name:        String(item.name ?? ""),
    artist:      artists.map((a) => a.name).join(", "),
    album:       String(album?.name ?? ""),
    albumArt:    images[0]?.url ?? "",
    previewUrl:  (item.preview_url as string | null) ?? null,
    spotifyUrl:  ext?.spotify ?? "",
    durationMs:  Number(item.duration_ms ?? 0),
    popularity:  Number(item.popularity ?? 0),
  };
}

// ── Search ──────────────────────────────────────────────────────────────────

export async function spotifySearch(
  q: string,
  limit = 10,
  market = "KR",
): Promise<SpotifyTrack[]> {
  const token = await getToken();
  const params = new URLSearchParams({ q, type: "track", limit: String(limit), market });
  const res = await fetch(`${API_BASE}/search?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify search error: ${res.status}`);
  const data = await res.json();
  return ((data.tracks?.items ?? []) as Record<string, unknown>[]).map(mapTrack);
}

// ── Recommendations ─────────────────────────────────────────────────────────

// Subset of Spotify's valid seed genres that map well to our moods
const VALID_SEED_GENRES = new Set([
  "ambient", "acoustic", "alternative", "blues", "chill", "classical",
  "country", "dance", "electronic", "folk", "funk", "hip-hop", "indie",
  "indie-pop", "j-pop", "jazz", "k-pop", "metal", "pop", "punk", "r-n-b",
  "rock", "singer-songwriter", "soul", "study", "synth-pop", "trip-hop",
  "work-out", "sleep", "sad", "rainy-day",
]);

// Our UI genre labels → Spotify seed genres
const GENRE_MAP: Record<string, string> = {
  "neoclassical": "classical",
  "experimental": "electronic",
  "trip-hop":     "trip-hop",
};

export function toSpotifyGenres(genres: string[]): string[] {
  return genres
    .map((g) => GENRE_MAP[g] ?? g)
    .filter((g) => VALID_SEED_GENRES.has(g))
    .slice(0, 5);
}

export async function spotifyRecommend(opts: {
  energy: number;   // 0 – 100
  valence: number;  // -1 – 1  →  mapped to 0 – 1
  genres: string[];
  limit?: number;
  market?: string;
}): Promise<SpotifyTrack[]> {
  const token = await getToken();
  const { energy, valence, genres, limit = 12, market = "KR" } = opts;

  const seedGenres = toSpotifyGenres(genres);
  if (seedGenres.length === 0) seedGenres.push("pop"); // fallback

  // Map energy 0-100 → 0.0-1.0, valence -1…1 → 0.0-1.0
  const targetEnergy  = (energy / 100).toFixed(2);
  const targetValence = ((valence + 1) / 2).toFixed(2);

  const params = new URLSearchParams({
    seed_genres:    seedGenres.join(","),
    target_energy:  targetEnergy,
    target_valence: targetValence,
    limit:          String(limit),
    market,
  });

  const res = await fetch(`${API_BASE}/recommendations?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Spotify recommend error: ${res.status}`);
  const data = await res.json();
  return ((data.tracks ?? []) as Record<string, unknown>[]).map(mapTrack);
}
