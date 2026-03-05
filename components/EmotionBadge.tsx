const STATE_STYLES: Record<string, { cls: string; label: string }> = {
  CALM:      { cls: "bg-ep-calm-bg text-ep-calm border-blue-200",           label: "CALM" },
  SPARK:     { cls: "bg-ep-spark-bg text-ep-spark border-amber-200",        label: "SPARK" },
  ECHO:      { cls: "bg-ep-echo-bg text-ep-echo border-violet-200",         label: "ECHO" },
  STATIC:    { cls: "bg-ep-static-bg text-ep-static border-slate-200",      label: "STATIC" },
  OVERDRIVE: { cls: "bg-ep-overdrive-bg text-ep-overdrive border-red-200",  label: "OVERDRIVE" },
  HOLLOW:    { cls: "bg-ep-hollow-bg text-ep-hollow border-gray-200",       label: "HOLLOW" },
};

export default function EmotionBadge({ state }: { state: string }) {
  const s = STATE_STYLES[state] ?? STATE_STYLES.CALM;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-mono font-medium ${s.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}
