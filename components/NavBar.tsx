"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/recommend", label: "Recommend" },
  { href: "/lounge", label: "Lounge" },
  { href: "/character-lounge", label: "Character Lounge" },
  { href: "/archive", label: "Archive" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-ep-border bg-ep-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 h-14 overflow-x-auto">
        <span className="text-ep-accent font-bold mr-4 text-sm tracking-widest shrink-0">
          ECHO
        </span>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors shrink-0 ${
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                ? "bg-ep-accent/20 text-ep-accent"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
