// "When patients ask…" — DRAFT for clinician review. Not medical advice.
// Entry: presentation `hematuria` (Visible haematuria — blood in the urine).
// Voice/shape matched to the ASK.renal_colic exemplar in urinary-qa.js.
// Clinical source: PRESENTATIONS.hematuria in urinary-presentations.js only (+ safe general knowledge).
// `shared: ['imaging']` — pure scan-logistics questions (does the scan hurt, results timing,
// radiation, contrast dye) are inherited from SHARED_ASK.imaging and NOT re-authored here.

export const hematuria = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'Understanding what’s wrong',
      items: [
        { key: 'what_is_it', q: 'What does it mean that there’s blood in my urine?',
          a: 'It means blood is getting into your urine somewhere along the waterworks — the kidneys, the tubes down from them, the bladder, or the outlet. Seeing it, or finding it on a dip test, is the signal to go looking for where it’s coming from. The blood itself isn’t the illness — it’s the clue that points us to the cause.' },
        { key: 'how_much', q: 'It looks like a lot of blood — have I lost a dangerous amount?',
          a: 'It usually looks far more dramatic than it is — even a tiny amount of blood turns a whole toilet-bowl red, so please don’t judge it by the colour. We’ll check a blood count to be sure. What matters more than the colour is whether it’s still flowing heavily or you’re passing clots, and we’ll keep an eye on that.',
          why: 'Patients equate red water with catastrophic loss. Reframe the colour, but don’t dismiss — heavy ongoing bleeding is a genuine red flag, so name what actually worries us.' },
        { key: 'no_pain', q: 'If it doesn’t even hurt, can it really be a problem?',
          a: 'This is the part people find hardest to believe — painless blood is actually the kind we take most seriously, not the least. Pain would point us toward a stone or infection; blood with no pain at all is the pattern that always earns the full set of tests, precisely because it can be the only warning sign of something that needs catching early.',
          why: 'The core teaching point of this presentation: painless visible haematuria is malignancy-until-proven-otherwise. Counter the intuitive “no pain = no problem” head-on without frightening.' },
      ],
    },
    {
      title: 'Is it serious',
      items: [
        { key: 'cancer', q: 'Could this be cancer?',
          a: 'I’m not going to brush that worry off, because it’s the right question to ask. The honest answer is that blood in the urine is taken seriously precisely because it can sometimes be the first sign of a cancer of the bladder or kidney — which is exactly why it always earns a full, proper look rather than a quick reassurance. Most people who bleed turn out not to have a cancer. But the way we reassure you is by checking thoroughly, not by guessing.',
          why: 'Never a flat “no” for painless visible haematuria. The honest line: it’s taken seriously BECAUSE it can signal cancer, so it earns a full workup — reassure via the thoroughness of the look, not by dismissing the fear.' },
        { key: 'settled_still_tests', q: 'It’s stopped now — do I still need all these tests?',
          a: 'Yes — and I know that’s frustrating when you feel back to normal. Blood in the urine very often settles on its own, but settling doesn’t tell us why it happened, and the causes we most want to rule out don’t announce themselves by carrying on bleeding. So one episode, even a single one that’s gone, is still worth the full check.',
          why: 'Source: “it always earns a full workup even if it settles.” Patients disengage once the visible sign is gone — hold the line that stopping ≠ explained.' },
        { key: 'just_uti', q: 'Couldn’t it just be a water infection?',
          a: 'It might be — but I don’t want to settle on that too quickly, because “probably an infection” is one of the commonest ways a more serious cause gets missed. If a urine sample proves an infection, we treat it, and then we re-test to make sure the blood has completely cleared. If it hasn’t, we keep looking. An infection has to be proven and then seen to resolve — not just assumed.',
          why: 'Source pearl: never close the loop on “probable UTI” unless the culture is positive AND the haematuria clears on a follow-up dip. This is the key safety message of the entry.' },
        { key: 'blood_thinners', q: 'I’m on blood thinners — isn’t that just the cause?',
          a: 'It’s a fair thought, and we’ll always review your blood thinners and check your clotting as part of this. But here’s the important bit: being on a thinner doesn’t excuse us from looking for a cause. It can make a bleed show up, but it often makes visible something that was there to be found — so we still do the same full check rather than blaming the tablets and stopping there.',
          why: 'Source only lists “clotting/anticoagulant review” in workup — it does NOT state anticoagulants are a sufficient explanation. Standard teaching is that anticoagulation unmasks rather than fully explains haematuria; keep the answer to that safe general line and flag for clinician confirmation.',
          review: 'Source supports reviewing anticoagulation/clotting but does not state whether it can be accepted as the cause. Confirm the intended teaching line — the draft takes the standard “unmasks, still needs workup” position.' },
      ],
    },
    {
      title: 'The tests',
      items: [
        { key: 'what_tests', q: 'What tests will I actually have?',
          a: 'Three main things. A urine sample to test and culture it. A scan called a CT urogram that pictures your kidneys and the tubes — the upper part of the system. And a cystoscopy, where we look inside the bladder itself with a small camera. Together those cover the whole tract, top to bottom.' },
        { key: 'why_both', q: 'If the scan’s clear, why do I still need a camera in the bladder?',
          a: 'Because the scan and the camera look at different places, and one can’t stand in for the other. The CT urogram is very good at the kidneys and the tubes, but it’s the weakest at seeing the lining of the bladder — and that’s exactly where the camera is best. So a clear scan is genuinely good news for the top half, but it doesn’t clear the bladder. We need both to say we’ve properly looked.',
          why: 'Source: “together CT urogram + cystoscopy form the complete workup … neither alone is enough to clear a patient.” Patients read a clear CT as the all-clear and decline the scope — explain the complementary blind spots.' },
        { key: 'cystoscopy_what', q: 'What is a cystoscopy?',
          a: 'It’s a way of looking directly inside your bladder. A thin, flexible tube with a tiny camera on the end passes along the natural water pipe into the bladder, and we inspect the lining as we go. It’s the most reliable way to check the one place the scan can’t see well.' },
        { key: 'cystoscopy_hurt', q: 'Does the cystoscopy hurt?',
          a: 'It’s uncomfortable rather than painful for most people — a stinging or a strong urge to pass water as the camera goes in and the bladder fills. We use a numbing, lubricating gel first to take the edge off, and it’s usually over in a few minutes. It’s common to sting a little when you pass water for a day or so afterwards, and to see a pink tinge — that settles.',
          why: 'The most-feared test in this set. Be honest (“uncomfortable, not painful”), name the gel and the short duration, and pre-warn the transient stinging/pink urine so they don’t panic and think something’s wrong.' },
        { key: 'awake_scope', q: 'Will I be awake for the camera test?',
          a: 'The flexible camera check is usually done while you’re awake, with just the numbing gel — you can be up and home soon after. Whoever’s arranging yours will confirm exactly how it’s being done for you.',
          why: 'OVERRIDES the shared anaesthetic “asleep?” expectation — flexible cystoscopy is typically an awake, local-gel outpatient procedure, unlike the general-anaesthetic default.' },
      ],
    },
    {
      title: 'What happens now',
      items: [
        { key: 'referral', q: 'Why am I being referred so urgently?',
          a: 'Not because we’ve found something bad — we haven’t looked yet. It’s because blood in the urine is one of the things we don’t sit on. Being seen quickly is how we make sure that if there is a cause worth catching early, we catch it early. Fast doesn’t mean bad news; it means we’re taking it seriously.' },
        { key: 'what_if_found', q: 'What if they do find something?',
          a: 'Then we’ll know exactly what we’re dealing with, and there’ll be a clear plan — the cause gets treated on its own terms. A stone, an infection, an inflamed lining and the more serious causes are all handled differently, so the first job is simply to find out which it is. I’d rather not guess at treatment before we know.' },
        { key: 'what_if_clear', q: 'And if everything comes back clear?',
          a: 'That’s the outcome we see most often, and it’s genuinely reassuring — it means both the scan and the camera have had a proper look and found nothing worrying. Sometimes the bleeding just settles and no single cause is pinned down. We’ll tell you clearly if anything needs keeping an eye on, or if you can draw a line under it.',
          why: 'Give the honest “often nothing is found” reassurance the cancer-fear patient needs — but only after both tests, mirroring the “neither alone clears you” rule.' },
      ],
    },
    {
      title: 'Day to day',
      items: [
        { key: 'keep_active', q: 'Can I carry on as normal while I wait?',
          a: 'For the most part, yes — carry on with your usual day. The main things to watch for are the warning signs I’ll go through with you: heavy bleeding, or trouble passing water. Short of those, there’s no need to wrap yourself in cotton wool while the tests are arranged.' },
        { key: 'drink_water', q: 'Should I drink more water?',
          a: 'Drinking normally is sensible and helps keep things flushing through, especially if you’re passing the odd small clot. There’s no need to force huge amounts. If you’re bleeding more heavily, staying well hydrated is worth it — but that situation needs us to know about it too.',
          why: 'Generic-safe (source doesn’t prescribe fluids for haematuria). Frame as sensible general advice, and route heavier bleeding back to review rather than self-managing with water.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'cant_pee', q: 'What if I suddenly can’t pass water?',
          a: 'Come straight back — that’s one we don’t wait on. If clots block the outlet, the bladder fills up, can’t empty, and becomes painful and swollen. That needs sorting urgently with a special catheter that flushes the clots out — so don’t sit at home hoping it passes. Being unable to pass water at all, with a full, painful tummy, is an emergency.',
          why: 'Red flag from source: clot retention — clots plug the outlet, painful retention needing a three-way catheter and irrigation, “not reassurance.” Must be stated plainly, every time.' },
        { key: 'heavy_bleed', q: 'When is the bleeding itself an emergency?',
          a: 'If it’s heavy and not letting up, or you’re passing a lot of clots, or you feel dizzy, faint, clammy or your heart’s racing — come straight back or call for help. Those are signs you may be losing more blood than is safe, and that needs seeing urgently rather than waiting for your appointment.',
          why: 'Red flag from source: haemodynamic compromise from heavy bleeding — tachycardia and falling haemoglobin mean resuscitate/transfuse. Translate into plain lay warning signs (dizzy, faint, racing heart).' },
        { key: 'fever', q: 'What about a fever?',
          a: 'A fever or the shivers along with the bleeding, or if passing water becomes very painful and you feel unwell, is worth getting checked promptly — it can mean an infection that needs treating. When in doubt, it’s always better to be seen.',
          why: 'Not an explicit red flag in the source (which lists clot retention and heavy bleeding). Kept as a safely generic “get seen” safety-net; flagged so the reviewer can confirm whether to keep, drop, or sharpen it for this presentation.',
          review: 'Fever is not listed among this entry’s red flags in the source (those are clot retention and heavy bleeding/haemodynamic compromise). Confirm whether to retain this generic infection safety-net here or remove it to stay strictly source-aligned.' },
      ],
    },
  ],
};
