---
phase: 02-content-pages
plan: 04
subsystem: ui
tags: [portfolio, nextjs, tailwind, surrealist-echoes, css-filters, glassmorphism, server-component]

# Dependency graph
requires:
  - phase: 02-01
    provides: src/data/projects.ts (Project interface and projects array)
  - phase: 01-foundation
    provides: Layout shell, design tokens (tailwind.config.ts), shared components (Icon, PulseButton)
provides:
  - Full Portfolio page at /portfolio with data-driven drifting island project cards
  - Surrealist Echoes visual fidelity: organic blob border-radius, melting shadows, luminosity-blended images
  - Responsive asymmetric layout: stacked on mobile, drifted positions on desktop
  - Accessible images with descriptive alt text and Next.js Image optimization
affects:
  - Any content page that follows similar data-driven rendering patterns
  - Phase 03 (AI Playground) — established patterns for fusing prototype aesthetics with Next.js

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Data-driven page rendering: TypeScript constants in src/data/ drive Server Components via .map()"
    - "style prop for non-standard CSS: mixBlendMode, animationDuration via `as React.CSSProperties`"
    - "Conditional layout variants within .map(): render different JSX branches based on data field (project.layout)"
    - "Next.js Image fill mode: parent must be relative + overflow-hidden for organic border-radius clipping"

key-files:
  created: []
  modified:
    - src/app/portfolio/page.tsx — Full Portfolio page replacing Phase 1 stub (195 lines)
    - src/components/Icon.tsx — Exported IconName type, added size 36 to union

key-decisions:
  - "Used style prop with `as React.CSSProperties` for mixBlendMode and animationDuration to avoid TS strict type mismatch"
  - "Exported IconName type from Icon.tsx to support type-safe icon name passing from string data"
  - "Preserved prototype's 2000ms image hover zoom quirk (duration-[2s]) per D-01 fidelity rule"

patterns-established:
  - "Conditional card rendering: project.layout field drives two distinct article structures within a single .map()"
  - "CSS filter effects on Next.js Image: contrast-125, saturate-50, hue-rotate-15 work alongside fill mode"
  - "Asymmetric tag pills: alternating border-radius per index for visual variety"

requirements-completed: [PAGE-05, DSGN-04, INFR-03]

# Metrics
duration: 18min
completed: 2026-04-30
---

# Phase 02 Plan 04: Portfolio Page — Drifting Island Project Cards

**Surrealist Echoes Portfolio page with organic blob card shapes, luminosity-blended images, melting shadows, SVG decorative connections, and data-driven rendering from `src/data/projects.ts` — replacing the Phase 1 stub.**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-04-30T16:49:00Z
- **Completed:** 2026-04-30T17:07:47Z
- **Tasks:** 2 (1 implementation + 1 verification)
- **Files modified:** 2

## Accomplishments

- Built full Portfolio Server Component with Metadata export (`The Archive of Dreams`), OG tags, and description
- Ambient glow via fixed radial gradient and decorative SVG Bezier curves with circle nodes (matching prototype)
- Two drifting island project cards rendered from `src/data/projects.ts` with distinct layout variants:
  - **Project 01** (right drift): smaller, image above text, contrast-125 + saturate-50 filters, `mix-blend-color-burn` overlay
  - **Project 02** (left drift): larger, horizontal flex layout on desktop, `hue-rotate-15` filter, CTA via PulseButton with `east` icon
- All images use `mixBlendMode: "luminosity"` for prototype-faithful color blending
- Organic border-radius: `rounded-[4rem_2rem_5rem_3rem]`, `rounded-[3rem_6rem_4rem_5rem]`, and asymmetric tag pills
- Melting shadows: `shadow-[30px_50px_80px_rgba(0,0,0,0.6)]`, `shadow-[50px_40px_100px_rgba(0,0,0,0.5)]`
- Floating hourglass decorative element with 8s `animate-pulse` animation
- Full accessibility: descriptive `alt` text, semantic `<h1>`→`<h2>` hierarchy, `aria-hidden` on icons
- Zero prototype anti-patterns: no CDN URLs, no `data-alt`, no `font-epilogue`, no hardcoded `min-h-[2048px]`

## task Commits

Each task was committed atomically:

1. **task 1: build Portfolio page with ambient glow, title, SVG connections, and data-driven drifting island cards** - `4581f0c` (feat)
2. **task 2: responsive polish, image color grading, and self-check for prototype fidelity** — Verified clean, no code changes needed

**Plan metadata:** Not yet committed (orchestrator owns final commit)

## Files Created/Modified

- `src/app/portfolio/page.tsx` — Full Portfolio page (195 lines). Metadata export, ambient glow, SVG connections, title with border-left accent, data-driven cards with two layout variants, floating hourglass, accessibility compliance.
- `src/components/Icon.tsx` — Exported `IconName` type for use in other components. Added `size 36` to the accepted size union for the hourglass icon.

## Decisions Made

- Used `style={{ mixBlendMode: "..." } as React.CSSProperties}` pattern for CSS blend modes (overlay, luminosity) and animationDuration to satisfy TypeScript strict types while preserving CSS fidelity.
- Exported `IconName` type from `Icon.tsx` to enable type-safe `project.iconName as IconName` casting in page components.
- Preserved the prototype's 2000ms image hover zoom (`duration-[2s]`) as a deliberate surrealist quirk per decision D-01 (prototype fidelity).
- Used conditional rendering branches (not a unified template) for the two card layouts — the structural differences (image placement, flex direction, content order) were too significant for a single template.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript type errors on CSS properties**
- **Found during:** task 1 (initial build)
- **Issue:** `mixBlendMode: "overlay"` and `animationDuration: "8s"` rejected by TS as incompatible types. Used `as React.CSSProperties` casting on the entire style object.
- **Fix:** Changed from `style={{ mixBlendMode: "overlay" as React.CSSProperties }}` to `style={{ mixBlendMode: "overlay" } as React.CSSProperties}`
- **Files modified:** `src/app/portfolio/page.tsx`
- **Verification:** `npx tsc --noEmit` passes with 0 errors
- **Committed in:** `4581f0c` (part of task 1 commit)

**2. [Rule 3 - Blocking] Icon component didn't accept size 36, IconName type not exported**
- **Found during:** task 1 (icon usage)
- **Issue:** Plan specifies `<Icon size={36}>` but Icon component's `size` prop was typed `20 | 24 | 32 | 48`. Plan also references `import { type IconName }` but the type was not exported.
- **Fix:** Added `36` to size union in Icon.tsx. Exported `IconName` type from Icon.tsx.
- **Files modified:** `src/components/Icon.tsx`
- **Verification:** `npx tsc --noEmit` passes, imports resolve correctly
- **Committed in:** `4581f0c` (part of task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both auto-fixes necessary for compilation. No scope creep. All plan requirements met.

## Issues Encountered

- Plan acceptance criterion for metadata title grep count (≥2) returned 1 with exact pattern `"The Archive of Dreams"` — the openGraph title `"The Archive of Dreams — Nur Amirah"` doesn't match the closing-quote position of the grep pattern. The metadata IS correctly set to `"The Archive of Dreams"`. This is a plan grep pattern imprecision, not a code defect.

## Next Phase Readiness

- Portfolio page fully functional and passes build
- Responsive layout verified at mobile and desktop breakpoints
- Image assets (`/public/images/portfolio-island-1.svg`, `portfolio-island-2.svg`) confirmed present
- CTA button href is `"#"` (dead link) as defined in `src/data/projects.ts` — will need a real URL when project detail pages exist
- Ready for Phase 03 (AI Playground) planning

---

## Self-Check: PASSED

- `src/app/portfolio/page.tsx` — exists (195 lines, ≥ 100 minimum)
- `src/components/Icon.tsx` — exists (IconName exported, size 36 added)
- `.planning/phases/02-content-pages/02-04-SUMMARY.md` — exists
- Commit `4581f0c` — confirmed in git log
- `npx tsc --noEmit` — 0 errors
- `npx next build` — static generation successful

---

*Phase: 02-content-pages*
*Plan: 04*
*Completed: 2026-04-30*
