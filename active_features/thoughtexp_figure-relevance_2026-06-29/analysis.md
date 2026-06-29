# Thought experiment — does the interactive figure earn its place?

Date: 2026-06-29
Mockup: [gallery.html](gallery.html) (open via `http://localhost:8001/active_features/thoughtexp_figure-relevance_2026-06-29/gallery.html`)

## Decision
The interactive figure shows the same faded anatomy for nearly every condition, with only a faint
marker, so for many pages it reads as decoration rather than teaching. How should the figure earn
its place?

## Options
- **A — Sharpen the overlay on the shared model.** One base figure; make the defect unmistakable:
  dim the irrelevant anatomy, spotlight the lesion, bold labelled marker + the consequence
  (dilation above / quiet below). Reuses the existing overlay engine (`drawModel`).
- **B — Bespoke per-condition diagram.** Hand-draw a purpose-built schematic for each of ~30
  conditions. Max clarity, max authoring/maintenance, breaks the "one model + overlays" invariant.
- **C — Suppress the figure where it can't teach.** Show it only where the model has something
  spatial (flow/obstruction/reflux/back-pressure, storage↔voiding); hide it for pain syndromes,
  functional/neurogenic, mood-driven, concept pages. (`hideFig` already exists for onc concepts.)

A and C compose. B stands alone.

## Pros / cons

### A — sharpen
Pros: defect becomes loudest object + named in plain words (localise in ~1s without prior anatomy);
reuses overlay engine (≈ an evening, not a rebuild); preserves the model's real superpower (dynamic
back-pressure/flow/state-machine); scales to the whole catalog for free; one consistent visual grammar.
Cons: same base silhouette can still feel "samey"; tuning dim/spotlight across every lesion position
is fiddly; does nothing for conditions with no spatial defect (needs C).

### B — bespoke
Pros: maximum per-condition clarity; can show detail the model can't (valve cusp, hypertonic floor).
Cons: ~30 diagrams to author + maintain forever; breaks the stated invariant (two truth sources);
inconsistent unless one hand draws all 30; slowest to "all covered" (likely stalls half-done); still
doesn't solve the non-spatial conditions.

### C — suppress
Pros: honest (empty diagram is worse than none); almost free (one predicate in `render()`); gives
dense content full width; sharpens the signal — "if there's a diagram, it teaches."
Cons: a figure-less page can look thin unless the card fills the space; needs a per-condition
"does the model teach here?" tagging pass.

## Fit check
- **Use:** PAs/students on a phone, scanning to localise a lesion to a station + grasp its
  consequence. Rewards loud+labelled (A) where spatial, get-out-of-the-way (C) where not. Does NOT
  reward 30 boutique illustrations (B).
- **Authoring:** A = engine work (write once). B = art labour ×30 forever. C = one rule + tagging pass.
- **Pivot cost:** A+C build on existing code (`drawModel`, `hideFig`, `IMAGES`) — no walk-back. B
  orphans the overlay engine already built + unit-tested.
- **Reversible:** A, C reversible (CSS/JS). B is lock-in (an asset library to keep feeding).

## Recommendation — A + C, skip B
1. Makes the figure unmistakable exactly where it teaches and silent where it doesn't — the actual
   complaint — using code already in place.
2. Scales to the whole catalog at near-zero marginal cost, one consistent grammar.
- Against (B's per-condition clarity): real, but doesn't survive the maintenance/consistency cost for
  a teaching aid whose job is fast localisation; sharpened overlay gets ~90% of the clarity at ~10%
  of the labour.

## Open questions to lock before /tdd
1. **Spotlight style** — dim-everything-but-the-lesion (mockup middle) vs. just a louder marker on
   current brightness. Default: dim + spotlight.
2. **Where to suppress** — drop the figure for pain syndromes (IC), functional/neurogenic, concept
   pages; keep for flow/obstruction/reflux/mass/stone/infection. Default: that split.
3. **Labels on the figure** — short plain-word callout baked into the SVG ("STONE — flow stops
   here") vs. labels only in the card. Default: short callout on the figure.

## Related follow-up (separate, surfaced during this)
`prostatitis` is tagged purely `infection`/systemic, but chronic prostatitis/CPPS (NIH cat III, the
commonest form) is largely non-bacterial. Now that an `inflammation` mechanism + a Chronic pelvic
pain presentation exist, split into **Acute bacterial prostatitis** (infection) + **Chronic
prostatitis / CPPS** (inflammation) — the male mirror of interstitial cystitis.
