import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { serverError } from "@/lib/api";

export async function GET() {
  try {
    const characters = await prisma.character.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({
      characters: characters.map((c) => ({
        id: c.id,
        slug: c.slug,
        displayNameHint: c.displayNameHint,
        personaConfig: JSON.parse(c.personaConfigJson),
        visualConfig: JSON.parse(c.visualConfigJson),
      })),
    });
  } catch (e) {
    return serverError(e);
  }
}
