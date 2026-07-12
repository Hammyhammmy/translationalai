// "When patients ask…" — DRAFT for clinician review. Not medical advice.
// Presentation: microscopic_hematuria (Microscopic / non-visible haematuria —
//   blood found only on dipstick or microscopy, no visible blood).
// Matches the shape/voice of the renal_colic exemplar in urinary-qa.js (ASK).
// Second-person spoken register: words a PA would actually say at the bedside.
//
// Framing tension (per brief): this is usually an incidental, anxiety-provoking
//   finding — the patient feels well and has been phoned about blood they can't
//   see. Balance "we take it seriously / here's the workup" with "most people are
//   reassured", without dismissing OR catastrophising. Never a flat "no" to the
//   cancer question — explain the workup exists precisely to check.

export const microscopic_hematuria = {
  stage: 'presentation',
  shared: ['imaging'],
  groups: [
    {
      title: 'What this actually means',
      items: [
        { key: 'what_found', q: 'What have you actually found — I can’t see any blood?',
          a: 'That’s right, and it’s the usual way this shows up. A urine test has picked up a tiny amount of blood — red cells that only show up under the microscope, far too little to see with the naked eye. So you haven’t missed anything; it’s simply below the level your eye could ever spot.' },
        { key: 'feel_fine', q: 'But I feel completely fine — is that not a good sign?',
          a: 'Feeling well is genuinely reassuring, and most people with this do feel exactly as you do. The catch is that the few causes we most want to rule out often don’t make you feel unwell early on — so feeling fine doesn’t tell us enough on its own. That’s the only reason we look a bit further rather than just taking your word for how well you are.',
          why: 'The core tension of the whole set. Validate that feeling fine is a real positive, but explain honestly why “I feel fine” can’t be the stopping point — the silent causes are exactly the ones the workup targets.' },
        { key: 'how_serious', q: 'How serious is this — should I be preparing for bad news?',
          a: 'Honestly, most people who go through these checks turn out to have nothing serious, and many have no cause found at all. We take it seriously enough to look properly, but “we’re checking” is not the same as “we expect something bad.” Try to hold both: worth investigating, and most likely fine.',
          why: 'Name both halves of the tension in one breath — the whole brief in a single answer. Neither dismiss (“it’s nothing”) nor catastrophise (“we’re very worried”).' },
      ],
    },
    {
      title: 'Should I be worried — is it cancer?',
      items: [
        { key: 'cancer', q: 'Could this be cancer?',
          a: 'It’s the question almost everyone has, and I won’t brush it off. Blood in the urine can occasionally be an early clue to a cancer in the bladder or kidney — and that possibility is precisely why we do the tests rather than ignore it. But it’s one of several causes, most of them harmless, and most people who get checked don’t have a cancer. So we’re not assuming the worst; we’re looking properly so we can put it to bed.',
          why: 'Never a flat “no.” Validate, be honest that cancer is one thing the workup screens for, but immediately set it among many mostly-benign causes and point to the checks as the reassurance — not a promise before the tests.' },
        { key: 'why_bother', q: 'If I feel fine, why bother investigating at all?',
          a: 'Fair question. We investigate for one reason: a handful of the causes are ones you really want caught early, while you feel well, because that’s when they’re most treatable. For most people the checks come back clear and that’s the end of it — but the only way to earn that reassurance is to do the looking. It’s worth a little inconvenience now for peace of mind that actually means something.',
          why: 'Directly answers the “why bother” resistance the brief flags. Justify the workup by early-and-treatable, then close on genuine (test-backed) reassurance rather than hand-waving.' },
        { key: 'how_likely', q: 'How likely is it to be something bad?',
          a: 'For most people, not very — and we don’t treat everyone the same. We weigh things up: your age, whether you smoke or have, and how much blood is showing. Younger non-smokers with only a trace sit at the lower-risk end and may need very little; that’s a real conversation we’ll have honestly, rather than putting everyone through the same mill.',
          why: 'Introduce risk-stratification (AUA low/intermediate/high from workup) in plain words so the later “do I really need a cystoscopy” answer isn’t a surprise — and so low-risk patients don’t assume the fullest workup is inevitable.' },
      ],
    },
    {
      title: 'The tests — a camera and a scan when I feel well',
      items: [
        { key: 'what_tests', q: 'What tests will I actually need?',
          a: 'It depends on where you sit on that risk picture. It usually means confirming the blood on a proper sample, a look inside the bladder with a small camera, and a scan of the kidneys and the tubes above the bladder. Between them, the camera and the scan cover the whole waterworks — the camera does the bladder, the scan does the kidneys and tubes.',
          why: 'Set out the two-pronged logic (cystoscopy = bladder, upper-tract imaging = kidneys/ureters) so the patient sees why it’s a camera AND a scan, not one or the other — the workup field is explicit that they image different territory.' },
        { key: 'cystoscopy_needed', q: 'Do I really need a camera in my bladder — that sounds awful?',
          a: 'I understand — it’s the bit most people dread. It’s the only way to see the bladder lining directly, and a scan can’t do that job, so for most people it’s worth doing once to check properly. It’s usually quick, often done awake with numbing gel, and uncomfortable rather than painful. For lower-risk people we’ll talk through whether it’s truly needed for you rather than just booking it automatically.',
          why: 'Address the single most feared test head-on. Justify why it can’t be skipped for the risk group that needs it (direct view of bladder lining), soften the experience honestly, and leave the door open for shared decision-making in the low-risk group.' },
        { key: 'scan_type', q: 'What kind of scan is it — the one with the dye?',
          a: 'Which scan depends on your risk. Some people have a simple ultrasound of the kidneys, while others have a more detailed x-ray scan with dye that maps the whole drainage system. We’ll tell you which one you’re booked for and why that one fits you.',
          why: 'Reflects the workup split (ultrasound for intermediate-ish, CT urogram for high-risk) without brand names, and hands off dye-safety questions to the shared imaging group (contrast_dye) rather than re-authoring them.' },
        { key: 'kidney_check', q: 'Is anyone checking my kidneys themselves, not just for cancer?',
          a: 'Yes — that’s a good question. Sometimes the blood comes from the kidney’s filters rather than anything in the waterworks, and that’s a different, more medical kind of problem. We check for its fingerprints — the shape of the red cells, protein in the urine, a kidney blood test — and if that pattern shows up you’d see a kidney specialist rather than going down the camera route at all.',
          why: 'Surface the glomerular/nephrology arm from the differential and red flags in patient terms — dysmorphic RBCs, proteinuria, raised creatinine → nephrology, not cystoscopy. Important so a glomerular patient isn’t steered only toward the cancer workup.' },
      ],
    },
    {
      title: 'What could be causing it',
      items: [
        { key: 'exercise', q: 'Could it just be from exercise or the gym?',
          a: 'It can, actually — a hard run or heavy exercise can put a bit of blood in the urine for a short while, and it settles. That’s one of the harmless causes we think about. But because it usually clears within a day or two, we’d confirm it’s gone by repeating the test rather than just assuming that’s all it was.',
          why: 'Named benign transient cause in the workup (recent vigorous exercise). Validate it, then explain the safety-catch (re-test to confirm it clears) so “it was just the gym” isn’t used to skip a genuinely needed check.' },
        { key: 'periods', q: 'Could it be my period — could that have thrown it off?',
          a: 'Very possibly. Menstrual blood can find its way into the sample and read as blood in the urine when it isn’t really coming from the waterworks at all. The simple fix is to repeat the test away from your period on a clean sample, so we know what we’re really dealing with.',
          why: 'Menstruation is a listed transient cause. Keep it matter-of-fact and give the concrete workaround (re-test off-period) rather than dismissing — a genuine finding could otherwise be missed.' },
        { key: 'infection', q: 'Could it just be a water infection?',
          a: 'It can — an infection irritates the bladder and can leave a little blood behind. If there are signs of one, we treat it first and then re-check the urine once it’s cleared. If the blood’s gone, great; if it’s still there afterwards, that tells us to keep looking rather than putting it down to the infection.',
          why: 'Cystitis is in the differential; the workup says exclude and re-test once treated. The teaching point is the re-check after treatment — persistent blood after a treated infection is what pushes on with the workup.' },
        { key: 'medication', q: 'Could it be my blood-thinner or a tablet I’m on?',
          a: 'People often assume a blood-thinner explains it, but here’s the honest bit: being on one doesn’t give us a free pass to stop looking. It can be there at the same time as a real cause, so we’d still check things out the same way rather than blaming the tablet and closing the book.',
          why: 'review: presentation entry does not list anticoagulants as a cause — kept deliberately generic and standard (anticoagulation is NOT an adequate explanation for haematuria; still investigate). Clinician to confirm local wording/threshold.' },
        { key: 'prostate_men', q: 'I’m an older man — could it just be my prostate?',
          a: 'It can be — an enlarged prostate is a common, benign reason for a little blood in the urine as men get older, and it may well turn out to be that. But we can’t safely assume it without checking, because a couple of the causes we screen for get a bit more likely with age too. So we take the prostate seriously as a likely answer and still do the checks.',
          why: 'BPH is in the differential as benign prostatic bleeding in older men. Offer it as a plausible benign cause while being honest that age also raises the urothelial-cancer risk factor — so it doesn’t become a reason to skip the workup.' },
      ],
    },
    {
      title: 'Day to day',
      items: [
        { key: 'daily_life', q: 'Do I need to change anything or stop doing things while I wait?',
          a: 'No — you can carry on completely as normal. There’s nothing you’re doing that’s making it worse, and nothing you need to stop. Keep drinking normally, work, exercise, all fine. This is about checking, not about you being unwell.',
          why: 'The patient feels well; over-restricting daily life would manufacture the illness-anxiety the brief warns against. Explicitly free them to carry on.' },
        { key: 'contagious', q: 'Is it dangerous to leave it a few weeks until the tests?',
          a: 'A short wait for the tests is safe — this isn’t an emergency, and these causes don’t change overnight. The one thing that would change the plan is if you actually see red or pink urine; that moves you into a faster track, so let us know straight away if that happens. Otherwise, waiting the usual few weeks is perfectly fine.',
          why: 'Reassure on the wait (avoids catastrophising) while planting the visible-haematuria safety-net from whatToWatch — any VISIBLE blood skips the risk-grading and gets the urgent pathway.' },
      ],
    },
    {
      title: 'When the tests are clear — what next?',
      items: [
        { key: 'tests_clear', q: 'If all the tests come back clear, is that the end of it?',
          a: 'For a lot of people, yes — clear tests are genuinely good news and often the finding just fades. What we usually do instead of scanning you all over again is simply re-check the urine at a follow-up. If it’s settled, we can draw a line under it; if it keeps showing, we’d have another think rather than ignore it.',
          why: 'Directly answers the brief’s “what if clear — do I need repeat checks”. The management field is explicit: negative workup → follow up with repeat urinalysis rather than re-imaging. Frame the repeat test as light-touch, not a red flag.' },
        { key: 'no_cause', q: 'What if you never find out what caused it?',
          a: 'That’s actually a common and reassuring ending — for many people no cause is ever found, and once the serious ones are ruled out, no answer is a good answer here. It means we’ve looked in the right places and not found anything that needs treating. You don’t need a named culprit to be safe.',
          why: '“No cause found” is the modal outcome and the management plan accepts it. Reframe the absence of a diagnosis as reassuring rather than as unfinished business, so the patient isn’t left anxious about a missing answer.' },
        { key: 'come_back', q: 'When should I come back sooner rather than wait?',
          a: 'Come back sooner if you actually see blood — red or pink urine — because that gets looked at faster than this does. Also let us know if you get burning or pain passing urine that doesn’t settle, a fever, or pain in your side or back. Short of those, waiting for your booked tests is exactly right.',
          why: 'Every set ends on the safety-net (mirrors renal_colic red_flags). The headline is visible haematuria (whatToWatch) → faster track; the rest are plain, general red flags kept safely generic.' },
      ],
    },
  ],
};
