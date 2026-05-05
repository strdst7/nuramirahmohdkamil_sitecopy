# Requirements: Nur Amirah Mohd Kamil — Portfolio & AI Playground

**Defined:** 06 May 2026
**Core Value:** Emotional resonance over rigid utility — a dreamlike portfolio that sparks curiosity while delivering functional AI tools and lead conversion.

## v2 Requirements

Requirements for v2.0 milestone. Each maps to roadmap phases.

### CMS Integration

- [ ] **CMS-01**: User can view Insights articles fetched from Contentful with ISR caching and rich text rendering
- [ ] **CMS-02**: User can view individual article detail page at insights/[slug]
- [ ] **CMS-03**: User can view Portfolio projects fetched from Contentful with ISR caching
- [ ] **CMS-04**: Site falls back to hardcoded content when Contentful API unavailable
- [ ] **CMS-05**: Contentful delivery API key never exposed to client bundle (server-only)

### AI Intelligence

- [ ] **PLAY-06**: System falls back to alternative AI provider when primary provider call fails
- [ ] **PLAY-07**: User's explicit provider choice always respected over automatic routing
- [ ] **PLAY-08**: SSE streaming preserved through provider fallback — no response buffering
- [ ] **PLAY-09**: User can view list of past prompt sessions with date and first prompt preview
- [ ] **PLAY-10**: User can click a session to replay full prompt/response exchange
- [ ] **PLAY-11**: User can clear all prompt history

### Lead Capture

- [ ] **LEAD-04**: Site owner receives email notification when new lead is submitted
- [ ] **LEAD-05**: Email notification does not delay lead form API response (fire-and-forget)

### Newsletter

- [ ] **SOCL-01**: User can submit email to subscribe to newsletter
- [ ] **SOCL-02**: Duplicate email subscriptions rejected with friendly message
- [ ] **SOCL-03**: Subscriber can unsubscribe via unique token link

## v1 Requirements (Shipped — v1.0, archived)

See [milestones/v1.0-REQUIREMENTS.md](milestones/v1.0-REQUIREMENTS.md) — 21/21 shipped 2026-05-01.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contentful Preview API | v2 scope is content delivery; preview adds complexity for admin use case not yet validated |
| Contentful scheduled publishing | Deferred — requires webhook infrastructure |
| AI provider latency dashboard | Monitoring infrastructure not yet justified for this scale |
| Named prompt sessions / export | Punted from scope — basic history+replay is v2 floor |
| User authentication / login | Explicitly excluded — site is public-facing showcase |
| E-commerce / payments | Explicitly excluded — lead capture only |
| Real-time chat / WebSockets | Not core to portfolio value |
| Multi-language / i18n | English-only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMS-01 | Phase 5 | Pending |
| CMS-02 | Phase 5 | Pending |
| CMS-03 | Phase 5 | Pending |
| CMS-04 | Phase 5 | Pending |
| CMS-05 | Phase 5 | Pending |
| LEAD-04 | Phase 6 | Pending |
| LEAD-05 | Phase 6 | Pending |
| SOCL-01 | Phase 6 | Pending |
| SOCL-02 | Phase 6 | Pending |
| SOCL-03 | Phase 6 | Pending |
| PLAY-06 | Phase 7 | Pending |
| PLAY-07 | Phase 7 | Pending |
| PLAY-08 | Phase 7 | Pending |
| PLAY-09 | Phase 7 | Pending |
| PLAY-10 | Phase 7 | Pending |
| PLAY-11 | Phase 7 | Pending |

**Coverage:**
- v2 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 06 May 2026*
*Last updated: 06 May 2026 after initial definition*
