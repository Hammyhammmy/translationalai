// "When patients ask…" — LUTS (lower urinary tract symptoms).
// FIRST DRAFT — pending clinician review. Not medical advice.
// Shape and voice matched to the renal_colic exemplar in urinary-qa.js.
// Clinical source: the `luts` entry in urinary-presentations.js (plus safe standard
// general knowledge; items that reach beyond the source carry a `review:` note).

export const luts = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'What’s causing it',
      items: [
        { key: 'what_causing', q: 'What’s actually causing all this?',
          a: 'Your symptoms fall into two patterns, and sorting which one is bothering you most tells us the cause. Trouble getting going — a weak or hesitant stream, straining, dribbling, never feeling quite empty — usually points to the outlet being narrowed, most often by an enlarged prostate. Trouble holding on — needing to go often, sudden urges, getting up at night — usually points to an overactive bladder. Many men have a bit of both, and we treat each part differently.' },
        { key: 'embarrassed', q: 'I feel a bit daft bringing this up — is it worth it?',
          a: 'Honestly, you’re far from alone — a lot of men wait a long time before they say anything, and there’s nothing daft about it at all. It’s exactly the sort of thing worth raising, because most of it can be helped, and mentioning it means we can also rule out the few things that need catching early.',
          why: 'Explicitly validate the embarrassment — many men delay for years. If he feels judged for raising it he won’t come back with the red-flag symptoms that matter.' },
      ],
    },
    {
      title: 'Is it my prostate — is it cancer',
      items: [
        { key: 'my_prostate', q: 'Is it my prostate causing this?',
          a: 'Often, yes — in men your age a weak, hesitant stream is commonly the prostate gently squeezing the outlet as it enlarges. That enlargement itself is benign — not a cancer — but it’s worth us examining the prostate and talking through a blood test so we’re confident about what we’re dealing with.' },
        { key: 'cancer', q: 'Could this be prostate cancer?',
          a: 'It’s a very natural thing to worry about and I won’t brush it off. These symptoms are usually from benign enlargement rather than cancer — in fact early prostate cancer often causes no symptoms at all, so having symptoms isn’t itself a sign of it. But because the two can sit side by side, we don’t just assume: we examine the prostate and can talk through a PSA blood test, so we’re actively checking rather than hoping.',
          why: 'Never a flat “no” to the cancer question. Validate, explain LUTS ≠ cancer and that early cancer is often silent, but keep the DRE/PSA conversation honest — the workup is what reassures.' },
        { key: 'psa_test', q: 'Should I have the PSA blood test?',
          a: 'It’s worth a proper conversation rather than a reflex tick-box. PSA can flag a prostate problem early, but it also rises with benign enlargement and infection, so a raised result doesn’t mean cancer and a normal one isn’t a full all-clear. In Ontario, OHIP covers it if it’s ordered because something’s suspected; as a routine screening test it’s usually around $40 out of pocket. I’ll go through what a result would and wouldn’t tell us so you can decide with your eyes open.' },
        { key: 'dre', q: 'Do you have to examine me — the back-passage exam?',
          a: 'It’s a quick examination of the prostate through the back passage, and it tells us a lot — the size, and whether it feels smooth and benign or has anything that needs a closer look. It’s over in moments and shouldn’t be painful, just a bit undignified. You can absolutely have a chaperone, and you can say no.' },
      ],
    },
    {
      title: 'What can help',
      items: [
        { key: 'live_with_it', q: 'Can I just live with it — do I have to treat it?',
          a: 'If it’s not bothering you much and you’re emptying safely, then keeping an eye on it is a perfectly reasonable choice — plenty of men do exactly that. The main reason we’d nudge you toward treatment is if it’s wearing you down, or if the checks show your bladder isn’t emptying properly, because that can cause problems further down the line. So it’s your call, once we know it’s safe to leave.',
          why: 'Honour “watchful waiting” as legitimate, but draw the line at incomplete emptying / high residual, which the source flags as the thing that changes management.' },
        { key: 'lifestyle', q: 'Is there anything I can do myself first?',
          a: 'Yes, and it’s often the sensible first step. Cutting back on fluids in the evening, easing off caffeine and alcohol, not drinking a lot right before bed, and treating any constipation can all make a real difference — sometimes enough that you don’t need tablets at all.' },
        { key: 'tablets_or_surgery', q: 'Will I need tablets or an operation?',
          a: 'Most men never need an operation. We usually start with the simple lifestyle changes, then tablets if those aren’t enough, and surgery is really reserved for when medicines don’t control things or there’s a complication like poor emptying. So think of it as a ladder we climb only as far as we need to.' },
        { key: 'surgery_what', q: 'What would the operation actually be — and when?',
          a: 'The usual operation for an enlarging prostate trims away the inner part that’s blocking the flow, done through the natural passage with a camera — no cut on the outside. We’d only reach for it when tablets aren’t keeping things comfortable, or if a complication turns up like repeated infections, poor emptying or an episode where you can’t pass urine at all. It’s not rushed: you’d see a specialist to weigh it up together, and the surgeon goes through exactly what it involves and takes your consent.',
          why: 'Combines “what is surgery” with “when is it time” — the source names TURP but not its risks, so describe it plainly, tie the timing to the source’s complication triggers, and leave detailed risks and consent to the operating surgeon (PA scope).' },
      ],
    },
    {
      title: 'The medications',
      items: [
        { key: 'how_tablets_work', q: 'How do the tablets work?',
          a: 'There are two main kinds for prostate-type symptoms. One — an alpha-blocker — relaxes the muscle around the outlet so urine flows more easily, and it tends to work within days. The other — a 5-alpha-reductase medicine — slowly shrinks a larger prostate over months. Sometimes we use one, sometimes both, depending on your prostate size. If the trouble is more an overactive bladder, we’d use a different tablet that calms the bladder instead.' },
        { key: 'sex_life', q: 'Will these tablets affect my sex life?',
          a: 'It’s a fair question and worth being straight about. The alpha-blocker can mean little or no fluid comes out when you climax — that’s reduced or absent ejaculate, not true backward flow into the bladder. It’s harmless and reverses if you stop. The prostate-shrinking medicine can, in some men, lower sex drive or affect erections, and rarely this lasts after stopping. Tell us about any of these, or any low mood, rather than just quietly stopping.',
          why: 'Sexual side effects are the reason men abandon these drugs silently. Be honest and specific (anejaculation with alpha-blockers; libido/erectile effects with 5-ARI) but not alarmist, and invite them back rather than to stop unilaterally. Beyond the source — flag.',
          review: 'Confirm the specific sexual side-effect profile (reduced or absent ejaculate (anejaculation), not true retrograde flow, for tamsulosin-type alpha-blockers — Hellstrom & Sikka 2006; persistent sexual effects and mood warnings for 5-ARIs — MHRA 2026 / Health Canada finasteride review; reduced libido / erectile dysfunction for 5-alpha-reductase medicines) — drawn from standard general knowledge, not the source entry.' },
        { key: 'other_side_effects', q: 'What are the other side effects?',
          a: 'The alpha-blocker can make you a little light-headed or dizzy, especially with the first few doses or when standing up quickly, so many men take it at night to begin with. If you’re ever booked for cataract or glaucoma surgery, tell the eye surgeon you take it. The bladder-calming tablets can cause a dry mouth or constipation. I’ll go through the ones for your particular tablet, and the few that mean you should call us.',
          why: 'Overrides the generic shared meds frame with class-specific effects. Postural dizziness with alpha-blockers and anticholinergic effects with antimuscarinics are standard knowledge beyond the source — flag.',
          review: 'Confirm class side effects (postural dizziness with alpha-blockers; dry mouth / constipation with antimuscarinics) — standard general knowledge, not stated in the source entry.' },
        { key: 'how_long_tablets', q: 'How long will I be on them — is it forever?',
          a: 'For most men this is a long-term thing rather than a short course, because the tablets manage the symptoms rather than cure the cause — stop them and the symptoms usually drift back. The prostate-shrinking one in particular needs a few months before you feel the benefit, so it’s worth sticking with it. If you ever want to come off, do it with us rather than suddenly.' },
      ],
    },
    {
      title: 'Day to day',
      items: [
        { key: 'nocturia', q: 'Why do I keep getting up at night to pee?',
          a: 'Waking to pass urine is one of the most common and wearing parts of this. It can be the bladder holding less or being overactive, but it’s often partly that the body makes more urine overnight as we get older — so it isn’t always just the prostate. Cutting fluids and caffeine in the evening, and not drinking much right before bed, often helps. If it’s really disrupting your sleep, tell us, because we can look at it specifically.',
          why: 'Nocturia is a must-cover and a top quality-of-life complaint. Note it isn’t always outlet-related (nocturnal polyuria is standard knowledge, lightly extending the source’s bladder-diary point) — hence the practical, non-prostate-only framing.' },
        { key: 'nappies', q: 'Am I going to end up in incontinence pads or with a catheter?',
          a: 'That’s a common fear and, for most men, no — this is usually managed well with simple measures and tablets, and never gets near that. Leaking and needing a catheter aren’t the normal path of things; they’re what we’re actually working to prevent by treating you and keeping an eye on how you empty. If emptying does become a problem, there are ways to deal with it well before pads come into it.',
          why: 'Directly addresses the dignity dread (incontinence / catheter). Reassure honestly without over-promising — frame these as outcomes treatment guards against, tied to the source’s emphasis on monitoring residual.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'cant_pass', q: 'What if I suddenly can’t pass urine at all?',
          a: 'That’s the one to act on straight away. If you find you simply can’t go despite a desperate, painful urge and your lower belly feels swollen and tender, come in urgently or go to the nearest emergency department — the bladder needs draining promptly. Don’t sit at home hoping it’ll pass.',
          why: 'Acute retention is the headline safety-net for LUTS/BPH — the source lists it as where this can tip. Say it plainly and every time.' },
        { key: 'blood', q: 'What if I see blood in my urine?',
          a: 'Always get that checked — don’t put it down to “just the prostate”. Blood in the urine, even once and even if it doesn’t hurt, needs its own look to rule out anything more serious, so let us know rather than waiting to see if it happens again.',
          why: 'The source is explicit: LUTS plus haematuria is never “just the prostate” and earns its own cancer workup. This must be its own item, not folded into a general red-flag line.' },
        { key: 'infection', q: 'How do I know if I’ve got an infection?',
          a: 'Come back if passing urine starts to sting or burn, if it turns cloudy or smelly, or if you feel feverish, shivery or generally unwell with it — those point to an infection that may need treating. Repeated infections in particular are worth flagging, as they can be a sign the bladder isn’t emptying fully.',
          why: 'Recurrent UTIs signal stasis / incomplete emptying in the source’s red flags — so infection is both an acute safety-net and a pointer worth surfacing.' },
        { key: 'nerve_symptoms', q: 'Is there anything else I shouldn’t ignore?',
          a: 'Yes — tell us promptly if you get new weakness or numbness in your legs, numbness around the back passage or genitals, or new problems controlling your bowels alongside the bladder trouble. Those aren’t typical prostate symptoms and need checking sooner rather than later.',
          why: 'Neurological symptoms in the source’s red flags point away from simple BPH toward cord / neurogenic pathology — worth a plain-language safety-net without alarming detail.' },
      ],
    },
  ],
};
