---
phase: 02-content-pages
plan: 01
subsystem: content-data-and-seo
tags: [data-layer, seo, local-assets, footer-branding]
requires: []
provides: [typed-article-data, typed-project-data, local-svg-images, sitemap, robots, footer-tagline]
affects: [src/data/, public/images/, src/app/sitemap.ts, src/app/robots.ts, src/components/Footer.tsx]
tech-stack:
  added: []
  patterns: [TypeScript-constants-data-layer, Next.js-file-convention-routes]
decisions:
  - Content data lives in src/data/ as TypeScript constants per D-08/D-09
  - SVG placeholders use Surrealist Echoes palette (#ffc66b, #e8a838, #a4c9ff, #eac9b4, #171305)
  - DREAM_VOID appears in footer as poetic brand tagline per D-05
  - Sitemap and robots use Next.js MetadataRoute patterns for programmatic generation
  - Default site URL: https://nuramirah.com (overridable via NEXT_PUBLIC_SITE_URL env var)
metrics:
  tasks: 3/3
  files: 9
  duration: ~10min
  completed: 2026-04-30T16:51:40Z
key-files:
  created:
    - src/data/insights.ts
    - src/data/projects.ts
    - public/images/home-hero-bg.svg
    - public/images/insights-diagram.svg
    - public/images/portfolio-island-1.svg
    - public/images/portfolio-island-2.svg
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/components/Footer.tsx
---

# Phase 2 Plan 1: Data Layer, Assets, and SEO Infrastructure Summary

**One-liner:** Typed content data files, local SVG placeholders, and SEO infrastructure (sitemap, robots, DREAM_VOID footer) laid down for content page implementation.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create typed article and project data files | `9f4a834` | `src/data/insights.ts`, `src/data/projects.ts` |
| 2 | Create local SVG placeholder images | `50a29ab` | `public/images/home-hero-bg.svg`, `public/images/insights-diagram.svg`, `public/images/portfolio-island-1.svg`, `public/images/portfolio-island-2.svg` |
| 3 | Create sitemap, robots, and update Footer | `8a20986` | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/Footer.tsx` |

## What Was Built

### Task 1: Content Data Layer
Created `src/data/insights.ts` and `src/data/projects.ts` as typed TypeScript constant data files per D-08. Each exports a typed interface and a constant array:

- **`Article` interface** with fields: id, title, date, excerpt, body, tags, iconName, diagramAlt, diagramSrc
- **`articles` array** with one seed article ("Observation 04.12") using surrealist content and `pest_control` icon
- **`Project` interface** with fields: id, number, title, description, tags, iconName, imageAlt, imageSrc, optional cta, layout direction
- **`projects` array** with two portfolio items ("Echoes of the Melted Grid", "The Weightless Atelier") matching prototype card content

### Task 2: Local SVG Placeholder Images
Created 4 SVG images in `public/images/` replacing Google-hosted AIDA CDN URLs (INFR-02). Each SVG:
- Uses Surrealist Echoes palette colors exclusively (97 total color references across files)
- Contains no external references (only `xmlns` namespace URL)
- Conveys the visual intent from prototype `data-alt` descriptions:
  - **home-hero-bg.svg**: Abstract desert dunes with warm amber sunset, radial gradients, soft undulating shapes
  - **insights-diagram.svg**: Neural network as melting organic nodes connected by fluid paths, warm amber lighting against dim barren room
  - **portfolio-island-1.svg**: Flowing amber and deep blue liquid forms with volumetric lighting, melting drip effects
  - **portfolio-island-2.svg**: Floating spheres over infinite horizon with ethereal dramatic lighting, negative space for weightlessness

### Task 3: SEO Infrastructure + Footer Branding
- **`src/app/sitemap.ts`**: Programmatic sitemap generation using `MetadataRoute.Sitemap`, listing 4 routes (/, /insights, /portfolio, /playground) with appropriate changeFrequency and priority
- **`src/app/robots.ts`**: Robots.txt generation using `MetadataRoute.Robots` with allow-all rules and sitemap reference
- **`src/components/Footer.tsx`**: Added DREAM_VOID poetic brand tagline per D-05 above copyright line, with amber-500 glow effect (`drop-shadow-[0_5px_15px_rgba(232,168,56,0.2)]`) and gradient background

## Verification Results

| Check | Status |
|-------|--------|
| TypeScript compilation (`npx tsc --noEmit`) | ✅ Pass — zero errors |
| `articles` export in insights.ts | ✅ Found |
| `projects` export in projects.ts | ✅ Found |
| 4 SVG files in public/images/ | ✅ All 4 present |
| SVG XML namespace valid | ✅ All contain `xmlns="http://www.w3.org/2000/svg"` |
| No external references in SVGs | ✅ Clean (only xmlns) |
| Surrealist Echoes colors in SVGs | ✅ 97 references across files |
| Footer DREAM_VOID tagline | ✅ Present with amber glow |
| Footer gradient background | ✅ `bg-gradient-to-t` applied |
| Sitemap default export | ✅ Found |
| Robots default export | ✅ Found |

## Deviations from Plan

None — plan executed exactly as written. All tasks completed without deviations.

## Self-Check

- [x] `src/data/insights.ts` — EXISTS
- [x] `src/data/projects.ts` — EXISTS
- [x] `public/images/home-hero-bg.svg` — EXISTS
- [x] `public/images/insights-diagram.svg` — EXISTS
- [x] `public/images/portfolio-island-1.svg` — EXISTS
- [x] `public/images/portfolio-island-2.svg` — EXISTS
- [x] `src/app/sitemap.ts` — EXISTS
- [x] `src/app/robots.ts` — EXISTS
- [x] Commit `9f4a834` — EXISTS in git log
- [x] Commit `50a29ab` — EXISTS in git log
- [x] Commit `8a20986` — EXISTS in git log

**Self-Check: PASSED**
