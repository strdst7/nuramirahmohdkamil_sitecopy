# Phase 3: AI Playground — Context

**Gathered:** 01 May 2026
**Status:** Ready for planning
**Note:** No discuss-phase was run — decisions are derived from ROADMAP, REQUIREMENTS, SDD, and prototype HTML. Gaps filled at OpenCode's discretion.

<domain>
## Phase Boundary

Build the interactive AI Playground page with live OpenAI and Gemini API integration proxied through secure Next.js API routes. The terminal UI must match the Surrealist Echoes prototype aesthetic from `playground_alchemist_s_terminal/code.html`.

This phase delivers: `/playground` page with working AI text generation (OpenAI) and multimodal analysis (Gemini), parameter sliders (temperature, hallucination), streaming output basin, melting-clock loader, and secure API key handling. Lead capture (Phase 4) is out of scope; it builds on Phase 3's API route patterns.

</domain>

<decisions>
## Implementation Decisions

### API Route Strategy (SDD-derived)
- **D-01:** All AI API calls proxy through Next.js API routes — `POST /api/ai/openai` and `POST /api/ai/gemini`. API keys live in environment variables, never exposed to the client
- **D-02:** OpenAI endpoint uses streaming (`stream: true` from OpenAI SDK) for progressive output display. Gemini endpoint uses multimodal mode when image is attached
- **D-03:** API routes follow Next.js App Router conventions: `src/app/api/ai/openai/route.ts` and `src/app/api/ai/gemini/route.ts`

### API Key Management (PLAY-05)
- **D-04:** `OPENAI_API_KEY` and `GEMINI_API_KEY` stored in `.env.local` (never committed). Server-side only — `process.env` access in route handlers
- **D-05:** `.env.example` documents required keys with placeholder values for other developers

### Playground UI (prototype-derived)
- **D-06:** Page structure follows prototype: left sidebar (alchemist tools/icon column), central console (prime-directive textarea + sliders + output basin), right panel (Inner Workings concept cards + decorative image)
- **D-07:** Temperature slider range 0–100 maps to 0–2.0 for API. Hallucination slider range 0–100 maps to 0–1.0 for API. Visual fill reflects Surrealist Echoes "bruised gradient" styling
- **D-08:** "The Alchemist's Terminal" page title preserved from prototype. "The Crucible" preserved as output basin label

### State Management
- **D-09:** Playground page is a Client Component ("use client") since it has interactive state (prompt, sliders, API response, loading, model selection)
- **D-10:** State: `prompt`, `image` (File | null), `model` ("openai" | "gemini"), `temperature` (0–100 slider), `hallucination` (0–100 slider), `response` (string), `isLoading` (boolean), `error` (string | null)

### OpenCode's Discretion
- Exact OpenAI SDK version and API patterns (streaming implementation)
- Gemini SDK choice (`@anthropic-ai/sdk` or `@google/generative-ai`)
- Error handling UX for API failures, rate limits, invalid inputs
- Slider CSS implementation (custom range input styling consistent with prototype)
- Loading state animation ("Melting Clock" — CSS-only or component)
- Model selector UI (tabs/toggle/buttons) for OpenAI vs Gemini
- Image upload UX component
- Right panel "Inner Workings" content — keep prototype content or update

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design system
- `surrealist_echoes/DESIGN.md` — Complete Surrealist Echoes design system (colors, typography, spacing, components)
- `tailwind.config.ts` — Build-time Tailwind config with all 46 color tokens, typography scale, spacing

### Prototype source (visual correctness reference)
- `playground_alchemist_s_terminal/code.html` — Full terminal page prototype: prime-directive input, sliders, output basin, sidebar, right panel

### Architecture
- `SOFTWARE_DESIGN_SPECIFICATION.md` — AI integration architecture (API route endpoints, database schema reference, component architecture)
- `.planning/codebase/CONVENTIONS.md` — Patterns from prototypes + planned Next.js conventions
- `.planning/codebase/ARCHITECTURE.md` — App Router structure and routing patterns

### Foundation (Phase 1 decisions)
- `.planning/phases/01-foundation/01-CONTEXT.md` — Phase 1 decisions: route naming, layout structure, shared components, icon strategy
- `src/app/layout.tsx` — Global layout (Header, Footer, BottomNavDock wrapping all pages)
- `src/components/` — Reusable components: GlassPanel, DripBorder, PulseButton, Icon, MeltingShadow, OrganicCard

### Project requirements
- `.planning/ROADMAP.md` — Phase 3 goal, success criteria, and key tasks
- `.planning/REQUIREMENTS.md` — PAGE-04, PLAY-01, PLAY-02, PLAY-03, PLAY-04, PLAY-05

### Known patterns to follow
- `.planning/codebase/CONVENTIONS.md` §Styling Conventions — organic shapes, melting shadows, glassmorphism, drop-shadows
- `.planning/codebase/CONVENTIONS.md` §Tailwind Configuration Pattern — token usage convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 1 shared components** — `GlassPanel` (glassmorphic panels), `DripBorder` (animated bottom-border inputs), `PulseButton` (asymmetric CTA buttons), `MeltingShadow` (elongated shadows), `Icon` (Material Symbols wrapper) — all in `src/components/`
- **Layout** — `src/app/layout.tsx` with Header, BottomNavDock, Footer wrapping all pages — playground page renders inside `<main>`
- **Design tokens** — All 46 colors, typography scale, spacing in `tailwind.config.ts`
- **Tailwind plugins** — `@tailwindcss/forms` and `@tailwindcss/container-queries` already configured

### Current Playground State
- `src/app/playground/page.tsx` — Current stub: "The Alchemist's Terminal" heading + placeholder text. Will be replaced entirely.

### Established Patterns
- Custom Tailwind tokens: `text-headline-lg`, `font-body-lg`, `bg-surface-container`, etc.
- Organic shapes via arbitrary Tailwind values: `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]`
- Melting shadows: `shadow-[40px_10px_60px_rgba(0,0,0,0.5)]`
- Glassmorphism: `backdrop-blur-xl bg-surface/40 border border-outline-variant/20`
- `next/font/google` for self-hosted typography (Epilogue, Newsreader, Space Grotesk)
- Material Symbols icon font loaded in layout.tsx head

### New Files to Create
- `src/app/api/ai/openai/route.ts` — POST handler for OpenAI proxy
- `src/app/api/ai/gemini/route.ts` — POST handler for Gemini proxy
- `src/app/playground/page.tsx` — Full playground page (replaces stub)
- `.env.example` — API key documentation
- `src/lib/ai-router.ts` — Optional: provider routing utility (v2 enhancement)

</code_context>

<deferred>
## Deferred Ideas

- **PLAY-06:** API routing logic to select fastest/cheapest AI provider per request (v2)
- **PLAY-07:** Saved prompt history and session replay (v2)
- **CMS-driven Insights content** — hardcoded content for v1
- **Model selector for additional providers** (Anthropic, Cohere) — v2
- **File upload for Gemini beyond images** (PDF, documents) — v2

</deferred>

---

*Phase: 03-ai-playground*
*Context gathered: 01 May 2026 (derived from roadmap + prototype + SDD)*
