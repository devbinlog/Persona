import EmotionBadge from "./EmotionBadge";

interface LogCardPayload {
  emotionState?: string;
  intent?: string;
  tags?: string[];
  shortLore?: string;
  topic?: string;
  highlightLines?: string[];
  recommendations?: { title: string; artist: string; genre: string }[];
}

export default function LogCard({
  payload,
  type,
}: {
  payload: LogCardPayload;
  type: string;
}) {
  return (
    <div className="border border-ep-border rounded-2xl p-5 bg-white shadow-card space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-ep-muted uppercase tracking-wider">
          {type} LOG CARD
        </span>
        {payload.emotionState && <EmotionBadge state={payload.emotionState} />}
      </div>

      {/* Topic */}
      {payload.topic && (
        <p className="text-sm text-ep-muted">
          <span className="text-ep-faint">topic · </span>
          <span className="text-ep-text font-medium">{payload.topic}</span>
        </p>
      )}

      {/* Short lore */}
      {payload.shortLore && (
        <div className="bg-ep-accent-bg rounded-xl px-4 py-3">
          <p className="text-sm text-ep-accent italic leading-relaxed">
            &ldquo;{payload.shortLore}&rdquo;
          </p>
        </div>
      )}

      {/* Highlight lines */}
      {payload.highlightLines && payload.highlightLines.length > 0 && (
        <div className="space-y-1.5">
          {payload.highlightLines.map((line, i) => (
            <p
              key={i}
              className="text-sm text-ep-muted border-l-2 border-ep-accent/40 pl-3"
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Tags */}
      {payload.tags && payload.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {payload.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-ep-accent-bg text-ep-accent font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Intent */}
      {payload.intent && (
        <p className="text-xs text-ep-faint">
          intent ·{" "}
          <span className="text-ep-muted">{payload.intent}</span>
        </p>
      )}

      {/* Recommendations inside card */}
      {payload.recommendations && payload.recommendations.length > 0 && (
        <div className="border-t border-ep-border pt-3 space-y-1">
          <p className="text-xs font-medium text-ep-muted mb-2">Recommended tracks</p>
          {payload.recommendations.slice(0, 3).map((r) => (
            <div key={r.title} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-ep-accent/40 shrink-0" />
              <span className="text-xs text-ep-text font-medium">{r.title}</span>
              <span className="text-xs text-ep-faint">— {r.artist}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
