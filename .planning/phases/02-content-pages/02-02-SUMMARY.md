---
phase: 02-content-pages
plan: "02"
subsystem: ui
tags: [next.js, tailwind-css, react, server-component, seo, responsive]
requires:
  - phase: 01-foundation
    provides: "Layout shell (Header, BottomNavDock, Footer), design tokens (tailwind.config.ts), shared components (PulseButton, Icon, OrganicCard, MeltingShadow), self-hosted typography"
  - phase: "02-01"
    provides: "Home hero prototype analysis, data patterns (src/data/insights.ts, src/data/projects.ts), image assets (public/images/home-hero-bg.svg)"
provides:
  - "Full Home page (src/app/page.tsx) with hero section, bento gallery, SEO metadata, and responsive layout"
  - "Ambient radial gradient background matching Surrealist Echoes prototype"
  - "Accessible images with descriptive alt text, proper heading hierarchy"
affects:
  - "02-03 (Portfolio page — shares design patterns, component usage)"
  - "02-04 (Insights page — same responsive breakpoint strategy)"
tech-stack:
  added: []
  patterns:
    - "Server Component page with inline metadata export (no 'use client')"
    - "Next.js Image with fill prop for decorative hero backgrounds"
    - "Responsive bento grid using md:grid-cols-12 with asymmetric col-span"
    - "Fixed ambient radial gradient overlay with mix-blend-screen"
    - "Inherited layout (Header/Nav/Footer) from root layout — page only provides main content"
key-files:
  created:
    - ".planning/phases/02-content-pages/deferred-items.md"
  modified:
    - "src/app/page.tsx — Full Home page (117 lines) replacing Phase 1 stub"
key-decisions:
  - "Icon component already accepted size 48 from plan 02-01 — no extension needed"
  - "Gallery Echo Chambers card uses a button element for 'Explore' (not a link) since target route is undefined"
  - "Floating decorative blob hidden on mobile (hidden md:flex) to prevent overlap with centered hero text"
patterns-established:
  - "Page-as-Server-Component: export const metadata with openGraph, export default async-free component"
  - "Fixed ambient background: div with fixed inset-0 z-[-1] opacity-40 blur-3xl mix-blend-screen + inline radial-gradient"
  - "Responsive bento grid: grid-cols-1 md:grid-cols-12 with md:col-span-N for asymmetric layout"
requirements-completed: [PAGE-02, DSGN-04, INFR-03]
duration: 6min
completed: 2026-04-30
---

# Phase 2 Plan 02: Home Page Port — Surrealist Echoes Hero & Bento Gallery

**Full Home page with hero headline, ambient gradient, floating blob, CTAs, and responsive bento gallery matching the `home_the_persistence_of_intelligence` prototype**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-30T16:59:00Z
- **Completed:** 2026-04-30T17:05:10Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments

- Replaced Phase 1 stub (25 lines) with full 117-line Home page matching prototype fidelity
- Hero section with ambient fixed radial gradient, headline in Epilogue 200 with amber drop-shadow, italic elevator pitch, and two PulseButton CTAs
- Floating decorative blob with memory icon (hidden on mobile, visible on desktop)
- Bento gallery section with Synaptic Landscapes (col-span-8) and Echo Chambers (col-span-4) cards using prototype organic border-radius and melting shadows
- Full SEO metadata export: title, description, and openGraph tags
- Responsive layout: single-column mobile, 12-column asymmetric desktop grid
- Zero anti-patterns: no CDN refs, no font-epilogue, no data-alt, no inline style tags

## Task Commits

Each task was committed atomically:

1. **Task 1: port Home hero section with ambient background, headline, subtext, and floating decorative element** — `9d8c041` (feat)
2. **Task 2: port bento gallery section with Synaptic Landscapes and Echo Chambers cards** — `199d963` (feat)
3. **Task 3: final responsive polish, self-check, and Lighthouse readiness** — `23da749` (chore)

## Files Created/Modified

- `src/app/page.tsx` — Full Home page Server Component (117 lines): metadata export, ambient background, hero section with headline/CTAs/floating blob, bento gallery with two cards, responsive breakpoints
- `.planning/phases/02-content-pages/deferred-items.md` — Log of pre-existing TypeScript errors in portfolio/page.tsx (out of scope for this plan)

## Decisions Made

- Gallery "Explore" button in Echo Chambers card uses a plain `<button>` element (not a link) since the target route is undefined in the prototype — can be wired later
- Floating decorative blob uses `hidden md:flex` to hide entirely on mobile (prevents overlap with centered hero text on narrow viewports)
- Ambient background uses hex values directly (`#e8a838`, `#0164b4`) in inline style since Tailwind `theme()` function is unavailable in inline styles
- Hero section has `pt-24` additional padding to account for the layout's fixed header transition

## Deviations from Plan

None — plan executed exactly as written. The Icon component already contained `size?: 20 | 24 | 32 | 48` from plan 02-01, so no extension was needed for the `size={48}` memory icon.

## Issues Encountered

- **Pre-existing TypeScript errors in portfolio/page.tsx** (TS2322): Three errors in files from plan 02-01 — mixBlendMode type, animation duration type, and Icon size 36. These are out of scope for 02-02 and logged to `deferred-items.md` for plan 02-03 to resolve.
- **Acceptance criteria grep artifact**: The multi-line JSX `<Image alt="...">` pattern causes `grep '<Image' | grep -v 'alt='` to false-positive. Both Images were manually verified to have descriptive alt text.

## Verification Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` (page.tsx only) | ✅ Zero errors |
| `npx next build` | ✅ Compiled successfully, 10/10 static pages |
| CDN references | ✅ 0 |
| `font-epilogue` usage | ✅ 0 |
| `data-alt` attributes | ✅ 0 |
| Font tokens (5 types) | ✅ 7 usages |
| Color tokens | ✅ 11 usages |
| Spacing tokens | ✅ 6 usages |
| Responsive breakpoints | ✅ 4 patterns |
| Heading hierarchy | ✅ h1 → h2 → h3 |
| Image alt text | ✅ All 2 images |
| OpenGraph metadata | ✅ Present |
| Min line count (≥100) | ✅ 117 lines |

## Must-Have Truths Verified

- ✅ Hero headline "The Persistence of Intelligence" in Epilogue 200 weight with amber drop-shadow
- ✅ Hero subtext displays italic elevator pitch paragraph
- ✅ Two CTA buttons ("Explore the Playground" → /playground, "Contact" → mailto:hello@nuramirah.com)
- ✅ Bento gallery shows "Synaptic Landscapes" (span 8) and "Echo Chambers" (span 4) cards
- ✅ Layout adapts: mobile single-column, desktop 12-column asymmetric bento grid
- ✅ Ambient background renders fixed radial gradient with primary-container (#e8a838) and secondary-container (#0164b4)

## Next Phase Readiness

- Home page is complete and statically prerendered — ready for integration with navigation
- Gallery "Explore" button may need href wired when Echo Chambers page exists
- Pre-existing portfolio TypeScript errors should be resolved by plan 02-03

---
*Phase: 02-content-pages*
*Completed: 2026-04-30*
