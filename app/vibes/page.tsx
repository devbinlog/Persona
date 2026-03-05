"use client";
import { useState, useRef } from "react";
import Image from "next/image";

/* ── Types ───────────────────────────────────────────────────── */
interface SpotifyTrack {
  id: string; name: string; artist: string; album: string;
  albumArt: string; previewUrl: string | null; spotifyUrl: string;
  durationMs: number; popularity: number;
}
interface VibeResult {
  name: string; mood: string; energy: number; valence: number;
  genres: string[]; tracks: SpotifyTrack[];
}
interface SavedPlaylist { id: string; name: string; mood: string; tracks: SpotifyTrack[]; createdAt: string; }

/* ── Helpers ─────────────────────────────────────────────────── */
function ytUrl(artist: string, name: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist} ${name}`)}`;
}
function fmtDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const VIBE_EXAMPLES = [
  "비 오는 오후 카페에서 혼자 공부하는 중",
  "새벽 2시 드라이브, 생각이 너무 많아",
  "오늘 드디어 해냈어! 기분 최고",
  "운동 끝, 샤워하고 쉬는 타임",
  "친구들이랑 파티 준비 중",
  "이별 직후, 멍하니 창밖을 보는 중",
  "아침 조깅, 상쾌한 바람이 부는 날",
  "퇴근 후 혼자 맥주 한 잔",
];

/* ── Mini audio player ───────────────────────────────────────── */
let activeAudio: HTMLAudioElement | null = null;

function TrackRow({ track, index }: { track: SpotifyTrack; index: number }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!track.previewUrl) return;
    if (!audioRef.current) audioRef.current = new Audio(track.previewUrl);
    audioRef.current.onended = () => setPlaying(false);
    if (playing) {
      audioRef.current.pause(); setPlaying(false);
    } else {
      if (activeAudio && activeAudio !== audioRef.current) activeAudio.pause();
      activeAudio = audioRef.current;
      audioRef.current.currentTime = 0;
      audioRef.current.play(); setPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-ep-card rounded-xl transition-colors group">
      {/* Index / play button */}
      <div className="w-6 text-center shrink-0">
        {track.previewUrl ? (
          <button onClick={toggle} className="text-ep-faint group-hover:text-ep-accent transition-colors text-sm">
            {playing ? "⏸" : <span className="hidden group-hover:inline">▶</span>}
            {!playing && <span className="group-hover:hidden text-ep-faint">{index + 1}</span>}
          </button>
        ) : (
          <span className="text-xs text-ep-faint">{index + 1}</span>
        )}
      </div>

      {/* Album art */}
      <div className="w-10 h-10 shrink-0">
        {track.albumArt ? (
          <Image src={track.albumArt} alt={track.album} width={40} height={40} className="rounded-lg object-cover" unoptimized />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-ep-card border border-ep-border flex items-center justify-center text-lg">🎵</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ep-text truncate">{track.name}</p>
        <p className="text-xs text-ep-muted truncate">{track.artist}</p>
      </div>

      {/* Duration */}
      {track.durationMs > 0 && (
        <span className="text-xs text-ep-faint font-mono shrink-0">{fmtDuration(track.durationMs)}</span>
      )}

      {/* Links */}
      <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {track.spotifyUrl && (
          <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] hover:bg-[#1DB954]/20 transition-colors text-xs">♫</a>
        )}
        <a href={ytUrl(track.artist, track.name)} target="_blank" rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors text-xs">▶</a>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function VibesPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VibeResult | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<SavedPlaylist[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("ep_vibes") ?? "[]"); } catch { return []; }
  });
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generate = async (desc?: string) => {
    const text = (desc ?? description).trim();
    if (!text || loading) return;
    if (desc) setDescription(desc);
    setLoading(true); setError(""); setResult(null); setIsSaved(false);
    try {
      const res = await fetch("/api/vibes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text, limit: 10 }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error.message); return; }
      setResult(data);
    } catch {
      setError("플레이리스트 생성 중 오류가 발생했어.");
    } finally {
      setLoading(false);
    }
  };

  const savePlaylist = () => {
    if (!result) return;
    const playlist: SavedPlaylist = {
      id: Date.now().toString(),
      name: result.name,
      mood: result.mood,
      tracks: result.tracks,
      createdAt: new Date().toISOString(),
    };
    const next = [playlist, ...saved].slice(0, 20);
    setSaved(next);
    localStorage.setItem("ep_vibes", JSON.stringify(next));
    setIsSaved(true);
  };

  const deletePlaylist = (id: string) => {
    const next = saved.filter((p) => p.id !== id);
    setSaved(next);
    localStorage.setItem("ep_vibes", JSON.stringify(next));
  };

  const energyBar = result ? (
    <div className="flex items-center gap-2">
      <span className="text-xs text-ep-faint">에너지</span>
      <div className="w-24 h-1.5 bg-ep-border rounded-full overflow-hidden">
        <div className="h-full bg-ep-accent rounded-full transition-all" style={{ width: `${result.energy}%` }} />
      </div>
      <span className="text-xs text-ep-faint">{result.energy}</span>
    </div>
  ) : null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ep-text">Vibes</h1>
        <p className="text-sm text-ep-muted mt-1">지금 이 순간을 묘사하면 AI가 플레이리스트를 만들어줄게.</p>
      </div>

      {/* Input */}
      <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-4">
        <label className="text-sm font-semibold text-ep-text">지금 어떤 순간이야?</label>
        <textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }}
          placeholder="ex) 비 오는 오후 카페에서 혼자 공부하는 중..."
          rows={3}
          maxLength={500}
          className="w-full border border-ep-border rounded-xl px-4 py-3 text-sm bg-ep-card text-ep-text placeholder-ep-faint focus:outline-none focus:border-ep-accent focus:shadow-input resize-none"
        />

        {/* Example chips */}
        <div className="flex flex-wrap gap-2">
          {VIBE_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => generate(ex)}
              className="text-xs px-3 py-1.5 rounded-full bg-ep-card border border-ep-border text-ep-muted hover:border-blue-300 hover:text-ep-accent transition-all"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => generate()}
          disabled={loading || !description.trim()}
          className="w-full py-3 bg-ep-accent text-white rounded-xl font-semibold text-sm hover:bg-ep-accent2 transition-colors shadow-btn disabled:opacity-40"
        >
          {loading ? "플레이리스트 생성 중..." : "✦ 플레이리스트 만들기"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white border border-ep-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-card">
          <div className="w-12 h-12 rounded-2xl avatar-echo flex items-center justify-center text-white text-xl animate-pulse">♫</div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-ep-text">AI가 바이브를 읽는 중...</p>
            <p className="text-xs text-ep-muted">순간의 감정을 음악으로 번역하고 있어.</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="bg-white border border-ep-border rounded-2xl shadow-card overflow-hidden">
          {/* Playlist header */}
          <div className="bg-gradient-to-br from-ep-accent/10 to-sky-100 p-6 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-mono text-ep-accent font-semibold uppercase tracking-wider mb-1">AI Vibe Playlist</p>
                <h2 className="text-xl font-bold text-ep-text">{result.name}</h2>
              </div>
              <button
                onClick={savePlaylist}
                disabled={isSaved}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSaved
                    ? "bg-green-100 text-green-600 border border-green-200"
                    : "bg-white border border-ep-border text-ep-muted hover:border-ep-accent hover:text-ep-accent"
                }`}
              >
                {isSaved ? "✓ 저장됨" : "저장하기"}
              </button>
            </div>
            <p className="text-sm text-ep-muted italic leading-relaxed">&ldquo;{result.mood}&rdquo;</p>
            <div className="flex items-center gap-4 flex-wrap">
              {energyBar}
              <div className="flex gap-1.5 flex-wrap">
                {result.genres.map((g) => (
                  <span key={g} className="text-xs bg-white/70 text-ep-accent border border-blue-200 px-2 py-0.5 rounded-full">{g}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="p-2">
            {result.tracks.length === 0 ? (
              <p className="text-center py-8 text-ep-muted text-sm">트랙을 불러오지 못했어. Spotify API 키를 확인해봐.</p>
            ) : (
              result.tracks.map((track, i) => <TrackRow key={track.id} track={track} index={i} />)
            )}
          </div>
        </div>
      )}

      {/* Saved playlists */}
      {saved.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-ep-muted uppercase tracking-wider">
            저장된 플레이리스트 <span className="text-ep-accent">({saved.length})</span>
          </h2>
          <div className="space-y-2">
            {saved.map((pl) => (
              <div key={pl.id} className="bg-white border border-ep-border rounded-2xl p-4 shadow-card group">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-ep-text text-sm truncate">{pl.name}</p>
                    <p className="text-xs text-ep-muted mt-0.5 line-clamp-1">{pl.mood}</p>
                    <p className="text-xs text-ep-faint mt-0.5">
                      {pl.tracks.length}곡 · {new Date(pl.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePlaylist(pl.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-ep-faint text-xs"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
