"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import EmotionBadge from "@/components/EmotionBadge";

interface SceneMessage {
  speaker: string;
  content: string;
  createdAt?: string;
}

interface Character {
  id: string;
  slug: string;
  displayNameHint: string;
  visualConfigJson: string;
}

interface SceneCard {
  sceneId?: string;
  topic?: string;
  characterSlugs?: string[];
  tags?: string[];
  shortLore?: string;
  highlightLines?: string[];
  stylePreset?: string;
  views?: number;
  likes?: number;
  createdAt?: string;
}

const SPEAKER_COLORS = [
  "text-ep-accent border-ep-accent/30 bg-ep-accent/5",
  "text-ep-spark border-ep-spark/30 bg-ep-spark/5",
  "text-ep-echo border-ep-echo/30 bg-ep-echo/5",
  "text-ep-calm border-ep-calm/30 bg-ep-calm/5",
];

export default function SceneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [sceneCard, setSceneCard] = useState<SceneCard | null>(null);
  const [messages, setMessages] = useState<SceneMessage[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Increment view count
    fetch(`/api/scenes/${id}/view`, { method: "POST" });

    fetch(`/api/scenes/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setSceneCard(d.sceneCard ?? null);
        setMessages(d.messages ?? []);
        setCharacters(d.characters ?? []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const speakerColorMap = (() => {
    const map: Record<string, string> = {};
    const speakers = [...new Set(messages.map((m) => m.speaker))];
    speakers.forEach((s, i) => {
      map[s] = SPEAKER_COLORS[i % SPEAKER_COLORS.length];
    });
    return map;
  })();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-white/5 rounded w-1/2" />
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="h-64 bg-ep-surface border border-ep-border rounded-xl" />
      </div>
    );
  }

  if (!sceneCard) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Scene을 찾을 수 없어.</p>
        <button onClick={() => router.back()} className="text-ep-accent text-sm mt-2 hover:underline">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Scene Header */}
      <div className="space-y-4">
        <button onClick={() => router.back()} className="text-gray-600 text-xs hover:text-gray-400">
          ← 목록으로
        </button>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-white leading-tight">
              {sceneCard.topic ?? "Untitled Scene"}
            </h1>
            <span className="text-xs text-gray-600 shrink-0 pt-1">
              {sceneCard.views ?? 0} views
            </span>
          </div>

          {sceneCard.stylePreset && (
            <span className="inline-block text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
              {sceneCard.stylePreset}
            </span>
          )}

          {/* Character chips */}
          {(sceneCard.characterSlugs ?? []).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {sceneCard.characterSlugs!.map((slug) => {
                const char = characters.find((c) => c.slug === slug);
                return (
                  <span
                    key={slug}
                    className="text-xs px-3 py-1 rounded-full bg-ep-accent/10 text-ep-accent border border-ep-accent/20"
                  >
                    {char?.displayNameHint ?? slug}
                  </span>
                );
              })}
            </div>
          )}

          {/* Tags */}
          {(sceneCard.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {sceneCard.tags!.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Scene Log Card */}
        <div className="border border-ep-border rounded-xl p-5 bg-ep-surface space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono uppercase">Scene Log Card</span>
          </div>

          {sceneCard.shortLore && (
            <p className="text-sm text-gray-300 italic">&ldquo;{sceneCard.shortLore}&rdquo;</p>
          )}

          {(sceneCard.highlightLines ?? []).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Highlights</p>
              {sceneCard.highlightLines!.map((line, i) => (
                <p key={i} className="text-xs text-gray-400 border-l-2 border-ep-accent/30 pl-3">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transcript */}
      {messages.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm text-gray-500 uppercase tracking-wider font-mono">Transcript</h2>
          <div className="space-y-4">
            {messages.map((msg, i) => {
              const colorClass = speakerColorMap[msg.speaker] ?? SPEAKER_COLORS[0];
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] border rounded-xl p-4 space-y-1.5 ${colorClass}`}>
                    <span className="text-xs font-mono font-bold uppercase">{msg.speaker}</span>
                    <p className="text-sm text-gray-200 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-ep-border">
        <button
          onClick={copyLink}
          className="flex-1 py-2.5 border border-ep-border rounded-lg text-sm text-gray-400 hover:border-gray-500 hover:text-white transition-all"
        >
          {copied ? "복사됨!" : "공유 링크 복사"}
        </button>
        <button
          onClick={() => router.push("/character-lounge/new")}
          className="flex-1 py-2.5 bg-ep-accent/20 border border-ep-accent/30 rounded-lg text-sm text-ep-accent hover:bg-ep-accent/30 transition-all"
        >
          새 Scene 만들기
        </button>
      </div>

      {sceneCard.createdAt && (
        <p className="text-xs text-gray-700 text-right">
          {new Date(sceneCard.createdAt).toLocaleDateString("ko-KR")}
        </p>
      )}
    </div>
  );
}
