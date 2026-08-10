# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Note

**YOU CAN ALWAYS EDIT THIS FOR EVERYTHING THAT NEEDS TO NOTED AFTER YOU COMPLETING SOMETHING NEW OR A CHANGE.**

## Context

- **Read SPEC.md for project spec and explanation**
- **Read DESIGN.md for design system**

## Language

**This portfolio website uses English as the main language.**

## Communication & Planning

**Always ask, instruct, write plans, and comments in Indonesian.**
But the entire portfolio (UI text, codebase, and documentation) is strictly in English.

## Workflow

- **If the prompt is ambiguous, enter plan mode and ask before writing any code.**
- Use Context7 to fetch up-to-date docs before planning & implementing.
- Use relevant skills when appropriate.
- Never mark a task complete without proving it works (dev server, relevant page/endpoint, DB state in Prisma Studio). Ask "Would a senior dev approve this PR?"
- Never commit or push without permission.
- Always provide a commit message of latest changes after finishing a task.
- If implementation differs from SPEC.md or DESIGN.md, or when making a new decision, update those docs to reflect it.

## Project Overview

Next.js 16.2.12 static portfolio (`output: 'export'` — no server runtime). Dark cinematic single-page app with GSAP + motion (Framer Motion successor) animations. Halide design system: monochrome + `##9ba480` accent.

## Commands

| Command         | Purpose                               |
| --------------- | ------------------------------------- |
| `npm run dev`   | Dev server                            |
| `npm run build` | Static export to `out/`               |
| `npm run lint`  | ESLint (core-web-vitals + typescript) |

No test framework configured.

## TypeScript

- `strict: true`, path alias `@/*` → `./src/*`
- **No `any` / `unknown`.** Project data typed via `Project` interface in `src/lib/types.ts`. Add new interfaces rather than using loose types.

## Project Data

Projects live in `src/data/projects.json`. Each entry must match the `Project` interface (`src/lib/types.ts`): `title`, `description`, `tags`, `liveUrl`, `slug`, `bidang` ("fullstack" | "ai"), `githubUrl`, `year`.

Add a project by adding a JSON entry — no component changes needed. Detail pages (if any) go in `src/app/projects/[slug]/`.

## Architecture

- **SSR for landing.** `"use client"` only when needed (state/effects/browser APIs).
- Use design-system components from `@/components/ui/` and tokens from `globals.css` `@theme` block.
- Component dirs: `layout/` (shell), `ui/` (reusable primitives), `sections/` (page sections), `animations/` (animation wrappers). `sections/` and `animations/` are currently empty.
- `cn()` utility from `clsx` + `tailwind-merge` (`src/lib/utils.ts`).
- Icons: `@hugeicons/react` with core-free-icons set; social icons inlined as SVGs. Tech brand marks in the Tech Stack orbit use `react-icons` (fa/si), rendered monochrome via `currentColor`.
- Navbar auto-hides after 2s scroll inactivity. LimelightNav manages active section indicator.
- Token source of truth: `design-tokens.json`. Propagate changes to `globals.css` `@theme` block.

## Animation

Hybrid: GSAP for scroll/timeline/DOM (hero entrance, text scramble, 3D parallax); motion (Framer Motion successor) for React state-driven transitions (dialogs, tabs, mobile menu, page transitions). Both respect `prefers-reduced-motion: reduce`.
