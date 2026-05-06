---
phase: 06-engagement
plan: 03
subsystem: newsletter
type: execute
tags:
  - newsletter
  - unsubscribe
  - api-route
  - client-component
requires:
  - 06-02 (newsletter_subscribers table, subscribe API)
provides:
  - POST /api/newsletter/unsubscribe
  - /unsubscribe confirmation page
  - SOCL-03 (unsubscribe with soft delete)
affects:
  - src/app/api/newsletter/unsubscribe/route.ts
  - src/app/unsubscribe/page.tsx
tech-stack:
  added: []
  patterns:
    - Supabase server-side soft delete (status update, no row deletion)
    - Zod validation for UUID tokens
    - Next.js App Router Client Component with Suspense for useSearchParams
    - Surrealist Echoes design language in opt-out flow
key-files:
  created:
    - src/app/api/newsletter/unsubscribe/route.ts
    - src/app/unsubscribe/page.tsx
  modified: []
decisions:
  - Used Suspense boundary wrapping to handle useSearchParams client-side rendering requirement (not explicitly in plan but required by Next.js for production builds)
  - Added "Unsubscribing..." text on the confirm button during API call for user feedback while request is in-flight
metrics:
  duration: ~10m
  completed: 2026-05-07T00:00:00Z
  tasks: 1
  files: 2
---

# Phase 06 Plan 03: Newsletter Unsubscribe Summary

**One-liner:** Soft-delete unsubscribe API route with UUID token validation and a Surrealist Echoes styled confirmation page that prevents accidental unsubscription.

## Tasks Completed

| Task | Name                                                       | Commit   | Files                                                             |
|------|------------------------------------------------------------|----------|-------------------------------------------------------------------|
| 1    | Create unsubscribe API route and unsubscribe confirmation page | b077cc5  | `src/app/api/newsletter/unsubscribe/route.ts`, `src/app/unsubscribe/page.tsx` |

## Execution Summary

Created two files implementing the complete newsletter unsubscribe flow:

### POST /api/newsletter/unsubscribe

- Validates request body with Zod (`z.string().uuid()`)
- Returns 400 for invalid UUID format
- Queries `newsletter_subscribers` by token (the subscriber's UUID id per D-09)
- Returns 404 with friendly message for not-found tokens
- Returns 200 with `already_unsubscribed` status for already-unsubscribed tokens
- Sets `status = 'unsubscribed'` and updates `updated_at` (soft delete per D-08) for active subscribers
- Returns 200 with warm goodbye message on success
- Returns 500 for database errors
- No email sent from unsubscribe flow (per D-05)
- Follows identical patterns to existing `leads/route.ts` and `subscribe/route.ts`

### /unsubscribe page

- Client Component reading token from `useSearchParams`
- Wrapped in `<Suspense>` boundary for Next.js production build compatibility
- **Loading state:** "Checking your link..." with pulse animation
- **Error state** (per D-15): "This Link Doesn't Look Right" in GlassPanel with `pest_control` icon, friendly message, Return Home button
- **Confirm state** (per D-14): "Leave the Echo?" confirmation prompt requiring user to click before acting — prevents accidental unsubscription from email scanners. `blur_circular` icon, two buttons (Yes + Never Mind)
- **Done state:** "You've Left the Echo" with `check_circle` filled icon, warm goodbye message, Return Home button
- **Already-unsubscribed state** (per D-15): "Already Unsubscribed" with `blur_on` icon, friendly acknowledgment, Return Home button
- Client-side UUID regex pre-validation avoids unnecessary API calls for obviously invalid tokens
- Button shows "Unsubscribing..." during API call for user feedback

## Verification Results

| Check | Result |
|-------|--------|
| TypeScript (`npx tsc --noEmit`) | PASS (exit 0) |
| `npm run build` | PASS |
| `/unsubscribe` route generated | ✓ (static) |
| `/api/newsletter/unsubscribe` route generated | ✓ (dynamic) |
| `unsubscribeSchema` in route | ✓ (2 occurrences) |
| `unsubscribed` in route | ✓ (6 occurrences) |
| `newsletter_subscribers` in route | ✓ (2 occurrences) |
| `status = 'unsubscribed'` in route | ✓ (soft delete comment) |
| No `.delete()` in route | ✓ (D-08 compliance) |
| `useSearchParams` in page | ✓ (2 occurrences) |
| `api/newsletter/unsubscribe` in page | ✓ (1 occurrence) |
| Already-unsubscribed handling in page | ✓ (6 occurrences) |

## Deviations from Plan

### Architectural Adjustments

**1. Added Suspense boundary for `useSearchParams` compatibility**
- **Reason:** Next.js requires `useSearchParams` to be wrapped in a `<Suspense>` boundary during production builds. Without it, the build fails with "Missing Suspense boundary with useSearchParams" error.
- **Impact:** Added a `LoadingIndicator` component used as both the Suspense `fallback` and the component's internal loading state render. The exported `UnsubscribePage` wraps `UnsubscribeForm` (which uses `useSearchParams`) in `<Suspense>`.
- **Files modified:** `src/app/unsubscribe/page.tsx`
- **This is compliant with Next.js documented behavior and the pattern from `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`.**

### User Experience Enhancements

**2. Added "Unsubscribing..." button text during API call**
- **Reason:** While the plan shows `disabled={isUnsubscribing}` to prevent double-clicks, it didn't specify visual feedback during the API call. Added conditional text "Unsubscribing..." to give immediate feedback.
- **Files modified:** `src/app/unsubscribe/page.tsx`

No other deviations. Plan executed exactly as written.

## Threat Flags

None — all new code surfaces are covered by the plan's threat model (T-06-08 through T-06-11).

## Known Stubs

None — all states render with complete content, all API responses include proper messages, no placeholder values in production code paths.

## Self-Check: PASSED

- [x] `src/app/api/newsletter/unsubscribe/route.ts` exists
- [x] `src/app/unsubscribe/page.tsx` exists
- [x] Commit `b077cc5` exists in git log
- [x] Both files verified via `git show b077cc5`
