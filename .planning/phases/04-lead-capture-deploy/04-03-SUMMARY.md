---
phase: 04-lead-capture-deploy
plan: 03
subsystem: Integration + Deploy
tags: [integration, deploy, vercel, analytics, build]
requires:
  - LeadCaptureForm (04-02)
  - POST /api/leads (04-01)
provides:
  - Form integration on /playground
  - Vercel Analytics + SpeedInsights
  - Production build verification
affects:
  - src/app/playground/page.tsx
  - src/app/layout.tsx
  - src/components/VercelProviders.tsx
tech-stack:
  added:
    - "@vercel/analytics"
    - "@vercel/speed-insights"
patterns:
  - Form below 3-column layout with gradient divider
  - Poetic header matching playground surrealist tone
  - Analytics providers in layout body (before </body>)
key-files:
  created:
    - src/components/VercelProviders.tsx
  modified:
    - src/app/playground/page.tsx
    - src/app/layout.tsx
key-decisions:
  - "Form integrated below playground right panel, not inline — keeps terminal UI clean"
  - "Gradient divider (via outline-variant/30) separates interactive section from lead form"
  - "No Edge runtime exports — Supabase + OpenAI SDKs require Node.js serverless"
  - "SpeedInsights added alongside Analytics for Core Web Vitals monitoring"
requirements-completed:
  - LEAD-01
  - INFR-04
duration: 8 min
completed: 2026-05-01
---

# Phase 4 Plan 03: Integration + Deploy Summary

**LeadCaptureForm integrated into playground page, Vercel Analytics configured, production build passing with all routes verified.**

## What Was Built
- LeadCaptureForm integrated into `/playground` page: full-width section below terminal with poetry header and gradient divider
- `VercelProviders` component: renders Analytics + SpeedInsights, integrated in RootLayout
- Production build: 13 static pages, 3 dynamic API routes, zero key leakage

## Build Output
```
Route (app)
├ ○ /              (static)
├ ƒ /api/ai/gemini (dynamic)
├ ƒ /api/ai/openai (dynamic)
├ ƒ /api/leads     (dynamic)
├ ○ /insights       (static)
├ ○ /playground     (static)
├ ○ /portfolio      (static)
├ ○ /robots.txt     (static)
├ ○ /sitemap.xml    (static)
└ ○ /surrealist-echoes (static)
```

## Deviations
| # | Type | Detail |
|---|------|--------|
| 1 | Rule 1 (build crash) | Supabase client eager init caused build failure when env vars absent — fixed by lazy factory `getSupabase()` |
| 2 | Rule 1 (Edge runtime) | Plan suggested Edge Functions but Supabase SDK requires Node.js — documented in config that Node.js serverless is correct target |

## Self-Check: PASSED

- TypeScript: zero errors
- Build: 13 static + 3 dynamic routes, zero errors
- Zero Supabase keys in `.next/static/` (verified via grep)
- LeadCaptureForm renders on playground page
- VercelProviders renders in layout
