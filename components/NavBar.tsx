"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/chat",        label: "Chat" },
  { href: "/recommend",   label: "Recommend" },
  { href: "/vibes",       label: "Vibes" },
  { href: "/lounge",      label: "Lounge" },
  { href: "/ai-design",   label: "AI Design" },
  { href: "/archive",     label: "Archive" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-ep-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 h-14 overflow-x-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-7 h-7 rounded-lg avatar-echo flex items-center justify-center text-white text-xs font-bold shadow-sm">
            E
          </div>
          <span className="font-bold text-ep-accent text-sm tracking-tight">EchoPersona</span>
        </Link>

        {/* Nav Links */}
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all shrink-0 ${
                active
                  ? "bg-ep-accent-bg text-ep-accent"
                  : "text-ep-muted hover:text-ep-text hover:bg-ep-card"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
