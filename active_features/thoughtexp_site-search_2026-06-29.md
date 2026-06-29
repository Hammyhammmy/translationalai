# Thought experiment — Site-wide search bar (PA orientation)

**Date:** 2026-06-29
**Decision:** How should a search box that spans all nav tabs get its content and
deep-link to results, on a no-build static site whose content is split between 8
HTML prose pages and 1 JS-data-driven Interactive page?

## Key constraints (from the code)
- Pure static site: GitHub → Cloudflare → translational.ca. No server, no build
  step today (package.json only marks ES modules for node tests).
- `nav.js` is injected on every page — natural host for the search UI.
- Static pages (Consults etc.) have **0 `id`s/anchors** → deep-linking isn't free.
- Interactive page content is **not in its served HTML** — rendered at runtime
  from JS modules (urinary-presentations.js, urinary-oncology.js, …). So plain
  page-scraping misses the richest content.

## Options
- **A — Generated full-text index.** One-file Node script imports the JS data
  modules + scrapes HTML headings/prose into committed `search-index.json`.
  Nav loads it, fuzzy in-memory match. Deep links via URL text fragments
  (`#:~:text=`) for static pages (no HTML edits) + query param (`?case=priapism`)
  for the Interactive page.
- **B — Runtime fetch & scrape (zero build).** No index; fetch all 9 pages on
  first search and search live.
- **C — Curated keyword index.** Hand-authored `search-entries.js` with synonyms.

## Pros / cons
### A — Generated index
+ Best recall over real content (body-text phrases match).
+ Authored snippets from structured JS data, not scrapings.
+ Fast on phone: one small JSON, then instant.
+ No edits to 8 HTML files (text fragments).
+ Index is git-reviewable and testable (assert every case indexed).
- Staleness — needs regen; defuse with a source-hash staleness test.
- Adds a build step to a no-build site.
- Text fragments degrade on old browsers; Interactive needs query-param path.
- Ranking: ~6KB dep (Fuse.js) or hand-rolled scorer to own.

### B — Runtime fetch & scrape
+ Zero build, never stale.
- Slow/heavy first search (~9 files, ~300KB) on the exact mobile/wifi case.
- Misses Interactive data (not in HTML) → forces importing JS anyway = half of A.
- Ugly snippets (boilerplate noise); breaks on local file:// (CORS).

### C — Curated keyword index
+ Highest precision, clinician-controlled; encodes abbreviations (BPH/TURP/PSA).
- Manual labor scaling with a growing catalog.
- Poor recall — only matches entered terms; erodes trust in the box.
- Drifts silently unless validated.

## Fit check
- Use: PA/student, phone, between cases, types symptom/drug/condition → jump to
  spot. Needs recall + mobile speed + working deep link → favors A.
- Structured JS data is a gift to A, irrelevant/harmful to B.
- Pivot cost low: additive, hosted in nav.js, reversible.
- Locked-in part: index format + deep-link strategy (UI is throwaway).

## Recommendation: A, with a pinch of C
Only option giving good recall over rich content without hand-maintaining a
parallel index; structured data makes generation clean. Fastest on device.
The "adds a build step" objection is defused by a one-file node script in the
existing test toolchain + a staleness test. Fold in a small curated synonym map
(gross/visible/macroscopic → haematuria; BPH/TURP/PSA) for C's precision win.

## Open questions to lock before /tdd
1. Deep-link landing: highlight exact sentence (text fragments, auto-fallback to
   page top) vs. just open page top. Default: highlight + fallback.
2. v1 scope: index everything now (8 pages + Interactive data) vs. start with
   Interactive data + page titles. Default: index everything.
3. Synonyms: seed a small medical-synonym map now vs. raw text only.
   Default: seed it.
