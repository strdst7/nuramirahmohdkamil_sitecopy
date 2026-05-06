---
phase: 05-cms-integration
plan: 02
subsystem: CMS Integration — Rich Text Rendering & Article Detail
tags: [rich-text, contentful, article-detail, ISR, surrealist-echoes, typography]
requires: [05-01]
provides: [src/lib/contentful-renderer.tsx, src/app/insights/[slug]/page.tsx]
affects: [src/components/Icon.tsx]
key-decisions:
  - "RichTextRenderer uses 'use client' directive because @contentful/rich-text-react-renderer internally uses React hooks — only the rich text subtree is client-rendered, the page remains a server component"
  - "All heading levels (H1-H6) mapped to Surrealist Echoes typography tokens for completeness even though D-03 specifies only 'headings'"
  - "HR rendered as decorative three-part divider (gradient lines + dot) instead of bare <hr> — consistent with Surrealist Echoes aesthetic"
  - "Blockquote replicates exact pull-quote pattern from Insights listing page (amber-toned, rotated border, &ldquo; quotes)"
  - "EMBEDDED_ASSET and EMBEDDED_ENTRY return null explicitly — deferred per D-03"
  - "Article detail page uses article.bodyDoc (rich text Document from fetchArticleBySlug) rather than article.body (plain text) — adapting to Plan 01 output contract"
  - "Hero diagram header with full-width Image and glassmorphic caption overlay matches the existing figure/caption pattern from Insights listing"
  - "ISR configured with revalidate=3600, generateStaticParams pre-renders all known slugs, dynamicParams=true for new slugs"
tech-stack:
  added: ["@contentful/rich-text-react-renderer (used in custom renderer)", "@contentful/rich-text-types (BLOCKS, INLINES, MARKS constants)"]
  patterns: ["Surrealist Echoes typography tokens mapped to Contentful node types", "Glassmorphic UI with backdrop-blur and organic border radii", "ISR with generateStaticParams for dynamic routes", "Client component island wrapped in server component page"]
key-files:
  created:
    - src/lib/contentful-renderer.tsx
    - src/lib/__tests__/contentful-renderer.test.ts
    - src/app/insights/[slug]/page.tsx
    - src/app/insights/[slug]/__tests__/page.test.ts
  modified:
    - src/components/Icon.tsx (added "west" to IconName)
metrics:
  duration: 619 seconds (~10 min)
  completed_date: "2026-05-06T00:44:26Z"
  tasks: 2
  files_created: 4
  files_modified: 1
---

# Phase 05 Plan 02: Rich Text Rendering & Article Detail Page Summary

**One-liner:** Created a Contentful rich text renderer with Surrealist Echoes typography token mapping and an immersive long-form article detail page at /insights/[slug] with ISR, hero diagram, ambient blur, and pull-quote styling.

## TDD Gate Compliance

| Gate | Commit | Status |
|------|--------|--------|
| RED (Task 1) | `343f741` | ✅ 27 failing structural tests for RichTextRenderer |
| GREEN (Task 1) | `9b142c1` | ✅ All 27 tests passing, TypeScript clean |
| RED (Task 2) | `ffa7531` | ✅ 22 failing structural tests for article detail page |
| GREEN (Task 2) | `e9ef909` | ✅ All 23 tests passing, TypeScript clean, build succeeds |

## Tasks Executed

### Task 1: Rich Text Renderer (`src/lib/contentful-renderer.tsx`)

**What was built:** A `"use client"` React component `RichTextRenderer` that accepts Contentful rich text `Document` objects (or plain strings for fallback) and renders them with Surrealist Echoes typography via `@contentful/rich-text-react-renderer`.

**Renderer mappings:**
- **Headings:** H1 → `font-headline-lg text-headline-lg text-primary`, H2 → `font-headline-md text-headline-md text-on-surface`, H3 → `font-body-lg text-body-lg font-semibold`, H4 → `font-body-md text-body-md font-semibold`, H5-H6 → `font-label-sm text-label-sm`
- **Body:** Paragraph → `font-body-md text-body-md text-on-surface-variant leading-relaxed`
- **Lists:** UL → `list-disc pl-6 space-y-2`, OL → `list-decimal pl-6 space-y-2`
- **Marks:** BOLD → `font-semibold`, ITALIC → `italic`
- **Decorative:** HR → three-part divider (gradient lines + dot, `role="separator"`), BLOCKQUOTE → pull-quote pattern (amber-toned, rotated -12deg border, &ldquo; quotes)
- **Safety:** EMBEDDED_ASSET, EMBEDDED_ENTRY, INLINES.EMBEDDED_ENTRY → `null`
- **Links:** HYPERLINK → `target="_blank" rel="noopener noreferrer"` with primary-colored underline

**Content type handling:** Gracefully handles `Document` (rich text), `string` (fallback — split on double newlines), `null`/`undefined` (empty fragment), and unexpected types (returns null).

### Task 2: Article Detail Page (`src/app/insights/[slug]/page.tsx`)

**What was built:** An async server component that renders a long-form article reading experience at `/insights/[slug]` with ISR caching.

**Key features:**
- **ISR:** `revalidate = 3600`, `generateStaticParams()` pre-renders 3 articles (obs-04-12, obs-04-29, obs-05-07), `dynamicParams = true`
- **Dynamic metadata:** Per-article `<title>`, `<meta name="description">`, OpenGraph with `type: "article"` and OG image from diagram
- **Hero diagram:** Full-width `Image` with `mix-blend-luminosity`, group-hover reveal, glassmorphic caption overlay with title/date/icon. Falls back to text-only header when no `diagramSrc`
- **Rich text body:** Rendered via `<RichTextRenderer content={article.bodyDoc ?? article.body} />`
- **Tags:** Styled as organic asymmetric pills with primary container background
- **Ambient atmosphere:** 3 fixed-position blur elements (screen-blended tint orb, tertiary organic blur, primary glow)
- **Navigation:** Glass-panel back button at top, subtle text link in footer — both pointing to `/insights`
- **Error handling:** `notFound()` when `fetchArticleBySlug` returns null

**Layout:** `max-w-3xl` centered reading column with `px-fluid-gap`/`md:px-horizon` responsive padding

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test regex false positive for HR check**
- **Found during:** Task 1, GREEN phase
- **Issue:** Test `expect(content).not.toMatch(/<hr\s*\/?>/);` matched the comment text `"not a bare <hr>"` in the source file, causing a false failure
- **Fix:** Changed test to use a more specific JSX-context regex: `(?:return|=>)\s*\(\s*<hr\b`
- **Files modified:** `src/lib/__tests__/contentful-renderer.test.ts`
- **Commit:** `9b142c1` (included with GREEN implementation)

**2. [Rule 3 - Blocking] Added missing "west" icon to IconName type**
- **Found during:** Task 2, before GREEN phase
- **Issue:** Plan uses `name="west"` for back-navigation arrow but IconName union type only had "east", not "west"
- **Fix:** Added `"west"` to the IconName union type in `src/components/Icon.tsx`
- **Files modified:** `src/components/Icon.tsx`
- **Commit:** `e9ef909`

**3. [Adaptation] Used `article.bodyDoc` instead of `article.body` for rich text content**
- **Found during:** Task 2, GREEN phase
- **Issue:** Plan's interface assumed `fetchArticleBySlug` returns `Article` with `body: Document | string`. The actual Plan 01 implementation returns `Article & { bodyDoc: Document }` where `body` is always plain text and `bodyDoc` contains the rich text Document
- **Fix:** Used `article.bodyDoc ?? article.body` as the content prop for RichTextRenderer — prefers the rich text Document when available, falls back to plain text string
- **Files modified:** `src/app/insights/[slug]/page.tsx`
- **Commit:** `e9ef909`

## Verification Results

| Check | Result |
|-------|--------|
| `npx vitest run` (71 tests) | ✅ 71 passed, 0 failed |
| `npx tsc --noEmit` | ✅ Zero TypeScript errors |
| `npm run build` | ✅ 16/16 routes generated, 3 article slugs pre-rendered |
| Route verification (`[slug]` exists) | ✅ File at correct App Router path |
| Rich text safety (EMBEDDED_ASSET/ENTRY) | ✅ Both handled, return null |
| ISR config (`revalidate = 3600`) | ✅ Confirmed in build output |
| Surrealist Echoes token coverage | ✅ All 5 token families mapped |

## Build Output

```
├ ● /insights/[slug]             1h      1y
│ ├ /insights/obs-04-12          1h      1y
│ ├ /insights/obs-04-29          1h      1y
│ └ /insights/obs-05-07          1h      1y
```

Three hardcoded articles pre-rendered at build time (Contentful env vars not set). When Contentful is configured, `generateStaticParams` will fetch all published article slugs from the CMS.

## Self-Check

- [x] `src/lib/contentful-renderer.tsx` exists and exports `RichTextRenderer`
- [x] `src/app/insights/[slug]/page.tsx` exists as server component with ISR
- [x] All 4 commits verified in git log
- [x] 71 tests passing, TypeScript clean, build succeeds
- [x] SUMMARY.md created at `.planning/phases/05-cms-integration/05-02-SUMMARY.md`
