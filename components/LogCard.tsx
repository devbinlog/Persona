import EmotionBadge from "./EmotionBadge";

interface LogCardPayload {
  emotionState?: string;
  intent?: string;
  tags?: string[];
  shortLore?: string;
  timestamp?: string;
  topic?: string;
  highlightLines?: string[];
}

export default function LogCard({ payload, type }: { payload: LogCardPayload; type: string }) {
  return (
    <div className="border border-ep-border rounded-lg p-4 bg-ep-surface space-y-2">
      <div className="flex items-center gap-2 justify-between">
        <span className="text-xs text-gray-500 font-mono uppercase">{type} LOG</span>
        {payload.emotionState && <EmotionBadge state={payload.emotionState} />}
      </div>

      {payload.topic && (
        <p className="text-sm text-gray-300">
          <span className="text-gray-500">topic: </span>{payload.topic}
        </p>
      )}

      {payload.shortLore && (
        <p className="text-sm text-white italic">&ldquo;{payload.shortLore}&rdquo;</p>
      )}

      {payload.highlightLines && payload.highlightLines.length > 0 && (
        <div className="space-y-1">
          {payload.highlightLines.map((line, i) => (
            <p key={i} className="text-xs text-gray-400 border-l-2 border-ep-accent/40 pl-2">
              {line}
            </p>
          ))}
        </div>
      )}

      {payload.tags && payload.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {payload.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-ep-accent/10 text-ep-accent/80"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {payload.intent && (
        <p className="text-xs text-gray-500">intent: {payload.intent}</p>
      )}
    </div>
  );
}
