# Thought experiment — ChartPrepper "case study" page

**Date:** 2026-08-02
**Decision:** What scenarios, how many, and what page structure make the strongest
case-study/use-case page under `assets/aug2animation/`, in the new index.html visual
language (IBM Plex, teal, animated provenance panels).

This is really **two nested decisions**:
- **D1 — Which scenarios** to feature (the user floated 4+).
- **D2 — Page structure** (one deep case vs. a curated gallery vs. a persona switcher).

---

## D2 — Structure options

**Option A — One flagship deep-dive.** Follow a single clinic through the whole loop
(Monday referral pile → bulk prep → provenance → note pasted to EMR). One protagonist,
one narrative, one big animated sequence.

**Option B — Curated workflow gallery (3 vignettes).** Three self-contained scenario
sections, each with a short protagonist line + its own animated mini-demo reusing the
mock's panel components. Breadth; "here's how different people use it."

**Option C — One case, persona switcher.** A single referral viewed through a toggle
(Specialist view / PA view / Patient view) — same data serving each role. Clever, but
the most build-heavy and the hardest to grasp in 5 seconds.

### Pros / cons

**Option A (deep single)**
- + Reads like an actual *case study* (protagonist + outcome), not a feature list.
- + One animation to build well beats four built thinly.
- + Naturally lands the provenance payoff at the end of a real arc.
- − Covers one persona; the PA/multi-office and intake stories go untold.
- − Higher risk of feeling like a longer hero demo (redundant with index.html).

**Option B (gallery of 3)**
- + Directly answers "who uses it and how" — matches how the user is thinking (personas).
- + Reuses the existing animated-panel pattern 3× → consistent, incremental build.
- + Each vignette can carry a light protagonist ("Dr. Garbens' Monday pile") so it still
  reads as case studies, plural.
- + Easy to add a 4th later without restructuring.
- − Breadth over depth; none goes as deep as Option A.
- − Three distinct animations = 3× the demo authoring cost.

**Option C (persona switcher)**
- + Best "aha": the *same* record serves specialist, PA, and patient differently.
- + Demonstrates the multi-specialty/field-set adaptivity viscerally.
- − Most complex to build (stateful toggle rewiring a shared panel) and to explain.
- − Interaction cost: users must *do* something to get the point, vs. scroll-and-watch.

---

## D1 — Scenario scoring (1–5, higher = stronger for this page)

| Scenario | Differentiation | Authenticity | Demo-ability | Buyer pull | Risk |
|---|---|---|---|---|---|
| **Busy specialist, bulk-upload the referral pile** | 4 | 5 | 5 | **5** | low |
| **PA across multiple offices, multi-specialty switch** | **5** | 4 | 4 | 3 | low |
| **Patient/PA self-service intake → citable sources** | 3 | 4 | 4 | 4 | med (consent framing) |
| **AI colleague + preventative health** | 3 | 3 | 3 | 3 | **high** (medical-device/DSS claims) |

Notes:
- **Bulk-upload** is the core buyer (the specialist) and their #1 pain — the strongest
  single scenario, and the most satisfying animation (pile → split/dedup/filed → one-screen).
- **Multi-office PA** is the most *differentiated* — nobody else frames the "swap supervisor,
  the whole field set + intake + note structure reconfigures" story. Great "handles my
  complexity" beat; the PA is the champion even when not the buyer.
- **Self-service intake** is solid and ties patient answers → anchored sources (already a
  landing feature). Keep the framing clinical, not consumer, to stay "for specialists."
- **AI colleague** = fine as a *supporting* beat. **Preventative health is the risky bit** —
  guideline prompts / recommendations edge toward clinical decision support, and the app
  explicitly positions as "not a certified medical device." Don't lead with it; if shown,
  keep it strictly "advisory, never note content," matching the landing's existing framing.

---

## Real-world fit check

- **Who reads this?** A specialist (or their admin/PA) evaluating whether it fits *their*
  messy workflow — on desktop mostly, scanning for "does it handle MY situation."
- **Authoring reality:** the visual language is already locked (matches index.html), so cost
  is in the 3 animated demos, not design. Reusing the mock's panel components keeps it bounded.
- **Pivot cost:** ~zero — this is a **new, additive page**. Nothing shipped gets walked back.
  That means the decision is low-stakes/reversible → favor picking and building over endless
  deliberation.
- **Redundancy watch:** must not just re-run the hero demo. Each vignette should show a
  *different* moment (batch ingest; specialty reconfiguration; intake→source), not re-litigate
  single-note provenance.

---

## Recommendation — Option B, curated to 3 (not 4)

Build a **workflow gallery of three vignettes**, each a short protagonist line + a distinct
animated demo, in this order:
1. **The Monday pile** — busy specialist bulk-uploads; chaos → filed one-screen charts.
2. **One PA, three clinics** — supervisor switcher reconfigures specialty field sets/intake/note.
3. **The patient fills the gaps** — self-service intake; answers become citable sources.
Plus a small **AI-colleague** supporting strip ("advisory second read, kept out of the note").
**Defer preventative health.**

- **Strongest reason:** it matches how buyers self-qualify ("is my workflow in here?") and
  reuses the animated-panel pattern for a consistent, bounded build.
- **Second reason:** three beats cover the two buyer segments (specialist + PA champion) and
  the pre-visit value, without diluting into four thin demos.
- **Strongest counter-argument (and why it loses):** Option A reads more like a "real" case
  study. But we already have a deep single-case animation on the landing; a *second* one risks
  redundancy, whereas the gallery shows breadth the landing doesn't.

### Structure sketch (receipt)
```
[shared nav.js]
HERO   "How specialist clinics actually use ChartPrepper"
        sub: three real workflows · one anchoring guarantee
① THE MONDAY PILE            specialist · bulk upload
   [anim] 40 mixed PDFs → split · dedup · filed by visit date → one-screen charts → provenance
② ONE PA, THREE CLINICS      PA · multi-office / multi-specialty
   [anim] supervisor toggle: Urology ⇄ GI ⇄ Nephro → fields, intake, note structure reflow
③ THE PATIENT FILLS THE GAPS pre-visit intake
   [anim] questionnaire → answers drop into the chart as cited sources
— supporting strip — AI colleague: advisory second read, labelled, never note content
CTA    "Bring one messy referral. We'll prep it."  → pilot access
[shared footer]
```

---

## Open questions to lock before building

1. **Plural workflows, or one flagship story?** Three short scenarios (specialist / PA /
   patient), or one deep clinic case followed end-to-end? *My default: three scenarios (Option B).*
2. **Include the AI-colleague beat, and drop preventative-health?** AI colleague shown small
   and strictly "advisory"; preventative-health deferred for medical-device-claim caution.
   *My default: yes — keep AI colleague as a supporting strip, defer preventative health.*
3. **Real protagonists or archetypes?** Name them (e.g. "Dr. Garbens' Monday pile", a named PA
   across three clinics) or keep them generic ("a busy urologist", "a PA across three offices")?
   *My default: light archetypes, reuse Dr. Garbens only where already true.*

**Out of scope for now:** exact copy, the preventative-health module, any new claims about
data/security beyond the landing's honest set.
```
