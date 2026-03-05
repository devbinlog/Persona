"use client";
import { useState, useEffect } from "react";

interface DayData { date: string; state: string; count: number; }

const STATE_META: Record<string, { bg: string; label: string }> = {
  CALM:      { bg: "#3B82F6", label: "Calm" },
  SPARK:     { bg: "#F59E0B", label: "Spark" },
  ECHO:      { bg: "#8B5CF6", label: "Echo" },
  STATIC:    { bg: "#94A3B8", label: "Static" },
  OVERDRIVE: { bg: "#EF4444", label: "Overdrive" },
  HOLLOW:    { bg: "#D1D5DB", label: "Hollow" },
};

function buildDays(): string[] {
  const today = new Date();
  const days: string[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export default function EmotionHeatmap() {
  const [data, setData] = useState<Record<string, DayData>>({});
  const [tooltip, setTooltip] = useState<{ date: string; state: string; count: number; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch("/api/archive/heatmap")
      .then((r) => r.json())
      .then((d) => {
        const map: Record<string, DayData> = {};
        for (const day of d.days ?? []) map[day.date] = day;
        setData(map);
      })
      .catch(() => {});
  }, []);

  const allDays = buildDays();
  const firstDow = new Date(allDays[0]).getDay();

  // Build week columns
  const weeks: (string | null)[][] = [];
  let week: (string | null)[] = Array(firstDow).fill(null);
  for (const day of allDays) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  // Month labels
  const monthLabels: Map<number, string> = new Map();
  let lastMonth = -1;
  weeks.forEach((w, wi) => {
    const first = w.find(Boolean) as string | undefined;
    if (first) {
      const m = new Date(first).getMonth();
      if (m !== lastMonth) {
        monthLabels.set(wi, new Date(first).toLocaleDateString("ko-KR", { month: "short" }));
        lastMonth = m;
      }
    }
  });

  const totalDays = Object.keys(data).length;
  const dominantState = totalDays > 0
    ? Object.entries(
        Object.values(data).reduce((acc, d) => {
          acc[d.state] = (acc[d.state] ?? 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
    : null;

  return (
    <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ep-text">Emotion History</h3>
        {totalDays > 0 && (
          <span className="text-xs text-ep-muted">
            {totalDays}일 기록됨
            {dominantState && (
              <span className="ml-2 font-medium" style={{ color: STATE_META[dominantState]?.bg }}>
                · {dominantState} 多
              </span>
            )}
          </span>
        )}
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: "20px" }}>
            {weeks.map((_, wi) => (
              <div key={wi} style={{ width: "13px", marginRight: "2px", fontSize: "9px", color: "#94A3B8", textAlign: "left", whiteSpace: "nowrap" }}>
                {monthLabels.get(wi) ?? ""}
              </div>
            ))}
          </div>

          <div className="flex gap-0.5">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-0.5 mr-1">
              {["S","M","T","W","T","F","S"].map((d, i) => (
                <div key={i} style={{ width: "13px", height: "13px", fontSize: "8px", color: "#CBD5E1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i % 2 === 1 ? d : ""}
                </div>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {w.map((day, di) => {
                  if (!day) return <div key={di} style={{ width: "13px", height: "13px" }} />;
                  const d = data[day];
                  const color = d ? (STATE_META[d.state]?.bg ?? "#CBD5E1") : "#F1F3F9";
                  const opacity = d ? 1 : 0.6;
                  return (
                    <div
                      key={di}
                      style={{
                        width: "13px", height: "13px",
                        borderRadius: "3px",
                        background: color,
                        opacity,
                        cursor: d ? "pointer" : "default",
                        transition: "transform 0.1s",
                      }}
                      onMouseEnter={(e) => d && setTooltip({ ...d, x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
        >
          <div className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl">
            <p className="font-semibold" style={{ color: STATE_META[tooltip.state]?.bg ?? "white" }}>
              {tooltip.state}
            </p>
            <p className="text-gray-300 mt-0.5">{tooltip.date} · {tooltip.count}개</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 border-t border-ep-border">
        {Object.entries(STATE_META).map(([state, { bg, label }]) => (
          <div key={state} className="flex items-center gap-1.5">
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: bg, flexShrink: 0 }} />
            <span className="text-xs text-ep-muted">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#F1F3F9", border: "1px solid #E3E7F0", flexShrink: 0 }} />
          <span className="text-xs text-ep-muted">없음</span>
        </div>
      </div>
    </div>
  );
}
