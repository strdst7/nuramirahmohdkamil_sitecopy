# Phase 06: Engagement - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Email notifications on new leads and newsletter signup with unsubscribe — fire-and-forget delivery to site owner, duplicate prevention with friendly messaging, opt-out via unique token link, and subscribe confirmation email.

This phase delivers: Resend-powered email sending (with SMTP fallback), a `newsletter_subscribers` Supabase table, a newsletter subscribe form on the home page, `POST /api/leads` enhanced with notification, `POST /api/newsletter/subscribe` and `POST /api/newsletter/unsubscribe` API routes, and an `/unsubscribe?token=UUID` confirmation page.
</domain>

<decisions>
## Implementation Decisions

### Email delivery (LEAD-04, LEAD-05)
- **D-01:** Use **Resend** as the primary email provider (`resend` npm package). If `RESEND_API_KEY` is empty or Resend fails, fall back to Nodemailer SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` env vars). Low-volume portfolio site — Resend's free tier (100/day) is sufficient.
- **D-02:** Email configuration via env vars: `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `NOTIFICATION_TO_ADDRESS`. All three required; if Resend vars are unset, the SMTP_* fallback kicks in.
- **D-03:** Owner notification email uses a **React Email template** (`@react-email/components` + `resend`) — Surrealist Echoes styling carried into HTML email. Lead notification shows ALL fields: project_name, email, whatsapp, intent, submitted_at timestamp, plus a "View in Supabase" link if available.
- **D-04:** Email sending is a **utility function** (`src/lib/email.ts`) called directly from `POST /api/leads` after the Supabase insert. Resend's async SDK satisfies LEAD-05 — the API route returns 200 before email delivery completes. No queue, no background handler.
- **D-05:** Newsletter **subscribe confirmation email only** — a welcome email sent when someone subscribes. No unsubscribe confirmation email (the web page handles the UX). No emails sent from the unsubscribe flow.

### Newsletter data model (SOCL-01, SOCL-02, SOCL-03)
- **D-06:** New **`newsletter_subscribers`** table in Supabase — separate from `playground_leads`. Different domain: a lead is a business inquiry; a subscriber is an email audience.
- **D-07:** Table columns: `id` (UUID PK, default gen_random_uuid()), `email` (text, UNIQUE), `status` (text, default 'active' — values: 'active' | 'unsubscribed'), `subscribed_at` (timestamptz, default now()), `updated_at` (timestamptz, default now()). Minimal — no metadata columns.
- **D-08:** **Soft delete** for unsubscribe — set `status = 'unsubscribed'` and update `updated_at`. Don't delete the row. Prevents the same email from re-subscribing after opting out (SOCL-02) and preserves an audit trail.
- **D-09:** **Unsubscribe token = row's UUID id** — the `id` column doubles as the unsubscribe token. Already unique, non-guessable, URL-safe. No separate token column needed. Unsubscribe link: `{NEXT_PUBLIC_SITE_URL}/unsubscribe?token={uuid}`.

### Newsletter form placement (SOCL-01, SOCL-02)
- **D-10:** Newsletter form lives as a **GlassPanel section on the home page** (`src/app/page.tsx`) — not on the playground page. Keeps the playground uncluttered with a single form (lead capture). Visible to all visitors at first impression.
- **D-11:** Form is minimal — **one DripBorder email input + one PulseButton submit** inside a GlassPanel wrapper. Heading: short, poetic, Surrealist Echoes tone. Follows existing component patterns from `LeadCaptureForm`.
- **D-12:** **Success state** — inline message replacing the form inside the same GlassPanel. Icon animation (fresh animation token) + friendly text. **Duplicate state** — also inline, friendly: "You're already in the echo" — not an error. Surrealist Echoes amber glow on success, ethereal blue on already-subscribed.

### Unsubscribe UX (SOCL-03)
- **D-13:** Route: `/unsubscribe?token=UUID` — Next.js App Router page at `src/app/unsubscribe/page.tsx` reading `searchParams.token`. Token is the subscriber's UUID id.
- **D-14:** **Confirmation page, not one-click** — the `/unsubscribe` page shows a Surrealist Echoes styled confirmation before acting. Prevents accidental unsubscription from email link scanners/preview bots. User clicks a PulseButton to confirm.
- **D-15:** **Friendly edge-case messages:** Invalid/missing token → "This link doesn't look right — check your email for the correct link." Already unsubscribed token → "You're already unsubscribed from this newsletter." Both rendered in GlassPanel, non-technical language matching the brand voice.
- **D-16:** Server-side via **`POST /api/newsletter/unsubscribe`** — the unsubscribe page is a Client Component that POSTs to the API route with `{ token }`. The route validates token, updates status, returns JSON. Same pattern as `POST /api/leads`.

### API routes plan
- `POST /api/leads` — **modified**: after Supabase insert, call `sendLeadNotification(lead)` utility (fire-and-forget)
- `POST /api/newsletter/subscribe` — **new**: validates email with Zod, checks `newsletter_subscribers` for duplicate/status, inserts or rejects, sends confirmation email
- `POST /api/newsletter/unsubscribe` — **new**: validates UUID token, sets status to 'unsubscribed', returns success/error JSON

### OpenCode's Discretion
- Exact React Email template design (component choice, styling specifics within Surrealist Echoes constraints)
- SMTP fallback implementation pattern (try/catch wrapper or provider abstraction layer)
- Exact GlassPanel heading copy and visual styling for newsletter form on home page
- Icon choice for unsubscribe flow states (success, already unsubscribed, invalid)
- Zod schemas for subscribe/unsubscribe API routes
- Exact `.env.example` entries for new email-related env vars
- Newsletter form component — inline in `page.tsx` or extracted to `src/components/NewsletterForm.tsx`
- Whether to add an RLS policy on `newsletter_subscribers` or keep server-side access only

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements and roadmap
- `.planning/ROADMAP.md` §Phase 6 — Goal, success criteria, LEAD-04, LEAD-05, SOCL-01, SOCL-02, SOCL-03 requirements
- `.planning/REQUIREMENTS.md` §Lead Capture — LEAD-04, LEAD-05
- `.planning/REQUIREMENTS.md` §Newsletter — SOCL-01, SOCL-02, SOCL-03

### Existing lead capture (being extended)
- `src/app/api/leads/route.ts` — Current POST handler for lead capture (Zod validation, Supabase insert). Will be modified to call email notification utility after insert.
- `src/components/LeadCaptureForm.tsx` — Current lead form UI on /playground. Reference for form patterns (GlassPanel, DripBorder, PulseButton, inline error/success states).

### Supabase infrastructure
- `src/lib/supabase.ts` — Server-side Supabase client singleton (service role key). New `newsletter_subscribers` table accessed through this same client.

### Shared components (Phase 1)
- `src/components/GlassPanel.tsx` — Glassmorphic card wrapper
- `src/components/DripBorder.tsx` — Animated bottom-border input component
- `src/components/PulseButton.tsx` — Organic-shaped CTA button
- `src/components/Icon.tsx` — Material Symbols icon wrapper
- `src/components/MeltingShadow.tsx` — Elongated shadow component

### Design system
- `surrealist_echoes/DESIGN.md` — Surrealist Echoes design tokens, typography scale, color palette
- `tailwind.config.ts` — Build-time Tailwind config with all 46 color tokens

### Home page (form placement)
- `src/app/page.tsx` — Current home page. Newsletter form will be added as a new section.

### Unsubscribe page (new)
- `src/app/unsubscribe/page.tsx` — To be created: confirmation page reading token from searchParams

### Established patterns
- `src/app/api/ai/openai/route.ts` — Server-side env var proxy pattern (Phase 3)
- `.env.example` — Environment variable documentation pattern
- `.planning/codebase/CONVENTIONS.md` — Styling conventions, Next.js component patterns

### Project-level
- `.planning/PROJECT.md` — Core value, constraints, key decisions
- `.planning/STATE.md` — Current project state
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`GlassPanel`** — Glassmorphic card wrapper for newsletter form and unsubscribe confirmation
- **`DripBorder`** — Animated bottom-border input for email field
- **`PulseButton`** — Asymmetric CTA button for subscribe/unsubscribe actions
- **`Icon`** — Material Symbols wrapper for success/duplicate state icons
- **`getSupabase()`** — Singleton Supabase client from `src/lib/supabase.ts` — use same pattern for new tables

### Established Patterns
- **API route proxy pattern** — `POST /api/leads` validates with Zod, inserts to Supabase, returns JSON. New newsletter routes follow identical structure.
- **Server-side env var access** — `process.env.SUPABASE_URL` etc. accessed only in route handlers and server utilities. New email env vars follow same pattern.
- **Client Component form pattern** — `LeadCaptureForm` is a `"use client"` component with controlled form state, field-level validation, submit/success/error states. Newsletter form and unsubscribe page follow this pattern.
- **Surrealist Echoes tokens** — All typography, color, spacing available in Tailwind config. New UI reuses existing tokens.
- **Flat `src/components/` directory** for shared components

### Integration Points
- **`POST /api/leads`** — Modify to call `sendLeadNotification()` after successful Supabase insert. The email utility is called after the 200 response is sent (or before — Resend's async nature means no blocking).
- **`src/app/page.tsx`** — Add newsletter GlassPanel section. The home page already uses GlassPanel and Surrealist Echoes components — the newsletter form blends in naturally.
- **New: `src/lib/email.ts`** — Email utility with Resend primary + SMTP fallback. Export `sendLeadNotification()` and `sendSubscribeConfirmation()`.
- **New: `src/app/api/newsletter/subscribe/route.ts`** — POST handler with Zod email validation, Supabase insert/check, confirmation email dispatch.
- **New: `src/app/api/newsletter/unsubscribe/route.ts`** — POST handler with UUID validation, status update.
- **New: `src/app/unsubscribe/page.tsx`** — Confirmation page reading token from searchParams, Client Component with loading/error/confirm/done states.
- **`.env.example`** — Add RESEND_API_KEY, RESEND_FROM_ADDRESS, NOTIFICATION_TO_ADDRESS, SMTP_* entries.

### New Files Expected
- `src/lib/email.ts` — Email sending utility (Resend + SMTP fallback)
- `src/app/api/newsletter/subscribe/route.ts` — Subscribe API route
- `src/app/api/newsletter/unsubscribe/route.ts` — Unsubscribe API route
- `src/app/unsubscribe/page.tsx` — Unsubscribe confirmation page
- Updated: `src/app/api/leads/route.ts` — Add email notification call after insert
- Updated: `src/app/page.tsx` — Add newsletter GlassPanel section
- Updated: `.env.example` — Add email env var entries
- Potentially: `src/components/NewsletterForm.tsx` — If extracted to separate component
- Potentially: `src/emails/` — React Email templates directory
</code_context>

<specifics>
## Specific Ideas

- The newsletter form should feel like a natural extension of the Surrealist Echoes home page — not a transactional form block. The heading should be poetic, the input should feel like writing into a dream.
- Success state: the form dissolves into a confirmation message with a subtle amber glow — consistent with the "transmutation" effect in the LeadCaptureForm success state.
- Duplicate state: friendly and non-judgmental — "You're already in the echo" — ethereal blue styling rather than error red. Feels like a reassurance, not a rejection.
- Unsubscribe confirmation page: "Are you sure you want to leave the echo?" — PulseButton confirms, the page keeps the surrealist ambiance even in an opt-out flow. After unsubscribing: a warm goodbye message, not a cold "unsubscribed successfully."
- Email templates (React Email): carry the Surrealist Echoes design language into the inbox — amber accents, Epilogue typography where possible, the same dreamlike tone.
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 06-engagement*
*Context gathered: 2026-05-06*
