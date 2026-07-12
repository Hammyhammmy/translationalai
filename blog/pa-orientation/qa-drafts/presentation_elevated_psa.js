// "When patients ask…" — elevated_psa (Raised PSA).
// FIRST DRAFT — pending clinician review. Not medical advice.
//
// Second-person spoken register, matched to the renal_colic exemplar in urinary-qa.js.
// Clinical source: PRESENTATIONS.elevated_psa in urinary-presentations.js, plus safe
// standard general knowledge. Opts into shared groups 'imaging' and 'anaesthetic'
// (a biopsy is on the table). `why` on ~1/3 of items.
//
// VOICE NOTE: the cancer question is never a flat "no" or a flat "yes" — a raised PSA
// is a flag to look further, not a diagnosis. Honest uncertainty, no false reassurance.

export const elevated_psa = {
  stage: 'presentation',
  shared: ['imaging', 'anaesthetic'],
  groups: [
    {
      title: 'What a raised PSA actually means',
      items: [
        { key: 'what_is_psa', q: 'What is PSA — what does a high number mean?',
          a: 'PSA is a protein your prostate makes that shows up in a blood test. A raised level tells us the prostate is worth a closer look — it doesn’t tell us why it’s up. Think of it as a flag to look further, not a diagnosis.',
          why: 'Set the frame early — “prostate-specific, not cancer-specific.” Everything that follows hangs off this one line.' },
        { key: 'how_high', q: 'How high is mine — is that a lot?',
          a: 'There’s no single cut-off that means trouble on its own — it’s read alongside your age, your prostate size, and how it changes over time. The trend across tests often tells us more than any single number, which is why we usually repeat it before doing anything.' },
      ],
    },
    {
      title: 'Does this mean I have cancer',
      items: [
        { key: 'is_it_cancer', q: 'Does this mean I’ve got cancer?',
          a: 'A raised PSA is a flag to look further, not a diagnosis — so the honest answer is: we don’t know yet, and that’s exactly why we test more. Many raised PSAs are not cancer; they come from a bigger prostate, inflammation, or even something as ordinary as recent cycling. But because it can be an early sign, we don’t ignore it — we look properly.',
          why: 'The core calibrated-honesty item. Never a flat “no” and never a flat “yes”: name that many raised PSAs aren’t cancer, without falsely clearing them. Mirrors the renal_colic cancer answer.' },
        { key: 'if_i_feel_fine', q: 'I feel completely well — can it still be serious?',
          a: 'Yes, it can — early prostate problems often cause no symptoms at all, which is exactly why a blood test can pick something up before you’d ever feel it. Feeling well is reassuring, but it isn’t the same as an all-clear, so it’s still worth finishing the checks.' },
      ],
    },
    {
      title: 'What raises PSA apart from cancer',
      items: [
        { key: 'what_else', q: 'What else can push the PSA up?',
          a: 'Quite a few everyday things. A prostate that’s simply enlarged with age raises it. So does inflammation or infection of the prostate, a recent water infection, a catheter, or an examination of the prostate done just before the blood was taken. That’s why the story around the test matters as much as the number.' },
        { key: 'cycling_sex', q: 'I cycled / had sex before the test — does that count?',
          a: 'It can, actually. Recent ejaculation and vigorous cycling can both nudge the PSA up for a while, which is one reason we don’t act on a single reading. When we repeat it, we’ll ask you to avoid those for a couple of days beforehand so we get a truer number.',
          why: 'Naming the ejaculation/cycling raisers plainly defuses a lot of anxiety and sets up why the repeat test is done under fairer conditions.' },
        { key: 'my_fault', q: 'Is this something I did?',
          a: 'No — a raised PSA isn’t about anything you did wrong. A prostate tends to grow and get a bit more active as men get older, and that’s the commonest reason it’s up. This isn’t about blame; it’s just something we’ve spotted and are checking.',
          why: 'Defuse guilt, as in the exemplar — a blamed patient disengages. The commonest cause (benign enlargement) is genuinely nobody’s fault.' },
      ],
    },
    {
      title: 'The next tests — repeat PSA, examination and MRI',
      items: [
        { key: 'repeat_test', q: 'Why repeat the blood test — can’t you tell now?',
          a: 'Because a single reading can be thrown off by all those everyday things — a recent infection, cycling, an examination. Repeating it after a few weeks, under fairer conditions, tells us whether the rise is real and lasting or just a blip. It’s the cheapest, kindest way to avoid worrying you unnecessarily.' },
        { key: 'the_exam', q: 'Do you need to examine me down there?',
          a: 'Usually yes — a quick examination of the prostate with a gloved finger (a “DRE”) tells us its size and whether it feels smooth or has a firm area. It takes seconds and, together with the blood test, helps us decide what’s next. If we do it, we time it so it doesn’t skew the very blood test we’re relying on.' },
        { key: 'what_is_mri', q: 'What’s the MRI for?',
          a: 'If the PSA stays up or the examination raises a question, we scan the prostate with a detailed MRI. It maps the prostate and shows whether there’s any area that looks suspicious and worth sampling. It’s a picture-only test — no needles, nothing goes inside for the scan itself.' },
        { key: 'mri_avoid_biopsy', q: 'If the MRI’s clear, can I avoid a biopsy?',
          a: 'Often, yes — and that’s exactly why we scan before we ever pick up a needle. A reassuring MRI can mean no biopsy is needed at all, and where a biopsy is still wanted it lets us aim straight at the area of concern rather than sampling blindly. Scanning first spares a lot of men a biopsy they’d otherwise have had.',
          why: 'This is the MRI-before-biopsy pathway — the single most reassuring true thing to say. Frame the MRI as the gatekeeper that reduces unnecessary biopsies.' },
      ],
    },
    {
      title: 'The biopsy — what it involves and its risks',
      items: [
        { key: 'do_i_need_biopsy', q: 'Do I definitely need a biopsy?',
          a: 'Not necessarily. Whether you need one depends on how the repeat blood test, the examination and the MRI come together. Plenty of men get this far and don’t need a biopsy at all. If it is recommended, someone will explain why in your case and go through it properly with you.',
          why: 'Keep the biopsy conditional, not inevitable — over-stating its likelihood raises anxiety the whole pathway is trying to lower.' },
        { key: 'what_is_biopsy', q: 'What actually happens in a biopsy?',
          a: 'A few tiny samples are taken from the prostate with a fine needle, guided so they’re aimed at any area the scan flagged. It’s usually quick, and it’s done with numbing or, in some cases, while you’re asleep — whoever’s doing it will tell you which applies to you.' },
        { key: 'biopsy_painful', q: 'Will the biopsy hurt?',
          a: 'You’ll feel some pressure and a few brief pinches, but it’s made as comfortable as possible with numbing, and some men have it done asleep. It’s uncomfortable more than it is painful for most, and it’s over fairly quickly. Afterwards you can expect some soreness for a short while.' },
        { key: 'biopsy_safe', q: 'Is the biopsy safe — what could go wrong?',
          a: 'It’s generally safe and done very commonly, but I won’t pretend it’s risk-free. The main things to know are a chance of infection — which is why you’re often given antibiotics around it — and some bleeding, so it’s normal to see a little blood in your urine, your semen, or from the back passage for a while afterwards. Serious problems are uncommon. The person doing it will go through all of this and take your consent beforehand.',
          why: 'Honest about the two real risks — infection and bleeding — structured minor→uncommon, then note antibiotics and that blood in urine/semen is expected not alarming. Consent is the doer’s job, per scope.' },
        { key: 'blood_after', q: 'You said I might see blood — for how long?',
          a: 'A little blood in your urine or semen after a prostate biopsy is expected and can linger for a few weeks, especially in the semen — that’s normal and settles on its own. What isn’t normal is heavy bleeding, fever or shivers, or trouble passing urine, and those mean you should get seen.',
          why: 'Pre-warn so expected bleeding doesn’t frighten them into thinking it failed — and pin the come-back triggers (fever, heavy bleeding, retention) to it.' },
      ],
    },
    {
      title: 'If it is cancer — and if we watch it instead',
      items: [
        { key: 'if_it_is_cancer', q: 'And if it does turn out to be cancer?',
          a: 'Then we’d talk it through properly, because prostate cancer isn’t one single thing — some are slow and may never cause you trouble, others need treating. If it comes to that, we grade it and stage it so any advice you get fits your actual situation, rather than a worst-case guess. That’s a conversation we’d have with the full picture in front of us, not now.',
          why: 'Keep this brief and honest per the brief — signpost that prostate cancer is a spectrum and that specifics wait for real information, without minimising.' },
        { key: 'just_watch', q: 'Can’t we just watch it instead of doing anything?',
          a: 'Sometimes that’s genuinely the right plan — for a low-risk cancer, keeping a close eye on it (called active surveillance) with regular tests can be safer than rushing into treatment you might not need. But “watch it” is a proper monitored plan we’d choose together once we know what we’re dealing with, not the same as ignoring it.',
          why: 'Honour the watch-and-wait instinct — active surveillance is real and often right — but draw the line: it’s monitored, not neglect. Mirrors the exemplar “do nothing” item.' },
      ],
    },
    {
      title: 'When to come back',
      items: [
        { key: 'red_flags', q: 'Is there anything that means I should come back sooner?',
          a: 'Yes — come back if you get new bone pain that won’t settle, blood in your urine, or trouble passing urine, and don’t wait for your next appointment for those. If you’ve just had a biopsy, a fever or the shivers, heavy bleeding, or being unable to pass urine need to be seen straight away.',
          why: 'The safety-net is what they leave with. Combines the presentation red flags (new bone pain, haematuria) with the post-biopsy emergencies (infection, heavy bleeding, retention). Say it plainly, every time.' },
        { key: 'waiting_worry', q: 'The waiting between tests is the hard part — is that safe?',
          a: 'It really is the hard part, and I won’t pretend otherwise. The good news is that the few weeks we wait to repeat the test or arrange a scan don’t change the outcome — prostate changes are usually slow. If anything new comes up in the meantime, like the symptoms we just talked about, that’s your cue to ring us rather than sit on it.' },
      ],
    },
  ],
};
