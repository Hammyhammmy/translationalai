// "When patients ask…" — real patient questions + model SPOKEN answers a PA can adapt.
// DRAFT — pending clinician review. Not medical advice.
//
// This block is deliberately in the second-person spoken register ("you"), UNLIKE the
// third-person `patient` block in patient.js (which forbids "you" by test). Different job:
// patient.js explains; this rehearses what to *say* when the patient asks out loud.
//
// TWO BUCKETS
//   SHARED_ASK  — canned answers whose wording does NOT change with the diagnosis
//                 (scan logistics, anaesthetic, generic meds). Authored ONCE, surfaced by
//                 the stage groups an entry opts into via `shared: [...]`.
//   ASK         — bespoke, per-entry, grouped by theme so a ~20-question set stays scannable.
//
// OVERRIDE: if an entry authors an item whose `key` matches a shared item's key, the entry's
//   answer wins ("canned unless overridden"). Renderer merges: bespoke groups first, then the
//   opted-in shared groups, dropping any shared item the entry overrode.
//
// Item shape:  { key, q, a, why? }   — q/a are plain strings; `why` is the teaching note.
// Coverage intent: a test (cf. patient-coverage.test.mjs) will assert every encounter entry
//   has an ASK set and that each stage's must-answer questions are present.

import { retention } from './qa-drafts/presentation_retention.js';
import { hematuria } from './qa-drafts/presentation_hematuria.js';
import { acute_scrotum } from './qa-drafts/presentation_acute_scrotum.js';
import { luts } from './qa-drafts/presentation_luts.js';
import { chronic_pelvic_pain } from './qa-drafts/presentation_chronic_pelvic_pain.js';
import { microscopic_hematuria } from './qa-drafts/presentation_microscopic_hematuria.js';
import { recurrent_uti } from './qa-drafts/presentation_recurrent_uti.js';
import { stone_prevention } from './qa-drafts/presentation_stone_prevention.js';
import { elevated_psa } from './qa-drafts/presentation_elevated_psa.js';
import { asymptomatic_bacteriuria } from './qa-drafts/presentation_asymptomatic_bacteriuria.js';

export const SHARED_ASK = {
  imaging: {
    title: 'Tests & scans',
    items: [
      { key: 'scan_hurt', q: 'Does the scan hurt?',
        a: 'No — it’s quick and painless. You lie still on the couch for a few minutes and that’s it; the machine doesn’t touch you.' },
      { key: 'radiation', q: 'Is the radiation dangerous?',
        a: 'The dose is small, and we only scan when what it tells us is worth it — we don’t x-ray people for the sake of it. For the odd scan the risk is tiny next to the benefit of getting the diagnosis right.',
        why: 'Answer the proportionality honestly rather than “it’s totally safe” — patients trust a real risk-benefit more than a brush-off.' },
      { key: 'contrast_dye', q: 'The dye — is that safe, especially for my kidneys?',
        a: 'For most people it’s very safe. We check a kidney blood test first, and you flush it out afterwards with normal drinking. Do tell us about any past reaction to contrast or bad allergies.',
        why: 'Name the two real caveats — renal function and prior reaction — so it reads as careful, not dismissive.' },
      { key: 'results_when', q: 'When will I get the results?',
        a: 'Often the same visit or shortly after. Someone will talk you through what the scan shows before any decisions are made — you won’t be left guessing.' },
    ],
  },

  anaesthetic: {
    title: 'The procedure & anaesthetic',
    items: [
      { key: 'asleep', q: 'Will I be awake or asleep?',
        a: 'It depends on the procedure — many are done under a general anaesthetic so you feel and remember nothing, and some smaller ones under a local. Whoever’s doing it will tell you which, and why.' },
      { key: 'hospital_long', q: 'How long will I be in hospital?',
        a: 'A lot of these are day cases — in and home the same day. Bigger operations mean a night or a few. We’ll give you a realistic idea for your one so you can plan.' },
      { key: 'eat_before', q: 'Can I eat and drink beforehand?',
        a: 'If you’re having an anaesthetic you’ll be asked not to eat for a few hours before — we’ll give you exact timings. Miss those and the procedure can get delayed, so they matter.' },
      { key: 'home_after', q: 'Can I drive myself home afterwards?',
        a: 'Not after sedation or a general anaesthetic — you’ll need someone to take you home and ideally stay with you for the first day. Best to sort that out in advance.' },
    ],
  },

  meds: {
    title: 'Your medication',
    items: [
      { key: 'side_effects', q: 'What are the side effects?',
        a: 'Most people take it without much trouble. I’ll go through the common ones for this particular medicine, and the few that mean you should stop and ring us — the rest usually settle.',
        why: 'Generic frame only — the specific side effects are drug-class specific and should be OVERRIDDEN per entry.' },
      { key: 'miss_dose', q: 'What if I miss a dose?',
        a: 'Take it when you remember, unless it’s nearly time for the next one — then just skip the missed one. Don’t double up to catch up.' },
      { key: 'stop_early', q: 'Can I stop when I feel better?',
        a: 'For an infection, finish the whole course even once you feel well, or it can come back stronger. For a long-term medicine, don’t stop suddenly without checking with us first.',
        why: 'Two different rules under one question — antibiotics (finish) vs chronic meds (don’t stop abruptly). Override if the entry is clearly one or the other.' },
    ],
  },
};

export const ASK = {
  // ── EXEMPLAR (locked in review 2026-07-11) — all later entries match this shape/voice ──
  renal_colic: {
    stage: 'presentation',
    shared: ['imaging', 'anaesthetic'],
    groups: [
      {
        title: 'Understanding what’s wrong',
        items: [
          { key: 'what_causing', q: 'What’s actually causing this pain?',
            a: 'A small stone that’s formed in your kidney is trying to pass down the narrow tube to your bladder. Where it sticks, it blocks the flow and stretches the tube — and that stretching is what causes the waves of pain.' },
          { key: 'how_big', q: 'How big is it — is that big?',
            a: 'The scan measures it in millimetres. Small ones — under about 5mm — usually pass on their own; bigger ones are more likely to need a hand. I’ll tell you which side of that line yours is on.' },
          { key: 'cancer', q: 'Could this be something serious, like cancer?',
            a: 'It’s a natural thing to worry about and I won’t brush it off. What you’ve got looks like a stone, which isn’t a cancer — but because blood in the urine can occasionally come from something more serious, the scan we’re doing checks for that too. We’re not ignoring the worry; we’re actively looking.',
            why: 'Never answer the cancer question with a flat “no.” Validate it, say a stone isn’t cancer, but show the workup already covers the worry — honest and reassuring.' },
          { key: 'my_fault', q: 'Is this something I did — my diet?',
            a: 'Sometimes diet plays a part, but plenty of people who do everything “right” still form stones — so this isn’t about blame. Once we know the stone type we can say whether any specific changes will actually help you.',
            why: 'Defuse guilt — a blamed patient disengages from the prevention advice you’re about to give.' },
        ],
      },
      {
        title: 'The pain',
        items: [
          { key: 'why_bad', q: 'Why is it this bad — can’t I just take painkillers at home?',
            a: 'Kidney-stone pain is honestly one of the most severe there is — this isn’t you over-reacting. Right now you need faster relief than home tablets, usually an anti-inflammatory injection. Once the scan’s clear, a lot of people do go home to pass a small stone with tablets.',
            why: 'Validate the severity first — patients feel judged for “making a fuss” — then justify hospital-now without over-promising a quick fix.' },
          { key: 'stronger', q: 'Can I have something stronger?',
            a: 'Yes — and the most effective thing here is actually a strong anti-inflammatory rather than a heavy opioid, which we can give by injection so it works fast. Tell us straight away if it isn’t touching it.' },
          { key: 'waves', q: 'Why does it come and go in waves?',
            a: 'The tube squeezes in waves to try to push the stone along; each squeeze against the blockage is what brings the pain in surges rather than one constant ache.' },
        ],
      },
      {
        title: 'What happens now',
        items: [
          { key: 'pass_itself', q: 'Will it pass on its own?',
            a: 'Most small stones do, often within a few weeks, and we can give a tablet that relaxes the tube to help it along. We’ll agree a plan and a clear safety net for if it doesn’t.' },
          { key: 'do_nothing', q: 'What happens if I just do nothing?',
            a: 'For a small stone, sometimes very little needs to happen — it passes and that’s fine. The reason we don’t just wait blindly is that a stone can quietly block the kidney or let infection build behind it, and a blocked, infected kidney turns dangerous fast. So “nothing” is a fair option — but only once the scan shows the kidney isn’t obstructed.',
            why: 'Honour the question (some stones need no intervention) but draw the red line — obstruction + infection — so “nothing” is an informed choice, not neglect.' },
          { key: 'need_surgery', q: 'Will I need surgery?',
            a: 'Only if it’s too big to pass, gets stuck, or is blocking the kidney. Even then it’s usually keyhole — a camera passed up the natural tube with no cut, or a sound-wave treatment that breaks the stone up. I’ll explain whichever one fits you.' },
          { key: 'risks', q: 'What are the risks of that procedure?',
            a: 'Mostly minor and short-lived — some blood in the urine and stinging for a day or two. Less commonly an infection, which is why we sometimes give antibiotics, or a bruised tube. Serious problems are rare, and the whole point is to protect a kidney that’s at more risk if we leave it. The surgeon goes through all this and takes your consent beforehand.',
            why: 'Structure it — common-and-minor → less-common → rare-but-serious → why we still do it. Consent is the operating surgeon’s job, not the PA’s.' },
          { key: 'stent', q: 'What’s a stent — how long is it in for?',
            a: 'It’s a soft internal tube that holds the drainage open while things settle; it goes in and comes out through the same natural passage, no cut. Usually only a week or two — and we book the removal date straight away, because a stent left too long can crust up.',
            why: 'Plant “the removal date isn’t optional” now — a forgotten stent is a real harm. Warn it can feel uncomfortable so they don’t think it’s failed.' },
          { key: 'asleep', q: 'Will I be asleep for it?',
            a: 'Yes — these are usually done under a general anaesthetic, so you won’t feel or remember anything.',
            why: 'OVERRIDES the shared anaesthetic answer with the stone-specific certainty.' },
        ],
      },
      {
        title: 'Day to day',
        items: [
          { key: 'drink_water', q: 'Should I drink more water?',
            a: 'Yes — plenty of fluid helps flush a small stone through and lowers the chance of the next one. A good aim is to keep your urine pale.' },
          { key: 'work_drive_fly', q: 'Can I go to work, drive, fly?',
            a: 'Once the pain’s controlled, work and driving are fine. Flying’s okay too, though it’s sensible not to travel far while you’re still in the thick of passing it, in case the pain flares somewhere without easy help.' },
          { key: 'catch_stone', q: 'Should I try to catch the stone?',
            a: 'If you can, strain your urine and keep it — sending the stone off tells us exactly what it’s made of, which shapes how we stop the next one.' },
          { key: 'home_pain', q: 'What can I take for the pain at home?',
            a: 'Regular anti-inflammatories like ibuprofen if they suit you, taken with food — they work better than paracetamol for this. We’ll make sure you leave with a clear plan.' },
        ],
      },
      {
        title: 'When to come straight back',
        items: [
          { key: 'red_flags', q: 'When should I worry — when do I come back?',
            a: 'Come straight back if you get a fever or the shivers, if the pain becomes uncontrollable despite the tablets, if you’re vomiting and can’t keep fluids down, or if you can’t pass urine at all. A fever with this kind of pain especially needs to be seen urgently.',
            why: 'The safety-net is the single most important thing they leave with — a fever on top of a blocked kidney is the emergency you’re screening for. Say it plainly, every time.' },
        ],
      },
      {
        title: 'Stopping another one',
        items: [
          { key: 'come_back', q: 'Will it come back?',
            a: 'Honestly, once you’ve made one stone there’s a real chance of another over the years — but that’s exactly why it’s worth checking what this one’s made of and making a few simple changes, mostly just drinking more, that genuinely lower the odds.',
            why: 'Don’t falsely reassure — recurrence is common. Pivot to prevention so the honest answer hands them agency rather than dread.' },
          { key: 'prevent', q: 'How do I stop it happening again?',
            a: 'Mostly drinking more so your urine stays pale, plus any specific tweak once we know the stone type. For repeat stones we sometimes run a set of tests to look for a cause we can treat directly.' },
          { key: 'children', q: 'Do my children need checking?',
            a: 'There can be a family tendency to some stones, but there’s no routine test for the kids unless several close relatives are affected. I wouldn’t lose sleep over it.' },
        ],
      },
    ],
  },

  // ── Presentations tab — drafted 2026-07-11, first pass pending clinician review (source: qa-drafts/) ──
  retention, hematuria, acute_scrotum, luts, chronic_pelvic_pain,
  microscopic_hematuria, recurrent_uti, stone_prevention, elevated_psa, asymptomatic_bacteriuria,
};

// Entry-id → stage, so the renderer knows which SHARED_ASK groups are offered by default.
// (Entries can still override via their own `shared: [...]`.)
export const STAGE_SHARED = {
  presentation: ['imaging'],
  condition: ['imaging'],
  operation: ['anaesthetic'],
  medication: ['meds'],
  followup: [],
  oncology: ['imaging', 'anaesthetic'],
};

export function askFor(id) { return ASK[id] || null; }

// Bespoke groups followed by the opted-in shared groups, dropping any shared item the
// entry overrode by key ("canned unless overridden").
export function mergedGroups(entry) {
  if (!entry) return [];
  const ids = entry.shared || STAGE_SHARED[entry.stage] || [];
  const bespokeKeys = new Set((entry.groups || []).flatMap((g) => g.items.map((i) => i.key)));
  const shared = ids
    .map((id) => SHARED_ASK[id])
    .filter(Boolean)
    .map((g) => ({ title: g.title, shared: true, items: g.items.filter((i) => !bespokeKeys.has(i.key)) }))
    .filter((g) => g.items.length);
  return [...(entry.groups || []), ...shared];
}
