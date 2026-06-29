# Plan — Make the interactive figure earn its place (2026-06-29)

Decided via `/thoughtexperiment` → [analysis](thoughtexp_figure-relevance_2026-06-29/analysis.md) + [mockup](thoughtexp_figure-relevance_2026-06-29/gallery.html).
User approved **Option A (sharpen) + Option C (suppress)**, skip B (bespoke). Prostatitis split folded in.

## Goal
The shared anatomy figure currently shows the same faded picture for almost every condition with a
faint marker, so it reads as decoration (user receipts: interstitial cystitis, male infertility).
Two changes: (A) where the figure DOES teach, make the defect unmistakable — dim the irrelevant
anatomy, spotlight + boldly label the lesion and its consequence; (C) where the model has nothing
spatial to point at, suppress it so content gets the full width. Plus split `prostatitis` into
acute-bacterial (infection) and chronic/CPPS (inflammation), the male mirror of interstitial cystitis.

## Test layer
`node --test` (node:test), the existing suite for `blog/pa-orientation/urinary-*.js`. Data/predicate
logic is unit-tested (prostatitis split, suppress predicate). The sharpen treatment is SVG/DOM
rendering inside `Urinary Interactive.html` → not node-unit-testable; verified visually in-browser.

## Tasks
- [x] **Slice 1 — Prostatitis split (data, TDD).** `prostatitis` → *Acute bacterial prostatitis*
  (infection, keep id); add `cpps` = *Chronic prostatitis / CPPS* (inflammation, urethra, sterile,
  `noFigure`). CLINICAL entry for `cpps`; retune `prostatitis` clinical to acute. Point the Chronic
  pelvic pain presentation differential at `cpps`.
- [ ] **Slice 2 — Suppress predicate (pure fn, TDD).** New `urinary-figure.js` exporting
  `showsFigure({tab, entry, hasImage})` as the single source of truth. Add `noFigure:true` to
  `interstitial_cystitis`, `cpps`, and andrology `infertility`. Unit-test the predicate; wire it into
  `render()` to replace the inline `hideFig` expression.
- [ ] **Slice 3 — Sharpen overlay (SVG/JS, manual verify).** In `drawModel()`/`render()`: dim the
  base to ~0.3 + spotlight vignette when a condition is selected; loud pulsing lesion marker with a
  plain-word callout + leader line driven from `XY[lesionStation]`; louder dilation glow + a
  "back-pressure ↑" tag; faint "quiet below" downstream hint. Verify in browser.

## Out of scope (this pass)
- Presentations-tab figures (region highlight is mild, user didn't flag) — leave as-is.
- Neurogenic/functional conditions keep the model (the innervation/storage-voiding animation is
  deliberate teaching there — not decoration).
- Per-condition bespoke art (Option B — rejected).

## Status log
- 2026-06-29 — plan opened; andrology read shows only `infertility` mis-shows the figure (6/8 already
  suppressed via null region). Starting Slice 1.
