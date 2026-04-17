"use client";

import { useEffect, useRef } from "react";

const DECOR = [
  {
    src: "/about-1.png",
    alt: "About decoration 1",
    side: "left" as const,
    pos: "top-[10%] md:top-[14%]",
    delay: 0,
  },
  {
    src: "/about-2.png",
    alt: "About decoration 2",
    side: "right" as const,
    pos: "top-[10%] md:top-[14%]",
    delay: 0,
  },
  {
    src: "/about-3.png",
    alt: "About decoration 3",
    side: "left" as const,
    pos: "bottom-[10%] md:bottom-[14%]",
    delay: 0.25,
  },
  {
    src: "/about-4.png",
    alt: "About decoration 4",
    side: "right" as const,
    pos: "bottom-[10%] md:bottom-[14%]",
    delay: 0.25,
  },
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
      {DECOR.map((d, i) => {
        const sideClass =
          d.side === "left"
            ? "left-0 -translate-x-full [&.is-in]:-translate-x-[10%]"
            : "right-0 translate-x-full [&.is-in]:translate-x-[10%]";
        return (
          <div
            key={i}
            data-reveal
            className={`absolute ${d.pos} ${sideClass} pointer-events-none select-none transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform`}
            style={{ transitionDelay: `${d.delay}s` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.src}
              alt={d.alt}
              className="w-[28vw] max-w-[280px] md:max-w-[320px] h-auto object-contain"
            />
          </div>
        );
      })}

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
