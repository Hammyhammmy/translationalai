// Imaging (Imaging tab): how to read urological imaging, two ways —
//  • MODALITIES: the test itself (what it's for, a reading approach, what it shows)
//  • FINDINGS: one sign across modalities (pattern recognition), linking to the condition
// `findings`/`caseId` must be real cases in urinary-model.js (enforced by tests).
// `station` maps to a tract node for the figure marker. Images (web_freeimages) added
// in a later pass. DRAFT — pending clinician review. Not medical advice.

export const MOD_GROUPS = [
  { key: 'plain', label: 'Plain & cross-section' },
  { key: 'functional', label: 'Contrast & functional' },
];

export const MODALITIES = {
  xray: {
    id: 'xray', label: 'X-ray / KUB', group: 'plain',
    img: 'web_freeimages/imaging__kub_stone.jpg',
    whatFor: 'A plain abdominal film (Kidneys–Ureters–Bladder). Cheap and quick, it shows radio-opaque (calcium) stones along the line of the tract and the position of tubes, stents and catheters — but it misses radiolucent stones and soft tissue, so it has largely been replaced by CT for stone diagnosis.',
    howRead: [
      'Trace the tract line: renal outlines, down each ureter (over the transverse processes → sacrum → ischial spine), to the bladder',
      'Look for calcific densities along that line — but remember phleboliths and bowel/vascular calcification mimic stones',
      'Check the position of any stent (curls in kidney + bladder) or drain, and the bones/bowel gas in passing',
    ],
    findings: ['staghorn_stone', 'ureteral_stone'],
    pearls: ['~90% of stones are radio-opaque on KUB, but CT is far more sensitive', 'Best use today: tracking a known opaque stone or checking line/stent position', 'A normal KUB does not exclude a stone'],
  },
  ultrasound: {
    id: 'ultrasound', label: 'Ultrasound', group: 'plain',
    img: 'web_freeimages/imaging__us_hydronephrosis.png',
    whatFor: 'First-line, radiation-free imaging of the kidneys and bladder. It detects hydronephrosis, renal masses, and stones (by their acoustic shadow), and measures the post-void residual. It is operator-dependent and poor at the mid-ureter, so a normal scan does not exclude a ureteric stone.',
    howRead: [
      'Both kidneys: size and cortical thickness, and is the central sinus echo split apart by black (anechoic) urine = hydronephrosis?',
      'A bright (echogenic) focus with a posterior acoustic shadow = a stone',
      'Bladder: wall thickness, any mass, and the post-void residual volume',
    ],
    findings: ['renal_mass', 'bladder_hematuria', 'bph'],
    pearls: ['No radiation — first-line in pregnancy and children', 'Great for hydronephrosis and the bladder; weak for the mid-ureter', 'Dilatation is not the same as obstruction'],
  },
  ct: {
    id: 'ct', label: 'CT (KUB / urogram)', group: 'plain',
    img: 'web_freeimages/imaging__ct_stone.jpg',
    whatFor: 'The workhorse. A non-contrast CT KUB is the gold standard for stones (it finds almost all of them and sizes them). A CT urogram adds contrast to opacify the collecting system and ureters, the key test for haematuria to look for upper-tract tumours.',
    howRead: [
      'Non-contrast for stones: scroll the ureters top to bottom for a dense focus + secondary signs (hydronephrosis, perinephric stranding)',
      'With contrast, follow the phases: nephrogram (renal masses enhance) then excretory (filling defects/strictures in the collecting system and ureters)',
      'Always check both kidneys, the whole ureter, the bladder, and the surrounding fat and nodes',
    ],
    findings: ['ureteral_stone', 'renal_mass', 'urothelial_carcinoma'],
    pearls: ['Non-contrast CT KUB = gold standard for stones', 'CT urogram = the upper-tract study for haematuria', 'Enhancement (after contrast) is what separates a solid mass from a cyst'],
  },
  mri: {
    id: 'mri', label: 'MRI', group: 'plain',
    img: 'web_freeimages/imaging__mri_prostate.jpg',
    whatFor: 'Best for soft-tissue contrast without radiation. Multiparametric MRI of the prostate is now central to prostate-cancer diagnosis (it targets the biopsy); MRI also characterises indeterminate renal masses and stages pelvic tumours. It does not show stones.',
    howRead: [
      'Prostate mpMRI: read T2 for the zonal anatomy and diffusion (DWI/ADC) for suspicious lesions; scored with PI-RADS',
      'Renal mass: signal characteristics and enhancement help when CT is indeterminate',
      'Pelvis: T2 for local tumour stage (the depth/spread that changes management)',
    ],
    findings: ['prostate_carcinoma', 'renal_mass'],
    pearls: ['mpMRI before prostate biopsy — it targets the needle (PI-RADS)', 'No radiation; superb soft-tissue detail', 'Poor for stones — use CT'],
  },
};

export const FINDINGS = {
  hydronephrosis: {
    id: 'hydronephrosis', label: 'Hydronephrosis', station: 'kidney', caseId: 'ureteral_stone',
    sign: 'Back-pressure dilates the collecting system. On ultrasound the renal pelvis and calyces balloon into a connected black (anechoic) space; CT shows the dilatation and usually the cause and level; a MAG3 renogram shows whether it is truly obstructing.',
    pitfalls: [
      'Dilatation is not obstruction — a baggy extrarenal pelvis or a full bladder mimics mild dilation; function (MAG3) settles it',
      'A parapelvic cyst can mimic a dilated pelvis on a single image',
      'Bilateral hydronephrosis points below the bladder (outlet) — scan the bladder and prostate',
    ],
    images: [
      { modality: 'US', caption: 'Ballooned, connected anechoic pelvicalyceal system', img: 'web_freeimages/imaging__us_hydronephrosis.png' },
      { modality: 'CT', caption: 'Markedly dilated pelvicalyceal system (arrows)', img: 'web_freeimages/imaging__ct_hydronephrosis.png' },
    ],
  },
  ureteric_stone: {
    id: 'ureteric_stone', label: 'Ureteric stone', station: 'ureter', caseId: 'ureteral_stone',
    sign: 'A dense focus within the ureter on non-contrast CT, with secondary signs — upstream hydronephrosis/hydroureter, perinephric fat stranding, and the soft-tissue "rim sign" around the stone. Common lodging points are the pelviureteric junction, the pelvic brim, and the vesicoureteric junction.',
    pitfalls: [
      'A phlebolith (pelvic vein calcification) mimics a distal stone — the rim sign and lack of a tail help',
      'A normal ultrasound does not exclude a mid-ureteric stone',
      'Look for the secondary signs when the stone itself is tiny',
    ],
    images: [
      { modality: 'CT', caption: 'Dense focus in the ureter + upstream dilatation' },
      { modality: 'KUB', caption: 'Opaque stone tracked along the ureteric line' },
    ],
  },
  renal_mass: {
    id: 'renal_mass', label: 'Renal mass', station: 'kidney', caseId: 'renal_mass',
    sign: 'A solid mass that takes up contrast (enhances) on CT is renal cell carcinoma until proven otherwise; a simple cyst is thin-walled, water-density and does not enhance. Enhancement (a rise in density after contrast) is the single most important sign.',
    pitfalls: [
      'A "too small to characterise" lesion needs follow-up, not dismissal',
      'Haemorrhagic/complex cysts need the Bosniak grade, not a glance',
      'A renal vein/IVC tumour thrombus changes staging — follow the vein',
    ],
    images: [
      { modality: 'CT', caption: 'Solid, enhancing mass distorting the renal outline', img: 'web_freeimages/imaging__ct_renal_mass.jpg' },
      { modality: 'US', caption: 'Solid (non-cystic) mass — prompts contrast CT', img: 'web_freeimages/imaging__us_renal_mass.jpg' },
    ],
  },
  bladder_tumour: {
    id: 'bladder_tumour', label: 'Bladder tumour', station: 'bladder', caseId: 'urothelial_carcinoma',
    sign: 'A frond-like or sessile filling defect projecting from the bladder wall — seen as a soft-tissue mass on CT/US and confirmed at cystoscopy. The CT urogram excretory phase also screens the upper tracts, which are at risk in the same urothelium.',
    pitfalls: [
      'Imaging cannot grade or stage depth reliably — cystoscopy + TURBT does',
      'Clot or trabeculation can mimic a small tumour',
      'A negative scan does not exclude flat carcinoma in situ',
    ],
    images: [
      { modality: 'CT', caption: 'Soft-tissue filling defect projecting into the bladder', img: 'web_freeimages/imaging__ct_bladder_tumour.jpg' },
      { modality: 'US', caption: 'Polypoid wall mass projecting into urine' },
    ],
  },
  urethral_stricture: {
    id: 'urethral_stricture', label: 'Urethral stricture', station: 'urethra', caseId: 'urethral_stricture',
    sign: 'A retrograde urethrogram shows contrast narrowing at the stricture with hold-up and proximal dilatation — it maps the site and length, which decides the repair.',
    pitfalls: [
      'A functional sphincter spasm can mimic a short narrowing — technique matters',
      'Underestimating length changes the operation planned',
      'Distinguish anterior (bulbar) from posterior strictures — different causes and repairs',
    ],
    images: [
      { modality: 'RUG', caption: 'Contrast narrowing with hold-up at the stricture (labels in German)', img: 'web_freeimages/imaging__rug_stricture.jpg' },
    ],
  },
  vur_reflux: {
    id: 'vur_reflux', label: 'Vesicoureteric reflux', station: 'ureter', caseId: 'vesicoureteral_reflux',
    sign: 'A micturating cystourethrogram (MCUG) shows contrast refluxing from the bladder back up the ureter (± into the kidney), graded I–V by how high it goes and how dilated the system becomes.',
    pitfalls: [
      'Reflux is intermittent — a single static image can miss it; image during voiding',
      'High-grade reflux with a dilated, clubbed system risks renal scarring (check with DMSA)',
      'It is a paediatric-predominant diagnosis — context matters',
    ],
    images: [
      { modality: 'MCUG', caption: 'Contrast refluxing up both ureters into dilated systems', img: 'web_freeimages/imaging__mcug_reflux.jpg' },
    ],
  },
};

export const modalityFor = (id) => MODALITIES[id] || null;
export const findingFor = (id) => FINDINGS[id] || null;
