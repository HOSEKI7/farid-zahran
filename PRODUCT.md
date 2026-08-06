# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Language

**CRITICAL RULE: The entire portfolio website (UI text, codebase, comments, and planning) MUST use English as the main language. Do not use or translate to Bahasa Indonesia.**

## Users

Primary visitor: recruiters and potential clients evaluating Farid Zahran for full-stack or AI engineering roles. Secondary: collaborators exploring his work. They arrive via social links, search, or shared URL, assess capability quickly, then decide whether to reach out.

## Product Purpose

Personal portfolio for Farid Zahran — Full-stack Developer & AI Engineer. It showcases his work, professional background, and technical capabilities, and must leave a strong visual impression while loading fast and ranking well in search engines. Success is a visitor converting into a contact or collaboration message.

## Positioning

A dark, cinematic single-page portfolio whose design is the product: monochrome + single orange-red accent, grain texture, 3D parallax, and text-scramble motion make it stand out from generic templates — while the underlying Next.js static export keeps it fast and fully indexable. The motion is the proof of the developer's craft.

## Operating Context

- Single-page scroll: Hero, About, Tech Stack, Projects, Experience, Contact, Footer. Project detail routes at `/projects/[slug]`.
- Visitor flow: land on hero → see name/role → scroll to About → skim Tech Stack capabilities → browse filterable Projects → skim Experience timeline → submit contact form / download CV / open socials.
- Static export (`output: 'export'`) served from Vercel CDN; no server runtime, no database, no CMS.
- Projects added by editing one JSON file (`src/data/projects.json`), typed via the `Project` interface.
- Design improvised during development per SPEC.md — behavior and architecture are constrained, not the aesthetics.

## Capabilities and Constraints

- Next.js 16.2.12 static export, TypeScript strict (no `any`/`unknown`), Tailwind CSS v4 via `@theme` tokens.
- Animation hybrid: GSAP for scroll/timeline/DOM (hero entrance, text scramble, 3D parallax); motion (Framer Motion successor) for state-driven transitions. Both respect `prefers-reduced-motion`.
- Halide design system (`DESIGN.md` + `design-tokens.json`) is the token source of truth; dark-only, no light mode.
- Contact form: name, email, message; submission via **Web3Forms** (HTML form action). Real email: `contact@faridzahran.com`.
- Content language is English; i18n out of scope. No blog, no auth, no backend.
- Zero JS friction for form submission; success/error feedback inline.

## Brand Commitments

- Name: Farid Zahran. Roles claimed: Full-stack Developer & AI Engineer.
- Halide visual identity: monochrome `#0a0a0a` dark room + single `#ff3c00` accent, grain texture, `difference`/`screen`/`overlay` blend modes, spring cubic-bezier easing, clip-path cut on the CTA button.
- Photo (hero image) and social media links are real; keep them as-is.

## Evidence on Hand

- Design system documented in `DESIGN.md`; tokens in `design-tokens.json`.
- SPEC.md (PRD) with user stories, architecture, and testing decisions.
- Real photo / hero image asset (`src/assets/images/hero-image.webp`).
- Real social links in navbar and contact sections.
- **Placeholder / not yet real (do not treat as product truth):** project entries in `src/data/projects.json` (only "Example Project"); About bio text and background; Experience timeline entries; downloadable CV (not yet produced).
- Real projects will be added to `projects.json` by the owner with valid live/GitHub URLs.

## Product Principles

- **Proof by motion.** Cinematic animation is not decoration; it demonstrates the developer's and AI engineer's craft and is the portfolio's differentiator.
- **Atmosphere over density.** Dark, grainy, restrained surfaces outrank information clutter.
- **Fast and indexable.** Every page pre-rendered; performance and SEO are first-class, not afterthoughts.
- **Owner-improvised.** Visual layout evolves during development; structure and behavior stay specified.
- **One accent discipline.** A single orange-red signal on a monochrome canvas keeps every interactive cue unambiguous.

## Accessibility & Inclusion

- Target WCAG AA contrast: `#e0e0e0` on `#0a0a0a` (~14.5:1); accent `#ff3c00` AA for large text only, not small body text.
- `prefers-reduced-motion: reduce` must disable or reduce GSAP and motion animations.
- Keyboard-focusable interactive elements with visible focus indicators (not yet fully implemented).
- Semantic HTML and ARIA labels for screen readers.
