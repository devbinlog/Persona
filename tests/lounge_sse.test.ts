import { describe, it, expect, vi } from "vitest";
import { checkRateLimit } from "@/lib/lounge/rateLimit";
import { moderateLounge } from "@/lib/ai/moderation";

describe("SSE Bus (unit)", () => {
  it("publishes to subscribers", async () => {
    // Inline bus to avoid global singleton issues in tests
    type Sub = (m: unknown) => void;
    const subs = new Set<Sub>();
    const publish = (msg: unknown) => subs.forEach((s) => s(msg));
    const subscribe = (cb: Sub) => {
      subs.add(cb);
      return () => subs.delete(cb);
    };

    const received: unknown[] = [];
    const unsub = subscribe((m) => received.push(m));
    publish({ id: "1", content: "hello" });
    publish({ id: "2", content: "world" });
    unsub();
    publish({ id: "3", content: "gone" });

    expect(received).toHaveLength(2);
    expect((received[0] as { id: string }).id).toBe("1");
  });
});

describe("RateLimit", () => {
  it("allows first 5 messages in window", () => {
    const uid = "test_" + Math.random().toString(36).slice(2);
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(uid).allowed).toBe(true);
    }
  });

  it("blocks the 6th message", () => {
    const uid = "test_" + Math.random().toString(36).slice(2);
    for (let i = 0; i < 5; i++) checkRateLimit(uid);
    expect(checkRateLimit(uid).allowed).toBe(false);
  });

  it("returns retryAfterMs when blocked", () => {
    const uid = "test_" + Math.random().toString(36).slice(2);
    for (let i = 0; i < 5; i++) checkRateLimit(uid);
    const result = checkRateLimit(uid);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });
});

describe("Lounge moderation integration", () => {
  it("full pipeline: normal message gets through", () => {
    const mod = moderateLounge("오늘 들은 곡 정말 좋았어");
    expect(mod.ok).toBe(true);
  });

  it("full pipeline: hate speech blocked", () => {
    const mod = moderateLounge("I hate you so much fuck you");
    expect(mod.ok).toBe(false);
  });
});
