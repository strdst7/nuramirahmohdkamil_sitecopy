---
phase: 06-engagement
plan: 01
subsystem: email-notifications
tags: [email, lead-capture, fire-and-forget, resend, smtp, react-email]
dependency_graph:
  requires: [LEAD-04, LEAD-05]
  provides: [lead-notification-delivery, email-utility]
  affects: [POST /api/leads]
tech-stack:
  added: [resend, @react-email/components, nodemailer, @types/nodemailer]
  patterns: [singleton-lazy-init, fire-and-forget, server-side-env-proxy]
key-files:
  created:
    - src/lib/email.ts
    - src/emails/lead-notification.tsx
  modified:
    - package.json
    - package-lock.json
    - src/app/api/leads/route.ts
    - .env.example
decisions:
  - "Template stub created in Task 1 (not Task 2) to satisfy TypeScript compilation dependency"
  - "React Email template uses inline styles matching Surrealist Echoes tokens (#171305, #ebe2c8, #ffc66b, #504535, #9d8e7c)"
  - "SMTP env vars commented out in .env.example per D-02 (optional fallback)"
metrics:
  phase: "06-engagement"
  plan: "01"
  duration: "~10 min"
  tasks_completed: 2
  files_changed: 6
  loc_added: 946
  completed_date: "2026-05-06"
---

# Phase 6 Plan 1: Lead Email Notification Summary

**One-liner:** Real-time Resend-powered email notifications on lead capture with SMTP fallback and Surrealist Echoes-styled React Email template — fire-and-forget, zero API latency impact.

## What Was Built

Installed `resend`, `@react-email/components`, `nodemailer`, and `@types/nodemailer`. Created `src/lib/email.ts` with the `sendLeadNotification()` utility following the singleton lazy-init pattern from `src/lib/supabase.ts`. The utility selects the email provider at runtime: Resend (primary, if `RESEND_API_KEY` is set) → Nodemailer SMTP (fallback, if `SMTP_HOST` is set) → skip with `console.warn` if neither is configured. Both functions return `false` on delivery failure — callers use fire-and-forget with `.catch()` for logging only.

Created `src/emails/lead-notification.tsx` — a React Email template rendering all 5 lead fields (`project_name`, `email`, `whatsapp`, `intent`, `submitted_at`) with Surrealist Echoes styling carried into the inbox via inline styles (#171305 background, #ebe2c8 text, #ffc66b amber accent, #504535 separator, #9d8e7c footer). Includes a conditional "View in Supabase" link when `SUPABASE_URL` is set.

Modified `POST /api/leads` route to call `sendLeadNotification()` after the successful Supabase insert and before the 200 response. The `.catch()` handler ensures email delivery failures are logged but never block the API response — maintaining the existing sub-second form submission experience.

Extended `.env.example` with 7 email-related env vars: `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `NOTIFICATION_TO_ADDRESS` (required for Resend), plus `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (commented out as optional SMTP fallback per D-02).

Also exported `sendSubscribeConfirmation()` as a stub (`// TODO: Implement in Plan 02`) to prevent build errors when Plan 02 creates the newsletter subscribe route.

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Install email packages and create email utility | `5ed10f4` | `package.json`, `package-lock.json`, `src/lib/email.ts`, `src/emails/lead-notification.tsx` |
| 2 | Create lead notification template and wire into API route | `0a486b9` | `src/app/api/leads/route.ts`, `.env.example` |

## Verification Results

- [x] `npm run build` — compiled successfully, zero TypeScript errors
- [x] `src/lib/email.ts` exports `sendLeadNotification()` and `sendSubscribeConfirmation()` (stub)
- [x] `src/emails/lead-notification.tsx` renders Surrealist Echoes-styled email with all 5 lead fields
- [x] `POST /api/leads` calls `sendLeadNotification()` after Supabase insert, returns 200
- [x] `.env.example` documents all 7 email-related env vars
- [x] Threat mitigation T-06-01 verified: zero `RESEND_API_KEY` or `SMTP_PASS` strings in `.next/static/`
- [x] Existing lead form logic preserved: `leadSchema.safeParse` and `.from("playground_leads")` confirmed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created email template in Task 1 instead of Task 2**
- **Found during:** Task 1
- **Issue:** `src/lib/email.ts` imports `LeadNotificationEmail` from `@/emails/lead-notification`. The plan schedules template creation in Task 2, but `email.ts` would fail TypeScript compilation without the import target.
- **Fix:** Created `src/emails/lead-notification.tsx` during Task 1 as part of the package install + email utility task. The template is fully implemented — Task 2 only modified `route.ts` and `.env.example`.
- **Files modified:** `src/emails/lead-notification.tsx`
- **Commit:** `5ed10f4`

## Known Stubs

| File | Line | Description |
|------|------|-------------|
| `src/lib/email.ts` | ~120 | `sendSubscribeConfirmation()` — returns `false` with `TODO: Implement in Plan 02` comment. Intentional stub for newsletter confirmation email planned in Plan 02. |

## Threat Surface Verification

| Threat ID | Mitigation | Status |
|-----------|-----------|--------|
| T-06-01 | Resend API key and SMTP credentials accessed only via `process.env` on the server — verified zero key leakage in `.next/static/` | ✅ Verified |
| T-06-03 | All lead data validated by Zod schema before email notification triggered; validation logic untouched | ✅ Verified |

No new threat surface introduced beyond the plan's `<threat_model>`.

## Self-Check: PASSED

- [x] `src/lib/email.ts` exists — FOUND
- [x] `src/emails/lead-notification.tsx` exists — FOUND  
- [x] Commit `5ed10f4` exists — FOUND
- [x] Commit `0a486b9` exists — FOUND
- [x] `package.json` contains `resend`, `@react-email/components`, `nodemailer` — CONFIRMED
- [x] `npm run build` exits 0 — CONFIRMED
- [x] Zero API keys in `.next/static/` — CONFIRMED
