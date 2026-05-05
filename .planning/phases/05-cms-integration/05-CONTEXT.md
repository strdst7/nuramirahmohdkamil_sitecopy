# Phase 5: CMS Integration - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace hardcoded Insights articles and Portfolio projects with Contentful CMS — ISR-cached, rich-text rendered, with article detail pages and graceful fallback to static data.

This phase delivers: Contentful client setup and content fetching, ISR-cached Insights listing and article detail pages at `/insights/[slug]`, ISR-cached Portfolio listing, and graceful fallback to `src/data/` content when Contentful is unreachable.

</domain>

<decisions>
## Implementation Decisions

### Contentful content modeling (CMS-01, CMS-03)
- **D-01:** Contentful content types mirror the existing TypeScript interfaces — `Article` (id, title, date, excerpt, body, tags, iconName, diagramAlt, diagramSrc) and `Project` (id, number, title, description, tags, iconName, imageAlt, imageSrc, cta?, layout). Page components stay largely unchanged — only the data source changes.
- **D-02:** `body` field uses Contentful Rich Text type. `diagramSrc`/`imageSrc` use Contentful Media fields. Tags are a short-text list field. `iconName` is a short-text field (validated against Material Symbols names).

### Rich text rendering
- **D-03:** Use `@contentful/rich-text-react-renderer` with custom node renderers mapped to Surrealist Echoes typography tokens — headings to `font-headline-md`/`font-headline-lg`, body to `font-body-md`, bold to Epilogue semibold, etc. Supported node types: headings, bold, italic, unordered/ordered lists, horizontal rules (dividers), and blockquotes (pull-quote style). Embedded images are deferred — use a dedicated media field on the article instead of inline rich-text embeds.

### Article detail page (CMS-02)
- **D-04:** `/insights/[slug]` is an immersive long-form reading experience — full-width body text with ambient Surrealist Echoes blur elements, hero diagram from the article as a full-width header image, floating blockquote pull-quotes styled with the existing pull-quote pattern (amber-toned, rotated), and a back-navigation link to the Insights listing. Feels like stepping into the article.

### ISR and fallback strategy (CMS-04)
- **D-05:** ISR with `revalidate = 3600` (1 hour) on both Insights listing and Portfolio listing pages. `generateStaticParams` fetches slugs at request time for the detail page (also ISR `revalidate = 3600`).
- **D-06:** Stale-while-revalidate handles brief Contentful outages by serving the last cached version. The hardcoded `src/data/` files serve as the ultimate fallback when Contentful returns a server error (5xx) AND no cached version exists (cold cache scenario).
- **D-07:** On-demand revalidation via Contentful webhook deferred to a future phase.

### API key security (CMS-05)
- **D-08:** Contentful Delivery API key stored in `CONTENTFUL_DELIVERY_API_KEY` environment variable — accessed server-side only in content-fetching utilities. Never exposed to the client bundle. Contentful Space ID and Environment stored in `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ENVIRONMENT`.

### OpenCode's Discretion
- Exact Contentful SDK choice (`contentful` npm package vs `@contentful/rich-text-*` packages)
- Contentful client initialization pattern (singleton utility module vs inline)
- Rich text node renderer implementation details (exact mapping of Contentful node types to Tailwind classes)
- Article detail page layout specifics (responsive breakpoints, image sizing, pull-quote placement)
- Error boundary and loading state UX
- Exact revalidation timing (researcher validates 1hr against Contentful rate limits)
- Whether to keep `src/data/` files as TypeScript constants or convert to JSON for the fallback
- Contentful content type creation approach (manual via Contentful dashboard with provided schema)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements and roadmap
- `.planning/ROADMAP.md` §Phase 5 — Goal, success criteria, CMS-01 through CMS-05 requirements
- `.planning/REQUIREMENTS.md` §CMS Integration — CMS-01, CMS-02, CMS-03, CMS-04, CMS-05

### Current content data (being replaced — serve as fallback schema reference)
- `src/data/insights.ts` — Current Article interface and 3 hardcoded articles
- `src/data/projects.ts` — Current Project interface and 4 hardcoded projects

### Current page implementations (being updated)
- `src/app/insights/page.tsx` — Current Insights listing page (OrganicCard articles, diagram figure, pull-quote)
- `src/app/portfolio/page.tsx` — Current Portfolio listing page (drifting island cards, SVG decorations)

### Design system
- `surrealist_echoes/DESIGN.md` — Surrealist Echoes design tokens, typography scale, color palette
- `tailwind.config.ts` — Build-time Tailwind config with all 46 color tokens

### Shared components (Phase 1)
- `src/components/GlassPanel.tsx` — Glassmorphic card wrapper
- `src/components/OrganicCard.tsx` — Organic-shaped content card
- `src/components/DripBorder.tsx` — Animated bottom-border input component
- `src/components/PulseButton.tsx` — Organic-shaped CTA button
- `src/components/Icon.tsx` — Material Symbols icon wrapper
- `src/components/MeltingShadow.tsx` — Elongated shadow component

### Established patterns
- `src/app/api/ai/openai/route.ts` — Server-side env var proxy pattern (Phase 3)
- `src/lib/supabase.ts` — Server-side client initialization pattern (Phase 4)
- `.env.example` — Environment variable documentation pattern
- `.planning/codebase/CONVENTIONS.md` — Styling conventions, Next.js component patterns

### Project-level
- `.planning/PROJECT.md` — Core value, constraints, key decisions
- `.planning/STATE.md` — Current project state

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`GlassPanel`** — Glassmorphic card wrapper for article detail page sections
- **`OrganicCard`** — Organic-shaped card (used in current Insights listing — may be reused or replaced with simpler CMS-driven cards)
- **`Icon`** — Material Symbols wrapper — articles reference icon names that must work with this component
- **`PulseButton`** — CTA button for back-navigation or project CTAs
- **Surrealist Echoes tokens** — All typography, color, spacing tokens already available in Tailwind config

### Established Patterns
- **API route proxy pattern** (`src/app/api/ai/*/route.ts`) — Server-side `process.env` access for API keys, try/catch error handling, JSON response format. Contentful fetching follows the same server-side-access pattern (server components or utils, never client).
- **Next.js metadata pattern** — Each page exports `metadata` with title, description, openGraph. Article detail page should generate dynamic metadata per article.
- **`next/font/google` typography** — Epilogue, Newsreader, Space Grotesk self-hosted
- **Custom Tailwind tokens** — `text-headline-lg`, `font-body-lg`, `bg-surface-container`, etc.
- **Organic shapes** — `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]`, melting shadows, glassmorphism
- **Flat `src/components/` directory** for shared components

### Integration Points
- `src/app/insights/page.tsx` — Insights listing (replace `import { articles } from "@/data/insights"` with Contentful fetch)
- `src/app/portfolio/page.tsx` — Portfolio listing (replace `import { projects } from "@/data/projects"` with Contentful fetch)
- `src/app/layout.tsx` — Global layout with Header, BottomNavDock, Footer — all pages render inside `<main>`
- New: `src/app/insights/[slug]/page.tsx` — Article detail page (generateStaticParams + ISR)
- New: `src/lib/contentful.ts` — Contentful client utility (expected pattern)
- `src/data/insights.ts` + `src/data/projects.ts` — Retained as fallback data

### New Files Expected
- `src/lib/contentful.ts` — Contentful client initialization and fetch utilities
- `src/app/insights/[slug]/page.tsx` — Article detail page with ISR
- `src/lib/contentful-renderer.tsx` — Rich text node renderers (or inline in the detail page)
- Updated: `src/app/insights/page.tsx` — Replace data import with Contentful fetch
- Updated: `src/app/portfolio/page.tsx` — Replace data import with Contentful fetch
- Potentially: `src/lib/contentful-fallback.ts` — Fallback logic (or integrated into contentful.ts)

</code_context>

<specifics>
## Specific Ideas

- The article detail page should feel like stepping into the article — the hero diagram as a full-bleed header sets the tone, then the body text flows in a reading-friendly layout with Surrealist Echoes ambient elements.
- Pull-quotes in the detail page should follow the existing pull-quote pattern from the Insights listing (amber-toned, rotated, with decorative border).
- Back-navigation from the detail page should be unobtrusive but clear — a glass-panel back button or breadcrumb that fits the surrealist aesthetic.
- Portfolio project CTAs should continue to use `PulseButton` — this is already theme-consistent.

</specifics>

<deferred>
## Deferred Ideas

- **Contentful on-demand revalidation webhook** — Deferred to future phase (requires webhook infrastructure)
- **Contentful Preview API** — Deferred (admin use case not yet validated, per REQUIREMENTS.md out-of-scope)
- **Portfolio project detail pages** — Not in Phase 5 scope (no CMS-02 equivalent for projects)
- **Rich text embedded images** — Deferred to dedicated media field approach

</deferred>

---

*Phase: 05-cms-integration*
*Context gathered: 2026-05-06*
