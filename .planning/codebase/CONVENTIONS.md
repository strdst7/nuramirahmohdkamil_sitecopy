# Code Conventions

**Analysis Date:** 2026-04-30

---

## Current Prototype Patterns

### HTML Document Structure

All four pages are **fully self-contained, standalone HTML documents**. Each file lives in its own subdirectory and contains a complete `<html>`, `<head>`, and `<body>`. There is no shared code, no partials, no includes, and no build pipeline.

**Page files:**

| Page | File |
|------|------|
| Home | `home_the_persistence_of_intelligence/code.html` (197 lines) |
| Insights | `insights_ethereal_inquiries/code.html` (216 lines) |
| Portfolio | `portfolio_archive_of_dreams/code.html` (242 lines) |
| Playground | `playground_alchemist_s_terminal/code.html` (290 lines) |

**Consistent structure pattern across all pages:**

```html
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>{Page Title}</title>
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <!-- Google Fonts (Epilogue, Newsreader, Space Grotesk) -->
  <!-- Material Symbols Outlined (icon font) -->
  <!-- Inline tailwind.config script -->
  <!-- Inline <style> for material-symbols-outlined + page-specific CSS -->
</head>
<body class="bg-background text-on-background {additional body classes}">
  <!-- Ambient Background element(s) -->
  <!-- <header> TopAppBar -->
  <!-- <main> Content Canvas -->
  <!-- <nav> BottomNavBar (mobile) -->
  <!-- <footer> -->
</body>
</html>
```

**Key structural rules observed:**
- `<html class="dark">` on all pages — dark mode set at root via class-based toggle
- `lang="en"` consistently applied
- `<meta charset="utf-8"/>` and `viewport` meta tag on all pages
- Page title in `<title>` varies per page, never includes site name as suffix/prefix
- Every page is exactly one `<body>` with no fragmentation

---

### Tailwind Configuration Pattern

Every page re-defines the **entire** Tailwind configuration in an inline `<script id="tailwind-config">` block. The configuration is 47 lines of custom color tokens, spacing, border-radius, font families, and font sizes lifted directly from the `surrealist_echoes/DESIGN.md` design system specification.

**Pattern location:** Each `code.html`, lines ~11–94

```html
<script id="tailwind-config">
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: { /* 47 custom color tokens */ },
                borderRadius: { /* DEFAULT, lg, xl, full */ },
                spacing: { /* horizon, meridian, fluid-gap, drip */ },
                fontFamily: { /* body-lg, headline-lg, body-md, label-sm, headline-md */ },
                fontSize: { /* body-lg, headline-lg, body-md, label-sm, headline-md */ }
            }
        }
    }
</script>
```

**Configuration design philosophy:**
- **Colors** follow Material 3 semantic naming: `primary`, `on-primary`, `primary-container`, `on-primary-container`, `surface`, `on-surface`, `surface-variant`, etc. All 47 color codes come from `surrealist_echoes/DESIGN.md` (lines 3–48). The palette is a warm amber/gold desert sunset theme against deep umber backgrounds.
- **Spacing tokens** use poetic names: `horizon` (4rem), `meridian` (1.5rem), `fluid-gap` (2.5rem), `drip` (0.75rem). These map to the asymmetric layout philosophy from `surrealist_echoes/DESIGN.md` lines 118–125.
- **Font sizes** bundle `fontSize`, `lineHeight`, `letterSpacing`, and `fontWeight` into single Tailwind tokens — e.g., `text-headline-lg` sets 48px/1.1/-0.04em/200 all at once.
- **Border radii** are restrained (`0.25rem` to `0.75rem`) — organic shapes are achieved through arbitrary values like `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]` rather than config tokens.

**Tailwind CDN plugins:** `forms` and `container-queries` are loaded on all four pages via the CDN `?plugins=` query parameter.

---

### Styling Conventions

**Arbitrary value patterns (Tailwind JIT):**

Organic "melt" shapes use multi-corner `border-radius`:
```
rounded-[40%_60%_70%_30%/40%_50%_60%_50%]   <!-- blob shape -->
rounded-[4rem_2rem_5rem_3rem]                 <!-- warped card -->
rounded-[2rem_1.5rem_2.5rem_1rem]             <!-- asymmetric button -->
rounded-[50%_40%_30%_60%/40%_50%_60%_50%]    <!-- melting card -->
```

"Melting shadows" use extremely asymmetric box-shadows:
```
shadow-[40px_10px_60px_rgba(0,0,0,0.5)]    <!-- 40px right, 10px down, 60px blur -->
shadow-[20px_40px_80px_rgba(0,0,0,0.8)]    <!-- medium elongation -->
shadow-[30px_50px_80px_rgba(0,0,0,0.6)]    <!-- variant shadow -->
shadow-[50px_40px_100px_rgba(0,0,0,0.5)]   <!-- extreme elongation -->
```

Text shadows for brand/headings:
```
drop-shadow-[0_10px_20px_rgba(232,168,56,0.3)]   <!-- amber brand glow -->
drop-shadow-[0_20px_40px_rgba(255,198,107,0.2)]  <!-- primary text glow -->
drop-shadow-[0_5px_15px_rgba(255,198,107,0.2)]   <!-- subtitle glow -->
```

**Custom CSS classes (defined in `<style>` tags):**

Three pages define reusable CSS classes:

- `home_the_persistence_of_intelligence/code.html` (line 96): Only `.material-symbols-outlined` with `FILL 0, wght 400`
- `portfolio_archive_of_dreams/code.html` (lines 100–118): `.material-symbols-outlined` (FILL 0, wght 300), `.symbol-fill` (FILL 1), `.ambient-glow` (fixed radial gradient)
- `playground_alchemist_s_terminal/code.html` (lines 96–125): `.material-symbols-outlined` (FILL 0, wght 200), `.symbol-filled` (FILL 1), `.melting-shadow`, `.glass-panel`, `.organic-shape`, `.drip-border`, `body` background

**Glassmorphism pattern** (used across all pages):
```
backdrop-blur-xl or backdrop-blur-3xl
bg-{surface}-container/40 or bg-black/20
border border-outline/10 or border-{color}/20
```

**Ambient background approach** varies:
- Home: Fixed `radial-gradient` with `mix-blend-screen` and `blur-3xl`
- Insights: Two absolute-positioned `<div>` elements with `rounded-full blur-[120px]` and `blur-[150px]`, one with `mix-blend-screen`
- Portfolio: Custom `.ambient-glow` class (CSS-defined radial gradient at center)
- Playground: CSS `body { background-image: radial-gradient(...) }` + inline `bg-[radial-gradient(...)]` elements

**Hover interactions:**
- Text: `hover:opacity-70` with `transition-opacity duration-700`
- Cards: `hover:scale-[1.02]` with `transition-transform duration-1000 ease-out`
- Nav items: `hover:scale-110 hover:-translate-y-2` with `transition-all duration-500 ease-in-out`
- Buttons: `hover:scale-105` with `transition-all duration-500`
- Images: `group-hover:scale-110` with `transition-transform duration-[2s]` (very slow)

**Use of CSS filters:**
- `mix-blend-luminosity` — applied to all images to tint them with background
- `mix-blend-screen` — used on ambient glow elements
- `blur`, `blur-sm`, `blur-xl`, `blur-3xl`, `blur-[120px]`, `blur-[150px]` — depth and atmosphere
- `filter hue-rotate-15`, `filter sepia-[0.5]`, `filter contrast-125 saturate-50` — image color grading

---

### Typography & Font Loading

**Font families (from `surrealist_echoes/DESIGN.md` lines 51–78):**

| Token | Family | Weight | Size | Role |
|-------|--------|--------|------|------|
| `headline-lg` | Epilogue | 200 | 48px | Page titles, hero headings |
| `headline-md` | Epilogue | 300 | 32px | Section headings, card titles |
| `body-lg` | Newsreader | 400 | 20px | Subtitle, intro text, pull quotes |
| `body-md` | Newsreader | 400 | 16px | Body copy, descriptions |
| `label-sm` | Space Grotesk | 500 | 12px | Labels, nav text, badges, uppercase metadata |

**Font loading approach (Google Fonts CDN):**

Three patterns observed across pages:

1. **Home page** (`home_the_persistence_of_intelligence/code.html` lines 6–8): Uses `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`, loads all three families in a single `css2` URL with full range specifiers, then loads Material Symbols separately.

2. **Portfolio page** (`portfolio_archive_of_dreams/code.html` lines 8–13): Same preconnect pattern as home. Clean structure with comments separating font blocks.

3. **Insights & Playground** (`insights_ethereal_inquiries/code.html` lines 8–10, `playground_alchemist_s_terminal/code.html` line 8): No preconnect hints. Different font weight range specifiers. Font load order differs (Playground: Epilogue with explicit weights instead of `0,100..900`).

**Font class mapping:**

Pages use the custom Tailwind tokens directly: `font-headline-lg`, `text-headline-lg`, `font-body-lg`, `text-body-lg`, `font-body-md`, `text-body-md`, `font-label-sm`, `text-label-sm`, `font-headline-md`, `text-headline-md`. However, several pages also reference `font-epilogue` as a direct CSS class (e.g., nav labels and footer text), which is NOT defined in the Tailwind config. The Insights page explicitly adds a fallback rule:

```css
.font-epilogue { font-family: 'Epilogue', sans-serif; }
```
(`insights_ethereal_inquiries/code.html` line 97)

Other pages use `font-epilogue` without defining it, relying on the global stylesheet.

**Material Symbols Outlined (icon font):**
- Loaded via Google Fonts CDN `Material+Symbols+Outlined` with variable weight and FILL axes
- Used extensively for all icons (never inline SVGs)
- Font-variation-settings differ per page:
  - Home: `FILL 0, wght 400, GRAD 0, opsz 24` (via CSS class)
  - Insights: `FILL 0` inline on individual elements, plus `FILL 1` on selected icons
  - Portfolio: `FILL 0, wght 300, GRAD 0, opsz 24` (default) and `.symbol-fill` for `FILL 1`
  - Playground: `FILL 0, wght 200, GRAD 0, opsz 24` (default) and `.symbol-filled` for `FILL 1`
- **Bug**: Home page loads Material Symbols stylesheet twice (`code.html` lines 9–10), identical URLs

---

### Image & Asset Patterns

**Image source:** All images are hosted on Google's `lh3.googleusercontent.com/aida-public/` CDN. No local image assets exist in the repository.

**Image attributes:**
- `data-alt` attribute used on every `<img>` element with rich descriptive text (surrealist scene descriptions). This is a **non-standard** attribute — `alt` should be used for accessibility.
- Actual `alt` attributes are often empty strings (`alt=""`) or omitted entirely, making images invisible to screen readers.
- `src` URLs are very long base64-encoded paths (~300+ characters)

**Image styling conventions:**
```
class="w-full h-full object-cover opacity-70 mix-blend-luminosity
       group-hover:mix-blend-normal group-hover:opacity-100
       group-hover:scale-110 transition-all duration-[2000ms] ease-out"
```

Images are:
- Always `object-cover` to fill their warped containers
- Tinted via `mix-blend-luminosity` + `opacity-{60,70,80}`
- Revealed on parent hover via `group-hover:mix-blend-normal group-hover:opacity-100`
- Slowly zoomed on hover (`group-hover:scale-110 transition-transform duration-[2s]`)
- Optionally color-graded with `filter sepia-[0.5]`, `hue-rotate-[-30deg]`, `contrast-125`, `saturate-50`

**Decorative image containers:**
- Images sit inside warped `rounded-[...]` containers
- Often layered with a gradient overlay for depth
- Shadow effects use `shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]` for inner depth

---

### Semantic HTML & Accessibility

**Semantic elements used (positive):**
- `<header>` — TopAppBar on all pages
- `<main>` — content wrapper on all pages
- `<nav>` — BottomNavBar (mobile) on all pages; desktop nav links on Insights and Playground
- `<footer>` — bottom section on all pages
- `<section>` — major content blocks (hero, gallery, playground)
- `<article>` — individual cards/items (portfolio projects, insights journal entries)
- `<figure>` / `<figcaption>` — image with caption (Insights page)
- `<aside>` — sidebar panels (Playground page)
- `<h1>` through `<h4>` — hierarchical headings
- `<ul>` / `<li>` — list items (Insights page)
- `<button>` — interactive controls
- `<label>` — form labels (Playground page)
- `<textarea>`, `<input type="range">` — form controls (Playground page)

**Accessibility gaps:**
- **Missing `alt` text**: Images use `data-alt` (non-standard) instead of `alt=""` or descriptive `alt`. This makes all images invisible to screen readers.
  - `home`: `data-alt="abstract desert dunes..."` but `alt` is absent from the CSS background div
  - `portfolio`: `alt="Abstract digital artwork showing..."` on one image, `alt="Surreal minimalist composition..."` on another — these are the only images with real `alt` text
  - `insights`: `data-alt` present, `alt` absent
  - `playground`: `alt="Surreal Anatomy"` on one image
- **Missing `aria-label`**: Only `portfolio_archive_of_dreams/code.html` (lines 129, 132) has `aria-label="vibration"` and `aria-label="unfold_more"` on header buttons. All other pages omit ARIA labels on buttons.
- **Keyboard navigation**: Buttons lack `type` attributes. Icon buttons (`material-symbols-outlined`) are inside `<button>` elements but some are bare `<span>` elements with `cursor-pointer` — not focusable.
- **Dead links**: All navigation `<a href="#">` links point to `#`, making them unusable for navigation. No actual page linking exists.
- **No skip-to-content link**
- **No focus indicators** beyond browser defaults
- **Form inputs lack `name` attributes** in Playground page

**What works well for accessibility:**
- `lang="en"` on `<html>` consistently
- Semantic heading hierarchy (`h1` → `h2` → `h3` → `h4`)
- `selection:bg-primary selection:text-on-primary` for custom text selection colors
- Clear visual hierarchy via heading tokens

---

### Navigation Patterns

**Desktop navigation:**
- `<header>` element, positioned `absolute` or `fixed`
- "DREAM_VOID" brand text (or "NUR_AMIRAH_MOHD_KAMIL" on home page only) — `text-2xl font-black italic text-amber-500`
- Navigation links: Gallery, Archives, Atelier, Liminal (consistent labels)
- Two icon buttons: `vibration` and `unfold_more` (purpose unclear — likely decorative)
- Home page: `hidden md:flex` — desktop nav hidden on home (no desktop nav links), only icon buttons visible
- Playground page: `hidden md:flex` for nav, but nav links use `font-epilogue` instead of the Tailwind token system

**Mobile navigation (BottomNavBar):**
- `<nav>` element, `fixed bottom-8 left-1/2 -translate-x-1/2`
- Glassmorphic pill: `backdrop-blur-3xl rounded-[60px] border border-amber-900/20`
- Four tab items: Gallery, Archives, Atelier, Liminal
- Active tab: `bg-amber-500/10 text-amber-400 scale-110 drop-shadow-[...]`
- Inactive tabs: `text-amber-900 dark:text-amber-700`
- Label text: `font-epilogue text-[10px] font-medium tracking-widest`
- Home page: `md:hidden` (mobile only)
- Portfolio page: Always visible (no `md:hidden` — shows on all viewports)
- Insights page: `md:hidden` (mobile only)
- Playground page: `md:hidden` (mobile only)

**Active section indication varies per page:**
- Home: "Atelier" is the highlighted tab
- Insights: "Archives" highlighted, uses `blur-sm` on active tab instead of `drop-shadow`
- Portfolio: "Archives" highlighted
- Playground: "Atelier" highlighted

**Footer:**
- Gradient: `bg-gradient-to-t from-amber-950/40 to-transparent`
- Brand text: "DREAM_VOID" and "© 2024 THE PERSISTENCE OF MEMORY"
- Footer links: The Abyss, Unconscious, Echoes (all `href="#"`)
- Styling: `font-epilogue text-xs italic font-light tracking-tighter`
- Home footer includes "DREAM_VOID" in `font-bold`; Playground footer omits it and uses raw text

---

## Planned Production Conventions

_From `SOFTWARE_DESIGN_SPECIFICATION.md` — the architecture planned for the Next.js production build._

### Technology Stack

| Layer | Technology | Version/Spec |
|-------|-----------|--------------|
| Framework | Next.js (App Router) | Latest stable |
| Language | TypeScript | Strict mode implied |
| Styling | Tailwind CSS | Build-time (not CDN) |
| Hosting | Vercel | Serverless + Edge Functions |
| Backend | Next.js API Routes | Serverless functions |
| Database | Supabase | PostgreSQL |
| AI APIs | OpenAI + Gemini | Via backend proxies |

### TypeScript

The specification does not explicitly state TypeScript, but Next.js App Router convention strongly presumes it. Convention: `.ts` for logic, `.tsx` for components. Strict typing for API request/response bodies, database models, and component props.

### Component Patterns (Next.js App Router)

**File structure implied by `SOFTWARE_DESIGN_SPECIFICATION.md`:**

```
app/
├── layout.tsx              # Global grid background, TopAppBar, Footer
├── page.tsx                # Home page
├── insights/
│   └── page.tsx
├── portfolio/
│   └── page.tsx
├── playground/
│   └── page.tsx
├── api/
│   └── ai/
│       ├── openai/
│       │   └── route.ts    # POST handler
│       └── gemini/
│           └── route.ts    # POST handler
components/
├── PlaygroundDemo.tsx       # Interactive AI playground wrapper
├── LeadCaptureForm.tsx      # Reusable form → Supabase
└── {other components}
lib/
├── supabase.ts              # Supabase client init
└── ai-router.ts             # AI API routing/fallback logic
```

**Naming conventions implied:**
- Components: `PascalCase.tsx` (e.g., `PlaygroundDemo.tsx`, `LeadCaptureForm.tsx`)
- Route handlers: `route.ts` (Next.js App Router convention)
- Pages: `page.tsx` per route segment
- Layouts: `layout.tsx`
- Utilities: `kebab-case.ts` or `camelCase.ts`

**Component responsibilities (from SDD):**
- `Layout.tsx`: Global grid background, top navigation bar, footer with LinkedIn/Email links
- `PlaygroundDemo.tsx`: Interactive wrapper for 7 AI tools — manages API state (Loading, Success, Error)
- `LeadCaptureForm.tsx`: Minimalist form — POSTs to Supabase to save user intent

### API Route Patterns

**Endpoints:**
- `POST /api/ai/openai` — Text generation, data structuring, logic
- `POST /api/ai/gemini` — Multimodal tasks, fast text reasoning

**Security pattern:** Frontend never calls external AI APIs directly. All requests proxy through Next.js API routes to keep API keys server-side.

**Fallback/routing:** A utility routes requests to the faster or cheaper AI API based on tool context.

### Database Schema

**Table: `playground_leads`** (Supabase/PostgreSQL)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary Key |
| `project_name` | String | e.g., "Experiment 04: Document Analyzer" |
| `email` | String (Nullable) | User's email |
| `whatsapp` | String (Nullable) | User's WhatsApp number |
| `intent` | Enum | 'white-label', 'update-notification', 'beta-access' |
| `created_at` | Timestamp | Auto-generated |

### CSS Strategy (Tailwind Build-Time)

The current CDN approach should migrate to build-time Tailwind via `tailwind.config.ts`:
- The 47 custom color tokens should live in `tailwind.config.ts`, not duplicated inline
- Custom spacing, font sizes, and border radii centralized
- CSS custom properties can be defined in `globals.css` for the material symbols font-variation-settings
- Custom utility classes (`.glass-panel`, `.organic-shape`, `.melting-shadow`) can become Tailwind `@layer components` or extracted as reusable React components

---

## Key Observations

### Duplication Patterns

1. **Tailwind config duplication (critical):** The 84-line `tailwind.config` block is copy-pasted identically across all 4 HTML files with only minor formatting differences (quote styles). Any design system change requires editing 4 files.

2. **BottomNavBar duplication:** The mobile navigation bar is structurally identical across all 4 pages (same 4 tab labels, same glassmorphic pill style) with only the active-tab highlight position changing. ~35 lines duplicated per page.

3. **Footer duplication:** The footer structure (3 footer links + copyright) is identical but with formatting variations — sometimes wrapped in `<span>`, sometimes raw text. ~12 lines duplicated.

4. **Material Symbols font-variation-settings:** Each page defines slightly different default values (wght 400/300/200, FILL 0), leading to inconsistent icon weight and fill across pages.

5. **Color palette duplication:** 47 color hex values duplicated across all pages. The source of truth (`surrealist_echoes/DESIGN.md`) is a YAML frontmatter block, not consumed by any build tool.

### Inconsistencies

1. **Brand text:** Home page uses "NUR_AMIRAH_MOHD_KAMIL" in the header, all other pages use "DREAM_VOID". Home footer also uses "DREAM_VOID" — brand identity is split.

2. **Font loading:** Home/Portfolio use `preconnect` hints; Insights/Playground don't. Home loads Material Symbols stylesheet twice (duplicate `<link>`). Playground uses different Google Fonts weight specifiers than other pages.

3. **Header styling:** Home `header` has `hidden md:flex` (hidden on mobile); other pages show header at all breakpoints. Home header uses `hover:blur-sm` transition; other headers don't.

4. **Active nav tab style:** Portfolio uses `.symbol-fill` for the active tab's icon; Insights uses inline `FILL 1`; Playground uses a different class name `.symbol-filled` and no FILL on the active tab; Home doesn't set a fill variant.

5. **Body background:** Playground defines `body { background-image: radial-gradient(...) }` in CSS; other pages rely on ambient `<div>` elements for background effects.

6. **`font-epilogue` usage:** This CSS class is not part of the Tailwind config. Insights page defines a fallback CSS rule for it. Other pages use it without definition. The Tailwind config uses semantic tokens like `font-headline-lg`, `font-body-lg`, `font-label-sm`, yet `font-epilogue` is used directly in nav labels and footer links.

7. **Page-specific CSS class naming:** Portfolio uses `.symbol-fill`; Playground uses `.symbol-filled` for the same purpose. Playground has `.glass-panel`, `.organic-shape`, `.melting-shadow`, `.drip-border` only on that page — these patterns appear on other pages as inline Tailwind classes.

8. **Desktop navigation:** Home has no desktop nav links (only icon buttons); Insights has nav links using Tailwind font tokens; Playground has nav links using `font-epilogue` directly. Portfolio has no desktop nav at all — just branding and icon buttons.

9. **Viewport responsiveness:** Portfolio's BottomNavBar is always visible (no `md:hidden`). All other pages show it only on mobile. Portfolio's main is `min-h-[2048px]` (fixed height) vs. other pages using content-driven height.

10. **Material Symbols icon variant control:** Home uses a unified CSS class for FILL/wght/GRAD/opsz. Insights uses inline `style="font-variation-settings: 'FILL' 0;"` on individual elements. Portfolio uses CSS classes. Playground uses CSS classes with different names. No consistent approach.

11. **Self-closing vs. paired tags:** Portfolio and Insights use `<meta charset="utf-8"/>` (self-closing). Home uses `<meta charset="utf-8">` (HTML5 style). Inconsistent within single files too.

12. **Custom color token quoting:** Home and Insights use unquoted color keys in the config object. Portfolio and Playground use quoted keys (`"colors"` vs `colors`). All are valid JS but the style differs.

---

*Convention analysis: 2026-04-30*
