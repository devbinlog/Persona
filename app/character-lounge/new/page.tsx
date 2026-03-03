"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacterChip from "@/components/CharacterChip";

interface Character {
  id: string;
  slug: string;
  displayNameHint: string;
}

const STYLE_PRESETS = [
  { value: "calm cinematic", label: "Calm Cinematic", desc: "조용하고 영화적인 분위기" },
  { value: "spark debate", label: "Spark Debate", desc: "긴장감 있는 토론" },
  { value: "echo reflective", label: "Echo Reflective", desc: "회고와 반향" },
  { value: "overdrive hype", label: "Overdrive Hype", desc: "폭발적인 에너지" },
  { value: "static minimal", label: "Static Minimal", desc: "침묵과 여백" },
  { value: "hollow gentle", label: "Hollow Gentle", desc: "부드럽고 허전한" },
] as const;

export default function NewScenePage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<string>("calm cinematic");
  const [maxTurns, setMaxTurns] = useState(10);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/characters")
      .then((r) => r.json())
      .then((d) => setCharacters(d.characters ?? []))
      .catch(() => setCharacters([]));
  }, []);

  const toggleChar = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleCreate = async () => {
    if (selectedIds.length < 2) {
      setError("캐릭터를 2명 이상 선택해야 해.");
      return;
    }
    if (!topic.trim()) {
      setError("주제를 입력해줘.");
      return;
    }
    setError("");
    setLoading(true);
    setProgress(["Scene 생성 시작..."]);

    try {
      const res = await fetch("/api/sim/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterIds: selectedIds,
          topic: topic.trim(),
          stylePreset: style,
          maxTurns,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        setLoading(false);
        return;
      }
      setProgress((p) => [...p, `Scene 저장 완료 (${data.messages?.length ?? 0}턴)`, "관전 페이지로 이동 중..."]);
      router.push(`/scenes/${data.cardId}`);
    } catch {
      setError("생성 중 오류가 발생했어.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-white">New Scene</h1>
        <p className="text-xs text-gray-500 mt-1">캐릭터-캐릭터 대화 생성</p>
      </div>

      {/* Character Selection */}
      <div className="space-y-3">
        <label className="text-xs text-gray-500 uppercase tracking-wider">
          캐릭터 선택 (2명 이상)
        </label>
        {characters.length === 0 ? (
          <p className="text-sm text-gray-500">
            캐릭터가 없어. seed 스크립트를 먼저 실행해줘:{" "}
            <code className="text-ep-accent text-xs">npm run db:seed</code>
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {characters.map((c) => (
              <CharacterChip
                key={c.id}
                slug={c.slug}
                displayName={c.displayNameHint}
                selected={selectedIds.includes(c.id)}
                onClick={() => toggleChar(c.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase tracking-wider">주제</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="ex) 음악은 언어인가 감정인가?"
          maxLength={200}
          className="w-full bg-ep-surface border border-ep-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ep-accent/50"
        />
      </div>

      {/* Style Preset */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase tracking-wider">Style Preset</label>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_PRESETS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`p-3 rounded-lg border text-left transition-all ${
                style === s.value
                  ? "border-ep-accent bg-ep-accent/10"
                  : "border-ep-border hover:border-gray-500"
              }`}
            >
              <p className={`text-xs font-medium ${style === s.value ? "text-ep-accent" : "text-white"}`}>
                {s.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Max Turns */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-500 uppercase tracking-wider">최대 턴 수</label>
          <span className="text-xs text-ep-accent font-mono">{maxTurns}</span>
        </div>
        <input
          type="range"
          min={4}
          max={20}
          value={maxTurns}
          onChange={(e) => setMaxTurns(Number(e.target.value))}
          className="w-full accent-ep-accent"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>짧게 (4)</span>
          <span>길게 (20)</span>
        </div>
      </div>

      {error && (
        <p className="text-xs text-ep-overdrive bg-ep-overdrive/10 border border-ep-overdrive/20 rounded px-3 py-2">
          {error}
        </p>
      )}

      {loading && progress.length > 0 && (
        <div className="space-y-1 border border-ep-border rounded-lg p-3 bg-ep-surface">
          {progress.map((p, i) => (
            <p key={i} className="text-xs text-gray-400 font-mono">
              {i === progress.length - 1 ? "► " : "✓ "}{p}
            </p>
          ))}
        </div>
      )}

      <button
        onClick={handleCreate}
        disabled={loading || selectedIds.length < 2 || !topic.trim()}
        className="w-full py-3 bg-ep-accent text-white rounded-lg font-medium disabled:opacity-40 hover:bg-ep-accent/80 transition-colors"
      >
        {loading ? "Scene 생성 중..." : "Scene 생성"}
      </button>
    </div>
  );
}
