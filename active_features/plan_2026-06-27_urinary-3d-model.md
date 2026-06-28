# Plan — Interactive 3D Urinary System Model

**Date:** 2026-06-27
**Page:** `blog/pa-orientation/Urinary 3D Model.html` (links from `blog/pa-orientation/index.html`, Conduits section)

## Goal
An interactive 3D model of the urinary tract (kidney → ureter → bladder → urethra) for the
"Clinical Geometry" teaching reference. It animates one-way urine flow, shows the storage/voiding
state machine with sympathetic vs parasympathetic innervation overlays, and lets the learner toggle
pathologies to *see* the physiology→pathology consequence (back-pressure dilation upstream, silence
downstream, particle recolor). Companion to `The Urinary Tract.html`; same design system.

## Architecture (TDD-able)
- **`urinary-model.js`** — pure ES module, the physiology engine. No DOM, no Three.js. Runs in Node + browser.
  - Stations + flow order; storage/voiding phase state machine; innervation per phase.
  - `evaluateCase(caseId, phase)` → consequence object (dilation, silence, hydronephrosis,
    bladder distension, renal impact, particle color, exit flow).
- **`urinary-model.test.mjs`** — `node:test` unit tests against the engine. The red→green loop runs here.
- **`Urinary 3D Model.html`** — Three.js view that renders whatever the engine reports. Verified in-browser.

## Test layer chosen
Pure-logic engine → **Node `node:test`** (no pytest/Postgres in this repo; it's a static site).
View layer → **browser manual verification** + `/a11y-audit`. Rationale: 3D rendering isn't unit-testable,
but the physiology *logic* that drives it is, so all teaching invariants live in the tested engine.

## Locked scope — PROTOTYPE TIER
- [ ] B1 — normal one-way flow
- [ ] B2 — storage phase (sympathetic T10–L2: detrusor relaxed, internal sphincter closed)
- [ ] B3 — voiding phase (parasympathetic S2–S4: detrusor contracts, sphincters open)
- [ ] B4 — innervation overlay (sympathetic vs parasympathetic, tied to B2/B3)
- [ ] U1 — ureteral stone (UPJ): flow blocked, hydronephrosis above, silence below
- [ ] BL1 — bladder hematuria + frequency: particles recolor red from the bladder, no obstruction
- [ ] E1 — BPH: outlet obstruction, bladder distends, back-pressure reaches kidney (renal impact)

### Slices (each = one red→green→refactor cycle)
- [x] Slice 1 — engine core: STATIONS, flow order, phase state machine + innervation (B1–B4)
- [x] Slice 2 — `evaluateCase` obstruction model: ureteral stone (U1) + BPH (E1) + invariants
- [x] Slice 3 — `evaluateCase` bleeding model: bladder hematuria (BL1)
- [x] Slice 4 — Three.js view consuming the engine (headless-render verified; a11y/interactive pass pending)

## Out of scope (this pass — design backlog)
The full ~30-case catalog (stations 1–5 extended set: K1–K5, U2–U6, BL2–BL7, C1–C4, E2–E7).
Engine stays uniform so these are mostly data additions once slices 1–3 are green.

## PIVOT (2026-06-27) — from procedural 3D to interactive atlas overlay
See `thoughtexp_anatomy-render-approach_2026-06-27.md`. The 3D render looked like "balloon animals";
hand-drawn SVG topped out at "meh" and dropped the prostate. **Decision: Option C** — build the
interaction on top of the repo's existing Burroughs Wellcome watercolor plates (`images/atlas*.jpg`),
which are publication-grade and already illustrate every pathology (incl. the prostate / BPH).

**Kept:** the TDD'd engine (`urinary-model.js`, 16/16) — it now drives *which plate + which overlays*.
**Retired:** `Urinary 3D Model.html` (Three.js spike) and the 6 SVG mockups (kept as receipts).

### New build — interactive atlas overlay
New page: `blog/pa-orientation/Urinary Interactive.html` (atlas plate base + registered SVG/CSS overlay).
Plate→case mapping: normal→atlas1-p02, BPH→atlas2-p01, ureteral stone→atlas2-p03, bladder/hematuria→atlas2-p04.

Test layer: engine/data → node:test; overlay rendering + plate cross-fade → browser-verified (Playwright headless + a11y).

- [x] Slice A — engine extended: `urinary-plates.js` (PLATES registry + CASE_PLATE + CASE_ANNOTATION +
      plateForCase) with coords grounded by viewing the 4 plates. `urinary-plates.test.mjs` 9/9; full
      suite 25/25. Red→green confirmed.
- [x] Slice B — base atlas viewer (`Urinary Interactive.html`): plate base + % overlay hotspots, tap-to-
      highlight, lesion pulse, case toggle cross-fades plates, engine-driven caption/chips. Browser-verified
      (no errors). Coords tuned via a grid overlay; registration lands on the structures (BPH lesion dot on
      the adenoma, stone dot on hydronephrotic kidney). Fixed a cross-fade stacking bug (single-image fade).
- [x] Slice C — pathology toggle cross-fades to the mapped plate; lesion = pulsing red hotspot; engine
      consequence chips + per-case caption. Browser-verified.
- [x] Slice D — flow dots animate down the tract (path = station hotspots in flow order); pile up at the
      lesion (back-pressure); recolor red from the bleeding station (hematuria); idle in storage / flow in
      voiding; dashed guide line marks the silent downstream. Browser-verified, no errors.
- [x] Slice E — retired 3D page → spike_urinary-3d-model.html; rewired nav.js / posts.json / index.html;
      a11y pass clean. Full suite 25/25.

### Coordinate capture note
Each plate needs hand-placed normalized hotspot coords (stations + lesion). Captured once by viewing each
plate; stored in the `PLATES` data registry. Slice A can use placeholder coords; Slice B refines them.

## PIVOT 2 (2026-06-27) — adopt open vector + FULL ~30-case catalog
Thought experiment `thoughtexp_image-assembly_2026-06-27.md`. Locked: (1) adopt the CC-BY-SA vector
`urinary_system.svg` as the animatable base (interactive licensed CC-BY-SA + attribution); (2) draw our
own innervation layer; (3) scope = full catalog (28 pathologies + normal, 10 mechanisms), NOT just 2.
Atlas plates demoted to optional "compare to real plate" companions.

Architecture: engine holds ALL cases as validated data; the view renders any case generically on the
vector (lesion highlight + consequence transforms + flow/back-pressure + our innervation layer + optional
raster detail panel). Substrate decision settled: real anatomy + full interactivity for least authoring.

- [x] Engine catalog (task #10): `urinary-model.js` full ~30-case catalog + 10 mechanisms; `MECHANISMS`
      exported; evaluateCase handles obstruction/bleeding/infection/malignancy/reflux/overactivity/
      structural/incontinence/neurogenic. `urinary-catalog.test.mjs` 15/15. Plates test re-pointed to
      validate mapped cases only. FULL SUITE 40/40 (model 16 + plates 9 + catalog 15). Red→green.
- [x] Adopt + restyle `urinary_system.svg` → `urinary-base.svg` (labels + vessel layers removed, body dimmed,
      credited CC-BY-SA). Found the vector lacks the outlet → we draw urethra/prostate ourselves.
- [x] Generic renderer + innervation (task #12): `Urinary Interactive.html` rebuilt on the vector base.
      Inline SVG stage (viewBox 510x825): muted base `<image>` + drawn outlet + overlay groups. Engine drives
      ALL ~30 cases generically — lesion marker (colored by mechanism), back-pressure halos, silence, flow
      particles (block/pile-up, recolor, reflux-reverse, exit-block), our own sympathetic/parasympathetic
      nerve layer (phase-highlighted). Base muted via CSS filter so overlays pop. Browser-verified, no errors.
- [x] Catalog UI (task #13): station-grouped chip picker (Baseline + 5 stations, 29 cases), phase +
      innervation toggles, engine readout (note + consequence chips), compare→Atlas link. nav.js/posts.json/
      index.html synced to "Interactive Model". a11y clean (lang, svg aria-label, live region, named buttons).
      FULL SUITE 40/40.

## PIVOT 3 (2026-06-27) — two-view structure (user decision)
Flat "everything at once" panel was wrong: phase/innervation showed on irrelevant cases (e.g. ureteric
stone), and consequence chips doubled (kidney dilated + hydronephrosis; bladder dilated + distended).
User's call: **two views — (1) Normal physiology, (2) What can go wrong.**
- Normal view: anatomy + production + one-way flow + storage/voiding state machine with innervation
  (nerves bound to the phase toggle; no separate "Show innervation" button).
- Abnormal view: station-grouped condition catalog; lesion + consequences on the same model;
  consequences **de-duped & named** (hydronephrosis/hydroureter/bladder distended/outlet obstructed/
  kidneys at risk); phase control + nerves appear **only for phase-relevant conditions** (driven by the
  new tested `phaseRelevant` engine flag).
Engine: `phaseRelevant` added + tested (catalog test 19, full suite 44/44). View rebuilt; browser-verified,
no errors. Resolves all three smells the user flagged (redundant descriptors, separate innervation toggle,
phase on unrelated topics).

## ADD-ONS (2026-06-27)
- Fault phase: replaced boolean `phaseRelevant` with `faultPhase` ('storage'|'voiding'|null) — phase is
  intrinsic to a condition, not a free toggle (OAB can no longer be set to voiding). Abnormal view states
  the fixed phase, no toggle; Normal view keeps the toggle. Tested (45/45).
- Clinical workup (task #14): `urinary-clinical.js` — CLINICAL[caseId] {history,exam,labs,imaging,treatment}
  for all 28 pathologies; `urinary-clinical.test.mjs` 4/4; FULL SUITE 49/49. Workup accordion added to the
  abnormal view with a **draft · verify** badge. ⚠ Content is DRAFT from standard sources — needs Hanmu's
  clinical review before it's authoritative.
- NEXT (task #15): testicular/scrotal subsystem — torsion + epididymo-orchitis (vascular/infective, not a
  conduit problem; ties to the three-geometries theme). Draw testes; add 'vascular' mechanism + workup.

## Status log
- 2026-06-27 — plan opened. Prototype tier locked. Starting Slice 1 red→green.
- 2026-06-27 — Slices 1–3 GREEN. `urinary-model.js` engine + `urinary-model.test.mjs` (16/16 pass).
  Red confirmed first (module missing), then green. Added scoped `package.json {type:module}` so
  node:test reads `.js` as ESM. Next: Slice 4 — Three.js view.
- 2026-06-27 — PIVOT to interactive atlas overlay (Option C). Thought experiment saved. 3D + SVG mockups
  retired to receipts. Engine retained. New slices A–E defined.
- 2026-06-27 — Slices A–E ALL DONE. `Urinary Interactive.html` shipped: real atlas plates + registered
  overlay + tested engine. Engine layer 25/25 (model 16 + plates 9). Browser-verified throughout (zero
  errors). Nav rewired across 3 surfaces; a11y clean. FEATURE COMPLETE for prototype tier.
  Follow-ups (backlog): extended ~22-case catalog (more plates already exist: pyelonephritis 2-7/8,
  prostatitis 1-8, prostate Ca 2-2, lower-tract synoptic 2-5, kidney x-section 2-6, cystitis 1-5);
  optional leader-line annotation callouts; per-plate descriptive alt text.
- 2026-06-27 — Slice 4 built: `Urinary 3D Model.html` (Three.js r160 via CDN importmap, consumes the
  engine). Headless Playwright/Chromium verify: page loads with ZERO errors, WebGL live, engine drives
  every panel readout correctly (BPH→hydroneph+distension+renal impact; stone→kidney dilated+downstream
  silent). Wired into all 3 nav surfaces (posts.json, nav.js ribbon, index.html Conduits card) — verified.
  KNOWN POLISH ITEMS (follow-up): (1) downstream "silence" opacity dimming reads too subtly on the
  bladder — signal is clear in readout chips but weak in 3D; (2) on big dilation the kidneys clip the top
  of the frame — camera should pull back; (3) BPH prostate torus hard to see behind distended bladder;
  (4) only headless-verified — no interactive drag/zoom or /a11y-audit pass yet; needs Chrome extension
  or a real browser session. CDN dependency on unpkg three@0.160.0 (rest of site is dep-free).

## ADD-ONS (2026-06-27, cont.)
- 2-pane layout (nav | main); model demoted to a compact, hideable figure.
- 4th tab: **Oncology** (`urinary-oncology.js`) — GU cancers + treatment concepts (ARPIs, checkpoint,
  TKI/VEGF, FGFR, PARP, ADC, PSMA radioligand, BCG), grounded in molecular physiology.
- **Depth pass (calibration = Oncology done):** teaching-depth prose (lesion → markers → treatment logic
  → target→drug → pearls), format B. NEXT: roll the same depth across conditions/normal/presentations.
- **Image-first hybrid:** `urinary-images.js` maps concepts → real atlas/web plates; figure shows the real
  image when one exists, else the interactive model (flow, state machine, functional/neurogenic cases).
  Image gaps to pull: testicular torsion (Doppler), epididymo-orchitis, + onc-concept schematics.
- Engine/registry tests: **66/66**. Browser-verified, no errors. All content carries `draft · verify`.
