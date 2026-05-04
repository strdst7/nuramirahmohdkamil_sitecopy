# Nur Amirah Mohd Kamil — Portfolio & AI Playground

Interactive portfolio and AI experimentation terminal — bridging creative direction with technical experimentation.

## Quick Start

```bash
# Install dependencies
npm install

# Development (localhost:3000, hot reload)
npm run dev

# Production
npm run build && npm start

# Docker
docker compose up -d --build
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Required | Source |
|----------|----------|--------|
| `OPENAI_API_KEY` | For AI Playground | [OpenAI Dashboard](https://platform.openai.com/api-keys) |
| `GEMINI_API_KEY` | For AI Playground | [Google AI Studio](https://aistudio.google.com/apikey) |
| `SUPABASE_URL` | For lead capture | Supabase Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | For lead capture | Supabase Project Settings → API |

The app works without API keys — the playground will show error messages instead of AI responses.

## Adding Content

### Blog Posts (Insights page)

Edit `src/data/insights.ts` — add objects to the `articles` array:

```typescript
{
  id: "obs-05-01",                    // unique slug
  title: "Observation 05.01",         // article title
  date: "2025-04-20",                 // ISO date
  excerpt: "One-sentence teaser...",  // shown in feed card
  body: "Full article text...",       // rendered on article page
  tags: ["Latent Space", "Topology"], // shown as badges
  iconName: "pest_control",           // Material Symbol icon (see below)
  diagramAlt: "Description of image", // alt text for accessibility
  diagramSrc: "/images/insights-diagram.svg", // image path in /public
}
```

### Portfolio Projects

Edit `src/data/projects.ts` — add objects to the `projects` array:

```typescript
{
  id: "project-unique-id",                   // unique slug
  number: "Project 03",                      // display number
  title: "Project Title",                    // card title
  description: "2-3 sentence description.",  // card body
  tags: ["Tag One", "Tag Two"],              // shown as badges
  iconName: "hive",                          // Material Symbol icon
  imageAlt: "Description of image",          // accessibility
  imageSrc: "/images/portfolio-island-1.svg",// image path
  layout: "right",                           // "right" or "left" — card drift direction
  cta: { label: "Explore", href: "#" },      // optional button
}
```

### Available Icons

Use any of these in the `iconName` field: `vibration`, `unfold_more`, `category`, `auto_stories`, `palette`, `blur_on`, `memory`, `visibility`, `science`, `pest_control`, `hourglass_empty`, `water_drop`, `all_inclusive`, `bubble_chart`, `east`, `hive`, `psychology`, `flare`, `thermostat`, `filter_vintage`, `blur_circular`, `send`, `mail`, `chat`, `flag`, `check_circle`, `person`.

### Images

Place images in `public/images/` and reference them as `/images/your-file.svg`. SVG is recommended — matches the surrealist aesthetic.

### Home Page

Hero copy and gallery cards are hardcoded in `src/app/page.tsx`. Edit the JSX directly.

## Database Setup (Lead Capture)

```sql
CREATE TABLE IF NOT EXISTS playground_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  intent TEXT NOT NULL CHECK (intent IN ('white-label', 'update-notification', 'beta-access')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Run this in Supabase SQL Editor, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 (build-time, Surrealist Echoes design system)
- **AI:** OpenAI (GPT-4o-mini) + Gemini (2.0 Flash)
- **Database:** Supabase (PostgreSQL)
- **Deploy:** Vercel (Edge Functions) or Docker

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, bento gallery, CTAs |
| `/insights` | Blog — journal-style articles |
| `/playground` | AI Playground — terminal with text/image AI |
| `/portfolio` | Portfolio — drifting island project cards |
| `/surrealist-echoes` | Design system reference |
