# PRD: Farid Zahran Portfolio Website

*Merged from PRODUCT.md (product brief) and SPEC.md (technical spec). Single source of truth going forward.*

## Language

**CRITICAL: UI text and codebase (code, identifiers, content strings) MUST be in English — do not translate any of it to Bahasa Indonesia.** Code comments, internal summaries, and planning documents may be written in Bahasa Indonesia.

## Problem Statement

Farid Zahran is a Full-stack Developer and AI Engineer who needs a personal portfolio website to showcase his work, professional background, and technical capabilities. The website must leave a strong visual impression on visitors (recruiters, clients, collaborators) while loading fast and ranking well in search engines. Current state: no website exists — only a design system document ("Halide") has been established.

## Users & Positioning

**Primary visitor:** recruiters and potential clients evaluating Farid Zahran for full-stack or AI engineering roles.
**Secondary visitor:** collaborators exploring his work.

**Visitor flow:** arrive via social links, search, or shared URL → hero (name/role) → About → Tech Stack → Projects (filterable) → Experience → Contact form / CV download / socials.

**Positioning:** design as the differentiator — dark, cinematic, single-accent, motion-driven — while staying a fast, fully indexable Next.js static export. The motion is proof of craft, not decoration.

**Success metric:** a visitor converts into a contact or collaboration message.

## Solution

Single-page portfolio (`/`) plus a secondary `/projects/[slug]` route, statically exported from Next.js and deployed to Vercel per the Halide design system. Animation uses a GSAP + Framer Motion hybrid. Zero server runtime — every page pre-rendered and CDN-served.

## Content Status — What's Real vs. Placeholder

*Read before implementing. Treat placeholder items as structural only — never invent content to fill them.*

- **Real, keep as-is:** hero photo, social links (navbar + Contact), Halide design system (`DESIGN.md`, `design-tokens.json`).
- **Placeholder, not final:** `projects.json` (only "Example Project" so far — real entries added later by the owner), About bio, Experience timeline, CV (not yet produced).

Build the components to render this data correctly; leave the content itself empty or clearly placeholder until supplied.

## Product Principles

Use these to resolve ambiguity in improvised visual design — they outrank inventing a new direction:

- **Proof by motion** — animation demonstrates craft; it's the differentiator, not decoration.
- **Atmosphere over density** — dark, grainy, restrained beats cluttered.
- **Fast and indexable** — performance and SEO are first-class.
- **Owner-improvised** — layout evolves during build; structure/behavior stay fixed, aesthetics stay flexible.
- **One accent discipline** — a single orange-red signal keeps every interactive cue unambiguous.

## User Stories

### First-Time Visitor (Recruiter / Client)

1. As a recruiter, I want the page to load within 2 seconds on a 4G connection, so that I don't leave before seeing content.
2. As a recruiter, I want to immediately see Farid's name and role on the hero section, so that I know whose portfolio I'm viewing.
3. As a recruiter, I want the hero section to feel cinematic with 3D parallax and grain texture, so that the portfolio stands out from generic templates.
4. As a recruiter, I want to see a scrambling text effect on the job title, so that the site feels technically impressive and alive.
5. As a recruiter, I want a clear CTA button ("Explore My Work") in the hero, so that I know how to proceed.
6. As a recruiter, I want to click the CTA and be smoothly scrolled to the Projects section, so that navigation feels intentional and immersive.
7. As a recruiter, I want a fixed top navigation bar with brand, section links, and social icons, so that I can jump to any section at any time.
8. As a recruiter, I want the active nav item to be visually highlighted as I scroll through sections, so that I always know where I am on the page.
9. As a recruiter, I want to scroll to the About section and see Farid's photo and a brief background, so that I get a personal sense of who he is.
10. As a recruiter, I want to scroll to the Tech Stack section and see technical skills in a single grouped card, so that I can assess capabilities without the section feeling cluttered.
11. As a recruiter, I want the Tech Stack card to organize skills into five categories (Frontend & User Interface, Backend & API Architecture, AI/ML & Data Processing, Database & Vector Storage, Infrastructure/DevOps/MLOps), so that I can quickly assess skills relevant to my open position.
12. As a recruiter, I want to browse project cards in the Projects section, so that I can see the breadth of Farid's work.
13. As a recruiter, I want to filter projects by field (Full-stack / AI Engineer) using tabs, so that I only see relevant work.
14. As a recruiter, I want each project card to show title, short description, tags, and year, so that I can quickly assess relevance.
15. As a recruiter, I want to click a project card and be taken to a detail page with smooth page transition, so that the experience feels polished.
16. As a recruiter, I want the project detail page to show in-depth information (screenshots, tech used, description, links to live site and GitHub), so that I can evaluate the quality of work.
17. As a recruiter, I want to navigate back from a project detail page to the homepage without losing scroll position context, so that browsing feels seamless.
18. As a recruiter, I want to scroll to the Experience section and see a vertical timeline of professional history, so that I understand career progression.
19. As a recruiter, I want timeline items to animate in as I scroll, so that the experience feels dynamic and engaging.
20. As a recruiter, I want to scroll to the Contact section and fill out a contact form (name, email, message), so that I can reach out directly without opening my email client.
21. As a recruiter, I want to receive clear feedback after submitting the form (success or error message), so that I know my message was sent.
22. As a recruiter, I want to download Farid's CV from the Contact section, so that I can review his credentials offline or share with my team.
23. As a recruiter, I want to see social links (GitHub, LinkedIn, Instagram) in the navbar and Contact section, so that I have multiple ways to connect.
24. As a recruiter, I want a clean, minimalist footer at the bottom, so that the page has a clear ending.

### Mobile Visitor

25. As a mobile visitor, I want the navigation to collapse into a hamburger icon that opens a full-screen overlay menu, so that I can navigate without a cramped dropdown.
26. As a mobile visitor, I want the full-screen menu to animate open with a dramatic stagger effect, so that the mobile experience feels as premium as desktop.
27. As a mobile visitor, I want the 3D parallax in the hero to work at reduced intensity, so that performance is acceptable on lower-end devices.
28. As a mobile visitor, I want all sections to be fully readable and usable in a single-column layout, so that nothing is cut off or overlapping.

### Accessibility

29. As a visitor with motion sensitivity, I want animations to be reduced or disabled when my OS-level `prefers-reduced-motion` is set to `reduce`, so that the site doesn't cause discomfort.
30. As a visitor using a keyboard, I want all interactive elements (nav links, buttons, form inputs, project cards) to have visible focus indicators, so that I can navigate without a mouse.
31. As a visitor using a screen reader, I want semantic HTML and appropriate ARIA labels, so that the content is navigable and understandable.

### SEO / Discoverability

32. As a search engine crawler, I want fully rendered HTML with proper `<title>`, `<meta description>`, Open Graph tags, and semantic heading hierarchy, so that the portfolio ranks well and previews correctly when shared.
33. As a search engine crawler, I want each project detail page to have its own unique metadata, so that individual projects are indexable.

### Site Owner (Farid)

34. As the site owner, I want to add a new project by adding an entry to a single JSON file, so that I don't need to touch component code.
35. As the site owner, I want the project JSON schema to be TypeScript-typed, so that I get autocomplete and error checking when adding entries.
36. As the site owner, I want the site to build and export successfully with `next build`, so that I can verify correctness before deploying.
37. As the site owner, I want `git push` to trigger automatic deployment on Vercel, so that publishing changes is frictionless.
38. As the site owner, I want the design to be improvised during development without rigid mockups, so that I have creative freedom during the build process.

## Implementation Decisions

### Architecture & Deployment

- Next.js 16.2.12, App Router, `output: 'export'`. No server runtime.
- TypeScript strict (no `any`/`unknown`); project data typed via interfaces.
- Tailwind CSS v4 via `@theme` with Halide tokens; JetBrains Mono from Google Fonts.
- Deploy: Vercel, automatic on `git push`, serving pre-built HTML/CSS/JS from its CDN. No env vars needed initially — the Web3Forms endpoint can be hardcoded in the form action, or moved to an env var later.

### Rendering & Routing

- Homepage (`/`) is a single-page scroll: Hero, About, Tech Stack, Projects, Experience, Contact, Footer.
- Project detail pages at `/projects/[slug]`, statically generated via `generateStaticParams`.
- Page transitions via Framer Motion `AnimatePresence` (fade + subtle slide) — may be upgraded during development.

### Data Layer

- `projects.json` shape per entry: `title`, `description`, `tags`, `liveUrl`, `slug`, `bidang` ("fullstack" | "ai"), `githubUrl`, `year` — enforced by a `Project` TypeScript interface.
- Project detail long-form content (screenshots, tech breakdown) hardcoded per page, not in the JSON.
- Experience data hardcoded in the Experience component; timeline format is tentative and may change during development based on the owner's preference.
- Tech stack data (5 categories) lives in `src/data/tech-stack.ts` as a typed `TechGroup` array.

### Animation Strategy (Hybrid)

- **GSAP:** hero entrance (rotate from 90deg, 2500ms, spring easing), text scramble on job title, 3D parallax on pointer/device move, scroll-triggered entrances (ScrollTrigger).
- **Framer Motion:** Tech Stack scroll-reveal stagger, page transitions, mobile menu overlay, hover states.
- **CSS keyframes:** Tech Stack orbit rotation (icons counter-rotate to stay upright; disabled under reduced motion).
- Both respect `prefers-reduced-motion` (GSAP checks the media query before running timelines; Framer Motion uses `useReducedMotion`).

### Navigation

- Fixed top bar: brand "FZ" (left), section links (center), social icons — GitHub, LinkedIn, Instagram (right).
- Active section tracked via scroll position (Intersection Observer or ScrollTrigger).
- Mobile: hamburger → full-screen overlay menu with Framer Motion stagger. Design and code to be provided by the owner during development.

### Contact & Form

- Fields: name, email, message. Submission via **Web3Forms** (final decision — Formspree dropped), destination `contact@faridzahran.com`.
- Inline success/error feedback after submission. CV download button alongside the form. Social links also present here.

### Responsive Design

- Mobile-first, Tailwind breakpoints per design tokens (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- Hero title fluid typography: `clamp(3rem, 10vw, 10rem)`.
- Reduced-intensity 3D parallax and full-screen overlay nav on mobile.

### Design System

- Tokens from `design-tokens.json` via Tailwind v4 `@theme`. Dark-only, no light mode.
- Monochrome base `#0a0a0a`, single accent `#9ba480`.
- SVG `feTurbulence` grain overlay at 15% opacity; blend modes (`difference`/`screen`/`overlay`) on hero layers; spring cubic-bezier easing; clip-path cut on the CTA button.
- Layout is improvised during build — see Product Principles for resolving gaps.

## Testing Decisions

Testing is scoped to four seams that verify external behavior without coupling to visual implementation details.

### Seam 1: Data Boundary (JSON → Rendered Output)

- Every entry in the project JSON produces a corresponding homepage card.
- `generateStaticParams` produces a route for every slug in the JSON.
- Filtering by `bidang` shows only matching projects.
- **How:** build-time assertions or lightweight React Testing Library integration tests.

### Seam 2: Form Submission Boundary

- The contact form validates required fields (name, email, message) before submission.
- The form posts to the correct external endpoint (Web3Forms).
- Success and error states render after submission.
- **How:** integration tests with mocked fetch/form action, testing the form component in isolation.

### Seam 3: Accessibility Boundary

- `prefers-reduced-motion: reduce` disables or reduces GSAP and Framer Motion animations.
- Color contrast meets WCAG AA (primary text) and AAA where claimed in the design system.
- All interactive elements are keyboard-focusable with visible focus indicators.
- **How:** automated audit (axe-core or Lighthouse CI) plus manual verification of reduced-motion behavior.

### Seam 4: Build Output

- `next build` completes without errors.
- The `out/` directory contains HTML for `/` and every `/projects/[slug]`.
- No server-only features are accidentally used (would break static export).
- **How:** CI runs `next build` on every push; check for expected output files.

### What makes a good test here

Test observable behavior — right content appears, form works, build succeeds. Don't assert on CSS classes, animation timing, DOM structure, or internal state: the visual design changes often, and tests coupled to it will break constantly for no value.

## Accessibility & Inclusion

- Target WCAG AA contrast: `#e0e0e0` on `#0a0a0a` (~14.5:1). Accent `#9ba480` meets AA for large text only — not for small body copy.
- `prefers-reduced-motion: reduce` must disable or reduce GSAP and Framer Motion animations.
- Keyboard-focusable interactive elements need visible focus indicators — **not yet fully implemented as of this writing**.
- Semantic HTML and ARIA labels required for screen reader support.

## Out of Scope

- **Backend / Database** — no API routes, database, or CMS. Data is static JSON and hardcoded content.
- **Authentication** — no login, admin panel, or protected routes.
- **Blog / Articles** — none for now; may be added in a future iteration.
- **Internationalization (i18n)** — content in English only (see Language). No multi-language support.
- **Light mode** — dark-only, no theme toggle.
- **Analytics integration** — Vercel Web Analytics available but not part of this spec; enable later with one click.
- **E2E visual regression testing** — not justified while design is actively improvised.
- **Specific UI mockups or wireframes** — this spec defines behavior and architecture, not pixel-perfect layouts.
- **Custom domain setup** — a deployment task, not a development task.

## Further Notes

- The Halide design system (`DESIGN.md`, `design-tokens.json`) is the source of truth for all visual tokens — change there first, then propagate to code.
- Original design references were Astro components (`limelight-nav.astro`, `scramble-text.astro`); these get reimplemented as React components — tokens and behavior carry over, not the Astro code.
- The owner retains full creative control over visual decisions; this spec constrains architecture and behavior, not aesthetics (see Product Principles).
