// "When patients ask…" — DRAFT for clinician review. Not medical advice.
// Presentation: retention (Urinary retention — can't pass urine).
// Matches the shape/voice of the renal_colic exemplar in urinary-qa.js (ASK).
// Second-person spoken register: words a PA would actually say at the bedside.

export const retention = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'Understanding what’s wrong',
      items: [
        { key: 'why_cant_pee', q: 'Why can’t I pee — my bladder feels like it’s bursting?',
          a: 'Your bladder’s full and stretched, but the urine can’t get out — either because the outlet is blocked, often by an enlarged prostate or a narrowing, or because the bladder muscle isn’t squeezing as it should. That trapped, stretched feeling is exactly why it’s so uncomfortable, and draining it is the first thing we’ll do.',
          why: 'Lead with the mechanism they can feel (full + can’t empty) and split it into the two source-buckets — outlet block vs bladder-not-contracting — without committing to a cause before the scan.' },
        { key: 'prostate_cancer', q: 'Is it my prostate — could this be cancer?',
          a: 'It’s a fair thing to ask and I won’t brush it aside. In older men an enlarged prostate is the commonest reason for this, and that enlargement is usually benign rather than a cancer — but because we can’t tell size and cancer apart by the block alone, we’ll examine the prostate and check it out properly rather than just assume. We’re not ignoring the worry; we’ll look into it.',
          why: 'Never a flat “no” to cancer. Validate, name BPH as the usual benign cause from the differential, but be honest that retention itself doesn’t distinguish benign from malignant — the workup (DRE) does.' },
        { key: 'why_now', q: 'Why has this happened now, all of a sudden?',
          a: 'Often things have been narrowing slowly for a while — a weaker stream or getting up in the night — and then something tips it over the edge so nothing will come at all. Once we’ve relieved it, we’ll work out what the underlying cause is rather than just leaving it there.' },
        { key: 'my_fault', q: 'Is this something I did to bring it on?',
          a: 'No — this isn’t about anything you did wrong. It’s usually the plumbing gradually narrowing or the bladder tiring, not a mistake on your part. Some things like certain cold or allergy medicines can occasionally tip a borderline bladder over, and we’ll go through your tablets, but you’re not to blame for this.' },
      ],
    },
    {
      title: 'The symptom',
      items: [
        { key: 'catheter_dread', q: 'Am I going to need a catheter? I really don’t want one.',
          a: 'I know the idea of it puts people off — but honestly it’s the quickest way to stop this pain, and most people say the relief once it’s draining far outweighs the moment of putting it in. It’s a soft tube passed up the natural passage, we use plenty of numbing gel, and for a lot of people it’s only in until we’ve sorted the cause.',
          why: 'The catheter is the dreaded thing — name the dread, validate it, then reframe around the relief. Don’t over-promise it’ll be brief for everyone (chronic retention may need it longer); “for a lot of people” keeps it honest.' },
        { key: 'why_dribbles', q: 'A bit still dribbles out — so I’m not completely blocked, am I?',
          a: 'Those few dribbles are actually overflow — the bladder’s so full that a little leaks past the blockage, which can fool you into thinking you’re emptying. It doesn’t mean you’re draining properly, so we still treat this as a full, blocked bladder that needs relieving.' },
        { key: 'how_long_stuck', q: 'How long can it be left like this before it does harm?',
          a: 'It’s not something to sit on — a tense, full bladder is painful, can get infected, and the back-pressure can start to strain the kidneys if it’s left. That’s why we relieve it promptly rather than waiting, and then look at why it happened.',
          why: 'Anchors the urgency to the redFlags (infection, back-pressure on kidneys) so “just wait it out” isn’t on the table, without frightening them about a timeline the source doesn’t specify.' },
      ],
    },
    {
      title: 'What happens now',
      items: [
        { key: 'what_first', q: 'What are you going to do first?',
          a: 'First we scan to confirm how much is trapped, then we pass a catheter to drain it — that’s what takes the pain away. We measure what comes out, test the urine, and do some blood tests, and then we work out and treat the cause rather than just leaving the tube in.' },
        { key: 'permanent', q: 'Will I be stuck with a catheter forever — is this permanent?',
          a: 'For most people, no. The catheter is a bridge to get you comfortable and buy time, not the long-term answer — the plan is to treat what caused the block so you can eventually pass urine yourself. Some people do need it a while, or occasionally a trial without it later on, and we’ll be straight with you about which path looks likely for you.',
          why: 'Directly answers the “is it permanent” dread. Reassure honestly (catheter is a bridge, from management) but don’t promise everyone regains function — flag TWOC/longer-term possibility so it isn’t a broken promise.' },
        { key: 'if_cant_pass', q: 'What if the tube won’t go in?',
          a: 'Occasionally the usual route is too narrow — say from an old narrowing — and the tube won’t pass. If that happens there’s another safe way to drain the bladder through a small tube just above the pubic bone instead, so we can always relieve it one way or another.',
          why: 'Covers the suprapubic fallback from management (impassable stricture) reassuringly — the point is “we can always drain you,” not the technicalities.' },
        { key: 'treat_cause', q: 'How do you actually fix the cause so it doesn’t just happen again?',
          a: 'That depends on what we find. If it’s an enlarged prostate, there are medicines that relax or shrink it, and an operation if those aren’t enough; if it’s a narrowing of the passage, that can be repaired surgically. The catheter buys us the time to sort the right one for you.' },
        { key: 'surgery', q: 'Does this mean I’ll need an operation?',
          a: 'Not necessarily — a lot of causes, like an enlarged prostate, are treated with tablets first, and surgery is only if those don’t do the job or the cause needs it, such as repairing a narrowing. We’ll talk you through whether an operation is likely for your situation, and the surgeon would go through the details and consent with you.',
          why: 'Respect scope — formal consent and operative detail are the operating surgeon’s job, not the PA’s; keep this to setting expectations.' },
      ],
    },
    {
      title: 'Day to day',
      items: [
        { key: 'weeing_loads', q: 'Now the tube’s in I’m weeing huge amounts — is something wrong?',
          a: 'That can actually be expected after we relieve a bladder that’s been backed up for a while — the kidneys briefly overshoot and pour out a lot of urine while things rebalance. It’s not a sign it’s gone wrong, but because you can lose a lot of fluid and salts, we keep a close eye on your output, top up your fluids, and check your blood tests until it settles.',
          why: 'Post-obstructive diuresis — straight from redFlags/management/pearls. Reassure it’s expected, but state plainly we monitor fluids and electrolytes so it doesn’t read as “ignore it.”' },
        { key: 'living_with_catheter', q: 'How do I manage day to day if I go home with the catheter?',
          a: 'Plenty of people go home with one for a spell and get on fine — you’ll have a bag, we’ll show you and anyone helping you how to look after it and keep it clean, and district nurses can support you. We’ll make sure you leave knowing what’s normal and what isn’t before you go.',
          review: 'Source does not cover home catheter care specifics (bag types, hygiene, community nursing). Answer kept safely generic — clinician to confirm local discharge and district-nurse pathway.' },
        { key: 'drink_normally', q: 'Should I drink less so my bladder doesn’t fill up?',
          a: 'No — don’t cut your fluids down. With the catheter draining, the urine has somewhere to go, and drinking normally helps keep the water works flushed and lowers the infection risk. If anything, keeping well hydrated is what we’d want.',
          review: 'Fluid-intake advice is safe general knowledge rather than a specific source field. Clinician to tailor if there is co-existing heart or kidney disease.' },
      ],
    },
    {
      title: 'When to come straight back',
      items: [
        { key: 'red_flags', q: 'When should I worry — when do I come straight back?',
          a: 'Come straight back if you get a fever or the shivers, if you’re passing blood or clots in your urine, if the catheter stops draining and the pain and swelling build up again, or if you feel very unwell in yourself. Any of those need to be seen urgently, not left overnight.',
          why: 'The safety-net is the single most important thing they leave with — built from the redFlags (infection/urosepsis, clot retention, obstruction). Say it plainly, every time.' },
        { key: 'numbness_legs', q: 'What are the really serious signs I mustn’t ignore?',
          a: 'The ones that need emergency attention are new numbness around your back passage or between your legs, difficulty controlling your bowels, or new weakness in your legs. Those can point to pressure on the nerves and must be checked the same day — please don’t sit on them.',
          why: 'Cauda equina, from redFlags — painless retention can be its only urological clue. High-stakes and time-critical, so it earns its own plain-language safety-net item; “same day” conveys urgency without diagnosing.' },
        { key: 'blood_clots', q: 'There’s blood coming down the tube — is that an emergency?',
          a: 'A little pink is common after a catheter goes in, but heavier bleeding or passing clots isn’t something to wait on — clots can block the tube and let the bladder fill up painfully again. Tell us straight away if you see clots or the flow slows down or stops.',
          why: 'Clot retention from redFlags — distinguish the common minor pink tinge from clots/heavy bleeding that block drainage, so they know which one to act on.' },
      ],
    },
    {
      title: 'Outlook',
      items: [
        { key: 'happen_again', q: 'Once this is sorted, will it happen again?',
          a: 'It can, especially if the underlying cause isn’t fully treated — which is exactly why we don’t just drain it and leave it, but go after the reason. Treating the cause well is what gives you the best chance of not landing back here, and we’ll set that plan up with you.',
          why: 'Don’t falsely reassure — recurrence is real if the cause is left. Pivot to “that’s why we treat the cause,” echoing the management principle that the catheter is a bridge, not the cure.' },
        { key: 'kidney_damage', q: 'Has this done any lasting damage to my kidneys?',
          a: 'In many people, once we relieve the pressure the kidneys recover well. Because the back-up can strain them, we check your kidney blood tests and sometimes scan them, and that tells us whether they’ve been affected and need closer follow-up. We’ll share those results with you rather than leave you guessing.',
          why: 'Rising creatinine / bilateral hydronephrosis from redFlags and workup. Honest — usually recoverable but we check — rather than a blanket “you’re fine.”' },
      ],
    },
  ],
};
