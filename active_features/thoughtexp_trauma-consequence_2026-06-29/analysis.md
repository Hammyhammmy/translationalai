# Thought experiment — should the Trauma figure show the consequence? (2026-06-29)

Receipts: [gallery.html](gallery.html) — view at `localhost:8001/active_features/thoughtexp_trauma-consequence_2026-06-29/gallery.html`.
Supersedes the freeze-only direction in [trauma-figure](../thoughtexp_trauma-figure_2026-06-29/analysis.md) (Option B, shipped).

## The decision
The shipped freeze (dimmed anatomy + organ ring) localizes but doesn't teach — user: "the pictures don't
help unless we show consequences like haematuria." So: should the Trauma figure draw the **clinical sign**
(haematuria, urine leak, blood at the meatus, haematocele) instead of just spotlighting the organ?

## Reframe that changes the cost math
The injuries are *defined by their signs*, and the signs are spatial → drawable. And the page **already owns
the primitives**: the conditions tab animates red "blood" dots flowing from a bleeding station downward
(`state.particleColor='blood'`, `particleColorFrom`), plus blush circles (`inflamed`/`mass`) and the
`drawLabel` callout engine. "Blood in the urine from the injured kidney down" is therefore a *reuse*, not new
art. Note the distinction from last round: **clear** urine flowing past a wrecked kidney = nonsense (we froze
it); **bloody** flow from the lesion = the actual teaching.

## Options
- **A — Consequence via the existing engine.** Per trauma topic, a small descriptor drives: a blush + marker at
  the injured organ, the red blood-dot stream (where there's haematuria), and a plain-word callout. Urethral
  gets a "blood at meatus" marker + high-riding prostate + the ⛔ "don't catheterise" rule. Reuses blood-flow +
  blush + drawLabel. ~1 evening + a 4-row map.
- **B — Bespoke per-injury illustrations.** Hand-draw each scene properly (laceration wedges, urinoma, extra-
  vs intraperitoneal leak patterns, AAST grade ladder, disrupted tunica). Richest, most accurate, most work —
  reopens the per-condition art line the prior pass rejected.
- **C — Suppress the figure on trauma.** Text-only, full width. Concede the figure can't teach trauma.

## Pros / cons

### A — Consequence (reuse)
- ✓ The figure now shows the **sign you diagnose on**, not just a location — the thing the user asked for.
- ✓ Cheap: reuses blood-flow, blush, and callout already in the file; new data is a ~4-row map.
- ✓ Carries trauma's signature traps visually: "haematuria may be scant (blood ≠ grade)", "⛔ don't catheterise".
- ✓ One visual language with the conditions tab (red bleed dots mean the same thing everywhere).
- ✗ The blood-stream slightly *overstates* renal trauma (can be blood-free) — must be hedged in the callout, or
  drawn faint/intermittent, or it teaches the wrong confidence.
- ✗ Testicular has no haematuria → still needs a bespoke-ish scrotal glyph (haematocele), so A isn't 100% uniform.
- ✗ Urethral's "high-riding prostate" is a DRE finding, not something urine-flow shows — needs a small drawn cue.

### B — Bespoke art
- ✓ Most accurate; can show extra- vs intraperitoneal, grade, urinoma — real radiology-grade teaching.
- ✗ Authoring cost the prior thought experiment explicitly rejected; 4 hand-built scenes to keep visually consistent.
- ✗ Diminishing returns over A for a phone-scanning audience: a PA needs "blood at meatus → don't cath", not a grade-IV diagram.

### C — Suppress
- ✓ Honest and free.
- ✗ A retreat: we'd be saying the model — whose whole pitch is "see where it goes wrong" — gives up exactly where
  the signs are most visual. Weakest fit with the page's purpose.

## Fit check
- **Use:** PA/student on a phone, localizing an injury and grabbing the one rule that saves the patient
  (don't catheterise a suspected urethral tear; delayed-phase CT; explore a ruptured testis). The figure should
  make the **sign + the rule** unmissable. That's A.
- **Authoring reality:** A ≈ 1 evening + 4-row map; B ≈ 2–3 evenings; C ≈ minutes.
- **Pivot cost:** A *builds on* the shipped freeze (dim + frozen clear-flow stays; we add the red consequence on
  top). Nothing is undone. B also builds on freeze. C deletes the freeze work for trauma.
- **Reversible?** Fully. A degrades to the current freeze if a topic's descriptor is omitted.

## Recommendation — **A (consequence via the existing engine)**
1. It delivers exactly what the user identified as the missing value — the figure shows the **sign**, not a
   location — at reuse cost, because the blood-flow/blush/callout machinery already exists.
2. It keeps one visual language across the whole model and lets the high-stakes rules ("⛔ don't catheterise",
   "blood ≠ severity") land visually, which is what a scanning clinician actually needs.

Strongest argument against A is accuracy (the red stream can overstate renal haematuria, and testis/prostate
need small drawn cues, so it's not a pure reuse). It doesn't dominate: the callout hedges the renal trap in words,
and the 2–3 small glyphs are far cheaper than B's full scenes. If accuracy turns out to matter more than scan-speed
on review, B is the upgrade path — but A first.

## Open questions to lock before code moves
1. **How loud should the haematuria be, given it can be absent?** (a) confident red stream + a "may be scant"
   caption, or (b) faint/intermittent red dots to signal "variable". *My default: (a) — bold stream, hedge in the
   caption; the caption IS the teaching point.*
2. **Do the non-haematuria signs get small drawn cues?** i.e. blood-at-meatus marker, high-riding prostate nudge,
   scrotal haematocele — these are tiny bespoke glyphs, not full scenes. Yes/no. *My default: yes — they're the
   most distinctive teaching (esp. the urethral "don't catheterise"), and they're small.*

## Outcome — 2026-06-29 — Option A shipped (both defaults: loud haematuria + caption; yes to glyphs)
- **Data (TDD):** `TRAUMA_FIGURE` map exported from `urinary-trauma.js` — `{mark, blood?, leak?, meatusBlood?,
  highRiding?, haematocele?, callout:[2]}` per topic. New tests in `urinary-trauma.test.mjs` assert every topic
  has a descriptor with a valid `mark`, a 2-line callout, an upper-tract `mark` where `blood`, and that the
  urethral overlay carries the ⛔ don't-catheterise rule. Suite green (119/119).
- **Render (visual):** `drawTrauma(lz,bp)` in `Urinary Interactive.html` reuses the conduit path (`samp`/`nf`),
  blush, `drawLabel` callout + leader. Renal → red haematuria stream from kidney down; bladder → urine droplets
  escaping; urethral → blood-at-meatus marker + high-riding-prostate arrow + callout; testis → dark haematocele.
  Replaces the bare blue ring; builds on the shipped freeze (clear-flow stays off, base stays dimmed).
- Verified by test + syntax check; visual confirmation pending in-browser on :8001.
