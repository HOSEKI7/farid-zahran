# Spec: Farid Zahran Portfolio Website

## Problem Statement

Farid Zahran is a Full-stack Developer and AI Engineer who needs a personal portfolio website to showcase his work, professional background, and technical capabilities. The website must leave a strong visual impression on visitors (recruiters, clients, collaborators) while loading fast and ranking well in search engines. Current state: no website exists — only a design system document ("Halide") has been established.

## Solution

Build a dark, cinematic, single-page portfolio website with a secondary route for project detail pages. The site is statically exported from Next.js, deployed to Vercel, and styled according to the existing "Halide" design system — monochrome palette with a single orange-red accent, grain texture, and 3D parallax effects. Animations are driven by a hybrid of GSAP (scroll/timeline/DOM) and Framer Motion (React state/transitions). The site ships zero server runtime; all pages are pre-rendered HTML served from a CDN.

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
10. As a recruiter, I want to click a "Tech Stack" button in the About section and see a modal dialog, so that I can explore technical skills without the section being cluttered.
11. As a recruiter, I want the Tech Stack dialog to have tabs separating "Full-stack" and "AI Engineer" skills, so that I can quickly assess skills relevant to my open position.
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

### Architecture

- **Next.js App Router** with `output: 'export'` for full static generation. No server runtime.
- **TypeScript** for all source files. Project data typed with interfaces.
- **Tailwind CSS v4** configured with the Halide design system tokens via `@theme` block.
- **JetBrains Mono** loaded from Google Fonts in the root layout `<head>`.

### Rendering & Routing

- Homepage (`/`) is a single-page scroll with sections: Hero, About, Projects, Experience, Contact, Footer.
- Project detail pages at `/projects/[slug]` — statically generated from JSON data using `generateStaticParams`.
- Page transitions between homepage and project detail pages via Framer Motion `AnimatePresence` (fade + subtle slide). May be upgraded during development.

### Data Layer

- Project data stored in a single JSON file with the following shape per entry: `title`, `description`, `tags` (string array), `liveUrl`, `slug`, `bidang` ("fullstack" | "ai"), `githubUrl`, `year`.
- A TypeScript interface enforces this shape. Components import the typed data directly.
- Project detail page content (long description, screenshots, tech breakdown) is hardcoded in individual page components or a content map — not in the JSON.
- Experience data is hardcoded in the Experience section component.
- Tech stack data (Full-stack and AI Engineer categories) is hardcoded in the Tech Stack dialog component.

### Animation Strategy (Hybrid)

- **GSAP** handles: hero entrance timeline (rotate from 90deg, 2500ms, spring easing), text scramble effect on job title, 3D parallax on mouse/device move, scroll-triggered section entrance animations (ScrollTrigger).
- **Framer Motion** handles: Tech Stack dialog open/close (`AnimatePresence`), tab switching (layout animation), page transitions (`AnimatePresence`), mobile menu overlay animation, hover states on interactive elements.
- Both libraries respect `prefers-reduced-motion`: GSAP checks the media query before running timelines; Framer Motion uses `useReducedMotion` hook.

### Navigation

- Top bar, fixed position, three sections: brand "FZ" (left), section nav links (center), social icons — GitHub, LinkedIn, Instagram (right).
- Active section tracked via scroll position (Intersection Observer or ScrollTrigger).
- Design details and code to be provided by the owner during development.
- Mobile: hamburger icon triggers full-screen overlay menu with Framer Motion stagger animation.

### Contact & Form

- Contact form with fields: name, email, message.
- Submission via Web3Forms or Formspree (HTML form action, zero JS dependency for submission).
- Success/error feedback shown inline after submission.
- Download CV button alongside the form in the Contact section.
- Social links (GitHub, LinkedIn, Instagram) also present in Contact section.

### Responsive Design

- Mobile-first responsive approach using Tailwind breakpoints defined in the design tokens (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- Hero title uses fluid typography: `clamp(3rem, 10vw, 10rem)`.
- 3D parallax reduced intensity on mobile.
- Full-screen overlay menu replaces inline nav links on mobile.

### Design System

- All tokens from `design-tokens.json` are applied via Tailwind v4 `@theme` directive.
- Dark-only theme. No light mode toggle.
- SVG `feTurbulence` grain texture overlay at 15% opacity.
- Single accent color `#ff3c00`. Blend modes (`difference`, `screen`, `overlay`) on hero layers.
- UI design is improvised during development — the spec does not prescribe visual layout beyond what the Halide design system defines.

### Deployment

- Vercel with automatic deploy on `git push`.
- Static export: Vercel serves pre-built HTML/CSS/JS from its CDN.
- No environment variables or secrets needed initially (form service API key can be hardcoded in form action URL or added as env var later).

## Testing Decisions

Testing is scoped to four seams that verify external behavior without coupling to visual implementation details.

### Seam 1: Data Boundary (JSON → Rendered Output)

- Verify that every entry in the project JSON file produces a corresponding card on the homepage.
- Verify that `generateStaticParams` produces a route for every slug in the JSON.
- Verify that filtering by `bidang` shows only matching projects.
- **How**: Build-time assertions or lightweight integration tests using React Testing Library against rendered components. Prior art: standard Next.js static generation testing patterns.

### Seam 2: Form Submission Boundary

- Verify that the contact form validates required fields (name, email, message) before submission.
- Verify that the form posts to the correct external endpoint.
- Verify that success and error states are rendered after submission.
- **How**: Integration tests with mocked fetch/form action. Test the form component in isolation.

### Seam 3: Accessibility Boundary

- Verify that `prefers-reduced-motion: reduce` disables or reduces GSAP timelines and Framer Motion animations.
- Verify that color contrast ratios meet WCAG AA (primary text) and AAA where claimed in the design system.
- Verify that all interactive elements are keyboard-focusable with visible focus indicators.
- **How**: Automated accessibility audit (axe-core or Lighthouse CI). Manual verification of `prefers-reduced-motion` behavior.

### Seam 4: Build Output

- Verify that `next build` completes without errors.
- Verify that the `out/` directory contains HTML files for `/`, and for each `/projects/[slug]`.
- Verify that no server-only features are accidentally used (which would break static export).
- **How**: CI pipeline runs `next build` on every push. Check for expected output files.

### What makes a good test here

A good test for this project verifies **observable behavior from the visitor's perspective** — does the right content appear, does the form work, does the build succeed. Tests should NOT assert on CSS class names, animation timings, specific DOM structure, or internal component state. The visual design is improvised and will change frequently — tests that couple to visual details will break constantly and provide no value.

## Out of Scope

- **Backend / Database** — No API routes, no database, no CMS. Data is static JSON and hardcoded content. Database integration is a future migration, not part of this spec.
- **Authentication** — No login, admin panel, or protected routes.
- **Blog / Articles** — No blog section. May be added in a future iteration.
- **Internationalization (i18n)** — Website content is in English. No multi-language support.
- **Light mode** — Design system is dark-only. No theme toggle.
- **Analytics integration** — Vercel Web Analytics is available for free but not part of this spec. Can be enabled with one click later.
- **E2E visual regression testing** — May be added later; not justified for initial development where design is actively improvised.
- **Specific UI mockups or wireframes** — Design is improvised during development. This spec defines behavior and architecture, not pixel-perfect layouts.
- **Custom domain setup** — DNS configuration is a deployment task, not a development task.

## Further Notes

- The Halide design system (`DESIGN.md`, `design-tokens.json`) is the source of truth for all visual tokens. Any token changes should be made there first, then propagated to code.
- The design system was originally authored with Astro component references (`limelight-nav.astro`, `scramble-text.astro`). These will be reimplemented as React components in Next.js — the design tokens and behavior specifications carry over, not the Astro code.
- Experience section format (vertical timeline) is tentative and may change significantly during development based on the owner's preference.
- Page transitions may be upgraded from simple fade+slide to more impressive animations during development.
- Navbar design and code will be provided by the owner during development.
- The owner retains full creative control over visual design decisions during implementation. This spec constrains architecture and behavior, not aesthetics.
