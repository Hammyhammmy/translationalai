// What the animated tract does for each condition — pure data, no DOM.
// Drives the figure in Urinary Interactive.html and is unit-tested headlessly
// (urinary-motion.test.mjs checks it agrees with evaluateCase in urinary-model.js).
//
// Conventions: the diagram faces the reader, so the viewer's right is the
// patient's LEFT. One-sided disease is drawn on the patient's left ('B' side).
//
// Scene fields (all optional):
//   cycle      'normal' | 'stress' | 'oab' | 'retention' | 'dsd'   bladder behaviour
//   urgeAt     fill fraction where an overactive bladder squeezes (default 0.38)
//   ureter     { kind: 'stone'|'stricture'|'compression', at: 0..1 }   left ureter block, 0 = kidney end
//   staghorn   true → stone fills the left kidney's drainage system
//   outlet     { kind: 'bph'|'cancer'|'stricture'|'stone'|'meatus'|'valve' }   bladder-outlet block
//   reflux     true → urine runs back up the left ureter during voiding
//   blood      'kidney' (left) | 'kidneys' (both, glomerular) | 'bladder'   where blood joins
//   mass       'kidney' | 'bladder' | 'prostate'
//   inflamed   { at: 'kidney'|'bladder'|'prostate'|'testis', systemic: bool }
//   thickWall, diverticulum, bladderStone   bladder-wall findings
//   testis     'torsion'
//   male       true → needs male anatomy (prostate / testis); the figure switches to male
//   tip        short plain-word label for the headline sign (shown as a callout)

export const NORMAL_SCENE = { cycle: 'normal' };

export const SCENES = {
  glomerular_hematuria: { cycle: 'normal', blood: 'kidneys', tip: 'blood from both kidneys' },
  pyelonephritis:       { cycle: 'normal', inflamed: { at: 'kidney', systemic: true }, tip: 'fever · systemically ill' },
  renal_mass:           { cycle: 'normal', mass: 'kidney', blood: 'kidney', tip: 'painless bleeding' },
  staghorn_stone:       { cycle: 'normal', staghorn: true, tip: 'stone fills the kidney' },

  ureteral_stone:       { cycle: 'normal', ureter: { kind: 'stone', at: 0.06 }, tip: 'stone at the UPJ' },
  ureteral_stone_brim:  { cycle: 'normal', ureter: { kind: 'stone', at: 0.47 }, tip: 'stone at the pelvic brim' },
  ureteral_stone_uvj:   { cycle: 'normal', ureter: { kind: 'stone', at: 0.9 }, tip: 'stone at the UVJ' },
  ureteral_stricture:   { cycle: 'normal', ureter: { kind: 'stricture', at: 0.62 }, tip: 'scarred, narrow ureter' },
  ureteral_compression: { cycle: 'normal', ureter: { kind: 'compression', at: 0.5 }, tip: 'squeezed from outside' },
  vesicoureteral_reflux:{ cycle: 'normal', reflux: true, tip: 'reflux ↑ on voiding' },

  bladder_hematuria:    { cycle: 'normal', blood: 'bladder', tip: 'blood joins here' },
  cystitis:             { cycle: 'normal', inflamed: { at: 'bladder', systemic: false }, tip: 'burning · frequency · no fever' },
  interstitial_cystitis:{ cycle: 'normal', tip: 'sterile pain as it fills' },
  detrusor_overactivity:{ cycle: 'oab', tip: 'urge!' },
  bladder_hypertrophy:  { cycle: 'normal', thickWall: true, tip: 'thick, ridged wall' },
  bladder_diverticulum: { cycle: 'normal', diverticulum: true, tip: 'pouch keeps urine' },
  urothelial_carcinoma: { cycle: 'normal', mass: 'bladder', blood: 'bladder', tip: 'painless bleeding' },
  bladder_stone:        { cycle: 'normal', bladderStone: true, tip: 'stone blocks the neck' },

  stress_incontinence:  { cycle: 'stress', tip: 'leak' },
  detrusor_sphincter_dyssynergia: { cycle: 'dsd', thickWall: true, tip: 'sphincter clamps shut' },
  neurogenic_umn:       { cycle: 'oab', urgeAt: 0.28, thickWall: true, tip: 'small, high-pressure bladder' },
  neurogenic_lmn:       { cycle: 'retention', tip: 'no squeeze · overflow' },

  bph:                  { male: true, cycle: 'normal', outlet: { kind: 'bph' }, thickWall: true, tip: 'weak, stop-start' },
  prostate_carcinoma:   { male: true, cycle: 'normal', outlet: { kind: 'cancer' }, mass: 'prostate', tip: 'hard, nodular prostate' },
  prostatitis:          { male: true, cycle: 'normal', inflamed: { at: 'prostate', systemic: true }, tip: 'fever · tender prostate' },
  cpps:                 { male: true, cycle: 'normal', tip: 'pain, sterile urine' },
  urethral_stricture:   { cycle: 'normal', outlet: { kind: 'stricture' }, tip: 'narrow segment' },
  urethral_stone:       { cycle: 'normal', outlet: { kind: 'stone' }, tip: 'stone in the urethra' },
  meatal_stenosis:      { cycle: 'normal', outlet: { kind: 'meatus' }, tip: 'narrow exit' },
  posterior_urethral_valve: { male: true, cycle: 'normal', outlet: { kind: 'valve' }, thickWall: true, tip: 'valve flap blocks outflow' },

  testicular_torsion:   { male: true, cycle: 'normal', testis: 'torsion', tip: 'twisted cord · no blood flow' },
  epididymo_orchitis:   { male: true, cycle: 'normal', inflamed: { at: 'testis', systemic: false }, tip: 'swollen, tender' },
};

export function sceneFor(caseId) {
  return SCENES[caseId] || NORMAL_SCENE;
}
