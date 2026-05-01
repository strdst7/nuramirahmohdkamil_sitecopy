---
phase: 03-ai-playground
plan: 01
subsystem: API routes
tags: [api, openai, gemini, security, proxy]
requires:
  - OPENAI_API_KEY (env var)
  - GEMINI_API_KEY (env var)
provides:
  - POST /api/ai/openai
  - POST /api/ai/gemini
affects:
  - src/app/api/ai/
tech-stack:
  added:
    - openai (OpenAI Node.js SDK)
    - "@google/generative-ai" (Google AI SDK)
patterns:
  - Next.js App Router API route handlers (route.ts)
  - Server-Sent Events (SSE) streaming for OpenAI
  - JSON response for Gemini multimodal
key-files:
  created:
    - src/app/api/ai/openai/route.ts
    - src/app/api/ai/gemini/route.ts
    - .env.example
  modified:
    - package.json
    - package-lock.json
key-decisions:
  - "OpenAI default model: gpt-4o-mini (overridable via OPENAI_MODEL env var)"
  - "Gemini default model: gemini-2.0-flash (overridable via GEMINI_MODEL env var)"
  - "Temperature clamped per-model: 0-2 for OpenAI, 0-1 for Gemini"
  - "API keys accessed exclusively via process.env in server-only route handlers"
  - "OpenAI uses SSE streaming; Gemini returns JSON (no native streaming with multimodal)"
requirements-completed:
  - PLAY-01
  - PLAY-02
  - PLAY-05
duration: 5 min
completed: 2026-05-01
---

# Phase 3 Plan 01: API Routes Summary

**OpenAI + Gemini proxy routes with streaming, multimodal support, and zero-leak API key security.**

## What Was Built

Two Next.js API route handlers that proxy AI calls to external providers, keeping API keys server-side only.

### POST /api/ai/openai
- Streaming SSE text generation via OpenAI chat completions API
- Model: `gpt-4o-mini` default, overridable via `OPENAI_MODEL`
- Temperature: client-supplied, clamped 0-2
- Response: `text/event-stream` with `data: {"content": "..."}\n\n` chunks and `data: [DONE]\n\n` termination
- Error handling: 400 (bad prompt), 401 (invalid key), 429 (rate limit), 500 (server)

### POST /api/ai/gemini
- Multimodal analysis via Google Generative AI SDK
- Model: `gemini-2.0-flash` default, overridable via `GEMINI_MODEL`
- Temperature: client-supplied, clamped 0-1
- Image input: base64 with MIME prefix, extracted server-side for `inlineData`
- Text-only fallback when no image provided
- Response: JSON `{ content: "..." }`
- Error handling: mirrors OpenAI route pattern

### Security (PLAY-05)
- All API keys accessed via `process.env` — never hardcoded or client-exposed
- `.env.example` documents required keys with placeholders
- Bundle audit confirmed zero key leakage to client JavaScript
- `.gitignore` already covers `.env*.local` — no risk of accidental commits

## Deviations from Plan

None — plan executed exactly as written.

## Tasks Completed

| # | Task | Status |
|---|------|--------|
| 1 | Install openai + @google/generative-ai, create .env.example | ✓ |
| 2 | Create POST /api/ai/openai streaming route | ✓ |
| 3 | Create POST /api/ai/gemini multimodal route | ✓ |
| 4 | Verify zero API key leakage in client bundle | ✓ |

## Self-Check: PASSED

- TypeScript compilation: zero errors
- All 9+10+5 acceptance criteria passed across tasks
- No API key literals in any source file
- No `process.env` references in `.tsx` client component files
