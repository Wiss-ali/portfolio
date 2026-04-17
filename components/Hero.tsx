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
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col pt-24 md:pt-28 pb-12"
    >
      <h1 className="font-display font-flat text-[clamp(3.5rem,17vw,18rem)] leading-[0.85] text-center text-white select-none pointer-events-none px-4">
        HI, I&apos;M WISS
      </h1>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-10 px-6 md:px-16 mt-6">
        <p className="justify-self-center md:justify-self-start text-[0.85rem] md:text-sm lg:text-base tracking-[0.16em] leading-relaxed text-white/90 uppercase max-w-[18rem] text-center md:text-left order-2 md:order-1">
          A web designer passionate
          <br />
          about crafting bold and
          <br />
          memorable projects <span className="text-lg">😉</span>
        </p>

        <div
          ref={headRef}
          className="pointer-events-none justify-self-center will-change-transform order-1 md:order-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot-head.png"
            alt="Wiss — 3D head"
            className="w-[60vw] max-w-[360px] md:w-[34vw] md:max-w-[500px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
        </div>

        <a
          href="#contact"
          ref={btnRef}
          className="btn-pill btn-pill-glow justify-self-center md:justify-self-end will-change-transform order-3"
        >
          CONTACT ME
        </a>
      </div>

      <div className="text-center text-[0.65rem] tracking-[0.3em] text-white/40 mt-6">
        SCROLL ↓
      </div>
    </section>
  );
}
