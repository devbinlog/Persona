import type { EmotionState } from "@/lib/ai/emotion";

const STATE_STYLES: Record<string, string> = {
  CALM: "bg-ep-calm/20 text-ep-calm border-ep-calm/30",
  SPARK: "bg-ep-spark/20 text-ep-spark border-ep-spark/30",
  ECHO: "bg-ep-echo/20 text-ep-echo border-ep-echo/30",
  STATIC: "bg-ep-static/20 text-ep-static border-ep-static/30",
  OVERDRIVE: "bg-ep-overdrive/20 text-ep-overdrive border-ep-overdrive/30",
  HOLLOW: "bg-ep-hollow/20 text-gray-400 border-gray-600",
};

export default function EmotionBadge({ state }: { state: string }) {
  const style = STATE_STYLES[state] ?? STATE_STYLES.CALM;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${style}`}>
      {state}
    </span>
  );
}
