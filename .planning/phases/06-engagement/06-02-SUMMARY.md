---
phase: 06-engagement
plan: 02
type: execute
wave: 2
status: complete
completed_date: 2026-05-06
tasks_completed: 3/3
tasks_auto: 2
tasks_skipped: 1
duration_minutes: ~5
requirements:
  - SOCL-01
  - SOCL-02
requires:
  - 06-01 (email utility foundation)
provides:
  - POST /api/newsletter/subscribe (Zod-validated, duplicate-aware, fire-and-forget confirmation email)
  - Newsletter form on home page (GlassPanel, all UX states)
  - subscribe-confirmation React Email template (Surrealist Echoes styled)
  - newsletter_subscribers migration SQL (ready for Supabase execution)
affects:
  - src/app/page.tsx (added newsletter section)
  - src/lib/email.ts (sendSubscribeConfirmation extended)
key-files:
  created:
    - supabase/migrations/001_newsletter_subscribers.sql
    - src/app/api/newsletter/subscribe/route.ts
    - src/emails/subscribe-confirmation.tsx
    - src/components/NewsletterForm.tsx
  modified:
    - src/app/page.tsx
    - src/lib/email.ts
decisions:
  - "Newsletter form extracted to src/components/NewsletterForm.tsx (per OpenCode's Discretion)"
  - "Duplicate detection via SELECT before INSERT with 23505 race-condition fallback"
  - "All non-success responses use 200 status with poetic messaging (per D-12)"
  - "Fire-and-forget email dispatch with .catch() error logging"
tech-stack:
  added: []
  patterns:
    - "Client Component form with idle|submitting|success|already_subscribed|previously_unsubscribed|error states"
    - "Zod safeParse + flatten().fieldErrors for validation (same as /api/leads)"
    - "Supabase .maybeSingle() for duplicate check before insert"
    - "23505 unique-violation catch for race condition protection"
    - "React Email template with Surrealist Echoes design tokens"
    - "GlassPanel + DripBorder + PulseButton component composition"
---

# Phase 6 Plan 2: Newsletter Subscribe — Migration, API, Form & Confirmation Email

**One-liner:** Newsletter subscription with Zod-validated API route, duplicate detection with friendly messaging, GlassPanel form on home page, and Surrealist Echoes-styled confirmation email via Resend.

## Task Summary

| # | Task | Status | Commit | Files |
|---|------|--------|--------|-------|
| 1 | Migration SQL + subscribe API route | ✅ | `74faf2c` | `supabase/migrations/001_newsletter_subscribers.sql`, `src/app/api/newsletter/subscribe/route.ts` |
| 2 | Confirmation email template + newsletter form + home page | ✅ | `aedfd20` | `src/emails/subscribe-confirmation.tsx`, `src/components/NewsletterForm.tsx`, `src/app/page.tsx`, `src/lib/email.ts` |
| 3 | Run migration in Supabase Dashboard | ↩️ Skipped | — | — |

## Task 1: Migration SQL + Subscribe API Route

Created `supabase/migrations/001_newsletter_subscribers.sql` with the `newsletter_subscribers` table:
- `id` UUID PK with `gen_random_uuid()`
- `email` text UNIQUE
- `status` text DEFAULT 'active' with CHECK constraint (`'active' | 'unsubscribed'`)
- `subscribed_at` and `updated_at` timestamptz
- Indexes on `email` and `status`

Created `POST /api/newsletter/subscribe` route with:
- Zod email validation (`z.string().email().min(1)`)
- Duplicate check via `SELECT` before `INSERT` (checks both `active` and `unsubscribed` statuses)
- Race-condition protection: catches PostgreSQL `23505` unique violation as fallback
- `already_subscribed` → 200 with "You're already in the echo"
- `previously_unsubscribed` → 200 with soft-block message (per D-08)
- `subscribed` → 200 with "Welcome to the echo." + fire-and-forget confirmation email
- Consistent error handling pattern matching `/api/leads`

## Task 2: Confirmation Email Template + Home Page Integration

Created `src/emails/subscribe-confirmation.tsx` — React Email template with Surrealist Echoes branding:
- Background `#171305`, text `#ebe2c8`, amber accent `#ffc66b`
- Heading: "You're in the echo."
- Poetic body: "Thank you for subscribing. You'll receive occasional transmissions from the boundary between artificial cognition and human dreaming."
- Footer: "NUR AMIRAH MOHD KAMIL — Portfolio & AI Playground"

Created `src/components/NewsletterForm.tsx` — Client Component handling all states:
- **Idle**: DripBorder email input + "Subscribe" PulseButton in GlassPanel with "Stay in the Echo" heading
- **Submitting**: Button shows "Subscribing..." + disabled
- **Success**: Amber glow GlassPanel with check_circle icon, "You're in the Echo"
- **Already subscribed**: Ethereal blue GlassPanel, "Already in the Echo" — friendly, non-error
- **Previously unsubscribed**: Tertiary GlassPanel, "Echo Faded" — soft block with contact suggestion
- **Error**: Server error displayed in error-styled box above form, form remains visible for retry

Modified `src/app/page.tsx`: Added `<NewsletterForm />` section between Gallery and page end. Extended `src/lib/email.ts` with `sendSubscribeConfirmation()` using the same Resend/SMTP pattern from Plan 01.

## Task 3: Supabase Migration (Skipped)

The migration SQL file at `supabase/migrations/001_newsletter_subscribers.sql` is ready but has **not** been executed in Supabase. The user chose to skip this checkpoint.

**Pre-condition for runtime:** The migration must be run in the Supabase SQL Editor before the subscribe API route will function. Until then, `POST /api/newsletter/subscribe` will return a 500 error because the `newsletter_subscribers` table does not exist.

**How to run:**
1. Open Supabase project dashboard → SQL Editor
2. Copy contents of `supabase/migrations/001_newsletter_subscribers.sql`
3. Paste and click "Run"
4. Verify in Table Editor: `newsletter_subscribers` table with columns `id`, `email`, `status`, `subscribed_at`, `updated_at`

## Deviations from Plan

### User-Skipped Manual Step

**1. [Task 3 — Skipped] Supabase migration not executed**
- **Found during:** task 3 checkpoint (human-action)
- **Issue:** Migration SQL exists at `supabase/migrations/001_newsletter_subscribers.sql` but the `newsletter_subscribers` table has not been created in Supabase
- **Resolution:** User chose "skip" — migration must be run manually before the subscribe API route will work at runtime
- **Files affected:** None (code is complete, infra step pending)
- **Impact:** Subscribe API route will return 500 until table exists

No other deviations. Tasks 1–2 executed exactly as planned.

## Known Stubs

None. All form states, API responses, and email templates are fully implemented with production-ready messaging. No TODO/FIXME/placeholder stubs exist in the plan's files.

## Threat Flags

None beyond what is documented in the plan's `<threat_model>`. The implementation follows all mitigations:
- T-06-04 (Tampering): Zod email validation with `.email()` and `.min(1)` on all inputs
- T-06-05 (Information Disclosure): Server-side Supabase access only via `getSupabase()` with service role key
- T-06-06 (DoS): Accepted per threat model (low-volume portfolio site)
- T-06-07 (Spoofing): Accepted per threat model (public-facing signup, no auth required)

## Verification Status

| Criterion | Status |
|-----------|--------|
| Migration SQL created | ✅ `supabase/migrations/001_newsletter_subscribers.sql` |
| `POST /api/newsletter/subscribe` with Zod validation | ✅ `src/app/api/newsletter/subscribe/route.ts` |
| Duplicate → "already_subscribed" (200) | ✅ SELECT-before-INSERT + 23505 fallback |
| Previously unsubscribed → soft block (200) | ✅ Status check before insert |
| Fire-and-forget confirmation email | ✅ `sendSubscribeConfirmation().catch()` |
| Newsletter form on home page | ✅ `<NewsletterForm />` in `src/app/page.tsx` |
| All form states: idle/submitting/success/duplicate/unsubscribed/error | ✅ `NewsletterForm.tsx` |
| React Email template with Surrealist Echoes styling | ✅ `subscribe-confirmation.tsx` |
| TypeScript compiles clean | ✅ `npx tsc --noEmit` passes |
| Migration run in Supabase | ❌ Skipped — manual step pending |

## Commits

| Hash | Message |
|------|---------|
| `74faf2c` | feat(06-engagement): create newsletter_subscribers migration and subscribe API route |
| `aedfd20` | feat(06-engagement): create subscribe confirmation email and newsletter form on home page |

## Self-Check: PASSED

All 5 created files verified present, both commits (`74faf2c`, `aedfd20`) confirmed in git log.
