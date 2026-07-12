// "When patients ask…" — recurrent_uti
// FIRST DRAFT — pending clinician review. Not medical advice.
//
// Voice/shape matches the locked exemplar `renal_colic` in urinary-qa.js: second-person
// spoken register, warm, honest, UK usage. Opts into the shared `imaging` group; the
// scan_hurt / radiation / contrast_dye / results_when logistics live there and are not
// re-authored below.
//
// Clinical source: recurrent_uti entry in urinary-presentations.js (complaint, redFlags,
// workup, management, pearls, patient). Nothing clinical is invented beyond that plus safe
// standard general knowledge; anything thinner than the source carries a `review:` note.

export const recurrent_uti = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'Why do I keep getting these?',
      items: [
        { key: 'why_me', q: 'Why do I keep getting these — what’s wrong with me?',
          a: 'For most women who get repeated water infections, honestly there’s nothing “wrong” in the sense of a disease — it’s that the bacteria that live around us have a short trip to the bladder, and some people are simply more prone to reinfection. It doesn’t mean you’re dirty or doing something wrong, and it doesn’t mean it’ll be like this forever.',
          why: 'Source frames this as usually reinfection in otherwise-healthy women. Lead by defusing shame — a patient who feels blamed disengages from prevention.' },
        { key: 'reinfection_relapse', q: 'Is it the same infection coming back, or a new one each time?',
          a: 'Usually it’s a brand-new infection rather than the old one never clearing — which is actually the more reassuring version. We can tell the two apart by sending a urine sample off to be grown each time, and that’s partly why we ask you to get a sample in before starting antibiotics.',
          why: 'Cultures distinguish reinfection from relapse (source workup). Reinfection is the common, lower-risk pattern; relapse hints at an enabling nidus.' },
        { key: 'how_many_counts', q: 'How many does it take before it counts as “recurrent”?',
          a: 'Roughly two confirmed infections in six months, or three in a year. That’s not a magic number — it’s just the point where it’s worth stepping back from treating each one and instead making a proper plan to stop them.' },
        { key: 'underlying_cause', q: 'Could there be an underlying reason nobody’s found?',
          a: 'In an otherwise-healthy woman, usually not — it’s just proneness. But in a man, in a child, or when the bacteria are unusual, we do look harder, because then a repeat infection can be a sign of something to fix underneath — like a stone, a bladder that doesn’t empty fully, or in older men the prostate. If you’re in one of those groups we’ll investigate rather than just keep prescribing.',
          why: 'Source red flags: recurrent UTI in a man/child/atypical organism demands a structural or functional explanation. Be honest that the workup is risk-stratified.' },
        { key: 'unusual_bacteria', q: 'One result said an unusual bug — does that matter?',
          a: 'It can, so it’s worth mentioning. Certain bacteria go hand in hand with stones in the urinary tract, so if one of those keeps showing up we’d want a scan to check. It doesn’t mean anything’s definitely wrong — it just lowers our threshold to look.',
          why: 'Source: urease-producing organisms (Proteus) → suspect a stone. Kept generic, no organism named to the patient.' },
      ],
    },
    {
      title: 'Will it damage my kidneys?',
      items: [
        { key: 'kidney_damage', q: 'Will all these infections damage my kidneys?',
          a: 'For the common type — infections that stay down in the bladder — the honest answer is that they’re miserable but they don’t tend to scar the kidneys. The kind we do worry about is when an infection climbs up to the kidney itself, which makes you properly unwell with a fever and back pain. That’s exactly the one we want you to come straight back for, so we can treat it fast.',
          why: 'Source separates recurrent lower-tract (usual) from recurrent pyelonephritis (image and protect kidneys). Reassure on cystitis, flag the upper-tract escalation.' },
        { key: 'need_scan', q: 'Do I need a scan or a camera test?',
          a: 'Not everyone does. For a healthy woman with straightforward bladder infections, a scan often doesn’t change anything. We tend to arrange one — usually an ultrasound, sometimes a bladder scan to check you’re emptying properly, and occasionally a camera look inside the bladder — if you’re a man, if the bacteria are unusual, if there’s a hint of a stone or a blockage, or if there’s blood in your urine between infections.',
          why: 'Source workup: post-void residual, US ± CT, cystoscopy reserved for men/atypical organisms/suspected stone/obstruction. Shared imaging group covers scan logistics.' },
        { key: 'emptying', q: 'They mentioned checking if my bladder empties — why?',
          a: 'If a bit of urine is always left behind after you go, that stale pool is a comfortable place for bacteria to breed, and it can drive infection after infection. It’s a quick, painless scan of your bladder just after you’ve been to the loo, and if it shows a problem, sorting the emptying can matter more than any antibiotic.',
          why: 'Source: post-void residual — incomplete emptying drives recurrence; management stresses treating the enabling cause, not just each episode.' },
        { key: 'blood_in_urine', q: 'I sometimes see blood — is that just the infection?',
          a: 'Blood during an infection is common and usually settles once it clears. What we don’t want to wave away is blood that keeps showing up between infections, when you feel well — that we always check out properly, just to be safe. So do tell us if you’re seeing it at times when you’ve no other symptoms.',
          why: 'Source red flag: persistent haematuria between infections → exclude malignancy. Validate the common case, ring-fence the between-episodes pattern.' },
      ],
    },
    {
      title: 'Preventing them — what you can do',
      items: [
        { key: 'more_than_water', q: 'Everyone says “drink more water” — is that really all there is?',
          a: 'I know how that lands when you’ve heard it a hundred times. Fluids genuinely do help by flushing the bladder, so it’s not nothing — but you’re right that it isn’t the whole story. There’s a proper ladder of things we can try beyond it, from simple habits up to medical options, and we work through them together rather than leaving you with just “drink more”.',
          why: 'Directly answers the brief’s frustration. Validate, keep hydration honest as one rung, then signpost the ladder (source management).' },
        { key: 'habits', q: 'Are there habits that actually make a difference?',
          a: 'A few simple ones are worth doing because they’re harmless and may help — not holding on when you need to go, and emptying your bladder rather than rushing. I’ll be straight with you that the evidence for a lot of the classic hygiene “rules” is weaker than people assume, so I won’t load you with a long list of things to feel guilty about.',
          why: 'Source lists voiding habits under behavioural prevention. Be honest that much hygiene advice is folklore — avoid the guilt-list the brief warns against.',
          review: 'Source names “voiding habits” generically. Specific behavioural measures (wiping direction, post-coital voiding, avoiding spermicide) are standard teaching but not itemised in the entry — clinician to confirm which to include.' },
        { key: 'cranberry', q: 'Does cranberry actually work?',
          a: 'Honestly? The jury’s still out. Some people swear by it and the evidence is mixed and fairly weak — it might help a little for some, but it’s nowhere near a guarantee, and it isn’t a substitute for the stronger options if you’re getting a lot of infections. If you find it helps you and it’s not upsetting your stomach or clashing with other medicines, there’s little harm in trying it.',
          why: 'Source lists cranberry only as “± cranberry” — deliberately hedged. The brief specifically wants honesty about folklore vs evidence here.' },
        { key: 'methenamine', q: 'Is there a preventive that isn’t an antibiotic?',
          a: 'Yes — there’s a tablet that makes your urine a hostile place for bacteria to grow, without being an antibiotic, so it doesn’t breed resistance the way antibiotics can. We often try that sort of non-antibiotic prevention before committing you to long-term antibiotics.',
          why: 'Source management: methenamine hippurate as non-antibiotic prophylaxis, tried before antibiotics. Named generically by mechanism, no brand.' },
        { key: 'oestrogen', q: 'I’m past the menopause — is there anything specific for me?',
          a: 'There can be. After the menopause the tissues around the bladder opening get thinner and drier, which makes infections easier, and a low-dose oestrogen you use vaginally — as a cream or pessary — can genuinely cut the number you get. It works locally, so it’s a different thing from taking hormones as tablets, and it’s worth asking about if this is you.',
          why: 'Source: topical vaginal oestrogen in post-menopausal women; workup assesses for atrophic vaginitis. Distinguish local from systemic HRT to pre-empt the worry.' },
      ],
    },
    {
      title: 'Antibiotics — resistance, standby, long-term',
      items: [
        { key: 'standby', q: 'Can I just keep antibiotics at home for when it starts?',
          a: 'For the right person, yes — it’s a real option we call self-start treatment: you keep a course and begin it as soon as you feel the tell-tale symptoms, often after popping a sample in. It suits people who know their symptoms well and don’t get them too often. It isn’t for everyone, because starting antibiotics on a guess every time can breed resistance and mask something else — so we’d agree together whether it fits you.',
          why: 'Source management: patient-initiated self-start therapy is a listed option. Offer it genuinely, but pair with stewardship caveat per the brief.' },
        { key: 'daily_antibiotic', q: 'Could I take a small daily antibiotic to stop them?',
          a: 'That’s an option too — a low dose taken regularly for a stretch of months to keep them at bay. It works well for a lot of people. We usually reach for it after we’ve tried the simpler and non-antibiotic steps, and we review it rather than leaving you on it indefinitely, because the more antibiotic we use, the more we push resistance along.',
          why: 'Source: low-dose continuous prophylaxis, placed after behavioural/non-antibiotic rungs on the ladder.' },
        { key: 'forever', q: 'Will I be on antibiotics forever?',
          a: 'That’s not the plan, and I understand why you’d dread it. When we do use a preventive antibiotic it’s usually for a defined stretch, then we stop and see how you get on — often things are quieter afterwards. The aim is always to get you off them, not to keep you on them, which is why we bother with all the other steps first.',
          why: 'Directly addresses the brief’s “will I be on antibiotics forever” worry. Frame as time-limited and reviewed, not open-ended.' },
        { key: 'resistance', q: 'I keep hearing about resistance — is that why you won’t just prescribe?',
          a: 'Partly, yes, and it’s not us being stingy. Every time bacteria meet an antibiotic they don’t need, the survivors get a bit tougher — so the day you truly need one, it’s more likely to work if we’ve used them carefully all along. So when I hold back, I’m protecting your future infections, not dismissing this one.',
          why: 'Stewardship rationale, reframed as protecting the patient rather than rationing. The brief flags resistance worry explicitly.' },
        { key: 'why_not_fixed', q: 'The antibiotics clear it, so why does it keep coming back?',
          a: 'Because an antibiotic only mops up the infection that’s there — it doesn’t change whatever’s letting them keep starting. If there’s a fixable reason underneath, like a stone or a bladder that doesn’t empty, treating that is what actually breaks the cycle. Where there’s no such cause, it’s about the prevention steps rather than the antibiotic itself.',
          why: 'Central source message: treat the enabling lesion (stone/residual/prostate), not just each episode. Antibiotics clear episodes but don’t fix the reason.' },
      ],
    },
    {
      title: 'Day to day — sex, hydration, hygiene',
      items: [
        { key: 'sex_link', q: 'Is this linked to sex?',
          a: 'For a lot of women, yes — infections that reliably turn up a day or so after sex are a well-recognised pattern, and it’s nothing to be embarrassed about. It’s simply that sex can nudge bacteria towards the bladder. The good news is that pattern is one of the easier ones to help.',
          why: 'Source lists post-coital prophylaxis, implying a recognised temporal link with intercourse. Normalise it — patients are often too embarrassed to raise it.' },
        { key: 'post_coital', q: 'Is there something I can do around sex specifically?',
          a: 'There is — if yours cluster around sex, one neat option is a single antibiotic dose taken just after, rather than every day, which many women prefer. Simple habits like emptying your bladder afterwards are low-cost to try too. We’d work out together whether the after-sex dose suits you.',
          why: 'Source: post-coital prophylaxis. Post-coital voiding is standard general advice; kept as a gentle “worth a try”.',
          review: 'Post-coital voiding is standard teaching but not explicitly in the source entry — clinician to confirm inclusion and strength of claim.' },
        { key: 'contraception', q: 'Could my contraception be part of it?',
          a: 'It can play a part for some women, so it’s a fair thing to raise. If you think yours started or worsened around a change in contraception, mention it and we can talk through whether an alternative might suit you better.',
          why: 'Not in the source entry — kept deliberately generic and non-prescriptive.',
          review: 'Spermicide/diaphragm association with recurrent UTI is standard general knowledge but absent from the source entry — clinician to confirm whether to state it specifically.' },
        { key: 'how_much_water', q: 'How much should I actually drink?',
          a: 'There’s no need to force litres to the point of misery. A reasonable aim is enough that your urine stays a pale straw colour through the day rather than dark — that usually means you’re flushing things through nicely.',
          why: 'Practical, non-folkloric hydration target. Avoids over-promising water as a cure while giving a usable yardstick.' },
        { key: 'hygiene', q: 'Am I causing this with poor hygiene?',
          a: 'Almost certainly not, and I want to take that worry off you. Recurrent infections aren’t a sign of being unclean — over-washing or harsh products can actually irritate things and make matters worse. Gentle and normal is exactly right.',
          why: 'Brief demands we never dismiss and never shame. Correct the common self-blame; flag that over-cleaning is counterproductive.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'red_flags', q: 'When should I worry — when do I come straight back?',
          a: 'Come straight back if you develop a fever or shivering, pain in your back or side rather than just low down, or you start being sick — those can mean the infection has climbed up to the kidney and needs treating quickly. Also come back if you can’t pass urine at all, if you keep seeing blood, or if it simply isn’t settling on treatment.',
          why: 'The safety-net is the single most important thing they leave with. Source flags recurrent pyelonephritis (fever, flank pain) as the escalation to catch early; mirror the exemplar’s plain, every-time delivery.' },
        { key: 'kidney_signs', q: 'How do I tell a bladder infection from a kidney one?',
          a: 'As a rough guide: a bladder infection is stinging, going often and urgently, and feeling low down. A kidney infection tends to add a fever, the shivers, pain higher up in your back or side, and feeling generally unwell or sick. If it feels like it’s moved up and you feel properly ill, don’t sit on it — that’s the one to be seen for.',
          why: 'Gives a concrete self-triage so the red-flag advice is actionable. Consistent with source’s lower- vs upper-tract distinction.' },
      ],
    },
  ],
};
