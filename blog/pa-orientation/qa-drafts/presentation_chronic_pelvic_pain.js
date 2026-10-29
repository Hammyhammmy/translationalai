// FIRST DRAFT — for clinician review.
// Patient-facing “When patients ask…” set for presentation: chronic_pelvic_pain (CPPS / persistent pelvic pain).
// Clinical source: urinary-presentations.js → chronic_pelvic_pain. Voice/shape matched to renal_colic exemplar in urinary-qa.js.
// shared: ['imaging'] supplies the generic “Tests & scans” answers (scan hurt / radiation / contrast / results timing) — not re-authored here.

export const chronic_pelvic_pain = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'What’s causing this',
      items: [
        { key: 'what_causing', q: 'What’s actually causing this pain?',
          a: 'Honestly, in a lot of people there isn’t one single thing to point at — and that’s not us giving up, it’s the nature of this problem. What often happens is the nerves carrying pain signals from the pelvis get turned up too high, like a volume dial stuck loud, so the area keeps hurting even when the tissues underneath have settled. The muscles of the pelvic floor tightening up, the bladder, and the bowel can all feed into it too. So it’s usually several things overlapping rather than one lesion.' },
        { key: 'real_pain', q: 'So there’s nothing actually wrong? Is this in my head?',
          a: 'No — the pain is completely real, and I want to be clear about that. When we say we can’t find a single lump or blockage, that isn’t the same as saying nothing’s wrong. The problem is real and it’s in the wiring — the nerves and muscles of the pelvis — not imagined. Pain that has no obvious cause on a scan is still pain, and it still deserves treating.',
          why: 'The “it’s in your head” fear is the defining wound of this consultation — patients have often been dismissed before. Meet it head-on, name it as real, and separate “no single lesion found” from “nothing wrong.”' },
        { key: 'why_no_answer', q: 'I’ve seen so many people — why can no one give me a straight answer?',
          a: 'I know how exhausting that is, and how it can feel like being passed around. The straight answer is that this is a condition where the tests are often normal precisely because the trouble is in how the nerves are behaving, not in something a scan can photograph. So the honest answer isn’t “there’s nothing there” — it’s “this is a recognised pain problem, and here’s the plan for it.” That’s a real answer, even if it’s not the one you were hoping for.' },
      ],
    },
    {
      title: 'Is it something serious',
      items: [
        { key: 'cancer', q: 'Could this be cancer?',
          a: 'It’s a very natural thing to fear, and I won’t brush it off. This picture — long-standing pain with normal tests — is not what cancer usually looks like. But because I don’t want to just reassure you blindly, the checks we do (a urine test, a scan of the pelvis, and looking inside the bladder with a camera if the pain is bladder-centred) are partly there to actively rule cancer out. So we’re not ignoring the worry — we’re specifically looking, and that’s what lets us say it’s a pain problem rather than something sinister.',
          why: 'Never a flat “no” to cancer. Validate, say why this pattern isn’t typical of cancer, then show the workup already hunts for it — honest reassurance earned by the tests, not asserted.' },
        { key: 'infection', q: 'Isn’t it just an infection? Do I need antibiotics?',
          a: 'It’s a fair question, because an infection can cause pelvic pain and it must be ruled out first — so we test your urine. The thing is, in most people with this kind of long-term pain the urine is clear, with no bug growing. Occasionally, early on, one trial course is tried — but when there’s no infection, repeated courses don’t help the pain and can cause their own problems, so more courses aren’t the answer. That negative test is actually useful — it’s part of what tells us this is a pain condition rather than an infection we keep missing.',
          why: 'Patients (and previous clinicians) often chase this with repeated antibiotics. Explain the sterile-urine finding as informative, and justify NOT prescribing without sounding dismissive of the symptom.' },
        { key: 'damage', q: 'Is the pain damaging me, or getting worse in there?',
          a: 'This kind of pain, once we’ve ruled the serious causes out, isn’t a sign that something is being harmed or eaten away inside — the alarm is loud, but it isn’t doing damage. That matters, because fear that the pain equals harm can wind the whole thing tighter. It’s horrible to live with, but it isn’t destroying your insides.' },
      ],
    },
    {
      title: 'How is it treated',
      items: [
        { key: 'why_not_antibiotics', q: 'If it’s not an infection, why not just try antibiotics anyway?',
          a: 'I understand the pull to just try something — but antibiotics work against infection, and beyond an occasional single early trial, more courses with no bug found don’t help this pain while still risking side effects and resistance. Reaching for them again tends to delay the treatment that actually helps. So instead of another course, I’d rather start you on the things that genuinely settle this kind of pain.' },
        { key: 'physio', q: 'What actually helps, then?',
          a: 'One of the most useful things isn’t a tablet at all — it’s a special kind of physiotherapy for the pelvic floor. In a lot of people those muscles are clenched tight and tender, and learning to release and relax them can take a real edge off. Importantly it’s the opposite of pelvic-floor squeezes or Kegels, which usually make this kind of pain worse — so it’s about letting go, not tightening up.' },
        { key: 'nerve_meds', q: 'You’re giving me an antidepressant / epilepsy tablet — but I’m not depressed and I don’t have fits?',
          a: 'You’re right to ask, because the leaflet will mention those uses. At low doses these medicines also quiet down over-sensitive nerves — that’s the whole reason we use them here, to turn that pain volume back down. It’s not that we think you’re depressed or having seizures; we’re borrowing the nerve-calming effect. If your mood or sleep are also suffering, they can help there too, which is a bonus rather than the reason.',
          why: 'Amitriptyline/gabapentinoids/duloxetine feel like a hidden “it’s in your head” accusation. Pre-empting that — “we’re borrowing the nerve effect, not calling you depressed” — is essential to adherence.' },
        { key: 'painkillers', q: 'Can I just have strong painkillers, like morphine?',
          a: 'I know when pain is this bad, the strongest thing sounds right — but for this particular kind of pain the heavy opioid painkillers genuinely don’t work well, and over time they cause real harm and can even make the pain system more sensitive. So it isn’t us withholding relief; it’s that they’re the wrong tool for this job. The nerve-calming medicines and the physio are what tend to move the needle here.',
          why: 'Opioids are ineffective and harmful in CPPS but patients read refusal as disbelief. Frame as “wrong tool,” not “you don’t deserve relief.”' },
        { key: 'why_different', q: 'Why does something that helped my friend do nothing for me?',
          a: 'Because this isn’t one single condition — it’s a mix that’s put together slightly differently in each person. For one person the pelvic-floor muscles are the main driver; for another it’s the bladder, or the bowel, or the stress and poor sleep feeding it. So the treatment is matched to your particular pattern, which is why we tailor it rather than hand everyone the same tablet — and why some trial and error is normal, not a sign of failure.' },
        { key: 'team', q: 'Why are you sending me to so many different people?',
          a: 'Because no single person or pill treats all of this. A physiotherapist works on the muscles, a pain specialist on the medicines, and a psychologist on how the pain and stress feed each other — not because it’s “all in the mind,” but because managing the mind-body loop genuinely lowers the pain. Together that team does far more than any one of us on our own.',
          why: 'A psychology referral can feel like the “it’s in your head” fear confirmed; naming that fear and reframing the referral as tackling a real mind-body loop keeps them onside.' },
      ],
    },
    {
      title: 'Living with it',
      items: [
        { key: 'flares', q: 'What do I do when it flares up?',
          a: 'Flares are part of the pattern and don’t mean you’ve gone backwards or done harm. Having a plan ready helps: your regular nerve-calming medicine, the relaxation and breathing your physio teaches you, heat, gentle movement, and keeping stress and sleep in check where you can. Over time many people learn their own triggers and early-warning signs, which makes the flares less frightening and easier to ride out.' },
        { key: 'work', q: 'Can I still work and drive?',
          a: 'For most people, yes — staying active and keeping some normal routine actually tends to help rather than harm, even though resting completely feels tempting. On a bad flare you may need to ease off, and if a job is very physical we can talk about adjustments. The aim is to keep your life going alongside the pain, not to put it on hold waiting for the pain to vanish.' },
        { key: 'mood', q: 'This is getting me down — is that normal?',
          a: 'It’s completely understandable, and very common — living with pain that won’t quit, especially when you’ve felt dismissed, wears anyone down. Low mood, anxiety and broken sleep aren’t a weakness, and they’re not the cause of your pain. But they do feed into it, so treating them — with talking therapy and, if it helps, medication — is a real part of getting on top of the pain, not a side issue.',
          why: 'Validate the mood impact without letting it be heard as “so it IS psychological.” Mood is consequence-and-amplifier, not cause — that distinction protects the patient’s sense of being believed.' },
        { key: 'sex', q: 'Can this affect my sex life?',
          a: 'It can, and you’re far from alone in it — pain, or fear of pain, during or after sex is common with this, and it can knock confidence and put a strain on a relationship. It’s worth talking about openly rather than avoiding, because there’s a lot that helps: the pelvic-floor physiotherapy often eases pain with sex, and taking the pressure off can matter as much as any treatment. Please do raise it — it’s a normal part of this conversation, not an awkward extra.',
          why: 'Patients rarely volunteer sexual pain; explicitly inviting it, normalising it, and linking it to a treatable cause (pelvic floor) gives permission and hope.' },
        { key: 'fertility', q: 'Will this affect my fertility, or having children?',
          a: 'For most people this kind of pain isn’t itself a cause of infertility — it’s a pain problem rather than damage to the reproductive organs. That said, some of the conditions we look for along the way, like endometriosis in women, can affect fertility, which is one more reason we check for them. If starting a family is on your mind, do tell us, because it can steer which medicines we choose.',
          why: 'Fertility is a named fear in this brief. Separate the pain syndrome (not a fertility threat) from the differentials that can be (endometriosis), and flag that pregnancy plans change drug choices — condition-specific and consequential.' },
      ],
    },
    {
      title: 'What’s the outlook',
      items: [
        { key: 'go_away', q: 'Will this ever go away? Am I stuck with it forever?',
          a: 'I’ll be honest with you, because you deserve that: for many people this is more about getting it under control than switching it off overnight, and I don’t want to promise a quick cure I can’t deliver. But controlled is a real and worthwhile goal — a lot of people get to where the pain is quieter, the flares are fewer, and it stops running their life. Some improve a great deal over time. So it’s not a life sentence of things staying exactly as they are now; it’s a problem we work down together.',
          why: 'The central honesty of the entry: manage-not-cure, told truthfully but with genuine hope. Over-promising a cure destroys trust at the first flare; despair loses engagement. Hold both.' },
        { key: 'my_fault', q: 'Did I bring this on myself?',
          a: 'No — this isn’t something you caused or could have avoided by doing something differently. There’s no blame here. It’s a recognised way the pelvic nerves and muscles can behave, and plenty of people who’ve done everything “right” still end up with it. What matters now isn’t how it started but what we do about it.',
          why: 'Self-blame drives disengagement and shame; removing it clears the way to collaborate on management.' },
      ],
    },
    {
      title: 'When to come back',
      items: [
        { key: 'red_flags', q: 'Is there anything that means I should come back urgently?',
          a: 'Yes — while this pain itself isn’t dangerous, a few new things would need checking promptly rather than waiting: blood you can see in your urine, unexplained weight loss, or a new lump; a fever or feeling generally unwell; bleeding after sex or any bleeding after the menopause; or new numbness around the back passage, or weakness in your legs. Those aren’t the usual pattern of this pain, so if any turn up, get seen — better to check and be reassured.',
          why: 'The safety-net is the most important thing they leave with. Draw straight from the entry’s red flags (visible haematuria, weight loss, mass, fever, post-coital/post-menopausal bleeding, saddle anaesthesia/leg weakness) and say them plainly, every time.' },
      ],
    },
  ],
};
