# Thought experiment — An "Imaging" section (reading X-ray/US/CT/MRI)

**Date:** 2026-06-29
**Decision:** Add a section teaching how to read urological imaging? Its own tab named
"Imaging"? And organised by modality (X-ray/US/CT/MRI) or by finding (hydronephrosis,
stone, mass across modalities)?

**Is it a good idea? Yes.** Imaging interpretation is core to urology, under-taught,
and — the main risk — **free images exist**: I verified Commons has PD/CC-BY/CC-BY-SA
images for KUB stone, US hydronephrosis, CT KUB, CT urogram (TCC), MRI prostate, DMSA,
retrograde urethrogram, and MCUG. Naming: a tab **"Imaging"** (em: *X-ray · US · CT · MRI*).

Mockup of both layouts: [gallery.html](gallery.html)

## Options
- **A — Imaging tab BY MODALITY.** Entries = X-ray/KUB, Ultrasound, CT, MRI (+ later
  fluoroscopy IVU/RUG/MCUG, nuclear DMSA/MAG3). Each: what it's for, when it's chosen,
  a reading approach, key findings (linking to conditions), and an example image.
- **B — Imaging tab BY FINDING.** Entries = hydronephrosis, ureteric stone, renal mass…
  each shown across several modalities side-by-side — pattern recognition.
- **C — No tab.** Fold annotated images into the existing per-condition `imaging` fields.

## Pros / cons
### A — by modality
+ Matches the ask ("reading X-ray, US, CT, MRI") and teaches the distinctive skill: how to *approach* each scan + when it's the right test.
+ Doesn't duplicate existing content — conditions already carry an `imaging` field (what to order/expect); this teaches the modality itself.
+ Reuses the figure panel cleanly: the radiology image shows in the existing image slot (figimg), the card teaches reading it — no new figure machinery.
+ Bounded, coverable scope (4–6 modalities) and folds in B's value via "key findings → open the condition" links.
+ Mirrors how clinicians actually think first ("US or CT?"), then read.
- Less tied to the tract-geometry overlay than other tabs (acceptable — it's a reading primer; the figure shows the scan, not the model).
- A single example image per modality under-sells the range of findings.

### B — by finding
+ Pattern recognition is clinically powerful; one finding across modalities is a strong teaching shape.
+ Fits the station geometry (each finding maps to a station) and could reuse the figure overlay.
- Heavy overlap with the per-condition `imaging` fields already present — risks feeling redundant with "What can go wrong".
- Needs several curated, ideally annotated images per finding (3–4×) — much more sourcing + annotation than A.
- Doesn't teach the "how to read a scan / which test" skill the user actually asked for.

### C — fold into conditions
+ Cheapest; images appear exactly where the pathology is discussed.
- No home for the modality-reading skill; "how to read a KUB" has nowhere to live.
- Scatters imaging across 30 conditions instead of one learnable place.

## Fit check
- **Use:** a PA/student wants (1) which test for what, and (2) how to read it without missing the obvious. A (by modality) serves both; B serves pattern recognition but assumes you already chose the test.
- **Authoring reality:** A = ~4–6 modality entries + 1 good image each (sourcing like the Hardware pass). B = ~6 findings × 3 images each, ideally annotated = 3–4× the image work.
- **Pivot cost:** additive 8th tab; reuses the tab pattern and the figimg slot. Low.
- **Licensing:** stick to Commons PD / CC-BY / CC-BY-SA (attribute; note share-alike). **Avoid Radiopaedia** (CC BY-NC-SA — non-commercial + share-alike, messy for a public site).

## Recommendation: **A — Imaging tab organised by modality**, with "key findings → condition" links.
1. It's exactly the asked-for skill (how to read each modality + when to use it) and is the one imaging topic that *isn't* already covered by the per-condition imaging fields.
2. It reuses the existing image slot (the scan shows in the figure panel) and the tab pattern — assembly, not new machinery.
- Strongest counter — B's pattern recognition is valuable — doesn't dominate: B overlaps with the conditions catalogue, costs 3–4× the image/annotation work, and A already links out to the finding's condition for that view. Start A; a by-finding cross-cut can come later if wanted.

## Open questions to lock before /tdd
1. **Slice by modality or by finding?** Modality = "how to read an ultrasound"; finding = "hydronephrosis on US vs CT vs MAG3". *Default: by modality.*
2. **How many modalities in v1?** The 4 core (X-ray/KUB, ultrasound, CT, MRI), or also fluoroscopy (IVU/RUG/MCUG) and nuclear (DMSA/MAG3)? *Default: 4 core first; fluoro + nuclear next pass.*
3. **How much annotation?** Plain example image + a caption, or add our own arrow/label overlay pointing at the finding? *Default: caption + a simple arrow where it's easy; full labelled overlays later.*

## Out of scope (this pass)
- A radiology quiz/spot-diagnosis mode.
- Radiopaedia / non-free sources.
- Annotated multi-image panels per finding (that's Option B's territory).
