# Nur Amirah Mohd Kamil — Portfolio & AI Playground

## What This Is

A personal portfolio website that bridges creative direction with technical experimentation. The site showcases creative work through a surrealist dreamlike experience and provides an interactive AI playground where visitors experiment with generative AI (OpenAI text generation, Gemini multimodal analysis). Lead capture for white-label services, beta access, and update notifications is integrated into the playground.

## Core Value

**Emotional resonance over rigid utility** — the site must feel like stepping into a dreamlike imaginative landscape where every interaction sparks curiosity and wonder, while still delivering functional AI experimentation tools that convert visitors into leads.

## Requirements

### Validated (v1.0 — shipped 2026-05-01)

- ✓ 5 pages (Home, Insights, Playground, Portfolio, Surrealist Echoes design reference)
- ✓ Surrealist Echoes design system — 46 color tokens, typography scale, spacing, organic shapes
- ✓ Next.js 16 App Router with TypeScript and Tailwind CSS (build-time)
- ✓ Self-hosted fonts via next/font (Epilogue, Newsreader, Space Grotesk) + Material Symbols
- ✓ 7 shared components (GlassPanel, OrganicCard, DripBorder, PulseButton, MeltingShadow, Icon, LeadCaptureForm)
- ✓ AI Playground — OpenAI (SSE streaming) + Gemini (multimodal) behind secure proxy routes
- ✓ Lead capture form — Zod-validated, Supabase-powered, Surrealist Echoes styling
- ✓ Responsive layout — mobile single-column → tablet 2-column → desktop asymmetric
- ✓ SEO metadata, sitemap.xml, robots.txt
- ✓ Vercel deployment config + Docker support
- ✓ Local image assets (SVG placeholders) — zero external CDN dependencies
- ✓ 21/21 v1 requirements shipped

### Active (v2.0 planning)

- [ ] Headless CMS integration for Insights blog (Contentful or similar)
- [ ] Portfolio project management via CMS
- [ ] API routing logic — select fastest/cheapest AI provider per request
- [ ] Saved prompt history and session replay
- [ ] Email notification to site owner on new lead
- [ ] Newsletter signup

### Out of Scope

- User authentication / login system — site is public-facing showcase
- E-commerce / payment processing — lead capture only
- Real-time chat or WebSockets — not core to portfolio value
- Mobile native app — web-only for v1
- Multi-language / i18n — English-only for v1

## Context

**Shipped v1.0:** ~2,400 LOC TypeScript/TSX across 10 phases (4 planning phases, 10 plans).

**Tech stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 3 (build-time), Vercel hosting, Supabase (PostgreSQL for leads), OpenAI (gpt-4o-mini) + Gemini (2.0-flash) proxied through server-side API routes.

**Current state:** All 5 pages rendered with Surrealist Echoes design system. AI Playground functional with streaming text generation and multimodal image analysis. Lead capture form live on /playground. Production build passes (13 static + 3 dynamic routes). Docker-ready with standalone output mode.

**Deployment:** Configure `.env.local` with API keys → `npm run dev` or `docker compose up -d`. See README.md for full instructions.

## Constraints

- **Tech stack**: Next.js App Router, TypeScript, Tailwind CSS (build-time), Vercel, Supabase
- **Design**: Must follow Surrealist Echoes design system
- **AI APIs**: Never expose API keys to client — all AI calls proxy through Next.js API routes
- **Content**: Hardcoded in v1 — CMS deferred to v2

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Surrealist Echoes over Blueprint | All HTML prototypes use Surrealist Echoes | ✓ Shipped — canonical design system |
| Next.js App Router over Pages Router | Modern standard; aligns with architecture spec | ✓ Shipped — 10 routes working |
| Coarse granularity (4 phases) | Portfolio site well-scoped | ✓ Shipped — 10 plans across 4 phases |
| Server-side AI proxy routes | Prevents API key leakage to client | ✓ Verified — zero key exposure in bundles |
| Zod v4 for form validation | Type-safe validation, transitive dep via openai | ✓ Shipped — added as direct dependency |
| Supabase service role key | Server-to-server inserts, no client auth needed | ✓ Shipped — lazy init avoids build crash |
| Standalone output mode | Docker production build optimization | ✓ Shipped — multi-stage Dockerfile |

---
*Last updated: 01 May 2026 after v1.0 milestone*
