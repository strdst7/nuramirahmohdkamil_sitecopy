# Nur Amirah Mohd Kamil — Portfolio & AI Playground

## What This Is

A personal portfolio website for Nur Amirah Mohd Kamil that bridges creative direction with technical experimentation. The site serves dual purposes: (1) a showcase of creative work, insights, and professional identity — styled as an avant-garde surrealist experience, and (2) an interactive AI playground where visitors can experiment with generative AI tools (text generation, multimodal analysis) through a visually striking terminal interface. Lead capture for white-label services, beta access, and update notifications is built into the playground.

The target audience includes avant-garde creators, boutique curators, experimental storytellers, and potential clients seeking AI consultancy or creative direction.

## Core Value

**Emotional resonance over rigid utility** — the site must feel like stepping into a dreamlike imaginative landscape where every interaction sparks curiosity and wonder, while still delivering functional AI experimentation tools that convert visitors into leads.

## Requirements

### Validated

- ✓ Static HTML prototype pages exist for all 5 planned sections — existing
- ✓ "Surrealist Echoes" design system defined and prototyped (colors, typography, shapes, components) — existing
- ✓ Tailwind CSS CDN configuration pattern established across all pages — existing
- ✓ AI Playground terminal UI concept prototyped with prime-directive input, sliders, output basin — existing
- ✓ Portfolio "drifting islands" / organic blob card layout prototyped — existing
- ✓ Insights page styled as academic journal entries — existing

### Active

- [ ] Convert static HTML prototypes into a unified Next.js (App Router) application
- [ ] Implement shared layout with global navigation linking all 5 pages
- [ ] Build AI Playground with live OpenAI + Gemini API integration via secure backend proxy routes
- [ ] Implement lead capture form connected to Supabase database
- [ ] Port Surrealist Echoes design system from inline Tailwind CDN to build-time Tailwind config
- [ ] Add responsive/mobile layouts (prototypes are desktop-only)
- [ ] Add SEO metadata, sitemap, and performance optimization
- [ ] Deploy to Vercel with Edge Functions for API routes

### Out of Scope

- CMS-driven content management — v1 uses hardcoded content, CMS deferred
- User authentication / login system — site is public-facing showcase
- Real-time collaboration features — solo portfolio
- E-commerce / payment processing — lead capture only
- Mobile native app — web-only for v1

## Context

**Current state:** The project consists of 5 static HTML prototype pages, each in its own directory following the convention `[pagetype]_[page_title]`:
- `home_the_persistence_of_intelligence/` — Hero landing page
- `insights_ethereal_inquiries/` — Blog/insights journal entries
- `playground_alchemist_s_terminal/` — Interactive AI terminal demo
- `portfolio_archive_of_dreams/` — Project showcase with organic layouts
- `surrealist_echoes/` — Design system definition (the canonical visual language)

Each page is a self-contained HTML file with inline Tailwind CDN config, Google Fonts (Epilogue, Newsreader, Space Grotesk), and Material Symbols icons. Pages share no code — every page redefines the full config independently.

**Design system:** Two design documents exist:
1. `DESIGN.md` — "Blueprint" design (IBM Carbon-inspired, grid-based, structural, Rose Quartz + Soft Cobalt palette)
2. `surrealist_echoes/DESIGN.md` — "Surrealist Echoes" (dark amber/gold desert palette, melting organic shapes, glassmorphism, asymmetric fluid layouts) — **this is the canonical system actually implemented in all HTML prototypes**

The planned architecture (`SOFTWARE_DESIGN_SPECIFICATION.md`) references the Blueprint aesthetic, but the prototypes exclusively use Surrealist Echoes. The production app should follow Surrealist Echoes.

**Planned architecture:** Next.js App Router + React + Tailwind CSS (build-time) + Vercel hosting + Supabase (PostgreSQL for leads) + OpenAI & Gemini APIs proxied through Next.js API routes.

## Constraints

- **Tech stack**: Next.js App Router, TypeScript, Tailwind CSS (build-time), Vercel, Supabase
- **Design**: Must follow Surrealist Echoes design system (surrealist_echoes/DESIGN.md)
- **AI APIs**: Never expose API keys to client — all AI calls must proxy through Next.js API routes
- **Performance**: Dark theme with glassmorphism/blur effects requires modern browser support
- **Content**: Hardcoded in v1 — no CMS dependency

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Surrealist Echoes over Blueprint | All HTML prototypes use Surrealist Echoes; Blueprint doc appears to be earlier concept superseded by Surrealist Echoes | — Pending |
| Next.js App Router over Pages Router | Modern standard for new Next.js projects; App Router aligns with SOFTWARE_DESIGN_SPECIFICATION.md | — Pending |
| Coarse granularity (3-5 phases) | Portfolio site is well-scoped; excessive phases add overhead without benefit | — Pending |
| Smart model profile (2 models) | Research/planning gets a reasoning model; execution/verification gets a fast model | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 30 April 2026 after initialization*
