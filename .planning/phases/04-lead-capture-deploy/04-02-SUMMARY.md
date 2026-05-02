---
phase: 04-lead-capture-deploy
plan: 02
subsystem: Frontend
tags: [ui, form, component, validation, lead-capture]
requires:
  - "@/components/GlassPanel"
  - "@/components/DripBorder"
  - "@/components/PulseButton"
  - "@/components/Icon"
  - POST /api/leads (04-01)
provides:
  - LeadCaptureForm component
affects:
  - src/components/LeadCaptureForm.tsx
  - src/components/Icon.tsx
tech-stack:
  added: []
patterns:
  - Client Component with useState/useCallback
  - Client-side validation on submit (regex)
  - GlassPanel + DripBorder + PulseButton Surrealist Echoes composition
key-files:
  created:
    - src/components/LeadCaptureForm.tsx
  modified:
    - src/components/Icon.tsx
key-decisions:
  - "Client-side validation via regex on submit (mirrors server-side Zod schema)"
  - "Optional fields send undefined (not empty string) to match API .or(z.literal(''))"
  - "Success state: GlassPanel with amber glow, check_circle icon, poetic confirmation text"
  - "Icon size extended to 14-48px range"
requirements-completed:
  - LEAD-01
  - LEAD-03
duration: 5 min
completed: 2026-05-01
---

# Phase 4 Plan 02: LeadCaptureForm Summary

**Surrealist Echoes styled lead capture form with 4 fields, client-side validation, API submission, and success/error states.**

## What Was Built
- `LeadCaptureForm` Client Component with 4 fields (project_name, email, whatsapp, intent select)
- Client-side validation on submit with inline error messages
- Surrealist Echoes styling: GlassPanel wrapper, DripBorder inputs, PulseButton submit
- Success state: GlassPanel with amber glow, check_circle icon, reset button
- Server error state: error bar with pest_control icon, dismiss button
- 6 new icon names added to IconName type (send, mail, chat, flag, check_circle, person)
- Icon size type extended from 20-48 to 14-48

## Deviations
| # | Type | Detail |
|---|------|--------|
| 1 | Rule 1 (type fix) | Icon size 18 needed by LeadCaptureForm — added to union type |
| 2 | Rule 1 (zod v4) | Zod enum `errorMap` → `message` (zod v4 API change applied to API route; form uses client-side regex, unaffected) |

## Self-Check: PASSED

- TypeScript: zero errors
- 4 form fields render correctly
- Validation triggers on submit
- Success/error states work
- No process.env in client component
