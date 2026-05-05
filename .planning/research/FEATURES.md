# Features Research — Milestone v2.0

## Category: CMS Integration (Contentful)

### Table Stakes
- Content author can create, edit, and publish blog articles in Contentful
- Content author can create, edit, and publish portfolio projects in Contentful
- Published content appears on live site without redeployment (ISR or SSR)
- Existing hardcoded data serves as fallback when Contentful unavailable
- Rich text (headings, bold, italic, links, images) renders correctly

### Differentiators
- Real-time preview of content before publishing (Contentful Preview API)
- Scheduled publishing — articles go live at future date
- Content versioning and rollback via Contentful dashboard
- Draft/published status indicator on admin cards

### Dependencies on Existing
- Article interface (`src/data/insights.ts` types) must map to Contentful content model
- Project interface (`src/data/projects.ts` types) must map to Contentful content model
- Existing page layouts assume static data — need loading/empty/error states added

### Complexity Notes
- Contentful SDK calls must be server-side (RSC) — content must not be fetched client-side to preserve SEO
- ISR configuration (`revalidate`) needed for incremental updates without full rebuild
- Content model design is one-time setup, code integration is the main effort

## Category: AI Provider Router

### Table Stakes
- System selects between OpenAI and Gemini based on latency and cost preferences
- Fallback: if primary provider fails, secondary provider used automatically
- User preference respected: if user explicitly chooses provider, system honors it

### Differentiators
- Real-time latency monitoring per provider (tracked in Supabase)
- Cost estimation displayed before request
- Provider-specific parameter mapping (temperature ranges differ between providers)
- Queue-based load distribution (unlikely needed at this scale)

### Anti-Features
- Don't add provider A/B split testing UI — just smart routing
- Don't build custom model serving infrastructure — rely on OpenAI/Gemini APIs
- Don't support arbitrary model providers beyond the two existing

### Dependencies on Existing
- Existing API routes at `src/app/api/ai/openai/route.ts` and `src/app/api/ai/gemini/route.ts`
- Playground UI at `src/app/playground/page.tsx` calls these routes
- Parameter sliders already exist (temperature 0-2.0, hallucination 0-1.0)

## Category: Prompt History & Session Replay

### Table Stakes
- User's prompts and responses saved to Supabase
- History view: list of past sessions with date and first prompt
- Click a session to replay full prompt/response exchange
- Clear history option

### Differentiators
- Named sessions (auto-title from first prompt)
- Export session as markdown
- Search through past prompts
- Favorite/bookmark sessions

### Anti-Features
- Don't require authentication — tie sessions to browser fingerprint / localStorage ID
- Don't persist generated images (Gemini) — text-only history for v2
- Don't build collaborative/shared sessions

### Dependencies on Existing
- API routes `src/app/api/ai/openai/route.ts` and `src/app/api/ai/gemini/route.ts` — need to log to Supabase after successful response
- Playground page UI — needs history panel component
- Supabase schema — new `prompt_history` table

## Category: Email Notifications

### Table Stakes
- Site owner receives email when new lead is submitted
- Email includes: project name, email (if provided), WhatsApp (if provided), intent, timestamp
- Email delivery is reliable (retry on failure)

### Differentiators
- Daily digest email when multiple leads come in
- Custom email template with Surrealist Echoes design
- CC to additional recipients configurable via env var

### Anti-Features
- Don't build CRM integration
- Don't build automated email responses to leads
- Don't build email tracking/open rate analytics

### Dependencies on Existing
- `src/app/api/leads/route.ts` — add email trigger after insert
- Existing lead schema and Supabase table

## Category: Newsletter Signup

### Table Stakes
- Visitor can submit email to subscribe to newsletter
- Email stored in Supabase `newsletter_subscribers` table
- Duplicate email detection (don't insert duplicate)
- Success confirmation message displayed to user

### Differentiators
- Double opt-in via confirmation email
- Unsubscribe link in every newsletter
- Preference center (topic selection — AI insights, design, both)

### Anti-Features
- Don't build email campaign composer — that's a future feature
- Don't integrate with third-party newsletter platforms yet
- Don't build analytics dashboard for subscribers

### Dependencies on Existing
- Supabase client pattern from `src/lib/supabase.ts`
- Zod validation pattern from leads route
- Surrealist Echoes form styling from LeadCaptureForm component
