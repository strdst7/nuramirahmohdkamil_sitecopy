---
phase: 06-engagement
verified: 2026-05-07T00:00:00Z
status: human_needed
score: 13/13 must-haves verified
overrides_applied: 0
re_verification: false
gaps: []
deferred: []
human_verification:
  - test: "Run migration SQL in Supabase Dashboard"
    expected: "`newsletter_subscribers` table exists with columns: id (uuid PK), email (text UNIQUE), status (text CHECK), subscribed_at (timestamptz), updated_at (timestamptz)"
    why_human: "Migration was skipped by user (Plan 02 Task 3 checkpoint). Table must exist before subscribe/unsubscribe API routes work at runtime."
  - test: "Visual verification: newsletter form on home page"
    expected: "GlassPanel section after gallery with 'Stay in the Echo' heading, DripBorder email input, PulseButton subscribe. Success shows amber glow checkmark. Duplicate shows ethereal blue 'Already in the Echo'."
    why_human: "Visual appearance, animation, and Surrealist Echoes styling require human review."
  - test: "Visual verification: unsubscribe confirmation page at /unsubscribe?token=UUID"
    expected: "Loading state → 'Leave the Echo?' confirm prompt → 'You've Left the Echo' success. Invalid token shows 'This Link Doesn't Look Right'. Already-unsubscribed shows 'Already Unsubscribed'."
    why_human: "Visual appearance, multi-state UX flow, and edge cases require human review."
  - test: "Email delivery: submit a lead via /playground form"
    expected: "Site owner receives email within 30 seconds with all 5 lead fields styled in Surrealist Echoes theme"
    why_human: "Actual email delivery depends on RESEND_API_KEY being configured in environment; cannot verify programmatically."
  - test: "Email delivery: subscribe via newsletter form"
    expected: "Subscriber receives confirmation email 'You're in the echo' with Surrealist Echoes styling"
    why_human: "Actual email delivery depends on Resend/SMTP configuration."
  - test: "Email delivery: unsubscribe flow end-to-end"
    expected: "Subscriber clicks unsubscribe link from email → sees confirmation page → clicks Yes → subscription marked unsubscribed (soft delete) — no email sent"
    why_human: "End-to-end unsubscribe flow requires active subscriber + valid UUID token."
---

# Phase 06: Engagement Verification Report

**Phase Goal:** Email notifications on new leads and newsletter signup with unsubscribe — fire-and-forget delivery, duplicate prevention, opt-out support.

**Verified:** 2026-05-07T00:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth | Status | Evidence |
| --- | ----- | ------ | -------- |
| 1   | Site owner receives email within seconds of lead submission showing all lead fields | ✓ VERIFIED | `src/lib/email.ts` sends via Resend/SMTP; `src/emails/lead-notification.tsx` renders all 5 fields (project_name, email, whatsapp, intent, submitted_at) with Surrealist Echoes styling; wired into `POST /api/leads` |
| 2   | Lead form API returns 200 before email delivery completes (fire-and-forget) | ✓ VERIFIED | `sendLeadNotification()` called WITHOUT `await` in `src/app/api/leads/route.ts:69` — Promise is fire-and-forget with `.catch()` for logging only. Response returns immediately after call. |
| 3   | When Resend API key is set, email is sent via Resend; when absent, SMTP fallback is used | ✓ VERIFIED | `src/lib/email.ts:7-20`: provider selection checks `RESEND_API_KEY` → Resend, else `SMTP_HOST` → Nodemailer SMTP, else `console.warn` + return false. Both transports implemented. |
| 4   | Email notification contains: project_name, email, whatsapp, intent, timestamp | ✓ VERIFIED | `src/emails/lead-notification.tsx:71-93`: renders each field with `<strong>` labels. Timestamp formatted via `new Date(submitted_at).toLocaleString()`. |
| 5   | User can submit email on the home page to subscribe to the newsletter | ✓ VERIFIED | `src/components/NewsletterForm.tsx` with DripBorder input + PulseButton; `fetch("/api/newsletter/subscribe")`; form rendered in `src/app/page.tsx:118` via `<NewsletterForm />`. |
| 6   | Duplicate email subscription is rejected with a friendly message — not an error | ✓ VERIFIED | `src/app/api/newsletter/subscribe/route.ts:57`: returns 200 with `{ status: "already_subscribed", message: "You're already in the echo" }`. `NewsletterForm.tsx:78-91`: renders "Already in the Echo" GlassPanel with `blur_on` icon, ethereal blue styling. |
| 7   | Successful subscriber receives a confirmation email via Resend/SMTP | ✓ VERIFIED | `sendSubscribeConfirmation()` fully implemented in `src/lib/email.ts:143-189` (not a stub — extended in Plan 02). Calls `resend.emails.send()` or `transporter.sendMail()`. Wired in subscribe route with `.catch()`. |
| 8   | Newsletter form is a GlassPanel section on the home page, following existing Surrealist Echoes patterns | ✓ VERIFIED | `NewsletterForm.tsx` uses GlassPanel, DripBorder, PulseButton, Icon components. "Stay in the Echo" heading. Section placed after gallery in `src/app/page.tsx:117-118`. |
| 9   | Subscriber can unsubscribe by visiting /unsubscribe?token=UUID from their confirmation email | ✓ VERIFIED | `src/app/unsubscribe/page.tsx`: reads `token` from `useSearchParams`, fetches `POST /api/newsletter/unsubscribe`. API route validates UUID, queries `newsletter_subscribers`, sets `status = 'unsubscribed'`. |
| 10  | Unsubscribe page shows a confirmation prompt before acting (not one-click) | ✓ VERIFIED | `src/app/unsubscribe/page.tsx:113-153`: "Leave the Echo?" confirm state with "Yes, Unsubscribe" + "Never Mind" buttons. Requires explicit user click before API call. |
| 11  | Invalid/missing token shows a friendly error message, not a generic 404 | ✓ VERIFIED | `src/app/unsubscribe/page.tsx:44-49`: client-side UUID regex pre-validation shows "This link doesn't look right". API route returns 400/404 with friendly messages. Error GlassPanel with "This Link Doesn't Look Right". |
| 12  | Already-unsubscribed token shows a friendly message acknowledging the state | ✓ VERIFIED | `src/app/api/newsletter/unsubscribe/route.ts:52-57`: returns 200 `{ status: "already_unsubscribed" }`. `unsubscribe/page.tsx:183-197`: "Already Unsubscribed" GlassPanel with `blur_on` icon. |
| 13  | After confirming, subscriber's status is set to 'unsubscribed' (soft delete — row preserved per D-08) | ✓ VERIFIED | `unsubscribe/route.ts:63-66`: `.update({ status: "unsubscribed", updated_at: new Date().toISOString() })`. NO `.delete()` call. Row preserved with audit trail. |

**Score:** 13/13 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/lib/email.ts` | Email sending utility with Resend + SMTP fallback | ✓ VERIFIED | 215 lines, exports `sendLeadNotification` + `sendSubscribeConfirmation`, Resend primary + Nodemailer SMTP fallback, imports both React Email templates |
| `src/emails/lead-notification.tsx` | React Email template for lead notification | ✓ VERIFIED | 121 lines, renders all 5 lead fields, Surrealist Echoes colors (#171305, #ebe2c8, #ffc66b, #504535, #9d8e7c), conditional "View in Supabase" link |
| `src/app/api/leads/route.ts` | Modified POST handler with notification call | ✓ VERIFIED | 86 lines, `sendLeadNotification()` called after insert + before response, fire-and-forget (no await), existing Zod validation + Supabase insert preserved |
| `.env.example` | Email env var documentation | ✓ VERIFIED | All 7 vars present: RESEND_API_KEY, RESEND_FROM_ADDRESS, NOTIFICATION_TO_ADDRESS (uncommented), SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (commented optional) |
| `supabase/migrations/001_newsletter_subscribers.sql` | SQL DDL for newsletter_subscribers | ✓ VERIFIED | 17 lines, CREATE TABLE with id UUID PK + gen_random_uuid(), email UNIQUE, status CHECK ('active'\|'unsubscribed'), proper indexes |
| `src/app/api/newsletter/subscribe/route.ts` | POST handler with Zod + duplicate detection | ✓ VERIFIED | 118 lines, Zod email validation, SELECT-before-INSERT duplicate check, 23505 race-condition fallback, fire-and-forget confirmation email |
| `src/app/page.tsx` | Home page with newsletter section | ✓ VERIFIED | 123 lines, imports and renders `<NewsletterForm />` at line 118 after gallery section |
| `src/emails/subscribe-confirmation.tsx` | React Email template for subscribe confirmation | ✓ VERIFIED | 99 lines, "You're in the echo" heading, Surrealist Echoes colors, poetic body copy |
| `src/app/api/newsletter/unsubscribe/route.ts` | POST handler for unsubscribe (soft delete) | ✓ VERIFIED | 93 lines, UUID validation, status = 'unsubscribed' update, NO `.delete()`, NO email sending |
| `src/app/unsubscribe/page.tsx` | Client Component confirmation page | ✓ VERIFIED | 209 lines, useSearchParams, Suspense boundary, 6 states (loading/confirm/unsubscribing/done/already_unsubscribed/error), UUID regex pre-validation |
| `src/components/NewsletterForm.tsx` | Newsletter form Client Component | ✓ VERIFIED | 165 lines, "use client", 6 states (idle/submitting/success/already_subscribed/previously_unsubscribed/error), DripBorder + PulseButton + GlassPanel + Icon |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `leads/route.ts` | `email.ts::sendLeadNotification` | import + function call after Supabase insert | ✓ WIRED | Static import line 4, fire-and-forget call line 69 with `.catch()` |
| `email.ts` | `resend` package / `nodemailer` | provider selection logic checking env vars | ✓ WIRED | `new Resend()` line 8, `nodemailer.createTransport()` line 13 |
| `lead-notification.tsx` | `@react-email/components` | React Email component rendering | ✓ WIRED | Import line 1-11, full template rendering |
| `NewsletterForm.tsx` | `POST /api/newsletter/subscribe` | fetch in form submit handler | ✓ WIRED | `fetch("/api/newsletter/subscribe", ...)` line 30 |
| `subscribe/route.ts` | `newsletter_subscribers` table | `getSupabase().from('newsletter_subscribers')` | ✓ WIRED | `.from("newsletter_subscribers")` lines 40, 76 |
| `subscribe/route.ts` | `email.ts::sendSubscribeConfirmation` | import + function call after insert | ✓ WIRED | Import line 4, fire-and-forget call line 101 with `.catch()` |
| `unsubscribe/page.tsx` | `POST /api/newsletter/unsubscribe` | fetch in confirm button handler | ✓ WIRED | `fetch("/api/newsletter/unsubscribe", ...)` line 61 |
| `unsubscribe/route.ts` | `newsletter_subscribers` table | `getSupabase().from('newsletter_subscribers').update()` | ✓ WIRED | `.from("newsletter_subscribers")` lines 36, 64 |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `leads/route.ts` → notification | `project_name, email, whatsapp, intent` | Zod-validated from request body → Supabase insert | ✓ Yes (from validated form data + `new Date().toISOString()`) | ✓ FLOWING |
| `subscribe/route.ts` → email | `trimmedEmail` | Zod-validated from request body → Supabase insert | ✓ Yes (from validated email) | ✓ FLOWING |
| `unsubscribe/route.ts` → DB | `token` | Zod UUID validation → Supabase `.eq("id", token)` | ✓ Yes (matches existing subscriber rows) | ✓ FLOWING |
| `NewsletterForm.tsx` | `email` state | User input → `useState` → `fetch` POST | ✓ Yes (user-controlled input) | ✓ FLOWING |
| `unsubscribe/page.tsx` | `token` | `useSearchParams().get("token")` → fetch POST | ✓ Yes (URL query param → API) | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| TypeScript compilation | `npx tsc --noEmit` | Exit 0, no errors | ✓ PASS |
| Build succeeds | `ls .next/BUILD_ID` | `vxP349mnd55N3THJNpZgN` (build exists) | ✓ PASS |
| Threat T-06-01: Zero API keys in client bundle | `grep -r "RESEND_API_KEY\|SMTP_PASS" .next/static/` | No matches (exit 0) | ✓ PASS |
| All 11 artifacts exist + substantive | File check + line counts | All 11 exist (17–215 lines each) | ✓ PASS |
| Zero stubs in phase files | `grep -rn "TODO\|FIXME\|PLACEHOLDER"` | No matches | ✓ PASS |
| sendSubscribeConfirmation no longer stub | Code inspection | Fully implemented with Resend + SMTP + HTML fallback | ✓ PASS |
| No .delete() in unsubscribe route (D-08) | `grep ".delete()" unsubscribe/route.ts` | No matches | ✓ PASS |
| No email sent from unsubscribe (D-05) | `grep "sendMail\|resend\|smtp" unsubscribe/route.ts` | No matches | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| LEAD-04 | 06-01-PLAN | Site owner receives email notification when new lead is submitted | ✓ SATISFIED | `sendLeadNotification()` in `leads/route.ts:69`, `lead-notification.tsx` renders all 5 fields |
| LEAD-05 | 06-01-PLAN | Email notification does not delay lead form API response (fire-and-forget) | ✓ SATISFIED | No `await` on `sendLeadNotification()`; `.catch()` for logging only; response returned immediately |
| SOCL-01 | 06-02-PLAN | User can submit email to subscribe to newsletter | ✓ SATISFIED | `NewsletterForm.tsx` on home page, `POST /api/newsletter/subscribe` with Zod validation |
| SOCL-02 | 06-02-PLAN | Duplicate email subscriptions rejected with friendly message | ✓ SATISFIED | Returns 200 with `{ status: "already_subscribed", message: "You're already in the echo" }`; poetic "Already in the Echo" GlassPanel |
| SOCL-03 | 06-03-PLAN | Subscriber can unsubscribe via unique token link | ✓ SATISFIED | `/unsubscribe?token=UUID` page + `POST /api/newsletter/unsubscribe` with soft delete; all edge cases handled |

**All 5 declared requirement IDs (LEAD-04, LEAD-05, SOCL-01, SOCL-02, SOCL-03) are SATISFIED.**

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| None | — | — | — | No stubs, TODOs, FIXMEs, placeholders, or hardcoded empty data found in any phase file. |

### Threat Model Verification

| Threat ID | Mitigation | Status |
| --------- | ---------- | ------ |
| T-06-01 | Resend API key + SMTP credentials server-only via `process.env` | ✅ Verified — zero matches in `.next/static/` |
| T-06-03 | All lead data Zod-validated before email notification | ✅ Verified — `leadSchema.safeParse` preserved, notification after validation |
| T-06-04 | Email validated by Zod `.email()` + `.min(1)` | ✅ Verified — `subscribeSchema` with `z.string().email()` |
| T-06-05 | Server-side Supabase access only via service role | ✅ Verified — `getSupabase()` pattern, no client-side Supabase for newsletter |
| T-06-09 | Token validated as UUID via Zod `.uuid()` | ✅ Verified — `unsubscribeSchema` with `z.string().uuid()` |
| T-06-10 | Soft delete preserves `updated_at` + `status` audit trail | ✅ Verified — `.update({ status: "unsubscribed", updated_at: ... })`, no `.delete()` |

### Human Verification Required

#### 1. Run migration SQL in Supabase Dashboard
**Test:** Open Supabase SQL Editor, paste contents of `supabase/migrations/001_newsletter_subscribers.sql`, click Run.
**Expected:** `newsletter_subscribers` table created with columns: id (uuid PK), email (text UNIQUE), status (text CHECK 'active'|'unsubscribed'), subscribed_at (timestamptz), updated_at (timestamptz). Indexes on email and status.
**Why human:** Migration was skipped (Plan 02 Task 3 checkpoint). Table must exist for subscribe/unsubscribe API routes to function at runtime.

#### 2. Visual: Newsletter form on home page
**Test:** Navigate to home page. Verify newsletter section renders after gallery with "Stay in the Echo" heading, DripBorder email input, PulseButton. Submit email → verify amber glow success state. Submit same email again → verify ethereal blue "Already in the Echo" state.
**Expected:** Surrealist Echoes styling, all states render correctly with proper animations and color tokens.
**Why human:** Visual appearance, animations, and brand voice cannot be programmatically verified.

#### 3. Visual: Unsubscribe confirmation page
**Test:** Visit `/unsubscribe` (no token) → verify error state. Visit `/unsubscribe?token=invalid` → verify error state. Visit `/unsubscribe?token=<valid-active-uuid>` → verify confirm prompt. Click "Yes, Unsubscribe" → verify success state. Refresh → verify "Already Unsubscribed" state.
**Expected:** All 6 states render with correct GlassPanel styling, icons, and friendly messaging.
**Why human:** Multi-state UX flow and visual design require human review.

#### 4. Email delivery: Lead notification
**Test:** Submit lead via /playground form (requires RESEND_API_KEY configured in .env.local).
**Expected:** Site owner receives email with "New Lead — The Alchemist's Terminal" subject, all 5 fields styled in Surrealist Echoes theme, "View in Supabase" link if SUPABASE_URL set.
**Why human:** Actual email delivery depends on Resend API key being configured.

#### 5. Email delivery: Subscribe confirmation
**Test:** Subscribe via newsletter form on home page (requires RESEND_API_KEY configured).
**Expected:** Subscriber receives "You're in the echo — Nur Amirah" email with Surrealist Echoes styling.
**Why human:** Actual email delivery depends on Resend/SMTP configuration.

#### 6. End-to-end: Unsubscribe flow
**Test:** Click unsubscribe link from a confirmation email (UUID token). Verify confirmation page. Click Yes. Verify email removed from active list (soft delete — row preserved in DB).
**Expected:** No email sent from unsubscribe flow. Status updated to 'unsubscribed' with updated_at refreshed.
**Why human:** End-to-end flow requires active subscriber with valid UUID token, Supabase table, and browser interaction.

## Gaps Summary

**No code-level gaps found.** All 13 must-have truths are verified. All 11 artifacts exist, are substantive, and are correctly wired. All 5 requirements (LEAD-04, LEAD-05, SOCL-01, SOCL-02, SOCL-03) are satisfied. TypeScript compiles clean, build succeeds, threat mitigations verified, zero API key leakage in client bundle.

**One infrastructure pre-condition pending:** The `newsletter_subscribers` table has not been created in Supabase (migration skipped by user). The SQL file is ready and correct — it needs manual execution before runtime. This is documented in human verification item #1.

**Status is `human_needed`** solely due to 6 items requiring human verification (visual review, email delivery testing, migration execution). All automated checks pass.

---

*Verified: 2026-05-07T00:00:00Z*
*Verifier: OpenCode (gsd-verifier)*
