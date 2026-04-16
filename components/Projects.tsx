"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    n: "01",
    client: "CLIENT",
    name: "Skyline Studios",
    href: "#",
    palette: ["#ff7a3c", "#c13df0", "#6d5bff", "#32d3a6"],
  },
  {
    n: "02",
    client: "CLIENT",
    name: "Aurora Labs",
    href: "#",
    palette: ["#2dd4ff", "#8ef0c6", "#ffd166", "#ff477e"],
  },
  {
    n: "03",
    client: "CLIENT",
    name: "MetaForm Creations",
    href: "#",
    palette: ["#ffd166", "#ff6f3c", "#6d5bff", "#2dd4ff"],
  },
  {
    n: "04",
    client: "CLIENT",
    name: "Pixel Forge",
    href: "#",
    palette: ["#a855f7", "#ff477e", "#32d3a6", "#ff6f3c"],
  },
  {
    n: "05",
    client: "CLIENT",
    name: "Violet Kiln",
    href: "#",
    palette: ["#6d5bff", "#c13df0", "#8ef0c6", "#ffd166"],
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-card]")
    );

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        total
      );
      const progress = total > 0 ? scrolled / total : 0;

      cards.forEach((card, i) => {
        const cardProgress = progress * cards.length - i;
        const next = Math.min(Math.max(cardProgress, 0), 1);
        // Being pushed back under the next card
        const scale = 1 - next * 0.06;
        const y = next * -16;
        card.style.transform = `translateY(${y}px) scale(${scale})`;
        card.style.filter = `brightness(${1 - next * 0.25})`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="surface-black relative w-full -mt-12"
      style={{ minHeight: `${PROJECTS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col">
        <div className="pt-24 md:pt-28 pb-6 text-center">
          <h2 className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-white">
            PROJECTS
          </h2>
        </div>

        <div className="flex-1 relative px-4 md:px-10 pb-16">
          {PROJECTS.map((p, i) => (
            <article
              key={p.n}
              data-card
              className="absolute inset-x-4 md:inset-x-10 rounded-[2rem] card-border bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)] will-change-transform"
              style={{
                top: `${i * 18}px`,
                zIndex: 10 + i,
                height: "calc(100% - 40px)",
              }}
            >
              <header className="flex items-start justify-between px-6 md:px-10 pt-6 md:pt-8">
                <div className="flex items-start gap-5 md:gap-8">
                  <span className="font-display text-3xl md:text-5xl text-white/90">
                    {p.n}
                  </span>
                  <div>
                    <div className="text-[0.68rem] md:text-xs tracking-[0.3em] text-white/80 uppercase mb-1">
                      {p.client}
                    </div>
                    <div className="text-sm md:text-lg text-white font-medium">
                      {p.name}
                    </div>
                  </div>
                </div>
                <a
                  href={p.href}
                  className="rounded-full border border-white/30 px-5 py-2.5 text-[0.68rem] md:text-xs tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors"
                >
                  LIVE PROJECT
                </a>
              </header>

              <div className="grid grid-cols-2 gap-3 md:gap-4 px-4 md:px-6 pt-5 md:pt-8 pb-4 md:pb-6 h-[calc(100%-96px)]">
                {p.palette.map((c, j) => (
                  <div
                    key={j}
                    style={{ background: c }}
                    className="rounded-2xl w-full h-full min-h-[100px]"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
