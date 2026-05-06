---
phase: 02-content-pages
plan: 03
subsystem: insights-page
tags: [insights, journal-cards, surreal-diagram, responsive-layout, melting-cards]
requires: [02-01]
provides: [full-insights-page, journal-article-rendering, surreal-diagram-card]
affects: [src/app/insights/page.tsx, src/components/Icon.tsx]
tech-stack:
  added: []
  patterns: [next-image-fill, server-component-metadata, data-driven-content-rendering, figure-figcaption-accessibility]
decisions:
  - Exported IconName type from Icon component to enable type-safe icon name casting in page components
  - Used articles[0] for diagram data (single article in seed data) — naturally extends when more articles are added to data file
  - Preserved prototype quirks: 2000ms image transition, mix-blend-luminosity, asymmetric rounded corners on diagram card
  - Used real alt text from data (not data-alt attribute) per D-02 accessibility requirements
metrics:
  tasks: 2/2
  files: 2
  duration: ~15min
  completed: 2026-04-30T17:03:16Z
key-files:
  created: []
  modified:
    - src/app/insights/page.tsx
    - src/components/Icon.tsx
---

# Phase 2 Plan 3: Insights Page — Journal Articles & Surreal Diagram Summary

**One-liner:** Full Insights page with melting-shape journal article cards rendered from typed data, ambient background blurs, rotated title section, pull quote, and surreal diagram card with hover-reveal figcaption — faithfully ported from the `insights_ethereal_inquiries` prototype.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Build Insights page with journal article cards and ambient background | `88d9ae1` | `src/app/insights/page.tsx`, `src/components/Icon.tsx` |
| 2 | Add surreal diagram card with figcaption hover reveal and responsive polish | `eaf1519` | `src/app/insights/page.tsx` |

## What Was Built

### Task 1: Journal Article Cards & Layout (88d9ae1)

Replaced the Phase 1 Insights stub with a full Server Component at `src/app/insights/page.tsx`. The page renders:

- **Metadata export** with title "Ethereal Inquiries", description, and OpenGraph tags (INFR-03)
- **Ambient background** — two absolute-positioned blur divs (`blur-[120px]`, `blur-[150px]`) with `mix-blend-screen` for the ethereal atmosphere from the prototype
- **Rotated title section** — "Ethereal Inquiries" h1 at `-rotate-2` with `drop-shadow` and border-left accent on the subtitle, exactly matching the prototype's asymmetric layout
- **Fluid 12-column grid** — responsive from single-column mobile to `md:col-span-7` / `md:col-span-5` desktop split
- **Melting article cards** — `articles.map()` renders each article with:
  - Organic border-radius: `rounded-[50%_40%_30%_60%/40%_50%_60%_50%]`
  - Surrealist Echoes shadow: `shadow-[40px_20px_80px_rgba(0,0,0,0.6)]`
  - Glassmorphism: `bg-surface-container-low/40 backdrop-blur-md`
  - Decorative blur accent element inside each card
  - Hover scale: `hover:scale-[1.02] duration-1000`
  - Semantic `<time>` element for dates
  - Tag bullets rendered with `<Icon>` component using `article.iconName`
- **Pull quote block** — gradient divider line + italic quote text with "amber-scented mist" copy
- **Accessibility** — real alt text, semantic HTML (`<article>`, `<time>`, `<ul>/<li>`), `aria-hidden` on decorative icons (built into `<Icon>`)

To enable typed icon name usage in the data mapping, `IconName` was exported from `src/components/Icon.tsx`.

### Task 2: Surreal Diagram Card (eaf1519)

Filled the right column (`md:col-span-5`) with the surreal diagram card:

- **`next/image` with `fill`** — renders `articles[0].diagramSrc` (local SVG) with descriptive `alt` from `articles[0].diagramAlt`
- **`mix-blend-luminosity`** applied via `style` prop — matching the prototype's visual treatment exactly
- **Hover reveal sequence** — image transitions `opacity-70 → opacity-100` and `scale-105` over `duration-[2000ms]` (slow, atmospheric transition); figcaption slides up from `translate-y-4` to `translate-y-0` over `duration-700`
- **Asymmetric rounded corners** — `rounded-t-[40%]` on figure, `rounded-t-[3rem]` on figcaption (top only, bottom square)
- **Semantic HTML** — `<figure>` / `<figcaption>` providing accessible image-caption relationship
- **Diagram label** — "all_inclusive" icon + "Fig 1. Latent Topography" label in uppercase tracking-widest
- **Responsive** — `mt-16` on mobile (stacks below articles), `md:mt-40` on desktop (offset from articles)

## Verification

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` on insights/page.tsx | ✅ 0 errors |
| `articles.map()` renders cards | ✅ 1 occurrence |
| H1 `text-headline-lg` token | ✅ Present |
| `-rotate-2` transform on title | ✅ Present |
| Ambient blur divs (`blur-[120px]`) | ✅ Present |
| Pull quote ("amber-scented mist") | ✅ Present |
| No `data-alt` attributes | ✅ 0 occurrences |
| `md:col-span-7` responsive grid | ✅ Present |
| `<figure>` element for diagram | ✅ Present |
| `group-hover:translate-y-0` caption | ✅ Present |
| `articles[0].diagramSrc` usage | ✅ Present |
| `mixBlendMode` applied | ✅ Present |
| No Google CDN URLs | ✅ 0 occurrences |
| `md:col-span-5` right column | ✅ Present |
| File lines ≥ 100 | ✅ 136 lines |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Exported IconName type from Icon component**
- **Found during:** task 1
- **Issue:** Plan used `article.iconName as IconName` cast in the article loop, but `IconName` was a private type in `Icon.tsx`
- **Fix:** Changed `type IconName =` to `export type IconName =` in `src/components/Icon.tsx`
- **Files modified:** `src/components/Icon.tsx`
- **Commit:** `88d9ae1`

### Out-of-Scope Issues (Log Only)

- **Pre-existing TypeScript errors in `src/app/portfolio/page.tsx`** (3 errors: `MixBlendMode`, `AnimationDuration`, and `Icon size` type mismatches) — previously documented in `deferred-items.md` from plan 02-02. Not caused by plan 02-03 changes. Should be fixed by the portfolio plan (02-04).

## Threat Flags

None — no new surface beyond what the plan's `<threat_model>` already covers. The page is a static Server Component with no user input, no API routes, and all data from developer-authored constants. Metadata is intentional for SEO/social sharing (T-02-05 accepted).

## Known Stubs

None. All content is wired from `src/data/insights.ts` with real data. The diagram card uses `articles[0]` which resolves to a real entry. No placeholder text, hardcoded empty values, or unwired data sources.

## Self-Check: PASSED

- [x] `src/app/insights/page.tsx` exists (136 lines)
- [x] `src/components/Icon.tsx` modified (IconName exported)
- [x] Commit `88d9ae1` exists: Task 1
- [x] Commit `eaf1519` exists: Task 2
- [x] All acceptance criteria verified
- [x] No stub patterns in created/modified files
