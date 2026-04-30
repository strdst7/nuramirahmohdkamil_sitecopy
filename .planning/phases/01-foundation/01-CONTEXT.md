# Phase 1: Foundation — Context

**Gathered:** 30 April 2026
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the Next.js App Router project with TypeScript, the Surrealist Echoes design system (build-time Tailwind), shared layout with global navigation, and self-hosted typography. All 5 pages stubbed with placeholder content.

This phase delivers: the project skeleton that every subsequent phase builds on. Content pages (Phase 2), AI integration (Phase 3), and lead capture (Phase 4) are out of scope — only the scaffold, routing, navigation, and design system are in scope here.

</domain>

<decisions>
## Implementation Decisions

### Next.js Scaffold Method
[auto] — Q: "`create-next-app` vs manual scaffold?" → Selected: "`create-next-app` with TypeScript, App Router, Tailwind" (recommended — gives proper defaults, ESLint config, tsconfig paths, and PostCSS setup out of the box)

- **D-01:** Scaffold via `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack` (App Router + `src/` directory)
- **D-02:** Use `src/` directory structure (not flat root) — separates app code from config files at root

### Design Token Extraction
[auto] — Q: "Map tokens 1:1 from surrealist_echoes/DESIGN.md vs reinterpret?" → Selected: "1:1 mapping preserving MD3 semantic naming" (recommended — prototypes already use these exact names in Tailwind classes, e.g. `bg-background`, `text-on-surface-variant`)

- **D-03:** All 47 color tokens from `surrealist_echoes/DESIGN.md` lines 3-48 go into `tailwind.config.ts` under `theme.extend.colors` with identical MD3 semantic names
- **D-04:** Spacing tokens (`horizon: 4rem`, `meridian: 1.5rem`, `fluid-gap: 2.5rem`, `drip: 0.75rem`) and border-radius tokens (`DEFAULT: 0.25rem`, `lg: 0.5rem`, `xl: 0.75rem`, `full: 9999px`) mapped exactly as defined
- **D-05:** Typography tokens (`fontFamily` and `fontSize` with bundled lineHeight/fontWeight/letterSpacing) mapped from `surrealist_echoes/DESIGN.md` lines 52-78
- **D-06:** Dark mode via `class` strategy (`darkMode: "class"`) — root `<html class="dark">` in layout — consistent with prototype pattern

### Typography Self-Hosting
[auto] — Q: "`next/font/google` vs `next/font/local`?" → Selected: "`next/font/google`" (recommended — automatically downloads fonts to `.next/static/`, no GDPR issues, zero CLS from network font loading)

- **D-07:** Epilogue (headlines) — variable font via `next/font/google`, weights 100-900, style: normal and italic
- **D-08:** Newsreader (body) — variable font via `next/font/google`, weights 200-800
- **D-09:** Space Grotesk (labels/micro-copy) — variable font via `next/font/google`, weights 300-700

### Material Symbols Icon Strategy
[auto] — Q: "Keep Material Symbols CDN vs bundle locally vs switch to Lucide React?" → Selected: "Bundle Material Symbols locally" (recommended — avoids CDN dependency, matches prototype icons exactly, no icon migration effort)

- **D-10:** Download Material Symbols Outlined woff2 from Google Fonts; bundle locally via `next/font/local` or `@next/font/google` with `Material Symbols Outlined` as the font family
- **D-11:** Define a reusable `<Icon>` component wrapping `<span className="material-symbols-outlined">` with configurable `FILL`, `wght`, `GRAD`, `opsz` via CSS `font-variation-settings`

### Shared Component Library
[auto] — Q: "Component organization: `src/components/ui/` vs co-located vs storybook-driven?" → Selected: "`src/components/` flat directory" (recommended — small project, 5 components, flat is simpler than deep nesting)

- **D-12:** Components in `src/components/` directory. Five surrealist components extracted from prototype patterns:
  - `GlassPanel` — backdrop-blur glassmorphism (`rgba(23,19,5,0.4)` + `backdrop-filter: blur(12px)`)
  - `OrganicCard` — irregular `border-radius` blob (`40% 60% 70% 30% / 40% 50% 60% 50%`) with melting shadows
  - `DripBorder` — single bottom border with gradient (input styling)
  - `PulseButton` — ellipsoid shape, inflates on hover (`scale: 1.05`), Sunset Gold with amber glow
  - `MeltingShadow` — extreme-angle box-shadow utility (`40px 10px 60px rgba(0,0,0,0.5)` variants)

### Layout Structure
[auto] — Q: "Layout architecture: single layout.tsx vs route groups?" → Selected: "Single `layout.tsx` with conditional sections as needed" (recommended — portfolio site, no auth gating, no route groups needed)

- **D-13:** Root `src/app/layout.tsx` renders: `<html class="dark">`, `<body>` with radial gradient background, `<Header>` (logo + desktop nav), `<main>{children}</main>`, `<BottomNavDock>` (mobile floating nav), `<Footer>`
- **D-14:** Bottom nav dock uses glassmorphism with 5 tabs: Home (`/`), Insights (`/insights`), Playground (`/playground`), Portfolio (`/portfolio`), Design (`/surrealist-echoes`)
- **D-15:** Desktop nav in header shows text links; mobile shows only bottom dock

### Page Route Naming
[auto] — Q: "Route naming: semantic vs directory-name based?" → Selected: "Semantic routes" (recommended — clean URLs, matches page purpose not prototype directory names)

- **D-16:** Routes from ROADMAP.md: `/` (Home), `/insights` (Blog), `/playground` (AI Playground), `/portfolio` (Projects), `/surrealist-echoes` (Design system reference)

### OpenCode's Discretion
- Exact ESLint and Prettier configuration (extends Next.js defaults)
- `tailwind.config.ts` TypeScript vs JavaScript (TypeScript preferred)
- Exact implementation of `<Icon>` component interface
- File structure for stub page content (placeholder text, temporary data)
- Exact ambient background element implementation (radial gradient + optional decorative elements)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (primary source of truth)
- `surrealist_echoes/DESIGN.md` — Complete design system specification: 47 color tokens (lines 3-48), typography scale (lines 52-78), spacing/border-radius tokens (lines 80-91), component design rules with hover behaviors and shadow specifications (lines 92-148). This is the canonical visual reference — every Tailwind token comes from this file.
- `surrealist_echoes/DESIGN.md` §Layout & Spacing — Asymmetric fluid flow, variable padding rules (lines 118-125)
- `surrealist_echoes/DESIGN.md` §Elevation & Depth — Melting shadow specifications, atmospheric perspective, glassmorphism parameters (lines 126-131)
- `surrealist_echoes/DESIGN.md` §Components — Button (PulseButton inflate behavior), input (DripBorder), cards (OrganicCard), floating nav dock (lines 140-148)

### Architecture Specification
- `SOFTWARE_DESIGN_SPECIFICATION.md` §2 — AI integration architecture, API route design (post /api/ai/openai, post /api/ai/gemini)
- `SOFTWARE_DESIGN_SPECIFICATION.md` §4 — Component architecture: Layout.tsx, PlaygroundDemo.tsx, LeadCaptureForm.tsx

### Prototype Reference (visual correctness check)
- `home_the_persistence_of_intelligence/code.html` — Home page prototype (hero layout, gallery grid, nav bar pattern)
- `playground_alchemist_s_terminal/code.html` — Most complete design system implementation (all custom CSS classes, ambient background, melting shadows, organic shapes defined at lines 95-126)
- `portfolio_archive_of_dreams/code.html` — Organic card blob shapes and drifting island layout

### Project Documents
- `.planning/ROADMAP.md` — Phase 1 requirements and success criteria
- `.planning/REQUIREMENTS.md` — PAGE-01, DSGN-01, DSGN-02, DSGN-03, INFR-01
- `.planning/codebase/CONVENTIONS.md` — Duplication patterns, CSS conventions, arbitrary value patterns (melting shadows, organic shapes)
- `.planning/codebase/CONCERNS.md` §1 — Technical concerns: CDN dependencies (🔴), code duplication (🔴), navigation gaps (🔴), font redundancy (🔴)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **46-color MD3 palette** — Fully defined in `surrealist_echoes/DESIGN.md` lines 3-48 and implemented in all 4 HTML prototypes. Extract 1:1 into `tailwind.config.ts`.
- **Custom CSS classes** — `.glass-panel`, `.organic-shape`, `.drip-border`, `.melting-shadow` defined at `playground_alchemist_s_terminal/code.html` lines 95-126. These are the implementation spec for the 5 shared components.
- **Arbitrary value patterns** — `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]` (blobs), `shadow-[40px_10px_60px_rgba(0,0,0,0.5)]` (melting shadows), `drop-shadow-[0_10px_20px_rgba(232,168,56,0.3)]` (brand glows). Documented in CONVENTIONS.md — convert to Tailwind component classes or config presets.
- **Ambient background** — `radial-gradient(circle at 50% 0%, #2e2a18 0%, #110e02 100%)` on `<body>` — use in root layout.
- **Navigation structure** — Bottom nav dock with 5 labeled tabs consistent across all 4 prototypes (identical HTML structure differing only in active tab highlight).

### Established Patterns
- `<html class="dark" lang="en">` — dark mode via class strategy on root element
- Poetic spacing token names (`horizon`, `meridian`, `fluid-gap`, `drip`)
- Material 3 semantic color naming (`primary`, `on-primary`, `surface-container`, etc.)
- Bundled typography tokens (fontSize + lineHeight + letterSpacing + fontWeight in one Tailwind class)

### Integration Points
- Next.js App Router `layout.tsx` at `src/app/layout.tsx` — wraps all pages, imports global CSS
- `tailwind.config.ts` at project root — extend with Surrealist Echoes tokens
- `src/app/globals.css` — Tailwind directives (`@tailwind base/components/utilities`), global body background, and icon font-face

</code_context>

<deferred>
## Deferred Ideas

- Storybook or component documentation — Phase 2 or later
- Light mode toggle — explicitly excluded; Surrealist Echoes is dark-only
- Responsive tablet layout refinement — Phase 2 handles responsive breakpoints
- Actual page content (hero copy, journal entries, project data) — Phase 2
- Navigation animation/transitions between pages — Phase 2 polish

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 30 April 2026*
*Mode: --auto (all gray areas auto-selected, recommended options chosen)*
