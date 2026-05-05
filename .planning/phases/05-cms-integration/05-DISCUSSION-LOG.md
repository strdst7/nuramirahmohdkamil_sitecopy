# Phase 5: CMS Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 05-cms-integration
**Areas discussed:** Contentful data modeling, Rich text rendering, Article detail page design, ISR & fallback strategy

---

## Contentful Data Modeling

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror existing shapes (Recommended) | Create Contentful content types matching current Article and Project interfaces. Keep components unchanged — just swap data source. | ✓ |
| Redesign for CMS flexibility | Rethink content model specifically for Contentful with rich-text, references, additional fields. | |
| Hybrid — keep shape, extend | Start with existing shape but add Contentful-native capabilities like rich-text body and linked media. | |

**User's choice:** Mirror existing shapes — keep Article/Project interfaces as Contentful content types.
**Notes:** Page components stay largely unchanged; only the data source changes from `src/data/` to Contentful.

---

## Rich Text Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Styled rich text with limits (Recommended) | Custom node renderers mapped to Surrealist Echoes tokens. Support headings, bold, italic, lists, dividers. Defer embedded images. | ✓ |
| Full rich text freedom | Render everything Contentful rich text supports including embedded images, entries, tables. | |
| Keep body as plain text | Skip rich text — body stays as plain text/markdown field. | |

**User's choice:** Styled rich text with limits — Surrealist Echoes-mapped node renderers, headings/bold/italic/lists/dividers supported.
**Notes:** Embedded images intentionally deferred to dedicated media field on the article content type rather than inline rich-text.

---

## Article Detail Page Design

| Option | Description | Selected |
|--------|-------------|----------|
| Immersive long-form (Recommended) | Full-width body text, ambient blur elements, hero diagram header, floating pull-quotes, back-navigation. | ✓ |
| Consistent card aesthetic | Same OrganicCard/GlassPanel style as listing page with expanded body text. | |

**User's choice:** Immersive long-form — dedicated reading experience that feels like stepping into each article.
**Notes:** Hero diagram as full-width header, ambient Surrealist Echoes blur elements, floating blockquote pull-quotes matching existing pull-quote pattern.

---

## ISR & Fallback Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid fallback (Recommended) | ISR revalidate=1hr, stale-while-revalidate for brief outages, hardcoded src/data/ as ultimate fallback for 5xx + cold cache. | ✓ |
| ISR-only fallback | ISR revalidate=3600s, stale cache only. Drop hardcoded data files. | |
| Hardcoded-first, ISR optional | Keep hardcoded data as primary, Contentful as optional overlay. | |

**User's choice:** Hybrid fallback — ISR with 1hr revalidation, stale-while-revalidate, src/data/ as ultimate safety net.
**Notes:** On-demand revalidation webhook deferred to future phase. src/data/ retained as fallback data files.

---

## OpenCode's Discretion

- Contentful SDK and package choices
- Contentful client initialization pattern
- Rich text node renderer implementation
- Article detail page layout specifics
- Error boundary and loading UX
- Revalidation timing validation against Contentful rate limits

## Deferred Ideas

- Contentful on-demand revalidation webhook — future phase
- Contentful Preview API — admin use case not yet validated
- Portfolio project detail pages — not in Phase 5 scope
