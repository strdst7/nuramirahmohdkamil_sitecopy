---
phase: 04-lead-capture-deploy
plan: 01
subsystem: Backend
tags: [api, supabase, zod, validation, leads]
requires:
  - SUPABASE_URL (env var)
  - SUPABASE_SERVICE_ROLE_KEY (env var)
provides:
  - POST /api/leads
  - src/lib/supabase.ts
affects:
  - src/app/api/leads/route.ts
  - src/lib/supabase.ts
tech-stack:
  added:
    - "@supabase/supabase-js"
    - zod
patterns:
  - Phase 3 route.ts pattern (NextRequest, try/catch, Response.json)
  - Zod safeParse for server-side validation
  - Lazy Supabase client initialization (prevents build-time crash)
key-files:
  created:
    - src/lib/supabase.ts
    - src/app/api/leads/route.ts
  modified:
    - .env.example
    - package.json
key-decisions:
  - "Supabase client lazy-initialized via getSupabase() — avoids build crash when env vars missing"
  - "Zod enum uses `message` not `errorMap` (zod v4 API change)"
  - "Service role key used for server-to-server inserts (no RLS, no auth)"
requirements-completed:
  - LEAD-02
  - LEAD-03
duration: 5 min
completed: 2026-05-01
---

# Phase 4 Plan 01: Supabase Backend Summary

**Supabase client + Zod-validated POST /api/leads route following Phase 3 API patterns.**

## What Was Built
- `src/lib/supabase.ts` — Lazy-initialized Supabase client with service role key
- `POST /api/leads` — Zod-validated endpoint validating 4 fields (project_name req, email opt, whatsapp opt, intent enum) and inserting into `playground_leads`
- `.env.example` updated with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

## Deviations
| # | Type | Detail |
|---|------|--------|
| 1 | Rule 1 (zod v4 API) | `errorMap` removed from zod enum — changed to `message` for zod v4 compatibility |
| 2 | Rule 1 (build crash) | Eager Supabase client instantiation crashed `npm run build` when env vars absent — changed to lazy `getSupabase()` factory |

## Self-Check: PASSED

- TypeScript: zero errors
- Build: zero errors
- Zero Supabase keys in client bundle
- All env vars documented in .env.example
