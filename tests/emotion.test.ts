import { describe, it, expect } from "vitest";
import { computeEmotionState, defaultSignals } from "@/lib/ai/emotion";
import type { EmotionSignals } from "@/lib/ai/emotion";

describe("EmotionStateEngine", () => {
  it("returns HOLLOW for low energy + negative valence", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      energy: 20,
      valence: -0.5,
    };
    expect(computeEmotionState(signals)).toBe("HOLLOW");
  });

  it("returns STATIC for static keyword", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      keywords: ["아무것도"],
    };
    expect(computeEmotionState(signals)).toBe("STATIC");
  });

  it("returns STATIC for low social + low confidence", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      social: 10,
      confidence: 20,
    };
    expect(computeEmotionState(signals)).toBe("STATIC");
  });

  it("returns OVERDRIVE for high energy + positive valence", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      energy: 90,
      valence: 0.8,
    };
    expect(computeEmotionState(signals)).toBe("OVERDRIVE");
  });

  it("respects intent_hint=stabilize -> CALM", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      energy: 50,
      valence: 0.0,
      intent_hint: "stabilize",
    };
    expect(computeEmotionState(signals)).toBe("CALM");
  });

  it("respects intent_hint=discover -> SPARK", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      intent_hint: "discover",
    };
    expect(computeEmotionState(signals)).toBe("SPARK");
  });

  it("respects intent_hint=record -> ECHO", () => {
    const signals: EmotionSignals = {
      ...defaultSignals(),
      intent_hint: "record",
    };
    expect(computeEmotionState(signals)).toBe("ECHO");
  });

  it("hard rules override soft rules: HOLLOW beats stabilize", () => {
    // Hard rule: energy<=25 && valence<=-0.35 => HOLLOW
    const signals: EmotionSignals = {
      ...defaultSignals(),
      energy: 15,
      valence: -0.6,
      intent_hint: "stabilize",
    };
    expect(computeEmotionState(signals)).toBe("HOLLOW");
  });
});
