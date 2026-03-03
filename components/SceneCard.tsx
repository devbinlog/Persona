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
  likes?: number;
}

export default function SceneCard({
  id,
  topic,
  characterSlugs = [],
  tags = [],
  shortLore,
  createdAt,
  views = 0,
}: SceneCardProps) {
  return (
    <Link href={`/scenes/${id}`} className="block group">
      <div className="border border-ep-border rounded-xl p-5 bg-ep-surface hover:border-ep-accent/50 transition-all space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-medium text-sm leading-snug group-hover:text-ep-accent transition-colors">
            {topic ?? "Untitled Scene"}
          </h3>
          <span className="text-xs text-gray-600 shrink-0">
            {views} views
          </span>
        </div>

        {shortLore && (
          <p className="text-xs text-gray-400 italic line-clamp-2">&ldquo;{shortLore}&rdquo;</p>
        )}

        {characterSlugs.length > 0 && (
          <div className="flex gap-1">
            {characterSlugs.map((slug) => (
              <span
                key={slug}
                className="text-xs px-2 py-0.5 rounded-full bg-ep-accent/10 text-ep-accent border border-ep-accent/20"
              >
                {slug}
              </span>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {createdAt && (
          <p className="text-xs text-gray-600">
            {new Date(createdAt).toLocaleDateString("ko-KR")}
          </p>
        )}
      </div>
    </Link>
  );
}
