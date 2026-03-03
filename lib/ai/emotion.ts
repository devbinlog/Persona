/**
 * Emotion State Engine — Rule-based state machine.
 * Maps signal inputs to one of six emotion states.
 */

export type EmotionState = "CALM" | "SPARK" | "ECHO" | "STATIC" | "OVERDRIVE" | "HOLLOW";
export type IntentHint = "stabilize" | "discover" | "record" | "amplify" | "none";

export interface EmotionSignals {
  energy: number;       // 0-100
  valence: number;      // -1 to 1
  social: number;       // 0-100
  confidence: number;   // 0-100
  keywords: string[];
  genres: string[];
  intent_hint: IntentHint;
}

const STATIC_KEYWORDS = ["멈춤", "끊김", "아무것도", "nothing", "blank", "stop", "frozen"];

export function computeEmotionState(signals: EmotionSignals): EmotionState {
  const { energy, valence, social, confidence, keywords, intent_hint } = signals;

  // Hard rules (priority order)
  if (energy <= 25 && valence <= -0.35) return "HOLLOW";

  const hasStaticKeyword = keywords.some((k) =>
    STATIC_KEYWORDS.some((sk) => k.toLowerCase().includes(sk))
  );
  if ((social <= 20 && confidence <= 35) || hasStaticKeyword) return "STATIC";

  if (energy >= 80 && valence >= 0.25) return "OVERDRIVE";

  // Soft rules (intent_hint)
  if (intent_hint === "stabilize") return "CALM";
  if (intent_hint === "discover") return "SPARK";
  if (intent_hint === "record") return "ECHO";

  // Fallback: energy/valence nearest-neighbor
  const scores: Record<EmotionState, number> = {
    CALM: distanceTo(energy, valence, 40, 0.1),
    SPARK: distanceTo(energy, valence, 65, 0.5),
    ECHO: distanceTo(energy, valence, 35, -0.1),
    STATIC: distanceTo(energy, valence, 20, -0.5),
    OVERDRIVE: distanceTo(energy, valence, 90, 0.8),
    HOLLOW: distanceTo(energy, valence, 10, -0.8),
  };

  return (Object.entries(scores) as [EmotionState, number][]).sort(
    (a, b) => a[1] - b[1]
  )[0][0];
}

function distanceTo(e: number, v: number, te: number, tv: number): number {
  return Math.sqrt(Math.pow((e - te) / 100, 2) + Math.pow(v - tv, 2));
}

export function getStateConstraints(state: EmotionState): string {
  const constraints: Record<EmotionState, string> = {
    CALM: "Settle and organize. Do not make definitive judgments. Ask exactly one question.",
    SPARK: "Encourage discovery, light momentum. No exaggeration.",
    ECHO: "Reflective, retrospective. Do not force resolution.",
    STATIC: "Keep it short. No jokes or forced positivity.",
    OVERDRIVE: "Drive forward. Do not encourage risky behavior.",
    HOLLOW: "Be gentle and minimal. Do not over-empathize.",
  };
  return constraints[state];
}

export function getStateBadgeColor(state: EmotionState): string {
  const colors: Record<EmotionState, string> = {
    CALM: "ep-calm",
    SPARK: "ep-spark",
    ECHO: "ep-echo",
    STATIC: "ep-static",
    OVERDRIVE: "ep-overdrive",
    HOLLOW: "ep-hollow",
  };
  return colors[state];
}

export function defaultSignals(): EmotionSignals {
  return {
    energy: 50,
    valence: 0,
    social: 50,
    confidence: 50,
    keywords: [],
    genres: [],
    intent_hint: "none",
  };
}
