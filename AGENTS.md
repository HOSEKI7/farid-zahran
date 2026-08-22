# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Agreement

- **Language split:** All shipped output — UI text, identifiers, code, docs — is **English**. Chat, plans, questions, and code comments to the owner are written in **Bahasa Indonesia**.
- **Be extremely concise**. Sacrifice grammar for the sake of consicion, for easiest and quick to understanding.
- **Read `SPEC.md` for the product spec, `DESIGN.md` for the design system.**
- If the prompt is ambiguous, enter plan mode and ask before writing code.
- **Fetch current docs before planning and implementing** — use Context7 for any library, and read the relevant guide in `node_modules/next/dist/docs/` for Next.js (see below). Don't work from memory.
- Use relevant skills when appropriate.
- Never mark a task complete without proving it works (dev server + the actual section in the browser). Ask: *"Would a senior dev approve this PR?"*
- Never commit or push. After finishing a task, provide a suggested commit message using /caveman-commit.
- When implementation diverges from `SPEC.md` or `DESIGN.md`, update those docs in the same change. Same for this file and `AGENTS.md` — keep them in sync when a convention changes.

### This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may all differ from training data. **Read the relevant guide in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`, `04-community`) before writing code**, and heed deprecation notices.

## Commands

| Command         | Purpose                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`   | Dev server (Turbopack). Fails if another instance holds the port — see `dev.log`; `taskkill /PID <pid> /F` to clear. |
| `npm run build` | Static export to `out/`                                                                                              |
| `npm run lint`  | ESLint (`eslint-config-next` core-web-vitals + typescript)                                                           |

No test framework is configured. `npm run start` exists but is meaningless under `output: 'export'`.

## Architecture

Next.js 16.2.12 App Router, **statically exported** (`output: 'export'`, `images.unoptimized: true` in `next.config.ts`). No server runtime, no API routes, no env vars — anything requiring a server breaks the build.

**Two routes.** `src/app/page.tsx` composes six sections in fixed order: Hero → About → Tech Stack → Projects → Experience → Contact. `src/app/layout.tsx` owns the Navbar, Footer, the global `<filter id="grain">` SVG, and the `.halide-grain` overlay div. `src/app/projects/[slug]/page.tsx` renders project detail pages, statically generated from `projects.json` via `generateStaticParams`.

**Component layers** (`src/components/`):

- `layout/` — Navbar, Footer (app shell, rendered once in layout).
- `sections/` — one file per homepage section; owns section chrome and data wiring.
- `ui/` — reusable presentational primitives (carousels, hero, nav, scramble text, timeline, orbit).
- `animations/` — `ScrollReveal` and `StaggerContainer`/`StaggerItem` wrappers used across every section.

**Server vs client:** default to server components. `experience-section.tsx` and `section-ghost-title.tsx` are server components; the rest are `"use client"` only because they use state, effects, or browser APIs.

**Reuse before you build.** Compose from existing primitives in `@/components/ui/` and style with the `@theme` tokens in `globals.css` — don't hand-roll a new carousel, nav, or hard-coded hex when one already exists. New shared primitives go in `ui/`; anything section-specific stays in that section's file.

Project detail pages, when built, belong at `src/app/projects/[slug]/` with `generateStaticParams` (required under `output: 'export'`).

### Section shell convention

Every section repeats this shape — match it when adding one:

```tsx
<section
  id="<slug>"
  className="relative w-full min-h-screen flex flex-col justify-center
  py-16 md:py-24 bg-background text-foreground border-t border-border/40 overflow-hidden"
>
  <ScrollReveal
    direction="up"
    distance={35}
    amount={0.3}
    className="relative z-10 text-center max-w-6xl mx-auto px-4 mb-6 md:mb-8"
  >
    <SectionGhostTitle text="About" />
    <p className="relative z-10 text-accent ... -mt-7 sm:-mt-11 md:-mt-16">
      subtitle
    </p>
  </ScrollReveal>
  ...
</section>
```

`SectionGhostTitle` renders an oversized `aria-hidden` masked-gradient word; the accent subtitle is pulled up with negative margins to overlap it. That overlap is deliberate — the negative margins are tuned per breakpoint.

### Navbar coupling

`src/components/layout/navbar.tsx` hardcodes `SECTION_IDS` plus a parallel `navItems` array with an index-based `handleNavClick(index, sectionId)`. **Adding, removing, or reordering a section requires editing both arrays and the indices.** Scroll spy is a manual `scroll` listener using `offsetTop` against a 35%-of-viewport threshold, with an 800ms suppression flag during programmatic smooth scroll. The bar auto-hides after 2s of scroll inactivity (stays visible within 15px of the top); on mobile it becomes a bottom floating dock.

## Data

| Source                      | Type                             | Notes                                                                 |
| --------------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `src/data/projects.json`    | `Project[]` (`src/lib/types.ts`) | Add a project by adding an entry — no component change                |
| `src/data/experiences.json` | `Experience[]`                   | Timeline + carousel content                                           |
| `src/data/tech-stack.ts`    | `TechGroup[]`                    | Six fixed categories; icon mapping lives in `tech-stack-section.tsx` |

**Asset path conventions** (the code derives paths, so files must be named to match):

- Project thumbnails: `public/projects-thumbnail/{slug}.webp`
- Company logos: `public/company-logo/{experiences.json → companyLogo}`
- Experience photos: `public/experience-photos/`
- Imported images (hero, about, logo) live in `src/assets/images/` and are imported as `StaticImageData`.

TypeScript is `strict`, alias `@/*` → `./src/*`. **No `any` / `unknown`** — add an interface to `src/lib/types.ts` instead.

## Design System — Halide

`design-tokens.json` is the source of truth; `DESIGN.md` explains the rationale. Changes go there **first**, then propagate to the `@theme` block in `src/app/globals.css`. Dark-only, no light mode, no theme toggle.

Monochrome base `#0a0a0a` with a single accent `#9ba480`. One accent is a hard constraint — the hero's `mix-blend-mode: difference` and grayscale layer filters depend on it. Accent fails contrast for small body text; use it for large text and interactive cues only.

`globals.css` holds both the `@theme` tokens and the hero's plain-CSS classes (`.viewport`, `.canvas-3d`, `.layer-1..3`, `.hero-title`, `.cta-button`, `.scroll-hint`, `.interface-grid`, `.contours`). Hero styles were deliberately extracted out of styled-jsx into this file — keep them there. Signature easing is `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-spring`).

Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes.

## Animation

Three mechanisms, each with a defined job:

- **`motion/react`** (Motion, the Framer Motion successor) — the default for React-driven animation. Import from `motion/react`. One legacy file, `parallax-scroll-feature-section.tsx`, still imports from `framer-motion`; both packages are installed, but new code uses `motion/react`.
- **GSAP** (`gsap` + `@gsap/react` `useGSAP`) — used only for the `ScrambleTextPlugin` in `scramble-text.tsx` and `job-title-scramble.tsx`. Wrap DOM-touching callbacks in `contextSafe`.
- **Plain CSS / inline styles** — the hero's 3D parallax and entrance animation are hand-rolled `style.transform` writes in a `useEffect` (`halide-topo-hero.tsx`), not GSAP. Initial states are set inline to prevent FOUC; don't move them into a class.

**Reduced motion is enforced in three places** and all three must stay in sync: `globals.css` clamps all animation/transition durations under `prefers-reduced-motion: reduce`; motion components call `useReducedMotion()` and return an unanimated `<div>`; GSAP components check `window.matchMedia("(prefers-reduced-motion: reduce)")` before tweening.

`ScrollReveal` and `StaggerContainer` default to `once: false`, so reveals re-trigger on every scroll pass. That is intentional.

## Icons

Three libraries, split by role: `@hugeicons/react` + core-free-icons for navbar section icons, `lucide-react` for generic UI glyphs, `react-icons` (`fa`/`fa6`/`si`) for tech brand marks rendered monochrome via `currentColor`. Social icons in the navbar are inlined SVGs.

## Known Gaps

- Keyboard focus indicators are not implemented site-wide (`DESIGN.md` §8 calls for `outline: 2px solid var(--accent)`).
- Navbar/contact social URLs are placeholders (`https://github.com`, `https://github.com/faridzahran`).
- CV download is specified but not built.
