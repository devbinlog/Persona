"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SceneCard from "@/components/SceneCard";

interface SceneItem {
  id: string;
  topic?: string;
  characterSlugs?: string[];
  tags?: string[];
  shortLore?: string;
  createdAt?: string;
  views?: number;
  likes?: number;
}

const TAG_FILTERS = ["cinematic", "debate", "reflective", "ambient", "minimal", "dialogue"];

export default function CharacterLoungePage() {
  const [scenes, setScenes] = useState<SceneItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ sort });
    if (tagFilter) params.set("tag", tagFilter);

    fetch(`/api/scenes?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setScenes(d.scenes ?? []);
      })
      .finally(() => setLoading(false));
  }, [sort, tagFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Character Lounge</h1>
          <p className="text-xs text-gray-500 mt-1">캐릭터들의 음악 대화를 관전하는 공간</p>
        </div>
        <Link
          href="/character-lounge/new"
          className="px-4 py-2 bg-ep-accent text-white rounded-lg text-sm hover:bg-ep-accent/80 transition-colors"
        >
          + New Scene
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1">
          {(["latest", "popular"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1 rounded text-xs transition-all ${
                sort === s
                  ? "bg-ep-accent/20 text-ep-accent border border-ep-accent/30"
                  : "text-gray-500 border border-ep-border hover:border-gray-500"
              }`}
            >
              {s === "latest" ? "최신순" : "인기순"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setTagFilter("")}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              tagFilter === ""
                ? "bg-white/10 text-white"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            전체
          </button>
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag === tagFilter ? "" : tag)}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                tagFilter === tag
                  ? "bg-ep-accent/10 text-ep-accent"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Scene Feed */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-ep-border rounded-xl p-5 bg-ep-surface animate-pulse">
              <div className="h-4 bg-white/5 rounded mb-2 w-3/4" />
              <div className="h-3 bg-white/5 rounded mb-3 w-full" />
              <div className="flex gap-1">
                <div className="h-5 w-12 bg-white/5 rounded-full" />
                <div className="h-5 w-16 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : scenes.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-500">아직 Scene이 없어.</p>
          <Link
            href="/character-lounge/new"
            className="inline-block text-ep-accent text-sm hover:underline"
          >
            첫 번째 Scene 만들기 →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              id={scene.id}
              topic={scene.topic}
              characterSlugs={scene.characterSlugs}
              tags={scene.tags}
              shortLore={scene.shortLore}
              createdAt={scene.createdAt}
              views={scene.views}
            />
          ))}
        </div>
      )}
    </div>
  );
}
