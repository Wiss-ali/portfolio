"use client";

import { useEffect, useRef } from "react";

const TECH = [
  { name: "JavaScript", label: "JS" },
  { name: "TypeScript", label: "TS" },
  { name: "React", label: "React" },
  { name: "Next.js", label: "Next" },
  { name: "HTML", label: "HTML" },
  { name: "CSS", label: "CSS" },
];

const COLORS_TOP = [
  "#ff6f3c",
  "#6d5bff",
  "#c13df0",
  "#32d3a6",
  "#ffd166",
  "#ff477e",
  "#2dd4ff",
  "#a855f7",
];

const COLORS_BOTTOM = [
  "#2dd4ff",
  "#ff477e",
  "#32d3a6",
  "#6d5bff",
  "#ffd166",
  "#c13df0",
  "#ff6f3c",
  "#8ef0c6",
];

export default function Clients() {
  const rootRef = useRef<HTMLElement | null>(null);
  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const bottomTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let topOffset = 0;
    let bottomOffset = 0;
    let lastScroll = window.scrollY;
    let raf = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll;
      lastScroll = scrollY;

      // Scroll-driven marquee: top row drifts right, bottom row drifts left
      topOffset -= delta * 0.55;
      bottomOffset += delta * 0.55;

      // Passive drift so it keeps moving even when idle
      topOffset -= 0.2;
      bottomOffset += 0.2;

      const top = topTrackRef.current;
      const bottom = bottomTrackRef.current;
      if (top) {
        const w = top.scrollWidth / 2;
        const x = ((topOffset % w) + w) % w;
        top.style.transform = `translate3d(${-x}px, 0, 0)`;
      }
      if (bottom) {
        const w = bottom.scrollWidth / 2;
        const x = ((bottomOffset % w) + w) % w;
        bottom.style.transform = `translate3d(${x - w}px, 0, 0)`;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={rootRef}
      id="customers"
      className="relative w-full bg-black py-20 md:py-28 overflow-hidden"
    >
      <div className="px-8 md:px-14 mb-10">
        <p className="text-[0.7rem] tracking-[0.3em] text-white/50 uppercase mb-6">
          Tech stack
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-16 opacity-90">
          {TECH.map((t) => (
            <div
              key={t.name}
              className="font-display text-xl md:text-2xl text-white/85 tracking-wider"
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="overflow-hidden">
          <div
            ref={topTrackRef}
            className="flex gap-5 w-max will-change-transform"
          >
            {[...COLORS_TOP, ...COLORS_TOP].map((c, i) => (
              <div
                key={`t-${i}`}
                style={{ background: c }}
                className="h-[22vh] md:h-[26vh] w-[38vw] md:w-[28vw] rounded-2xl shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={bottomTrackRef}
            className="flex gap-5 w-max will-change-transform"
          >
            {[...COLORS_BOTTOM, ...COLORS_BOTTOM].map((c, i) => (
              <div
                key={`b-${i}`}
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
