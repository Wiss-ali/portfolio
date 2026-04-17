"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const [headOk, setHeadOk] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let btnTiltX = 0;
    let btnTiltY = 0;
    let curBtnX = 0;
    let curBtnY = 0;
    let headFollowX = 0;
    let curHeadFollowX = 0;
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / rect.width;
      mouseY = (e.clientY - cy) / rect.height;

      // Head follows mouse subtly toward left/right (contact direction)
      headFollowX = mouseX * 18;

      const btn = btnRef.current;
      if (btn) {
        const brect = btn.getBoundingClientRect();
        const bcx = brect.left + brect.width / 2;
        const bcy = brect.top + brect.height / 2;
        const dx = e.clientX - bcx;
        const dy = e.clientY - bcy;
        const dist = Math.hypot(dx, dy);
        const radius = 260;
        if (dist < radius) {
          const k = (1 - dist / radius) * 10;
          btnTiltX = (-dy / radius) * k;
          btnTiltY = (dx / radius) * k;
        } else {
          btnTiltX = 0;
          btnTiltY = 0;
        }
      }
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.06;
      curY += (mouseY - curY) * 0.06;
      curBtnX += (btnTiltX - curBtnX) * 0.12;
      curBtnY += (btnTiltY - curBtnY) * 0.12;
      curHeadFollowX += (headFollowX - curHeadFollowX) * 0.08;

      const head = headRef.current;
      if (head) {
        const tx = curX * 26 + curHeadFollowX;
        const ty = curY * 18;
        head.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }

      const btn = btnRef.current;
      if (btn) {
        btn.style.transform = `perspective(600px) rotateX(${curBtnX}deg) rotateY(${curBtnY}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      <h1 className="font-display relative z-10 text-[clamp(4rem,16vw,18rem)] leading-[0.9] text-center text-white select-none pointer-events-none mt-24">
        HI, I&apos;M WISS
      </h1>

      <div
        ref={headRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-20 will-change-transform"
      >
        <div className="relative w-[38vw] min-w-[280px] max-w-[620px] aspect-square">
          {!headOk && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10 flex items-center justify-center">
              <span className="text-white/25 text-[0.6rem] tracking-[0.3em] uppercase text-center px-4">
                drop png at
                <br />
                public/robot-head.png
              </span>
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot-head.png"
            alt="Wiss — 3D head"
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth > 10) setHeadOk(true);
            }}
            onError={() => setHeadOk(false)}
            className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-opacity duration-500 ${
              headOk ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 z-30 max-w-[18rem]">
        <p className="text-[0.78rem] md:text-sm tracking-[0.16em] leading-relaxed text-white/90 uppercase">
          A web designer passionate
          <br />
          about crafting bold and
          <br />
          memorable projects <span className="text-base">😉</span>
        </p>
      </div>

      <a
        href="#contact"
        ref={btnRef}
        className="btn-pill btn-pill-glow absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-30 will-change-transform"
      >
        CONTACT ME
      </a>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-white/40">
        SCROLL ↓
      </div>
    </section>
  );
}
