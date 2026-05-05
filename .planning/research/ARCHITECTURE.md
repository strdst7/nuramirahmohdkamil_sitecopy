# Architecture Research — Milestone v2.0

## Integration Points with Existing Architecture

### Existing Architecture Overview

```
src/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── openai/route.ts    → POST, SSE streaming
│   │   │   └── gemini/route.ts    → POST, multimodal analysis
│   │   └── leads/route.ts          → POST, Zod → Supabase
│   ├── insights/page.tsx           → hardcoded data
│   ├── portfolio/page.tsx          → hardcoded data
│   ├── playground/page.tsx         → AI UI + lead form
│   └── layout.tsx                  → shared shell
├── components/                     → 7 shared components
├── data/                           → hardcoded insights.ts, projects.ts
└── lib/
    └── supabase.ts                 → lazy-init singleton
```

### New Architecture (v2.0)

```
src/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── openai/route.ts    → [MODIFIED] delegate to ai-router
│   │   │   └── gemini/route.ts    → [MODIFIED] delegate to ai-router
│   │   ├── history/route.ts        → [NEW] GET sessions, GET/POST prompts
│   │   ├── leads/route.ts          → [MODIFIED] add email notification
│   │   └── newsletter/
│   │       └── subscribe/route.ts  → [NEW] POST email subscription
│   ├── insights/
│   │   ├── page.tsx                → [MODIFIED] fetch from Contentful
│   │   └── [slug]/page.tsx         → [NEW] article detail page
│   └── portfolio/page.tsx          → [MODIFIED] fetch from Contentful
├── components/
│   ├── NewsletterForm.tsx           → [NEW]
│   ├── PromptHistory.tsx            → [NEW]
│   └── ...existing components
├── lib/
│   ├── supabase.ts                 → [EXISTING]
│   ├── contentful.ts               → [NEW] lazy-init singleton
│   ├── ai-router.ts                → [NEW] provider selection logic
│   └── email.ts                    → [NEW] email notification helper
└── data/
    ├── insights.ts                 → [KEPT] fallback types + stub data
    └── projects.ts                 → [KEPT] fallback types + stub data
```

## Data Flow Changes

### CMS Data Flow (replaces static data)
```
Contentful API → src/lib/contentful.ts → RSC page.tsx → render
                                            ↓ (ISR on demand)
                                    cache revalidation
```

### AI Router Data Flow (adds routing layer)
```
Client Playground → API route → ai-router.ts → OpenAI OR Gemini
                                    ↑
                            (latency/cost check)
```

### Prompt History Data Flow (new)
```
AI response complete → API route → Supabase insert (prompt_history)
                                        ↓
Client history panel → GET /api/history → Supabase select → render
```

### Email Notification Data Flow (new)
```
POST /api/leads → Zod validate → Supabase insert → email.send()
                                                    ↓
                                            Resend/SMTP → site owner
```

### Newsletter Data Flow (new)
```
NewsletterForm → POST /api/newsletter→ Zod validate → Supabase insert
                          subscribe    (check dupes)  (newsletter_subscribers)
```

## Component Changes

### Modified Components
- `LeadCaptureForm.tsx` — no UI changes, backend adds email
- `Playground page` — add PromptHistory panel
- `Insights page` — switch from static data to Contentful fetch
- `Portfolio page` — switch from static data to Contentful fetch

### New Components
- `NewsletterForm.tsx` — email input + submit, follows LeadCaptureForm pattern
- `PromptHistory.tsx` — sidebar panel with session list + replay view

## Build Order (by dependency)

1. **CMS Integration** (most impactful, enables content independence)
   - Contentful client setup → Insights page migration → Portfolio page migration → ISR config
   - Minimal dependency: only needs Contentful account + content models

2. **Newsletter + Email** (simple backend patterns, build together)
   - Newsletter route → NewsletterForm component → Email notification in leads route
   - Dependencies: Supabase tables

3. **AI Router + Prompt History** (modifies existing routes, adds history table)
   - AI router logic → History API → PromptHistory UI component
   - Dependencies: Supabase prompt_history table, existing AI routes

## Database Schema Additions

### `prompt_history` table
```sql
CREATE TABLE prompt_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  provider TEXT NOT NULL,        -- 'openai' | 'gemini'
  model TEXT NOT NULL,           -- 'gpt-4o-mini' | 'gemini-2.0-flash'
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  parameters JSONB,              -- { temperature, top_p, max_tokens }
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_prompt_history_session ON prompt_history(session_id);
CREATE INDEX idx_prompt_history_created ON prompt_history(created_at DESC);
```

### `newsletter_subscribers` table
```sql
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',  -- 'active' | 'unsubscribed'
  subscribed_at TIMESTAMPTZ DEFAULT now()
);
```
