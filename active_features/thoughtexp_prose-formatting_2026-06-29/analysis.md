# Thought experiment — Formatting dense prose blocks (pa-orientation)

**Date:** 2026-06-29
**Decision:** How to turn long run-on prose fields (e.g. the 1071-char stone-former
`management` string) into scannable structure, applied across the Interactive
page's data-driven content.

**Scope reality:** the wall-of-text problem lives in the **JS data modules** (the
Interactive page renders each prose field as one `<div class="c-body">${string}</div>`).
~165 strings exceed 240 chars; several exceed 1000 (stones 1071, varicocele 1277,
nephron 1276). The 8 static HTML pages already use hand-authored `<p>` structure,
so "app-wide" really means **the Interactive page's prose fields**
(management, complaint, mechanism, note, anatomy, physiology, lesion, driver,
markers, treatmentNote, sections.body, …). Note: redFlags/workup/pearls are
already arrays rendered as lists — only the *prose* fields are walls.

Mockup (4 options rendered from the real stone text): [gallery.html](gallery.html)

## Options
- **A — Render-time heuristic.** No data edits; a helper splits on sentence + ALL-CAPS-label patterns and bolds the caps. One change, instant everywhere.
- **B — Authored markdown-subset.** Keep fields as strings but author paragraph breaks (`\n\n`) and bold labels (`**x**`); one shared `prose()` helper splits + bolds. Backward-compatible (no break → one paragraph, exactly as today).
- **C — Structured data.** `management` → `{lead, points:[{label,text}], caveat}`; renderer maps to a definition list. Richest schema.

## Pros / cons
### A — heuristic
+ Zero data edits; improves all blocks at once from one helper.
- Fragile on medical text: sentence-split mis-breaks "2–2.5 L", "S2–S4", "e.g.".
- Inconsistent: the CAPS-label trick fits the stone block but does nothing for narrative blocks (nephron physiology has no labels) and may mis-bold others.
- Wrong breaks/bolds can subtly shift clinical emphasis — risky to trust unattended.

### B — authored markdown-subset (\n\n + **bold**)
+ Always correct — the author places breaks, so no heuristic mis-fires.
+ One small shared helper (`escape → **bold** → \n\n split`) covers every prose field.
+ Backward-compatible: un-edited strings render identically to today → zero regression, so you can triage worst blocks first instead of a 165-string big bang.
+ Reproduces C's "labeled points" look via `**Calcium**` headers — no schema change.
+ Fields stay strings → search index `collect()` still works (just strip `**`/`\n` when indexing).
- You hand-edit the long strings (insert breaks, wrap labels). Mechanical, but real work.
- Introduces a tiny markup convention contributors must learn.

### C — structured data
+ Most semantic; enables per-point styling and future reuse (e.g. a "by stone type" table).
+ Consistent with existing array fields (redFlags/workup).
- Biggest churn: restructure ~165 fields + every renderer + any shape tests.
- Forces a schema/layout decision; on phone width the two-column list must abbreviate labels ("Calcium ox/phos") or collapse to label-above-text — at which point it *looks like B anyway*.
- String → object means the search builder's flatten still works, but each renderer needs rewriting.

## Fit check
- **Use:** PA/student on a phone, reading a management block to learn the reasoning. A lead sentence + bold-labelled chunks is the scannable shape; the mockup shows B and C both deliver it, A unreliably.
- **Authoring reality:** B = insert `\n\n` + `**` into the strings that need it (worst-first). C = restructure every field + rewrite renderers. A = no authoring but you must trust/verify a heuristic on 165 blocks, which is its own audit cost.
- **Pivot cost:** low/incremental for B (backward-compatible helper). High/all-at-once for C. A is cheap to add but expensive to trust.
- **Locked-in?** B's markup convention is the thing to commit to; it's a superset-friendly, reversible choice (strip the markup and you're back to plain strings).

## Recommendation: **B** (authored \n\n + **bold**, shared `prose()` helper)
1. It gives ~95% of C's readability for a fraction of the churn, and is **backward-compatible** so nothing regresses and you fix worst blocks first.
2. The bold-label convention reproduces C's labeled-points look **without a schema change**, keeping fields as strings (search index keeps working).
- Strongest counter — "you still hand-edit many strings" — doesn't dominate: the helper means un-touched strings are unchanged, so it's incremental triage, not a 165-string migration, and the edits are mechanical.

## Open questions to lock before /tdd
1. **Label style:** keep the loud ALL-CAPS emphasis (THIAZIDE, POTASSIUM CITRATE) or calm it to bold category headers only (**Calcium**, **Uric acid**) with drug names in normal case? *Default: calm — bold only the category labels.*
2. **How far this pass:** just the worst offenders (handful of >400-char blocks: stones, varicocele, nephron…) or sweep every long block now? *Default: worst-first; backward-compatible helper means the rest still render fine.*
3. **Bullets too?** add a `- ` bullet convention to the formatter, or paragraphs + bold only for now? *Default: paragraphs + bold only; add bullets later.*

## Out of scope (this pass)
- Restructuring array fields (already fine).
- Static HTML pages (already paragraphed).
- A full migration of all 165 strings in one go.
