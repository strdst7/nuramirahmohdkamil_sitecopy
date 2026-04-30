# Testing

**Analysis Date:** 2026-04-30

---

## Current State: No Test Infrastructure

### What Exists

**Test files:** Zero. No files matching `*.test.*`, `*.spec.*`, `__tests__/**`, or any other test naming convention exist anywhere in the repository.

**Test configuration files:** Zero.

| Config File | Present? | Notes |
|-------------|----------|-------|
| `jest.config.*` | ❌ | No Jest configuration |
| `vitest.config.*` | ❌ | No Vitest configuration |
| `playwright.config.*` | ❌ | No Playwright/E2E config |
| `cypress.config.*` | ❌ | No Cypress config |
| `.eslintrc*` / `eslint.config.*` | ❌ | No linting configuration |
| `.prettierrc*` | ❌ | No formatting configuration |
| `tsconfig.json` | ❌ | No TypeScript usage |
| `package.json` | ❌ | No Node.js project — not a JS/TS repo |
| `*.config.*` (any build tool) | ❌ | No build tooling of any kind |

**Test dependencies:** Zero. No `package.json` exists, so no testing libraries, assertion libraries, or mocking frameworks are declared. No `node_modules/` directory exists.

**CI/CD pipeline:** None. No `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, or any CI configuration. The repository is not a git repository (`git status` would fail).

**Test coverage baseline:** 0% — there is nothing to measure.

**What is testable now:**
- The 4 HTML files can be opened in a browser and inspected visually. They have no interactive JavaScript logic (beyond the Tailwind CDN runtime).
- The pages contain no form handlers, no event listeners, no async operations, and no data processing — all content is static markup.
- The pages have no routing or state management beyond what the browser provides natively.

### Why (Prototype Phase)

This is an intentional state for the current development phase:

1. **The project is a design prototype**, not a functioning web application. `SOFTWARE_DESIGN_SPECIFICATION.md` (line 1) states the architecture is planned but not yet implemented:
   > "Architecture Focus: Serverless, AI-First, Scalable Lead Generation."

2. **No production code exists to test.** The HTML files are static visual mockups built with Tailwind CDN — a zero-build setup chosen specifically for rapid design iteration. The actual Next.js application has not been started.

3. **The design system** (`surrealist_echoes/DESIGN.md`) is the primary deliverable of this phase, not functioning software. Testing a design system prototype means visual review, not automated testing.

4. **No JavaScript logic** exists in any page. The only `<script>` tags are the Tailwind CDN loader and the inline config object. There are no functions to unit test, no API calls to mock, and no user interactions to simulate.

**This is appropriate for the current phase.** The testing strategy below outlines what should be established when the Next.js production build begins.

---

## Planned Testing Strategy

_Based on the architecture described in `SOFTWARE_DESIGN_SPECIFICATION.md` and the complexity of the `surrealist_echoes/DESIGN.md` design system._

### Framework Recommendations

**Primary test runner: Vitest**
- Native ESM support (aligns with Next.js App Router)
- Faster than Jest for TypeScript projects
- Built-in Vite integration matches Next.js's underlying toolchain
- Compatible with React Testing Library

**Component testing: React Testing Library + Vitest**
- Render Next.js components in isolation
- Test user interactions (form submission, button clicks, state changes)
- Accessibility assertions via `@testing-library/jest-dom`

**E2E testing: Playwright**
- Full browser automation for multi-page flows
- Screenshot comparison for visual regression
- Mobile + desktop viewport testing (critical given the asymmetric, viewport-dependent design)
- API route testing via `request` fixture

**Visual regression: Playwright screenshot testing**
- Given the surrealist design (warped shapes, melting shadows, radial gradients, mix-blend modes), pixel-perfect rendering is critical and fragile
- Screenshot baselines should be captured for all unique components and page layouts
- Dark mode is the only mode (all pages use `<html class="dark">`), but this should be explicitly verified

### Test Types & Coverage Goals

**1. Unit Tests (medium coverage ~60%)**

| What to test | Example |
|-------------|---------|
| AI routing utility | `ai-router.ts` — test that requests route to gemini vs openai based on tool type |
| Lead capture validation | Form validation logic for email/WhatsApp/intent fields |
| Tailwind config — design token integrity | Verify all 47 color tokens resolve, spacing values are correct |
| Date/time formatting utilities | Any helper functions for `created_at` display |
| Supabase query builders | Mock `supabase.from().insert()` patterns |

**2. Component Tests (high coverage ~80%)**

| Component | Key Test Scenarios |
|-----------|-------------------|
| `Layout.tsx` | Renders nav bar, footer, grid background; applies `dark` class to `<html>` |
| `PlaygroundDemo.tsx` | Loading state, success state, error state, API timeout, form input changes, slider interactions |
| `LeadCaptureForm.tsx` | Form validation, successful submission, API error, empty field handling |
| Navigation components | Active section highlighting, mobile/desktop breakpoints, keyboard navigation |
| Portfolio/article cards | Image loading states, hover interactions, responsive grid layout |
| Playground sliders | Range input interaction, visual fill representation |

**3. API Route Tests (Integration — high coverage ~90%)**

| Route | Key Test Scenarios |
|-------|-------------------|
| `POST /api/ai/openai` | Valid request → successful response, invalid prompt → error, missing body → 400, API key missing → 500, rate limiting, large payload handling |
| `POST /api/ai/gemini` | Same scenarios as OpenAI, plus multimodal payload validation |
| `POST /api/leads` (implied) | Valid lead → Supabase insert, duplicate lead, missing required fields, SQL injection via `project_name` |

**Security-focused tests for API routes:**
- Verify API keys are NOT exposed in client-side bundles
- Verify CORS headers are correctly set
- Rate limiting on AI endpoints (prevent abuse)
- Input sanitization on all user-supplied fields

**4. E2E Tests (critical flows)**

| Flow | Steps |
|------|-------|
| Lead capture | Navigate → Fill form → Submit → See confirmation → Data appears in Supabase |
| Playground interaction | Navigate → Type directive → Adjust sliders → Click Transmute → See Loading → See Result |
| Page navigation | Navigate between all 4 pages via nav bar → Verify correct active state |
| Mobile responsiveness | All pages render correctly at 375px, 768px, 1024px |

**5. Accessibility Tests**
- Axe-core integration via `@axe-core/playwright` or `jest-axe`
- Verify all images have `alt` attributes (the current `data-alt` pattern must be replaced)
- Verify all interactive elements are keyboard-accessible
- Verify ARIA labels on icon buttons
- Verify heading hierarchy
- Color contrast ratios for the amber-on-umber palette

### Visual Regression Testing

The surrealist design is inherently fragile for CSS rendering. Key risk areas:

| Risk | Why Fragile | Test Strategy |
|------|------------|---------------|
| Asymmetric `border-radius` | Browser rounding differences on irregular shapes | Screenshot diff for all `rounded-[X%_Y%...]` components |
| `mix-blend-mode` | Rendering varies significantly between browsers | Cross-browser screenshot baselines (Chrome, Firefox, Safari) |
| `backdrop-filter: blur()` | Performance and rendering differences | Verify blur renders, not just passes; test on low-end devices |
| `drop-shadow` with spread | Tailwind CDN → build-time class generation may differ | Migrate and compare: CDN output vs build-time output |
| Google Fonts rendering | Font metrics vary by OS and browser | Screenshot fonts at multiple viewport widths |
| Radial gradients | Subtle color banding may differ | Tolerate 0.5% pixel difference for gradient regions |

**Visual baseline approach:**
- Capture screenshots of all 4 pages at 3 viewport widths (mobile 375px, tablet 768px, desktop 1440px)
- Capture each unique component pattern in isolation
- Use Playwright's `toHaveScreenshot()` with a reasonable threshold (not pixel-perfect — 1-2% tolerance given the design's intentional blurring)

### API Route Testing

**Mocking strategy:**

```
test environment
├── AI API calls → mocked with MSW (Mock Service Worker) or nock
│   ├── OpenAI: mock successful text generation response
│   └── Gemini: mock multimodal response
├── Supabase → mocked with supabase-js mock or test database
│   └── Verify INSERT, SELECT queries
└── Environment variables → set via vitest setup
    ├── OPENAI_API_KEY
    ├── GEMINI_API_KEY
    ├── SUPABASE_URL
    └── SUPABASE_ANON_KEY
```

**AI route test patterns:**

```typescript
// Example: POST /api/ai/openai route test
import { describe, it, expect, vi } from 'vitest'
import { POST } from './route'

describe('POST /api/ai/openai', () => {
  it('returns 400 when prompt is missing', async () => {
    const req = new Request('http://localhost/api/ai/openai', {
      method: 'POST',
      body: JSON.stringify({})
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('proxies successful OpenAI response', async () => {
    // mock fetch to OpenAI
    const req = new Request('http://localhost/api/ai/openai', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test', temperature: 0.7 })
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveProperty('text')
  })
})
```

### Test Infrastructure Setup

**Recommended `package.json` scripts:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test --config=playwright.visual.config.ts",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

**Configuration files to create:**

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Unit + component test configuration, path aliases |
| `playwright.config.ts` | E2E test configuration, browsers, viewports, base URL |
| `.env.test` | Test environment variables (dummy API keys, test Supabase URL) |
| `src/test/setup.ts` | Global test setup (React Testing Library, MSW, custom matchers) |
| `src/test/mocks/` | MSW handlers for OpenAI, Gemini, Supabase |

**CI integration (when established):**
- GitHub Actions workflow: `test.yml`
- Steps: Install → Lint → Typecheck → Unit tests → Build → E2E tests
- Vercel preview deployments for PR-based visual review

---

## Production Readiness Gaps

### Critical (must address before any real user traffic)

1. **Zero test infrastructure exists.** Before any user-facing deployment, a minimum of unit tests for API routes and component tests for the lead capture form should be in place. Current state: no project initialization, no `package.json`, no framework.

2. **AI API key security.** The `SOFTWARE_DESIGN_SPECIFICATION.md` correctly identifies that API keys must never be client-exposed. This requires test coverage: a test that parses the production build bundle and asserts no `OPENAI_API_KEY` or `GEMINI_API_KEY` string is present. Without this, it's a security vulnerability.

3. **Form validation.** `LeadCaptureForm.tsx` handles user input that goes to a database. Without validation tests, SQL injection, XSS, or malformed data could reach Supabase. This must be tested before any form goes live.

4. **Rate limiting.** AI API calls cost money. Without rate limiting and corresponding tests, the OpenAI/Gemini bill could be unbounded. Test that repeated requests are throttled.

### High (should address before public launch)

5. **Visual regression baselines.** The surrealist design relies on irregular shapes, CSS blend modes, and complex shadows that are fragile across browser engines. Without visual regression tests, a Chrome update or Tailwind version bump could silently break the entire visual identity.

6. **Accessibility audit automation.** The current prototype has significant a11y gaps (missing alt text, missing ARIA labels, dead links). Automated a11y tests should gate PRs to prevent regression in the production build.

7. **Cross-browser testing.** `mix-blend-mode`, `backdrop-filter`, and `border-radius` with percentage values have known cross-browser differences. Safari in particular handles `backdrop-filter` differently. E2E tests should run on Chromium, Firefox, and WebKit.

### Medium (should address before feature expansion)

8. **Loading state tests.** `PlaygroundDemo.tsx` has Loading, Success, and Error states. Each state path should be tested — especially the error state (network failure, API timeout, invalid response shape).

9. **Mobile navigation behavior.** The BottomNavBar uses `position: fixed` and `backdrop-blur-3xl` — both need testing on real mobile browsers (iOS Safari has known `position: fixed` + keyboard interaction bugs).

10. **Supabase integration tests.** A test database instance should be used for integration tests of the `playground_leads` table. Test: insert → read → verify schema constraints (UUID generation, enum validation, nullable fields).

### Low (nice to have)

11. **Design token snapshot tests.** The 47 color tokens from `surrealist_echoes/DESIGN.md` should be tested against the Tailwind config to ensure no tokens are dropped during the CDN → build-time migration.

12. **Performance budgets.** The current prototype loads Tailwind via CDN (a large JS payload). The production build should set a performance budget (Lighthouse scores, bundle size, TTI) and enforce it in CI.

13. **Google Fonts fallback.** Test that pages render with fallback system fonts when Google Fonts CDN is unreachable. The current prototype has no `font-display: swap` or fallback stack in the config — only single-family arrays like `["Epilogue"]`.

14. **SEO meta tags.** The production build should have per-page `<title>`, `<meta name="description">`, Open Graph, and Twitter Card tags. These can be verified with automated tests.

---

*Testing analysis: 2026-04-30*
