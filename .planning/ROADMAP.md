# Roadmap: Nur Amirah Portfolio & AI Playground

**Created:** 30 April 2026
**Granularity:** Coarse (4 phases)
**Core Value:** Emotional resonance over rigid utility

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation | Scaffold Next.js app with shared layout, navigation, and Surrealist Echoes design system | PAGE-01, DSGN-01, DSGN-02, DSGN-03, INFR-01 | 4 |
| 2 | Content Pages | Build Home, Insights, and Portfolio pages with responsive layouts and SEO | PAGE-02, PAGE-03, PAGE-05, DSGN-04, INFR-02, INFR-03 | 4 |
| 3 | AI Playground | Live AI integration with OpenAI and Gemini behind secure API routes | PAGE-04, PLAY-01, PLAY-02, PLAY-03, PLAY-04, PLAY-05 | 4 |
| 4 | Lead Capture & Deploy | Supabase lead capture form and Vercel production deployment | LEAD-01, LEAD-02, LEAD-03, INFR-04 | 3 |

**4 phases** | **21 requirements mapped** | All v1 requirements covered

---

## Phase 1: Foundation

**Goal:** Establish the Next.js App Router project with TypeScript, the Surrealist Echoes design system (build-time Tailwind), shared layout with global navigation, and self-hosted typography. All 5 pages stubbed with placeholder content.

**Requirements:** PAGE-01, DSGN-01, DSGN-02, DSGN-03, INFR-01

**Success criteria:**
1. `npm run dev` starts a Next.js dev server with hot reload on `localhost:3000`
2. All 5 routes (`/`, `/insights`, `/playground`, `/portfolio`, `/surrealist-echoes`) resolve to stub pages with correct `<title>` tags
3. Shared layout renders on every page — header (logo + nav links), bottom floating nav dock, and footer — with functional client-side navigation between all pages
4. Surrealist Echoes design tokens (all 46 colors, typography scale, spacing, border radii, melting shadows) are available as Tailwind utility classes from `tailwind.config.ts`

**Key tasks:**
- Scaffold Next.js with `create-next-app` (TypeScript, App Router, Tailwind)
- Extract Surrealist Echoes design tokens from `surrealist_echoes/DESIGN.md` into `tailwind.config.ts`
- Create `layout.tsx` with header, bottom nav dock, footer, and grid background
- Self-host fonts via `next/font/google` (Epilogue, Newsreader, Space Grotesk) and Material Symbols
- Stub all 5 page routes with placeholder content
- Create shared component library: `GlassPanel`, `OrganicCard`, `DripBorder`, `PulseButton`, `MeltingShadow`

**UI hint:** yes

---

## Phase 2: Content Pages

**Goal:** Port the Home, Insights, and Portfolio HTML prototypes into functioning Next.js pages with responsive layouts, local image assets, and SEO metadata. The Surrealist Echoes aesthetic must be faithfully reproduced from the prototypes.

**Requirements:** PAGE-02, PAGE-03, PAGE-05, DSGN-04, INFR-02, INFR-03

**Success criteria:**
1. Home page renders the hero elevator pitch in Epilogue headline typography with the visual terminal preview and CTA buttons — layout adapts from single-column (mobile) to split-screen (desktop)
2. Insights page renders journal-style articles accessible from a scrollable feed, each styled with Newsreader body text and surreal diagram placeholders
3. Portfolio page renders project cards as "drifting islands" with organic blob shapes and melting shadows — cards rearrange responsively from single column to asymmetric grid
4. All pages pass Lighthouse scores ≥ 90 (Performance, Accessibility, Best Practices, SEO) on mobile and desktop

**Key tasks:**
- Port Home hero section HTML → React components
- Port Insights journal layout → React components with article data
- Port Portfolio card grid → React components with project data
- Replace Google-hosted placeholder images with local `/public/images/` assets
- Add Next.js `<Image>` optimization throughout
- Implement responsive breakpoints: mobile (single column), tablet (2-column), desktop (asymmetric)
- Add per-page SEO metadata (title, description, OG tags)
- Generate `sitemap.xml` and `robots.txt`

**UI hint:** yes

---

## Phase 3: AI Playground

**Goal:** Build the interactive AI Playground page with live OpenAI and Gemini API integration proxied through secure Next.js API routes. The terminal UI must match the Surrealist Echoes prototype aesthetic.

**Requirements:** PAGE-04, PLAY-01, PLAY-02, PLAY-03, PLAY-04, PLAY-05

**Success criteria:**
1. User enters a text prompt in the terminal input, selects OpenAI, and receives a streaming AI response in the output basin with the melting-clock loader during loading
2. User uploads an image and selects Gemini — the image is processed and a multimodal analysis response appears in the output basin
3. Temperature slider (0-2) and hallucination slider visually update to reflect Surrealist Echoes "bruised gradient" styling as the user drags them
4. API keys for OpenAI and Gemini are never present in client-side JavaScript — confirmed by inspecting browser network tab and bundle

**Key tasks:**
- Create `POST /api/ai/openai` route — receives prompt, calls OpenAI, streams response
- Create `POST /api/ai/gemini` route — receives prompt + optional image, calls Gemini, returns response
- Build Playground page with terminal UI components (typewriter input, output basin, model selector)
- Implement temperature and hallucination parameter sliders with custom styling
- Add "Melting Clock" loader component during API calls
- Add error handling for API failures, rate limits, and invalid inputs
- Configure environment variables for `OPENAI_API_KEY` and `GEMINI_API_KEY`

**UI hint:** yes

---

## Phase 4: Lead Capture & Deploy

**Goal:** Add the lead capture form connected to Supabase, and deploy the full application to Vercel with production optimizations.

**Requirements:** LEAD-01, LEAD-02, LEAD-03, INFR-04

**Success criteria:**
1. Lead capture form accepts project name, email, WhatsApp, and intent — validates inputs and shows success confirmation on submit
2. Form data persists to Supabase `playground_leads` table and is queryable from Supabase dashboard
3. Site is live on a Vercel `.vercel.app` domain with Edge Functions handling API routes, all environment variables configured, and production build passing

**Key tasks:**
- Create `LeadCaptureForm` component with Surrealist Echoes styling
- Create `POST /api/leads` API route with Supabase client insertion
- Add form validation (Zod) and inline error states
- Set up Supabase project and create `playground_leads` table
- Configure Vercel deployment: environment variables, domain, Edge Functions
- Run production build and verify all routes, API calls, and forms work in production
- Set up Vercel Analytics for basic traffic monitoring

**UI hint:** yes

---

## Dependency Graph

```
Phase 1 (Foundation)
    │
    ▼
Phase 2 (Content Pages) ──► Phase 3 (AI Playground)
                                    │
                                    ▼
                              Phase 4 (Lead Capture & Deploy)
```

- Phase 2 and Phase 3 can run in parallel after Phase 1 completes (they touch different routes/pages)
- Phase 4 requires Phase 3 (API routes must exist before Supabase integration is testable) and Phase 2 (pages must be styled before deploy)

## Risk Register

| Risk | Severity | Phase | Mitigation |
|------|----------|-------|------------|
| Google placeholder images disappear | 🟡 Low | Phase 2 | Replace with local assets early |
| API key leakage to client | 🔴 High | Phase 3 | All AI calls through server routes only; verify in bundle audit |
| OpenAI/Gemini API costs during dev | 🟡 Low | Phase 3 | Use mock responses during UI development |
| CDN fonts cause CLS in production | 🟡 Low | Phase 1 | Self-host via `next/font` from start |
| Tailwind CDN config doesn't map 1:1 to build-time | 🟡 Low | Phase 1 | Manual token extraction from prototypes |

---
*Roadmap created: 30 April 2026*
