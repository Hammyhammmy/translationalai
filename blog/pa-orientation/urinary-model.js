// Urinary physiology engine — pure logic, no DOM. Drives the interactive atlas
// (Urinary Interactive.html) and is unit-tested headlessly (node:test).
//
// One model, ~30 cases. evaluateCase(caseId, phase) returns the consequence the
// view renders on the anatomy: where flow blocks, what dilates (back-pressure),
// what goes silent, recolor (hematuria), inflammation, mass, reflux, etc.
//
// Teaching invariant: obstruction → every station ABOVE the lesion dilates,
// every station BELOW goes silent; the lesion station is where flow first fails.

export const STATIONS = ['kidney', 'ureter', 'bladder', 'urethra'];

export const PHASES = {
  STORAGE: { division: 'sympathetic', nerveRoots: 'T10-L2', detrusor: 'relaxed', internalSphincter: 'closed', externalSphincter: 'contracted' },
  VOIDING: { division: 'parasympathetic', nerveRoots: 'S2-S4', detrusor: 'contracted', internalSphincter: 'open', externalSphincter: 'relaxed' },
};
export function nextPhase(phase) { return phase === 'STORAGE' ? 'VOIDING' : 'STORAGE'; }

export const MECHANISMS = [
  'none', 'obstruction', 'bleeding', 'infection', 'malignancy',
  'reflux', 'overactivity', 'structural', 'incontinence', 'neurogenic', 'vascular',
];

// A condition manifests in a specific phase of the storage/voiding cycle — it's
// intrinsic, not a user-chosen toggle. null = phase doesn't apply (upper-tract /
// non-functional). The free Storage/Voiding toggle lives only in the Normal view.
const STORAGE_FAULT = new Set(['detrusor_overactivity', 'stress_incontinence', 'neurogenic_umn']);
const VOIDING_FAULT = new Set(['bph', 'urethral_stone', 'urethral_stricture', 'meatal_stenosis',
  'posterior_urethral_valve', 'detrusor_sphincter_dyssynergia', 'vesicoureteral_reflux', 'neurogenic_lmn']);
const FAULT_PHASE = (id) => STORAGE_FAULT.has(id) ? 'storage' : VOIDING_FAULT.has(id) ? 'voiding' : null;

// case helper
const C = (id, group, lesionStation, mechanism, label, note, extra = {}) =>
  ({ id, group, lesionStation, mechanism, label, note,
     faultPhase: extra.faultPhase ?? FAULT_PHASE(id),
     ...extra });

export const CASES = Object.fromEntries([
  C('normal', 'kidney', null, 'none', 'Normal flow',
    'Urine is produced at the kidneys and flows one way to the exit.'),

  // ---- Station 1 — kidney ----
  C('glomerular_hematuria', 'kidney', 'kidney', 'bleeding', 'Glomerular hematuria',
    'Bleeding originates in the glomerulus; urine is red from the kidney down. No obstruction.'),
  C('pyelonephritis', 'kidney', 'kidney', 'infection', 'Acute pyelonephritis',
    'Kidney infection — febrile, systemically ill. An obstructed infected system is an emergency.', { systemic: true }),
  C('renal_mass', 'kidney', 'kidney', 'malignancy', 'Renal mass (RCC)',
    'A renal tumour. Painless gross hematuria with no upstream signature until it obstructs.'),
  C('staghorn_stone', 'kidney', 'kidney', 'obstruction', 'Staghorn / calyceal stone',
    'A stone filling the collecting system; obstructs at the kidney and seeds infection.'),

  // ---- Station 2 — ureter ----
  C('ureteral_stone', 'ureter', 'ureter', 'obstruction', 'Ureteral stone — UPJ',
    'Stone at the pelvi-ureteric junction. Colicky flank pain; hydronephrosis above.'),
  C('ureteral_stone_brim', 'ureter', 'ureter', 'obstruction', 'Ureteral stone — pelvic brim',
    'Stone at the pelvic brim crossing. Pain refers to the flank/abdomen; hydronephrosis above.'),
  C('ureteral_stone_uvj', 'ureter', 'ureter', 'obstruction', 'Ureteral stone — UVJ',
    'Stone at the vesico-ureteric junction. Pain refers to groin/testicle; hydronephrosis above.'),
  C('ureteral_stricture', 'ureter', 'ureter', 'obstruction', 'Ureteral stricture',
    'A fixed narrowing from prior stone/surgery. Gradual dilation above.'),
  C('ureteral_compression', 'ureter', 'ureter', 'obstruction', 'Extrinsic compression',
    'Squeezed from outside (mass, aberrant vessel, retroperitoneal fibrosis).'),
  C('vesicoureteral_reflux', 'ureter', 'ureter', 'reflux', 'Vesicoureteral reflux',
    'Incompetent UVJ valve — urine runs backward up the ureter during voiding, risking the kidney.'),

  // ---- Station 3 — bladder ----
  C('bladder_hematuria', 'bladder', 'bladder', 'bleeding', 'Hematuria + frequency',
    'Bleeding into the bladder. Flow continues but the urine runs red from the bladder down.'),
  C('cystitis', 'bladder', 'bladder', 'infection', 'Cystitis',
    'Bladder infection — dysuria, frequency; afebrile. Same bugs as pyelonephritis, different station.', { systemic: false }),
  C('detrusor_overactivity', 'bladder', 'bladder', 'overactivity', 'Detrusor overactivity',
    'Premature detrusor contractions during storage → urgency and frequency.'),
  C('bladder_hypertrophy', 'bladder', 'bladder', 'structural', 'Wall hypertrophy (outlet obstruction)',
    'Thick, trabeculated detrusor pushing against a chronic outlet obstruction.'),
  C('bladder_diverticulum', 'bladder', 'bladder', 'structural', 'Bladder diverticulum',
    'Out-pouching of mucosa through the wall from chronic high pressure.'),
  C('urothelial_carcinoma', 'bladder', 'bladder', 'malignancy', 'Urothelial carcinoma',
    'A bladder tumour — painless gross hematuria until it obstructs or invades.'),
  C('bladder_stone', 'bladder', 'bladder', 'structural', 'Bladder stone',
    'A stone in the reservoir; can intermittently obstruct the outlet and seed infection.'),

  // ---- Station 4 — control: sphincters & neural ----
  C('stress_incontinence', 'control', 'urethra', 'incontinence', 'Stress incontinence',
    'Pelvic-floor support fails — leak with a cough/pressure spike. The gate cannot hold.'),
  C('detrusor_sphincter_dyssynergia', 'control', 'urethra', 'neurogenic', 'Detrusor-sphincter dyssynergia',
    'Detrusor contracts against a closed sphincter — high pressure, no flow. Damages the kidneys.',
    { effect: 'functional_obstruction' }),
  C('neurogenic_umn', 'control', 'neural', 'neurogenic', 'Neurogenic bladder (UMN)',
    'Spastic, small-capacity, high-pressure bladder (cord lesion/MS). The wiring is the lesion.',
    { effect: 'spastic' }),
  C('neurogenic_lmn', 'control', 'neural', 'neurogenic', 'Neurogenic bladder (LMN)',
    'Flaccid, atonic bladder with retention (cauda equina/diabetic). The wiring is the lesion.',
    { effect: 'retention' }),

  // ---- Station 5 — urethra / outlet ----
  C('bph', 'urethra', 'urethra', 'obstruction', 'BPH (outlet obstruction)',
    'The prostate compresses the urethra; the bladder distends and back-pressure reaches the kidneys.'),
  C('prostate_carcinoma', 'urethra', 'urethra', 'malignancy', 'Prostate carcinoma',
    'A nodular prostatic cancer; may obstruct the outlet and invade the bladder base.'),
  C('prostatitis', 'urethra', 'urethra', 'infection', 'Prostatitis',
    'Inflamed, tender prostate with multi-zone referred pain; can be systemically unwell.', { systemic: true }),
  C('urethral_stricture', 'urethra', 'urethra', 'obstruction', 'Urethral stricture',
    'A scarred urethral segment from infection/instrumentation — weak stream, back-pressure.'),
  C('urethral_stone', 'urethra', 'urethra', 'obstruction', 'Urethral stone',
    'A stone passed into the urethra — outlet obstruction; the bladder distends and pressure climbs.'),
  C('meatal_stenosis', 'urethra', 'urethra', 'obstruction', 'Meatal stenosis / phimosis',
    'Narrowing at the very exit; chronic low-grade outlet obstruction.'),
  C('posterior_urethral_valve', 'urethra', 'urethra', 'obstruction', 'Posterior urethral valve',
    'Congenital outlet obstruction (paediatric); severe upstream back-pressure if missed.'),

  // ---- Scrotum / testis (NOT a urinary conduit — vascular / infective) ----
  C('testicular_torsion', 'scrotum', 'testis', 'vascular', 'Testicular torsion',
    'Spermatic-cord twist strangles the blood supply — ischemia. Surgical emergency; viability falls after ~6 h. A vascular problem, not a conduit one.'),
  C('epididymo_orchitis', 'scrotum', 'testis', 'infection', 'Epididymo-orchitis',
    'Infection of epididymis/testis — gradual painful swelling, eased by elevation. The key mimic to distinguish from torsion.', { systemic: false }),
].map((c) => [c.id, c]));

// Evaluate a case in a phase → consequence object the view renders.
export function evaluateCase(caseId, phase = 'VOIDING') {
  const def = CASES[caseId];
  if (!def) throw new Error(`unknown case: ${caseId}`);
  const { lesionStation, mechanism, group, note } = def;
  const i = STATIONS.indexOf(lesionStation); // -1 if null/neural

  const r = {
    caseId, phase, group, note, lesionStation, mechanism,
    faultPhase: def.faultPhase,
    flowBlocked: false,
    dilatedStations: [], silentStations: [],
    hydronephrosis: false, bladderDistension: false, renalImpact: false,
    particleColor: 'normal', particleColorFrom: null,
    inflamed: null, systemic: false, mass: null,
    flowReversed: false, refluxTo: null,
    functional: false, continenceFail: false, structuralAt: null, ischemic: false,
    exitFlow: phase === 'VOIDING' ? 'normal' : 'none',
  };

  const applyObstruction = (idx) => {
    r.flowBlocked = true;
    r.dilatedStations = STATIONS.slice(0, idx);
    r.silentStations = STATIONS.slice(idx + 1);
    r.hydronephrosis = r.dilatedStations.includes('kidney');
    r.bladderDistension = r.dilatedStations.includes('bladder');
    r.renalImpact = r.hydronephrosis;
    if (STATIONS[idx] === 'urethra') r.exitFlow = 'blocked';
  };

  switch (mechanism) {
    case 'obstruction':
      applyObstruction(i);
      break;
    case 'bleeding':
      r.particleColor = 'blood';
      r.particleColorFrom = lesionStation;
      break;
    case 'infection':
      r.inflamed = lesionStation;
      r.systemic = !!def.systemic;
      break;
    case 'malignancy':
      r.mass = lesionStation;
      // painless gross hematuria from urothelial / renal tumours
      if (lesionStation === 'kidney' || lesionStation === 'bladder') {
        r.particleColor = 'blood';
        r.particleColorFrom = lesionStation;
      }
      break;
    case 'reflux':
      r.flowReversed = true;
      r.refluxTo = 'kidney';
      break;
    case 'overactivity':
      r.functional = true; // storage failure (urgency/frequency)
      break;
    case 'structural':
      r.structuralAt = lesionStation;
      break;
    case 'incontinence':
      r.continenceFail = true;
      r.exitFlow = 'leak';
      break;
    case 'neurogenic':
      r.functional = true;
      if (def.effect === 'functional_obstruction' && i >= 0) {
        applyObstruction(i); // detrusor vs closed sphincter = functional outlet obstruction
      } else if (def.effect === 'retention') {
        r.bladderDistension = true; // atonic, full bladder
      }
      // 'spastic' (UMN): functional, high-pressure — flagged via functional + note
      break;
    case 'vascular':
      r.ischemic = true; // testicular torsion: cord twist → ischemia (not a conduit block)
      break;
    case 'none':
    default:
      break;
  }
  return r;
}
