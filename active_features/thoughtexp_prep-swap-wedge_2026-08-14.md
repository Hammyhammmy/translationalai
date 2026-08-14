# Thought experiment — the ChartPrepper wedge: "prep-swap" vs "Teams" rebrand

_2026-08-14 · outcome: **No rebrand. Lead with a task-swap wedge; adaptive referral-generated history is the moat.**_
_Source prompt: should we rebrand on chartprepper-app/docs/thought_experiments/chartprep-teams-branding_2026-08-14.md_
_Mockup: [mockup_prep-swap-wedge_2026-08-14.html](mockup_prep-swap-wedge_2026-08-14.html)_

## The decision, in one sentence
How to surface the whole-team + patient contribution capability on the marketing site — as a "ChartPrepper
Teams" rebrand/tier, or by extending the provenance identity the site already owns — and, underneath that,
what the actual **buyer wedge** is.

## What got settled (in order)

1. **No "Teams" rebrand.** The site's whole identity is provenance ("every sentence traced to source").
   A "Teams" wordmark adds a 5th brand fragment + advertises a seats/pricing surface the build deferred
   (staff inherit the prime's tier). Keep the name **ChartPrepper**, the rust `[ • ]` mark, no new palette.
2. **The wedge is a swap of the chart-prep *task*, not a *scribe*.** Aim at pre-visit chart prep (assemble
   the referral pile → prepped chart), NOT ambient scribing — that avoids the crowded DAX/Abridge/Ambience
   fight and is true to the product. The budget line already exists (docs pay for prep), which is the wedge.
3. **Frame the enemy as the work, not the worker.** "The chart prepper you don't have to hire" was rejected:
   it (a) reads as replacing humans, which the founder rejects, and (b) *contradicts the moat*, which is
   pro-human (team + patient make the note great). Chosen H1: **"Chart prep, without the prep work."**
   Swap chip: ~~the hours of manual prep before every clinic~~ → prepped before you open the chart.
4. **The moat is adaptive, referral-generated history.** Unlike a generic/hand-built intake form (Ocean),
   ChartPrepper reads *this* referral, computes what's missing for the case, and asks only the gaps — so the
   patient/MOA/PA answer the right questions, not boilerplate. **Imply Ocean, don't name it.**
5. **Proof = traceability + contributor byline.** Every answer lands as a citable source (`[ • ]`). The named
   "prepared by: patient · MOA · you" byline is **gated on the app slice** (`data.contributors[]`, per the
   source doc) — sell the section now, add the byline when the app ships; label it honestly until then.

## The pitch spine (locked)
- **Wedge / hero:** "Chart prep, without the prep work." — manual assembly evaporates. (true & sellable now)
- **Moat / section:** the history isn't a form you fill — it's generated from the referral; team + patient
  answer only the real gaps. (also the inoculation against "isn't this just Ocean?")
- **Proof:** traceable-to-source `[ • ]`; contributor byline deferred to the app update.

## Pivot cost
Additive to `index.html` — a hero copy change + a new moat section. No rename, no new palette, no page churn.
Reversible. Site currently mentions patient/intake 12×, staff/MOA 1× — the moat is genuinely under-told.

## Recommendation (delivered & accepted)
Option A at *headline volume* (not a byline footnote): task-swap hero + adaptive-history moat, ChartPrepper
name kept. Rejected: "Teams" rebrand (fragments brand, premature pricing) and scribe framing (crowded).

## Next → /tdd
Rewrite `index.html` hero to the swap line + reframed chip, and add the "history generated from the referral"
moat section (form-vs-generated contrast, Ocean implied). Byline rendered but labeled as shipping with the
app update. Match existing palette/mono/`[ • ]` mark.
