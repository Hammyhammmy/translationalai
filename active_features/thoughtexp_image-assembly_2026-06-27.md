# Thought Experiment — How to assemble the gathered images into the interactive

**Date:** 2026-06-27  **Status:** DECIDED
**Decision:** how do the ~16 downloaded free GU-anatomy images become the interactive model?

## Options
- **1 — Adopt the open vector as the live base.** `urinary_system.svg` (CC-BY-SA, editable, real anatomy)
  becomes the animatable base; restyle + strip number labels + add flow/innervation/pathology as SVG
  layers. Raster images = tap-to-see detail/compare panels. *Receipt: /tmp/vec_overview.png.*
- **2 — Trace our own SVG** from the images. *Receipt: A_schematic/B_anatomical mockups.*
- **3 — Raster composite/slideshow.** *Receipt: the atlas-overlay Urinary Interactive.html — same pattern.*

## Why Option 1 wins
Only path with real anatomy AND true in-place interactivity for the least work (the vector already drew
the system correctly; SVG DOM animates). Honors "use most of them" — vector = model, rasters = detail.
Counter (CC-BY-SA ShareAlike obligation) accepted by the user.

## Locked answers (user, 2026-06-27)
1. License — **adopt the vector; interactive will be CC-BY-SA + attribution.** ✓
2. Innervation — **draw our own SVG innervation layer** on the vector (the set lacks a clean modern one). ✓
3. Scope — **the full ~30-case catalog** (normal phys + pathophys we identified), NOT just the two literal lesions. ✓

## Curated image roles
Live base: `overview__urinary_system.svg` ⭐ · production: `nephron__physiology_of_nephron.png` ·
kidney detail: `kidney__blausen_0592_kidneyanatomy_01.png` · pathology: `pathology__hydronephrosis_hydroureter.png`,
`pathology__blausen_0595_kidneystones.png` · orientation: `overview__illu_urinary_system.jpg` ·
male pelvis: `malepelvis__gray1153.png`. Parked: female overview, Gray's innervation engravings.

## Build (see plan_2026-06-27_urinary-3d-model.md)
Engine holds all ~30 cases as validated data; the view renders any case generically on the vector.
Slices: [done] engine catalog → [next] adopt+restyle vector → generic renderer + innervation layer →
catalog UI. Attribution: SOURCES.md + on-page credit; component licensed CC-BY-SA.
