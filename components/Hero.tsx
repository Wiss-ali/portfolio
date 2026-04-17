"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

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
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / rect.width;
      mouseY = (e.clientY - cy) / rect.height;

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

      const head = headRef.current;
      if (head) {
        head.style.transform = `translate3d(${curX * 34}px, ${curY * 20}px, 0)`;
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
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      <h1 className="font-display font-flat absolute inset-x-0 top-[14vh] z-10 text-[clamp(4rem,16vw,17rem)] leading-[0.9] text-center text-white select-none pointer-events-none">
        HI, I&apos;M WISS
      </h1>

      <div
        ref={headRef}
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[4vh] z-20 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/robot-head.png"
          alt="Wiss — 3D head"
          className="w-[46vw] min-w-[320px] max-w-[720px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="absolute left-[6%] md:left-[10%] top-[58%] -translate-y-1/2 z-30 max-w-[18rem]">
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
        className="btn-pill btn-pill-glow absolute right-[6%] md:right-[10%] top-[58%] -translate-y-1/2 z-30 will-change-transform"
      >
        CONTACT ME
      </a>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-white/40">
        SCROLL ↓
      </div>
    </section>
  );
}
