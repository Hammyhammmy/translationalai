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
    management: 'Decompress immediately: a urethral catheter usually does it, switching to a suprapubic catheter if urethral access fails (e.g. an impassable stricture). Then treat the underlying cause rather than just leaving the tube in — the catheter is the bridge, not the cure, so plan definitive treatment of the lesion (medical therapy or surgery for BPH, urethroplasty for stricture). Watch high-volume drains for post-obstructive diuresis with fluid and electrolyte monitoring, and refer urgently if cauda equina is suspected.',
    pearls: [
      'Always scan before you blame the prostate — anuria from an empty bladder is a different (kidney) problem from a blocked outlet',
      'Painless retention plus any neurological symptom = exclude cauda equina before anything else',
      'High-pressure chronic retention can cause a brisk post-obstructive diuresis — monitor output, fluids and electrolytes after decompression',
    ],
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
    management: 'Treat the cause once found, and in the acute setting manage clot retention with a three-way catheter, clot evacuation and continuous bladder irrigation while resuscitating any heavy bleeder. Crucially, painless visible haematuria warrants urgent urology referral for the full upper- and lower-tract workup — do not write it off as a UTI without a positive culture that clears on repeat testing, because an unproven UTI is a common reason cancers are missed.',
    pearls: [
      'Painless visible haematuria = cancer until proven otherwise — image the upper tract (CT urogram) and scope the lower tract (cystoscopy)',
      'Never close the loop on “probable UTI” unless the culture is positive and the haematuria clears on a follow-up dip',
      'Dysmorphic red cells, casts and proteinuria point to a glomerular (nephrology) cause, not a urological one',
    ],
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
    management: 'Give prompt analgesia — an NSAID is first-line (more effective than opioids for colic) — plus antiemetics, and most small distal stones pass spontaneously, helped by medical expulsive therapy with an α-blocker. The non-negotiable is urgent decompression with a ureteric stent or percutaneous nephrostomy when the kidney is obstructed and infected, or when a solitary/failing kidney is at risk — definitive stone clearance (ureteroscopy or shockwave lithotripsy) is deferred until any sepsis is controlled.',
    pearls: [
      'Obstruction + infection = drain it now; you decompress first and treat the stone later',
      'Stone size and position on CT KUB predict spontaneous passage — small distal stones usually pass',
      'A normal ultrasound does not exclude a ureteric stone; CT KUB is the definitive study when radiation is acceptable',
    ],
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
    management: 'If torsion is suspected, proceed to emergency scrotal exploration — there is no time for prolonged investigation — with detorsion and bilateral orchidopexy (fixing both sides, since the predisposing anatomy is usually bilateral); manual detorsion can buy time but is not a substitute for surgery. If the picture is clearly epididymo-orchitis, treat with appropriate antibiotics, analgesia and scrotal support. The governing rule: when in doubt, treat it as torsion and explore.',
    pearls: [
      'Torsion is a clinical diagnosis with a ~6-hour window — a normal Doppler never excludes it',
      'Absent cremasteric reflex + high-riding testis + negative Prehn = explore now; fix both testes',
      'When you cannot confidently exclude torsion, operate — a negative exploration beats a lost testis',
    ],
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
    management: 'Treat to the dominant pattern. Voiding/BPH-type symptoms respond first to lifestyle measures and an α-blocker (rapid relief) with a 5α-reductase inhibitor added for larger prostates, escalating to surgery (e.g. TURP) when medical therapy fails or complications arise. Storage/overactive-bladder symptoms respond to bladder training and fluid advice plus an antimuscarinic or β3-agonist. Throughout, treat reversible contributors (constipation, polyuria, drugs) and refer promptly if any red flag appears.',
    pearls: [
      'Split LUTS into storage vs voiding first — it dictates the drug class',
      'Check the post-void residual before treating: antimuscarinics can precipitate retention in a poorly emptying bladder',
      'LUTS plus haematuria is never “just the prostate” — it earns a haematuria workup',
    ],
  },

  // ---- Outpatient / findings ----
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
    management: 'Universal advice for every stone-former: high fluids (urine output >2–2.5 L/day), reduce sodium and animal protein, and keep dietary calcium NORMAL — restricting calcium paradoxically raises oxalate absorption and stones. Then target by stone type and the 24-h abnormality. CALCIUM oxalate/phosphate: a THIAZIDE for hypercalciuria (it boosts distal tubular calcium reabsorption, lowering urinary calcium); POTASSIUM CITRATE for hypocitraturia (citrate binds calcium and inhibits crystallisation, and alkalinises the urine); cut dietary oxalate for hyperoxaluria. URIC ACID (forms in acidic urine): urinary ALKALINISATION with potassium citrate is first-line and can even DISSOLVE the stone, plus ALLOPURINOL (xanthine-oxidase inhibitor) if uric acid is high. STRUVITE: no medical prevention without source control — achieve complete stone clearance and eradicate the urease-producing infection. CYSTINE: high fluids, urinary alkalinisation, low sodium, and thiol binders (tiopronin/penicillamine) if refractory. Avoid acetazolamide (it promotes calcium-phosphate stones).',
    pearls: [
      'Fluids first — urine output >2–2.5 L/day prevents most recurrences',
      'Keep dietary calcium NORMAL — restricting it increases oxalate and stones',
      'Type drives therapy: oxalate/phosphate → thiazide + citrate; uric acid → alkalinise ± allopurinol; struvite → clear stone + treat infection; cystine → alkalinise + thiol binder',
      'Drug logic: thiazide ↓ urinary calcium · K-citrate ↑ citrate + alkalinises · allopurinol ↓ uric acid',
      'Uric-acid stones form in ACID urine and can be dissolved by alkalinisation',
    ],
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
  },
};

export function presentationFor(id) { return PRESENTATIONS[id] || null; }
