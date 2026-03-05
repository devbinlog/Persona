import Link from "next/link";

const CHAR_NAME = process.env.CHAR_NAME ?? "Echo";

const FEATURES = [
  {
    href: "/chat",
    icon: "💬",
    title: `${CHAR_NAME}와 대화`,
    desc: "음악을 언어로 감정을 나눠. 오늘의 로그 카드가 남겨져.",
    accent: "border-blue-200 hover:border-blue-400 hover:bg-blue-50/50",
    badge: "bg-blue-100 text-blue-600",
  },
  {
    href: "/recommend",
    icon: "🎵",
    title: "음악 추천",
    desc: "기분·에너지·장르로 지금 이 순간에 맞는 곡을 찾아줄게.",
    accent: "border-amber-200 hover:border-amber-400 hover:bg-amber-50/50",
    badge: "bg-amber-100 text-amber-600",
  },
  {
    href: "/lounge",
    icon: "🌐",
    title: "팬 라운지",
    desc: "실시간으로 음악 감정을 공유하는 커뮤니티 공간.",
    accent: "border-sky-200 hover:border-sky-400 hover:bg-sky-50/50",
    badge: "bg-sky-100 text-sky-600",
  },
  {
    href: "/vibes",
    icon: "🌊",
    title: "Vibes",
    desc: "지금 이 순간을 묘사하면 AI가 딱 맞는 플레이리스트를 만들어줄게.",
    accent: "border-sky-200 hover:border-sky-400 hover:bg-sky-50/50",
    badge: "bg-sky-100 text-sky-600",
    new: true,
  },
  {
    href: "/ai-design",
    icon: "✨",
    title: "AI 캐릭터 디자인",
    desc: "헤어·얼굴·바디를 조합해 나만의 AI 캐릭터를 만들어.",
    accent: "border-fuchsia-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50",
    badge: "bg-fuchsia-100 text-fuchsia-600",
    new: true,
  },
  {
    href: "/archive",
    icon: "📚",
    title: "아카이브",
    desc: "저장된 로그 카드와 감정 기록들.",
    accent: "border-slate-200 hover:border-slate-400 hover:bg-slate-50/50",
    badge: "bg-slate-100 text-slate-600",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center pt-10 pb-4 space-y-5">
        {/* Character avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl avatar-echo flex items-center justify-center shadow-btn text-3xl">
              ◎
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-block bg-ep-accent-bg text-ep-accent text-xs font-semibold px-3 py-1 rounded-full">
            AI Music Character Platform
          </div>
          <h1 className="text-4xl font-bold text-ep-text leading-tight">
            음악으로 감정을 말하는
            <br />
            <span className="gradient-text">AI 캐릭터 {CHAR_NAME}</span>
          </h1>
          <p className="text-ep-muted max-w-md mx-auto text-sm leading-relaxed">
            {CHAR_NAME}은 음악을 느끼지 못해. 대신, 당신이 느낀 순간을 소리로 기억해.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/chat"
            className="px-6 py-2.5 bg-ep-accent text-white rounded-xl text-sm font-semibold hover:bg-ep-accent2 transition-colors shadow-btn"
          >
            {CHAR_NAME}와 대화 시작
          </Link>
          <Link
            href="/recommend"
            className="px-6 py-2.5 bg-white text-ep-accent rounded-xl text-sm font-semibold border border-ep-border hover:border-blue-300 transition-colors"
          >
            음악 추천 받기
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className={`group border-2 rounded-2xl p-5 bg-white transition-all ep-card-hover ${f.accent}`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-2xl">{f.icon}</span>
                {f.new && (
                  <span className="text-xs bg-ep-accent text-white px-2 py-0.5 rounded-full font-medium">
                    NEW
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-ep-text group-hover:text-ep-accent transition-colors">
                  {f.title}
                </h2>
                <p className="text-xs text-ep-muted mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Emotion States Preview */}
      <section className="bg-white rounded-2xl border border-ep-border p-6 space-y-4">
        <h3 className="text-sm font-semibold text-ep-text">Emotion State Engine</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { state: "CALM",      color: "bg-blue-50 text-blue-600 border-blue-200" },
            { state: "SPARK",     color: "bg-amber-50 text-amber-600 border-amber-200" },
            { state: "ECHO",      color: "bg-violet-50 text-violet-600 border-violet-200" },
            { state: "STATIC",    color: "bg-slate-50 text-slate-500 border-slate-200" },
            { state: "OVERDRIVE", color: "bg-red-50 text-red-600 border-red-200" },
            { state: "HOLLOW",    color: "bg-gray-50 text-gray-400 border-gray-200" },
          ].map((e) => (
            <div key={e.state} className={`border rounded-xl px-2 py-2 text-center ${e.color}`}>
              <p className="text-xs font-mono font-semibold">{e.state}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-ep-muted">
          대화 맥락을 분석해 6가지 감정 상태 중 하나로 분류 → 말투·추천·카드가 달라져.
        </p>
      </section>
    </div>
  );
}
