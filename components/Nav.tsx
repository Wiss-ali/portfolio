"use client";

const items = [
  { label: "ABOUT", href: "#about" },
  { label: "CUSTOMERS", href: "#customers" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-6 flex items-center justify-between pointer-events-none">
      <div className="pointer-events-auto font-display text-xl tracking-wide">
        WISS<span className="text-[#c13df0]">.</span>
      </div>
      <ul className="pointer-events-auto flex items-center gap-8 md:gap-16 text-[0.72rem] md:text-xs tracking-[0.18em] font-medium">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="text-white/90 hover:text-white transition-colors"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
