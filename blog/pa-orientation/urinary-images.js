// Per-concept real image map. The figure panel shows the real plate/diagram for a
// concept when one exists; otherwise the view falls back to the interactive model
// (kept for the dynamic teaching: one-way flow, back-pressure, the storage/voiding
// state machine, and the functional/neurogenic conditions a static image can't show).
// Paths are relative to Urinary Interactive.html. Atlas plates = Burroughs Wellcome;
// web_freeimages = Wikimedia Commons (see web_freeimages/SOURCES.md).

export const IMAGES = {
  // --- Normal structures (kidney/nephron/bladder/urethra get real images; overview
  //     + sphincters stay on the model for flow + the storage/voiding state machine) ---
  kidney: 'web_freeimages/kidney__blausen_0592_kidneyanatomy_01.png',
  nephron: 'web_freeimages/nephron__physiology_of_nephron.png',
  bladder: 'images/atlas1-p04.jpg',
  urethra: 'images/atlas1-p06.jpg',

  // --- Conditions ---
  glomerular_hematuria: 'images/atlas2-p06.jpg',
  pyelonephritis: 'images/atlas2-p07.jpg',
  renal_mass: 'images/atlas2-p06.jpg',
  staghorn_stone: 'images/atlas2-p03.jpg',
  ureteral_stone: 'images/atlas2-p03.jpg',
  ureteral_stone_brim: 'images/atlas2-p03.jpg',
  ureteral_stone_uvj: 'images/atlas2-p03.jpg',
  ureteral_stricture: 'images/atlas2-p03.jpg',
  ureteral_compression: 'images/atlas2-p03.jpg',
  bladder_hematuria: 'images/atlas2-p04.jpg',
  cystitis: 'images/atlas1-p05.jpg',
  bladder_hypertrophy: 'images/atlas2-p05.jpg',
  bladder_diverticulum: 'images/atlas2-p04.jpg',
  urothelial_carcinoma: 'images/atlas2-p04.jpg',
  bladder_stone: 'images/atlas2-p04.jpg',
  bph: 'images/atlas2-p01.jpg',
  prostate_carcinoma: 'images/atlas2-p02.jpg',
  prostatitis: 'images/atlas1-p08.jpg',
  urethral_stricture: 'images/atlas2-p05.jpg',
  urethral_stone: 'images/atlas2-p05.jpg',
  meatal_stenosis: 'images/atlas2-p05.jpg',
  posterior_urethral_valve: 'images/atlas2-p05.jpg',
  // functional / neurogenic conditions intentionally omitted → keep the model:
  //   detrusor_overactivity, stress_incontinence, detrusor_sphincter_dyssynergia,
  //   neurogenic_umn, neurogenic_lmn, vesicoureteral_reflux
  // scrotal conditions: image gap (torsion Doppler / orchitis) — model for now:
  //   testicular_torsion, epididymo_orchitis

  // --- Oncology cancers (organ pathology plate) ---
  prostate_ca: 'images/atlas2-p02.jpg',
  urothelial_ca: 'images/atlas2-p04.jpg',
  rcc: 'images/atlas2-p06.jpg',
  // testicular_ca: image gap → model

  // --- Scrotum ---
  epididymo_orchitis: 'web_freeimages/scrotum__epididymo_orchitis.jpg', // Doppler hyperaemia (CC BY 2.5)
  testicular_torsion: 'web_freeimages/scrotum__testicular_torsion.jpg', // scrotal US of torsion (CC BY 3.0)

  // --- Oncology concept mechanism schematics (our own flow diagrams) ---
  ar_axis: 'schematics/ar_axis.svg',
  checkpoint: 'schematics/checkpoint.svg',
  tki_vegf: 'schematics/tki_vegf.svg',
  parp: 'schematics/parp.svg',
};

export function imageFor(id) { return IMAGES[id] || null; }
