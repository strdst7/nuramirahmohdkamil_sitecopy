# Phase 06: Engagement - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 06-engagement
**Areas discussed:** Email delivery provider, Newsletter data model, Newsletter form placement, Unsubscribe token and UX

---

## Email Delivery Provider

| Option | Description | Selected |
|--------|-------------|----------|
| Resend | Modern email API, great Next.js DX, React Email support, free tier (100/day) | ✓ |
| SendGrid | Established SMTP service, free tier, @sendgrid/mail package | |
| AWS SES | Cheapest at scale, requires domain verification + IAM | |
| Nodemailer + SMTP | Framework-agnostic, flexible transport | |

| Option | Description | Selected |
|--------|-------------|----------|
| Env vars for both sender and recipient | RESEND_API_KEY, RESEND_FROM_ADDRESS, NOTIFICATION_TO_ADDRESS as env vars | ✓ |
| Env var + hardcoded recipient | Env var for API key and from address, hardcode to address | |

**User's choice:** Resend with env vars for all config. Fallback to SMTP_* env vars if Resend vars are empty.

| Option | Description | Selected |
|--------|-------------|----------|
| React Email template | @react-email/components + resend, Surrealist Echoes styling | ✓ |
| Plain HTML string | Inline-styled HTML, no React Email dependency | |
| Plain text only | Minimal, no styling | |

**User's choice:** React Email template.

| Option | Description | Selected |
|--------|-------------|----------|
| All fields including timestamps | Complete lead context in notification | ✓ |
| Core fields only | Project name, email, intent only | |

**User's choice:** All fields including timestamps.

| Option | Description | Selected |
|--------|-------------|----------|
| Utility called in API route | sendNotificationEmail() called from POST /api/leads after insert | ✓ |
| Separate notification API route | Dedicated POST /api/notify endpoint | |

**User's choice:** Utility called directly in API route — Resend's async SDK satisfies fire-and-forget.

| Option | Description | Selected |
|--------|-------------|----------|
| Subscribe confirmation only | Welcome/confirmation email on subscribe | ✓ |
| Subscribe + unsubscribe confirmation | Emails on both subscribe and unsubscribe | |
| No additional emails | Only lead notification email | |

**User's choice:** Subscribe confirmation only.

---

## Newsletter Data Model

| Option | Description | Selected |
|--------|-------------|----------|
| New newsletter_subscribers table | Separate table, clean separation of concerns | ✓ |
| Extend playground_leads | Add newsletter columns to existing lead table | |

**User's choice:** New newsletter_subscribers table.

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal columns | id, email, status, timestamps (unsubscribe_token = id) | ✓ |
| Full metadata | Above plus source, ip_address, user_agent | |

**User's choice:** Minimal columns — id, email, status, subscribed_at, updated_at.

| Option | Description | Selected |
|--------|-------------|----------|
| Soft delete (status column) | Set status to 'unsubscribed', keep record for audit/dedup | ✓ |
| Hard delete | Delete row entirely | |

**User's choice:** Soft delete via status column.

| Option | Description | Selected |
|--------|-------------|----------|
| UUID from id column | Row's own UUID as unsubscribe token | ✓ |
| Separate UUID column | Distinct token column | |
| Signed JWT or hash | Cryptographically signed token | |

**User's choice:** UUID from id column — simplest, already unique and non-guessable.

---

## Newsletter Form Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Home page section | GlassPanel section on src/app/page.tsx | ✓ |
| Playground page | Below LeadCaptureForm on /playground | |
| Footer component | Subscribe field in footer, visible on all pages | |
| Dedicated /subscribe page | Standalone page | |

**User's choice:** Home page GlassPanel section.

| Option | Description | Selected |
|--------|-------------|----------|
| GlassPanel with email input + button | GlassPanel wrapper, DripBorder input, PulseButton | ✓ |
| Inline text + input row | Simple row, no card wrapper | |
| Full lead form style | Multi-field form like LeadCaptureForm | |

**User's choice:** GlassPanel with email input + PulseButton.

| Option | Description | Selected |
|--------|-------------|----------|
| Inline message replacing form | Form replaced with success/duplicate message inside GlassPanel | ✓ |
| Toast notification | Floating toast, form stays visible | |

**User's choice:** Inline message replacing the form.

---

## Unsubscribe Token and UX

| Option | Description | Selected |
|--------|-------------|----------|
| /unsubscribe?token=UUID query param | Token in query string | ✓ |
| /unsubscribe/[token] dynamic route | Token in path segment | |

**User's choice:** `/unsubscribe?token=UUID` query param.

| Option | Description | Selected |
|--------|-------------|----------|
| Confirmation page then action | Show confirmation before unsubscribing | ✓ |
| Instant one-click unsubscribe | No confirmation, immediate action | |

**User's choice:** Confirmation page with PulseButton before acting.

| Option | Description | Selected |
|--------|-------------|----------|
| Friendly messages for all edge cases | Distinct messages for invalid token, already unsubscribed, success | ✓ |
| Simple generic error | One message for all error states | |

**User's choice:** Friendly, distinct messages for each edge case.

| Option | Description | Selected |
|--------|-------------|----------|
| POST /api/newsletter/unsubscribe | API route for server-side unsubscribe | ✓ |
| Server Action | Next.js Server Action directly from page | |

**User's choice:** `POST /api/newsletter/unsubscribe` — follows existing API route pattern.

---

## OpenCode's Discretion

- React Email template design specifics within Surrealist Echoes constraints
- SMTP fallback implementation pattern
- Exact GlassPanel heading copy and visual styling for newsletter form
- Icon choice for unsubscribe flow states
- Zod schemas for subscribe/unsubscribe API routes
- `.env.example` entries for email env vars
- Whether to extract NewsletterForm as a separate component or keep inline
- RLS policy decision for newsletter_subscribers table

## Deferred Ideas

None — all discussion stayed within Phase 6 scope.
