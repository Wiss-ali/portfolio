"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
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
      id="contact"
      className="surface-white relative w-full py-24 md:py-32 overflow-hidden -mt-12"
    >
      {/* Decorative 3D shapes */}
      <div
        data-reveal
        className="absolute top-6 right-8 md:right-16 w-24 h-24 md:w-40 md:h-40 pointer-events-none opacity-0 translate-y-4 transition-all duration-700 [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
      >
        <div className="w-full h-full rounded-[30%_70%_60%_40%/50%_50%_50%_50%] bg-gradient-to-br from-yellow-300 via-lime-400 to-yellow-500 shadow-[0_20px_40px_rgba(0,0,0,0.2)]" />
      </div>

      <div
        data-reveal
        className="absolute bottom-6 left-6 md:left-12 w-24 h-24 md:w-36 md:h-36 pointer-events-none opacity-0 translate-y-4 transition-all duration-700 [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
        style={{ transitionDelay: "0.15s" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 shadow-[0_20px_40px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div>
          <h2
            data-reveal
            className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] text-black opacity-0 translate-y-6 transition-all duration-700 [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
          >
            LET&apos;S
            <br />
            GET IN
            <br />
            TOUCH
          </h2>
          <a
            data-reveal
            href="mailto:wiss@example.com"
            className="inline-block mt-6 text-lg md:text-xl underline underline-offset-4 decoration-black/50 text-black opacity-0 translate-y-6 transition-all duration-700 [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
            style={{ transitionDelay: "0.15s" }}
          >
            wiss@example.com
          </a>
        </div>

        <form
          data-reveal
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 opacity-0 translate-y-6 transition-all duration-700 [&.is-in]:opacity-100 [&.is-in]:translate-y-0"
          style={{ transitionDelay: "0.3s" }}
        >
          <div>
            <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-black/70 mb-2">
              Full Name*
            </label>
            <input
              type="text"
              required
              className="w-full bg-transparent border-b border-black/30 focus:border-black outline-none py-2 text-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-black/70 mb-2">
                Email*
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-black/30 focus:border-black outline-none py-2 text-black"
              />
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-black/70 mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full bg-transparent border-b border-black/30 focus:border-black outline-none py-2 text-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-black/70 mb-2">
              Message
            </label>
            <textarea
              rows={3}
              className="w-full bg-transparent border-b border-black/30 focus:border-black outline-none py-2 text-black resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full border border-black/40 py-3.5 text-[0.78rem] tracking-[0.3em] text-black hover:bg-black hover:text-white transition-colors"
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
