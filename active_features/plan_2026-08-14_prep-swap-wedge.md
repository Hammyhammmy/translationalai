# Plan — apply prep-swap wedge + adaptive-history moat to live index.html

_2026-08-14 · /tdd · from [thoughtexp_prep-swap-wedge_2026-08-14.md](thoughtexp_prep-swap-wedge_2026-08-14.md) + [mockup](mockup_prep-swap-wedge_2026-08-14.html)_

## Goal
Make the live `index.html` lead with the task-swap wedge ("Chart prep, without the prep work") and elevate the
already-present-but-flat adaptive-history capability into a defensible moat (form-vs-generated contrast, Ocean
implied). Keep ChartPrepper name, rust `[ • ]` mark, existing palette. No Teams rebrand, no scribe framing,
no human-replacement framing.

## Reality check vs mockup (important)
- Live hero ≠ mockup hero. Live H1 (index.html:87) = provenance ("Every sentence in the note points back at
  the record") + animated Sources→Note demo. Polished, shipping. → **hero integration is a user decision.**
- The moat capability ALREADY exists at index.html:360-383 ("The whole pre-visit workflow" → "The patient
  fills the gaps before they arrive… reads the referral, works out what's missing… builds a questionnaire").
  It's flat, patient-only, no form contrast. → **reframe/elevate, do NOT add a duplicate section.**

## Test layer
Static HTML site, no pytest/Playwright harness. TDD-in-spirit: a lightweight assertion check (grep-level)
over `index.html` asserting required copy present / forbidden copy absent, run red→green. Plus manual browser
read. No fabricated app-test infra.

## Task list
- [x] Assertion check written + failing (5/7 red pre-implementation) — tests/test_index_copy.py
- [x] Hero: swap wedge H1 "Chart prep, without the prep work" + provenance kept as subhead + reframed manual-prep chip (Option A)
- [x] Moat: new form-vs-generated contrast section inserted before #platform (Ocean implied); existing workflow card de-duplicated + team-credited
- [x] Byline: contributor byline rendered + labeled "ships with the app update"
- [x] Assertion check green (7/7); no "ChartPrepper Teams" / no "Ocean" / no human-replacement framing
- [x] HTML tag balance clean (14/14 sections); opened in browser

## Lock before code (hero fork) — RESOLVED
User chose Option A: swap leads, provenance right below, animated demo unchanged.

## Out of scope
- Contributor byline that names a *specific* staffer (needs app `data.contributors[]` — deferred).
- Any Teams wordmark / rail tab / seats-pricing.
- Other pages (in-use, case-studies, team, etc.) — index.html only this pass.

## Status log
- 2026-08-14 — plan opened; read live index.html; found hero divergence + pre-existing flat moat. Awaiting hero call.
- 2026-08-14 — hero fork resolved (Option A). All slices landed: hero + chip, moat contrast section, byline (gated), workflow card de-dup. tests/test_index_copy.py 7/7 green. HTML balanced. NOT committed (awaiting user review). Next: user eyeballs browser; commit on request.
