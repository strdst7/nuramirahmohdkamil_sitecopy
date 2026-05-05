# Research Summary — Milestone v2.0

## Key Findings

### Stack Additions
- **Contentful** (`contentful` v11 + `@contentful/rich-text-react-renderer`) for CMS
- **Resend** (`resend` v4) for email notifications
- **No new deps needed** for AI router (pure TypeScript logic) or newsletter (uses existing Supabase)
- **3 new packages total**, all well-maintained with strong Next.js support

### Feature Table Stakes

| Category | Must Have | Nice to Have | Skip for v2 |
|----------|-----------|--------------|-------------|
| CMS | Contentful fetch, ISR, rich text, fallback to static data | Preview API, scheduled publishing, article detail pages | Migration tools, multi-CMS support |
| AI Router | Provider fallback, user preference respected, SSE passthrough | Latency tracking, cost estimation | A/B testing, multi-model beyond 2 |
| Prompt History | Session list, replay view, clear history | Named sessions, export, search, favorites | Auth-backed history, image storage |
| Email Notifications | Owner notification on new lead, fire-and-forget | Daily digest, custom template | CRM integration, auto-reply |
| Newsletter | Email submit, duplicate detection, confirm message | Double opt-in, unsubscribe, preference center | Campaign composer, analytics |

### Watch Out For (Critical)

1. **HIGH — Contentful API key exposure:** All Contentful calls must be server-side (RSC). Never import contentful in 'use client' files.
2. **HIGH — Email blocks response:** Fire-and-forget email sending. Don't await email before returning 200 to lead form.
3. **HIGH — AI router kills streaming:** Router must pass through SSE ReadableStream, not buffer response.
4. **HIGH — Resend/Contentful keys in client:** Both libs must use `import 'server-only'` guard, same pattern as existing supabase.ts.
5. **MEDIUM — Missing content fallback:** Keep hardcoded data arrays as CMS downtime fallback. Pages must not crash.
6. **MEDIUM — History fills database:** Limit to last 100 sessions or add auto-cleanup. Paginate history view.

### Suggested Build Order

1. **Phase 5: CMS Integration** — highest impact, enables content independence. Contentful client → Insights migration → Portfolio migration → article detail pages → ISR.
2. **Phase 6: Engagement** — Newsletter form + email notifications + newsletter subscribe. All share Supabase backend pattern.
3. **Phase 7: AI Intelligence** — AI router + prompt history. Modifies existing routes, depends on Phase 5/6 patterns being established.

### Architecture: New vs Modified

- **Modified:** 3 API routes (openai, gemini, leads), 2 pages (insights, portfolio), 1 component (playground)
- **New:** 3 lib modules (contentful, ai-router, email), 2 API routes (history, newsletter), 2 components (PromptHistory, NewsletterForm), 1 page (insights/[slug])
- **Supabase:** 2 new tables (prompt_history, newsletter_subscribers)
