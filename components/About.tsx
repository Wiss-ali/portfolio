"use client";

import { useEffect, useRef, useState } from "react";

type Decor = {
  src: string;
  alt: string;
  side: "left" | "right";
  pair: "top" | "bottom";
  vPos: { top?: string; bottom?: string };
  restX: number;
  rotate: number;
  delay: number;
};

const DECOR: Decor[] = [
  {
    src: "/about-1.png",
    alt: "About decoration 1",
    side: "left",
    pair: "top",
    vPos: { top: "-6%" },
    restX: 22,
    rotate: 0,
    delay: 0,
  },
  {
    src: "/about-2.png",
    alt: "About decoration 2",
    side: "right",
    pair: "top",
    vPos: { top: "-2%" },
    restX: -6,
    rotate: -10,
    delay: 0.1,
  },
  {
    src: "/about-3.png",
    alt: "About decoration 3",
    side: "left",
    pair: "bottom",
    vPos: { bottom: "8%" },
    restX: -2,
    rotate: 0,
    delay: 0,
  },
  {
    src: "/about-4.png",
    alt: "About decoration 4",
    side: "right",
    pair: "bottom",
    vPos: { bottom: "8%" },
    restX: -22,
    rotate: 22,
    delay: 0.1,
  },
];

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [topIn, setTopIn] = useState(false);
  const [bottomIn, setBottomIn] = useState(false);

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

    const sectionIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const r = entry.intersectionRatio;
          setTopIn(r >= 0.18);
          setBottomIn(r >= 0.5);
        });
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );
    sectionIo.observe(el);

    return () => {
      io.disconnect();
      sectionIo.disconnect();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative w-full min-h-screen bg-black py-28 md:py-36 overflow-hidden flex items-center justify-center"
    >
      {DECOR.map((d, i) => {
        const isIn = d.pair === "top" ? topIn : bottomIn;
        const anchor = d.side === "left" ? { left: 0 } : { right: 0 };
        const offX = d.side === "left" ? -120 : 120;
        const x = isIn ? d.restX : offX;
        return (
          <div
            key={i}
            className="absolute pointer-events-none select-none will-change-transform transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              ...anchor,
              ...d.vPos,
              transform: `translateX(${x}%) rotate(${d.rotate}deg)`,
              transitionDelay: `${d.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.src}
              alt={d.alt}
              className="w-[44vw] max-w-[442px] md:max-w-[510px] h-auto object-contain"
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
