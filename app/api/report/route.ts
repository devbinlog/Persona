import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { zodErrorResponse, errorResponse, serverError } from "@/lib/api";

const ReportSchema = z.object({
  reporterUserId: z.string().min(1),
  targetType: z.enum(["MESSAGE", "USER", "CARD", "SCENE"]),
  targetId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ReportSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const { reporterUserId, targetType, targetId, reason } = parsed.data;

    // Ensure reporter user exists
    const reporter = await prisma.user.findUnique({ where: { id: reporterUserId } });
    if (!reporter) return errorResponse("USER_NOT_FOUND", "Reporter user not found", 404);

    // Flag message if applicable
    if (targetType === "MESSAGE") {
      await prisma.message.updateMany({
        where: { id: targetId },
        data: { isFlagged: true, flaggedReason: `Reported: ${reason}` },
      });
    }

    const report = await prisma.report.create({
      data: { reporterUserId, targetType, targetId, reason },
    });

    return NextResponse.json({ ok: true, reportId: report.id });
  } catch (e) {
    return serverError(e);
  }
}
