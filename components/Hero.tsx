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
    let btnTiltZ = 0;
    let curBtnX = 0;
    let curBtnY = 0;
    let curBtnZ = 0;
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
          btnTiltZ = -(1 - dist / radius) * 5;
        } else {
          btnTiltX = 0;
          btnTiltY = 0;
          btnTiltZ = 0;
        }
      }
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.06;
      curY += (mouseY - curY) * 0.06;
      curBtnX += (btnTiltX - curBtnX) * 0.12;
      curBtnY += (btnTiltY - curBtnY) * 0.12;
      curBtnZ += (btnTiltZ - curBtnZ) * 0.12;

      const head = headRef.current;
      if (head) {
        head.style.transform = `translate3d(${curX * 34}px, 0, 0)`;
      }
      const btn = btnRef.current;
      if (btn) {
        btn.style.transform = `perspective(600px) rotateX(${curBtnX}deg) rotateY(${curBtnY}deg) rotateZ(${curBtnZ}deg)`;
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
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col pt-10 md:pt-12 lg:pt-14 xl:pt-28 2xl:pt-40 pb-12"
    >
      <h1 className="font-title font-title-grad text-[clamp(3.5rem,14vw,18rem)] leading-[0.9] text-center select-none pointer-events-none px-4">
        HI, I&apos;M WISS
      </h1>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-6 px-6 mt-4 md:mt-0">
        <p className="justify-self-center md:justify-self-end md:-mt-[12vw] xl:-mt-[14vw] 2xl:-mt-[17vw] text-[0.85rem] md:text-sm lg:text-base tracking-[0.16em] leading-relaxed text-white/90 uppercase max-w-[18rem] text-center md:text-right order-2 md:order-1">
          A web designer passionate
          <br />
          about crafting bold and
          <br />
          memorable projects <span className="text-lg">😉</span>
        </p>

        <div className="justify-self-center order-1 md:order-2 md:-mt-[8vw] xl:-mt-[10vw] 2xl:-mt-[13vw]">
          <div ref={headRef} className="pointer-events-none will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/robot-head.png"
              alt="Wiss — 3D head"
              className="w-[72vw] max-w-[440px] md:w-[36vw] md:max-w-[820px] h-auto object-contain [filter:drop-shadow(0_-12px_18px_rgba(0,0,0,0.7))_drop-shadow(0_30px_40px_rgba(0,0,0,0.5))]"
            />
          </div>
        </div>

        <a
          href="#contact"
          ref={btnRef}
          className="btn-pill btn-pill-glow will-change-transform justify-self-center md:justify-self-start order-3 md:-mt-[12vw] xl:-mt-[14vw] 2xl:-mt-[17vw]"
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
