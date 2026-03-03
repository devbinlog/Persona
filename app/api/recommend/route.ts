import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recommendBySignals } from "@/lib/recommend/seed";
import { getAIProvider } from "@/lib/ai/provider";
import { buildRecommendPrompt } from "@/lib/ai/prompts";
import { zodErrorResponse, serverError } from "@/lib/api";

const RecommendSchema = z.object({
  mood: z.string().max(200).optional(),
  energy: z.number().min(0).max(100).optional(),
  genres: z.array(z.string()).max(5).optional(),
  userId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RecommendSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { mood = "", energy = 50, genres = [] } = parsed.data;

    // Map mood string to approximate valence
    const valence = moodToValence(mood);
    const items = recommendBySignals(energy, valence, genres, 5);

    // Build narrative with AI (optional — falls back gracefully)
    const charName = process.env.CHAR_NAME ?? "Echo";
    let intent =
      "지금 이 감정에 가장 가까운 소리들을 골랐어. 틀고 그냥 놔둬 봐.";

    try {
      const provider = getAIProvider();
      const prompt = buildRecommendPrompt(mood, energy, genres, charName);
      const res = await provider.complete({
        messages: [
          { role: "system", content: "Output strict JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        maxTokens: 800,
      });
      const cleaned = res.content.replace(/```json\n?|\n?```/g, "").trim();
      const s = cleaned.indexOf("{");
      const e = cleaned.lastIndexOf("}");
      const aiParsed = JSON.parse(cleaned.slice(s, e + 1));
      if (aiParsed.intent) intent = aiParsed.intent;
    } catch {
      // Use fallback intent
    }

    return NextResponse.json({
      items: items.map((t) => ({
        id: t.id,
        title: t.title,
        artist: t.artist,
        genre: t.genre,
        tags: t.tags,
        soundDescription: t.soundDescription,
      })),
      intent,
    });
  } catch (e) {
    return serverError(e);
  }
}

function moodToValence(mood: string): number {
  const lower = mood.toLowerCase();
  if (
    lower.includes("슬프") ||
    lower.includes("sad") ||
    lower.includes("lonely") ||
    lower.includes("외로")
  )
    return -0.5;
  if (
    lower.includes("신나") ||
    lower.includes("happy") ||
    lower.includes("excited") ||
    lower.includes("즐거")
  )
    return 0.6;
  if (lower.includes("화") || lower.includes("angry") || lower.includes("frustrated"))
    return -0.2;
  if (lower.includes("평온") || lower.includes("calm") || lower.includes("relaxed"))
    return 0.2;
  return 0;
}
