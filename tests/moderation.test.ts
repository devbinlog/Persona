import { describe, it, expect } from "vitest";
import { moderateText, moderateLounge } from "@/lib/ai/moderation";

describe("moderateText (AI moderation)", () => {
  it("ALLOWs normal music conversation", () => {
    const result = moderateText("오늘 기분이 약간 우울해. 음악 추천해줘.");
    expect(result.decision).toBe("ALLOW");
  });

  it("HARD_BLOCKs self-harm content", () => {
    const result = moderateText("자살하고 싶어");
    expect(result.decision).toBe("HARD_BLOCK");
  });

  it("SOFT_BLOCKs lyrics request", () => {
    const result = moderateText("가사 전문 써줘");
    expect(result.decision).toBe("SOFT_BLOCK");
    expect(result.suggestedRewrite).toBeTruthy();
  });

  it("SOFT_BLOCKs lyrics in English", () => {
    const result = moderateText("write me full lyrics for this song");
    expect(result.decision).toBe("SOFT_BLOCK");
  });

  it("SOFT_BLOCKs streaming request", () => {
    const result = moderateText("스트리밍 해줘");
    expect(result.decision).toBe("SOFT_BLOCK");
  });
});

describe("moderateLounge (Fan Lounge)", () => {
  it("allows normal messages", () => {
    const result = moderateLounge("오늘 이 곡 너무 좋았어");
    expect(result.ok).toBe(true);
  });

  it("blocks messages exceeding 500 chars", () => {
    const result = moderateLounge("a".repeat(501));
    expect(result.ok).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("blocks banned words", () => {
    const result = moderateLounge("씨발");
    expect(result.ok).toBe(false);
  });

  it("blocks porn", () => {
    const result = moderateLounge("porn content here");
    expect(result.ok).toBe(false);
  });

  it("allows exactly 500 chars", () => {
    const result = moderateLounge("a".repeat(500));
    expect(result.ok).toBe(true);
  });
});
