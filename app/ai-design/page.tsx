"use client";
import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   Design Option Definitions
═══════════════════════════════════════════════════════════════ */

const SKIN_TONES = [
  { id: "ivory",      label: "아이보리",   base: "#FDDBB4", shadow: "#EEB880", lip: "#D9927A" },
  { id: "warm_beige", label: "웜 베이지",  base: "#F0C68A", shadow: "#D4975A", lip: "#C27B60" },
  { id: "tan",        label: "탄",         base: "#C8855A", shadow: "#A0603A", lip: "#954030" },
  { id: "caramel",    label: "카라멜",     base: "#A0622C", shadow: "#7A4418", lip: "#6B3010" },
  { id: "deep_brown", label: "딥 브라운",  base: "#6B3A1F", shadow: "#4A2412", lip: "#3D1A0A" },
  { id: "cool_fair",  label: "쿨 페어",    base: "#F5E6D3", shadow: "#D9C0A0", lip: "#C8908A" },
];

const HAIR_OPTIONS = [
  { id: "short_straight", label: "단발 직선",    emoji: "💇" },
  { id: "long_wavy",      label: "장발 웨이브",  emoji: "🌊" },
  { id: "pixie",          label: "픽시 컷",      emoji: "✂️" },
  { id: "ponytail",       label: "포니테일",     emoji: "🎀" },
  { id: "bob",            label: "보브 컷",      emoji: "🪄" },
  { id: "messy",          label: "메시 숏",      emoji: "🌀" },
  { id: "afro",           label: "아프로",       emoji: "☁️" },
  { id: "braids",         label: "브레이드",     emoji: "🪢" },
  { id: "bun",            label: "업스타일 번", emoji: "🌸" },
  { id: "curly",          label: "컬리 롱",      emoji: "🍥" },
  { id: "undercut",       label: "언더컷",       emoji: "⚡" },
  { id: "shaved",         label: "크롭 쉐이브",  emoji: "🔷" },
];

const FACE_OPTIONS = [
  { id: "soft_round",    label: "소프트 라운드",   emoji: "🌸" },
  { id: "sharp_v",       label: "샤프 V라인",      emoji: "💎" },
  { id: "square_cool",   label: "스퀘어 쿨",       emoji: "🧊" },
  { id: "cute_chubby",   label: "큐트 통통",       emoji: "🍑" },
  { id: "oval_elegant",  label: "오벌 엘레강스",   emoji: "🦢" },
  { id: "angular",       label: "앵귤러 엣지",     emoji: "⚡" },
  { id: "petite",        label: "쁘띠 미니",       emoji: "🌷" },
  { id: "wide",          label: "와이드 브로드",   emoji: "🏛️" },
];

const BODY_OPTIONS = [
  { id: "slim_casual",    label: "슬림 캐주얼",      emoji: "👕" },
  { id: "athletic",       label: "아스레틱",         emoji: "🏋️" },
  { id: "elegant_formal", label: "엘레강스 포멀",    emoji: "🎩" },
  { id: "streetwear",     label: "스트릿웨어",       emoji: "🧢" },
  { id: "artist_boho",    label: "아티스트 보헤미안", emoji: "🎨" },
  { id: "minimal_mono",   label: "미니멀 모노",      emoji: "⬜" },
  { id: "casual_plus",    label: "캐주얼 플러스",    emoji: "🌼" },
  { id: "sporty",         label: "스포티",           emoji: "🏃" },
  { id: "vintage",        label: "빈티지 레트로",    emoji: "📻" },
  { id: "techwear",       label: "테크웨어",         emoji: "🤖" },
];

const COLOR_OPTIONS = [
  { id: "blue",    label: "블루",     hex: "#2563EB" },
  { id: "sky",     label: "스카이",   hex: "#0EA5E9" },
  { id: "violet",  label: "바이올렛", hex: "#7C3AED" },
  { id: "rose",    label: "로즈",     hex: "#F43F5E" },
  { id: "amber",   label: "앰버",     hex: "#D97706" },
  { id: "emerald", label: "에메랄드", hex: "#10B981" },
  { id: "slate",   label: "슬레이트", hex: "#64748B" },
  { id: "coral",   label: "코랄",     hex: "#FB923C" },
  { id: "indigo",  label: "인디고",   hex: "#4F46E5" },
  { id: "teal",    label: "틸",       hex: "#0D9488" },
];

/* ══════════════════════════════════════════════════════════════
   SVG Avatar Preview
═══════════════════════════════════════════════════════════════ */
interface AvatarProps { hair: string; face: string; body: string; color: string; skin: string; name: string; }

function AvatarPreview({ hair, face, body, color, skin, name }: AvatarProps) {
  const skinData   = SKIN_TONES.find((s) => s.id === skin) ?? SKIN_TONES[0];
  const accentData = COLOR_OPTIONS.find((c) => c.id === color) ?? COLOR_OPTIONS[0];
  const accent     = accentData.hex;
  const skinColor  = skinData.base;
  const skinShadow = skinData.shadow;
  const lipColor   = skinData.lip;
  const initial    = name ? name[0].toUpperCase() : "?";

  /* Face shape radius */
  const faceRx = face === "sharp_v" || face === "angular" ? 17 : face === "square_cool" ? 15 : face === "cute_chubby" ? 20 : face === "wide" ? 22 : face === "petite" ? 14 : 18;
  const faceRy = face === "sharp_v" ? 22 : face === "cute_chubby" ? 18 : face === "wide" ? 17 : face === "petite" ? 16 : 20;

  /* Hair paths */
  const hairPath = (() => {
    switch (hair) {
      case "long_wavy":    return "M28 44 L22 70 Q25 76 31 72 Q33 66 32 58 L32 34 Q32 18 50 16 Q68 18 68 34 L68 58 Q67 66 69 72 Q75 76 78 70 L72 44 Q64 48 50 48 Q36 48 28 44 Z";
      case "pixie":        return "M34 46 L34 38 Q34 20 50 18 Q66 20 66 38 L66 46 Q58 46 50 46 Q42 46 34 46 Z";
      case "ponytail":     return "M30 44 L30 34 Q30 18 50 16 Q70 18 70 34 L70 44 Q62 48 50 48 Q38 48 30 44 Z M67 26 Q75 18 80 12 Q82 8 77 14 Q73 22 70 30 Z";
      case "bob":          return "M26 46 L24 60 Q26 66 32 64 L32 34 Q32 18 50 16 Q68 18 68 34 L68 64 Q74 66 76 60 L74 46 Q66 50 50 50 Q34 50 26 46 Z";
      case "messy":        return "M32 44 L30 36 Q30 20 50 16 Q70 20 70 36 L68 44 Q62 40 58 44 Q54 40 50 44 Q46 40 42 44 Q38 40 32 44 Z";
      case "afro":         return "M18 48 Q14 28 30 18 Q40 8 50 10 Q60 8 70 18 Q86 28 82 48 Q76 52 72 44 Q70 20 50 18 Q30 20 28 44 Q24 52 18 48 Z";
      case "braids":       return "M30 44 L30 34 Q30 18 50 16 Q70 18 70 34 L70 44 Q60 48 50 48 Q40 48 30 44 Z M34 48 L32 75 Q33 80 37 76 L38 50 Z M66 48 L68 75 Q67 80 63 76 L62 50 Z M50 48 L48 78 Q50 83 52 78 L52 48 Z";
      case "bun":          return "M30 46 L30 36 Q30 20 50 18 Q70 20 70 36 L70 46 Q62 50 50 50 Q38 50 30 46 Z M44 18 Q50 6 56 18 Q54 12 50 10 Q46 12 44 18 Z";
      case "curly":        return "M24 48 Q18 30 26 18 Q36 8 50 10 Q64 8 74 18 Q82 30 76 48 Q72 52 68 46 Q70 22 50 20 Q30 22 32 46 Q28 52 24 48 Z M22 66 Q24 58 30 60 Q26 70 22 66 Z M78 66 Q76 58 70 60 Q74 70 78 66 Z";
      case "undercut":     return "M30 48 L30 40 Q32 24 50 22 Q68 24 70 40 L70 48 Q62 52 50 52 Q38 52 30 48 Z M30 48 L28 38 Q26 48 30 48 Z M70 48 L72 38 Q74 48 70 48 Z";
      case "shaved":       return "M34 50 L34 42 Q34 26 50 24 Q66 26 66 42 L66 50 Q58 50 50 50 Q42 50 34 50 Z";
      default: /* short_straight */ return "M30 44 L30 34 Q30 18 50 16 Q70 18 70 34 L70 44 Q62 48 50 48 Q38 48 30 44 Z";
    }
  })();

  /* Body paths */
  const bodyPath = (() => {
    switch (body) {
      case "athletic":        return "M26 80 Q28 62 50 60 Q72 62 74 80 L78 104 L22 104 Z";
      case "elegant_formal":  return "M30 80 Q33 62 50 60 Q67 62 70 80 L73 104 L27 104 Z";
      case "streetwear":      return "M24 80 Q26 62 50 60 Q74 62 76 80 L80 104 L20 104 Z";
      case "artist_boho":     return "M28 80 Q30 64 50 62 Q70 64 72 80 L76 104 L24 104 Z";
      case "minimal_mono":    return "M32 80 Q34 64 50 62 Q66 64 68 80 L71 104 L29 104 Z";
      case "casual_plus":     return "M22 80 Q24 60 50 58 Q76 60 78 80 L82 104 L18 104 Z";
      case "sporty":          return "M25 80 Q27 62 50 60 Q73 62 75 80 L79 104 L21 104 Z";
      case "vintage":         return "M29 80 Q31 63 50 61 Q69 63 71 80 L75 104 L25 104 Z";
      case "techwear":        return "M24 80 Q26 60 50 58 Q74 60 76 80 L80 104 L20 104 Z";
      default: /* slim_casual */ return "M28 80 Q30 63 50 61 Q70 63 72 80 L75 104 L25 104 Z";
    }
  })();

  /* Body detail accent */
  const bodyDetail = (() => {
    switch (body) {
      case "elegant_formal":  return <rect x="44" y="61" width="12" height="3" rx="1.5" fill={accent} opacity="0.9" />;
      case "streetwear":      return <ellipse cx="50" cy="59" rx="11" ry="4" fill={accent} opacity="0.4" />;
      case "sporty":          return <><rect x="44" y="61" width="12" height="2" rx="1" fill={accent} /><rect x="44" y="65" width="12" height="2" rx="1" fill={accent} opacity="0.5" /></>;
      case "techwear":        return <><rect x="36" y="68" width="5" height="10" rx="2" fill={accent} opacity="0.5" /><rect x="59" y="68" width="5" height="10" rx="2" fill={accent} opacity="0.5" /></>;
      case "vintage":         return <path d="M42 64 Q50 60 58 64" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />;
      default:                return null;
    }
  })();

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 100 110" className="w-44 h-44 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <path d={bodyPath} fill={accent} opacity="0.88" />
        {bodyDetail}

        {/* Neck */}
        <rect x="44" y="58" width="12" height="8" rx="3" fill={skinColor} />
        {/* Neck shadow */}
        <rect x="44" y="62" width="12" height="4" rx="2" fill={skinShadow} opacity="0.3" />

        {/* Hair (back layer) */}
        <path d={hairPath} fill={accent} opacity="0.95" />

        {/* Face */}
        <ellipse cx="50" cy="42" rx={faceRx} ry={faceRy} fill={skinColor} />
        {/* Face contour shadow */}
        <ellipse cx="50" cy="46" rx={faceRx - 2} ry={faceRy - 4} fill={skinShadow} opacity="0.12" />

        {/* Eyebrows */}
        <path d="M40 36.5 Q43 35 46.5 36.5" stroke={accent} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M53.5 36.5 Q57 35 60 36.5" stroke={accent} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8" />

        {/* Eyes — whites */}
        <ellipse cx="43" cy="40" rx="3.5" ry="2.8" fill="white" />
        <ellipse cx="57" cy="40" rx="3.5" ry="2.8" fill="white" />
        {/* Iris */}
        <circle cx="43" cy="40" r="2.2" fill="#2D1A10" />
        <circle cx="57" cy="40" r="2.2" fill="#2D1A10" />
        {/* Iris color */}
        <circle cx="43" cy="40" r="1.5" fill={accent} opacity="0.6" />
        <circle cx="57" cy="40" r="1.5" fill={accent} opacity="0.6" />
        {/* Pupil */}
        <circle cx="43" cy="40" r="0.9" fill="#0D0D0D" />
        <circle cx="57" cy="40" r="0.9" fill="#0D0D0D" />
        {/* Highlight */}
        <circle cx="44.2" cy="38.9" r="0.8" fill="white" />
        <circle cx="58.2" cy="38.9" r="0.8" fill="white" />

        {/* Nose */}
        <ellipse cx="50" cy="46" rx="1.2" ry="0.9" fill={skinShadow} opacity="0.6" />

        {/* Lips */}
        <path d="M45 50.5 Q50 54 55 50.5" stroke={lipColor} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M46 50.5 Q50 52 54 50.5" fill={lipColor} opacity="0.25" />

        {/* Blush */}
        <ellipse cx="38" cy="45.5" rx="4.5" ry="2.8" fill="#FFB3B3" opacity="0.28" />
        <ellipse cx="62" cy="45.5" rx="4.5" ry="2.8" fill="#FFB3B3" opacity="0.28" />

        {/* Name initial badge */}
        <circle cx="83" cy="19" r="10" fill={accent} />
        <text x="83" y="23" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{initial}</text>
      </svg>

      <div className="text-center">
        <p className="font-bold text-ep-text">{name || "이름 미입력"}</p>
        <p className="text-xs text-ep-muted mt-0.5">
          {HAIR_OPTIONS.find((o) => o.id === hair)?.label} ·{" "}
          {FACE_OPTIONS.find((o) => o.id === face)?.label} ·{" "}
          {SKIN_TONES.find((s) => s.id === skin)?.label}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Generic Option Grid
═══════════════════════════════════════════════════════════════ */
function OptionGrid<T extends { id: string; label: string; emoji?: string; hex?: string }>({
  options, selected, onSelect, cols = 3,
}: { options: T[]; selected: string; onSelect: (id: string) => void; cols?: number }) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {options.map((opt) => {
        const active = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
              active
                ? "border-ep-accent bg-ep-accent-bg shadow-input"
                : "border-ep-border bg-ep-card hover:border-ep-border2 hover:bg-white"
            }`}
          >
            {opt.hex ? (
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ background: opt.hex }}
              />
            ) : (
              <span className="text-lg leading-none">{opt.emoji}</span>
            )}
            <span className={`text-xs font-medium leading-tight ${active ? "text-ep-accent" : "text-ep-muted"}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Skin Tone Selector (larger swatches)
═══════════════════════════════════════════════════════════════ */
function SkinSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {SKIN_TONES.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          title={s.label}
          className={`flex flex-col items-center gap-1.5 transition-all group`}
        >
          <span
            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${
              selected === s.id ? "border-ep-accent scale-110 shadow-input" : "border-transparent group-hover:border-ep-border2 group-hover:scale-105"
            }`}
            style={{ background: s.base }}
          />
          <span className={`text-xs font-medium ${selected === s.id ? "text-ep-accent" : "text-ep-faint"}`}>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Saved Character Card
═══════════════════════════════════════════════════════════════ */
interface SavedChar {
  id: string;
  displayNameHint: string;
  visualConfig: { hair: string; face: string; body: string; color: string; skin?: string };
  createdAt: string;
}

function SavedCharCard({ char, onDelete }: { char: SavedChar; onDelete: (id: string) => void }) {
  const c    = COLOR_OPTIONS.find((o) => o.id === char.visualConfig.color);
  const h    = HAIR_OPTIONS.find((o) => o.id === char.visualConfig.hair);
  const f    = FACE_OPTIONS.find((o) => o.id === char.visualConfig.face);
  const skin = SKIN_TONES.find((s) => s.id === (char.visualConfig.skin ?? "ivory"));
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="bg-white border border-ep-border rounded-2xl p-4 flex items-center gap-3 shadow-card group">
      {/* Skin swatch + color combo */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: c?.hex ?? "#2563EB" }}>
          {char.displayNameHint[0]?.toUpperCase()}
        </div>
        <span
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white"
          style={{ background: skin?.base ?? "#FDDBB4" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ep-text text-sm truncate">{char.displayNameHint}</p>
        <p className="text-xs text-ep-muted mt-0.5 truncate">{h?.label} · {f?.label} · {skin?.label}</p>
        <p className="text-xs text-ep-faint mt-0.5">{new Date(char.createdAt).toLocaleDateString("ko-KR")}</p>
      </div>
      {confirming ? (
        <div className="flex gap-1.5 shrink-0">
          <button onClick={() => onDelete(char.id)} className="px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs font-medium">삭제</button>
          <button onClick={() => setConfirming(false)} className="px-2.5 py-1 bg-ep-card border border-ep-border rounded-lg text-xs text-ep-muted">취소</button>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)} className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 border border-ep-border rounded-lg text-xs text-ep-muted hover:border-red-300 hover:text-red-500">
          삭제
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════════ */
export default function AIDesignPage() {
  const [hair,    setHair]    = useState("short_straight");
  const [face,    setFace]    = useState("soft_round");
  const [body,    setBody]    = useState("slim_casual");
  const [color,   setColor]   = useState("blue");
  const [skin,    setSkin]    = useState("ivory");
  const [name,    setName]    = useState("");
  const [persona, setPersona] = useState("");

  const [saving,       setSaving]       = useState(false);
  const [savedMsg,     setSavedMsg]     = useState("");
  const [error,        setError]        = useState("");
  const [savedChars,   setSavedChars]   = useState<SavedChar[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadError,    setLoadError]    = useState("");

  const loadChars = () => {
    setLoadingSaved(true);
    setLoadError("");
    fetch("/api/ai-design")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error.message);
        setSavedChars(d.characters ?? []);
      })
      .catch((e: Error) => setLoadError(e.message ?? "불러오기 실패"))
      .finally(() => setLoadingSaved(false));
  };

  useEffect(() => { loadChars(); }, []);

  const handleSave = async () => {
    if (!name.trim()) { setError("캐릭터 이름을 입력해줘."); return; }
    setError(""); setSaving(true); setSavedMsg("");
    try {
      const res = await fetch("/api/ai-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name.trim(), hair, face, body, color, skin, persona: persona.trim() }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error.message); return; }
      setSavedMsg("✓ 캐릭터가 저장됐어!");
      setSavedChars((prev) => [data.character, ...prev]);
      setTimeout(() => setSavedMsg(""), 3000);
    } catch {
      setError("저장 중 오류가 발생했어.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/ai-design?id=${id}`, { method: "DELETE" });
    setSavedChars((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ep-text">AI 모델 디자인</h1>
        <p className="text-sm text-ep-muted mt-1">피부 톤, 헤어, 얼굴, 바디를 조합해 나만의 AI 캐릭터를 만들어봐.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── LEFT: Preview + Save ── */}
        <div className="space-y-4">
          {/* Avatar */}
          <div className="bg-white border border-ep-border rounded-2xl p-6 shadow-card flex flex-col items-center gap-4">
            <AvatarPreview hair={hair} face={face} body={body} color={color} skin={skin} name={name} />
          </div>

          {/* Name + Persona */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <label className="text-sm font-semibold text-ep-text">캐릭터 이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex) 이루, Nova, 제로..."
              maxLength={30}
              className="w-full border border-ep-border rounded-xl px-4 py-2.5 text-sm bg-ep-card text-ep-text placeholder-ep-faint focus:outline-none focus:border-ep-accent focus:shadow-input"
            />
            <label className="text-sm font-semibold text-ep-text">페르소나 메모 <span className="text-ep-faint font-normal">(선택)</span></label>
            <textarea
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              placeholder="이 캐릭터의 성격이나 배경을 짧게 적어줘..."
              maxLength={200}
              rows={2}
              className="w-full border border-ep-border rounded-xl px-4 py-2.5 text-sm bg-ep-card text-ep-text placeholder-ep-faint focus:outline-none focus:border-ep-accent focus:shadow-input resize-none"
            />
          </div>

          {/* Skin Tone */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌍</span>
              <label className="text-sm font-semibold text-ep-text">피부 톤</label>
              <span className="ml-auto text-xs text-ep-accent font-medium bg-ep-accent-bg px-2 py-0.5 rounded-full">
                {SKIN_TONES.find((s) => s.id === skin)?.label}
              </span>
            </div>
            <SkinSelector selected={skin} onSelect={setSkin} />
          </div>

          {/* Theme Color */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <label className="text-sm font-semibold text-ep-text">테마 컬러</label>
            </div>
            <OptionGrid options={COLOR_OPTIONS} selected={color} onSelect={setColor} cols={5} />
          </div>

          {/* Feedback */}
          {error    && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"><p className="text-sm text-red-600">{error}</p></div>}
          {savedMsg && <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3"><p className="text-sm text-green-700">{savedMsg}</p></div>}

          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="w-full py-3 bg-ep-accent text-white rounded-xl font-semibold text-sm hover:bg-ep-accent2 transition-colors shadow-btn disabled:opacity-40"
          >
            {saving ? "저장 중..." : "✦ 캐릭터 저장하기"}
          </button>
        </div>

        {/* ── RIGHT: Style Options ── */}
        <div className="space-y-4">
          {/* Hair */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">💇</span>
              <label className="text-sm font-semibold text-ep-text">헤어스타일</label>
              <span className="ml-auto text-xs text-ep-accent font-medium bg-ep-accent-bg px-2 py-0.5 rounded-full">
                {HAIR_OPTIONS.find((o) => o.id === hair)?.label}
              </span>
            </div>
            <OptionGrid options={HAIR_OPTIONS} selected={hair} onSelect={setHair} cols={4} />
          </div>

          {/* Face */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">😊</span>
              <label className="text-sm font-semibold text-ep-text">페이스 타입</label>
              <span className="ml-auto text-xs text-ep-accent font-medium bg-ep-accent-bg px-2 py-0.5 rounded-full">
                {FACE_OPTIONS.find((o) => o.id === face)?.label}
              </span>
            </div>
            <OptionGrid options={FACE_OPTIONS} selected={face} onSelect={setFace} cols={4} />
          </div>

          {/* Body */}
          <div className="bg-white border border-ep-border rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <label className="text-sm font-semibold text-ep-text">바디 & 스타일</label>
              <span className="ml-auto text-xs text-ep-accent font-medium bg-ep-accent-bg px-2 py-0.5 rounded-full">
                {BODY_OPTIONS.find((o) => o.id === body)?.label}
              </span>
            </div>
            <OptionGrid options={BODY_OPTIONS} selected={body} onSelect={setBody} cols={4} />
          </div>
        </div>
      </div>

      {/* Saved Characters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ep-muted uppercase tracking-wider">
            저장된 캐릭터 {savedChars.length > 0 && <span className="text-ep-accent">({savedChars.length})</span>}
          </h2>
          <button
            onClick={loadChars}
            disabled={loadingSaved}
            className="text-xs text-ep-muted hover:text-ep-accent transition-colors px-2 py-1 rounded-lg hover:bg-ep-accent-bg disabled:opacity-40"
          >
            {loadingSaved ? "로딩 중..." : "↻ 새로고침"}
          </button>
        </div>
        {loadError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-red-600">{loadError}</p>
            <button onClick={loadChars} className="text-xs text-red-500 underline ml-2">재시도</button>
          </div>
        )}
        {loadingSaved ? (
          <div className="space-y-2">{[0, 1].map((i) => <div key={i} className="bg-white border border-ep-border rounded-2xl p-4 animate-pulse h-16" />)}</div>
        ) : savedChars.length === 0 && !loadError ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-ep-border">
            <p className="text-3xl mb-2">🎭</p>
            <p className="text-ep-muted text-sm">아직 저장된 캐릭터가 없어. 위에서 디자인하고 저장해봐!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedChars.map((char) => <SavedCharCard key={char.id} char={char} onDelete={handleDelete} />)}
          </div>
        )}
      </div>
    </div>
  );
}
