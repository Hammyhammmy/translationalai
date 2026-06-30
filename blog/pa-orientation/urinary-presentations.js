// Undifferentiated GU presentations (Presentations tab): symptom → red flags →
// differential (links to conditions) → workup → management, written at teaching depth —
// enough to walk a student through the diagnostic reasoning, with a `pearls` summary.
// This is the diagnostic-reasoning layer. DRAFT — pending clinician review. Not medical advice.
// `differential[].caseId` must be a real case in urinary-model.js (enforced by tests).

export const PRESENTATIONS = {
  retention: {
    label: 'Urinary retention',
    region: 'bladder',
    complaint: '“I can’t pee.” Hours without passing urine despite a desperate urge, with a tense, tender suprapubic swelling you can often see and feel; sometimes only a few overflow dribbles get out. The job is to relieve it now, then work out why.',
    redFlags: [
      'Painless gross haematuria with clots — clot retention: the bladder is blocked by blood, so it needs irrigation, not just a standard catheter, and the bleeding source must be found',
      'Saddle anaesthesia or new bowel/bladder dysfunction — cauda equina compression is a surgical emergency; painless retention can be its only urological clue',
      'Fever or systemic upset — an infected, obstructed lower tract can tip into urosepsis once the stagnant urine behind the block gets colonised',
      'Bilateral hydronephrosis with rising creatinine — high-pressure chronic retention is threatening the kidneys, and demands decompression plus monitoring for post-obstructive diuresis',
    ],
    differential: [
      { caseId: 'bph', note: 'Commonest cause in older men — gradual outlet narrowing that finally tips over, often with preceding weak stream and nocturia' },
      { caseId: 'urethral_stricture', note: 'Suspect with prior catheterisation, instrumentation, urethritis or trauma — a fixed narrowing that also makes catheterisation difficult' },
      { caseId: 'urethral_stone', note: 'Sudden painful obstruction as a stone lodges in the urethra, sometimes with a stream that stops mid-flow' },
      { caseId: 'neurogenic_lmn', note: 'A flaccid, areflexic bladder that cannot contract — think cauda equina, diabetic cystopathy or pelvic nerve injury; the bladder is the problem, not the outlet' },
      { caseId: 'bladder_stone', note: 'Intermittent outlet plugging as a stone ball-valves the bladder neck, with positional symptoms' },
    ],
    workup: [
      'Bladder scan first — a large retained volume confirms true retention and distinguishes it from anuria (an empty bladder means look upstream at the kidneys instead)',
      'Catheterise and record the drained volume — this both relieves the pain and quantifies the retention; a very large volume flags chronic high-pressure retention and the risk of post-obstructive diuresis',
      'Urinalysis ± culture — looks for infection as a cause or consequence; pyuria/nitrites guide antibiotics, but a sample taken after catheter trauma can mislead',
      'U&E / creatinine — a raised creatinine points to back-pressure renal injury and shifts management toward closer monitoring and renal imaging',
      'DRE for prostate size/consistency, and a focused neurological exam (anal tone, perineal sensation, lower-limb reflexes) if any red flag — the exam that catches cauda equina',
      'Renal ultrasound if creatinine is raised or the upper tracts are in doubt — hydronephrosis confirms the obstruction has reached the kidneys',
    ],
    management: '**Decompress immediately:** a urethral catheter usually does it, switching to a suprapubic catheter if urethral access fails (e.g. an impassable stricture).\n\n**Then treat the underlying cause** rather than just leaving the tube in — the catheter is the bridge, not the cure, so plan definitive treatment of the lesion (medical therapy or surgery for BPH, urethroplasty for stricture).\n\n**Watch high-volume drains** for post-obstructive diuresis with fluid and electrolyte monitoring, and refer urgently if cauda equina is suspected.',
    pearls: [
      'Always scan before you blame the prostate — anuria from an empty bladder is a different (kidney) problem from a blocked outlet',
      'Painless retention plus any neurological symptom = exclude cauda equina before anything else',
      'High-pressure chronic retention can cause a brisk post-obstructive diuresis — monitor output, fluids and electrolytes after decompression',
    ],
    patient: {
      whatItIs: 'An inability to pass urine despite a full, often painful bladder — the bladder swells in the lower abdomen and only a few overflow dribbles may escape.',
      whyItMatters: 'The trapped urine is painful, can become infected, and the back-pressure can harm the kidneys; the cause may be a blocked outlet (an enlarged prostate, a narrowing) or a bladder that cannot contract.',
      whatIsDone: 'A **bladder scan** confirms the trapped volume and a **catheter** is passed to drain it for relief; the underlying cause is then treated (medication or surgery for the prostate, **urethroplasty** for a narrowing) rather than leaving the tube in.',
      whatToWatch: 'A sudden, complete inability to pass urine is an emergency; blood with clots, fever, or new numbness around the back passage or leg weakness need urgent attention.',
    },
  },
  hematuria: {
    label: 'Visible haematuria',
    region: 'bladder',
    complaint: 'Blood in the urine — frankly red or tea-coloured (visible/macroscopic), or picked up only on dipstick (non-visible). The pattern matters: painless versus painful, with or without clots, and whether it bookends the stream or runs all the way through.',
    redFlags: [
      'Painless visible haematuria is malignancy until proven otherwise — urothelial or renal cancer can bleed without any pain, so it always earns a full workup even if it settles',
      'Clot retention — clots plug the bladder outlet, causing painful retention that needs a three-way catheter and irrigation, not reassurance',
      'Haemodynamic compromise from heavy bleeding — tachycardia and a falling haemoglobin mean resuscitate and transfuse alongside the diagnostic workup',
    ],
    differential: [
      { caseId: 'urothelial_carcinoma', note: 'The classic painless visible haematuria in an older patient or smoker — the diagnosis to exclude first' },
      { caseId: 'bladder_hematuria', note: 'Bleeding with irritative storage symptoms (frequency/urgency) — points toward a bladder source such as a tumour or inflamed mucosa' },
      { caseId: 'renal_mass', note: 'Painless bleeding from a renal tumour, occasionally with a flank mass or clot colic as clots pass down the ureter' },
      { caseId: 'ureteral_stone', note: 'Haematuria accompanying classic loin-to-groin colic — the blood is from the stone abrading the ureter' },
      { caseId: 'cystitis', note: 'Haemorrhagic infection — dysuria, frequency, afebrile; a reasonable cause only once proven on culture and resolved on re-test' },
      { caseId: 'glomerular_hematuria', note: 'A medical (nephrological) cause — dysmorphic red cells, red-cell casts and proteinuria signal glomerular bleeding, not a surgical lesion' },
    ],
    workup: [
      'Confirm it is really blood on urinalysis and send a culture — dipstick also turns positive with myoglobin/haemoglobin, and infection must be excluded as a (treatable, re-testable) cause before attributing bleeding to it',
      'Urine cytology — positive cytology raises suspicion of urothelial (often high-grade) cancer, though a negative result does not exclude it',
      'Bloods: FBC for the degree of blood loss, coagulation screen and clotting/anticoagulant review, and creatinine to gauge renal function before contrast imaging',
      'CT urogram — the upper-tract study, imaging kidneys and ureters for tumours and stones (a renal mass or ureteric filling defect changes the whole pathway)',
      'Cystoscopy — the lower-tract study, directly inspecting the bladder and urethra where CT is least sensitive; together CT urogram + cystoscopy form the complete haematuria workup',
      'Synthesis: the haematuria workup is upper tract (CT urogram) plus lower tract (cystoscopy) — neither alone is enough to clear a patient',
    ],
    management: '**Treat the cause once found,** and in the acute setting manage clot retention with a three-way catheter, clot evacuation and continuous bladder irrigation while resuscitating any heavy bleeder.\n\nCrucially, **painless visible haematuria warrants urgent urology referral** for the full upper- and lower-tract workup — do not write it off as a UTI without a positive culture that clears on repeat testing, because an unproven UTI is a common reason cancers are missed.',
    pearls: [
      'Painless visible haematuria = cancer until proven otherwise — image the upper tract (CT urogram) and scope the lower tract (cystoscopy)',
      'Never close the loop on “probable UTI” unless the culture is positive and the haematuria clears on a follow-up dip',
      'Dysmorphic red cells, casts and proteinuria point to a glomerular (nephrology) cause, not a urological one',
    ],
    patient: {
      whatItIs: 'Blood in the urine — either visibly red or tea-coloured, or detected only on a dipstick or microscope test.',
      whyItMatters: 'Painless blood in the urine can be the only sign of a cancer of the bladder, kidney or urinary tract, so it is always taken seriously even if it settles; it can also come from stones or infection.',
      whatIsDone: 'The urine is tested and cultured, and the workup looks at both the upper tract with a **CT urogram** (imaging the kidneys and ureters) and the lower tract with a **cystoscopy** (a camera inspecting the bladder); the cause is then treated.',
      whatToWatch: 'Painless visible blood always needs urgent assessment; clots that block the flow and cause a painful, full bladder, or heavy bleeding with dizziness, are emergencies.',
    },
  },
  renal_colic: {
    label: 'Renal colic',
    region: 'ureter',
    complaint: 'Sudden, severe, colicky loin-to-groin pain in a patient who cannot lie still and is writhing or pacing, usually with nausea and vomiting; visible or dipstick haematuria is common but its absence does not rule a stone out.',
    redFlags: [
      'Fever or sepsis on top of obstruction — an obstructed, infected kidney is a urological emergency that needs urgent decompression and antibiotics, because pus under pressure kills the kidney and the patient',
      'A single, transplanted or only-functioning kidney, or bilateral obstruction — obstruction here threatens acute renal failure, so the threshold to intervene is far lower',
      'Pregnancy — diagnosis must lean on ultrasound (and MRI if needed) to limit fetal radiation, and management is shared with obstetrics',
    ],
    differential: [
      { caseId: 'ureteral_stone', note: 'Stone at the pelviureteric junction — pain felt mainly in the flank' },
      { caseId: 'ureteral_stone_brim', note: 'Stone at the pelvic brim — mid-ureteric pain that can mimic appendicitis (right) or diverticulitis (left)' },
      { caseId: 'ureteral_stone_uvj', note: 'Stone at the vesicoureteric junction — pain radiating to the groin/testis or labia with dysuria and urgency as it nears the bladder' },
      { caseId: 'staghorn_stone', note: 'A large, branching, often infection-related (struvite) stone filling the collecting system — chronic and at risk of sepsis rather than classic acute colic' },
      { caseId: 'ureteral_stricture', note: 'Recurrent obstruction from a fixed narrowing — colic without a fresh stone, sometimes after prior stone surgery' },
    ],
    workup: [
      'Urinalysis for haematuria (supportive but not diagnostic) and a pregnancy test in any woman of childbearing age — pregnancy changes the imaging choice',
      'FBC/CRP to flag infection and creatinine to assess renal function — fever plus obstruction is the combination that turns a stone into an emergency',
      'Non-contrast CT KUB — the gold standard: it confirms the stone, its size and position (which predict spontaneous passage), and shows obstruction',
      'Ultrasound when radiation should be avoided (pregnancy, young patients) — it shows hydronephrosis and larger stones but misses small ureteric ones, so a negative scan does not exclude a stone',
    ],
    management: '**Give prompt analgesia** — an NSAID is first-line (more effective than opioids for colic) — plus antiemetics, and most small distal stones pass spontaneously, helped by medical expulsive therapy with an α-blocker.\n\n**The non-negotiable is urgent decompression** with a ureteric stent or percutaneous nephrostomy when the kidney is obstructed and infected, or when a solitary/failing kidney is at risk — definitive stone clearance (ureteroscopy or shockwave lithotripsy) is deferred until any sepsis is controlled.',
    pearls: [
      'Obstruction + infection = drain it now; you decompress first and treat the stone later',
      'Stone size and position on CT KUB predict spontaneous passage — small distal stones usually pass',
      'A normal ultrasound does not exclude a ureteric stone; CT KUB is the definitive study when radiation is acceptable',
    ],
    patient: {
      whatItIs: 'A sudden, severe, gripping pain that sweeps from the loin round to the groin — usually a kidney stone passing down the tube (the ureter) toward the bladder, often with nausea and blood in the urine.',
      whyItMatters: 'The pain comes from a stone blocking the drainage of a kidney; if that blocked kidney also becomes infected, or it is a single or already-failing kidney, the situation becomes dangerous quickly.',
      whatIsDone: 'A **CT KUB** scan confirms the stone, its size and position; pain is treated with an **NSAID** (more effective than a strong opioid here) and small stones often pass on their own, helped by an **alpha-blocker**. A blocked, infected kidney is drained urgently with a **stent** or **nephrostomy**, and larger stones are cleared later by **ureteroscopy** or **shockwave lithotripsy (ESWL)**.',
      whatToWatch: 'Fever or feeling very unwell alongside the pain means a blocked kidney may be infected — a urological emergency needing immediate drainage.',
    },
  },
  acute_scrotum: {
    label: 'Acute scrotum',
    region: 'testis',
    complaint: 'Sudden testicular pain, often with swelling and nausea, classically waking the patient or starting abruptly. Behind every acute scrotum sits one question that drives the whole assessment: is this testicular torsion?',
    redFlags: [
      'Torsion is time-critical — the testis is salvageable within roughly 6 hours, after which viability falls steeply, so delay directly costs the testicle',
      'Do not let imaging delay surgery when torsion is clinically likely — a normal-looking or equivocal Doppler must never override a convincing history and exam',
    ],
    differential: [
      { caseId: 'testicular_torsion', note: 'Sudden severe pain, a high-riding/horizontal testis, absent cremasteric reflex and a negative Prehn’s sign (elevation does not help) — this is the explore-now diagnosis, especially in adolescents' },
      { caseId: 'epididymo_orchitis', note: 'More gradual onset, pain eased by elevation (positive Prehn’s sign), a present cremasteric reflex, and dysuria or urethral discharge — an infective picture, but never assume it until torsion is excluded' },
    ],
    workup: [
      'Clinical assessment first — torsion is a clinical diagnosis, and a high index of suspicion plus rapid surgical referral matters more than any test',
      'Examine the cremasteric reflex, testicular lie and Prehn’s sign — an absent cremasteric reflex and high-riding testis favour torsion, while relief on elevation favours epididymo-orchitis (these signs guide but never definitively exclude torsion)',
      'Urinalysis ± STI testing — pyuria or a positive STI screen supports epididymo-orchitis, whereas a bland urine fits torsion',
      'Colour Doppler ultrasound only if it will not delay theatre — reduced/absent intratesticular flow supports torsion, but a normal scan cannot rule it out and must not stay the surgeon’s hand',
    ],
    management: '**If torsion is suspected, proceed to emergency scrotal exploration** — there is no time for prolonged investigation — with detorsion and bilateral orchidopexy (fixing both sides, since the predisposing anatomy is usually bilateral); manual detorsion can buy time but is not a substitute for surgery.\n\n**If the picture is clearly epididymo-orchitis,** treat with appropriate antibiotics, analgesia and scrotal support.\n\n**The governing rule:** when in doubt, treat it as torsion and explore.',
    pearls: [
      'Torsion is a clinical diagnosis with a ~6-hour window — a normal Doppler never excludes it',
      'Absent cremasteric reflex + high-riding testis + negative Prehn = explore now; fix both testes',
      'When you cannot confidently exclude torsion, operate — a negative exploration beats a lost testis',
    ],
    patient: {
      whatItIs: 'Sudden pain (often with swelling) in a testicle, sometimes with nausea, that can begin abruptly or wake someone from sleep.',
      whyItMatters: 'The pressing question is whether the testicle has twisted on its cord — **testicular torsion** — which cuts off its blood supply; it is salvageable only within roughly 6 hours, after which the testicle can be lost. The main alternative is an infection (**epididymo-orchitis**).',
      whatIsDone: 'This is mainly a clinical diagnosis: when torsion is suspected the treatment is emergency surgery (**scrotal exploration**) to untwist and stitch both testicles in place, and imaging must not delay it. If it is clearly infection, an **antibiotic**, pain relief and scrotal support are used.',
      whatToWatch: 'Any sudden, severe testicular pain is time-critical and needs to be assessed immediately — when in doubt it is treated as torsion.',
    },
  },
  luts: {
    label: 'LUTS (lower urinary tract symptoms)',
    region: 'urethra',
    complaint: 'A chronic, bothersome mix of voiding symptoms (weak/hesitant stream, straining, terminal dribble, sense of incomplete emptying) and/or storage symptoms (frequency, urgency, nocturia). The first analytic move is to sort which pattern dominates, because it points to a different mechanism and treatment.',
    redFlags: [
      'Haematuria — visible or non-visible — must trigger a cancer workup rather than being lumped in with “prostate symptoms”',
      'Recurrent UTIs or bladder stones — suggest incomplete emptying with stasis, a high residual that needs assessing',
      'A high post-void residual with renal impairment — chronic retention threatening the kidneys, which changes urgency and management',
      'Any neurological symptoms (leg weakness, sensory change, bowel involvement) — point to a neurogenic bladder or cord pathology rather than simple BPH',
    ],
    differential: [
      { caseId: 'bph', note: 'Voiding-predominant symptoms in an older man from benign prostatic outlet obstruction — the commonest cause' },
      { caseId: 'detrusor_overactivity', note: 'Storage-predominant urgency, frequency and urge incontinence from an overactive detrusor — the bladder, not the outlet' },
      { caseId: 'urethral_stricture', note: 'A weak stream from a fixed urethral narrowing, suggested by prior instrumentation, infection or trauma' },
      { caseId: 'prostate_carcinoma', note: 'Usually asymptomatic early, but exclude with DRE and PSA — LUTS may coexist and must not mask a cancer' },
      { caseId: 'neurogenic_umn', note: 'Consider with known neurological disease (cord lesion, MS) — an upper-motor-neuron pattern of bladder dysfunction' },
    ],
    workup: [
      'Symptom score (e.g. IPSS) plus a frequency-volume (bladder) chart — these quantify bother and reveal the storage-versus-voiding balance and nocturnal polyuria objectively',
      'Urinalysis to exclude infection, haematuria and glycosuria; PSA after counselling and creatinine where appropriate — to triage cancer risk and renal effect',
      'Bladder scan for post-void residual — a high residual signals incomplete emptying and risk of complications, and steers therapy away from drugs that worsen retention',
      'Uroflowmetry to characterise the stream, and formal urodynamics when the picture is unclear or before surgery — to confirm obstruction versus an underactive or overactive bladder',
    ],
    management: '**Treat to the dominant pattern.**\n\n**Voiding / BPH-type symptoms** respond first to lifestyle measures and an α-blocker (rapid relief) with a 5α-reductase inhibitor added for larger prostates, escalating to surgery (e.g. TURP) when medical therapy fails or complications arise.\n\n**Storage / overactive-bladder symptoms** respond to bladder training and fluid advice plus an antimuscarinic or β3-agonist.\n\nThroughout, treat reversible contributors (constipation, polyuria, drugs) and refer promptly if any red flag appears.',
    pearls: [
      'Split LUTS into storage vs voiding first — it dictates the drug class',
      'Check the post-void residual before treating: antimuscarinics can precipitate retention in a poorly emptying bladder',
      'LUTS plus haematuria is never “just the prostate” — it earns a haematuria workup',
    ],
    patient: {
      whatItIs: 'A bothersome, long-term mix of urinary symptoms — a weak or hesitant stream, straining and a sense of incomplete emptying (voiding symptoms), and/or frequency, urgency and waking at night to pass urine (storage symptoms).',
      whyItMatters: 'Sorting which pattern dominates points to the cause: voiding symptoms often come from an enlarged prostate blocking the outlet, while storage symptoms often come from an overactive bladder — and each is treated differently.',
      whatIsDone: 'A symptom score, a bladder diary, a urine test, a **bladder scan** for leftover urine and sometimes flow tests sort it out. Voiding/prostate symptoms respond to an **alpha-blocker** (such as **tamsulosin**), with a **5-alpha-reductase inhibitor** for larger prostates and surgery (**TURP**) if needed; storage symptoms respond to bladder training plus an **antimuscarinic** or **beta-3 agonist**.',
      whatToWatch: 'Blood in the urine is never just a prostate symptom and needs its own cancer workup; recurrent infections, or new leg weakness or numbness, also need prompt review.',
    },
  },

  // ---- Outpatient / findings ----
  chronic_pelvic_pain: {
    label: 'Chronic pelvic pain', group: 'outpatient', region: 'bladder',
    complaint: 'Persistent or recurrent pelvic pain for at least 3–6 months, often non-cyclical and out of proportion to anything found on examination or imaging. The defining difficulty is that in many patients there is no single culprit lesion: the pain is multifactorial and maintained by central sensitisation (the nervous system turning the volume up), overlapping with IC/BPS, IBS, endometriosis in women, and chronic pelvic pain syndrome (CPPS) in men. The task is to exclude the treatable causes, then manage the syndrome itself.',
    redFlags: [
      'Visible haematuria, weight loss, or a pelvic mass — exclude malignancy before settling on a pain-syndrome label',
      'Postcoital or postmenopausal bleeding, or new-onset pain after the menopause — points to gynaecological pathology needing its own workup',
      'Fever or systemic upset — an infective/inflammatory cause (PID, prostatitis) rather than a chronic pain syndrome',
      'New neurological symptoms or saddle anaesthesia — exclude cord/cauda equina compression',
      'Strictly cyclical, menstruation-locked pain — think endometriosis/adenomyosis and refer to gynaecology',
    ],
    differential: [
      { caseId: 'interstitial_cystitis', note: 'Bladder-centred pain that builds with filling and eases on voiding, with sterile urine — the urological core of chronic pelvic pain' },
      { caseId: 'cpps', note: 'In men, chronic prostatitis / CPPS — pelvic pain and LUTS for ≥3 months with little systemic upset; mostly non-bacterial' },
      { caseId: 'detrusor_overactivity', note: 'Storage symptoms (urgency/frequency) that coexist with and amplify the pain picture' },
      { caseId: 'cystitis', note: 'Recurrent or treated infection must be excluded first — sterile urine is what reroutes you toward a pain syndrome' },
    ],
    workup: [
      'Urinalysis and culture to exclude infection, plus STI testing where relevant — a treatable infective cause must be ruled out before labelling the pain as a syndrome',
      'Targeted examination including the pelvic floor — a hypertonic, tender floor with trigger points is both common and directly treatable, and is easily missed if not specifically sought',
      'Pelvic ultrasound (and MRI if indicated) to exclude a structural or gynaecological cause such as a mass, endometriosis or adenomyosis',
      'Cystoscopy when the pain is bladder-centred (to assess for IC/BPS and exclude tumour/stone); in men, a symptom index (NIH-CPSI) and UPOINT phenotyping to direct treatment',
      'Screen for the comorbid drivers — mood, sleep, IBS, fibromyalgia, and a history of physical or sexual trauma — because they shape both prognosis and management',
    ],
    management: 'Once red flags and treatable causes are excluded, manage it as a multimodal, biopsychosocial problem rather than chasing one cure.\n\n**Pelvic-floor physiotherapy is a cornerstone** — manual release and downtraining of the hypertonic floor, NOT strengthening/Kegels, which worsen the pain.\n\n**Layer on neuromodulating analgesia** (amitriptyline, gabapentin/pregabalin, or duloxetine) rather than escalating opioids, which do not help and harm; treat comorbid mood and sleep with CBT and, where indicated, an SSRI/SNRI.\n\nTrigger-point injections, mindfulness, and α-blockers (in male CPPS) are useful adjuncts.\n\n**The unifying principle is phenotype-directed care (UPOINT)** and an interprofessional team — physiotherapist, pain specialist, psychologist — because no single agent treats a centrally sensitised, multifactorial pain.',
    pearls: [
      'It is largely a diagnosis of exclusion plus central sensitisation — rule out infection, malignancy and gynae causes first',
      'Pelvic-floor physiotherapy (relaxation/downtraining) is first-line non-drug therapy — Kegels make it worse',
      'Opioids do not work for chronic pelvic pain; use neuromodulators (amitriptyline, gabapentinoids, duloxetine) and treat comorbid mood',
      'Phenotype-directed, interprofessional care (UPOINT) beats one-size-fits-all',
    ],
    patient: {
      whatItIs: 'Persistent or recurrent pelvic pain lasting at least 3 to 6 months, often with no single lesion to blame — the nervous system amplifies the pain (central sensitisation), overlapping with bladder pain syndrome, irritable bowel and, in men, chronic pelvic pain syndrome (CPPS).',
      whyItMatters: 'Because there is often no single curable cause, the aim is to rule out the treatable causes (infection, cancer, gynaecological disease) and then manage the pain syndrome itself rather than chase one cure.',
      whatIsDone: 'Urine tests, a pelvic-floor examination and a **pelvic ultrasound** (or **MRI**) exclude other causes, and **cystoscopy** is used for bladder-centred pain. Treatment is multimodal: **pelvic-floor physiotherapy** (relaxation, not Kegels) is a cornerstone, with nerve-calming medicines (**amitriptyline**, a **gabapentinoid**, or **duloxetine**) rather than opioids, plus attention to mood and sleep.',
      whatToWatch: 'Blood in the urine, weight loss, a lump, fever, bleeding after sex or after the menopause, or new numbness or leg weakness all need urgent assessment before settling on a pain-syndrome label.',
    },
  },
  microscopic_hematuria: {
    label: 'Asymptomatic microscopic haematuria', group: 'outpatient', region: 'bladder',
    complaint: 'No symptoms — blood found only on microscopy (≥3 RBC/hpf on a properly collected specimen). Dipstick alone is not enough (it also flags myoglobin/haemoglobin), so confirm on microscopy. The task is to risk-stratify, not reflexively scope everyone.',
    redFlags: [
      'Any VISIBLE (gross) haematuria — a different, higher-risk pathway that always gets the full workup',
      'Dysmorphic RBCs, RBC casts or proteinuria → a glomerular/medical cause — refer nephrology, not urology',
      'Urothelial-cancer risk factors: older age, smoking, male sex, occupational carcinogens',
    ],
    differential: [
      { caseId: 'urothelial_carcinoma', note: 'the cancer to exclude in higher-risk patients' },
      { caseId: 'renal_mass', note: 'an upper-tract source' },
      { caseId: 'ureteral_stone', note: 'stones bleed microscopically' },
      { caseId: 'cystitis', note: 'infection — exclude and re-test once treated' },
      { caseId: 'glomerular_hematuria', note: 'a medical/nephrological cause (dysmorphic RBCs/casts)' },
      { caseId: 'bph', note: 'benign prostatic bleeding in older men' },
    ],
    workup: [
      'Confirm true haematuria on microscopy and exclude a benign transient cause (infection, menstruation, recent vigorous exercise, instrumentation) — repeat the test',
      'Check for glomerular features (dysmorphic RBCs, casts, proteinuria, raised creatinine); if present this is a nephrology workup, not cystoscopy',
      'Risk-stratify (AUA): LOW (young never-smoker, low RBC count) → shared decision / repeat urinalysis; INTERMEDIATE → cystoscopy + renal ultrasound; HIGH (older, smoker, high RBC count, risk factors) → cystoscopy + CT urogram',
      'Cystoscopy images the bladder; CT urogram or ultrasound images the upper tracts',
    ],
    management: 'Match the depth of workup to the risk: do not dismiss microhaematuria (cancers hide here), but do not over-investigate a low-risk young never-smoker either. Treat any cause found; if the workup is negative, follow up with a repeat urinalysis rather than immediately re-imaging. Send glomerular pictures to nephrology and higher-risk urological pictures to urology.',
    pearls: [
      'Confirm on MICROSCOPY (≥3 RBC/hpf) — dipstick alone over-calls (myo/haemoglobin)',
      'Dysmorphic RBCs / casts / proteinuria = glomerular → nephrology, not cystoscopy',
      'Risk-stratify (AUA low/intermediate/high): high-risk older smoker → cystoscopy + CT urogram',
      'Any VISIBLE haematuria skips straight to the full workup',
    ],
    patient: {
      whatItIs: 'Blood in the urine that cannot be seen and is found only under the microscope (at least 3 red cells per high-power field on a properly collected sample); a dipstick alone is not enough to confirm it.',
      whyItMatters: 'It can be harmless, but it can also be an early clue to a urinary cancer or a kidney (medical) problem, so the amount of investigation is matched to a person\'s risk rather than scoping everyone.',
      whatIsDone: 'The finding is confirmed on microscopy and benign causes (infection, periods, vigorous exercise) are excluded, then the risk is graded. Higher-risk people (older, smokers) have a **cystoscopy** plus a **CT urogram**, while a kidney pattern (abnormal red cells, casts, protein) is sent to a kidney specialist (**nephrology**) instead.',
      whatToWatch: 'Any visible (red) blood in the urine skips the risk-grading and goes straight to the full, urgent workup.',
    },
  },
  recurrent_uti: {
    label: 'Recurrent UTI', group: 'outpatient', region: 'bladder',
    complaint: '≥2 UTIs in 6 months or ≥3 in a year, each ideally culture-confirmed. Usually reinfection in otherwise-healthy women; in a man, a child, or with atypical organisms it is a red flag demanding a structural/functional explanation.',
    redFlags: [
      'Recurrent UTI in a MAN — uncommon without an underlying cause (prostate, stone, residual, stricture); always investigate',
      'Atypical or urease-producing organisms (Proteus) → suspect a stone',
      'Obstruction, high post-void residual, or recurrent pyelonephritis → image and protect the kidneys',
      'Persistent haematuria between infections → exclude malignancy',
    ],
    differential: [
      { caseId: 'cystitis', note: 'the usual recurrent lower-tract infection (reinfection)' },
      { caseId: 'pyelonephritis', note: 'recurrent upper-tract infection — more serious' },
      { caseId: 'bladder_stone', note: 'a chronic infected nidus' },
      { caseId: 'bph', note: 'incomplete emptying / residual urine in older men' },
      { caseId: 'neurogenic_lmn', note: 'poor emptying from a neurogenic bladder' },
    ],
    workup: [
      'Document the recurrences with cultures — distinguishes reinfection from relapse and unmasks resistance',
      'Post-void residual (bladder scan) — incomplete emptying drives recurrence',
      'Imaging (renal/bladder ultrasound ± CT) and cystoscopy for men, atypical organisms, or suspected stones/obstruction — hunting the enabling lesion',
      'In post-menopausal women, assess for atrophic vaginitis',
    ],
    management: 'Reduce risk first: hydration, voiding habits, and topical vaginal oestrogen in post-menopausal women. Try non-antibiotic prophylaxis (methenamine hippurate, ± cranberry) before antibiotics; then targeted options — post-coital or low-dose continuous prophylaxis, or patient-initiated self-start therapy. Crucially, treat the ENABLING cause (stone, residual, prostate) — antibiotics clear each episode but do not fix the reason.',
    pearls: [
      '≥2 in 6 months or ≥3 in a year, culture-confirmed',
      'Recurrent UTI in a man = investigate for an underlying cause',
      'Treat the enabling lesion (stone/residual/prostate), not just each episode',
      'Prevention ladder: behavioural + vaginal oestrogen → methenamine → antibiotic prophylaxis',
    ],
    patient: {
      whatItIs: 'Repeated urinary infections — at least two in six months or three in a year, ideally each confirmed by a urine culture.',
      whyItMatters: 'In otherwise-healthy women this is usually just reinfection, but in a man, a child, or with unusual bacteria it is a warning that there may be an underlying problem (a stone, an enlarged prostate, a narrowing, or a bladder that does not empty).',
      whatIsDone: 'Recurrences are documented with cultures, a **bladder scan** checks emptying, and imaging (**ultrasound**, sometimes **CT**) or **cystoscopy** hunts for an underlying lesion in higher-risk people. Prevention works up a ladder: fluids and voiding habits, topical vaginal **oestrogen** after the menopause, **methenamine hippurate**, and only then an **antibiotic** for prevention — while treating any underlying cause found.',
      whatToWatch: 'Recurrent infections in a man always need investigation; so do unusual bacteria (which can point to a stone), or blood in the urine that persists between infections.',
    },
  },
  stone_prevention: {
    label: 'Kidney-stone prevention', group: 'outpatient', region: 'kidney',
    complaint: 'The recurrent stone-former (lifetime recurrence is high) — the goal shifts from treating the acute stone to preventing the next one. A metabolic evaluation is worthwhile for recurrent stones, a single stone in a high-risk patient, or any non-calcium stone.',
    redFlags: [
      'Recurrent or bilateral stones, or a stone in a solitary kidney — low threshold for full metabolic workup',
      'Struvite (infection) stones — must clear stone AND infection or they regrow',
      'Uric-acid or cystine stones, or a strong family history — point to specific metabolic causes',
    ],
    differential: [
      { caseId: 'ureteral_stone', note: 'the calcium stones that recur' },
      { caseId: 'staghorn_stone', note: 'struvite / infection stones' },
      { caseId: 'bladder_stone', note: 'often secondary to stasis/obstruction' },
    ],
    workup: [
      'Analyse a passed stone — composition is the single most useful result. Types: calcium oxalate (~70–80%, commonest), calcium phosphate, uric acid, struvite (infection), and cystine (genetic) — each has different prevention',
      '24-hour urine collection (volume, calcium, oxalate, citrate, uric acid, sodium, pH) — the cornerstone metabolic workup; it tells you WHICH abnormality to target',
      'Serum calcium and PTH (exclude primary hyperparathyroidism), urate, and electrolytes/bicarbonate — a persistently alkaline urine with calcium-phosphate stones suggests renal tubular acidosis',
      'Imaging to define stone burden and any anatomical contributor',
    ],
    management: 'Universal advice for every stone-former: high fluids (urine output >2–2.5 L/day), reduce sodium and animal protein, and keep dietary calcium normal — restricting calcium paradoxically raises oxalate absorption and stones. Then target by stone type and the 24-h abnormality.\n\n**Calcium oxalate / phosphate** — a thiazide for hypercalciuria (it boosts distal tubular calcium reabsorption, lowering urinary calcium); potassium citrate for hypocitraturia (citrate binds calcium and inhibits crystallisation, and alkalinises the urine); cut dietary oxalate for hyperoxaluria.\n\n**Uric acid** (forms in acidic urine) — urinary alkalinisation with potassium citrate is first-line and can even dissolve the stone, plus allopurinol (xanthine-oxidase inhibitor) if uric acid is high.\n\n**Struvite** — no medical prevention without source control: achieve complete stone clearance and eradicate the urease-producing infection.\n\n**Cystine** — high fluids, urinary alkalinisation, low sodium, and thiol binders (tiopronin/penicillamine) if refractory.\n\nAvoid acetazolamide (it promotes calcium-phosphate stones).',
    pearls: [
      'Fluids first — urine output >2–2.5 L/day prevents most recurrences',
      'Keep dietary calcium NORMAL — restricting it increases oxalate and stones',
      'Type drives therapy: oxalate/phosphate → thiazide + citrate; uric acid → alkalinise ± allopurinol; struvite → clear stone + treat infection; cystine → alkalinise + thiol binder',
      'Drug logic: thiazide ↓ urinary calcium · K-citrate ↑ citrate + alkalinises · allopurinol ↓ uric acid',
      'Uric-acid stones form in ACID urine and can be dissolved by alkalinisation',
    ],
    patient: {
      whatItIs: 'An approach for people who keep forming kidney stones — shifting the goal from treating the current stone to preventing the next one, since recurrence over a lifetime is common.',
      whyItMatters: 'Stones recur often, and knowing the stone type (most are calcium oxalate; others are calcium phosphate, uric acid, struvite/infection, or cystine) shows which prevention will actually work.',
      whatIsDone: 'A passed stone is analysed and a **24-hour urine collection** plus blood tests pinpoint the abnormality to target. For everyone: plenty of fluid, less salt and animal protein, and a normal amount of dietary calcium (cutting calcium paradoxically worsens stones). Then by type — a **thiazide** diuretic and **potassium citrate** for calcium stones, alkalinising the urine with **potassium citrate** plus **allopurinol** for uric-acid stones, and fully clearing the stone and the infection for struvite stones.',
      whatToWatch: 'Infection (struvite) stones must be cleared completely along with the infection or they regrow; recurrent, bilateral, or solitary-kidney stones warrant a full metabolic workup.',
    },
  },
  elevated_psa: {
    label: 'Elevated PSA', group: 'outpatient', region: 'urethra',
    complaint: 'A raised PSA on testing — not a cancer diagnosis. PSA is prostate-specific, not cancer-specific, so the job is to interpret it in context before any reflex biopsy.',
    redFlags: [
      'A hard nodule or asymmetry on DRE → refer regardless of the PSA value',
      'Very high PSA or new bone pain → suspect advanced/metastatic disease',
      'Rapidly rising PSA (velocity) across serial tests',
    ],
    differential: [
      { caseId: 'bph', note: 'benign enlargement raises PSA in proportion to volume' },
      { caseId: 'prostate_carcinoma', note: 'the diagnosis to risk-stratify for' },
      { caseId: 'prostatitis', note: 'inflammation can markedly (and transiently) raise PSA' },
    ],
    workup: [
      'Repeat the PSA after a few weeks before acting — transient raisers include recent ejaculation, vigorous cycling/exercise, catheterisation, UTI/prostatitis, and a DRE done just before the draw',
      'Examine the prostate (DRE) and treat any infection, then re-check',
      'If persistently elevated or DRE abnormal → multiparametric MRI of the prostate to localise and target',
      'MRI-targeted (± systematic) biopsy for suspicious lesions; risk-stratify with PSA density, MRI score and biopsy grade',
    ],
    management: 'Confirm and contextualise before biopsy: repeat the PSA, treat reversible causes, and counsel on the harms and benefits of biopsy. MRI-first pathways cut unnecessary biopsies. A confirmed concerning result goes to urology for biopsy and risk-stratification — and many low-risk cancers are then managed by active surveillance (see Prostate cancer).',
    pearls: [
      'PSA is prostate-specific, not cancer-specific — repeat before acting',
      'Transient raisers: ejaculation, cycling, UTI/prostatitis, catheter, recent DRE',
      'MRI-first reduces unnecessary biopsies; an abnormal DRE → refer regardless of PSA',
    ],
    patient: {
      whatItIs: 'A raised level of PSA, a protein made by the prostate, found on a blood test — this is not by itself a cancer diagnosis.',
      whyItMatters: 'PSA rises with prostate cancer but also with benign enlargement, infection, and even recent ejaculation or cycling, so it has to be interpreted in context before any reflex biopsy.',
      whatIsDone: 'The PSA is repeated after a few weeks, the prostate is examined (a **DRE**), and any infection is treated and the test rechecked. If it stays high or the examination is abnormal, a prostate **MRI** is done, with an MRI-targeted **biopsy** for suspicious areas; many low-risk cancers are then watched with **active surveillance**.',
      whatToWatch: 'A hard lump on prostate examination, a very high PSA, or new bone pain prompt referral regardless of the exact number.',
    },
  },
  asymptomatic_bacteriuria: {
    label: 'Asymptomatic bacteriuria', group: 'outpatient', region: 'bladder',
    complaint: 'A positive urine culture WITHOUT urinary symptoms — often found incidentally, especially in older adults and people with catheters. The high-yield point is restraint: in most people it should NOT be treated.',
    redFlags: [
      'Don’t treat cloudy/smelly urine or a positive culture alone as a “UTI” when there are no urinary symptoms',
      'Genuine new urinary symptoms or systemic sepsis → that IS a UTI, treat it',
      'Pregnancy or planned urological instrumentation → the exceptions that MUST be treated',
    ],
    differential: [
      { caseId: 'cystitis', note: 'symptomatic infection — the thing this is NOT' },
      { caseId: 'pyelonephritis', note: 'what symptomatic infection can become — but asymptomatic bacteriuria rarely progresses' },
    ],
    workup: [
      'Confirm there are genuinely no attributable urinary symptoms — in older/confused patients, look hard for another cause of any change before blaming the urine',
      'Do not send or act on a urine culture in an asymptomatic patient unless a treat-it indication applies — this avoids overdiagnosis and antibiotic harm',
    ],
    management: 'Treat ONLY in two situations: pregnancy (screen and treat — reduces pyelonephritis and preterm birth) and before urological procedures that breach the mucosa. Otherwise — including older adults, diabetics, catheterised patients, and before non-urological surgery — do NOT treat: antibiotics cause harm (resistance, C. difficile, side-effects) without benefit. For catheter-associated bacteriuria without symptoms, address the catheter, not the culture.',
    pearls: [
      'Treat asymptomatic bacteriuria ONLY in pregnancy or before urological instrumentation',
      'Do not treat in older/catheterised/diabetic patients — antibiotics harm without benefit',
      '“Cloudy/smelly urine” is not an indication; look for a non-urinary cause of confusion',
    ],
    patient: {
      whatItIs: 'Bacteria found in a urine sample in someone who has NO urinary symptoms — often picked up by chance, especially in older adults and people with a catheter.',
      whyItMatters: 'This is usually not an infection that needs treating; treating it with antibiotics causes harm (resistance, side-effects) without benefit, so restraint is the key point.',
      whatIsDone: 'The main step is to confirm there really are no urinary symptoms and to avoid sending or acting on a culture without a reason. An **antibiotic** is given in only two situations: pregnancy, and before a urological procedure that breaks the lining.',
      whatToWatch: 'Genuine new urinary symptoms or signs of sepsis mean a real infection that should be treated; cloudy or smelly urine on its own is not a reason for antibiotics.',
    },
  },
};

export function presentationFor(id) { return PRESENTATIONS[id] || null; }
