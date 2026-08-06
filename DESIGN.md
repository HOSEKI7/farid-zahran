# Halide Portfolio Design System

> Dark cinematic portfolio for FZ — monochrome with orange-red accent, grainy 3D aesthetic.

## Philosophy

This design system serves a single-page dark portfolio where drama and atmosphere take priority over information density. Every decision pushes toward a sense of depth, texture, and motion — a "halide" photographic quality where light reveals form against near-black backgrounds.

The system is deliberately constrained: one accent color, one primary typeface (Arial), one monospace secondary (JetBrains Mono), and a tight spacing/easing vocabulary. Constraints breed consistency.

---

## 1. Color

### Palette

| Token                  | Value             | Usage                 | Rationale                                                                                            |
| ---------------------- | ----------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `--color-background`   | `#0a0a0a`         | Page background       | Near-black creates the "dark room" feel; slightly lifted from pure black so grain texture is visible |
| `--color-card`         | `#1a1a1a`         | Surface / card bg     | One step above background — subtle hierarchy without breaking the dark atmosphere                    |
| `--color-foreground`   | `#e0e0e0`         | Primary text          | Light silver — high contrast on `#0a0a0a` without harsh pure-white glare                             |
| `--color-secondary`    | `#b0b0b0`         | Secondary text        | Distinguishable from primary, used for less important information                                    |
| `--color-muted`        | `#888888`         | Caption / placeholder | Lowest legible contrast on dark bg                                                                   |
| `--color-border`       | `#2a2a2a`         | Dividers / outlines   | Visible but not distracting — softer than pure gray                                                  |
| `--color-accent`       | `#9ba480`         | Interactive elements  | Subtle green — the single point of color. High contrast against black, signals attention         |
| `--color-accent-hover` | `#8b9373`         | Accent hover          | Slightly darker to indicate interaction without jarring shift                                        |
| `--color-primary`      | `#e0e0e0`         | Limelight glow        | Matches foreground — the "limelight" is a reflection of the text color, not a distinct hue           |
| `--color-overlay`      | `rgba(0,0,0,0.6)` | Backdrops             | Semi-transparent black for modal overlays                                                            |

### Why only one accent color

The hero section uses `mix-blend-mode: difference` on the title and grayscale filters on the photo layers. Adding more accent colors would fight the monochrome-to-orange tension that defines this portfolio. One accent ensures every interactive element (button hover, link) has a clear, consistent signal.

### Dark-mode only

This portfolio is designed as dark-only. The grain texture, 3D parallax, and `difference` blend mode all assume a dark canvas. A light mode would require rethinking the grain opacity, all blend modes, and the contrast ratios — it's not simply inverting colors.

---

## 2. Typography

### Font Family

| Token            | Stack                         | Usage                                        |
| ---------------- | ----------------------------- | -------------------------------------------- |
| `--font-primary` | `Arial, sans-serif`           | Hero title, body, headings                   |
| `--font-mono`    | `'JetBrains Mono', monospace` | Job title, small text, CTA button, brand tag |

**Why Arial:** A Helvetica-like sans-serif with guaranteed cross-platform rendering. No web font load delay. Its neutrality lets the texture and motion carry the personality rather than a display typeface.

**Why JetBrains Mono:** Clean monospace with good legibility at small sizes. Used for secondary info — creates a visual hierarchy shift from the generous Arial hero to tight, technical-feeling detail text.

### Font Size Scale

| Token     | Value                      | Usage Context                    |
| --------- | -------------------------- | -------------------------------- |
| `hero`    | `clamp(3rem, 10vw, 10rem)` | "FARID ZAHRAN" — fluid, dramatic |
| `h1`      | `2.5rem`                   | Section headings                 |
| `h2`      | `2rem`                     | Subsection headings              |
| `h3`      | `1.5rem`                   | Card / component headings        |
| `body`    | `1rem`                     | Paragraph text                   |
| `small`   | `0.875rem`                 | Captions, metadata               |
| `mono-sm` | `0.75rem`                  | Job title, nav extras            |
| `brand`   | `1.125rem`                 | "FZ" brand mark in navbar        |

### Line Height

- `tight` (0.85) — Hero title only. The extreme tightness is intentional: the hero is a visual mark, not readable body text.
- `snug` (1.1) — Large headings.
- `normal` (1.5) — Body text (default).

### Letter Spacing

- `hero` (`-0.04em`) — Tight tracking for the hero title creates a solid rectangular block.
- `normal` (`0`) — Everything else.

---

## 3. Spacing

The spacing scale follows a 4px base unit, using Tailwind's default scale. No custom spacing tokens are needed beyond Tailwind's built-in `p-{n}` utilities.

### Notable Values

| Usage                     | Value       | Token       |
| ------------------------- | ----------- | ----------- |
| Navbar vertical padding   | `0.75rem`   | `py-3`      |
| Navbar horizontal padding | `1.5rem`    | `px-6`      |
| Navbar offset (page top)  | `5rem`      | `pt-20`     |
| Interface grid padding    | `4rem`      | `16`        |
| Button padding            | `1rem 2rem` | `px-8 py-4` |
| Nav item padding          | `1.25rem`   | `p-5`       |
| Icon container            | `2.5rem`    | `h-10 w-10` |
| Nav gap                   | `1rem`      | `gap-4`     |
| Social icon gap           | `0.75rem`   | `gap-3`     |

---

## 4. Border & Radius

| Token  | Value            | Usage                                    |
| ------ | ---------------- | ---------------------------------------- |
| `sm`   | `0.25rem` (4px)  | Subtle corners                           |
| `md`   | `0.5rem` (8px)   | Cards, nav items (Tailwind `rounded-lg`) |
| `lg`   | `0.75rem` (12px) | Generous                                 |
| `xl`   | `1rem` (16px)    | Dialogs                                  |
| `full` | `9999px`         | Pills / tags                             |

The consistent use of `rounded-lg` (8px) across all components — nav, icon buttons — creates a unified silhouette. No component uses a different radius.

---

## 5. Shadows & Effects

| Name             | Value                              | Used On                                                         |
| ---------------- | ---------------------------------- | --------------------------------------------------------------- |
| `limelight-glow` | `0 50px 15px var(--color-primary)` | Nav active indicator — large blur creates a soft overhead light |
| `button-hover`   | `0 4px 12px rgba(255,60,0,0.3)`    | CTA button hover — warm glow matching accent                    |

### Grain Texture

An SVG `<feTurbulence>` filter generates fractal noise, applied via `filter: url(#grain)`. Opacity `0.15` keeps it subliminal — enough to add analog texture, not enough to distract.

### Clip Paths

- **CTA button:** `polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)` — diagonal cut on bottom-right corner. Signals "not an ordinary button."
- **Limelight glow base:** `polygon(5% 100%, 25% 0, 75% 0, 95% 100%)` — trapezoid shape widening toward the bottom, suggesting light cast downward.

### Blend Modes

- `hero-title`: `difference` — creates inverted-color interplay with the 3D photo layers beneath.
- `layer-2`: `screen` — second parallax layer burns brighter.
- `layer-3`: `overlay` — third layer adds contrast depth.

---

## 6. Animation

### Easing

| Name          | Curve                           | Used On                                                 |
| ------------- | ------------------------------- | ------------------------------------------------------- |
| `spring`      | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrance, limelight slide, job title scramble text |
| `ease-in-out` | `ease-in-out`                   | Button hover, general transitions                       |

The spring curve is the signature easing of this system. It overshoots subtly and settles — feels kinetic without being bouncy.

### Durations

| Token      | Value  | Used On                                    |
| ---------- | ------ | ------------------------------------------ |
| `instant`  | 100ms  | Nav icon opacity swap                      |
| `fast`     | 300ms  | Button hover, link hover                   |
| `normal`   | 400ms  | Limelight slide between nav items          |
| `slow`     | 800ms  | Canvas 3D transform on mouse move          |
| `entrance` | 2500ms | Hero load-in animation (rotate from 90deg) |

### Keyframe: `flow`

The scroll hint at the bottom of the hero uses a custom `flow` animation: a vertical line that "breathes" by scaling from the top, then from the bottom, creating a seamless loop.

### Hover Behavior

- **Nav item click:** Limelight slides to active item; target icon goes 100% opacity, others to 40%.
- **CTA button:** Background shifts from silver to accent, lifts 5px.
- **Social icons:** Opacity goes from muted (60%) to full (100%), no background change.
- **3D layers:** Mouse move rotates the canvas container and translates each layer at a different depth (parallax).

---

## 8. Accessibility Notes

- **Contrast:** `#e0e0e0` on `#0a0a0a` yields ~14.5:1 ratio (WCAG AAA). The accent `#9ba480` on `#0a0a0a` yields good contrast. Accent should not be used for small body text.
- **Focus states:** Not yet implemented. Add `outline: 2px solid var(--accent)` on all interactive elements.
- **Reduced motion:** Job title scramble component respects `prefers-reduced-motion: reduce` by swapping text instantly without GSAP tween. The hero entrance animation should also check this preference.
- **Touch targets:** Nav items and icon buttons are `h-10 w-10` (40px), exceeding the 44px WCAG recommendation for the icon buttons. Nav items are larger and fine.

---

## 9. AI Slop Check

| Pattern                                       | Status              | Note                                                                              |
| --------------------------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Gratuitous gradients                          | ✅ Not present      | Limelight glow is the only gradient; purpose-built                                |
| Purple-to-blue defaults                       | ✅ Not present      | Palette is monochrome + orange                                                    |
| Glass morphism                                | ✅ Not present      | No backdrop-blur or semi-transparent cards                                        |
| Rounded corners on everything                 | ⚠️ Minor            | All corners use consistent `rounded-lg`. Intentional — creates uniform silhouette |
| Excessive scroll animations                   | ✅ Not present      | Only one scroll hint animation                                                    |
| Generic hero with centered text over gradient | ✅ Avoided          | Hero uses 3D parallax layers + grain + difference blend — unique                  |
| Sans-serif with no personality                | ⚠️ Arial is vanilla | Arial is intentional — neutrality lets texture carry personality                  |

---

## 11. Usage in Another Project

To consume this design system in a new project:

1. **Copy `design-tokens.json`** — reference for all token values.
2. **Apply Tailwind tokens** — paste the `tailwind-v4-theme.snippet` into your `global.css` `@theme` block.
3. **Load JetBrains Mono** — add Google Fonts link in layout `<head>`.
4. **Copy components**
5. **Install deps:** `gsap`, `lucide-static`.
