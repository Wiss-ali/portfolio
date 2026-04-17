"use client";

const items = [
  { label: "ABOUT ME", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/55 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
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
