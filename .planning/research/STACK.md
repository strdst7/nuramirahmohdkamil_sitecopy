# Stack Research — Milestone v2.0

## Additions for CMS, AI Routing, Email, and Newsletter

### Recommended Stack Additions

#### CMS: Contentful (Recommended)

- **Library:** `contentful` (v11.x) — official JS SDK
- **Rationale:** Mature headless CMS with strong Next.js integration, TypeScript types via `contentful-management`, rich text rendering via `@contentful/rich-text-react-renderer`
- **Integration points:**
  - Server-side content fetching in RSC (App Router `page.tsx`)
  - `src/lib/contentful.ts` — singleton client, same pattern as existing `src/lib/supabase.ts`
  - Content models: Article (Insights), Project (Portfolio)
  - Pages affected: `/insights`, `/portfolio`, `/insights/[slug]`
- **Alternatives considered:** Sanity (good but heavier Next.js integration), Strapi (self-hosted, more ops), Payload CMS 3.0 (new, less mature Next.js integration)
- **What NOT to add:** Contentful GraphQL (REST delivery API simpler, matches existing patterns), Contentful Live Preview SDK (v2 scope creep)

#### AI Routing

- **No new dependency needed.** Existing OpenAI and Gemini SDKs already present.
- **Implementation:** `src/lib/ai-router.ts` — pure TypeScript logic module
- **Pattern:** Fallback chain — try cheapest first, fall back to alternative on error/timeout
- **Existing APIs:** `@google/generative-ai` (v0.24.1), `openai` (v6.35.0)

#### Email Notifications

- **Library:** `resend` (v4.x) — modern email API with React email templates
- **Alternatively:** `nodemailer` + SMTP (SendGrid/Mailgun transport) if Resend not available in region
- **Integration:** `src/lib/email.ts` + `src/app/api/leads/route.ts` (post-insert hook)
- **What NOT to add:** Full email template engine (react-email optional, plain text/html sufficient for v2)

#### Newsletter

- **No new library needed.** Reuses existing Supabase client.
- **Implementation:** New `newsletter_subscribers` table + `POST /api/newsletter/subscribe` route
- **Pattern:** Mirror existing leads API route pattern (Zod validation → Supabase insert)
- **What NOT to add:** Mailchimp/ConvertKit SDK (overkill, Supabase suffices for v2)

### Dependency Summary

| Package | Version | Purpose | New? |
|---------|---------|---------|------|
| contentful | ^11.0 | CMS delivery API | Yes |
| @contentful/rich-text-react-renderer | ^16.0 | Rich text → JSX | Yes |
| resend | ^4.0 | Email delivery | Yes |
| @supabase/supabase-js | ^2.105.1 | Newsletter storage | Existing |

### Integration Points

1. **CMS → existing pages:** Replace hardcoded `src/data/insights.ts` and `src/data/projects.ts` with Contentful API calls. Keep data types as fallback/stub for development.
2. **Email → existing leads route:** Add email trigger after successful Supabase insert in `src/app/api/leads/route.ts`.
3. **Newsletter → new API route:** New `src/app/api/newsletter/subscribe/route.ts`, pattern matching leads route.
4. **AI Router → existing AI routes:** Wrap `src/app/api/ai/openai/route.ts` and `src/app/api/ai/gemini/route.ts` with provider selection logic.
5. **Prompt History → Supabase:** New `prompt_history` table, client-side localStorage for session tracking.
