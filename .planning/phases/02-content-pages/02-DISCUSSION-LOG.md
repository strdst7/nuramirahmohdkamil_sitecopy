# Phase 2: Content Pages — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-01
**Phase:** 02-content-pages
**Areas discussed:** Prototype fidelity, Navigation labels, Brand identity, Content data strategy

---

## Prototype Fidelity

| Option | Description | Selected |
|--------|-------------|----------|
| Clean up and unify | Fix inconsistencies — normalize icon weights, add alt text, unify class naming, remove dead code. Preserve visual aesthetic with production-grade code. |  |
| Reproduce exactly | Match prototypes pixel-for-pixel including quirks — same icon weights per page, keep data-alt, preserve class naming quirks. |  |
| You decide | OpenCode picks the right balance — clean up where it matters, preserve where the quirk is intentional | ✓ |

**User's choice:** You decide — OpenCode has discretion on fidelity balance but should clean up where it matters for production quality and preserve where the quirk is intentional to the surrealist aesthetic.
**Notes:** Phase 2 has Lighthouse ≥ 90 Accessibility requirement so alt text fixes and ARIA labels are mandatory, not optional.

---

## Navigation Labels

| Option | Description | Selected |
|--------|-------------|----------|
| Semantic labels | Home, Insights, Playground, Portfolio — matches actual routes and SEO page titles | ✓ |
| Prototype labels | Keep poetic labels: Gallery, Archives, Atelier, Liminal |  |
| You decide | OpenCode picks |  |

**User's choice:** Semantic labels (Recommended)
**Notes:** Routes are already semantic from Phase 1. Navigation should clearly indicate page destinations.

---

## Brand Identity

| Option | Description | Selected |
|--------|-------------|----------|
| NUR AMIRAH MOHD KAMIL | Personal name — professionally identifiable, better for SEO and personal brand | ✓ |
| DREAM_VOID | Poetic brand name from most prototypes — mysterious and surrealist |  |
| Both — name as main, DREAM_VOID as tagline | Header shows name, footer/subtitle says DREAM_VOID |  |

**User's choice:** "NUR AMIRAH MOHD KAMIL" canonical across all pages (Recommended)
**Notes:** Footer can still show DREAM_VOID as subtitle/tagline (this was captured as D-05 in CONTEXT.md).

---

## Content Data Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Inline JSX | Content hardcoded directly in page components — simple, no abstraction |  |
| Extracted to data files | Content in src/data/ as TypeScript constants — cleaner separation | ✓ |
| You decide | OpenCode picks per page |  |

**User's choice:** Extracted to data files (Recommended)
**Notes:** Content lives in `src/data/insights.ts` and `src/data/projects.ts`. Home hero copy stays inline (single-use, tightly coupled to layout).

---

## OpenCode's Discretion

- Exact balance of prototype fidelity vs cleanup per page
- Icon weight/FILL normalization for the `<Icon>` component
- CSS class name unification
- Content data shape and TypeScript interfaces
- Image asset creation/replacement strategy for `/public/images/`
- Responsive breakpoint specifics (Home split-screen threshold, Portfolio grid column counts)
- Per-page SEO metadata copy (title, description, OG tags)

## Deferred Ideas

None — discussion stayed within phase scope.

---

*Log generated: 2026-05-01*
