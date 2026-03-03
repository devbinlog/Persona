import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runCharacterSim, STYLE_PRESETS } from "@/lib/ai/character_sim";
import { zodErrorResponse, serverError } from "@/lib/api";

const SimStartSchema = z.object({
  characterIds: z.array(z.string()).min(2).max(4),
  topic: z.string().min(1).max(200),
  stylePreset: z.enum(STYLE_PRESETS).optional(),
  maxTurns: z.number().int().min(4).max(20).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SimStartSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const result = await runCharacterSim(parsed.data);

    return NextResponse.json({
      sceneId: result.sceneId,
      cardId: result.cardId,
      messages: result.messages,
      sceneSummary: result.sceneSummary,
    });
  } catch (e) {
    return serverError(e);
  }
}
