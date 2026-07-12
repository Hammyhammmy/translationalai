// FIRST DRAFT — for clinician review.
// Patient-facing "When patients ask…" set for presentation: acute_scrotum.
// Clinical source: acute_scrotum entry in urinary-presentations.js (fields only) + safe general knowledge.
// Voice/shape matched to the renal_colic exemplar in urinary-qa.js.

export const acute_scrotum = {
  stage: 'presentation',
  shared: ['imaging', 'anaesthetic'],
  groups: [
    {
      title: 'What’s happening',
      items: [
        { key: 'what_causing', q: 'What’s actually causing this pain?',
          a: 'Sudden, severe pain in a testicle — often with swelling and feeling sick — usually means one of two things. The one we most need to rule out is a twist: the testicle can turn on the cord that feeds it, which chokes off its blood supply. The other common cause is an infection. Until we’ve checked, we treat it as the twist, because that’s the one where every minute counts.' },
        { key: 'twist_meaning', q: 'What do you mean it’s “twisted”?',
          a: 'The testicle hangs on a cord that carries its blood. In some men that cord can rotate, kinking off the blood the way a kinked hose stops water. That’s why it comes on so fast and hurts so much — and it’s why we don’t sit and wait on it.',
          why: 'The hose image lands the mechanism and the urgency in one go, without jargon.' },
        { key: 'cancer', q: 'Could this be something serious, like cancer?',
          a: 'It’s a natural thing to worry about and I won’t brush it off. Sudden pain like this points to a twist or an infection, not a cancer — cancer in a testicle usually shows up as a painless lump rather than pain that hits you all at once. Right now our whole focus is protecting the blood supply. If anything on the scan or the exam needs a second look later, we’ll follow it up properly — we won’t leave it hanging.',
          why: 'Mirror the renal_colic cancer template: validate, say this isn’t cancer, but promise honest follow-up rather than a flat “no.”' },
      ],
    },
    {
      title: 'Why the rush',
      items: [
        { key: 'why_fast', q: 'Why do I need surgery so fast — can’t we wait and see?',
          a: 'If this is a twist, the testicle only survives while its blood is getting through. There’s roughly a six-hour window from when the pain started before it’s at serious risk, and the odds of saving it drop steadily after that. So the rush isn’t us being dramatic — waiting is the one thing that can cost you the testicle. That’s why we act on a strong suspicion rather than waiting for certainty.',
          why: 'The six-hour window is the single most load-bearing fact in this whole set — state it plainly and tie it directly to saving the testis.' },
        { key: 'not_scan_first', q: 'Can’t you just scan it first to be sure?',
          a: 'Sometimes we do a quick ultrasound if it can be done without holding anything up — but a scan that looks normal doesn’t rule a twist out, and waiting for one can burn the very time we’re racing against. So if the story and the examination point to a twist, we go to theatre rather than let a scan delay us. It’s safer to look and find nothing than to wait and lose the testicle.',
          why: 'The entry is emphatic that a normal/equivocal Doppler must never override a convincing history — say this plainly so a parent who wants “just a scan first” understands the trade-off.' },
        { key: 'what_if_wrong', q: 'And if it turns out it wasn’t a twist?',
          a: 'That happens, and it’s not a failure — it’s the safe outcome. If the pain is actually an infection, we treat that with antibiotics, pain relief and a bit of support for the area. The rule we work to is simple: when we genuinely can’t be sure, we treat it as a twist and look. A normal operation is a far better result than a testicle lost to waiting.',
          why: 'Names the honest trade-off from the entry’s governing rule — a negative exploration beats a lost testis — in patient-friendly terms.' },
      ],
    },
    {
      title: 'The operation',
      items: [
        { key: 'what_done', q: 'What does the operation involve?',
          a: 'It’s called a scrotal exploration. The surgeon makes a small opening, checks the testicle, and if it’s twisted they untwist it and stitch it in place so it can’t twist again. Because the tendency to twist usually affects both sides, they normally stitch the other testicle too, as a one-off safeguard.',
          why: 'The entry specifies bilateral orchidopexy — explain the “both sides” bit up front so it isn’t a surprise on waking.' },
        { key: 'both_sides', q: 'Why touch the good side if only one twisted?',
          a: 'The shape that let one testicle twist is usually there on both sides, so fixing the healthy one too means it can’t happen to that side in future. It’s a small extra step at the same time, and it saves you ever going through this again on the other side.' },
        { key: 'asleep', q: 'Will I be awake or asleep for it?',
          a: 'Asleep — this is done under a general anaesthetic, so you won’t feel or remember any of it. Because it’s an emergency, the team will move quickly to get you ready.',
          why: 'OVERRIDES the shared anaesthetic answer: emergency scrotal exploration is a general, and the emergency timing is condition-specific.' },
        { key: 'risks', q: 'What are the risks of the operation?',
          a: 'Mostly minor and short-lived — soreness, swelling and bruising of the scrotum for a while, and a small wound that heals over. Less commonly there can be a wound infection or some bleeding. The bigger honest point is that if the testicle has been starved of blood for too long it may not survive even after untwisting — that’s about how much time had already passed, not about the surgery. The surgeon will go through all of this and take your consent before anything happens.',
          why: 'Structure it common→less-common→the honest time-dependent one, and keep consent with the surgeon, exactly as the renal_colic risks item does.' },
      ],
    },
    {
      title: 'Will I lose the testicle',
      items: [
        { key: 'lose_it', q: 'Am I going to lose the testicle?',
          a: 'I can’t promise you won’t, and I won’t pretend otherwise — it honestly depends on how long the blood supply was cut off before we get in there. Getting to theatre quickly gives it the best possible chance, which is exactly why we’re moving fast. If, when the surgeon looks, it hasn’t survived, the safest thing is to remove it — but that decision is made in the moment, with the testicle in front of them.',
          why: 'The brief is explicit: don’t over-promise the testis can be saved — be honest it depends on time. This is the emotional core of the set.' },
        { key: 'one_testicle', q: 'If I lose one, what does life look like with just one?',
          a: 'A single healthy testicle does the job of two — it makes enough hormone and enough sperm that most men with one notice no difference in their sex life or their health. If a testicle is removed, some men choose to have an artificial one put in later purely for how it looks and feels, and that can be discussed with you in good time.',
          why: 'review: reassurance on single-testicle function and prosthesis option is safe general knowledge, but confirm the site is comfortable stating it and check local practice on prosthesis counselling/timing.' },
        { key: 'still_normal', q: 'Will it still look and feel normal down there?',
          a: 'If the testicle is saved, it settles back to looking and feeling much as before once the swelling and bruising go. If one has to be removed, that side will feel emptier, and — as above — an artificial one can be considered later if you’d want it. The small scar fades with time.' },
      ],
    },
    {
      title: 'Fertility & the future',
      items: [
        { key: 'fertility', q: 'Will this affect my fertility, and can I still have children?',
          a: 'For most men, no — one healthy testicle is enough to father children normally. Even if the affected one is lost, the other usually carries on making sperm as before, so having children later is typically unaffected. It’s a fair thing to ask about, and if you ever have concerns down the line there are simple tests that can check.',
          why: 'review: fertility and future children with a single functioning testis is safe standard knowledge, but the entry gives no fertility data — keep it general and flag for a clinician to confirm the framing and any local sperm-check pathway.' },
        { key: 'other_side_risk', q: 'Could the other testicle twist too one day?',
          a: 'That’s exactly why the surgeon usually stitches the other side in place during the same operation — to take that worry off the table. Once it’s fixed, that side is protected against twisting in the future.' },
      ],
    },
    {
      title: 'Day to day after',
      items: [
        { key: 'recovery', q: 'How long until I’m back to normal?',
          a: 'Most people are up and about within a few days, with the soreness easing over a week or two. Supportive underwear helps, and simple painkillers usually cover the discomfort. Wounds and bruising take a little longer to fully settle — we’ll give you a clear idea before you leave.',
          why: 'review: recovery timings are typical general guidance; confirm the site is happy with the range and add any local post-op instructions.' },
        { key: 'sport_work', q: 'When can I get back to work, sport and driving?',
          a: 'Light activity and desk work usually come back within days, once you’re comfortable. Give heavy lifting, sport and anything that jolts the area a couple of weeks so the repair settles, and only drive once you can do an emergency stop without pain. The team looking after you will tailor this to you.' },
        { key: 'sex', q: 'When is it okay to have sex again?',
          a: 'Once things are comfortable and the wound has settled — usually a couple of weeks — there’s no problem resuming. Let discomfort be your guide, and there’s no rush.',
          why: 'review: generic post-op advice with no clinical detail in the entry — safe to keep vague; a clinician should confirm timing.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'red_flags', q: 'What if the pain comes back, or something feels wrong afterwards?',
          a: 'Come straight back if the pain returns or gets worse, if the scrotum swells up hard, goes very red or hot, if the wound opens or oozes, or if you get a fever or the shivers. And — before any surgery — this is the golden rule for testicle pain generally: any sudden, severe testicle pain is an emergency and must be seen the same hour, not the next day, because of that time window. Don’t wait to see if it eases.',
          why: 'The safety-net is the single most important thing they leave with — for this presentation it must hammer the “sudden severe testicle pain = seen the same hour” message, since delay is what costs the testis. Say it plainly, every time.' },
      ],
    },
  ],
};
