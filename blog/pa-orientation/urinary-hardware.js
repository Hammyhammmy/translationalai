// Hardware (Hardware tab): the tubes, stents, stomas and implants that drain, divert
// or restore the urinary tract. Each device is placed at a station on the tract, so it
// fits the site's geometry — what it bypasses or drains. Clinician fields + a patient
// "In plain words" block. DRAFT — pending clinician review. Not medical advice.
// `stations` map to tract nodes for the figure overlay; 'external' = exits the body.

export const HW_GROUPS = [
  { key: 'drainage-upper', label: 'Drainage · upper tract' },
  { key: 'drainage-lower', label: 'Drainage · lower tract' },
  { key: 'diversion', label: 'Diversion · stoma & neobladder' },
  { key: 'continence', label: 'Continence & andrology' },
];

export const HARDWARE = {
  ureteric_stent: {
    id: 'ureteric_stent', label: 'Ureteric (JJ) stent', group: 'drainage-upper',
    img: 'web_freeimages/hardware__ureteric_stent.jpg',
    stations: ['kidney', 'ureter', 'bladder'],
    whatItSits: 'A soft, hollow polymer tube running the length of the ureter, with a curl ("J") that coils in the renal pelvis and another in the bladder to anchor it. Entirely internal — nothing crosses the skin.',
    whyPlaced: 'To keep urine draining past a ureteric obstruction (an impacted stone, a stricture, extrinsic tumour compression) and to protect or splint a repair/anastomosis after ureteric or stone surgery.',
    howWorks: 'Urine drains both through the lumen and alongside the stent, bypassing the blockage from the inside; the coils stop it migrating up or down. It also passively dilates the ureter, which is why a stent is often placed before ureteroscopy.',
    complications: [
      'Stent symptoms — frequency, urgency and suprapubic/flank pain on voiding (urine refluxes up the stent)',
      'Encrustation and blockage if left beyond its lifespan; infection',
      'Migration up or down; rarely the "forgotten stent" — left in too long, it encrusts into a major problem, so every stent must be tracked to removal/exchange',
    ],
    pearls: ['Internal — no external bag', 'Stent symptoms are expected; warn the patient', 'Track it: a forgotten stent encrusts and obstructs', 'Decompresses but does not treat the cause'],
    patient: {
      whatItIs: 'A thin, soft internal tube — a **ureteric (JJ) stent** — that holds open the drainage tube (the **ureter**) between a kidney and the bladder. It sits entirely inside; there is no bag.',
      whyItMatters: 'It keeps urine flowing past a blockage such as a **stone**, relieving pain and protecting the kidney while the cause is sorted out.',
      whatIsDone: 'It is placed and later removed or exchanged with a short camera procedure (**cystoscopy**); it is a temporary bridge, not a cure.',
      whatToWatch: 'Some urgency, a need to pass urine more often, and a little blood are common and expected. Fever, severe pain, or being unable to pass urine need urgent review — and the stent must be removed or swapped on time so it does not encrust.',
    },
  },
  nephrostomy_tube: {
    id: 'nephrostomy_tube', label: 'Nephrostomy tube', group: 'drainage-upper',
    img: 'web_freeimages/hardware__nephrostomy_tube.jpg',
    stations: ['kidney', 'external'],
    whatItSits: 'A tube placed through the flank skin directly into the kidney\'s collecting system (pelvicalyceal system), draining urine to an external bag.',
    whyPlaced: 'Emergency decompression of an obstructed, infected kidney (pyonephrosis), or relief of obstruction when a ureteric stent cannot be passed retrograde from below; also access for some stone procedures (PCNL).',
    howWorks: 'It diverts urine from above the obstruction straight out of the body, so the kidney is protected even when the ureter is impassable — antibiotics cannot sterilise pus trapped behind a blockage, so the block must be drained.',
    complications: [
      'Dislodgement / falling out — urgent, as the track closes within hours',
      'Blockage, kinking, or leakage around the entry site',
      'Bleeding at insertion; entry-site infection',
    ],
    pearls: ['Diverts ABOVE the block, out the back', 'The first move for an obstructed, infected kidney', 'If it falls out the track closes fast — replace promptly'],
    patient: {
      whatItIs: 'A tube placed through the back directly into the kidney — a **nephrostomy** — that drains urine into an external bag.',
      whyItMatters: 'It is used when urine cannot get out the normal way, often to relieve a blocked, infected kidney quickly.',
      whatIsDone: 'It is inserted through the skin under imaging guidance and connected to a drainage bag, which is emptied regularly.',
      whatToWatch: 'If it falls out, stops draining, leaks a lot, or there is fever, seek help promptly — the channel can close within hours.',
    },
  },
  foley_catheter: {
    id: 'foley_catheter', label: 'Urethral (Foley) catheter', group: 'drainage-lower',
    img: 'web_freeimages/hardware__foley_catheter.svg',
    stations: ['urethra', 'bladder'],
    whatItSits: 'A tube passed up the urethra into the bladder, held in place by a water-filled balloon at its tip; urine drains to a bag.',
    whyPlaced: 'Acute urinary retention, accurate urine-output monitoring in the unwell, peri-operative drainage, or to bypass an outlet that cannot empty.',
    howWorks: 'The balloon (inflated once the tip is in the bladder) anchors it at the bladder neck so it cannot fall out; gravity drains the bladder continuously.',
    complications: [
      'Catheter-associated UTI — risk rises with every day in situ',
      'Blockage by debris/clot; bypassing (leakage around it) from bladder spasm',
      'Urethral trauma — never inflate the balloon against resistance (false passage); balloon-in-urethra injury',
      'Long-term: stricture, stones, and (rarely) squamous change',
    ],
    pearls: ['Balloon anchors it — never inflate against resistance', 'Every catheter-day adds infection risk: review the need daily', 'No urine + suspected blockage in a catheterised patient → flush/replace'],
    patient: {
      whatItIs: 'A soft tube passed along the natural water pipe (the **urethra**) into the bladder — a **catheter** — held by a small balloon and draining into a bag.',
      whyItMatters: 'It drains the bladder when a person cannot pass urine or needs the output measured.',
      whatIsDone: 'It is passed at the bedside and the balloon is inflated to hold it; the bag is emptied regularly and the catheter changed periodically.',
      whatToWatch: 'Leakage around it, no drainage with a full feeling, or fever and cloudy, smelly urine need review. It should stay only as long as it is needed.',
    },
  },
  suprapubic_catheter: {
    id: 'suprapubic_catheter', label: 'Suprapubic catheter', group: 'drainage-lower',
    img: 'web_freeimages/hardware__suprapubic_catheter.png',
    stations: ['bladder', 'external'],
    whatItSits: 'A catheter entering the bladder directly through the lower-abdominal wall, a few centimetres above the pubic bone, rather than via the urethra.',
    whyPlaced: 'When the urethral route is impassable or undesirable — an impassable stricture, urethral injury, long-term catheter needs, or to spare the urethra.',
    howWorks: 'It drains the bladder through an abdominal track, leaving the urethra free; long-term it is more comfortable and lowers urethral complications than a long-term Foley.',
    complications: [
      'Bowel injury at insertion (placed under ultrasound/cystoscopic guidance to avoid this)',
      'Track infection, granulation tissue, and leakage',
      'Blockage; dislodgement before the track matures',
    ],
    pearls: ['Bypasses the urethra entirely', 'Preferred for long-term drainage and impassable strictures', 'First change is done once the track has matured'],
    patient: {
      whatItIs: 'A catheter that drains the bladder through a small opening in the lower tummy, above the pubic bone — a **suprapubic catheter** — instead of through the natural water pipe.',
      whyItMatters: 'It is used when the normal route cannot be used or for comfortable long-term drainage, leaving the urethra alone.',
      whatIsDone: 'It is placed through the abdomen under imaging or camera guidance and changed periodically through the established channel.',
      whatToWatch: 'Leakage, no drainage, or redness and discharge at the site need review; it must not be left blocked.',
    },
  },
  three_way_catheter: {
    id: 'three_way_catheter', label: '3-way catheter (irrigation)', group: 'drainage-lower',
    stations: ['urethra', 'bladder'],
    whatItSits: 'A larger urethral catheter with three channels — one to inflate the balloon, one to drain urine, and a third to run fluid into the bladder.',
    whyPlaced: 'Heavy haematuria with clots (clot retention), and after prostate/bladder surgery (e.g. TURP) to keep the bladder clear of clot.',
    howWorks: 'Continuous bladder irrigation (CBI) runs saline in through one channel and out through another, washing out blood before it clots and blocks the bladder; the run rate is titrated to keep the drainage rosé, not red.',
    complications: [
      'Blockage by clot despite irrigation — needs manual washout',
      'Fluid overload / bladder over-distension if outflow is obstructed while inflow runs',
      'Same urethral risks as any catheter, plus discomfort from the larger calibre',
    ],
    pearls: ['Three channels: balloon · drain · irrigate', 'Titrate irrigation to keep outflow rosé', 'Blocked despite running fluid → stop inflow and wash out manually'],
    patient: {
      whatItIs: 'A wider bladder **catheter** with three channels that lets fluid be run through the bladder — used for **continuous bladder irrigation**.',
      whyItMatters: 'It washes out blood and clots so they do not block the bladder, after heavy bleeding or prostate/bladder surgery.',
      whatIsDone: 'Sterile fluid runs in and drains out continuously, adjusted so the drainage stays pale rather than deep red.',
      whatToWatch: 'A painful, full bladder with little drainage means a blockage and needs urgent attention.',
    },
  },
  ileal_conduit: {
    id: 'ileal_conduit', label: 'Ileal conduit (urostomy)', group: 'diversion',
    img: 'web_freeimages/hardware__ileal_conduit.svg',
    stations: ['ureter', 'external'],
    whatItSits: 'A short segment of small bowel (ileum) used as a pipe: the ureters are joined to one end and the other is brought to the skin as a stoma, worn with an external bag (urostomy).',
    whyPlaced: 'Urinary diversion after the bladder is removed (radical cystectomy for muscle-invasive bladder cancer), or for an unusable/unsafe bladder.',
    howWorks: 'Urine drains continuously from the kidneys, through the ureters, into the conduit and out of the stoma into the appliance — it is a conduit, not a reservoir, so it does not store urine.',
    complications: [
      'Stomal problems — retraction, stenosis, parastomal hernia, skin irritation',
      'Recurrent infection and ureteric-anastomosis stricture',
      'Metabolic and renal change over years (the bowel segment absorbs urine); appliance leaks',
    ],
    pearls: ['A pipe, not a bag inside — it does not store urine', 'Standard diversion after cystectomy', 'Stoma care and skin protection are central'],
    patient: {
      whatItIs: 'A new route for urine made from a short piece of bowel — an **ileal conduit** — opening onto the tummy as a **stoma** worn with a bag (a **urostomy**), made after the bladder is removed.',
      whyItMatters: 'It lets urine leave the body continuously when there is no bladder; it does not store urine, so the bag fills steadily.',
      whatIsDone: 'A stoma nurse fits and teaches care of the appliance; the bag is emptied through the day and changed regularly.',
      whatToWatch: 'A stoma that turns dark, a sudden drop in urine, fever, or persistent leaks and sore skin need review.',
    },
  },
  neobladder: {
    id: 'neobladder', label: 'Neobladder', group: 'diversion',
    img: 'web_freeimages/hardware__neobladder.svg',
    stations: ['bladder', 'urethra'],
    whatItSits: 'A new low-pressure reservoir built from a reconfigured segment of bowel and joined to the urethra in the bladder\'s old position (orthotopic), so urine is passed the natural way.',
    whyPlaced: 'A continence-preserving alternative to a conduit after cystectomy, in selected, motivated patients with an intact, cancer-free urethra and good renal/hepatic function.',
    howWorks: 'The reservoir stores urine at low pressure; without a normal bladder\'s sensation and muscle, emptying relies on relaxing the pelvic floor and abdominal straining, and many patients self-catheterise to empty fully.',
    complications: [
      'Incomplete emptying needing intermittent self-catheterisation; incontinence (especially at night)',
      'Mucus in the urine (the bowel lining keeps secreting it); metabolic acidosis',
      'Infection, stones, and anastomotic stricture',
    ],
    pearls: ['Stores urine and uses the urethra — no stoma', 'Needs a motivated patient and a cancer-free urethra', 'Often needs self-catheterisation; night-time leakage is common'],
    patient: {
      whatItIs: 'A replacement bladder built from bowel and connected to the natural water pipe — a **neobladder** — so urine can be passed the usual way after the bladder is removed.',
      whyItMatters: 'It avoids an external bag, but it does not work exactly like a natural bladder, so emptying has to be relearned.',
      whatIsDone: 'Emptying uses relaxation and gentle straining, and many people also pass a catheter themselves a few times a day to empty fully; pelvic-floor training helps control.',
      whatToWatch: 'Being unable to empty, leakage (often worse at night early on), or fever needs review; passing some mucus in the urine is normal.',
    },
  },
  artificial_urinary_sphincter: {
    id: 'artificial_urinary_sphincter', label: 'Artificial urinary sphincter', group: 'continence',
    img: 'web_freeimages/hardware__artificial_urinary_sphincter.jpg',
    stations: ['urethra'],
    whatItSits: 'An implanted hydraulic device: an inflatable cuff around the urethra, a pressure-regulating balloon in the abdomen, and a control pump in the scrotum or labium.',
    whyPlaced: 'Moderate-to-severe stress incontinence from a weak outlet — classically male sphincter weakness after prostatectomy.',
    howWorks: 'The fluid-filled cuff normally squeezes the urethra shut to hold urine; to void, the patient squeezes the pump to move fluid out of the cuff, opening the urethra, and the cuff slowly refills and re-closes on its own.',
    complications: [
      'Mechanical failure of the device over years (may need revision)',
      'Cuff erosion into the urethra and infection (may require removal)',
      'Urethral atrophy under the cuff causing recurrent leakage',
    ],
    pearls: ['"The gold standard for sphincter-weakness incontinence"', 'Patient squeezes the pump to void; cuff re-closes automatically', 'Erosion/infection can mean explant'],
    patient: {
      whatItIs: 'An implanted device — an **artificial urinary sphincter** — with a cuff around the water pipe and a small pump (placed in the scrotum) to control it.',
      whyItMatters: 'It treats leakage caused by a weak outlet valve, often after prostate surgery, by keeping the pipe closed until voiding.',
      whatIsDone: 'The cuff holds urine in; squeezing the pump opens the pipe to pass urine, after which it re-closes by itself.',
      whatToWatch: 'New leakage, pain, swelling, or difficulty passing urine may mean the device needs checking or revision.',
    },
  },
  penile_prosthesis: {
    id: 'penile_prosthesis', label: 'Penile prosthesis', group: 'continence',
    img: 'web_freeimages/hardware__penile_prosthesis.jpg',
    stations: ['urethra'],
    whatItSits: 'Implants placed within the erectile bodies of the penis (the corpora cavernosa) — either a pair of malleable rods or an inflatable system with a scrotal pump and a fluid reservoir.',
    whyPlaced: 'Erectile dysfunction that has not responded to tablets, injections or a vacuum device — the definitive surgical option.',
    howWorks: 'A malleable implant keeps the penis permanently firm enough for sex and is bent down otherwise; an inflatable implant is pumped up from a scrotal pump for an erection and deflated afterwards, giving a more natural result.',
    complications: [
      'Infection (the most feared — usually means removal of the whole device)',
      'Mechanical failure of the inflatable system over years',
      'Erosion, and loss of the option of other ED treatments once the erectile tissue is replaced',
    ],
    pearls: ['For ED refractory to medical therapy', 'Inflatable = more natural; malleable = simpler, always firm', 'Infection usually means explant'],
    patient: {
      whatItIs: 'A device implanted in the penis — a **penile prosthesis (penile implant)** — to produce an erection, in two types: bendable rods or an inflatable pump-up system.',
      whyItMatters: 'It is the option when tablets, injections and a vacuum pump have not worked for **erectile dysfunction**.',
      whatIsDone: 'An inflatable implant is pumped up using a small pump in the scrotum and deflated afterwards; a malleable one is simply positioned by hand.',
      whatToWatch: 'Fever, increasing pain, redness or swelling after surgery can signal infection and needs urgent review.',
    },
  },
  mid_urethral_sling: {
    id: 'mid_urethral_sling', label: 'Mid-urethral sling', group: 'continence',
    stations: ['urethra'],
    whatItSits: 'A narrow strip of synthetic mesh placed under the mid-urethra as a hammock (e.g. retropubic TVT or transobturator TOT route).',
    whyPlaced: 'Stress urinary incontinence (leakage on cough, laugh or exertion) from urethral hypermobility, usually in women, when conservative measures fail.',
    howWorks: 'The tension-free tape supports the mid-urethra so that, at moments of raised abdominal pressure, the urethra is compressed against it and stays closed — restoring continence without obstructing normal voiding.',
    complications: [
      'Mesh exposure/erosion into the vagina or urinary tract, and chronic pain (the reason for heightened scrutiny and regulatory restrictions on mesh)',
      'Voiding difficulty / retention if too tight',
      'New urgency, and infection',
    ],
    pearls: ['Supports the mid-urethra for stress incontinence', 'Mesh complications drove tighter regulation and consent', 'Too tight → voiding difficulty'],
    patient: {
      whatItIs: 'A small strip of supportive tape placed under the water pipe — a **mid-urethral sling** — to treat leakage with coughing, laughing or exercise (**stress incontinence**).',
      whyItMatters: 'It supports the pipe so it stays closed when pressure in the tummy rises, without blocking normal urination.',
      whatIsDone: 'It is placed through a small operation after simpler measures (such as **pelvic-floor exercises**) have been tried.',
      whatToWatch: 'Difficulty passing urine, ongoing pelvic or vaginal pain, or unusual discharge after surgery should be reviewed, as the mesh occasionally causes problems.',
    },
  },
};

export const HW_IDS = Object.keys(HARDWARE);
export function hardwareFor(id) { return HARDWARE[id] || null; }
