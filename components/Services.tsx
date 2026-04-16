"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    n: "01",
    title: "WEB DESIGN",
    desc: "Crafting bold, memorable visual identities and interfaces that make your brand stand out online.",
  },
  {
    n: "02",
    title: "DEVELOPMENT",
    desc: "Clean, fast, responsive websites built with modern frameworks and best coding practices.",
  },
  {
    n: "03",
    title: "BRANDING",
    desc: "From logo to full design system, I shape consistent brands that tell your story everywhere.",
  },
  {
    n: "04",
    title: "SEO & PERFORMANCE",
    desc: "Optimized loading, structured content, and clean markup so you rank higher and keep visitors.",
  },
  {
    n: "05",
    title: "MAINTENANCE",
    desc: "Long-term support, updates and iterations so your site keeps evolving with your business.",
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>(".service-row");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="surface-white relative w-full py-24 md:py-32 overflow-hidden -mt-12"
    >
      <div className="px-8 md:px-14">
        <h2 className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-center text-black mb-16 md:mb-24">
          SERVICES
        </h2>

        <ul className="max-w-5xl mx-auto">
          {SERVICES.map((s) => (
            <li key={s.n} className="service-row block relative">
              <div className="service-line h-px bg-black/30 w-full" />
              <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-16 py-8 md:py-12 items-start">
                <div className="overflow-hidden">
                  <div className="service-inner font-display text-5xl md:text-7xl text-black/90">
                    {s.n}
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden">
                    <h3 className="service-inner d2 font-display text-2xl md:text-4xl text-black mb-3">
                      {s.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <p className="service-inner d3 text-sm md:text-base leading-relaxed text-black/70 max-w-2xl">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li className="service-row block relative">
            <div className="service-line h-px bg-black/30 w-full" />
          </li>
        </ul>
      </div>
    </section>
  );
}
