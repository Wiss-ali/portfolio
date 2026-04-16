"use client";

import { useEffect, useState } from "react";

const items = [
  { label: "ABOUT", href: "#about" },
  { label: "CUSTOMERS", href: "#customers" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between rounded-full px-6 md:px-8 py-3 md:py-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md border border-white/10"
            : "bg-black/30 backdrop-blur-sm border border-white/5"
        }`}
      >
        <div className="font-display text-lg md:text-xl tracking-wide text-white">
          WISS<span className="text-[#c13df0]">.</span>
        </div>
        <ul className="flex items-center gap-6 md:gap-12 text-[0.7rem] md:text-xs tracking-[0.18em] font-medium">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                className="text-white/85 hover:text-white transition-colors"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
