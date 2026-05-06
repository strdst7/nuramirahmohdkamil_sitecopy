# Phase 2: Content Pages — Context

**Gathered:** 01 May 2026
**Status:** Ready for planning

<domain>
## Phase Boundary

Port the Home, Insights, and Portfolio HTML prototypes into functioning Next.js pages with responsive layouts, local image assets, and SEO metadata. The Surrealist Echoes aesthetic must be faithfully reproduced from the prototypes.

This phase delivers: content-filled pages for `/`, `/insights`, and `/portfolio` — building on the Phase 1 scaffold (layout, design tokens, shared components). AI Playground (Phase 3) and Lead Capture (Phase 4) are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Prototype fidelity
- **D-01:** OpenCode's discretion on fidelity — clean up prototype inconsistencies where they hurt production quality, preserve quirks where they contribute to the surrealist aesthetic
- **D-02:** Fix accessibility gaps from prototypes — use real `alt` text (not `data-alt`), add ARIA labels to interactive elements, ensure keyboard navigation. Lighthouse ≥ 90 Accessibility is a success criterion
- **D-03:** Normalize Material Symbols icon handling across pages — consistent weight/FILL settings, no duplicate stylesheet loads, use Phase 1 `<Icon>` component

### Brand identity
- **D-04:** Header brand text is "NUR AMIRAH MOHD KAMIL" across all pages (not "DREAM_VOID")
- **D-05:** "DREAM_VOID" appears in footer/copyright as the poetic brand tagline

### Navigation
- **D-06:** Navigation labels use semantic names matching routes: Home, Insights, Playground, Portfolio (not prototype labels Gallery, Archives, Atelier, Liminal)
- **D-07:** Active nav tab highlights based on current route

### Content data strategy
- **D-08:** Page content (Insights articles, Portfolio projects) lives in `src/data/` as TypeScript constants — `src/data/insights.ts`, `src/data/projects.ts`
- **D-09:** Home page hero copy lives inline in the page component (single-use, tightly coupled to layout)

### OpenCode's Discretion
- Exact balance of prototype fidelity vs cleanup per page (visual quirks worth preserving vs bugs to fix)
- Icon weight/FILL normalization for the `<Icon>` component
- CSS class name unification (`.symbol-fill` vs `.symbol-filled` resolved)
- Content data shape and TypeScript interfaces
- Exact image asset creation/replacement strategy for `/public/images/`
- Responsive breakpoint specifics (Home split-screen threshold, Portfolio grid column counts)
- Per-page SEO metadata copy (title, description, OG tags)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design system
- `surrealist_echoes/DESIGN.md` — Complete Surrealist Echoes design system (colors, typography, spacing, components, elevation)
- `surrealist_echoes/DESIGN.md` §Components — Button, input, cards, floating nav dock specifications
- `surrealist_echoes/DESIGN.md` §Layout & Spacing — Asymmetric fluid flow, variable padding rules

### Prototype source (visual correctness reference)
- `home_the_persistence_of_intelligence/code.html` — Home page prototype: hero layout, gallery grid, nav bar pattern
- `insights_ethereal_inquiries/code.html` — Insights page prototype: journal-style article, asymmetric 2-col layout, ambient backgrounds
- `portfolio_archive_of_dreams/code.html` — Portfolio page prototype: drifting island cards, organic blob shapes, SVG decorative elements

### Known issues to address
- `.planning/codebase/CONVENTIONS.md` §Inconsistencies — 12 documented prototype inconsistencies to resolve (icon weights, `font-epilogue` usage, `data-alt`, class naming, duplicate loading, brand text, header styling, nav tab styles, body backgrounds, variant naming, responsive behavior, tag style)

### Project requirements
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, and key tasks
- `.planning/REQUIREMENTS.md` — PAGE-02, PAGE-03, PAGE-05, DSGN-04, INFR-02, INFR-03

### Foundation (Phase 1 decisions that constrain Phase 2)
- `.planning/phases/01-foundation/01-CONTEXT.md` — Phase 1 decisions: route naming, layout structure, design token extraction, shared components, typography self-hosting, icon strategy

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 1 shared components** — `GlassPanel`, `OrganicCard`, `DripBorder`, `PulseButton`, `MeltingShadow` in `src/components/` — use for cards, buttons, panels throughout content pages
- **Phase 1 `<Icon>` component** — Reusable Material Symbols icon wrapper in `src/components/` — use for all icons across content pages
- **Layout** — `src/app/layout.tsx` with Header, BottomNavDock, Footer already wraps all pages
- **Design tokens** — All 46 colors, typography scale, spacing in `tailwind.config.ts` — use same token classes as prototypes

### Established Patterns
- `src/` directory structure (app code in src/, config at root)
- Flat `src/components/` directory for shared components
- `next/font/google` for self-hosted typography (Epilogue, Newsreader, Space Grotesk)
- Custom Tailwind tokens: `text-headline-lg`, `font-body-lg`, `bg-surface-container`, etc.
- Organic shapes via arbitrary Tailwind values: `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]`
- Melting shadows: `shadow-[40px_10px_60px_rgba(0,0,0,0.5)]`
- Glassmorphism: `backdrop-blur-xl bg-surface-container/40 border border-outline/10`

### Integration Points
- `src/app/page.tsx` — Home page (currently stub, replace with ported content)
- `src/app/insights/page.tsx` — Insights page (currently stub, replace)
- `src/app/portfolio/page.tsx` — Portfolio page (currently stub, replace)
- `src/data/insights.ts` — New file: article/entry data
- `src/data/projects.ts` — New file: project card data
- `public/images/` — New images directory (replace Google-hosted placeholders)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. Remaining gray areas (image asset specifics, responsive breakpoint details, SEO copy) left to OpenCode's discretion.

</deferred>

---

*Phase: 02-content-pages*
*Context gathered: 01 May 2026*
