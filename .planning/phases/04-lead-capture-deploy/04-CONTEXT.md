# Phase 4: Lead Capture & Deploy — Context

**Gathered:** 01 May 2026
**Status:** Ready for planning (derived from roadmap + SDD + prior phases; no discuss-phase was run)

<domain>
## Phase Boundary

Add a Supabase-powered lead capture form to the playground page and deploy the full production application to Vercel with Edge Functions proxying all API routes.

This phase delivers: a `LeadCaptureForm` component with Surrealist Echoes styling, a `POST /api/leads` API route inserting into Supabase, form validation (Zod + inline errors), Vercel production deployment with environment variables, and basic traffic analytics. This is the final product-facing phase — after this, the site is live.

</domain>

<decisions>
## Implementation Decisions

### Lead Capture Form (LEAD-01)
- **D-01:** Form placed on the `/playground` page below the terminal/playground section — keeps lead capture adjacent to the AI experimentation that drives interest
- **D-02:** Form fields: project_name (required), email (optional), whatsapp (optional), intent (required — dropdown with white-label / update-notification / beta-access)
- **D-03:** Form component is a Client Component ("use client") since it has interactive form state
- **D-04:** Surrealist Echoes styling: GlassPanel wrapper, DripBorder inputs, PulseButton submit, inline error states using error-token colors

### Form Validation (LEAD-03)
- **D-05:** Zod schema validation — `zod@4` available as transitive dependency via openai (add as direct dependency for clarity)
- **D-06:** Validation on submit (not on blur) — shows all errors at once below each field. Inline error text in `text-error` with `font-label-sm`
- **D-07:** Success state: GlassPanel confirmation message with "Lead Captured" heading and subtle surreal flourish (icon + amber glow)

### Supabase Integration (LEAD-02)
- **D-08:** Supabase client in `src/lib/supabase.ts` — server-side only, mirrors Phase 3 API key proxy pattern
- **D-09:** `POST /api/leads` route handler — receives validated form data, inserts into `playground_leads` table via `@supabase/supabase-js`
- **D-10:** `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in environment variables — never client-exposed
- **D-11:** Schema follows SDD: `playground_leads` table with columns: `id` (UUID PK), `project_name` (text), `email` (text nullable), `whatsapp` (text nullable), `intent` (text), `created_at` (timestamptz)

### Vercel Deployment (INFR-04)
- **D-12:** Deploy to Vercel with Edge Functions for API routes — all AI routes + leads route run at edge
- **D-13:** Environment variables configured in Vercel dashboard: `OPENAI_API_KEY`, `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`
- **D-14:** Production build verified: all 10 routes working, API calls functional, form submits successfully
- **D-15:** Vercel Analytics enabled for basic traffic monitoring (no complex dashboard needed)

### OpenCode's Discretion
- Exact Zod schema shape and validation messages
- Form field order and visual layout details
- Supabase `playground_leads` table creation method (migration file vs dashboard)
- Error handling UX for Supabase connection failures
- Exact Vercel deployment commands and branch configuration
- CSS specifics for success confirmation animation
- Storage of form data (local state only until submit — no persistence of partial fills)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture & schema
- `SOFTWARE_DESIGN_SPECIFICATION.md` — Supabase schema for `playground_leads` table, LeadCaptureForm component spec
- `.planning/codebase/CONVENTIONS.md` — Styling conventions, anti-patterns, Next.js component patterns

### API route patterns (from Phase 3)
- `src/app/api/ai/openai/route.ts` — Proxy route pattern: server-side env var access, error handling, POST handler structure
- `src/app/api/ai/gemini/route.ts` — Same pattern — route.ts conventions to follow
- `.env.example` — Environment variable documentation pattern

### Form & UI components (from Phase 1)
- `src/components/DripBorder.tsx` — Animated bottom-border input component
- `src/components/PulseButton.tsx` — Organic-shaped CTA button (can serve as submit)
- `src/components/GlassPanel.tsx` — Glassmorphic card wrapper
- `src/components/Icon.tsx` — Material Symbols icon wrapper

### Design system
- `surrealist_echoes/DESIGN.md` — Surrealist Echoes design tokens, color palette
- `tailwind.config.ts` — Build-time Tailwind config with all tokens

### Project requirements
- `.planning/ROADMAP.md` — Phase 4 goal, success criteria, key tasks
- `.planning/REQUIREMENTS.md` — LEAD-01, LEAD-02, LEAD-03, INFR-04

### Deployment target
- `next.config.ts` — Current Next.js configuration (check for any existing deploy config)

</canonical_refs>

<specifics>
## Specific Ideas

- The lead form should feel like a natural extension of the alchemist aesthetic — not a cold HTML form. GlassPanel with melting shadows, drip-border inputs that glow amber on focus, and a submit button that pulses after click.
- Success state could be a subtle transmutation effect — icon that shifts from hourglass_empty to flare using the Surrealist Echoes palette.
- Vercel deployment domain: `nuramirah.vercel.app` (default Vercel domain) until custom domain is configured.
- Consider adding `@supabase/supabase-js` and `zod` as direct dependencies in package.json for clarity.

</specifics>

<deferred>
## Deferred Ideas

- **LEAD-04:** Email notification to site owner on new lead — v2 feature
- **Custom domain:** `nuramirah.com` or similar — requires domain purchase and DNS configuration
- **Vercel Analytics advanced:** Custom event tracking for form conversion funnel — v2
- **Rate limiting on `/api/leads`:** Defer to v2; Vercel Edge has basic DDoS protection
- **Lead export dashboard:** Direct Supabase dashboard sufficient for v1

</deferred>

---

*Phase: 04-lead-capture-deploy*
*Context gathered: 01 May 2026 (derived from roadmap + SDD + prior phase patterns)*
