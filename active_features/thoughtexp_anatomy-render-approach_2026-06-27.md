# Thought Experiment — How to render the urinary anatomy for the interactive figure

**Date:** 2026-06-27
**Decision:** What visual substrate should the interactive urinary-tract model use?

## Frame
We need an interactive teaching figure (flow animation + storage/voiding state machine + pathology
toggles that show back-pressure upstream / silence downstream). The open question is NOT "which drawing
style" — it's whether to **manufacture anatomy** at all, or build the interaction **on top of the
professional atlas plates already in the repo**.

## Options compared
- **A — Procedural 3D (Three.js).** Build the anatomy from primitives, animate in WebGL. *(Built as a spike — `Urinary 3D Model.html`.)*
- **B — Hand-authored SVG diagrams.** Draw the anatomy as vector art in one of several styles. *(6 style mockups built — `3d_svg_examples/`.)*
- **C — Interactive layer over the real atlas plates.** Use the Burroughs Wellcome watercolor plates (`images/atlas*.jpg`) as the base art; add a registered SVG/CSS overlay for highlighting, flow animation, and pathology cross-fades. The already-TDD'd engine drives *which plate is shown + which overlays are active*.

## Pros / cons (with receipts)
**A — Procedural 3D**
- ✗ Output looked like "balloon animals" (ellipsoid organs, no anatomical fidelity).
- ✗ Hard to animate consequences (dilation = re-scale meshes; back-pressure reads poorly).
- ✗ Adds a Three.js CDN dependency to an otherwise dep-free static site.
- ✓ Rotatable — but rotation was never the teaching goal.

**B — Hand-authored SVG**
- ✗ Tops out at "meh"; cannot approach the atlas's quality in reasonable effort.
- ✗ Prostate + pelvic context were dropped (the engine used 4 stations; BPH *lives* at the prostate).
- ✗ Re-draws, badly, art that already exists at publication grade in the repo.
- ✓ Easy to make interactive (SVG DOM) — this strength is inherited by Option C anyway.

**C — Interactive layer over atlas plates**
- ✓ Publication-grade visuals for free — watercolor plates, anatomically correct, with full pelvic context including prostate, seminal vesicles, vas.
- ✓ The pathology catalog is **already illustrated**: BPH (2-1), prostate Ca (2-2), upper-tract obstruction synoptic (2-3), bladder pathologies (2-4), lower-tract obstruction synoptic (2-5), kidney x-section (2-6), pyelonephritis (2-7/8), cystitis (1-5), prostatitis (1-8).
- ✓ Effort goes to the genuinely additive part — the interaction — not to re-drawing anatomy.
- ✓ Reuses the engine already built + TDD'd (16/16): it now drives overlays/plate selection.
- ✗ Plates are raster → overlays must be registered to fixed coordinates *per plate* (hand-placed hotspots). Mitigated: small fixed set of plates; coords captured once.
- ✗ Less "freely rotatable" than 3D — acceptable; localizing a lesion to a station is the goal, and overlays-on-plates do that best.

## Fit check
- **Audience/use:** PAs & students on phones, scanning to localize a presentation to a station. Static labeled plate + tap-to-highlight serves this better than a spinnable 3D toy.
- **Authoring reality:** A & B are expensive to do *well* and we control quality poorly; C's art is done, so the cost is bounded overlay work.
- **Series fit:** the whole reference is already built around this atlas — C is the most on-brand option by far.
- **Reversible?** Yes — overlays are additive; we can restyle later without touching the plates.

## Recommendation — **Option C**, all-in.
Strongest reason: the visuals are already at publication grade and free; we stop fighting a battle we
can't win (drawing anatomy) and spend effort on the interaction, which is the real value-add.
Second: it fixes the prostate/context gap instantly and is the most on-brand choice for this reference.
Strongest counter (raster registration cost) doesn't dominate — the plate set is small and the coords
are captured once.

## Plate → case mapping (prototype)
| Case | Plate | File |
|---|---|---|
| Normal / orientation | Male tract overview (side + frontal, prostate labeled) | `images/atlas1-p02.jpg` |
| BPH (E1) | Benign prostatic hyperplasia | `images/atlas2-p01.jpg` |
| Ureteral stone / upper-tract obstruction (U1) | Upper-tract obstruction synoptic | `images/atlas2-p03.jpg` |
| Bladder hematuria / tumor (BL1) | Bladder pathologies overview | `images/atlas2-p04.jpg` |
| (extended) kidney detail | Normal kidney cross-section | `images/atlas2-p06.jpg` |
| (extended) lower-tract obstruction | Lower-tract synoptic | `images/atlas2-p05.jpg` |

## Spikes retained as receipts (not shipped)
- `blog/pa-orientation/Urinary 3D Model.html` (Three.js) — to be retired.
- `active_features/3d_svg_examples/` (6 SVG styles + gallery).

## Decision
**Pivot to Option C.** Keep the tested engine; replace the 3D view with an atlas-overlay view.
See plan: `plan_2026-06-27_urinary-3d-model.md` (PIVOT section).
