# Wiss — Portfolio

Portfolio website built with **Next.js 16** + **Tailwind CSS v4** + **GSAP** + **Lenis** for smooth scroll and scroll-driven animations.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- Lenis (smooth scroll)
- GSAP (animations, ready to use)
- TypeScript

## Sections

1. **Hero** — big `HI, I'M WISS` title, 3D robot head centered, parallax on mouse move, CTA button tilts when cursor approaches.
2. **Clients / Tech Stack** — tech stack row + two rows of scroll-driven marquees (top row drifts right, bottom drifts left).
3. **About Me** — 3D decorative elements revealed on scroll.
4. **Services** — white surface with rounded top corners, 5 numbered services with line-reveal and text clip-mask animations.
5. **Projects** — 5 cards stacking on top of each other (sticky stack effect).
6. **Contact** — form + decorative shapes, rounded transition from black to white.
7. **Footer** — big outlined name, social/contact columns, infinite marquee of colorful geometric shapes.

## Run

```bash
npm install
npm run dev
```

Dev server: http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Assets

Drop the real **robot head PNG** at `public/robot-head.png` — a placeholder is already wired up in the Hero. Any image with `naturalWidth > 10px` will fade in over the placeholder.

You can also replace the colored placeholder tiles in `components/Clients.tsx` and `components/Projects.tsx` with your real project images.

## Customize

- Texts and content: each section has its own component in `/components`.
- Fonts: Geist Sans (body) + Anton (display titles) via `next/font/google`.
- Colors: tweak the gradient stops in `app/globals.css` (`btn-pill` class) and the palettes inside `Clients.tsx` / `Projects.tsx`.
