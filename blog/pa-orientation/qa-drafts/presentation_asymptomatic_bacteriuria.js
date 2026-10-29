// "When patients ask…" — asymptomatic_bacteriuria
// DRAFT — pending clinician review. Not medical advice.
// Second-person spoken register, matched to the renal_colic exemplar in urinary-qa.js.
// Core skill rehearsed here: explaining a "watchful non-treatment" plan warmly, without
// sounding like care is being withheld — and naming the exceptions (pregnancy, before
// urological surgery) and the safety-net (new symptoms, fever) plainly.

export const asymptomatic_bacteriuria = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'What the test showed',
      items: [
        { key: 'what_found', q: 'What did the test actually find?',
          a: 'The urine sample grew some bacteria. That sounds alarming, but on its own it just means a few bugs are living in the urine — which is surprisingly common, especially as we get older or if there’s a catheter. It only counts as an infection when it’s making you unwell, and right now it isn’t.' },
        { key: 'have_infection', q: 'So I’ve got a urine infection?',
          a: 'Not in the way that word usually means. A true urine infection comes with symptoms — stinging, needing to go all the time, pain, feeling feverish. What you’ve got is bacteria in the urine with none of that, and we treat those two things very differently.',
          why: 'The whole consultation turns on separating “bacteria present” from “infection” — draw that line early and everything after it makes sense.' },
        { key: 'why_tested', q: 'Then why was my urine tested at all?',
          a: 'Often it gets checked as part of looking into something else, and the bacteria turn up by chance. That’s a good moment to say: we try not to test urine when there aren’t symptoms, precisely because a result like this can send people down a treatment path they never needed.',
          why: 'Names the overtesting problem gently — the incidental positive is the origin of most inappropriate treatment.' },
      ],
    },
    {
      title: 'Why we’re not giving antibiotics',
      items: [
        { key: 'why_no_abx', q: 'Why aren’t you giving me antibiotics?',
          a: 'Because here they’d do more harm than good. With no symptoms, antibiotics won’t make you feel any better — there’s nothing to feel better from — but they still carry side-effects and they help bugs become resistant, so the drug won’t work when you genuinely need it one day. Holding off is the active, careful choice, not us cutting corners.',
          why: 'This is the counter-intuitive teaching point. Frame non-treatment as a positive decision made FOR the patient, not a refusal — patients hear “no antibiotics” as “no care” unless you reframe it.' },
        { key: 'not_withholding', q: 'It feels like you’re not treating me — is that safe?',
          a: 'I understand it can feel that way, and it’s a fair thing to ask. But treating this wouldn’t be doing more for you — it’d be doing something to you that only has downsides. Safe care here is watching sensibly and knowing exactly when to step in, which we’ll set up together.',
          why: 'Directly addresses the “withholding” fear that undermines the plan. The reassurance is that a plan + safety-net IS the treatment.' },
        { key: 'resistance', q: 'What’s the harm in just taking them to be safe?',
          a: 'Two real harms. Antibiotics upset a lot of people — nausea, yeast infections, sometimes a nasty gut infection called C. difficile. And every unnecessary course nudges bacteria towards resistance, so the next infection is harder to treat. “Just in case” isn’t free.' },
      ],
    },
    {
      title: 'Won’t it spread or get worse?',
      items: [
        { key: 'spread_kidneys', q: 'Won’t it spread up to my kidneys?',
          a: 'That’s the sensible worry, and the reassuring answer is that bacteria sitting quietly in the urine like this very rarely climb up and cause a kidney infection. Treating them with antibiotics doesn’t actually lower that small chance — which is another reason it’s not worth the downsides.',
          why: 'The kidney-spread fear is often what drives the demand for antibiotics; answer it head-on AND note that treatment doesn’t reduce the risk, which is the evidence that removes the rationale.' },
        { key: 'get_worse', q: 'Will it get worse if we leave it?',
          a: 'For most people it just sits there and often clears by itself. It doesn’t “build up” into something dangerous while we watch. What we’re looking out for isn’t it getting worse silently — it’s you noticing new symptoms, which is the signal that changes the plan.' },
      ],
    },
    {
      title: 'But my urine smells and looks cloudy',
      items: [
        { key: 'cloudy_smelly', q: 'My urine is cloudy and smells — surely that’s an infection?',
          a: 'It really feels like it should be, but cloudy or strong-smelling urine on its own isn’t a reason for antibiotics. It’s very often just how concentrated the urine is — a bit of dehydration will do it — and it can look and smell like that with no infection at all. Symptoms are what count, not the look or the smell.',
          why: 'A specific, common, high-yield misconception. Patients (and families) treat cloudy/smelly urine as proof — say plainly it is not an indication, and offer the innocent explanation.' },
        { key: 'drink_more', q: 'Would drinking more sort the smell out?',
          a: 'Very often, yes. When urine is more dilute it’s usually paler and less strong-smelling, so keeping well hydrated is a fair thing to try and it does no harm. Aim to keep your urine pale — but don’t force litres if it’s uncomfortable.' },
        { key: 'family_confused', q: 'My relative has become more confused — isn’t that the infection?',
          a: 'It’s a really common assumption, but a positive urine test on its own usually isn’t the cause of confusion, and jumping to antibiotics can mean the real reason gets missed. The safer approach is to look properly for other causes — dehydration, constipation, a new medicine, being unwell in some other way — rather than blame the urine.',
          why: 'Elderly-family scenario is central to this presentation. The teaching point from workup: look hard for a non-urinary cause of confusion before attributing it to bacteriuria.' },
      ],
    },
    {
      title: 'When it WOULD need treating',
      items: [
        { key: 'ever_treat', q: 'So is there ever a time you would treat it?',
          a: 'Yes — a few clear ones. If you develop genuine urinary symptoms or a fever, that’s now a real infection and we treat it. And there are two situations where we treat even without symptoms: pregnancy, and before certain urology operations. Outside those, watchful waiting is right.',
          why: 'Give the full “what changes my mind” list in one place — new symptoms/fever PLUS the two silent exceptions — so the plan has clear edges rather than sounding like a blanket refusal.' },
        { key: 'pregnancy', q: 'Why is it different in pregnancy?',
          a: 'In pregnancy the balance flips: even without symptoms, bacteria in the urine are more likely to cause a kidney infection and can bring on early labour. So in pregnancy we do screen for it and we do treat it — the benefit clearly outweighs the downsides there.' },
        { key: 'before_surgery', q: 'Why treat it before an operation?',
          a: 'If you’re having a urology procedure that breaks the lining of the urinary tract, we clear the bacteria first so we’re not pushing them into the bloodstream during the op. That’s a specific, one-off reason — it doesn’t mean the bacteria were harming you day to day.' },
        { key: 'not_before_surgery', q: 'I’m having another operation — do I need it treated for that?',
          a: 'For operations that aren’t on your urinary tract, no — there’s no benefit in treating this beforehand, and the same downsides apply. It’s specifically urology procedures that break the lining where we clear it first.',
          why: 'Guards against over-generalising the surgical exception. The indication is urological instrumentation that breaches the mucosa, not any surgery.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'red_flags', q: 'What symptoms mean I should come back and get it treated?',
          a: 'Come back if you get genuine urinary symptoms — burning or stinging when you go, needing to rush or go far more often, pain low down or in your back, or blood in the urine. And come straight back, more urgently, if you get a fever, shivering or shakes, or feel suddenly very unwell — that’s the picture of a real infection that does need antibiotics.',
          why: 'The safety-net is the most important thing they leave with, and the thing that makes non-treatment safe. Split it: new urinary symptoms → get seen; fever/systemic → seen urgently. Say it plainly, every time.' },
        { key: 'catheter', q: 'I have a catheter — does that change things?',
          a: 'With a catheter there’ll almost always be some bacteria in the urine, and that alone still isn’t treated — antibiotics won’t clear it while the catheter’s in, they just cause resistance. But if you get a fever, the shivers or feel unwell, come in — that can be a real infection, and we’d treat it with antibiotics and usually change the catheter.' },
      ],
    },
  ],
};
