# Plan — Prose formatting for the Interactive page (Option B)

**Date:** 2026-06-29
**Thought experiment:** [thoughtexp_prose-formatting_2026-06-29/analysis.md](thoughtexp_prose-formatting_2026-06-29/analysis.md) — chose **Option B** (authored `\n\n` + `**bold**`, shared `prose()` helper). User picked defaults: calm labels, worst-offenders-first, paragraphs+bold only.

> `/tdd` skill text targets batsignal (pytest/Postgres). This repo is a static site
> tested with **`node --test` (`*.test.mjs`)**. Contract adapted: plan + failing
> tests first + minimum impl + full suite green; no DB/migration/Playwright layer.

## Goal
Long prose fields on the Interactive page currently render as one
`<div class="c-body">${string}</div>` — a wall of text (stones 1071 ch, varicocele
1277, nephron 1276). Add a shared `prose()` mini-formatter that escapes HTML,
converts `**bold**` → `<b>`, and splits `\n\n` → `<p>` paragraphs
(backward-compatible: a string with no `\n\n` becomes one `<p>`, reading the same
as today minus the wrapping div semantics). Route the page's data-driven prose
c-body fields through it, and author breaks + bold category labels into the
worst-offender strings. Keep the search index clean (strip `**`, collapse `\n`).

## Test layer(s) chosen
- **node:test** for the pure formatter (`prose()`) and the search-index sanitisation.
- **Manual browser verification** (headless Chrome) for the rendered Interactive page.

## Architecture
- New `prose.js` — `export function prose(text)`:
  `escape → **bold** → split(/\n{2,}/) → <p>…</p>`. Browser-loadable + node-testable.
  Also export a `plain(text)` that strips `**` and collapses whitespace (for search).
- `Urinary Interactive.html` — import `prose`; wrap data-driven prose c-body fields
  (management, complaint, mechanism, note, anatomy, physiology, lesion, driver,
  markers, treatmentNote, usedIn, sections[].body, normal-teach fields, etc.).
  Do NOT wrap the page's own hard-coded c-body HTML (e.g. the storage/voiding line
  that already contains `<b>`), and do NOT double-wrap list fields.
- `search-index-build.mjs` — run prose fields through `plain()` (strip `**`,
  collapse `\n`) so snippets/labels stay clean; regenerate `search-index.json`.
- Data modules — insert `\n\n` + `**Label**` into the worst-offender strings.

## Task list
- [ ] **Slice 1** — `prose.js` + `prose.test.mjs`: escape, `**bold**`, `\n\n` paragraphs, backward-compat (no break → single `<p>`), and `plain()` strips markup. (node)
- [ ] **Slice 2** — wire `prose()` into the Interactive page's data-driven c-body fields; do not touch hard-coded HTML lines. (browser verify)
- [ ] **Slice 3** — search index: strip `**`/`\n` via `plain()`; update staleness; regenerate json. (node)
- [ ] **Slice 4** — author `\n\n` + `**bold**` into worst-offender strings (stones, varicocele, nephron + other >400-ch prose). (browser verify + regenerate index)

## Status log
- 2026-06-29 — plan written. Baseline 110/110.
- 2026-06-29 — slices 1-4 green. Full suite 124/124 (+14: prose 9, prose-authored 3, index-cleanliness 2). New files: prose.js, prose.test.mjs, prose-authored.test.mjs. Wired prose() into 13 Interactive c-body field sites + .c-body p/b CSS. search-index-build now sanitises via plain(); index regenerated (190 entries, clean).
- 2026-06-29 — authored worst-offenders: stones (the cited block), retention, renal_colic, chronic_pelvic_pain, luts, acute_scrotum, hematuria management; nephron physiology; varicocele treatment. Calm style (bold category labels, drugs normal case), no rewording — only \n\n + ** + case changes on labels. DOM-verified: stones management renders 6 <p> + 4 <b>.
- NOT YET DEPLOYED (awaiting user). Final click-test of the live page left to user.

## Follow-up (deferred — backward-compatible, render fine as single paragraphs meanwhile)
~44 wired prose fields >400ch remain unauthored (full list was 52; 8 done). Biggest
remaining: kidney.physiology (936), ar_axis.mechanism (887), urothelial_ca.treatmentNote
(836), urethra.physiology (749), checkpoint.mechanism (737), kidney.anatomy (719),
nephron.anatomy (705), bladder.physiology (648), sphincters.physiology (638), plus
oncology mechanisms, andrology/trauma sections, remaining normal physiology/anatomy.
Also NOT wired this pass: clinical.js fields (history/exam/labs/imaging/treatment —
76 blocks >240ch) render in the .wrow grid, not c-body; would need a grid-cell
wrapper variant. Re-run `node search-index-build.mjs` after any authoring.

## Out of scope
- Bullet (`- `) convention — paragraphs + bold only this pass.
- Restructuring fields into arrays/objects (Option C).
- Static HTML pages (already paragraphed).
- A full sweep of all 165 long strings — worst offenders first; helper is backward-compatible so the rest render fine.
