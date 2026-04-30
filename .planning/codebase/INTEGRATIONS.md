# External Integrations

**Analysis Date:** 2026-04-30

## Current Integrations (Prototype)

All current integrations are **read-only CDN dependencies** — there are no runtime API calls, no data persistence, and no authentication.

### CDN Dependencies

**Tailwind CSS CDN (Playground Build)**

| Attribute | Detail |
|-----------|--------|
| URL | `https://cdn.tailwindcss.com` |
| Query params | `?plugins=forms,container-queries` |
| Accessed from | All 4 HTML pages (`<script>` tag in `<head>`) |
| File references | `home_the_persistence_of_intelligence/code.html:5`, `insights_ethereal_inquiries/code.html:7`, `playground_alchemist_s_terminal/code.html:7`, `portfolio_archive_of_dreams/code.html:14` |
| Risk | CDN availability dependency; no version pinning (always loads latest Tailwind v3) |
| Migration note | Must be replaced with build-time Tailwind via PostCSS in Next.js production phase |

### Font Services

**Google Fonts API**

| Font | URL Pattern | Pages Using |
|------|------------|-------------|
| Epilogue | `fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900` | Home, Insights, Portfolio |
| Epilogue (non-variable) | `fonts.googleapis.com/css2?family=Epilogue:wght@200;300;400;500;700;800;900` | Playground |
| Newsreader | `fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800` | Home, Insights, Portfolio |
| Newsreader (non-variable) | `fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400` | Playground |
| Space Grotesk | `fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700` | Home, Insights, Portfolio |
| Space Grotesk (non-variable) | `fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700` | Playground |

All font loads include `&display=swap` for performance.

**Preconnect hints** are used in some pages:
- `home_the_persistence_of_intelligence/code.html:6-7` and `portfolio_archive_of_dreams/code.html:8-9` include `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`
- `insights_ethereal_inquiries/code.html` and `playground_alchemist_s_terminal/code.html` omit preconnect hints

**Note:** The Playground page uses non-variable (discrete weight) font URLs, resulting in ~6 separate font files vs. 3 variable font files. This is an inconsistency — the variable font URL is preferred for production.

**Material Symbols Icon Font**

| Attribute | Detail |
|-----------|--------|
| URL | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap` |
| Class | `.material-symbols-outlined` |
| Variable axes | `wght` (100–700), `FILL` (0 or 1) |
| Default settings | `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24` (varies slightly per page) |
| Duplication issue | All pages load the Material Symbols link tag **twice** (duplicated `<link>` tags) — a cleanup opportunity |

### Image Hosting

**Google User Content (lh3.googleusercontent.com)**

All images are hosted on Google's image CDN under the path `/aida-public/`. These are placeholder images (likely AI-generated) used for decorative/hero sections.

| Image | Page | Line |
|-------|------|------|
| Abstract desert dunes, golden hour | Home (`home_the_persistence_of_intelligence/code.html`) | 122 |
| Liquid flowing shapes, amber & cool blue | Home (`home_the_persistence_of_intelligence/code.html`) | 152 |
| Surrealist neural network, warm amber | Insights (`insights_ethereal_inquiries/code.html`) | 170 |
| Abstract liquid art, neural pathways | Playground (`playground_alchemist_s_terminal/code.html`) | 257 |
| Flowing melting forms, amber & deep blue | Portfolio (`portfolio_archive_of_dreams/code.html`) | 160 |
| Floating smooth spheres, dark horizon | Portfolio (`portfolio_archive_of_dreams/code.html`) | 194 |

**Characteristics:**
- Long hashed URLs (e.g., `AB6AXuBrpdCulfdrBKSd0R4PnpC_YHvS_3W1HGcYDsE8RxSNkgsnhAq-f3f0X1omuKeW59NoZefJxQUlRGdvKAinEXGMdlJMnERwYzktwIK-3EB8JkKGL9Dd02kHgMIPqFuwg2oUg8SDg-HkML_sN1YKFldM7RpGEaYXQaI8sgNhizJ2X3PLHnWhIFfB-BX1oiW5VfTHHhqCuoXqfMexTFrYMpmIMPvbYaZ9fab3EMWKZ-7XBWIjSnSkZQpIrKzkIpcCjcQJQApCIYZ9cfWd`)
- All images carry `data-alt` attributes with descriptive AI-generated alt text
- Used with CSS filters: `opacity`, `mix-blend-mode` (luminosity, screen, color-burn), `blur`, `contrast`, `saturate`, `sepia`, `hue-rotate`
- **Risk:** These are likely ephemeral Google-hosted URLs. They should be replaced with self-hosted or CDN-managed assets before production.
- **No local images exist** in the repository — all image directories are empty or absent.

---

## Planned Integrations (Production)

Source: `SOFTWARE_DESIGN_SPECIFICATION.md` (root). None of these are implemented yet.

### Supabase

**Purpose:** Serverless PostgreSQL database for lead capture and waitlist signups.

| Attribute | Detail |
|-----------|--------|
| Service | Supabase (cloud-hosted PostgreSQL) |
| Auth | Environment variable (Supabase URL + anon/service key) |
| Table | `playground_leads` |
| Client | `@supabase/supabase-js` (npm package) |
| Usage | `LeadCaptureForm.tsx` → Supabase client → `playground_leads` table insert |
| Schema | `id` (UUID PK), `project_name` (String), `email` (String nullable), `whatsapp` (String nullable), `intent` (Enum: white-label / update-notification / beta-access), `created_at` (Timestamp) |

**Integration points:**
- Client-side: `@supabase/supabase-js` in React components for form submission
- Server-side: Supabase service key in API routes for admin operations (if any)

**Environment variables required:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (if server-side admin ops needed)

### OpenAI API

**Purpose:** Text generation, data structuring, and logic processing for the 7 playground tools.

| Attribute | Detail |
|-----------|--------|
| Service | OpenAI API |
| Endpoint | `POST /api/ai/openai` (Next.js API Route) |
| Model | Unspecified (likely GPT-4o or GPT-4o-mini) |
| Auth | `OPENAI_API_KEY` environment variable |
| SDK | `openai` npm package (or direct fetch) |

**Architecture:**
1. Client-side React component calls `POST /api/ai/openai` with prompt/payload
2. Next.js API route reads `OPENAI_API_KEY` from `process.env`
3. API route forwards to OpenAI, returns response to client
4. **API key never exposed to client** — all OpenAI communication is server-side

### Gemini API

**Purpose:** Multimodal tasks (image/document upload analysis) and fast text reasoning for playground tools.

| Attribute | Detail |
|-----------|--------|
| Service | Google Gemini API |
| Endpoint | `POST /api/ai/gemini` (Next.js API Route) |
| Model | Unspecified (likely Gemini 2.5 Flash or Pro) |
| Auth | `GEMINI_API_KEY` environment variable |
| SDK | `@google/generative-ai` npm package (or direct fetch) |

**Architecture:** Same server-side proxy pattern as OpenAI — client calls Next.js API route, route forwards to Gemini with server-side key.

**AI Routing/Fallback Logic** (mentioned in SDD section 2): A utility function selects between `/api/ai/openai` and `/api/ai/gemini` based on task type, latency, or cost.

### Vercel Platform

**Purpose:** Hosting, deployment, and Edge Functions.

| Attribute | Detail |
|-----------|--------|
| Platform | Vercel |
| Framework support | Native Next.js (App Router) |
| Edge Functions | Used for low-latency AI response streaming via API routes |
| Deployment | Git-push triggered (connect GitHub repo → Vercel) |
| Environment variables | Managed in Vercel dashboard (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `SUPABASE_*`) |

### Integration Architecture (Planned)

```
┌──────────────────────────────────────────────────────┐
│  Browser (React / Next.js Client)                     │
│  ┌──────────────┐  ┌──────────────────┐              │
│  │PlaygroundDemo│  │ LeadCaptureForm  │              │
│  └──────┬───────┘  └────────┬─────────┘              │
│         │                   │                         │
└─────────┼───────────────────┼─────────────────────────┘
          │                   │
          ▼                   ▼
┌──────────────────────────────────────────────────────┐
│  Vercel (Next.js Server)                              │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ /api/ai/openai   │  │ /api/ai/gemini   │          │
│  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │
│  ┌────────┴─────────────────────┴──────────┐         │
│  │           Supabase Client               │         │
│  └────────────────────┬────────────────────┘         │
└───────────────────────┼──────────────────────────────┘
           │            │                  │
           ▼            ▼                  ▼
    ┌──────────┐ ┌────────────┐  ┌──────────────┐
    │  OpenAI  │ │   Gemini   │  │   Supabase   │
    │   API    │ │    API     │  │ (PostgreSQL) │
    └──────────┘ └────────────┘  └──────────────┘
```

**Key architectural constraint:** External AI APIs are accessed exclusively through Next.js API routes. The browser never communicates directly with OpenAI or Gemini. This ensures API keys remain server-side only.

---

*Integration audit: 2026-04-30*
