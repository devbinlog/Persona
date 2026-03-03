import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { zodErrorResponse, errorResponse, serverError } from "@/lib/api";

const BlockSchema = z.object({
  userId: z.string().min(1),
  targetUserId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BlockSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { userId, targetUserId } = parsed.data;
    if (userId === targetUserId) {
      return errorResponse("INVALID_REQUEST", "Cannot block yourself", 400);
    }

    // Ensure both users exist
    await prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, nickname: `user_${userId.slice(0, 8)}` },
      update: {},
    });
    await prisma.user.upsert({
      where: { id: targetUserId },
      create: { id: targetUserId, nickname: `user_${targetUserId.slice(0, 8)}` },
      update: {},
    });

    await prisma.block.upsert({
      where: { userId_targetUserId: { userId, targetUserId } },
      create: { userId, targetUserId },
      update: {},
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BlockSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { userId, targetUserId } = parsed.data;

    await prisma.block.deleteMany({ where: { userId, targetUserId } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}
