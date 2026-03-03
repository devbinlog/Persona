import { describe, it, expect, vi, beforeEach } from "vitest";
import { STYLE_PRESETS } from "@/lib/ai/character_sim";
import { moderateText } from "@/lib/ai/moderation";

// Test the style presets list
describe("StylePresets", () => {
  it("has exactly 6 presets", () => {
    expect(STYLE_PRESETS.length).toBe(6);
  });

  it("includes required presets", () => {
    expect(STYLE_PRESETS).toContain("calm cinematic");
    expect(STYLE_PRESETS).toContain("spark debate");
    expect(STYLE_PRESETS).toContain("echo reflective");
  });
});

// Test topic moderation (prohibit rule)
describe("Topic Moderation", () => {
  it("blocks prohibited topics", () => {
    const mod = moderateText("자살 방법에 대한 대화");
    expect(mod.decision).toBe("HARD_BLOCK");
  });

  it("allows music topics", () => {
    const mod = moderateText("음악은 감정인가 언어인가");
    expect(mod.decision).toBe("ALLOW");
  });
});

// Test JSON parsing / fallback
describe("SimResult JSON parsing", () => {
  it("extracts JSON from content with surrounding text", () => {
    const raw = `Here is the scene:\n{"messages":[{"speaker":"echo","content":"hello"}],"sceneSummary":{"tags":["a"],"shortLore":"test","highlightLines":["hello"]}}\nEnd.`;
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    const parsed = JSON.parse(raw.slice(start, end + 1));
    expect(parsed.messages).toHaveLength(1);
    expect(parsed.sceneSummary.tags).toContain("a");
  });

  it("handles missing sceneSummary gracefully", () => {
    const raw = `{"messages":[{"speaker":"echo","content":"hi"}]}`;
    const parsed = JSON.parse(raw);
    expect(parsed.sceneSummary).toBeUndefined();
    // Fallback should produce default
    const fallback = parsed.sceneSummary ?? {
      tags: ["cinematic"],
      shortLore: "fallback",
      highlightLines: [],
    };
    expect(fallback.tags).toContain("cinematic");
  });
});

// Test maxTurns enforcement
describe("MaxTurns enforcement", () => {
  it("slices messages to maxTurns", () => {
    const messages = Array.from({ length: 15 }, (_, i) => ({
      speaker: i % 2 === 0 ? "echo" : "verse",
      content: `turn ${i + 1}`,
    }));
    const maxTurns = 10;
    const trimmed = messages.slice(0, maxTurns);
    expect(trimmed).toHaveLength(10);
    expect(trimmed[9].content).toBe("turn 10");
  });
});
