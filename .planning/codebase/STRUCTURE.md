# Codebase Structure

**Analysis Date:** 2026-04-30

## Current File Organization

### Directory Tree

```
nuramirahmohdkamil_site/
├── .planning/
│   └── codebase/                    # Codebase map output directory (empty — being populated now)
├── DESIGN.md                        # "Blueprint" design vision (NOT implemented — superseded)
├── SOFTWARE_DESIGN_SPECIFICATION.md # Planned Next.js architecture (NOT implemented)
│
├── home_the_persistence_of_intelligence/    # Home/Landing page prototype
│   ├── code.html                            # Full standalone page (197 lines)
│   └── screen.png                           # Screenshot of rendered page
│
├── insights_ethereal_inquiries/             # Insights/Blog page prototype
│   ├── code.html                            # Full standalone page (216 lines)
│   └── screen.png                           # Screenshot of rendered page
│
├── playground_alchemist_s_terminal/         # Playground/Terminal page prototype
│   ├── code.html                            # Full standalone page (290 lines)
│   └── screen.png                           # Screenshot of rendered page
│
├── portfolio_archive_of_dreams/             # Portfolio/Projects page prototype
│   ├── code.html                            # Full standalone page (242 lines)
│   └── screen.png                           # Screenshot of rendered page
│
└── surrealist_echoes/                       # Actual design system in use
    └── DESIGN.md                            # Surrealist Echoes design spec (148 lines)
```

### Directory Purposes

**`home_the_persistence_of_intelligence/`:**
- Purpose: Landing/home page prototype — the user's first impression
- Contains: `code.html` (standalone HTML), `screen.png` (screenshot)
- Key files: `code.html`

**`insights_ethereal_inquiries/`:**
- Purpose: Blog/insights/research journal prototype
- Contains: `code.html` (standalone HTML), `screen.png` (screenshot)
- Key files: `code.html`

**`playground_alchemist_s_terminal/`:**
- Purpose: Interactive AI experimentation console prototype (UI only)
- Contains: `code.html` (standalone HTML — the largest at 290 lines), `screen.png` (screenshot)
- Key files: `code.html`

**`portfolio_archive_of_dreams/`:**
- Purpose: Project portfolio/showcase prototype
- Contains: `code.html` (standalone HTML), `screen.png` (screenshot)
- Key files: `code.html`

**`surrealist_echoes/`:**
- Purpose: Documents the actual design system used by all 4 HTML prototypes
- Contains: `DESIGN.md` — YAML frontmatter with full color palette (46 tokens), typography scale, spacing, components spec, plus 55 lines of design philosophy
- Key files: `DESIGN.md`

**`.planning/codebase/`:**
- Purpose: Stores codebase map documents consumed by GSD commands
- Generated: Yes (by `/gsd-map-codebase`)
- Committed: Yes

### Page-to-Route Mapping (Current)

There is no routing. Each `code.html` file is independently openable in a browser. The conceptual mapping is:

| Prototype Page | Directory | Intended Conceptual Route |
|----------------|-----------|---------------------------|
| Home / Landing | `home_the_persistence_of_intelligence/` | `/` or `/home` |
| Insights / Blog | `insights_ethereal_inquiries/` | `/insights` |
| Playground / Terminal | `playground_alchemist_s_terminal/` | `/playground` |
| Portfolio / Projects | `portfolio_archive_of_dreams/` | `/portfolio` |

No page links to any other page. Navigation tabs (Gallery, Archives, Atelier, Liminal) are present on all pages but use `href="#"`.

### Naming Conventions (Current)

**Directory names:** Surrealist, poetic, lowercase with underscores:
- `home_the_persistence_of_intelligence` — "Persistence of Intelligence" (Dali reference)
- `insights_ethereal_inquiries` — "Ethereal Inquiries"
- `playground_alchemist_s_terminal` — "The Alchemist's Terminal"
- `portfolio_archive_of_dreams` — "Archive of Dreams"

**File names within directories:** Flat and generic:
- `code.html` — Every page is named identically. The directory name carries the semantic meaning.
- `screen.png` — Screenshot, identical naming across all pages.

**Bottom nav tab labels** (consistent across all 4 pages): Gallery, Archives, Atelier, Liminal

**Brand name:** `DREAM_VOID` (all caps, appears in all headers and footers)

**Footer copyright:** `THE PERSISTENCE OF MEMORY` (Dali painting reference)

### File Contents Summary

Each `code.html` file follows an identical structure template:

```
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  1. Meta tags (charset, viewport)
  2. <title> — unique per page
  3. Tailwind CSS CDN script (cdn.tailwindcss.com?plugins=forms,container-queries)
  4. Google Fonts preconnect + stylesheet links (Epilogue, Newsreader, Space Grotesk)
  5. Material Symbols Outlined font (loaded twice in some pages)
  6. Inline <script> — tailwind.config = { ... full Surrealist Echoes config }
  7. Inline <style> — Material Symbols settings, custom CSS classes per page
</head>
<body class="bg-background text-on-background ...">
  8. Ambient background (fixed radial gradient blur div) — varies per page
  9. <header> — TopAppBar with "DREAM_VOID" or "NUR_AMIRAH_MOHD_KAMIL" branding
 10. <main> — Page-specific content layout
 11. <nav> — BottomNavBar for mobile (Glassmorphism pill with 4 tabs)
 12. <footer> — DREAM_VOID branding + copyright
</body>
</html>
```

#### Page-Specific Content Summaries

**Home (`home_the_persistence_of_intelligence/code.html`, 197 lines):**
- Hero section (`min-h-[819px]`) with centered headline "The Persistence of Intelligence" and italic subtext
- Decorative floating element: rounded blob with `memory` Material Symbol icon
- Bento-grid gallery section (12-column grid): "Synaptic Landscapes" card (span 8) + "Echo Chambers" card (span 4) with background image
- Navigation: Gallery tab is active (but all `href="#"`)
- Header branding: "NUR_AMIRAH_MOHD_KAMIL" (only page using this — others use DREAM_VOID)

**Insights (`insights_ethereal_inquiries/code.html`, 216 lines):**
- Two ambient background blurs (gold top-left, tertiary bottom-right)
- Title section rotated `-2deg` with `border-l` accent
- Asymmetric grid layout: left column (span 7) has "Observation 04.12" journal-style melting card with surrealist bullet points using "ant" (`pest_control`) and hourglass icons
- Right column (span 5) has a diagram card with figcaption, hover reveals image
- Navigation: Archives tab is active (blurred text style)
- Desktop nav shows 4 text links (Gallery, Archives, Atelier, Liminal) — Archives is underlined

**Playground (`playground_alchemist_s_terminal/code.html`, 290 lines — largest page):**
- Most complex layout: three-column (`lg:flex-row`) — left sidebar, central console, right panel
- Custom CSS classes defined: `.melting-shadow`, `.glass-panel`, `.organic-shape`, `.drip-border`
- Body has fixed radial gradient background via inline CSS
- Left sidebar: vertical icon column in a glass panel with organic shape border-radius
- Central console: "The Alchemist's Terminal" headline, input form with textarea ("PRIME DIRECTIVE"), two range sliders (TEMPERATURE, HALLUCINATION) with liquid-fill visual effect, "Transmute" submit button, output "Crucible" basin
- Right panel: "Inner Workings" panel with 3 concept cards (SYNAPTIC DRIFT, LATENT VISION, COGNITIVE RESONANCE), plus decorative surreal anatomy image
- Navigation: Atelier tab is active
- Desktop nav: 4 text links with Atelier highlighted in amber

**Portfolio (`portfolio_archive_of_dreams/code.html`, 242 lines):**
- Custom CSS class `.ambient-glow` — fixed radial gradient
- Inline SVG with Bezier curve paths and circles for decorative "connections"
- Page title "The Archive of Dreams" with `border-l` accent
- Two "Drifting Island" project cards:
  - Island 1 (smaller, right-aligned): "Echoes of the Melted Grid" with UX Subversion + Tactile tags
  - Island 2 (larger, left-aligned): "The Weightless Atelier" with horizontal layout (text + image), "Explore Fluidity" CTA button
- Floating decorative element: hourglass icon in a rounded blob, animated pulse
- Navigation: Archives tab is active (conflict with Insights page — both claim Archives as active)
- Each card has distinct organic border-radius values (e.g., `rounded-[4rem_2rem_5rem_3rem]`, `rounded-[3rem_6rem_4rem_5rem]`)

---

## Planned Structure: Next.js App Router

The `SOFTWARE_DESIGN_SPECIFICATION.md` describes the target architecture. **None of this exists yet** — this is the planned file structure that should be created during implementation.

### Proposed Directory Layout

```
nuramirahmohdkamil_site/
├── app/                                    # Next.js App Router root
│   ├── layout.tsx                          # Root layout: grid background, nav, footer
│   ├── page.tsx                            # Home/Landing page
│   ├── globals.css                         # Global styles (Tailwind directives + custom)
│   │
│   ├── portfolio/
│   │   └── page.tsx                        # Portfolio: project timeline/Gantt chart view
│   │
│   ├── insights/
│   │   └── page.tsx                        # Insights/Blog: academic paper style layouts
│   │
│   ├── playground/
│   │   └── page.tsx                        # Playground: AI tools console
│   │
│   └── api/
│       └── ai/
│           ├── openai/
│           │   └── route.ts                # POST handler: proxy to OpenAI API
│           └── gemini/
│               └── route.ts                # POST handler: proxy to Gemini API
│
├── components/                             # Reusable React components
│   ├── Layout.tsx                          # Global grid background, nav, footer
│   ├── PlaygroundDemo.tsx                  # Interactive AI tool wrapper (7 tools)
│   └── LeadCaptureForm.tsx                 # Minimalist form → Supabase
│
├── lib/                                    # Utilities and shared logic
│   ├── supabase.ts                         # Supabase client initialization
│   └── ai-router.ts                        # AI request routing/failover logic
│
├── types/                                  # TypeScript type definitions
│   └── index.ts                            # Shared types (Lead, ToolConfig, etc.)
│
├── public/                                 # Static assets
│   └── images/                             # Screenshots, icons, static images
│
├── .env.local                              # Environment variables (API keys, Supabase URL)
├── next.config.js                          # Next.js configuration
├── tailwind.config.ts                      # Tailwind CSS configuration (shared)
├── tsconfig.json                           # TypeScript configuration
├── package.json                            # Dependencies and scripts
└── .gitignore                              # Git ignore rules
```

### Component Organization (Planned)

The SDS specifies a flat component structure (no nested subdirectories). Components reference each other at the same level:

```
components/
├── Layout.tsx          # → imported by app/layout.tsx
├── PlaygroundDemo.tsx  # → imported by app/playground/page.tsx
│                        # → calls /api/ai/openai and /api/ai/gemini
│                        # → handles Loading, Success, Error states
└── LeadCaptureForm.tsx # → imported by PlaygroundDemo.tsx (conditional render)
                         # → POSTs to Supabase playground_leads table
```

### Where to Add New Code

**New page/route:**
- Primary code: `app/{route-name}/page.tsx`
- Layout wrapper (shared): already in `app/layout.tsx`

**New component:**
- Implementation: `components/{ComponentName}.tsx`
- Tests: `__tests__/{ComponentName}.test.tsx` (or co-located `{ComponentName}.test.tsx` — pattern TBD)

**New API route:**
- Implementation: `app/api/{path}/route.ts`
- Follows Next.js App Router `export async function GET/POST/PUT/DELETE` pattern

**New utility/shared helper:**
- Shared helpers: `lib/{utility-name}.ts`

**New type definition:**
- Shared types: `types/index.ts`

**Design tokens (if migrating from hardcoded Tailwind config):**
- Extend `tailwind.config.ts` with colors, spacing, fonts from the chosen design system
- Do NOT duplicate config per page — the whole point of the Next.js migration is shared configuration

---

*Structure analysis: 2026-04-30*
