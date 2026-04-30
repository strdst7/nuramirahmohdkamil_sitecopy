---
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - tailwind.config.ts
  - postcss.config.mjs
  - src/app/globals.css
  - src/app/layout.tsx
  - src/components/Icon.tsx
  - src/components/GlassPanel.tsx
  - src/components/OrganicCard.tsx
  - src/components/DripBorder.tsx
  - src/components/PulseButton.tsx
  - src/components/MeltingShadow.tsx
  - src/app/page.tsx
  - src/app/insights/page.tsx
  - src/app/playground/page.tsx
  - src/app/portfolio/page.tsx
  - src/app/surrealist-echoes/page.tsx
autonomous: true
phase: "01-foundation"
requirements:
  - PAGE-01
  - DSGN-01
  - DSGN-02
  - DSGN-03
  - INFR-01
---

# Plan 01: Foundation — Project Scaffold, Design System & Layout

## Objective
Scaffold the Next.js App Router project with TypeScript, extract the Surrealist Echoes design system into build-time Tailwind config, self-host typography, create shared layout with global navigation, build the 5 surrealist component library, and stub all 5 page routes.

## Dependencies
- None (greenfield scaffold — no prior code to integrate with, though HTML prototypes exist as visual reference)

---

## Tasks

### 1. Scaffold Next.js Project

<task>
<objective>Initialize Next.js App Router project with TypeScript and Tailwind</objective>

<read_first>
- `surrealist_echoes/DESIGN.md` — Design tokens to port
- `.planning/phases/01-foundation/01-CONTEXT.md` — Implementation decisions
- `.planning/codebase/CONCERNS.md` — Known issues to avoid (CDN deps, duplication)
</read_first>

<action>
Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack`

This creates:
- `src/app/layout.tsx` — Root layout
- `src/app/page.tsx` — Home page
- `src/app/globals.css` — Global styles with `@tailwind base/components/utilities`
- `tailwind.config.ts` — Tailwind configuration
- `tsconfig.json` — TypeScript config with `@/*` path alias
- `postcss.config.mjs` — PostCSS with Tailwind plugin
- `next.config.ts` — Next.js configuration
- `package.json` — Dependencies

Wipe the default `page.tsx` and `globals.css` content — replace with Surrealist Echoes content in subsequent tasks.
</action>

<acceptance_criteria>
- `package.json` exists with `next`, `react`, `react-dom`, `typescript`, `tailwindcss` dependencies
- `npx next dev` starts on `localhost:3000` without errors
- `src/app/layout.tsx` exists with default export
- `tailwind.config.ts` exists with valid `satisfies Config` type
</acceptance_criteria>
</task>

### 2. Extract Surrealist Echoes Design Tokens into tailwind.config.ts

<task>
<objective>Map all 47 MD3 color tokens, spacing, border-radius, typography from surrealist_echoes/DESIGN.md into tailwind.config.ts</objective>

<read_first>
- `surrealist_echoes/DESIGN.md` lines 3-91 — Complete design token specification
- `tailwind.config.ts` — Current scaffolded config
- `playground_alchemist_s_terminal/code.html` lines 11-94 — Reference inline config pattern
</read_first>

<action>
Replace `tailwind.config.ts` content with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#171305",
        "surface-dim": "#171305",
        surface: "#171305",
        "surface-bright": "#3e3926",
        "surface-container-lowest": "#110e02",
        "surface-container-low": "#1f1c0b",
        "surface-container": "#23200f",
        "surface-container-high": "#2e2a18",
        "surface-container-highest": "#393522",
        "on-surface": "#ebe2c8",
        "on-surface-variant": "#d5c4af",
        "inverse-surface": "#ebe2c8",
        "inverse-on-surface": "#35301e",
        outline: "#9d8e7c",
        "outline-variant": "#504535",
        "surface-tint": "#fdba49",
        primary: "#ffc66b",
        "on-primary": "#432c00",
        "primary-container": "#e8a838",
        "on-primary-container": "#5f3f00",
        "inverse-primary": "#805600",
        secondary: "#a4c9ff",
        "on-secondary": "#00315d",
        "secondary-container": "#0164b4",
        "on-secondary-container": "#d0e1ff",
        tertiary: "#eac9b4",
        "on-tertiary": "#402c1e",
        "tertiary-container": "#cdae9a",
        "on-tertiary-container": "#584132",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        "primary-fixed": "#ffddaf",
        "primary-fixed-dim": "#fdba49",
        "on-primary-fixed": "#281800",
        "on-primary-fixed-variant": "#614000",
        "secondary-fixed": "#d4e3ff",
        "secondary-fixed-dim": "#a4c9ff",
        "on-secondary-fixed": "#001c39",
        "on-secondary-fixed-variant": "#004883",
        "tertiary-fixed": "#fedcc7",
        "tertiary-fixed-dim": "#e1c0ac",
        "on-tertiary-fixed": "#29180b",
        "on-tertiary-fixed-variant": "#594233",
        "on-background": "#ebe2c8",
        "surface-variant": "#393522",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        meridian: "1.5rem",
        horizon: "4rem",
        "fluid-gap": "2.5rem",
        drip: "0.75rem",
      },
      fontFamily: {
        "headline-lg": ['var(--font-epilogue)', 'sans-serif'],
        "headline-md": ['var(--font-epilogue)', 'sans-serif'],
        "body-lg": ['var(--font-newsreader)', 'serif'],
        "body-md": ['var(--font-newsreader)', 'serif'],
        "label-sm": ['var(--font-space-grotesk)', 'sans-serif'],
      },
      fontSize: {
        "headline-lg": ["48px", { lineHeight: "1.1", fontWeight: "200", letterSpacing: "-0.04em" }],
        "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "300" }],
        "body-lg": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.0", fontWeight: "500", letterSpacing: "0.1em" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
```

Install Tailwind plugins: `npm install @tailwindcss/forms @tailwindcss/container-queries`
</action>

<acceptance_criteria>
- `tailwind.config.ts` contains `darkMode: "class"` at top level
- `tailwind.config.ts` contains all 47 color tokens under `theme.extend.colors`
- `tailwind.config.ts` has `borderRadius` with keys: `sm`, `DEFAULT`, `md`, `lg`, `xl`, `full`
- `tailwind.config.ts` has `spacing` with keys: `meridian`, `horizon`, `fluid-gap`, `drip`
- `tailwind.config.ts` has `fontFamily` with keys: `headline-lg`, `headline-md`, `body-lg`, `body-md`, `label-sm`
- `tailwind.config.ts` has `fontSize` with keys: `headline-lg`, `headline-md`, `body-lg`, `body-md`, `label-sm`
- `package.json` includes `@tailwindcss/forms` and `@tailwindcss/container-queries` in devDependencies
</acceptance_criteria>
</task>

### 3. Self-Host Typography via next/font/google

<task>
<objective>Load Epilogue, Newsreader, Space Grotesk as self-hosted variable fonts via next/font/google, eliminating CDN dependency and GDPR risk</objective>

<read_first>
- `next/font/google` documentation — API for Google Font self-hosting
- `src/app/layout.tsx` — Where fonts are loaded and CSS variables are set
- `surrealist_echoes/DESIGN.md` lines 52-78 — Typography scale reference
</read_first>

<action>
In `src/app/layout.tsx`:

```tsx
import { Epilogue, Newsreader, Space_Grotesk } from "next/font/google";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

Add CSS variables to `<html>` element: `${epilogue.variable} ${newsreader.variable} ${spaceGrotesk.variable}`

Set `lang="en"` and `className="dark"` on `<html>`.
</action>

<acceptance_criteria>
- `src/app/layout.tsx` imports `Epilogue`, `Newsreader`, `Space_Grotesk` from `next/font/google`
- Each font uses `display: "swap"` for CLS prevention
- `<html>` tag contains all three CSS variables in className
- `<html>` has `lang="en"` and `className` includes `"dark"`
- Font CDN `<link>` tags from `fonts.googleapis.com` are NOT present in the app
</acceptance_criteria>
</task>

### 4. Configure globals.css with Surrealist Echoes Theme

<task>
<objective>Set up global dark theme with radial gradient background and Tailwind directives</objective>

<read_first>
- `src/app/globals.css` — Current scaffolded CSS
- `playground_alchemist_s_terminal/code.html` lines 122-125 — Ambient background gradient reference
</read_first>

<action>
Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: radial-gradient(circle at 50% 0%, #2e2a18 0%, #110e02 100%);
  background-attachment: fixed;
  min-height: 100vh;
}
```

This matches the ambient background from all 4 HTML prototypes. The `background-attachment: fixed` ensures the gradient covers the full viewport on scroll.
</action>

<acceptance_criteria>
- `src/app/globals.css` contains exactly: `@tailwind base; @tailwind components; @tailwind utilities;`
- `src/app/globals.css` contains `body { background: radial-gradient(circle at 50% 0%, #2e2a18 0%, #110e02 100%); }`
- `src/app/globals.css` contains `background-attachment: fixed;`
</acceptance_criteria>
</task>

### 5. Bundle Material Symbols Icons Locally + Icon Component

<task>
<objective>Download Material Symbols Outlined woff2 font, serve locally, create reusable `<Icon>` component</objective>

<read_first>
- `next/font/local` documentation — Loading local font files
- `home_the_persistence_of_intelligence/code.html` lines 9-10 — Material Symbols CSS reference
</read_first>

<action>
1. Download Material Symbols Outlined variable woff2 file to `src/fonts/MaterialSymbolsOutlined.woff2`
2. Create `src/components/Icon.tsx`:

```tsx
import { Material_Symbols_Outlined } from "next/font/google";

const materialSymbols = Material_Symbols_Outlined({
  subsets: ["latin"],
  variable: "--font-material-symbols",
  display: "block",
});

type IconName = "vibration" | "unfold_more" | "category" | "auto_stories" | "palette"
  | "blur_on" | "memory" | "visibility" | "science" | "pest_control" | "hourglass_empty"
  | "water_drop" | "all_inclusive" | "bubble_chart" | "east" | "hive" | "psychology"
  | "flare" | "thermostat" | "filter_vintage" | "blur_circular";

type IconProps = {
  name: IconName;
  size?: 20 | 24 | 32;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  className?: string;
};

export function Icon({ name, size = 24, fill = 0, weight = 400, className = "" }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
```
</action>

<acceptance_criteria>
- `src/components/Icon.tsx` exists with `Icon` named export
- `Icon` accepts `name`, `size`, `fill`, `weight`, `className` props
- `fontVariationSettings` includes `'FILL'`, `'wght'`, `'GRAD'`, `'opsz'`
- Material Symbols font is imported via `next/font/google` (self-hosts automatically)
- `<span>` has `aria-hidden="true"`
</acceptance_criteria>
</task>

### 6. Create Shared Layout with Header, BottomNav, Footer

<task>
<objective>Build root layout.tsx with fixed header, bottom navigation dock, and footer wrapping all pages</objective>

<read_first>
- `src/app/layout.tsx` — Current layout
- `src/app/globals.css` — Global styles
- `src/components/Icon.tsx` — Icon component
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Layout specs
- `home_the_persistence_of_intelligence/code.html` lines 164-179 — Bottom nav dock reference
</read_first>

<action>
Create `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Epilogue, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNavDock } from "@/components/BottomNavDock";
import { Footer } from "@/components/Footer";

const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-epilogue", weight: ["200","300","400","500","700","800","900"], style: ["normal","italic"], display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", weight: ["200","300","400","500","600","700","800"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["300","400","500","600","700"], display: "swap" });

export const metadata: Metadata = { title: { template: "%s | Nur Amirah", default: "Nur Amirah Mohd Kamil" }, description: "Portfolio & AI Playground" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${epilogue.variable} ${newsreader.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-on-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <BottomNavDock />
        <Footer />
      </body>
    </html>
  );
}
```

Create inline sub-components in the same file or as separate files:
- `src/components/Header.tsx` — Fixed top bar: Logo "NUR_AMIRAH_MOHD_KAMIL" in `font-headline-lg` with amber glow, nav links in `font-label-sm` (Home, Insights, Playground, Portfolio)
- `src/components/BottomNavDock.tsx` — Fixed bottom pill: glassmorphism bg, 5 tabs with Icon + label, active state highlighting
- `src/components/Footer.tsx` — Copyright + LinkedIn/Email links in `text-body-md text-on-surface-variant/60`

BottomNavDock structure:
```tsx
<div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
  <nav className="pointer-events-auto bg-surface/40 backdrop-blur-xl border border-outline-variant/30 rounded-full px-fluid-gap py-drip flex gap-6">
    <NavTab href="/" icon="vibration" label="Home" />
    <NavTab href="/insights" icon="auto_stories" label="Insights" />
    <NavTab href="/playground" icon="psychology" label="Playground" />
    <NavTab href="/portfolio" icon="palette" label="Portfolio" />
    <NavTab href="/surrealist-echoes" icon="blur_on" label="Design" />
  </nav>
</div>
```

Use Next.js `usePathname()` from `next/navigation` for active tab detection.
</action>

<acceptance_criteria>
- `src/app/layout.tsx` exports `RootLayout` wrapping `{children}` in `<html class="dark">` with `<body>`
- `src/components/Header.tsx` exists with logo text "NUR_AMIRAH_MOHD_KAMIL" in `font-headline-lg`
- `src/components/BottomNavDock.tsx` exists with 5 nav links (/, /insights, /playground, /portfolio, /surrealist-echoes)
- `src/components/Footer.tsx` exists with copyright line
- Bottom nav dock uses `bg-surface/40 backdrop-blur-xl rounded-full` (glassmorphism pill)
- `<Icon>` component is used for nav dock icons
- Active tab uses `text-primary` color
</acceptance_criteria>
</task>

### 7. Create 5 Surrealist Shared Components

<task>
<objective>Build GlassPanel, OrganicCard, DripBorder, PulseButton, MeltingShadow as reusable Tailwind-styled React components</objective>

<read_first>
- `playground_alchemist_s_terminal/code.html` lines 95-126 — Custom CSS classes reference
- `.planning/phases/01-foundation/01-UI-SPEC.md` §4 Components — Exact Tailwind class contracts
- `.planning/codebase/CONVENTIONS.md` lines 90-120 — Arbitrary value patterns
</read_first>

<action>
Create 5 component files:

**`src/components/GlassPanel.tsx`:**
```tsx
export function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface/40 backdrop-blur-xl border border-outline-variant/20 rounded-lg p-fluid-gap shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}>
      {children}
    </div>
  );
}
```

**`src/components/OrganicCard.tsx`:**
```tsx
export function OrganicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-container p-fluid-gap shadow-[20px_40px_80px_rgba(0,0,0,0.8)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] ${className}`}>
      {children}
    </div>
  );
}
```

**`src/components/DripBorder.tsx`:**
```tsx
import { InputHTMLAttributes, forwardRef } from "react";

export const DripBorder = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border-0 border-b border-outline-variant/40 bg-transparent pb-2 text-on-surface focus:border-b-primary focus:outline-none focus:ring-0 transition-all duration-300 ${className}`}
      {...props}
    />
  )
);
DripBorder.displayName = "DripBorder";
```

**`src/components/PulseButton.tsx`:**
```tsx
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type PulseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function PulseButton({ href, children, className = "", ...props }: PulseButtonProps) {
  const classes = `inline-block rounded-[2rem_1.5rem_2.5rem_1rem] bg-primary text-on-primary px-horizon py-meridian font-label-sm hover:scale-105 transition-transform cursor-pointer ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button className={classes} {...props}>{children}</button>;
}
```

**`src/components/MeltingShadow.tsx`:**
```tsx
type ShadowVariant = "default" | "medium" | "extreme";

const shadowMap: Record<ShadowVariant, string> = {
  default: "shadow-[40px_10px_60px_rgba(0,0,0,0.5)]",
  medium: "shadow-[20px_40px_80px_rgba(0,0,0,0.8)]",
  extreme: "shadow-[50px_40px_100px_rgba(0,0,0,0.5)]",
};

export function MeltingShadow({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: ShadowVariant;
  className?: string;
}) {
  return <div className={`${shadowMap[variant]} ${className}`}>{children}</div>;
}
```
</action>

<acceptance_criteria>
- `src/components/GlassPanel.tsx` exports `GlassPanel` wrapping children in `bg-surface/40 backdrop-blur-xl`
- `src/components/OrganicCard.tsx` exports `OrganicCard` with `rounded-[40%_60%_70%_30%/40%_50%_60%_50%]`
- `src/components/DripBorder.tsx` exports `DripBorder` as forwarded-ref input with single bottom border
- `src/components/PulseButton.tsx` exports `PulseButton` with `hover:scale-105` and `rounded-[2rem_1.5rem_2.5rem_1rem]`
- `src/components/MeltingShadow.tsx` exports `MeltingShadow` with 3 shadow variants
- All components accept `className` prop for extension
- All components are in `src/components/` directory
</acceptance_criteria>
</task>

### 8. Stub All 5 Page Routes

<task>
<objective>Create stub pages for all 5 routes with placeholder content so navigation and layout are testable</objective>

<read_first>
- `src/app/layout.tsx` — Layout wraps these pages
- `.planning/ROADMAP.md` — Route list and naming
</read_first>

<action>
Create 5 page files:

**`src/app/page.tsx`** (Home — `/`):
```tsx
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-horizon">
      <h1 className="font-headline-lg text-headline-lg drop-shadow-[0_10px_20px_rgba(232,168,56,0.3)]">
        The Persistence of Intelligence
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-meridian max-w-2xl text-center">
        Portfolio & AI Playground — coming soon.
      </p>
    </div>
  );
}
```

**`src/app/insights/page.tsx`** (Insights):
```tsx
export default function InsightsPage() {
  return (
    <div className="px-horizon py-meridian">
      <h2 className="font-headline-md text-headline-md">Ethereal Inquiries</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">Insights coming soon.</p>
    </div>
  );
}
```

**`src/app/playground/page.tsx`** (Playground):
```tsx
export default function PlaygroundPage() {
  return (
    <div className="px-horizon py-meridian">
      <h2 className="font-headline-md text-headline-md">The Alchemist&apos;s Terminal</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">AI Playground coming soon.</p>
    </div>
  );
}
```

**`src/app/portfolio/page.tsx`** (Portfolio):
```tsx
export default function PortfolioPage() {
  return (
    <div className="px-horizon py-meridian">
      <h2 className="font-headline-md text-headline-md">The Archive of Dreams</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">Portfolio coming soon.</p>
    </div>
  );
}
```

**`src/app/surrealist-echoes/page.tsx`** (Design System):
```tsx
export default function DesignPage() {
  return (
    <div className="px-horizon py-meridian">
      <h2 className="font-headline-md text-headline-md">Surrealist Echoes</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">Design system reference coming soon.</p>
    </div>
  );
}
```

Add per-page metadata exports in each file:
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page Title" };
```
</action>

<acceptance_criteria>
- `src/app/page.tsx` renders at `/` with headline "The Persistence of Intelligence"
- `src/app/insights/page.tsx` renders at `/insights` with headline "Ethereal Inquiries"
- `src/app/playground/page.tsx` renders at `/playground` with headline "The Alchemist's Terminal"
- `src/app/portfolio/page.tsx` renders at `/portfolio` with headline "The Archive of Dreams"
- `src/app/surrealist-echoes/page.tsx` renders at `/surrealist-echoes` with headline "Surrealist Echoes"
- All pages use Surrealist Echoes font tokens (`font-headline-md`, `text-headline-md`)
- Each page exports `metadata: Metadata` with `title`
- `npx next build` succeeds without errors (verifies all routes resolve)
</acceptance_criteria>
</task>

---

## Verification

Run these checks to confirm plan completion:

```bash
# 1. Dev server starts
npx next dev &
sleep 3
curl -s http://localhost:3000 | grep -q "The Persistence of Intelligence" && echo "✓ Home page renders"
curl -s http://localhost:3000/insights | grep -q "Ethereal Inquiries" && echo "✓ Insights page renders"
curl -s http://localhost:3000/playground | grep -q "Alchemist" && echo "✓ Playground page renders"
curl -s http://localhost:3000/portfolio | grep -q "Archive of Dreams" && echo "✓ Portfolio page renders"
curl -s http://localhost:3000/surrealist-echoes | grep -q "Surrealist Echoes" && echo "✓ Design page renders"

# 2. Build succeeds
npx next build 2>&1 | grep -q "✓ Compiled successfully" && echo "✓ Production build passes"

# 3. No CDN dependencies
grep -r "cdn.tailwindcss.com" src/ && echo "✗ Tailwind CDN found" || echo "✓ No Tailwind CDN"
grep -r "fonts.googleapis.com" src/ && echo "✗ Google Fonts CDN found" || echo "✓ No Google Fonts CDN"

# 4. All components exist
test -f src/components/Icon.tsx && echo "✓ Icon"
test -f src/components/GlassPanel.tsx && echo "✓ GlassPanel"
test -f src/components/OrganicCard.tsx && echo "✓ OrganicCard"
test -f src/components/DripBorder.tsx && echo "✓ DripBorder"
test -f src/components/PulseButton.tsx && echo "✓ PulseButton"
test -f src/components/MeltingShadow.tsx && echo "✓ MeltingShadow"

# 5. Design tokens present
grep -c "'#171305'" tailwind.config.ts | grep -q "3" && echo "✓ Background surface tokens"
grep -q "'#ffc66b'" tailwind.config.ts && echo "✓ Primary token"
grep -q "'font-epilogue'" tailwind.config.ts && echo "✓ Epilogue font var"

kill %1 2>/dev/null
```

## must_haves

These are the goal-backward must-haves for Phase 1 success:

1. `npx next dev` starts on `localhost:3000` without errors
2. All 5 routes (/, /insights, /playground, /portfolio, /surrealist-echoes) render with correct page titles
3. Shared layout (Header, BottomNavDock, Footer) renders identically on all pages
4. Bottom navigation dock links navigate between all 5 pages via client-side routing
5. Surrealist Echoes design tokens (all 47 colors, typography, spacing, border-radius) produce visual output matching prototype `screen.png` reference images
6. Zero CDN dependencies — no `cdn.tailwindcss.com`, no `fonts.googleapis.com`, no `lh3.googleusercontent.com` image URLs
