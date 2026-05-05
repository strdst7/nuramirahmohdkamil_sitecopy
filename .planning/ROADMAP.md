# Roadmap: Nur Amirah Portfolio & AI Playground

**Created:** 30 April 2026
**Granularity:** Coarse
**Core Value:** Emotional resonance over rigid utility

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-05-01)
- ◆ **v2.0 CMS & AI Intelligence** — Phases 5-7 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) — SHIPPED 2026-05-01</summary>

- [x] Phase 1: Foundation (1/1 plan) — completed 2026-04-30
- [x] Phase 2: Content Pages (4/4 plans) — completed 2026-05-01
- [x] Phase 3: AI Playground (2/2 plans) — completed 2026-05-01
- [x] Phase 4: Lead Capture & Deploy (3/3 plans) — completed 2026-05-01

See [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md) for full phase details.

</details>

### Phase 5: CMS Integration

**Goal:** Replace hardcoded Insights and Portfolio data with Contentful CMS — ISR-cached, rich-text rendered, with article detail pages and graceful fallback.

**Depends on:** Phase 1 (layout, design system)

**Requirements:** CMS-01, CMS-02, CMS-03, CMS-04, CMS-05

**Success criteria:**
1. Insights page renders articles from Contentful with ISR (stale-while-revalidate)
2. Each article has a detail page at `/insights/[slug]` with full rich-text content
3. Portfolio page renders projects from Contentful with ISR
4. When Contentful API is unreachable, pages render hardcoded fallback data
5. Browser DevTools network tab shows zero Contentful API key exposure in client bundles

---

### Phase 6: Engagement

**Goal:** Email notifications on new leads and newsletter signup with unsubscribe — fire-and-forget delivery, duplicate prevention, opt-out support.

**Depends on:** Phase 4 (lead capture API route), Phase 1 (Supabase client)

**Requirements:** LEAD-04, LEAD-05, SOCL-01, SOCL-02, SOCL-03

**Success criteria:**
1. Site owner receives email within 30 seconds of lead submission (fire-and-forget)
2. Lead form returns 200 before email delivery completes (no blocking)
3. Newsletter form accepts email, rejects duplicates with friendly message
4. Subscriber can unsubscribe via unique token link and removed from active list

---

### Phase 7: AI Intelligence

**Goal:** Smart AI provider routing with fallback and session-based prompt history with replay — SSE streaming preserved, user preference respected.

**Depends on:** Phase 3 (AI API routes, playground UI), Phase 1 (Supabase client)

**Requirements:** PLAY-06, PLAY-07, PLAY-08, PLAY-09, PLAY-10, PLAY-11

**Success criteria:**
1. When primary provider fails, alternative provider responds within 10s timeout
2. SSE streaming continues uninterrupted during provider fallback
3. User's explicit provider selection overrides automatic routing
4. Past sessions list shows date and first prompt preview
5. Clicking a session replays the full prompt/response exchange
6. Clear history removes all stored sessions

---

## Progress

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1. Foundation | v1.0 | 1/1 | Complete | 2026-04-30 |
| 2. Content Pages | v1.0 | 4/4 | Complete | 2026-05-01 |
| 3. AI Playground | v1.0 | 2/2 | Complete | 2026-05-01 |
| 4. Lead Capture & Deploy | v1.0 | 3/3 | Complete | 2026-05-01 |
| 5. CMS Integration | v2.0 | 0/0 | Pending | — |
| 6. Engagement | v2.0 | 0/0 | Pending | — |
| 7. AI Intelligence | v2.0 | 0/0 | Pending | — |

---

*Roadmap created: 30 April 2026 · Updated: 06 May 2026 after v2.0 roadmap creation*
