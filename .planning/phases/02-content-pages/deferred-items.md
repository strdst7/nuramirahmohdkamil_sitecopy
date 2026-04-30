# Deferred Items — Phase 2 Content Pages

## Pre-existing TypeScript Errors (out of scope for plan 02-02)

Discovered during plan 02-02 execution. These are in files modified by plan 02-01 (portfolio page) and are not caused by 02-02 changes.

| File | Line | Error | Description |
|------|------|-------|-------------|
| `src/app/portfolio/page.tsx` | 35 | TS2322 | `CSSProperties` not assignable to `MixBlendMode` |
| `src/app/portfolio/page.tsx` | 183 | TS2322 | `CSSProperties` not assignable to `AnimationDuration` |
| `src/app/portfolio/page.tsx` | 188 | TS2322 | `36` not assignable to `20 \| 24 \| 32 \| 48` (Icon size) |

These should be fixed when the portfolio plan (02-03) executes.
