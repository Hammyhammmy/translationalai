// "When patients ask…" — DRAFT for clinician review. Not medical advice.
// Entry: presentation `stone_prevention` (Kidney-stone prevention / metabolic workup —
// the follow-up clinic conversation after a stone, about stopping the next one).
// Voice/shape matched to the ASK.renal_colic exemplar in urinary-qa.js.
// Clinical source: PRESENTATIONS.stone_prevention in urinary-presentations.js only
// (+ safe general knowledge).
// Pairs with `renal_colic` (the acute episode) — this set deliberately avoids re-treading
// the acute pain / passing-the-stone questions and focuses on the PREVENTION clinic:
// why you form stones, the metabolic tests, diet myths, medication, monitoring.
// `shared: []` — this is a counselling/lifestyle conversation, not a scan- or theatre-logistics
// one; the 24-hour urine and bloods are condition-specific and authored below, not inherited.

export const stone_prevention = {
  stage: 'presentation',
  shared: [],
  groups: [
    {
      title: 'Why do I keep forming stones?',
      items: [
        { key: 'why_me', q: 'Why did I form a stone in the first place?',
          a: 'A stone forms when your urine gets over-concentrated with the salts that build stones, so they crystallise out instead of staying dissolved — a bit like sugar coming out of an over-sweet cup of tea. Usually it’s a mix of not quite enough fluid and some tendency in how your body handles those salts. The tests we do are exactly to work out which of those is driving yours.' },
        { key: 'diet_or_genes', q: 'Is this my diet or is it in my genes?',
          a: 'Honestly, it’s usually a bit of both, and the balance is different for everyone. Some people have an inherited tendency that no amount of careful eating fully cancels out; for others, small habits — mainly how much they drink and how much salt they eat — make most of the difference. That’s the whole point of testing rather than guessing: so any advice we give you is actually aimed at your cause.',
          why: 'Patients often arrive either blaming themselves or expecting one magic culprit. Name both, refuse the single-cause story, and pivot to “that’s why we test” so the workup feels purposeful.' },
        { key: 'my_fault', q: 'Did I do something wrong to cause this?',
          a: 'No — and please don’t carry this as a blame thing. Plenty of people who eat carefully still form stones, and plenty who don’t never do. It’s much more about the chemistry of your urine than about willpower. What we can do is find the levers that actually work for you and pull those.',
          why: 'A blamed patient disengages from the very prevention advice this clinic exists to give. Mirrors the renal_colic “my_fault” defuse, kept distinct from it.' },
        { key: 'stone_type', q: 'Does it matter what my stone was made of?',
          a: 'It matters more than almost anything else. Most stones are calcium-based, but some are made of uric acid, some come from infection, and a rare few are inherited — and the prevention for each is genuinely different. If you managed to catch and hand in the stone, analysing it is one of the single most useful things we have.',
          why: 'The stone analysis drives the whole plan. Flag early that advice is type-specific so later “is this right for me?” answers land.' },
        { key: 'catch_next', q: 'What if I lost the stone — can you still help?',
          a: 'Yes. Analysing a passed stone is ideal, but if it’s gone, the urine collection and bloods still tell us a great deal about which way your chemistry leans. If you ever pass another, do try to strain your urine and catch it — even a tiny fragment is genuinely useful for pinning down the type.' },
      ],
    },
    {
      title: 'The tests to find out why',
      items: [
        { key: 'what_tests', q: 'What tests will you actually do?',
          a: 'Two main things beyond looking at the stone itself. One is a set of blood tests — to check your calcium, a gland hormone that controls calcium, your urate level and a couple of salts. The other is a 24-hour urine collection, where you save all your urine for a full day so we can measure exactly what’s in it. Between them they usually point to the abnormality we can target.' },
        { key: 'why_24h', q: 'Why do I have to collect my urine for a whole day?',
          a: 'Because a one-off sample is just a snapshot, and it changes hour to hour with what you’ve eaten and drunk. Collecting everything over a full 24 hours gives us the true daily totals — how much fluid you’re really passing, and how much calcium, oxalate, citrate, uric acid and salt come out. That’s the test that tells us which lever to pull, so it’s worth doing it properly.',
          why: 'The 24-h collection is the cornerstone of the workup but feels tedious. Justify why a spot sample won’t do, so they complete it accurately.' },
        { key: 'blood_tests_why', q: 'What are the blood tests looking for?',
          a: 'Mainly a few treatable causes hiding in the background. We check your calcium and a gland hormone that controls it, because an overactive gland can quietly push calcium into your urine and make stones. We also look at your urate and your body’s acid balance, since those point to other stone types. If one of those turns up, it changes the plan.',
          why: 'Ties the bloods to specific mechanisms (hyperparathyroidism, urate, tubular acidosis) without jargon, so the patient sees the test has a purpose, not a fishing trip.' },
      ],
    },
    {
      title: 'Diet — what actually helps',
      items: [
        { key: 'cut_calcium', q: 'Should I cut out calcium and dairy?',
          a: 'This is the big myth, and I’m glad you asked — for most people the answer is no. It sounds logical because most stones contain calcium, but cutting dietary calcium usually backfires: with less calcium in your gut, more of a substance called oxalate gets absorbed and ends up in your urine, and that can actually make stones more likely. A normal amount of calcium in your food is what we want. Where calcium can be a problem is in supplement pills — mention those to us.',
          why: 'The single most important myth to bust in this clinic. Explain the mechanism (low dietary calcium → higher oxalate absorption) plainly, and separate food-calcium from supplements — the honest nuance.' },
        { key: 'how_much_drink', q: 'How much should I drink?',
          a: 'This is the biggest single lever you have. Aim to drink enough that you’re passing well over two litres of urine a day — in practice that usually means drinking somewhere around two-and-a-half to three litres, more in hot weather or if you sweat a lot. The simplest guide is your urine colour: keep it pale, like pale straw, rather than dark. Spread it through the day, and have a glass before bed.',
          why: 'Fluids prevent most recurrences — the highest-yield advice. Give a concrete output target and the pale-urine rule of thumb, since “drink more” alone is too vague to act on.' },
        { key: 'salt', q: 'Does salt really matter that much?',
          a: 'More than most people expect. A high-salt diet makes your kidneys spill more calcium into the urine, which feeds calcium stones. Cutting back on obviously salty foods and not adding much at the table is a genuinely useful change — and it’s good for your blood pressure into the bargain. A lot of the salt is hidden in processed and takeaway food rather than the salt-pot.',
          why: 'Salt–calcium link is under-appreciated by patients. Point at hidden/processed salt so the advice is actionable, not just “eat less salt”.' },
        { key: 'oxalate', q: 'I’ve read I should avoid oxalate — is that right?',
          a: 'Only for some people. Oxalate is in things like spinach, rhubarb, nuts, beetroot and a lot of tea and chocolate, and if your urine collection shows your oxalate is high, cutting down on the biggest sources helps. But if your oxalate is normal, stripping these healthy foods out gains you little — so this is one to steer by your test rather than blanket-avoid. And remember the calcium point: keeping normal calcium in the same meal actually mops up some oxalate before it’s absorbed.',
          why: 'Honest “it depends on your result” answer. Oxalate restriction is test-driven, not universal; tie it back to the calcium myth to reinforce the mechanism.' },
        { key: 'protein_meat', q: 'Do I need to give up meat?',
          a: 'You don’t have to give it up, but easing back on animal protein — red meat, but also a lot of fish and poultry — helps if you’re a stone-former. A heavy meat intake makes your urine more acidic and raises the salts that build several stone types. Think moderating portions rather than going fully vegetarian, unless we’ve found a specific reason for stricter advice.',
          why: 'Protein/purine load feeds calcium and uric-acid stones. Frame as moderation to keep it realistic and avoid an all-or-nothing reaction.' },
        { key: 'one_size', q: 'Is there one diet that stops all stones?',
          a: 'There isn’t, and anyone selling you one is overselling it. The universal bits are true for nearly everyone — drink plenty, go easy on salt and heavy meat, keep a normal calcium intake. Beyond that, the right tweaks depend on your stone type and what your urine test shows. That’s deliberately not one-size-fits-all, and it’s why we’d rather tailor it than hand you a generic leaflet.',
          why: 'Sets honest expectations and gives agency: universal basics + a personalised layer. Counters the “just tell me the diet” demand without dismissing it.' },
      ],
    },
    {
      title: 'Do I need medication?',
      items: [
        { key: 'need_tablets', q: 'Will I need tablets to prevent them?',
          a: 'Not everyone does. For a lot of people, getting the fluids and diet right is enough. We tend to add a medicine when your urine test shows a specific abnormality that a tablet can correct, or when stones keep coming despite doing the lifestyle side well. So it’s a considered add-on, not an automatic one.',
          why: 'Patients either fear lifelong pills or want a quick fix. Position medication as targeted and test-driven, protecting the “fluids first” message.' },
        { key: 'what_tablets', q: 'What sort of tablets are they?',
          a: 'It depends entirely on what we find. For some calcium stone-formers we use a water tablet that, counter-intuitively, makes the kidney hold on to calcium instead of dumping it into the urine. For others we use something that raises a natural stone-inhibitor in the urine and gently de-acidifies it. For uric-acid stones, de-acidifying the urine is the main move and can even help dissolve them. I’ll only go into the one that fits your result.',
          why: 'Illustrates that the drug follows the mechanism (thiazide, citrate, alkalinisation) in lay terms, without brand names or over-detailing meds the patient may never take.' },
        { key: 'side_effects', q: 'What are the side effects of the prevention tablets?',
          a: 'That depends which one we settle on, so I’ll go through the specific ones when we know. As a rule these are long-term, low-dose medicines that most people tolerate well, and we usually check a blood test or two after starting to make sure your salts stay balanced. I’ll always tell you the handful of things that mean call us rather than wait.',
          why: 'Overrides the generic SHARED_ASK meds framing with the stone-prevention specifics: long-term, monitored with bloods. Keep drug-specific detail deferred until the agent is chosen.' },
        { key: 'forever', q: 'Will I be on them for life?',
          a: 'Often these are long-term medicines, because they work by keeping your urine chemistry favourable — stop them and the tendency can drift back. But it’s not set in stone: if follow-up tests look good and your stones stay away, we can review whether you still need them. It’s a conversation we keep having, not a life sentence handed down on day one.' },
      ],
    },
    {
      title: 'Monitoring & follow-up',
      items: [
        { key: 'how_know_working', q: 'How will we know if any of this is working?',
          a: 'A couple of ways. We usually repeat the 24-hour urine collection a few months after you’ve made the changes or started a tablet, to check the numbers we were targeting have actually shifted in the right direction. And we keep an eye on your stone situation with imaging over time. If the chemistry’s improved but you didn’t “feel” anything change, that’s fine — this is a numbers game as much as a symptoms one.',
          why: 'Prevention has no daily symptom to track, which frustrates patients. Explain the repeat 24-h and imaging so “working” is defined by objective markers, not how they feel.' },
        { key: 'imaging_followup', q: 'Will I keep having scans?',
          a: 'Usually some, spaced out, so we can see whether you’re staying clear or quietly building new stones — the ones inside the kidney often cause no symptoms until they move. How often depends on your risk; we don’t scan for the sake of it, but we also don’t like being caught out. I’ll tell you the plan for you.' },
        { key: 'how_long_followup', q: 'How long will you keep seeing me for this?',
          a: 'That depends on how things go. If you’re a one-off stone with reassuring tests, follow-up may be fairly short. If you’re forming them repeatedly, or you’ve got a type that needs watching, we tend to stay in touch longer-term. The aim is to hand you the tools and step back when it’s safe to, not to keep you tethered.' },
      ],
    },
    {
      title: 'Will I get another — and when to come straight back',
      items: [
        { key: 'come_back_certain', q: 'Will I definitely get another stone?',
          a: 'Not definitely — but honestly, once you’ve formed one there’s a real chance of another over the years if nothing changes. I won’t pretend that away. The good news is that this is one of the more preventable things we deal with: getting the fluids right alone shifts the odds a lot, and the tailored steps shift them further. So the number isn’t fixed — a lot of it is now in your hands.',
          why: 'Do not falsely reassure — recurrence is common. Give the honest risk, then immediately hand back agency via prevention, mirroring the renal_colic “come_back” arc without duplicating its wording.' },
        { key: 'guarantee', q: 'If I do everything right, am I guaranteed to be stone-free?',
          a: 'No guarantee, I’m afraid — some people still form the odd stone despite doing everything well, especially if there’s a strong inherited streak. But “doing everything right” genuinely reduces both how often they come and, often, how much trouble they cause when they do. Think of it as heavily stacking the odds in your favour rather than a cast-iron promise.',
          why: 'Prevents the patient feeling cheated by a later recurrence. Honest ceiling on what lifestyle can achieve, while keeping the effort worthwhile.' },
        { key: 'family_checking', q: 'Should my children or family get checked?',
          a: 'There can be a family tendency, but there’s no routine screening we’d put your relatives through just because you’ve had a stone. Where it’s worth a look is if several close relatives are affected, or if yours turns out to be one of the inherited types — I’d flag that specifically. Otherwise, the same sensible habits, mainly drinking well, are good advice for anyone.' },
        { key: 'come_straight_back', q: 'When should I come straight back?',
          a: 'Come straight back — as an emergency — if you get the tell-tale severe waves of loin-to-groin pain of a new stone on the move, and especially if that pain comes with a fever or the shivers, if you can’t keep fluids down, or if you can’t pass urine at all. A fever alongside stone pain needs seeing urgently, because a blocked, infected kidney turns serious fast. Don’t sit on that one.',
          why: 'The safety-net for a NEW acute episode is the most important thing they leave with. Restated here deliberately (not just left to renal_colic) because this clinic patient may next present acutely; fever + obstruction is the emergency.' },
      ],
    },
  ],
};
