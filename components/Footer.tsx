"use client";

const SHAPES = [
  "cross",
  "dots2",
  "arc",
  "circle",
  "chevron",
  "halfmoon",
  "triangle-up",
  "circle",
  "cross",
  "dots2",
];

function Shape({ type }: { type: string }) {
  const size = 96;
  switch (type) {
    case "cross":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path
            d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "dots2":
      return (
        <svg viewBox="0 0 120 60" width={size * 1.3} height={size * 0.65}>
          <circle cx="30" cy="30" r="28" fill="currentColor" />
          <circle cx="90" cy="30" r="28" fill="currentColor" />
        </svg>
      );
    case "arc":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path
            d="M10 90 A 40 40 0 0 1 90 90 L 70 90 A 20 20 0 0 0 30 90 Z"
            fill="currentColor"
            transform="rotate(-90 50 50)"
          />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="45" fill="currentColor" />
        </svg>
      );
    case "chevron":
      return (
        <svg viewBox="0 0 100 80" width={size} height={size * 0.8}>
          <path d="M10 10 L50 50 L90 10 L90 30 L50 70 L10 30 Z" fill="currentColor" />
        </svg>
      );
    case "halfmoon":
      return (
        <svg viewBox="0 0 100 60" width={size} height={size * 0.6}>
          <path d="M0 60 A 50 50 0 0 1 100 60 Z" fill="currentColor" />
        </svg>
      );
    case "triangle-up":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path d="M50 10 L90 85 L10 85 Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="surface-black relative w-full -mt-12 overflow-hidden pt-20 pb-10">
      <div className="px-8 md:px-14 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10 md:gap-16">
        <div className="font-display text-outline text-6xl md:text-8xl leading-[0.85]">
          WISS
          <br />
          TURNER
        </div>

        <div>
          <h4 className="text-[0.72rem] tracking-[0.3em] text-white/60 uppercase mb-4">
            Social
          </h4>
          <ul className="space-y-2 text-white/90 text-sm md:text-base">
            <li><a href="#" className="hover:text-white">instagram</a></li>
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white">Behance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.72rem] tracking-[0.3em] text-white/60 uppercase mb-4">
            Contact
          </h4>
          <ul className="space-y-1.5 text-white/90 text-sm md:text-base">
            <li>wiss@example.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Creative Lane, Suite 45</li>
            <li>Design City, CA 90210</li>
          </ul>
        </div>
      </div>

      {/* Shapes spread across the footer — each slowly cycles color, staggered */}
      <div className="mt-16 px-8 md:px-14 flex items-center justify-between gap-2">
        {SHAPES.map((type, i) => (
          <div
            key={i}
            className="shape-hue"
            style={{ animationDelay: `${-i * 1.1}s` }}
          >
            <Shape type={type} />
          </div>
        ))}
      </div>

      <div className="mt-10 px-8 md:px-14 text-[0.65rem] tracking-[0.3em] text-white/40 uppercase flex justify-between">
        <span>© {new Date().getFullYear()} Wiss</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
