# Plan — Site-wide search (PA orientation)

**Date:** 2026-06-29
**Thought experiment:** [thoughtexp_site-search_2026-06-29.md](thoughtexp_site-search_2026-06-29.md) — chose **Option A** (generated full-text index) + pinch of curated synonyms.

> Note: the `/tdd` skill text targets the *batsignal* project (pytest/Postgres/Playwright).
> This is a different repo — a static site tested with **`node --test` (`*.test.mjs`)**.
> Contract adapted: plan file + failing tests first + minimum impl + full suite green,
> but tests are node:test and there is no DB/migration/Playwright layer.

## Goal
Add a search box to the site nav ribbon (`nav.js`) that appears on every page and
searches across all 9 nav tabs. It loads a committed `search-index.json` generated
from source by a Node script, fuzzy-matches client-side, and deep-links to results:
**text fragments** (`#:~:text=`) into the 8 static prose pages, and a
**`?tab=&id=` query param** into the JS-driven Interactive page. A staleness test
fails the build if the committed index drifts from its sources.

## Test layer(s) chosen
- **node:test (`*.test.mjs`)** for all pure logic: index generation/coverage,
  staleness, search scoring, snippet, synonym expansion.
- **Manual browser verification** for DOM wiring (nav injection, fetch, the
  Interactive page's on-load jump) — repo has no jsdom/Playwright and adding one
  is out of scope.

## Architecture
- `search-synonyms.js` — small curated map (gross/visible/macroscopic→haematuria; BPH/TURP/PSA…). Plain ES module, imported by both builder and browser core.
- `search-core.js` — pure `searchIndex(list, q, syn)` + `snippet(text, terms)`. Browser-loadable AND node-testable. Lifts the scoring/snippet logic that already lives inline in `Urinary Interactive.html` (lines 380-418).
- `search-index-build.mjs` — `buildIndex()` returns the entry array (reads HTML + imports JS data modules); run as main → writes `search-index.json`. Reuses the existing `sCollect/sIdx` collection idea for Interactive entries.
- `search-index.json` — committed artifact the browser fetches.
- `nav.js` — inject search input + results dropdown into the ribbon; fetch index once; use `search-core`; navigate to `entry.href` on select.
- `Urinary Interactive.html` — read `?tab=&id=` on load → select tab+entry (reuse existing `sGo` path).

## Task list
- [ ] **Slice 1** — `buildIndex()` covers Interactive structured data (6 sub-tabs) with valid `?tab=&id=` hrefs. Test: `search-index.test.mjs`.
- [ ] **Slice 2** — `buildIndex()` also scrapes the 8 static HTML pages (heading → section text) with `#:~:text=` hrefs. Test: each static page contributes ≥1 entry, known heading present.
- [ ] **Slice 3** — commit `search-index.json`; staleness test: `buildIndex()` deep-equals the committed file.
- [ ] **Slice 4** — `search-core.js` pure scoring + snippet + synonym expansion. Test: `search-core.test.mjs` (exact-label wins; synonym hit; multi-term; snippet windows). Then wire into `nav.js` (manual verify).
- [ ] **Slice 5** — Interactive page reads `?tab=&id=` on load and jumps (manual verify); generator-side test already guarantees hrefs are valid (tab,id) pairs.

## Status log
- 2026-06-29 — baseline 86/86 green (node v20.13.1). Plan written. Starting slice 1.
- 2026-06-29 — slices 1-5 all green. Full suite 108/108 (added 22: 10 index + 1 staleness + 7 core + 4 deeplink). Files: search-index-build.mjs, search-core.js, search-synonyms.js, search-deeplink.js, search-index.json (190 entries), + nav.js & Urinary Interactive.html wiring.
- 2026-06-29 — browser-verified via headless Chrome (extension/puppeteer unavailable): nav button+palette inject on static pages; in-browser module-load + index-fetch + scoring (priapism, gross→haematuria synonym, tamsulosin, "renal colic"); deep-link `?tab=conditions&id=bph` renders full BPH detail in #content. Search button screenshot looks right.
- Boxes 1-5 all checked. NOT YET DEPLOYED (awaiting user). Final manual click-test of the dropdown open/type/navigate left to the user (headless can't drive the click without the extension).

## Out of scope
- Unifying / removing the existing in-page search on the Interactive page (it stays; minor redundancy with the global box). Revisit later.
- jsdom/Playwright DOM test harness.
- Fuzzy/typo tolerance beyond substring + synonyms (no Levenshtein in v1).
- Indexing the Atlas image captions beyond page headings.
