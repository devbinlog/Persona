"use client";
import { useState, useEffect } from "react";
import LogCard from "@/components/LogCard";

interface Card {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export default function ArchivePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "DAILY" | "SCENE" | "SHARE">("ALL");

  useEffect(() => {
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
        <h1 className="text-xl font-bold text-white">Archive</h1>
        <p className="text-xs text-gray-500 mt-1">저장된 모든 로그 카드</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["ALL", "DAILY", "SCENE", "SHARE"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-xs transition-all ${
              filter === f
                ? "bg-ep-accent/20 text-ep-accent border border-ep-accent/30"
                : "text-gray-500 border border-ep-border hover:border-gray-500"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-ep-border rounded-lg p-4 bg-ep-surface animate-pulse h-24" />
          ))}
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          아직 저장된 카드가 없어.
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              <LogCard payload={card.payload as Parameters<typeof LogCard>[0]["payload"]} type={card.type} />
              <span className="absolute top-3 right-3 text-xs text-gray-700">
                {new Date(card.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
