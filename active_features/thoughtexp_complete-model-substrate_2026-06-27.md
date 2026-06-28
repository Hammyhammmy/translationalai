# Thought Experiment — Substrate & scope for the COMPLETE urinary model

**Date:** 2026-06-27
**Decision:** What substrate + how-complete for the single, modifiable urinary teaching model — the
diagram where you learn production → flow → innervation, then toggle a lesion *into the same picture*
and watch the physiology break. Goal (per user): make it MORE complete than the original prompt.

## Why we're here
The atlas-overlay build (`Urinary Interactive.html`) looks good but drifted from the prompt: it dropped
innervation, never showed urine production, swaps to a different painting per pathology (instead of
toggling a lesion into one model), and used the wrong lesions (ureteral stone/BPH vs the prompt's
urethral stone). Root cause: atlas plates are FIXED PAINTINGS — you can't toggle/animate/modify them.
The prompt describes a modifiable model → that's a BUILT diagram.

## Expanded spec ("more complete than the initial prompt")
Heart (must): 1) nephron zoom showing filtration → urine (production); 2) whole-system flow animation;
3) storage↔voiding state machine animated; 4) innervation in two depths — gross (symp T10–L2 / parasymp
S2–S4) and receptor (α1/β3/M3/pudendal) tying into the Medications doc; 5) pathology toggles IN-PLACE,
full station catalog, each with physiology→pathology (back-pressure up, silence down, recolor).
Stretch: 6) consequence cues (hydronephrosis grading, distension, pressure); 7) "see the real plate"
atlas link per state; 8) referred-pain dermatomes; 9) male/female toggle; 10) localization quiz / worked case.

## Options (receipts: complete_model_mockups/)
- **A — Schematic system board** (`A_schematic.svg`): clean built vector diagram, engine-driven.
- **B — Anatomical interactive figure** (`B_anatomical.svg`): built cross-section figure, engine-driven,
  nephron zoom, realistic anatomy, lesions toggled into the same figure.
- **C — Atlas as companion** (`atlas2-p01.jpg`): fixed art; can't toggle/animate → use as a synced
  "compare to the real plate" panel beside A or B, NOT as the interactive model.

## Pros / cons (with receipts)
**A — Schematic**
- + Cheapest to build well; a new pathology = one `<g>` overlay; receptors/stations trivial to add.
- + Legible at phone width (flat shapes, big targets, nothing fine to lose).
- + On-brand with the reference's existing pipeline/station diagrams.
- + Animation-friendly: scale for dilation, recolor for hematuria, particles along nodes; engine maps 1:1.
- − Abstract — doesn't teach gross anatomy; won't help a student recognise the real organ.
- − Lower credibility for a clinical audience; can read as a kids' infographic.
- − Production inset is schematic, not a real nephron.

**B — Anatomical**
- + Meets AND exceeds the prompt in ONE figure: real nephron production, real anatomy, innervation, in-place lesion.
- + Credible to clinicians; reads like a teaching atlas = the brand.
- + Teaches gross + micro anatomy (cortex/medulla/calyx/pelvis) the schematic can't.
- + Still fully modifiable/animatable (vector): lesions toggle in, flow animates, calyces balloon.
- + Rhymes with the real atlas plates → natural "see the real plate" pairing.
- − Higher authoring cost per pathology (each lesion drawn to fit the anatomy, not a node recolor).
- − Denser; needs care to stay legible on a phone; more labels.
- − One sloppy overlay looks worse than a clean schematic — quality risk.

**C — Atlas companion**: not a standalone (fixed art); folds into A/B as the fidelity reference.

## Fit check
- Audience = PAs/students on phones learning how the system works + localizing lesions. The prompt's
  intent ("explains how it works", "intuitive understanding") rewards B's richness; A is more scannable.
- Authoring: B costs more but the mockup proves the quality is reachable, and the tested engine already
  exists to drive it. A is cheaper, lower ceiling.
- Pivot cost: both reuse the engine (model 16 + plates 9 tests). `Urinary Interactive.html` becomes the
  atlas COMPANION (C) rather than the main model — modest rework, keeps that work useful.
- Lock-in: this sets the visual language for the flagship interactive → worth the more ambitious choice.

## Recommendation — **Option B (anatomical), engine-driven, with the atlas plates as a synced companion (C folded in).**
1. It's the only option that satisfies the *complete* spec in one figure — production, flow, innervation,
   and in-place pathology that reads as real physiology.
2. It's on-brand and credible for a clinical audience, and the mockup proves the quality bar is reachable.
Strongest counter — authoring cost per pathology — doesn't dominate: build the engine-driven base once,
add lesions as incremental overlays (start with the two literal ones), and keep A's schematic available
as a possible "simplified view" toggle if phone legibility bites.

## Open questions to lock before /tdd
1. Anatomical (B) or schematic (A) as the main model? — Default: **B**, atlas plate as a "see the real thing" companion.
2. v1 scope — just the two named lesions (bladder blood/frequency + urethral stone) done richly, or the
   full station catalog now? — Default: **the two literal ones first**, full physiology, then catalog incrementally.
3. Receptor/pharmacology layer + male/female + quiz now or later? — Default: **later (v2)**; nail the core first.

## Receipts
- `active_features/complete_model_mockups/A_schematic.svg`, `B_anatomical.svg`, `index.html` (gallery).
- Prior spikes: `spike_urinary-3d-model.html`, `3d_svg_examples/`.
