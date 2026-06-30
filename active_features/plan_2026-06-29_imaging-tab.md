# Plan — Imaging tab (read X-ray/US/CT/MRI), BOTH views

**Date:** 2026-06-29
**Thought experiment:** [thoughtexp_imaging_2026-06-29/analysis.md](thoughtexp_imaging_2026-06-29/analysis.md). User: "I like A and B — lets have both!" → toggle between By modality and By finding. Defaults: 4 core modalities; ~6 findings; caption + simple arrow; Commons PD/CC-BY/CC-BY-SA only (no Radiopaedia).

> node:test repo (no DB/Playwright). Plan + failing tests first + min impl + suite green.

## Goal
An 8th tab "Imaging" that teaches reading urological imaging, with a segmented
toggle: **By modality** (how to read X-ray/US/CT/MRI) and **By finding** (a sign
shown across modalities). Reuses the figure image slot to show the scan, the tab
pattern, patient/prose helpers, and the Commons-image sourcing pattern from Hardware.

## Data (urinary-imaging.js)
- MODALITIES: { id,label,group:'plain'|'functional', whatFor, howRead:[...], findings:[caseId…], pearls:[...], img }
  ids: xray (KUB), ultrasound, ct, mri
- FINDINGS: { id,label, station, sign, pitfalls:[...], images:[{modality,img,caption}], caseId }
  hydronephrosis→ureteral_stone(kidney), ureteric_stone→ureteral_stone(ureter),
  renal_mass→renal_mass(kidney), bladder_tumour→urothelial_carcinoma(bladder),
  urethral_stricture→urethral_stricture(urethra), vur_reflux→vesicoureteral_reflux(ureter)
- exports MODALITIES, FINDINGS, MOD_GROUPS, modalityFor, findingFor

## Architecture (Urinary Interactive.html)
- Tab button #t-img (em "X-ray · US · CT · MRI"); dispatch tab==='imaging'.
- State: imgView ('modality'|'finding'), selMod='ultrasound', selFind='hydronephrosis'.
- A segmented toggle (By modality | By finding) rendered above the nav or content.
- buildNav: if imgView==='modality' list MODALITIES (grouped plain/functional); else list FINDINGS (grouped by region/station).
- renderImaging: modality card (whatFor / how to read / key findings→conditions / pearls / img) OR finding card (sign / pitfalls / images across modalities / open condition).
- Figure: modality view → show modality.img in figimg slot; finding view → show first finding image + highlight station marker on the SVG. (showsFigure: keep figure on.)
- Deep-link: add 'imaging' to TABS; ?tab=imaging&id=… resolves into MODALITIES or FINDINGS (carry view). selMod/selFind set; sGo branch.
- search-index-build: index modalities + findings (href ?tab=imaging&id=…); strip img.

## Task list
- [ ] **Slice 1** — urinary-imaging.js (4 modalities + 6 findings) + urinary-imaging.test.mjs (shape; finding.station valid; finding.caseId ∈ CASES; modality.findings ∈ CASES; helpers). node.
- [ ] **Slice 2** — tab + toggle + nav + renderImaging (both views) + figure wiring + CSS. Verify ultrasound + hydronephrosis end-to-end (no images yet).
- [ ] **Slice 3** — deep-link ('imaging') + search index (both modality & finding). regenerate; staleness. node.
- [ ] **Slice 4** — Commons images (4 modality + finding sets), download to web_freeimages, attribute, wire img; caption + simple arrow overlay where easy. Browser verify.

## Status log
- 2026-06-29 — plan written. Baseline 146/146.
- 2026-06-29 — all 4 slices done. Full suite 153/153 (+7 imaging catalog tests). 8th tab with By modality | By finding toggle; 4 modalities + 6 findings; figure shows the scan (modality) or marks the station + first image (finding); deep-link + search index include both (210 entries). 8 Commons radiology images (PD/CC-BY/CC-BY-SA) sourced, visually verified, attributed; each Read-checked for correctness — dropped an unclear bladder CT and skipped a missing US-bladder image (those cells fall back to captioned placeholders). Browser-verified ultrasound (modality) + renal_mass/hydronephrosis (finding). NOT deployed.

## Image notes
- Used: kub_stone, us_hydronephrosis, ct_stone (3D staghorn — modality only), mri_prostate, ct_renal_mass, us_renal_mass, rug_stricture (German labels), mcug_reflux.
- Placeholder cells (no good free image found): ureteric_stone (both), bladder_tumour (both), hydronephrosis CT. Easy to fill later.

## Out of scope
- Fluoroscopy (IVU/RUG/MCUG) + nuclear (DMSA/MAG3) modalities — next pass.
- Quiz/spot-diagnosis mode. Radiopaedia/non-free sources. Full labelled multi-image panels.
