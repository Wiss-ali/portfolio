"use client";

const PROJECTS = [
  { n: "01", client: "CLIENT", name: "Skyline Studios", href: "#",
    palette: ["#ff7a3c", "#c13df0", "#6d5bff", "#32d3a6"] },
  { n: "02", client: "CLIENT", name: "Aurora Labs", href: "#",
    palette: ["#2dd4ff", "#8ef0c6", "#ffd166", "#ff477e"] },
  { n: "03", client: "CLIENT", name: "MetaForm Creations", href: "#",
    palette: ["#ffd166", "#ff6f3c", "#6d5bff", "#2dd4ff"] },
  { n: "04", client: "CLIENT", name: "Pixel Forge", href: "#",
    palette: ["#a855f7", "#ff477e", "#32d3a6", "#ff6f3c"] },
  { n: "05", client: "CLIENT", name: "Violet Kiln", href: "#",
    palette: ["#6d5bff", "#c13df0", "#8ef0c6", "#ffd166"] },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="surface-black relative w-full -mt-12 pt-20 pb-32"
    >
      <div className="text-center py-12 md:py-16">
        <h2 className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-white">
          PROJECTS
        </h2>
      </div>

      <div className="px-4 md:px-10">
        {PROJECTS.map((p, i) => (
          <div
            key={p.n}
            className="sticky mb-6"
            style={{ top: `${80 + i * 40}px` }}
          >
            <article className="rounded-[2rem] card-border bg-neutral-950 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden h-[72vh] min-h-[520px]">
              <header className="flex items-start justify-between px-6 md:px-10 pt-6 md:pt-8">
                <div className="flex items-start gap-5 md:gap-8">
                  <span className="font-display text-3xl md:text-5xl text-white/90">
                    {p.n}
                  </span>
                  <div>
                    <div className="text-[0.68rem] md:text-xs tracking-[0.3em] text-white/80 uppercase mb-1">
                      {p.client}
                    </div>
                    <div className="text-sm md:text-lg text-white font-medium">
                      {p.name}
                    </div>
                  </div>
                </div>
                <a
                  href={p.href}
                  className="rounded-full border border-white/30 px-5 py-2.5 text-[0.68rem] md:text-xs tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                >
                  LIVE PROJECT
                </a>
              </header>

              <div className="grid grid-cols-2 gap-3 md:gap-4 px-4 md:px-6 pt-5 md:pt-8 pb-4 md:pb-6 h-[calc(100%-96px)]">
                {p.palette.map((c, j) => (
                  <div
                    key={j}
                    style={{ background: c }}
                    className="rounded-2xl w-full h-full min-h-[80px]"
                  />
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
