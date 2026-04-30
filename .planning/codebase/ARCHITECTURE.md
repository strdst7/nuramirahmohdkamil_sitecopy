# Architecture

**Analysis Date:** 2026-04-30

## System Overview

### Current State: Prototype Only — Architecture Not Yet Implemented

The codebase contains **4 self-contained, static HTML prototype pages**. There is no framework, no build pipeline, no shared code, no routing, no server-side logic, and no database. Each page is a fully standalone `.html` file that re-defines the entire design system (Tailwind config, fonts, styles) inline. This is purely a visual mockup — not a functioning website.

```text
┌─────────────────────────────────────────────────────────────┐
│              No Shared Layer (no framework, no router)       │
├──────────────────┬──────────────────┬───────────────────────┤
│  Home/Landing    │  Insights/Blog   │  Playground/Terminal  │
│ `home_the_per-`  │ `insights_eth-`  │ `playground_alche-`   │
│ `sistence_of_`   │ `ereal_inqui-`   │ `mist_s_terminal/`    │
│ `intelligence/`  │ `ries/`          │                       │
│ `code.html`      │ `code.html`      │ `code.html`           │
├──────────────────┴──────────────────┴───────────────────────┤
│  Portfolio/Projects                                          │
│ `portfolio_archive_of_dreams/code.html`                      │
└─────────────────────────────────────────────────────────────┘
        │                       (each page is 100% standalone)
        ▼                       (no links, no routing, no shared CSS)
┌─────────────────────────────────────────────────────────────┐
│  External CDN Dependencies (per page):                       │
│  • Tailwind CSS (cdn.tailwindcss.com)                        │
│  • Google Fonts (Epilogue, Newsreader, Space Grotesk)        │
│  • Google Material Symbols Outlined                          │
│  • Google-hosted AIDA images (lh3.googleusercontent.com)     │
└─────────────────────────────────────────────────────────────┘
```

### Page Inventory

| Page | Directory | file | Purpose | Lines |
|------|-----------|------|---------|-------|
| Home/Landing | `home_the_persistence_of_intelligence/` | `code.html` | Hero section with headline, bento grid gallery, intro content | 197 |
| Insights/Blog | `insights_ethereal_inquiries/` | `code.html` | Journal-style articles with surrealist diagrams, asymmetric layout | 216 |
| Playground/Terminal | `playground_alchemist_s_terminal/` | `code.html` | Interactive AI tool console prototype (UI only — no JS logic) | 290 |
| Portfolio/Projects | `portfolio_archive_of_dreams/` | `code.html` | Project showcase with "drifting island" cards | 242 |

Each page directory also contains a `screen.png` screenshot of the rendered page.

### Code Sharing (or Lack Thereof)

**There is zero code sharing between pages.** Every page is a complete, self-contained HTML document that independently:

1. Loads Tailwind CSS from CDN (`https://cdn.tailwindcss.com`) — line 5-6 of each file
2. Defines the full inline `tailwind.config` with all 46 color tokens — lines 11-93 of each file
3. Loads Google Fonts (Epilogue, Newsreader, Space Grotesk) — lines 6-10 of each file
4. Loads Material Symbols Outlined font — lines 9-10 of each file
5. Defines inline `<style>` blocks — lines 95-126 of each file (slightly different per page)

**There is no navigation between pages.** All navigation links across all 4 pages use `href="#"` — they are visual placeholders, not functional links. The bottom nav bar (present on all pages) shows 4 tabs (Gallery, Archives, Atelier, Liminal) but clicking any tab produces no navigation.

**There is no JavaScript application logic.** The only JS is the inline Tailwind config block and CDN-loaded Tailwind runtime. No interactivity exists beyond hover effects (CSS transitions).

**There is no templating, no partials, no includes, no server-side rendering.** Each page is a plain `.html` file intended to be opened directly in a browser.

### Design Systems

Two competing design vision documents exist in the codebase:

| Aspect | Blueprint (root `DESIGN.md`) | Surrealist Echoes (`surrealist_echoes/DESIGN.md`) |
|--------|------------------------------|---------------------------------------------------|
| **Philosophy** | Structural, confident, grid-based | Surrealist, organic, dreamlike |
| **Background** | `#0A1128` Deep Blueprint (navy) | `#171305` Deep Desert Shadow (near-black umber) |
| **Primary accent** | `#E5989B` Rose Quartz (pink) | `#ffc66b` Sunset Gold (amber) |
| **Secondary accent** | `#4A90E2` Soft Cobalt (blue) | `#a4c9ff` Ethereal Blue |
| **Heading font** | Space Grotesk or IBM Plex Sans | Epilogue (light/extralight weights) |
| **Body font** | Merriweather or IBM Plex Serif | Newsreader |
| **Code font** | Fira Code / JetBrains Mono | Space Grotesk |
| **Layout** | Grid-based, 1px lines, architectural blueprint aesthetic | Fluid asymmetric flow, "melting" organic shapes, variable border-radius |
| **Shadows** | Clean structural shadows | "Melting shadows" — elongated, cast at extreme angles (`40px 10px 60px`) |
| **Implementation status** | **Not implemented** — exists only as a vision doc | **Fully implemented** — all 4 HTML pages use this palette |

**Critical finding:** All 4 HTML pages implement the **Surrealist Echoes** design system. The Blueprint design system described in the root `DESIGN.md` has never been implemented. The `SOFTWARE_DESIGN_SPECIFICATION.md` references a "grid/blueprint aesthetic" for the planned Next.js app, creating a potential conflict with the existing visual direction.

---

## Planned Architecture: Next.js Application

The `SOFTWARE_DESIGN_SPECIFICATION.md` (found at the repository root) describes the target architecture. **None of this has been implemented yet.**

### Framework Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Layer                           │
│                       Vercel Hosting                          │
├─────────────────────────────────────────────────────────────┤
│              Next.js App Router (Framework)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ app/layout.  │  │  app/page.   │  │  API Routes       │  │
│  │ tsx          │  │  tsx         │  │  /api/ai/*        │  │
│  │ (Layout.tsx) │  │  (Pages)     │  │  (Serverless fns) │  │
│  └──────────────┘  └──────────────┘  └────────┬──────────┘  │
│                                                 │            │
│                    Components:                  │            │
│  ┌───────────────────┐  ┌───────────────────────┐            │
│  │ PlaygroundDemo.tsx │  │ LeadCaptureForm.tsx   │            │
│  └───────────────────┘  └───────────┬───────────┘            │
│                                      │                        │
└──────────────────────────────────────┼────────────────────────┘
                                       │
                          ┌────────────┴────────────┐
                          │     Supabase (Postgres)   │
                          │     Table: playground_    │
                          │     leads                 │
                          └─────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │        AI API Proxying                │
                    │  ┌──────────────┐ ┌───────────────┐  │
                    │  │  OpenAI API  │ │  Gemini API   │  │
                    │  │  (text gen)  │ │  (multimodal) │  │
                    │  └──────────────┘ └───────────────┘  │
                    └─────────────────────────────────────┘
```

### Component Hierarchy (Planned)

The `SOFTWARE_DESIGN_SPECIFICATION.md` defines three top-level components:

```
Layout.tsx
├── Global grid background (blueprint aesthetic)
├── Top navigation bar
├── Footer (LinkedIn/Email links)
└── {children} (page content)

PlaygroundDemo.tsx
├── Interactive wrapper for ~7 AI tools
├── API state management (Loading, Success, Error)
└── Tool selection/input/output UI

LeadCaptureForm.tsx
├── Minimalist form UI
├── POST to Supabase (playground_leads table)
└── Intent selection (white-label / update-notification / beta-access)
```

### Route Design (App Router — Planned)

| Route | File (planned) | Purpose | Status |
|-------|---------------|---------|--------|
| `/` | `app/page.tsx` | Home/Landing — elevator pitch, CTAs | Not built |
| `/portfolio` | `app/portfolio/page.tsx` | Portfolio — timeline/Gantt chart | Not built |
| `/insights` | `app/insights/page.tsx` | Insights/Blog — academic paper layouts | Not built |
| `/playground` | `app/playground/page.tsx` | Experimental AI tools console | Not built |
| `/api/ai/openai` | `app/api/ai/openai/route.ts` | Proxy to OpenAI for text generation | Not built |
| `/api/ai/gemini` | `app/api/ai/gemini/route.ts` | Proxy to Gemini for multimodal tasks | Not built |

### API Routes & AI Proxying (Planned)

**Architecture pattern:** The frontend never calls external AI APIs directly. All AI requests route through Next.js API Routes (serverless functions on Vercel) to protect API keys.

- `POST /api/ai/openai` — Text generation, data structuring, logic processing
- `POST /api/ai/gemini` — Multimodal tasks (image/document upload analysis), fast text reasoning
- **Fallback/Routing Logic:** A utility function routes requests to whichever API is faster/cheaper for the specific playground tool

### Database Schema — Supabase (Planned)

**Table: `playground_leads`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `project_name` | String | e.g., "Experiment 04: Document Analyzer" |
| `email` | String (nullable) | User's email |
| `whatsapp` | String (nullable) | User's WhatsApp number |
| `intent` | Enum | `white-label`, `update-notification`, `beta-access` |
| `created_at` | Timestamp | Auto-generated |

### Data Flow (Planned Primary Request Path)

1. User interacts with a playground tool in `PlaygroundDemo.tsx`
2. Component sends POST to `app/api/ai/openai/route.ts` (or Gemini)
3. API route processor enriches the prompt, calls external AI API with server-side key
4. API route processor streams/returns the response to the client
5. `LeadCaptureForm.tsx` conditionally appears — on submit, POSTs to Supabase `playground_leads` table

**State Management:** React component-local state (`useState`/`useReducer`). No global state manager mentioned.

---

## Design System Disconnect

### Blueprint vs. Surrealist Echoes

The codebase contains **two mutually exclusive design visions:**

1. **Blueprint** (`DESIGN.md` at root):
   - Grid-based, architectural, structural
   - Deep navy background (`#0A1128`), pink Rose Quartz accent (`#E5989B`)
   - IBM Carbon-inspired rigidity
   - Typography: Space Grotesk headings + Merriweather body

2. **Surrealist Echoes** (`surrealist_echoes/DESIGN.md`):
   - Organic, surrealist, dreamlike
   - Near-black umber background (`#171305`), amber Sunset Gold accent (`#ffc66b`)
   - Anti-grid: fluid, asymmetric, "melting" shapes
   - Typography: Epilogue headings + Newsreader body + Space Grotesk labels

**All 4 HTML prototypes implement Surrealist Echoes.** The `SOFTWARE_DESIGN_SPECIFICATION.md` explicitly states the planned app will use a "grid/blueprint aesthetic" — referencing the Blueprint design that has never been built.

**Resolution required before development:** Decide whether to:
- **Option A:** Implement the planned Next.js app using Blueprint (per SDS spec), discarding the Surrealist Echoes prototypes
- **Option B:** Adopt Surrealist Echoes as the canonical design system and update the SDS to match
- **Option C:** Develop a hybrid — Blueprint structural layout with Surrealist Echoes color/texture treatment

### Shared Prototype DNA

Despite being standalone files, the 4 HTML prototypes share these consistent elements:

| Element | Consistency |
|---------|-------------|
| Tailwind CDN version | `?plugins=forms,container-queries` (all 4 pages) |
| Color palette | All 46+ Surrealist Echoes tokens (identical across all pages) |
| Typography | Epilogue (headlines), Newsreader (body), Space Grotesk (labels) — identical scale |
| Material Symbols | `Material Symbols Outlined` font loaded on all pages |
| Bottom Nav | 4 tabs: Gallery, Archives, Atelier, Liminal — identical structure, different active state |
| Footer | "DREAM_VOID" branding, "© 2024 THE PERSISTENCE OF MEMORY" |
| Image CDN | All images from `lh3.googleusercontent.com/aida-public/` |
| Theme | All pages use `class="dark"` on `<html>`, dark mode only |

---

## Architectural Constraints

- **No build pipeline:** Opening a `.html` file in a browser is the only deployment method currently possible
- **No code reuse:** Any change to the color palette must be manually duplicated across 4 files
- **No routing/Nav:** Navigation is non-functional — all `href="#"` — there is no way to move between pages
- **No environment configuration:** No `.env` files, no config — everything is hardcoded or CDN-loaded
- **No type safety:** Pure HTML — no TypeScript, no validation
- **No testing:** No test files exist anywhere
- **Global state:** Not applicable — no JavaScript application state exists
- **Circular imports:** Not applicable — no module system
- **Threading model:** Not applicable — single-threaded browser execution, no workers

## Error Handling

**Current state:** No error handling exists. CDN failures (tailwindcss.com, Google Fonts, image CDN) would silently break rendering with no fallback. No `<noscript>` tags, no loading indicators, no error boundaries.

**Planned state:** The SDS mentions `PlaygroundDemo.tsx` will handle API states (Loading, Success, Error) for AI requests.

## Cross-Cutting Concerns

**Logging:** None currently. Planned: standard Next.js/Vercel serverless logging for API routes.

**Validation:** None currently. Planned: form validation on `LeadCaptureForm.tsx`.

**Authentication:** No auth currently. No auth mentioned in SDS. Public-facing portfolio site.

---

*Architecture analysis: 2026-04-30*
