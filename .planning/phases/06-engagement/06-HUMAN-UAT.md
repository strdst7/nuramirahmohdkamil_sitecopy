---
status: partial
phase: 06-engagement
source: [06-VERIFICATION.md]
started: 2026-05-06T10:00:00.000Z
updated: 2026-05-06T10:00:00.000Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Run newsletter_subscribers migration in Supabase
expected: Run `supabase/migrations/001_newsletter_subscribers.sql` in Supabase SQL Editor. The `newsletter_subscribers` table appears with columns: id (uuid), email (text UNIQUE), status (text), subscribed_at (timestamptz), updated_at (timestamptz). Indexes `idx_newsletter_subscribers_email` and `idx_newsletter_subscribers_status` exist.
result: [pending]

### 2. Visual review — Newsletter form on home page
expected: Visit the home page. A GlassPanel section with heading "Stay in the Echo" appears below the Gallery section. Email input + Subscribe button visible. Test all states: idle form, submitting, success (amber glow checkmark), duplicate submit (ethereal blue "Already in the Echo"), previously-unsubscribed (tertiary "Echo Faded").
result: [pending]

### 3. Visual review — Unsubscribe confirmation page
expected: Visit `/unsubscribe?token=00000000-0000-0000-0000-000000000000`. Should show error "This Link Doesn't Look Right". Visit `/unsubscribe` with no token — should show error. All 6 states render correctly: loading, error, confirm, unsubscribing, done, already_unsubscribed. Confirm button requires explicit click before acting.
result: [pending]

### 4. Email delivery — Lead notification
expected: Set `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `NOTIFICATION_TO_ADDRESS` in `.env.local`. Submit a lead via the playground form. Site owner receives email within seconds containing all lead fields (project_name, email, whatsapp, intent, timestamp) styled with Surrealist Echoes colors.
result: [pending]

### 5. Email delivery — Subscribe confirmation
expected: After the migration is run, submit an email via the newsletter form on the home page. Subscriber receives a confirmation email with Surrealist Echoes styling and poetic welcome message.
result: [pending]

### 6. End-to-end — Unsubscribe flow
expected: After subscribing, use the subscriber's UUID as the token → visit `/unsubscribe?token=<uuid>`. See confirmation prompt "Leave the Echo?". Click "Yes, Unsubscribe". See "You've Left the Echo" done state. Refresh with same token → see "Already Unsubscribed". Database row preserved with `status = 'unsubscribed'`.
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
