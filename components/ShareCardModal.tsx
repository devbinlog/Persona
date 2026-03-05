"use client";
import { useRef, useState } from "react";

interface LogCardPayload {
  emotionState?: string;
  topic?: string;
  shortLore?: string;
  tags?: string[];
  intent?: string;
}

interface Props {
  card: { id: string; type: string; payload: LogCardPayload; createdAt: string };
  onClose: () => void;
}

const EMOTION_STYLES: Record<string, { gradient: string; accent: string; label: string; symbol: string }> = {
  CALM:      { gradient: "linear-gradient(135deg, #1E3A8A 0%, #0EA5E9 100%)", accent: "#BAE6FD", label: "CALM",      symbol: "◌" },
  SPARK:     { gradient: "linear-gradient(135deg, #78350F 0%, #F59E0B 100%)", accent: "#FDE68A", label: "SPARK",     symbol: "✦" },
  ECHO:      { gradient: "linear-gradient(135deg, #3B0764 0%, #8B5CF6 100%)", accent: "#DDD6FE", label: "ECHO",      symbol: "◎" },
  STATIC:    { gradient: "linear-gradient(135deg, #0F172A 0%, #64748B 100%)", accent: "#CBD5E1", label: "STATIC",    symbol: "⊟" },
  OVERDRIVE: { gradient: "linear-gradient(135deg, #450A0A 0%, #EF4444 100%)", accent: "#FCA5A5", label: "OVERDRIVE", symbol: "◈" },
  HOLLOW:    { gradient: "linear-gradient(135deg, #111827 0%, #6B7280 100%)", accent: "#E5E7EB", label: "HOLLOW",    symbol: "○" },
};

export default function ShareCardModal({ card, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const state = card.payload.emotionState ?? "CALM";
  const es = EMOTION_STYLES[state] ?? EMOTION_STYLES.CALM;
  const date = new Date(card.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric",
  });

  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `echopersona-${state.toLowerCase()}-${card.createdAt.split("T")[0]}.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 shadow-2xl w-full max-w-sm space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ep-text">공유 카드</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-ep-card text-ep-muted hover:text-ep-text transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Card preview — this div gets captured by html-to-image */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            style={{
              width: "320px",
              height: "320px",
              background: es.gradient,
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative blobs */}
            <div style={{
              position: "absolute", top: "-50px", right: "-50px",
              width: "200px", height: "200px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }} />
            <div style={{
              position: "absolute", bottom: "-70px", left: "-30px",
              width: "250px", height: "250px", borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "7px",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", color: "white", fontWeight: "700",
                }}>E</div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>
                  EchoPersona
                </span>
              </div>
              <span style={{
                fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em",
                color: es.accent,
                background: "rgba(255,255,255,0.12)",
                padding: "3px 9px", borderRadius: "20px",
              }}>
                {es.symbol} {es.label}
              </span>
            </div>

            {/* Body */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "center", gap: "12px",
              paddingTop: "12px", paddingBottom: "12px",
              position: "relative",
            }}>
              {card.payload.shortLore ? (
                <p style={{
                  fontSize: "14px", lineHeight: "1.65", color: "rgba(255,255,255,0.90)",
                  fontStyle: "italic", letterSpacing: "-0.01em",
                }}>
                  &ldquo;{card.payload.shortLore}&rdquo;
                </p>
              ) : card.payload.topic ? (
                <p style={{ fontSize: "17px", fontWeight: "600", color: "white", lineHeight: "1.4" }}>
                  {card.payload.topic}
                </p>
              ) : (
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                  {card.type} LOG
                </p>
              )}

              {card.payload.tags && card.payload.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {card.payload.tags.slice(0, 4).map((tag) => (
                    <span key={tag} style={{
                      fontSize: "10px", padding: "2px 9px", borderRadius: "20px",
                      background: "rgba(255,255,255,0.14)", color: es.accent, fontWeight: "500",
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "relative",
            }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>{date}</span>
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                echopersona.ai
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={download}
            disabled={downloading}
            className="flex-1 py-2.5 bg-ep-accent text-white rounded-xl text-sm font-semibold hover:bg-ep-accent2 transition-colors disabled:opacity-60"
          >
            {downloading ? "저장 중..." : "⬇ 이미지 저장"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-ep-card text-ep-muted rounded-xl text-sm hover:bg-ep-border transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
