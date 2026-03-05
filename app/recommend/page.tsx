"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

/* ── Types ───────────────────────────────────────────────────── */
interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string | null;
  spotifyUrl: string;
  durationMs: number;
  popularity: number;
}

/* ── Constants ───────────────────────────────────────────────── */
const MOOD_PRESETS = [
  { label: "텅 빈 느낌",      emoji: "🫥", energy: 12,  valence: -0.6, genres: ["ambient", "sleep"] },
  { label: "조용히 정리",     emoji: "🌿", energy: 28,  valence: 0.1,  genres: ["acoustic", "chill"] },
  { label: "옛날 생각",       emoji: "🌅", energy: 35,  valence: -0.2, genres: ["indie", "folk"] },
  { label: "집중하고 싶어",   emoji: "🎯", energy: 45,  valence: 0.2,  genres: ["study", "classical"] },
  { label: "새로운 발견",     emoji: "✨", energy: 62,  valence: 0.5,  genres: ["indie-pop", "alternative"] },
  { label: "신나고 싶어",     emoji: "⚡", energy: 80,  valence: 0.7,  genres: ["pop", "dance"] },
  { label: "다 터뜨리고 싶어",emoji: "🔥", energy: 95,  valence: 0.3,  genres: ["rock", "electronic"] },
  { label: "비오는 날",       emoji: "🌧️", energy: 25,  valence: -0.3, genres: ["rainy-day", "sad"] },
];

const GENRE_OPTIONS = [
  "ambient", "acoustic", "alternative", "chill", "classical",
  "dance", "electronic", "folk", "hip-hop", "indie", "indie-pop",
  "jazz", "k-pop", "pop", "r-n-b", "rock", "singer-songwriter",
  "soul", "study", "synth-pop", "trip-hop",
];

const TABS = ["기분으로 찾기", "직접 검색"] as const;

/* ── Helpers ─────────────────────────────────────────────────── */
function fmtDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function ytUrl(artist: string, name: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist} ${name}`)}`;
}

/* ── TrackCard ───────────────────────────────────────────────── */
let currentAudio: HTMLAudioElement | null = null;

function TrackCard({ track }: { track: SpotifyTrack }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePreview = () => {
    if (!track.previewUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(track.previewUrl);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // Stop any other playing audio
      if (currentAudio && currentAudio !== audioRef.current) {
        currentAudio.pause();
      }
      currentAudio = audioRef.current;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  const hasArt = !!track.albumArt;
  const hasSpotify = !!track.spotifyUrl;

  return (
    <div className="bg-white border border-ep-border rounded-2xl p-4 flex gap-3 items-center ep-card-hover group">
      {/* Album Art / Preview button */}
      <div className="relative shrink-0 w-14 h-14">
        {hasArt ? (
          <Image src={track.albumArt} alt={track.album} width={56} height={56} className="rounded-xl object-cover" unoptimized />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-ep-card flex items-center justify-center text-2xl border border-ep-border">
            🎵
          </div>
        )}
        {track.previewUrl && (
          <button
            onClick={togglePreview}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl"
            title="30초 미리듣기"
          >
            {playing ? "⏸" : "▶"}
          </button>
        )}
        {playing && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="font-semibold text-ep-text text-sm truncate">{track.name}</p>
        <p className="text-xs text-ep-muted truncate">{track.artist}</p>
        <p className="text-xs text-ep-faint truncate">{track.album}</p>
        <div className="flex items-center gap-2 pt-0.5">
          {track.durationMs > 0 && (
            <span className="text-xs text-ep-faint font-mono">{fmtDuration(track.durationMs)}</span>
          )}
          {track.popularity > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-12 h-1 bg-ep-border rounded-full overflow-hidden">
                <div className="h-full bg-ep-accent rounded-full" style={{ width: `${track.popularity}%` }} />
              </div>
              <span className="text-xs text-ep-faint">{track.popularity}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-1.5 shrink-0">
        {hasSpotify ? (
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/30 hover:bg-[#1DB954]/20 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </a>
        ) : (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-ep-card text-ep-faint border border-ep-border cursor-not-allowed">
            시드 데이터
          </span>
        )}
        <a
          href={ytUrl(track.artist, track.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube
        </a>
      </div>
    </div>
  );
}

/* ── No-Spotify Banner ───────────────────────────────────────── */
function SpotifyBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
      <span className="text-xl shrink-0">⚠️</span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-amber-800">Spotify API 키가 필요해</p>
        <p className="text-xs text-amber-700">
          지금은 내장 시드 데이터 300곡으로 동작 중이야.
          실제 Spotify 검색을 하려면 <code className="bg-amber-100 px-1 rounded">.env</code>에
          {" "}<code className="bg-amber-100 px-1 rounded">SPOTIFY_CLIENT_ID</code>와
          {" "}<code className="bg-amber-100 px-1 rounded">SPOTIFY_CLIENT_SECRET</code>를 추가해줘.
        </p>
        <a
          href="https://developer.spotify.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs text-amber-700 underline hover:text-amber-900"
        >
          → Spotify Developer Dashboard
        </a>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function RecommendPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("기분으로 찾기");
  const [spotifyReady, setSpotifyReady] = useState<boolean | null>(null);

  // Check if Spotify is configured
  useEffect(() => {
    fetch("/api/spotify/search?q=test&limit=1")
      .then((r) => r.json())
      .then((d) => setSpotifyReady(d.source === "spotify"))
      .catch(() => setSpotifyReady(false));
  }, []);

  /* ── 기분 탭 state ── */
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [energy, setEnergy] = useState(50);
  const [valence, setValence] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [moodTracks, setMoodTracks] = useState<SpotifyTrack[]>([]);
  const [moodLoading, setMoodLoading] = useState(false);

  /* ── 검색 탭 state ── */
  const [query, setQuery] = useState("");
  const [searchTracks, setSearchTracks] = useState<SpotifyTrack[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSource, setSearchSource] = useState<"spotify" | "seed" | "">("");

  const toggleGenre = (g: string) =>
    setSelectedGenres((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));

  const applyPreset = (p: (typeof MOOD_PRESETS)[0]) => {
    setSelectedPreset(p.label);
    setEnergy(p.energy);
    setValence(p.valence);
    setSelectedGenres(p.genres);
  };

  const fetchMoodRecs = useCallback(async () => {
    setMoodLoading(true);
    try {
      const res = await fetch("/api/spotify/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ energy, valence, genres: selectedGenres, limit: 12 }),
      });
      const data = await res.json();
      setMoodTracks(data.tracks ?? []);
    } finally {
      setMoodLoading(false);
    }
  }, [energy, valence, selectedGenres]);

  /* Debounced search */
  useEffect(() => {
    if (tab !== "직접 검색") return;
    if (!query.trim()) { setSearchTracks([]); return; }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&limit=12`);
        const data = await res.json();
        setSearchTracks(data.tracks ?? []);
        setSearchSource(data.source ?? "");
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, tab]);

  const energyLabel =
    energy < 20 ? "매우 조용" : energy < 40 ? "잔잔함" : energy < 60 ? "보통" : energy < 80 ? "활기참" : "매우 강렬";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ep-text">Music Recommend</h1>
          <p className="text-sm text-ep-muted mt-1">
            {spotifyReady ? "Spotify 실시간 검색 · 30초 미리듣기 · YouTube 바로가기" : "기분 기반 매칭 · 시드 데이터셋"}
          </p>
        </div>
        {spotifyReady !== null && (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
            spotifyReady
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}>
            {spotifyReady ? "♫ Spotify 연결됨" : "⚠ 시드 모드"}
          </span>
        )}
      </div>

      {/* Spotify warning */}
      {spotifyReady === false && <SpotifyBanner />}

      {/* Tabs */}
      <div className="bg-ep-card rounded-xl border border-ep-border p-1 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === t ? "bg-white text-ep-accent shadow-sm" : "text-ep-muted hover:text-ep-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── 기분으로 찾기 ── */}
      {tab === "기분으로 찾기" && (
        <div className="space-y-5">
          {/* Mood presets */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <label className="text-xs font-semibold text-ep-muted uppercase tracking-wider">지금 기분</label>
            <div className="grid grid-cols-4 gap-2">
              {MOOD_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-center transition-all ${
                    selectedPreset === p.label
                      ? "border-ep-accent bg-ep-accent-bg"
                      : "border-ep-border bg-ep-card hover:border-blue-300"
                  }`}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <span className={`text-xs font-medium leading-tight ${
                    selectedPreset === p.label ? "text-ep-accent" : "text-ep-muted"
                  }`}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Energy slider */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-ep-muted uppercase tracking-wider">에너지</label>
              <span className="text-xs font-semibold text-ep-accent bg-ep-accent-bg px-2.5 py-1 rounded-full">
                {energyLabel} · {energy}
              </span>
            </div>
            <input
              type="range" min={0} max={100} value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-ep-accent"
            />
            <div className="flex justify-between text-xs text-ep-faint">
              <span>🌙 조용</span><span>⚡ 강렬</span>
            </div>
          </div>

          {/* Genre pills */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <label className="text-xs font-semibold text-ep-muted uppercase tracking-wider">장르 <span className="normal-case text-ep-faint font-normal">(최대 5개)</span></label>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedGenres.includes(g)
                      ? "bg-ep-accent-bg border border-blue-300 text-ep-accent"
                      : "bg-ep-card border border-ep-border text-ep-muted hover:border-ep-border2"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={fetchMoodRecs}
            disabled={moodLoading}
            className="w-full py-3 bg-ep-accent text-white rounded-xl font-semibold text-sm hover:bg-ep-accent2 transition-colors shadow-btn disabled:opacity-50"
          >
            {moodLoading ? "찾는 중..." : "지금 이 순간에 맞는 음악 찾기"}
          </button>

          {moodLoading && (
            <div className="flex flex-col items-center py-8 gap-3 text-ep-muted">
              <span className="text-2xl animate-spin">◌</span>
              <span className="text-sm">{spotifyReady ? "Spotify에서 검색 중..." : "추천 곡 매칭 중..."}</span>
            </div>
          )}

          {!moodLoading && moodTracks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-ep-muted font-medium px-1">{moodTracks.length}곡 추천</p>
              <div className="space-y-2">
                {moodTracks.map((t) => <TrackCard key={t.id} track={t} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 직접 검색 ── */}
      {tab === "직접 검색" && (
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ep-faint">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={spotifyReady ? "아티스트, 곡명, 앨범 검색..." : "태그, 장르, 아티스트 검색..."}
              autoFocus
              className="w-full pl-10 pr-10 py-3 border border-ep-border rounded-xl bg-white text-ep-text placeholder-ep-faint text-sm ep-input shadow-card"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ep-faint hover:text-ep-muted text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2">
            {["calm", "jazz", "indie", "k-pop", "ambient", "hip-hop", "classical", "lofi"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-2.5 py-1 rounded-full bg-white border border-ep-border text-ep-muted hover:border-blue-300 hover:text-ep-accent transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Loading */}
          {searchLoading && (
            <div className="flex flex-col items-center py-8 gap-3 text-ep-muted">
              <span className="text-2xl animate-spin">◌</span>
              <span className="text-sm">검색 중...</span>
            </div>
          )}

          {/* No results */}
          {!searchLoading && query && searchTracks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-ep-border">
              <p className="text-2xl mb-2">🔇</p>
              <p className="text-ep-muted text-sm">&ldquo;{query}&rdquo;에 대한 결과가 없어.</p>
            </div>
          )}

          {/* Prompt */}
          {!searchLoading && !query && (
            <div className="text-center py-12 bg-white rounded-2xl border border-ep-border">
              <p className="text-3xl mb-2">🎵</p>
              <p className="text-ep-muted text-sm">
                {spotifyReady ? "아티스트명, 곡명, 앨범명으로 검색해봐." : "아티스트, 장르, 감정 태그를 입력해봐."}
              </p>
            </div>
          )}

          {/* Results */}
          {!searchLoading && searchTracks.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs text-ep-muted font-medium">{searchTracks.length}곡</p>
                {searchSource === "spotify" && (
                  <span className="text-xs text-green-600 font-medium">♫ Spotify</span>
                )}
              </div>
              <div className="space-y-2">
                {searchTracks.map((t) => <TrackCard key={t.id} track={t} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
