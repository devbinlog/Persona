import { NextRequest, NextResponse } from "next/server";
import { searchTracks } from "@/lib/recommend/seed";
import { serverError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q") ?? "";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "10"), 20);
    const results = searchTracks(q, limit);
    return NextResponse.json({ results, total: results.length, query: q });
  } catch (e) {
    return serverError(e);
  }
}
