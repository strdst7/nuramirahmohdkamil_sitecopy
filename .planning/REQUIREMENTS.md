# Requirements: Nur Amirah Portfolio & AI Playground

**Defined:** 30 April 2026
**Core Value:** Emotional resonance over rigid utility — a dreamlike portfolio that sparks curiosity while delivering functional AI tools and lead conversion.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Pages & Navigation

- [ ] **PAGE-01**: Global shared layout with header (logo + nav links), footer, and bottom navigation dock connecting all 5 pages
- [ ] **PAGE-02**: Home/Landing page — hero section with elevator pitch in massive typography, visual terminal preview, and CTAs ("Explore the Playground", "Contact")
- [ ] **PAGE-03**: Insights/Blog page — journal-style article entries with surreal diagrams, asymmetric layout, and academic-observation styling
- [ ] **PAGE-04**: AI Playground page — interactive terminal with prime-directive input, temperature/hallucination sliders, output basin, and live API integration
- [ ] **PAGE-05**: Portfolio/Projects page — "drifting islands" project cards with organic blob shapes and melting shadows

### Design System

- [ ] **DSGN-01**: Build-time Tailwind config with all Surrealist Echoes design tokens (46 color tokens, typography scale, spacing, border radii, shadows)
- [ ] **DSGN-02**: Shared component library — glass panels, organic/melting cards, drip-border inputs, pulse-button, floating nav dock, melting-shadow cards
- [ ] **DSGN-03**: Typography system with self-hosted fonts via `next/font` (Epilogue for headings, Newsreader for body, Space Grotesk for labels/micro-copy)
- [ ] **DSGN-04**: Responsive layout adapting from mobile (single column) through tablet to desktop (asymmetric fluid layouts)

### AI Playground

- [ ] **PLAY-01**: OpenAI text generation — user enters prompt, receives AI response via proxied `POST /api/ai/openai`
- [ ] **PLAY-02**: Gemini multimodal analysis — user can upload images/documents for AI analysis via proxied `POST /api/ai/gemini`
- [ ] **PLAY-03**: Interactive terminal UI — typewriter-effect input, loading states (melting clock loader), streaming or progressive output display
- [ ] **PLAY-04**: Temperature and hallucination parameter sliders with real-time visual feedback reflecting the Surrealist Echoes aesthetic
- [ ] **PLAY-05**: API key security — all AI API calls proxied through Next.js API routes, keys never exposed to client

### Lead Capture

- [ ] **LEAD-01**: Lead capture form — project name field, email (optional), WhatsApp (optional), intent selector (white-label / update-notification / beta-access)
- [ ] **LEAD-02**: `POST /api/leads` endpoint saving to Supabase `playground_leads` table
- [ ] **LEAD-03**: Form validation with inline error states and success confirmation styled in Surrealist Echoes aesthetic

### Infrastructure & SEO

- [ ] **INFR-01**: Next.js App Router scaffold with TypeScript, PostCSS, and Tailwind build pipeline
- [ ] **INFR-02**: Local image assets replacing Google-hosted placeholders, optimized via Next.js `<Image>` component
- [ ] **INFR-03**: SEO metadata — per-page `<title>`, `<meta description>`, Open Graph tags, `sitemap.xml`, `robots.txt`
- [ ] **INFR-04**: Vercel deployment with Edge Functions for API routes, environment variables for API keys and Supabase URL

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Management

- **CMS-01**: Headless CMS integration for Insights blog posts (Contentful or similar)
- **CMS-02**: Portfolio project management via CMS

### AI Enhancements

- **PLAY-06**: API routing logic to select fastest/cheapest AI provider per request
- **PLAY-07**: Saved prompt history and session replay

### Engagement

- **LEAD-04**: Email notification to site owner on new lead
- **SOCL-01**: Newsletter signup

## Out of Scope

| Feature | Reason |
|---------|--------|
| User authentication / accounts | Public portfolio — no user login needed |
| Payment processing / e-commerce | Lead capture only for v1 |
| Real-time chat or WebSockets | Not core to portfolio value |
| Mobile native app | Web-only for v1 |
| CMS-driven content editing UI | Hardcoded content sufficient for launch |
| Analytics dashboard | Defer to v2; GA4 or Vercel Analytics can be added trivially |
| Multi-language / i18n | English-only for v1 |
| "Blueprint" design system implementation | Surrealist Echoes is canonical; Blueprint doc retired |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PAGE-01 | Phase 1 | Pending |
| DSGN-01 | Phase 1 | Pending |
| DSGN-02 | Phase 1 | Pending |
| DSGN-03 | Phase 1 | Pending |
| INFR-01 | Phase 1 | Pending |
| PAGE-02 | Phase 2 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-05 | Phase 2 | Pending |
| DSGN-04 | Phase 2 | Pending |
| INFR-02 | Phase 2 | Pending |
| INFR-03 | Phase 2 | Pending |
| PAGE-04 | Phase 3 | ✓ Complete |
| PLAY-01 | Phase 3 | ✓ Complete |
| PLAY-02 | Phase 3 | ✓ Complete |
| PLAY-03 | Phase 3 | ✓ Complete |
| PLAY-04 | Phase 3 | ✓ Complete |
| PLAY-05 | Phase 3 | ✓ Complete |
| LEAD-01 | Phase 4 | ✓ Complete |
| LEAD-02 | Phase 4 | ✓ Complete |
| LEAD-03 | Phase 4 | ✓ Complete |
| INFR-04 | Phase 4 | ✓ Complete |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0

---
*Requirements defined: 30 April 2026*
*Last updated: 30 April 2026 after initial definition*
