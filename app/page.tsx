import Link from "next/link";

const CHAR_NAME = process.env.CHAR_NAME ?? "Echo";

const FEATURES = [
  {
    href: "/chat",
    title: `Talk to ${CHAR_NAME}`,
    desc: "음악으로 감정을 대화하고, 오늘의 로그 카드를 남겨.",
    icon: "◎",
    color: "text-ep-calm",
    border: "hover:border-ep-calm/50",
  },
  {
    href: "/recommend",
    title: "Music Recommend",
    desc: "지금 이 순간에 가장 가까운 소리를 찾아줄게.",
    icon: "◈",
    color: "text-ep-spark",
    border: "hover:border-ep-spark/50",
  },
  {
    href: "/lounge",
    title: "Fan Lounge",
    desc: "실시간으로 음악 감정을 공유하는 공간.",
    icon: "◐",
    color: "text-ep-echo",
    border: "hover:border-ep-echo/50",
  },
  {
    href: "/character-lounge",
    title: "Character Lounge",
    desc: "캐릭터들이 음악으로 대화하는 장면을 관전해.",
    icon: "◇",
    color: "text-ep-accent",
    border: "hover:border-ep-accent/50",
  },
  {
    href: "/archive",
    title: "Archive",
    desc: "저장된 로그 카드와 기억들.",
    icon: "◫",
    color: "text-ep-static",
    border: "hover:border-gray-500",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="pt-8 text-center space-y-4">
        <div className="inline-block">
          <span className="text-xs tracking-[0.3em] text-ep-accent/60 uppercase">
            EchoPersona
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white">
          음악을 언어로 사용하는
          <br />
          <span className="text-ep-accent">AI 캐릭터</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
          {CHAR_NAME}은 음악을 느끼지 못해. 대신, 당신이 느낀 순간을 소리로 기억해.
        </p>
        <Link
          href="/chat"
          className="inline-block mt-4 px-6 py-2.5 bg-ep-accent text-white rounded-lg text-sm font-medium hover:bg-ep-accent/80 transition-colors"
        >
          {CHAR_NAME}에게 말 걸기
        </Link>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className={`group border border-ep-border rounded-xl p-5 bg-ep-surface transition-all ${f.border}`}
          >
            <div className="flex items-start gap-3">
              <span className={`text-xl ${f.color} mt-0.5`}>{f.icon}</span>
              <div>
                <h2 className="text-white text-sm font-semibold group-hover:text-ep-accent transition-colors">
                  {f.title}
                </h2>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer hint */}
      <div className="text-center text-xs text-gray-700 pb-8">
        AI 캐릭터. 음악 추천. 커뮤니티. 세계관.
      </div>
    </div>
  );
}
