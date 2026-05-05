# Pitfalls Research — Milestone v2.0

## Common Mistakes When Adding CMS, AI Routing, Email, and Newsletter to a Next.js/Supabase App

### CMS Integration Pitfalls

| Pitfall | Severity | Prevention | Phase to Address |
|---------|----------|------------|------------------|
| **Contentful API key exposed to client** — fetching from Contentful in client components leaks the delivery API key in browser bundles | HIGH | All Contentful calls must be in React Server Components (page.tsx) or server-only lib. Never import contentful client in 'use client' files. | Phase 5 (CMS) |
| **Missing fallback for CMS downtime** — site renders blank if Contentful API returns error | HIGH | Keep hardcoded `src/data/` arrays as fallback. Wrap Contentful fetch in try/catch with fallback. Page should degrade gracefully, not crash. | Phase 5 (CMS) |
| **ISR revalidation too aggressive** — every page view triggers revalidation, hitting Contentful rate limits | MEDIUM | Set `revalidate` to reasonable interval (60s minimum, or on-demand with API revalidation). Contentful has rate limits. | Phase 5 (CMS) |
| **Rich text rendering breaks layouts** — Contentful rich text produces unexpected HTML that breaks Surrealist Echoes styling | MEDIUM | Define strict rich text node mapping in render options. Preview in Contentful dashboard before publishing. | Phase 5 (CMS) |
| **Content model mismatch** — Contentful content model doesn't match existing TypeScript interfaces, causing runtime errors | MEDIUM | Design content models first, then map to existing interfaces. Use Zod to validate Contentful response shape. | Phase 5 (CMS) |
| **Forgetting to add image domain** — Contentful images hosted on images.ctfassets.net need to be added to next.config.ts remotePatterns | LOW | Add `images.ctfassets.net` to remotePatterns in next.config.ts | Phase 5 (CMS) |

### AI Router Pitfalls

| Pitfall | Severity | Prevention | Phase to Address |
|---------|----------|------------|------------------|
| **Router adds latency** — sequential provider checking (try A, then B) doubles response time if primary fails | HIGH | Parallelize: fire both requests, take first success. Cancel the slower one. Add timeout per provider (10s). | Phase 7 (AI Router) |
| **User preference ignored** — router overrides explicit user provider choice for optimization | HIGH | Respect user's explicit provider selection in Playground UI. Only route automatically when user hasn't chosen. | Phase 7 (AI Router) |
| **SSE streaming broken by routing** — wrapping SSE endpoint in routing logic that buffers the response, killing streaming UX | HIGH | Router must return a ReadableStream, not buffer the entire response. Pass through SSE chunks. | Phase 7 (AI Router) |
| **Cost estimation wrong** — displaying stale model pricing that doesn't match actual API costs | LOW | Don't show exact cost — use relative indicators (cheaper/faster). Actual pricing changes too frequently. | Phase 7 (AI Router) |

### Prompt History Pitfalls

| Pitfall | Severity | Prevention | Phase to Address |
|---------|----------|------------|------------------|
| **History fills up database** — unlimited prompt storage without cleanup or limits | MEDIUM | Limit to last 100 sessions or add TTL (auto-delete after 30 days). User can manually clear. Don't store streaming chunks individually. | Phase 7 (AI Router) |
| **API keys exposed in stored prompts** — if user accidentally pastes an API key in prompt, it gets stored in plaintext | MEDIUM | This is a known risk for any prompt storage. Document clearly that history is local/browser-based (Supabase isn't E2E encrypted). Consider client-only localStorage for v2. | Phase 7 (AI Router) |
| **History page blocks rendering** — loading all sessions at once on page load without pagination | MEDIUM | Paginate history (20 per page). Lazy-load session details on click. | Phase 7 (AI Router) |
| **Cross-session data leak** — session ID stored in localStorage, accessible across tabs | LOW | Acceptable for v2 without auth. Document session scope. | Phase 7 (AI Router) |

### Email Notification Pitfalls

| Pitfall | Severity | Prevention | Phase to Address |
|---------|----------|------------|------------------|
| **Email delivery blocks lead API response** — waiting for email to send before returning 200 to the form submission | HIGH | Fire-and-forget: await Supabase insert, return 200, then send email in background (don't await in route handler). | Phase 6 (Notification) |
| **Email fails silently** — email delivery failure not logged, leads lost without notification | HIGH | Log email failures to console.error. Consider fallback: if email fails, log to Supabase `email_log` table for later inspection. | Phase 6 (Notification) |
| **Resend API key in client bundle** — importing Resend client in a file that gets bundled to client | HIGH | Email lib must be server-only. Use `import 'server-only'` guard. Same pattern as supabase.ts (no client exposure). | Phase 6 (Notification) |
| **Not handling Resend region restrictions** — Resend not available in all regions, may need SMTP fallback | LOW | Document that Resend requires API key. Environment variable `EMAIL_PROVIDER` to switch between resend/smtp. | Phase 6 (Notification) |

### Newsletter Integration Pitfalls

| Pitfall | Severity | Prevention | Phase to Address |
|---------|----------|------------|------------------|
| **No duplicate detection** — same email can subscribe multiple times, causing duplicate records | MEDIUM | UNIQUE constraint on email column. Return friendly "already subscribed" message. | Phase 6 (Notification) |
| **No rate limiting** — newsletter endpoint can be abused for spam signups or scraping | MEDIUM | Add simple rate limiting to newsletter route (e.g., 3 requests per IP per minute). Can use Vercel Edge Config or in-memory rate limiter. | Phase 6 (Notification) |
| **Missing unsubscribe** — subscribers can't opt out, leading to spam complaints | MEDIUM | Store unsubscribe token (UUID), include unsubscribe link with token in emails. GET /api/newsletter/unsubscribe?token=xxx. | Phase 6 (Notification) |
| **GDPR/anti-spam compliance** — collecting emails without consent or privacy notice | LOW | Add link to privacy policy next to signup form. Note: site is personal portfolio, not commercial — lower risk. | Phase 6 (Notification) |
