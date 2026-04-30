# Phase 1: Foundation — UI Design Contract

**Created:** 30 April 2026
**Design System:** Surrealist Echoes (canonical)
**Source:** `surrealist_echoes/DESIGN.md`

---

## 1. Layout & Spacing

### Grid & Background
- **Backdrop:** Full-viewport `radial-gradient(circle at 50% 0%, #2e2a18 0%, #110e02 100%)` on `<body>`
- **No rigid grid** — Surrealist Echoes rejects Blueprint grids in favor of asymmetric fluid flow
- **Variable margins:** Left and right margins are intentionally unequal (e.g., `pl-horizon pr-meridian`), creating a sense of leaning/drifting

### Header (TopAppBar)
- **Position:** Fixed top, full-width
- **Content:** Logo text "NUR_AMIRAH_MOHD_KAMIL" (left-aligned) + desktop nav links (right-aligned)
- **Background:** Semi-transparent surface with `backdrop-blur`, border-bottom `1px outline-variant/20`
- **Logo:** `font-headline-lg` (Epilogue, 48px, weight 200, -0.04em tracking), amber glow `drop-shadow(0 10px 20px rgba(232,168,56,0.3))`
- **Nav links:** `font-label-sm` (Space Grotesk, 12px, weight 500, 0.1em tracking), `text-on-surface-variant`

### Bottom Navigation Dock (Mobile)
- **Position:** Fixed bottom, centered, pill-shaped
- **Background:** Glassmorphism — `bg-surface/40 backdrop-blur-xl`
- **Border:** `1px outline-variant/30 rounded-full`
- **Padding:** `px-fluid-gap py-drip`
- **Tabs:** 5 — Home, Insights, Playground, Portfolio, Design
- **Icons:** Material Symbols Outlined, `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`
- **Active tab:** `text-primary`, amber glow drop-shadow; inactive: `text-on-surface-variant/50`
- **Labels:** `font-label-sm` (Space Grotesk, 12px, 0.1em tracking) below icons

### Footer
- **Position:** Below main content, full-width
- **Content:** Copyright line + LinkedIn/Email links
- **Typography:** `text-body-md text-on-surface-variant/60`
- **Background:** Fades into body background gradient

### Responsive Breakpoints
- **Mobile (< 768px):** Single column, bottom nav dock visible, header hamburger or logo-only
- **Tablet (768px - 1024px):** Header shows desktop nav, bottom dock hidden
- **Desktop (> 1024px):** Asymmetric fluid layout, header full nav, footer visible

---

## 2. Colors

All 47 Material Design 3 semantic tokens from `surrealist_echoes/DESIGN.md` lines 3-48:

| Token Group | Key Tokens | Values |
|-------------|-----------|--------|
| **Background** | `background`, `surface`, `surface-dim` | `#171305` |
| **Surface Containers** | `surface-container-lowest` → `surface-container-highest` | `#110e02` → `#393522` |
| **Primary (Sunset Gold)** | `primary`, `primary-container`, `on-primary`, `on-primary-container` | `#ffc66b`, `#e8a838`, `#432c00`, `#5f3f00` |
| **Secondary (Ethereal Blue)** | `secondary`, `secondary-container`, `on-secondary` | `#a4c9ff`, `#0164b4`, `#00315d` |
| **Tertiary (Desert Shadow)** | `tertiary`, `tertiary-container`, `on-tertiary` | `#eac9b4`, `#cdae9a`, `#402c1e` |
| **Text** | `on-surface`, `on-surface-variant`, `on-background` | `#ebe2c8`, `#d5c4af`, `#ebe2c8` |
| **Outlines** | `outline`, `outline-variant` | `#9d8e7c`, `#504535` |
| **Error** | `error`, `error-container` | `#ffb4ab`, `#93000a` |

**Gradient rule:** Non-linear "bruised" gradients — blend gold into deep shadows with unexpected violet/ochre mid-tones.

---

## 3. Typography

Self-hosted via `next/font/google`. All text uses Surrealist Echoes typography scale:

| Token | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| `headline-lg` | Epilogue | 48px | 200 | 1.1 | -0.04em | Hero text, page titles |
| `headline-md` | Epilogue | 32px | 300 | 1.2 | 0 | Section headers |
| `body-lg` | Newsreader | 20px | 400 | 1.6 | 0 | Lead paragraphs, key descriptions |
| `body-md` | Newsreader | 16px | 400 | 1.6 | 0 | Body text, journal entries |
| `label-sm` | Space Grotesk | 12px | 500 | 1.0 | 0.1em | Nav labels, button text, micro-copy |

**Color application:**
- Headlines: `text-on-background` with amber glow drop-shadow
- Body text: `text-on-surface` for primary, `text-on-surface-variant` for secondary
- Labels: `text-on-surface-variant` (normal), `text-primary` (active)

---

## 4. Components

### GlassPanel
```
bg-surface/40 backdrop-blur-xl border border-outline-variant/20 rounded-lg p-fluid-gap
```
- Semi-transparent amber-tinted glass surface
- Used for: overlays, info cards, nav dock
- Box shadow: `0 8px 32px rgba(0,0,0,0.3)`

### OrganicCard
```
rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-surface-container p-fluid-gap
```
- Irregular blob-shaped container
- Applied melting shadow: `shadow-[20px_40px_80px_rgba(0,0,0,0.8)]`
- Used for: project cards, insight summaries
- Content loosely aligned within — floats in organic container

### DripBorder (Input)
```
border-0 border-b border-outline-variant/40 bg-transparent pb-2
focus:border-b-primary focus:outline-none transition-all
```
- Single bottom border, no four-wall box
- Border undulates/fades on focus
- Used for: all text inputs, form fields

### PulseButton (CTA)
```
rounded-[2rem_1.5rem_2.5rem_1rem] bg-primary text-on-primary px-horizon py-meridian font-label-sm
hover:scale-105 transition-transform
```
- Ellipsoid, slightly irregular shape
- Sunset Gold background, amber glow on hover
- Inflates 5% on hover (scale: 1.05), not just color change
- Used for: primary CTAs, call-to-action buttons

### MeltingShadow (Utility)
```
shadow-[40px_10px_60px_rgba(0,0,0,0.5)]  ← default
shadow-[20px_40px_80px_rgba(0,0,0,0.8)]  ← medium
shadow-[50px_40px_100px_rgba(0,0,0,0.5)] ← extreme
```
- Extreme-angle box shadows, cast low-right like a desert sun
- Shadows are elongated, not uniform
- Apply to: cards, panels, interactive elements

---

## 5. Icons

### Material Symbols Outlined
- **Font:** Material Symbols Outlined, variable (wght 100-700, FILL 0-1)
- **Default settings:** `FILL: 0, wght: 400, GRAD: 0, opsz: 24`
- **Size:** `text-[24px]` default, `text-[20px]` in nav dock
- **Color:** `text-on-surface-variant` default, `text-primary` when active/interactive
- **Bundle:** Self-host woff2, no CDN dependency

### Icon `<Icon>` Component Interface
```tsx
<Icon name="vibration" size?: 20 | 24 | 32 fill?: 0 | 1 weight?: 100..700 />
```

### Icon Set Used
`vibration`, `unfold_more`, `category`, `auto_stories`, `palette`, `blur_on`, `memory`, `visibility`, `science`, `pest_control`, `hourglass_empty`, `water_drop`, `all_inclusive`, `bubble_chart`, `east`, `hive`, `psychology`, `flare`, `thermostat`, `filter_vintage`, `blur_circular`

---

## 6. Copywriting

None — Phase 1 is structural only. Page content (hero copy, journal entries, project descriptions) belongs to Phase 2 (Content Pages).

---

## Design Contract Summary

| Dimension | Status | Notes |
|-----------|--------|-------|
| Layout | ✓ | Fluid asymmetric flow, fixed header + bottom nav dock, radial gradient backdrop |
| Colors | ✓ | All 47 MD3 tokens from Surrealist Echoes, dark-only, bruised gradients |
| Typography | ✓ | Epilogue/Newsreader/Space Grotesk, self-hosted, exact scale from spec |
| Components | ✓ | 5 components with exact Tailwind classes, hover behaviors, shadow specs |
| Icons | ✓ | Material Symbols bundled locally, `<Icon>` component wrapper |
| Copywriting | N/A | Deferred to Phase 2 |

---
*UI-SPEC created: 30 April 2026*
*Design system: Surrealist Echoes (surrealist_echoes/DESIGN.md)*
