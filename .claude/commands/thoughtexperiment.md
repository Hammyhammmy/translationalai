# /thoughtexperiment — Structured pros-and-cons before committing

# Usage
# /thoughtexperiment <design question>
# Example: /thoughtexperiment hand-drawn SVG vs procedural 3D for the anatomy figures
# Example: /thoughtexperiment one long reference page vs split per-station pages
#
# You can also say it naturally in conversation:
#   "let's /thoughtexperiment this before we commit"
#   "do a thought experiment on pros and cons. then we'll know what best to do"
#
# This command tells Claude to STOP, frame the decision rigorously, and produce a
# structured pros-and-cons analysis BEFORE touching code or committing to a build.
# No implementation while a thought experiment is in flight.

You are running a thought experiment. This is the deliberation phase, not the execution phase. Follow this contract.

---

## When to use this skill

Use it when:
- The user is about to make (or undo) a non-trivial decision — visual direction, page structure, tech approach, naming, content scope, an invariant in the teaching model.
- There are two or more coherent options and the right answer is not obvious.
- The pivot cost matters — the decision affects work already shipped, or about to ship.
- The user explicitly asks for a thought experiment, pros-and-cons, or a tradeoff analysis.

DO NOT use it when:
- The answer is obvious from the user's stated goals.
- One option is clearly inferior on every axis (just recommend the better one).
- The user is asking "how do I do X" — that's `/tdd`, not `/thoughtexperiment`.
- The user wants to implement, not deliberate ("just do it" / "go").

---

## Step 0: Frame the question

In your reply, lead with:
1. **One sentence** restating the decision in your own words. This pressure-tests whether you understood.
2. **The options being compared.** Name them (Option A / Option B …). Each must be a coherent, internally consistent choice — not a vague "alternative." If you can't articulate the option in two sentences, you don't understand it yet.

If the framing reveals the decision is actually multiple decisions, flag that and ask the user which one they want to deliberate.

**When the decision is visual/aesthetic, the receipts are artifacts, not prose.** Produce a small concrete sample of each option (an SVG mockup, a code snippet, a layout sketch) so the user compares the real thing, not a description of it. Put them somewhere viewable (a gallery HTML, side-by-side files) before writing the analysis.

---

## Step 1: Generate pros and cons WITH RECEIPTS

For each option, list ~5–10 pros and ~4–8 cons. Each one must be:

- **A specific claim**, not a vague impression. Bad: "cleaner." Good: "labels stay legible at phone width because the figure is vector, not a 460px raster."
- **Tied to a concrete consequence.** Bad: "more flexible." Good: "a new pathology is one `<g>` overlay, not a re-render of the whole mesh."
- **Honest about tradeoffs the user might not have considered.** Surface authoring cost, maintenance cost, load-time/dependency cost, accessibility, how it degrades on mobile/print, how hard the NEXT one is to add.

Avoid:
- Padding the list to look thorough. If only 3 pros exist, list 3.
- Mirroring pros as cons ("flexible" as a pro / "flexible = complex" as a con) — pick one frame and commit.
- Hedging every claim into mush. Be willing to say "this is the worse option for the 80% case."

---

## Step 2: Real-world fit check

Before recommending, do a quick reality check:
- **What's the actual use?** Who reads this, on what device, to learn what? (e.g. "PAs/students on a phone between cases, scanning to localize a lesion to a station.") Pick the option that serves that, not the one that's most fun to build.
- **What's the authoring/maintenance reality?** Be honest about how much hand-work each option costs you to produce well, and to extend to the full case catalog later.
- **What's the pivot cost?** If one option walks back recent work, name the files affected and estimate the cost.
- **Reversible vs. locked-in?** A reversible decision can favor the simpler option; one that sets the visual language for a whole series of pages demands more rigor.

---

## Step 3: Recommendation

Give a clear recommendation. Don't be wishy-washy.

- Name the option you recommend.
- State the single strongest reason (one sentence).
- State the second-strongest reason (one sentence).
- Acknowledge the strongest argument against it and why it doesn't dominate.

If you genuinely can't recommend without more data, say so AND name what data would settle it.

---

## Step 4: Open questions to lock before pivoting

List 1–3 specific questions the user needs to answer before any code moves. These are decisions made AT THE USER LEVEL, not the implementation level.

**Phrase each question in plain English.** The user is the decision-maker, not the implementer:
- **No jargon as the surface word.** Put the plain-English version first; the technical term, if any, goes after.
- **One concrete example per option** so the choice is obvious in seconds.
- **State your default at the end of each question.** "My default: ___. Override?"
- **Max 3 questions.** Re-bundle extra knobs into 1–2 decisions; defer the rest to "Out of scope."
- **When the user signals brain-fry** ("too much brain fry", "in plain English"), restate shorter, with a concrete example and your default for each. Don't make them re-read the original list.

These questions are the bridge from "thought experiment done" to "/tdd plan."

---

## Step 5: Save the artifact (optional but encouraged)

If the thought experiment is substantive (more than a couple paragraphs), save it to:

```
/Users/work/python-local/squarespace_translationalca/active_features/thoughtexp_<topic-slug>_YYYY-MM-DD.md
```

So the deliberation has a durable record. Mirror the structure above (frame → options → pros/cons → fit check → recommendation → open questions). Link any mockup files you produced. Inline-only is fine for quick experiments.

---

## Rules

- **No code changes to the real product during a thought experiment.** Throwaway mockups/samples that exist only to compare options are fine (that's the receipts step) — but don't edit the shipping pages until the user has picked.
- **No false balance.** If Option A is better, say so. Don't manufacture symmetric lists to look fair.
- **No mirroring back the user's lean uncritically.** The user often has a strong intuition; your job is to pressure-test it, not validate it. If it's right, show why and surface the second-order tradeoffs. If it's wrong, push back with the receipt.
- **Don't conflate "decision" with "implementation."** A thought experiment ends with the user picking an option; THEN a `/tdd` plan executes it.
- **Be willing to recommend "stay the course."** Sometimes the right answer to "should we pivot?" is "no."
- **End with one explicit ask of the user.** "Pick A or B and I'll /tdd it" — never leave the next step ambiguous.

---

## What good output looks like

A finished thought experiment lets the user:
1. Restate every option accurately in their own words.
2. Name the top 2–3 reasons for each side.
3. See/feel the real artifact, not a description of it.
4. Know what to answer before any pivot.
5. Pick an option and hand it to `/tdd`.

If the user reads your output and still asks "but what should I do?" — your recommendation wasn't clear enough. Sharpen it.
