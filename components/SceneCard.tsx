"use client";
import Link from "next/link";

interface SceneCardProps {
  id: string;
  topic?: string;
  characterSlugs?: string[];
  tags?: string[];
  shortLore?: string;
  createdAt?: string;
  views?: number;
  stylePreset?: string;
}

const PRESET_COLORS: Record<string, string> = {
  "calm cinematic":  "bg-blue-50 text-blue-600",
  "spark debate":    "bg-amber-50 text-amber-600",
  "echo reflective": "bg-violet-50 text-violet-600",
  "overdrive hype":  "bg-red-50 text-red-600",
  "static minimal":  "bg-slate-50 text-slate-600",
  "hollow gentle":   "bg-gray-50 text-gray-500",
};

export default function SceneCard({
  id, topic, characterSlugs = [], tags = [],
  shortLore, createdAt, views = 0, stylePreset,
}: SceneCardProps) {
  const presetCls = stylePreset ? (PRESET_COLORS[stylePreset] ?? "bg-ep-card text-ep-muted") : "";

  return (
    <Link href={`/scenes/${id}`} className="block group">
      <div className="border border-ep-border rounded-2xl p-5 bg-white ep-card-hover space-y-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-ep-text group-hover:text-ep-accent transition-colors leading-snug">
            {topic ?? "Untitled Scene"}
          </h3>
          <span className="text-xs text-ep-faint shrink-0">{views} views</span>
        </div>

        {/* Style preset badge */}
        {stylePreset && (
          <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${presetCls}`}>
            {stylePreset}
          </span>
        )}

        {/* Short lore */}
        {shortLore && (
          <p className="text-xs text-ep-muted italic line-clamp-2">
            &ldquo;{shortLore}&rdquo;
          </p>
        )}

        {/* Characters */}
        {characterSlugs.length > 0 && (
          <div className="flex gap-1.5">
            {characterSlugs.map((slug) => (
              <span
                key={slug}
                className="text-xs px-2.5 py-0.5 rounded-full bg-ep-accent-bg text-ep-accent font-medium border border-blue-200"
              >
                {slug}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-xs text-ep-faint bg-ep-card px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {createdAt && (
          <p className="text-xs text-ep-faint">
            {new Date(createdAt).toLocaleDateString("ko-KR")}
          </p>
        )}
      </div>
    </Link>
  );
}
