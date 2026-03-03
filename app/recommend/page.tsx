"use client";
import { useState } from "react";

interface RecommendItem {
  id: string;
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  soundDescription: string;
}

const MOOD_PRESETS = [
  "조용하고 차분해",
  "슬프고 외로워",
  "신나고 에너지 넘쳐",
  "옛날 생각이 나",
  "아무 생각 없고 싶어",
  "뭔가 새로운 걸 듣고 싶어",
];

const GENRE_OPTIONS = [
  "ambient", "indie", "hip-hop", "neoclassical", "trip-hop",
  "experimental", "synth-pop", "folk", "art rock",
];

export default function RecommendPage() {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState(50);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [items, setItems] = useState<RecommendItem[]>([]);
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, energy, genres: selectedGenres }),
      });
      const data = await res.json();
      setItems(data.items ?? []);
      setIntent(data.intent ?? "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white">Music Recommend</h1>
        <p className="text-xs text-gray-500 mt-1">지금 이 순간에 가장 가까운 소리를 찾아줄게.</p>
      </div>

      {/* Mood Presets */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase tracking-wider">기분 선택 또는 직접 입력</label>
        <div className="flex flex-wrap gap-2">
          {MOOD_PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setMood(p)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                mood === p
                  ? "border-ep-accent bg-ep-accent/20 text-ep-accent"
                  : "border-ep-border text-gray-400 hover:border-gray-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="직접 기분 입력..."
          className="w-full bg-ep-surface border border-ep-border rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ep-accent/50"
        />
      </div>

      {/* Energy Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-500 uppercase tracking-wider">에너지 레벨</label>
          <span className="text-xs text-ep-accent font-mono">{energy}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full accent-ep-accent"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>조용</span>
          <span>강렬</span>
        </div>
      </div>

      {/* Genre */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase tracking-wider">장르 (선택)</label>
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((g) => (
            <button
              key={g}
              onClick={() => toggleGenre(g)}
              className={`px-2.5 py-1 rounded text-xs border transition-all ${
                selectedGenres.includes(g)
                  ? "border-ep-accent/60 bg-ep-accent/10 text-ep-accent"
                  : "border-ep-border text-gray-500 hover:border-gray-500"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={fetchRecommendations}
        disabled={loading}
        className="w-full py-2.5 bg-ep-accent text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-ep-accent/80 transition-colors"
      >
        {loading ? "찾는 중..." : "추천 받기"}
      </button>

      {/* Results */}
      {intent && (
        <p className="text-sm text-gray-300 italic border-l-2 border-ep-accent/40 pl-3">
          {intent}
        </p>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-ep-border rounded-xl p-4 bg-ep-surface space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.artist}</p>
                </div>
                <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                  {item.genre}
                </span>
              </div>
              <p className="text-sm text-gray-400">{item.soundDescription}</p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((t) => (
                  <span key={t} className="text-xs text-gray-600">#{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
