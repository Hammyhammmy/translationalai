# Plan — Hardware tab (urological devices)

**Date:** 2026-06-29
**Thought experiment:** [thoughtexp_hardware_2026-06-29/analysis.md](thoughtexp_hardware_2026-06-29/analysis.md) — Option A (dedicated tab, figure overlay, patient block). User: "do it all" — all ~10 devices; defaults (overlay on shared figure, patient block yes); source free Wikimedia Commons images into web_freeimages.

> node:test repo (no DB/Playwright). Plan + failing tests first + min impl + suite green.

## Goal
Add a 7th tab "Hardware" to the Interactive model: a catalog of urological devices,
each shown with its placement on the shared tract figure (overlay), a clinician card
(where it sits / why placed / how it works / complications), a patient "In plain words"
block (reuse patient.js), and a real device photo from Wikimedia Commons.

## Devices (10)
drainage-upper: ureteric (JJ) stent, nephrostomy tube
drainage-lower: urethral (Foley) catheter, suprapubic catheter, 3-way irrigation catheter
diversion: ileal conduit (urostomy), neobladder
continence/andrology: artificial urinary sphincter, penile prosthesis, mid-urethral sling

## Data shape (urinary-hardware.js → HARDWARE)
{ id, label, group, stations:[tract nodes for overlay], external?:bool,
  whatItSits, whyPlaced, howWorks, complications:[...], pearls:[...],
  patient:{whatItIs,whyItMatters,whatIsDone,whatToWatch}, img?:'web_freeimages/hardware__...' }

## Architecture (Urinary Interactive.html)
- Tab button #t-hardware; dispatch `tab==='hardware'`; click handler; selH state.
- buildNav branch grouped by `group`.
- renderHardware(): device card (photo + clinician sections + patient block) + wireCopy.
- drawHardware(device): overlay placement on the shared SVG (markers on PATH/XY for
  internal devices; an external marker/line for nephrostomy/SP/urostomy). Reuse the
  trauma-overlay pattern.
- search-index-build.mjs: add a hardware section (auto-indexes patient + fields).

## Task list
- [ ] **Slice 1** — urinary-hardware.js (10 devices) + hardware.test.mjs (catalog shape; every device has required fields + valid group + valid stations + patient block; ids unique). node.
- [ ] **Slice 2** — tab wiring + renderHardware + drawHardware overlay + CSS. Verify **ureteric stent end-to-end** in browser (sign-off), then the rest render too.
- [ ] **Slice 3** — search index includes hardware devices; regenerate; staleness green. node.
- [ ] **Slice 4** — Wikimedia Commons images: source CC/PD pics per device, download to web_freeimages (hardware__*.ext), update SOURCES.md + _manifest.json, set `img` on devices, show photo in card. Browser verify.

## Status log
- 2026-06-29 — plan written. Baseline 139/139.

## Out of scope
- Insertion/procedure technique (this is what/why/care, not how-to-insert).
- Brand/sizing catalogues beyond a teaching mention.
- Devices beyond the 10 above.
