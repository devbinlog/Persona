import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAIProvider } from "@/lib/ai/provider";
import { isSpotifyConfigured, spotifyRecommend, spotifySearch, SpotifyTrack } from "@/lib/spotify";
import { recommendBySignals } from "@/lib/recommend/seed";
import { zodErrorResponse, serverError } from "@/lib/api";

const Schema = z.object({
  description: z.string().min(1).max(500),
  limit: z.number().min(1).max(20).default(10),
});

const MOCK_VIBES = [
  {
    match: /비|rain|rainy|우중/,
    name: "빗소리와 함께하는 오후",
    mood: "빗소리처럼 차분하게 가라앉는 순간. 창가에 물방울이 맺히듯 천천히 흐르는 음악들.",
    energy: 25, valence: 0.2, genres: ["rainy-day", "acoustic", "chill"],
  },
  {
    match: /공부|study|집중|focus|work/,
    name: "딥 포커스 세션",
    mood: "소음 없이 집중력이 최고조로 올라가는 상태. 음악이 배경이 되어 생각을 정리해주는.",
    energy: 40, valence: 0.5, genres: ["study", "classical", "ambient"],
  },
  {
    match: /새벽|dawn|night|밤|자정|야간/,
    name: "새벽 세 시의 감성",
    mood: "아무도 깨어있지 않은 시간. 내면으로 깊게 들어가는 소리들.",
    energy: 20, valence: -0.2, genres: ["ambient", "sleep", "trip-hop"],
  },
  {
    match: /운동|gym|workout|달리|run/,
    name: "퍼포먼스 부스터",
    mood: "한계를 넘는 에너지. 멈추지 않겠다는 의지를 증폭시키는 비트.",
    energy: 92, valence: 0.7, genres: ["work-out", "electronic", "rock"],
  },
  {
    match: /여행|trip|드라이브|road|drive/,
    name: "끝없는 도로 위에서",
    mood: "창밖 풍경처럼 음악도 흘러가는. 목적지보다 과정이 중요한 순간.",
    energy: 65, valence: 0.6, genres: ["indie-pop", "pop", "alternative"],
  },
  {
    match: /카페|cafe|coffee|커피/,
    name: "카페 앤 솔로 워크",
    mood: "혼자지만 외롭지 않은. 주변 소음이 오히려 집중을 만들어주는 역설.",
    energy: 38, valence: 0.4, genres: ["jazz", "acoustic", "singer-songwriter"],
  },
  {
    match: /슬프|sad|우울|힘들|depressed/,
    name: "감정을 충분히 느끼는 시간",
    mood: "억누르지 말고 그냥 흘려보내기. 슬픔도 음악으로 정화될 수 있어.",
    energy: 22, valence: -0.5, genres: ["sad", "indie", "folk"],
  },
  {
    match: /행복|happy|즐거|기쁘|설레/,
    name: "기분 최고의 순간",
    mood: "이 감정을 더 길게 늘리고 싶어서. 행복은 음악으로 배가돼.",
    energy: 78, valence: 0.85, genres: ["pop", "dance", "indie-pop"],
  },
];

function buildMockVibe(description: string) {
  const lower = description.toLowerCase();
  const matched = MOCK_VIBES.find((v) => v.match.test(lower));
  if (matched) return matched;
  // default
  return {
    name: `"${description.slice(0, 20)}${description.length > 20 ? "..." : ""}" 의 플레이리스트`,
    mood: "당신이 묘사한 그 순간에 가장 잘 어울리는 곡들을 골라봤어.",
    energy: 50, valence: 0.3, genres: ["indie", "pop", "chill"],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { description, limit } = parsed.data;

    /* ── 1. AI interprets the vibe ── */
    let vibeName: string;
    let vibeMood: string;
    let energy: number;
    let valence: number;
    let genres: string[];

    const provider = getAIProvider();
    try {
      const aiResult = await provider.complete({
        messages: [
          {
            role: "system",
            content: `You are a music curator. Given a description of a moment or feeling, respond ONLY with valid JSON:
{"name":"<playlist name, max 20 chars, Korean>","mood":"<1-2 sentence Korean description of the vibe>","energy":<0-100>,"valence":<-1.0 to 1.0>,"genres":["<spotify genre 1>","<spotify genre 2>","<spotify genre 3>"]}
Valid genres: ambient, acoustic, alternative, chill, classical, dance, electronic, folk, hip-hop, indie, indie-pop, jazz, k-pop, pop, r-n-b, rock, singer-songwriter, soul, study, synth-pop, trip-hop, rainy-day, sad, work-out`,
          },
          { role: "user", content: description },
        ],
        temperature: 0.7,
        maxTokens: 200,
      });
      const raw = aiResult.content.replace(/```json\n?|\n?```/g, "").trim();
      const s = raw.indexOf("{"); const e2 = raw.lastIndexOf("}");
      const parsed2 = JSON.parse(raw.slice(s, e2 + 1));
      vibeName = parsed2.name ?? "My Vibe";
      vibeMood = parsed2.mood ?? "";
      energy   = Number(parsed2.energy ?? 50);
      valence  = Number(parsed2.valence ?? 0);
      genres   = Array.isArray(parsed2.genres) ? parsed2.genres : ["pop"];
    } catch {
      // Mock fallback
      const mock = buildMockVibe(description);
      vibeName = mock.name;
      vibeMood = mock.mood;
      energy   = mock.energy;
      valence  = mock.valence;
      genres   = mock.genres;
    }

    /* ── 2. Fetch tracks ── */
    let tracks: SpotifyTrack[];
    if (isSpotifyConfigured()) {
      try {
        // Try recommendations first, then search with description as fallback
        tracks = await spotifyRecommend({ energy, valence, genres, limit });
        if (tracks.length < 3) {
          const searched = await spotifySearch(description, limit);
          tracks = [...tracks, ...searched].slice(0, limit);
        }
      } catch {
        tracks = [];
      }
    } else {
      const seed = recommendBySignals(energy / 100, (valence + 1) / 2, genres, limit);
      tracks = seed.map((t) => ({
        id: t.id, name: t.title, artist: t.artist, album: t.genre,
        albumArt: "", previewUrl: null, spotifyUrl: "", durationMs: 0,
        popularity: Math.round((t.energy ?? 0.5) * 100),
      }));
    }

    return NextResponse.json({ name: vibeName, mood: vibeMood, energy, valence, genres, tracks });
  } catch (e) {
    return serverError(e);
  }
}
