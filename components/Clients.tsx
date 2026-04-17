"use client";

const TECH = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"];

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

function Row({
  colors,
  direction,
}: {
  colors: string[];
  direction: "left" | "right";
}) {
  const animation =
    direction === "left" ? "marquee-left 40s linear infinite" : "marquee-right 40s linear infinite";
  return (
    <div className="overflow-hidden">
      <div className="flex gap-5 w-max" style={{ animation }}>
        {[...colors, ...colors].map((c, i) => (
          <div
            key={i}
            style={{ background: c }}
            className="h-[22vh] md:h-[26vh] w-[38vw] md:w-[28vw] rounded-2xl shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section
      id="customers"
      className="relative w-full bg-black py-20 md:py-28"
    >
      <div className="px-8 md:px-14 mb-12 text-center">
        <p className="text-[0.7rem] tracking-[0.3em] text-white/50 uppercase mb-6">
          Tech stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
          {TECH.map((t) => (
            <div
              key={t}
              className="font-display text-xl md:text-3xl text-white/85 tracking-wider"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <Row colors={COLORS_TOP} direction="right" />
        <Row colors={COLORS_BOTTOM} direction="left" />
      </div>
    </section>
  );
}
