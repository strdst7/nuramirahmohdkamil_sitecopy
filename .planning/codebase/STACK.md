# Technology Stack

**Analysis Date:** 2026-04-30

## Current Stack (Prototype Phase)

The project is currently a **static HTML5 design prototype** with no build tooling, no package manager, and no JavaScript frameworks. All 4 pages are self-contained `.html` files that load dependencies from CDN at runtime.

### Markup

**Language:** HTML5 (`<!DOCTYPE html>`)

**Files:**

| Page | Path | Lines |
|------|------|-------|
| Home — The Persistence of Intelligence | `home_the_persistence_of_intelligence/code.html` | 197 |
| Insights — Ethereal Inquiries | `insights_ethereal_inquiries/code.html` | 216 |
| Playground — The Alchemist's Terminal | `playground_alchemist_s_terminal/code.html` | 290 |
| Portfolio — The Archive of Dreams | `portfolio_archive_of_dreams/code.html` | 242 |

All pages share:
- `<html class="dark" lang="en">` — dark mode enforced via the Tailwind `class` strategy
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- No `<script>` of custom JavaScript (zero interactivity beyond CSS `:hover`/`transition`)
- Structural components per page: `<header>` (TopAppBar), `<main>`, `<nav>` (mobile BottomNavBar), `<footer>`

### Styling

**Framework:** Tailwind CSS v3 (CDN/playground build)
- CDN URL: `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Plugins enabled: `forms`, `container-queries`

The CDN build allows the Tailwind config to be defined inline via `tailwind.config = {…}` — see **Configuration Approach** below.

**Custom CSS:** Inline `<style>` blocks supplement Tailwind with:
- Material Symbols variable font settings (e.g., `.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }`)
- Utility classes for the surrealist aesthetic (found in `playground_alchemist_s_terminal/code.html` lines 95–126):
  - `.melting-shadow` — extreme-angle box shadows (`40px 10px 60px rgba(0,0,0,0.5)`)
  - `.glass-panel` — backdrop-blur glassmorphism (`rgba(23,19,5,0.4)` with `backdrop-filter: blur(12px)`)
  - `.organic-shape` — irregular border-radius blob (`40% 60% 70% 30% / 40% 50% 60% 50%`)
  - `.drip-border` — single bottom border with gradient
- Body background: `radial-gradient(circle at 50% 0%, #2e2a18 0%, #110e02 100%)` (`playground_alchemist_s_terminal/code.html` lines 122–125)

**Design System Source:** `surrealist_echoes/DESIGN.md` (148 lines) — the canonical design token source defining colors, typography, spacing, elevation, shapes, and component patterns. The inline Tailwind configs in all 4 HTML files are programmatic translations of this design spec.

### Typography & Icons

**Font Services:** Google Fonts (CDN)

Three font families loaded across all pages:

| Font | Role | CSS Family | Weights |
|------|------|------------|---------|
| Epilogue | Headlines (`headline-lg`, `headline-md`) | `'Epilogue', sans-serif` | 100–900 |
| Newsreader | Body text (`body-lg`, `body-md`) | `'Newsreader', serif` | 200–800 |
| Space Grotesk | Labels / micro-copy (`label-sm`) | `'Space Grotesk', sans-serif` | 300–700 |

**Font loading variation:** Most pages use variable font URLs (e.g., `Epilogue:ital,wght@0,100..900;1,100..900`). The Playground page (`playground_alchemist_s_terminal/code.html` line 8) uses non-variable discrete weights (e.g., `Epilogue:wght@200;300;400;500;700;800;900`), resulting in slightly lighter font loading but less flexible weight ranges.

**Icon Font:** Material Symbols (Google Fonts)
- URL: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap`
- Class: `.material-symbols-outlined`
- Used for all UI icons: `vibration`, `unfold_more`, `category`, `auto_stories`, `palette`, `blur_on`, `memory`, `visibility`, `science`, `pest_control`, `hourglass_empty`, `water_drop`, `all_inclusive`, `bubble_chart`, `east`, `hive`, `psychology`, `flare`, `thermostat`, `filter_vintage`, `blur_circular`
- Note: The icon font link is sometimes loaded twice per page (duplicated `<link>` tags)

### Configuration Approach

**No build-time config files exist.** There is no `package.json`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.*`, or `.prettierrc*`.

All configuration is inline within each HTML file's `<head>`:

1. **Tailwind config** — `<script id="tailwind-config">` block (e.g., `home_the_persistence_of_intelligence/code.html` lines 11–94):
   ```javascript
   tailwind.config = {
       darkMode: "class",
       theme: {
           extend: {
               colors: { /* 50+ MD3 color tokens */ },
               borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
               spacing: { horizon: "4rem", meridian: "1.5rem", "fluid-gap": "2.5rem", drip: "0.75rem" },
               fontFamily: { "body-lg": ["Newsreader"], "headline-lg": ["Epilogue"], … },
               fontSize: { "body-lg": ["20px", { lineHeight: "1.6", fontWeight: "400" }], … }
           }
       }
   }
   ```

2. **Custom styles** — `<style>` block for Material Symbols settings and page-specific utility classes.

3. **Font loading** — `<link>` tags pointing to `fonts.googleapis.com`.

**Color Palette** (as configured inline, derived from `surrealist_echoes/DESIGN.md`):
- **Background/Surface scale:** `background` (#171305), `surface` (#171305), `surface-dim` (#171305), `surface-container-lowest` (#110e02), `surface-container-low` (#1f1c0b), `surface-container` (#23200f), `surface-container-high` (#2e2a18), `surface-container-highest` (#393522), `surface-bright` (#3e3926)
- **Primary (Sunset Gold):** `primary` (#ffc66b), `primary-container` (#e8a838), `on-primary` (#432c00), `on-primary-container` (#5f3f00)
- **Secondary (Ethereal Blue):** `secondary` (#a4c9ff), `secondary-container` (#0164b4), `on-secondary` (#00315d)
- **Tertiary (Desert Shadow):** `tertiary` (#eac9b4), `tertiary-container` (#cdae9a), `on-tertiary` (#402c1e)
- **Error:** `error` (#ffb4ab), `error-container` (#93000a)
- **Text:** `on-surface` (#ebe2c8), `on-surface-variant` (#d5c4af), `on-background` (#ebe2c8)
- **Outlines:** `outline` (#9d8e7c), `outline-variant` (#504535)
- **Fixed/Inverse variants** for Material Design 3 tonal palette completeness

---

## Planned Stack (Production Phase)

Source: `SOFTWARE_DESIGN_SPECIFICATION.md` (root, 4 sections). This stack is **not yet implemented**.

### Framework & Runtime

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Next.js** (App Router) | Full-stack React framework, file-based routing, server components |
| UI Library | **React** | Component rendering (version unspecified) |
| Language | TypeScript (implied by Next.js conventions) | Type safety |

### Styling (Build-time)

**Tailwind CSS** — migrated from CDN to build-time compilation. The inline `tailwind.config` from the current prototypes will be extracted into `tailwind.config.ts` (or `.js`). PostCSS plugin used for tree-shaking unused styles at build time.

The custom color palette, font families, font sizes, and spacing tokens from `surrealist_echoes/DESIGN.md` carry forward.

### Backend & API

**Next.js API Routes** (serverless functions) serve as the backend:
- `POST /api/ai/openai` — proxy for OpenAI text generation / structuring requests
- `POST /api/ai/gemini` — proxy for Google Gemini multimodal and text reasoning requests
- A routing/fallback utility selects between OpenAI and Gemini based on latency, cost, or task type
- API keys stored as environment variables (never exposed to the client)

### Database

**Supabase** (Serverless PostgreSQL):

Table: `playground_leads`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `project_name` | String | e.g., "Experiment 04: Document Analyzer" |
| `email` | String (nullable) | User's email |
| `whatsapp` | String (nullable) | User's WhatsApp number |
| `intent` | Enum | `'white-label'`, `'update-notification'`, `'beta-access'` |
| `created_at` | Timestamp | Auto-generated |

### AI Integrations

- **OpenAI API** — text generation, data structuring, logic processing. Called server-side via `/api/ai/openai`.
- **Google Gemini API** — multimodal tasks (image/document analysis), fast text reasoning. Called server-side via `/api/ai/gemini`.

Both are consumed exclusively through Next.js API routes (no client-side API key exposure).

### Hosting & Deployment

**Vercel** — seamless Next.js deployment with Edge Functions for low-latency AI response streaming.

### Component Architecture (Planned)

From `SOFTWARE_DESIGN_SPECIFICATION.md` section 4:

| Component | File (Planned) | Responsibility |
|-----------|----------------|----------------|
| Layout | `Layout.tsx` | Global grid background, top navigation bar, footer with LinkedIn/Email links |
| PlaygroundDemo | `PlaygroundDemo.tsx` | Interactive wrapper for 7 playground tools; manages API state (Loading, Success, Error) |
| LeadCaptureForm | `LeadCaptureForm.tsx` | Reusable minimalist form; POSTs to Supabase to save user interest |

---

*Stack analysis: 2026-04-30*
