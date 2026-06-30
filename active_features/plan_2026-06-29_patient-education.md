# Plan — Patient-education block per concept (Option B)

**Date:** 2026-06-29
**Thought experiment:** [thoughtexp_patient-education_2026-06-29/analysis.md](thoughtexp_patient-education_2026-06-29/analysis.md) — Option B, impersonal "the…" voice, class-first specificity, GENERIC-ONLY (no brands), named procedures, safety footer, copy button.

> `/tdd` skill targets batsignal (pytest/Postgres). This repo is a static site
> tested with **`node --test`**. Adapted: plan + failing tests first + min impl +
> full suite green; no DB/migration/Playwright.

## Goal
Add an optional `patient` field to teaching entries — a plain-language, patient-facing
explainer in a labelled block ("In plain words"), rendered as a green card next to
teaching pearls, with a Copy button that yields clean pasteable text. Reuses the
`prose()`/`plain()` helpers shipped earlier. Backward-compatible: absent field → no
block. Wire BPH end-to-end as the worked example, then scale the writing later.

## Locked style
- **Structure (Option B):** disease variant — *What it is / Why it matters / What is
  done / What to watch for*; normal-anatomy variant — *What it is / What it does /
  How it is kept well / What to watch for*.
- **Voice:** impersonal ("The prostate…"), not "your".
- **Specificity:** class-first; a specific generic only where one agent dominates;
  procedures named; **generic-only (no brand names)**.
- Bold (`**…**`) marks the googleable handles; copy strips it.

## Where the field lives
- Conditions: `CLINICAL[id].patient` (bph's teaching content is in urinary-clinical.js).
- Presentations: `PRESENTATIONS[id].patient`.
- (Oncology/andrology/normal later.)

## Architecture
- New `patient.js` — `patientHTML(patient)` (ordered labelled `<dl>` + footer + Copy
  button, each value via `prose()`); `patientCopyText(patient)` ("Label: text" lines
  via `plain()`). Ordered label map handles both variants (absent keys skipped).
- `Urinary Interactive.html` — render `patientHTML` in renderCond (from `clinicalFor`)
  and renderPres; wire `.pat-copy` click → `navigator.clipboard.writeText(patientCopyText(...))`; add `.patient` card CSS.
- `urinary-clinical.js` — author `CLINICAL.bph.patient` (worked example).
- `search-index-build.mjs` — include conditions' `patient` text (merge `clinicalFor(id).patient` into the indexed object) via existing `plain()` sanitisation; regenerate json.

## Task list
- [ ] **Slice 1** — `patient.js` (`patientHTML` + `patientCopyText`) + `patient.test.mjs`: ordered labels both variants, `**bold**` renders, copy text is clean "Label: text", empty→''. (node)
- [ ] **Slice 2** — author `CLINICAL.bph.patient`; render the green card + Copy button in renderCond; `.patient` CSS. (browser verify)
- [ ] **Slice 3** — search index includes conditions' patient text; regenerate; staleness green. (node)

## Status log
- 2026-06-29 — plan written. Baseline 124/124.
- 2026-06-29 — slices 1-3 green. Full suite 132/132 (+8: patient 7, index 1). New: patient.js, patient.test.mjs. Wired patientHTML/patientCopyText + wireCopy into renderCond; .patient CSS. Authored CLINICAL.bph.patient (worked example). search-index-build merges clinicalFor(id).patient into conditions entries; index regenerated (190). DOM-verified card (4 labels, bold handles, copy button, footer); bph patient text searchable.
- 2026-06-29 — SIGNED OFF ("ship it"). Wired all five render fns (cond/pres/onc/andro/trauma/normal) + wireCopy. Two parallel agents authored patient blocks: 31 conditions (urinary-clinical.js) + 11 presentations (urinary-presentations.js), derived from existing clinical content. Coverage guard (patient-coverage.test.mjs) green: all 32 conditions + 11 presentations covered. Audit: 0 brand names, 0 "you/your" leaks. Index regenerated. Full suite 134/134. Browser smoke-test: cards render on condition + presentation tabs. Conditions+presentations DONE.

## Next (future pass)
Oncology / andrology / trauma / normal patient blocks (render is already wired; normal
uses the adapted variant whatItDoes/howKeptWell). Author into ONCOLOGY/ANDROLOGY/
TRAUMA/NORMAL_TEACH[id].patient, regenerate index.

## Out of scope
- Writing patient blocks beyond BPH (scale after sign-off; conditions + presentations first).
- Print/PDF handout, translations, reading-level automation.
- Indexing the full clinical workup (history/exam/…) — only `patient` this pass.
