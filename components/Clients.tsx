"use client";

import { useEffect, useRef } from "react";

const TECH = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"];

const COLORS_TOP = [
  "#ff6f3c", "#6d5bff", "#c13df0", "#32d3a6",
  "#ffd166", "#ff477e", "#2dd4ff", "#a855f7",
];

const COLORS_BOTTOM = [
  "#2dd4ff", "#ff477e", "#32d3a6", "#6d5bff",
  "#ffd166", "#c13df0", "#ff6f3c", "#8ef0c6",
];

export default function Clients() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const progress = Math.max(0, Math.min(1, traveled / total));
      const range = 280;
      const offset = (progress - 0.5) * range * 2;

      const top = topRef.current;
      if (top) {
        const base = -(top.offsetWidth - vw) / 2;
        top.style.transform = `translate3d(${base + offset}px, 0, 0)`;
      }
      const bottom = bottomRef.current;
      if (bottom) {
        const base = -(bottom.offsetWidth - vw) / 2;
        bottom.style.transform = `translate3d(${base - offset}px, 0, 0)`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="customers"
      className="relative w-full bg-black py-20 md:py-28"
    >
      <div className="px-8 md:px-14 mb-12 text-center">
        <p className="text-[0.7rem] tracking-[0.3em] text-white/50 uppercase mb-6">
          Tech stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
          {TECH.map((t) => (
            <div
              key={t}
              className="font-display text-xl md:text-3xl text-white/85 tracking-wider"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="overflow-hidden">
          <div ref={topRef} className="flex gap-5 w-max will-change-transform">
            {[...COLORS_TOP, ...COLORS_TOP].map((c, i) => (
              <div
                key={i}
                style={{ background: c }}
                className="h-[22vh] md:h-[26vh] w-[38vw] md:w-[28vw] rounded-2xl shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={bottomRef} className="flex gap-5 w-max will-change-transform">
            {[...COLORS_BOTTOM, ...COLORS_BOTTOM].map((c, i) => (
              <div
                key={i}
                style={{ background: c }}
                className="h-[22vh] md:h-[26vh] w-[38vw] md:w-[28vw] rounded-2xl shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
