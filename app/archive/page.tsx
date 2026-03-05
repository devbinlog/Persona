"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LogCard from "@/components/LogCard";
import EmotionHeatmap from "@/components/EmotionHeatmap";

const ShareCardModal = dynamic(() => import("@/components/ShareCardModal"), { ssr: false });

interface Card {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

const FILTERS = ["ALL", "DAILY", "SCENE", "SHARE"] as const;

export default function ArchivePage() {
  const [cards, setCards]     = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<(typeof FILTERS)[number]>("ALL");
  const [shareCard, setShareCard] = useState<Card | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (filter !== "ALL") params.set("type", filter);
    fetch(`/api/cards?${params}`)
      .then((r) => r.json())
      .then((d) => setCards(d.cards ?? []))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ep-text">Archive</h1>
        <p className="text-sm text-ep-muted mt-1">저장된 모든 로그 카드</p>
      </div>

      {/* Emotion Heatmap */}
      <EmotionHeatmap />

      {/* Filter */}
      <div className="bg-white rounded-2xl border border-ep-border p-1 flex gap-1 shadow-card">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
              filter === f
                ? "bg-ep-accent text-white shadow-sm"
                : "text-ep-muted hover:text-ep-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Card list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-ep-border rounded-2xl p-5 bg-white animate-pulse h-28" />
          ))}
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-ep-border">
          <span className="text-4xl">📭</span>
          <p className="text-ep-muted mt-3 text-sm">아직 저장된 카드가 없어.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="relative group">
              <LogCard
                payload={card.payload as Parameters<typeof LogCard>[0]["payload"]}
                type={card.type}
              />
              {/* Date + Share button overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-xs text-ep-faint">
                  {new Date(card.createdAt).toLocaleDateString("ko-KR")}
                </span>
                <button
                  onClick={() => setShareCard(card)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg bg-ep-accent-bg border border-blue-200 flex items-center justify-center text-ep-accent hover:bg-blue-100 text-xs"
                  title="공유 카드 만들기"
                >
                  ↑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Card Modal */}
      {shareCard && (
        <ShareCardModal
          card={shareCard}
          onClose={() => setShareCard(null)}
        />
      )}
    </div>
  );
}
