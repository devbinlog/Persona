import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { errorResponse, zodErrorResponse, serverError } from "@/lib/api";

const SaveSchema = z.object({
  displayName: z.string().min(1).max(30),
  hair:  z.string().min(1),
  face:  z.string().min(1),
  body:  z.string().min(1),
  color: z.string().min(1),
  skin:  z.string().optional(),
  persona: z.string().max(200).optional(),
});

// GET /api/ai-design — list all custom characters
export async function GET() {
  try {
    const chars = await prisma.character.findMany({
      where: { slug: { startsWith: "custom_" } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    const list = chars.map((c) => ({
      id: c.id,
      slug: c.slug,
      displayNameHint: c.displayNameHint,
      visualConfig: JSON.parse(c.visualConfigJson),
      personaConfig: JSON.parse(c.personaConfigJson),
      createdAt: c.createdAt.toISOString(),
    }));
    return NextResponse.json({ characters: list });
  } catch (e) {
    return serverError(e);
  }
}

// POST /api/ai-design — create and save a custom character
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SaveSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { displayName, hair, face, body: bodyStyle, color, skin, persona } = parsed.data;

    // Build a unique slug
    const slug = "custom_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);

    const visualConfig = { hair, face, body: bodyStyle, color, skin };
    const personaConfig = {
      persona: persona ?? "자유로운 감성을 가진 캐릭터.",
      traits: ["창의적", "개성적"],
    };

    const character = await prisma.character.create({
      data: {
        slug,
        displayNameHint: displayName,
        visualConfigJson: JSON.stringify(visualConfig),
        personaConfigJson: JSON.stringify(personaConfig),
      },
    });

    return NextResponse.json({
      character: {
        id: character.id,
        slug: character.slug,
        displayNameHint: character.displayNameHint,
        visualConfig,
        personaConfig,
        createdAt: character.createdAt.toISOString(),
      },
    }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}

// DELETE /api/ai-design?id=xxx
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return errorResponse("VALIDATION_ERROR", "id is required", 400);

    const char = await prisma.character.findUnique({ where: { id } });
    if (!char) return errorResponse("NOT_FOUND", "Character not found", 404);
    if (!char.slug.startsWith("custom_"))
      return errorResponse("FORBIDDEN", "Cannot delete built-in characters", 403);

    await prisma.character.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}
