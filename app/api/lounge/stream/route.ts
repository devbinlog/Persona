import { NextRequest } from "next/server";
import { sseBus } from "@/lib/lounge/sseBus";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(encoder.encode(`event: connected\ndata: {"status":"ok"}\n\n`));

      // Subscribe to SSE bus
      const unsubscribe = sseBus.subscribe((msg) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(msg)}\n\n`)
          );
        } catch {
          unsubscribe();
        }
      });

      // Heartbeat every 25 seconds
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`:heartbeat\n\n`));
        } catch {
          clearInterval(heartbeat);
          unsubscribe();
        }
      }, 25_000);

      // Cleanup on close
      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
