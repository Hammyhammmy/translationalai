# Thought experiment — Patient-education block per concept

**Date:** 2026-06-29
**Decision:** What shape should a plain-language, patient-facing explainer take for
each concept in the Interactive model — added alongside the (clinician-facing)
teaching pearls, with more background and easy copy-paste?

**Key reframe — who reads it, who uses it:** the *content's audience* is the patient,
but the *app's user* is the PA/student/clinician, who copies the block into an
after-visit summary, a portal message, or a printout. So "easy to copy-paste"
means: drop cleanly into EMR free-text / a handout without formatting breakage.

**Reuse:** the `prose()`/`plain()` helpers shipped this session render `**bold**`
+ paragraphs and strip markup for a clean copy — directly usable here. There is
**no copy-to-clipboard in the app today**; that's net-new (small).

**Coverage:** ~75 teaching entries across modules (~half have pearls today).

Mockup (BPH, all three shapes, live copy button + clipboard preview): [gallery.html](gallery.html)

## Options
- **A — One plain-language paragraph** ("In plain words"): a new `patient` string
  field, rendered via `prose()` as its own green card with a Copy button. 3–6
  sentences carrying background. Copies as one clean paragraph.
- **B — Structured explainer**: a `patient` object — *What it is / Why it matters
  to you / What we'll do / What to watch for*. Rendered as a small labelled block.
- **C — Plain-language bullets** (`patientPearls` array): mirrors teaching pearls
  with plainer words; reuses the existing list renderer.

## Pros / cons
### A — paragraph
+ Matches the ask exactly: a *paragraph* with *more background*, plain words.
+ Copies perfectly into any EMR/portal/email as flowing text (via `plain()`), no bullet/label artefacts.
+ Background reads as a warm explanation a patient can actually be handed.
+ Cheapest of the three to author *well* across 75 entries (one natural paragraph each).
+ Reuses `prose()` render + `plain()` copy — minimal new code (just a Copy button).
- Less scannable on screen than B/C (but the on-screen reader is the clinician, who already knows it).
- A wall risk if over-long — mitigated by the same `\n\n` paragraphing we just shipped.

### B — structured (what/why/do/watch)
+ Predictable skeleton; scannable; hard to forget a dimension (e.g. red flags).
+ Good for a patient reading on screen.
- ~4× the authoring per entry (four labelled bits × 75) — and risks reading robotic/templated across the catalogue.
- Copies as "Label: text" lines — fine, but more verbose and less natural in a handout than prose.
- The scannability win accrues to a patient reading the *app*, but the patient reads the *copied text*, not the app.

### C — bullets (patient pearls)
+ Cheapest to slot in (reuses `pearlsHTML`); consistent with existing pearls.
+ Punchy, skimmable.
- Directly fights the stated requirement ("needs a bit more background") — bullets fragment the story.
- Easy to blur with the real teaching pearls right above it (two bullet lists, different voice) — confusing.
- Copies as "• …" lines that some portals/EMRs mangle.

## Fit check
- **Use:** clinician copies a warm, accurate, jargon-light explanation into an
  after-visit note / portal message / printout for the patient. That favours a
  clean paragraph that pastes anywhere — A.
- **Authoring reality:** the dominant cost is writing 75 accurate plain-language
  blocks regardless of shape; A is the least overhead per entry and the most
  natural to write at quality. B multiplies the work and templated-ness.
- **Pivot cost:** low/additive — a new optional field; absent = no block (backward
  compatible). Render slots next to `pearlsHTML`. No existing content changes.
- **Locked-in?** The field shape is the commitment. A (a string) is the most
  flexible — it can later carry `**bold**` lead-ins for light structure without a
  schema change; B locks a 4-part schema.

## Recommendation: **A — one plain-language paragraph**, reusing `prose()`/`plain()` + a Copy button.
1. It's exactly what was asked — a paragraph with background — and the flowing form
   carries the context that bullets can't, while pasting cleanly into a note/handout.
2. It's the cheapest to author well at 75-entry scale and needs almost no new code
   (a Copy button on top of helpers we already shipped).
- Strongest counter — B is more scannable — doesn't dominate: the on-screen reader
  is the clinician (who knows the material), and the patient reads the *copied* text,
  where a warm paragraph beats clipped labels.

## Open questions to lock before /tdd
1. **Whose voice?** Write it *to* the patient ("Your prostate sits around the tube
   you pee through…") so it can be handed over verbatim — vs *about* the patient as
   clinician notes ("The patient's prostate…"). *Default: to the patient (second person).*
2. **How much now?** All ~75 entries, or start with the conditions + presentations
   (the ~40 things patients actually get told) and expand to oncology/andrology/normal
   later? Field is optional, so partial coverage renders fine. *Default: conditions +
   presentations first.*
3. **Safety line?** Add a small standing footer under each block ("General
   information — your clinician will tailor this to you"), or rely on the existing
   draft·verify badge? *Default: add the one-line disclaimer (it's patient-facing text leaving the building).*

## LOCKED style (2026-06-29, after review)
- **Structure:** Option B — labelled block. Disease variant: *What it is / Why it
  matters / What is done / What to watch for.* Normal-anatomy variant: *What it is /
  What it does / How it is kept well / What to watch for.*
- **Voice:** impersonal / general ("**The** prostate…"), not second-person ("your").
- **Specificity — class-first rule:** the **drug class** is the primary searchable
  handle; name a specific generic only where one agent dominates or the patient
  chooses between named options (e.g. tamsulosin; the PDE5 inhibitors). Keep
  interchangeable members at the class ("an NSAID", not diclofenac). **Procedures
  are named** (TURP, ESWL, ureteroscopy, stent/nephrostomy). Bold marks the
  googleable handles (rendered via `prose()` **bold**; copy uses `plain()`).
- Reference artifact: [gallery_specific.html](gallery_specific.html).
- **Open knob:** brand names — keep generic + brand in parens only for the few
  household-recognisable agents (sildenafil (Viagra), tadalafil (Cialis),
  tamsulosin (Flomax)), generic-only otherwise. (Default; confirm.)

## Out of scope (this pass)
- A print/handout layout or PDF export (copy-paste only for v1).
- Translations.
- Reading-level automation (Flesch scoring) — author to plain language by hand.
