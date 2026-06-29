# Thought experiment — what should the Trauma-tab figure show? (2026-06-29)

Receipts: [gallery.html](gallery.html) (view at `localhost:8001/active_features/thoughtexp_trauma-figure_2026-06-29/gallery.html`).
Builds on the prior [figure-relevance decision](../thoughtexp_figure-relevance_2026-06-29/analysis.md), which adopted
**"suppress where non-spatial, sharpen where it teaches"** and **rejected bespoke per-condition art**.

## The decision
The Trauma tab was out of scope in the last pass, so its four topics still run the **Normal-physiology
flow animation** — urine droplets stream calmly down the whole tract, past a faint circle on the
injured organ. For "renal trauma" that reads as nonsense. What should the figure do on Trauma?

## Options
- **A — Suppress.** Hide the figure on Trauma; text gets full width (same as CPPS / IC / infertility today).
- **B — Freeze.** Stop the flow animation on Trauma, dim the base, keep a spotlight + region highlight. No injury art.
- **C — Sharpen.** Freeze + dim + spotlight, **and** mark the injury with a plain-word callout driven by a small
  per-topic string map (`kidney lacerated · leak`), reusing the existing `drawLabel`/leader-line engine from the
  conditions tab. Not bespoke per-organ illustration.

(The "do nothing" current state is the ✗ baseline — everyone agrees the flowing pee has to go.)

## Pros / cons

### A — Suppress
- ✓ Almost free: one branch in `showsFigure()`.
- ✓ Honest — an empty-looking diagram is worse than none.
- ✗ Trauma is the *most* spatial topic in the whole model: renal vs bladder vs urethral vs testicular IS the
  teaching. Suppressing throws that away.
- ✗ Inconsistent: the framework says *suppress when there's nothing spatial to point at* — but here there is.

### B — Freeze
- ✓ Kills the misleading animation (the actual bug) with minimal work.
- ✓ Keeps the spatial anchor — you still see which organ.
- ✗ End state is a greyed picture with a blue circle: localizes but doesn't say *injury*. Low teaching payload.
- ✗ Leaves the figure feeling like decoration — the same complaint that started the last thought experiment.

### C — Sharpen
- ✓ The injury becomes the loudest thing on screen, sited exactly, named in plain words.
- ✓ Directly consistent with the conditions-tab treatment already shipped — one visual language across tabs.
- ✓ Reuses `drawLabel` + leader line + vignette already in the file; the only new data is a 4-entry callout map
  (`renal→['kidney lacerated','leak — blood may be scant']`, bladder/urethra/testis likewise).
- ✓ Lets trauma's signature teaching twist land visually (e.g. "blood may be scant" for renal).
- ✗ Most work of the three — needs the trauma render path to drive the overlay from `TRAUMA[selT].region`
  (trauma topics don't go through `evaluateCase`, so it's new wiring, ~an evening).
- ✗ The injury glyph (a small jagged laceration / extravasation blush) is light per-organ art — a soft brush
  against the "no bespoke art" line. Mitigation: keep it to a generic red marker + blush + callout, not a drawn
  organ-specific picture, so it stays engine-driven.

## Fit check
- **Use:** PAs/students on a phone, scanning to localize an injury to a station and grab the golden rule. The
  figure's job is "where + what," fast. That argues for the spatial anchor staying (against A) and for the
  injury being legible at a glance (toward C).
- **Authoring reality:** A ≈ free, B ≈ trivial, C ≈ one evening + a 4-line map. None is heavy.
- **Pivot cost:** zero rework — all three only touch the Trauma branch of `render()`/`drawModel()` and
  `showsFigure()`. Nothing shipped is undone.
- **Reversible?** Fully. And C degrades to B for free if a callout is omitted.

## Recommendation — **C (sharpen)**, with **B as the cheap fallback**
1. Trauma is the most spatial topic in the model; the figure should do its strongest work here, not be dropped (kills A).
2. It reuses the exact lesion-callout language the conditions tab already ships, so the whole model reads as one
   thing instead of "the tab where the diagram is a grey circle" (B's weakness).

Strongest argument against C is the "no bespoke art" precedent — but C stays inside the rejected line by using the
**generic** marker+blush+callout engine, not a hand-drawn per-organ picture. If even the small laceration glyph
feels over-line, fall back to B (freeze + spotlight + callout, no glyph) — still fixes the actual bug.

The one non-negotiable, shared by A/B/C: **freeze the flow animation on Trauma.** That's the bug.

## Open questions to lock before code moves
1. **How much should the trauma figure show?** (a) Just stop the misleading flow and spotlight the organ
   [Freeze]; (b) also stamp the injury with a red marker + plain label like "kidney lacerated · leak" [Sharpen].
   *My default: (b) Sharpen — same as the conditions tab, one evening. Override to (a) if you want it minimal.*
2. **Should the andrology/presentations figures get the same freeze?** They reuse the same animation and may read
   the same way. *My default: freeze the flow on every non-Normal/non-conditions tab in the same pass (cheap),
   sharpen only Trauma for now.*

## Outcome — 2026-06-29
User picked **B (Freeze)**, Q2 default accepted. Implemented in `Urinary Interactive.html` (drawModel):
- Flow dots animate only on Normal + conditions; hidden on trauma/oncology/andrology/presentations.
- Trauma dims the base anatomy (`.focus`) to spotlight the highlighted organ; vignette kept to mid-tract
  condition lesions only (trauma organs sit at the figure edges where the edge-fade would wash them out).
- Bug fixed in same pass: testicular trauma now highlights the scrotum instead of dimming it.
- DOM/SVG change — verified by syntax check + in-browser; no node-unit-testable predicate added.
