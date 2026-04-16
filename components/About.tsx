"use client";

import { useEffect, useRef } from "react";

const DECOR = [
  { emoji: "✳️", cls: "top-[18%] left-[6%] text-7xl md:text-8xl", delay: 0 },
  { emoji: "👊", cls: "top-[14%] right-[6%] text-6xl md:text-7xl", delay: 0.15 },
  { emoji: "❤️", cls: "bottom-[18%] left-[5%] text-6xl md:text-7xl", delay: 0.3 },
  { emoji: "🌸", cls: "bottom-[22%] right-[7%] text-6xl md:text-7xl", delay: 0.45 },
];

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll<HTMLElement>("[data-reveal]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative w-full min-h-screen bg-black py-28 md:py-36 overflow-hidden flex items-center justify-center"
    >
      {DECOR.map((d, i) => (
        <div
          key={i}
          data-reveal
          className={`absolute ${d.cls} pointer-events-none select-none opacity-0 translate-y-6 transition-all duration-700 ease-out [&.is-in]:opacity-100 [&.is-in]:translate-y-0`}
          style={{ transitionDelay: `${d.delay}s` }}
        >
          {d.emoji}
        </div>
      ))}

      <div className="relative z-10 max-w-5xl px-8 text-center">
        <h2
          data-reveal
          className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] text-white mb-10 opacity-0 translate-y-6 transition-all duration-700 ease-out [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
        >
          ABOUT ME
        </h2>

        <p
          data-reveal
          className="text-[0.95rem] md:text-base leading-[1.8] tracking-wide text-white/90 max-w-2xl mx-auto opacity-0 translate-y-6 transition-all duration-700 ease-out [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
          style={{ transitionDelay: "0.15s" }}
        >
          With over five years of experience in design,
          <br />I specialize in branding, web design, and user experience.
          <br />I love collaborating with businesses that want to stand out
          <br />and showcase their best side.
          <br />
          <span className="text-white">Let&apos;s create something amazing together!</span>
        </p>

        <div
          data-reveal
          className="mt-12 opacity-0 translate-y-6 transition-all duration-700 ease-out [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
          style={{ transitionDelay: "0.3s" }}
        >
          <a href="#contact" className="btn-pill btn-pill-glow">
            CONTACT ME
          </a>
        </div>
      </div>
    </section>
  );
}
