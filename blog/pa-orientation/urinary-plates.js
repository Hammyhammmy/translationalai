// Atlas-plate registry for the interactive urinary-tract overlay.
// Pure data + lookup; no DOM. The view (Urinary Interactive.html) renders the
// plate named here and positions overlay hotspots at the normalized coords below.
// Coordinates are fractions of the plate's natural size (0 = left/top, 1 = right/bottom),
// captured by eye from the Burroughs Wellcome plates in images/.

export const PLATES = {
  // Orientation plate — side + frontal views of the male tract (hotspots use the frontal view).
  'atlas1-p02': {
    src: 'images/atlas1-p02.jpg', w: 1100, h: 1100,
    label: 'Male urinary tract — overview',
    // Hotspots placed on the FRONTAL view (right figure).
    stations: {
      kidney:   { x: 0.80, y: 0.31 },
      ureter:   { x: 0.74, y: 0.44 },
      bladder:  { x: 0.70, y: 0.55 },
      prostate: { x: 0.70, y: 0.61 },
      urethra:  { x: 0.69, y: 0.66 },
    },
  },
  // BPH — large coronal panel: distended bladder above, yellow adenoma compressing the urethra.
  'atlas2-p01': {
    src: 'images/atlas2-p01.jpg', w: 1100, h: 1100,
    label: 'Benign prostatic hyperplasia',
    // Hotspots on the large right-hand coronal panel.
    stations: {
      bladder:  { x: 0.72, y: 0.30 },
      prostate: { x: 0.63, y: 0.54 },
      urethra:  { x: 0.55, y: 0.62 },
    },
  },
  // Upper-tract obstruction synoptic — left kidney in hydronephrosis, ureteral lesions, bladder below.
  'atlas2-p03': {
    src: 'images/atlas2-p03.jpg', w: 1004, h: 1100,
    label: 'Upper-tract obstruction — synoptic',
    stations: {
      kidney:  { x: 0.30, y: 0.22 },
      ureter:  { x: 0.35, y: 0.47 },
      bladder: { x: 0.50, y: 0.80 },
    },
  },
  // Bladder pathologies — opened bladder showing tumor, calculus, etc.
  'atlas2-p04': {
    src: 'images/atlas2-p04.jpg', w: 961, h: 1100,
    label: 'Bladder pathologies — overview',
    stations: {
      ureter:  { x: 0.78, y: 0.10 },
      bladder: { x: 0.50, y: 0.30 },
      urethra: { x: 0.50, y: 0.58 },
    },
  },
};

// Which plate each pathology case shows.
export const CASE_PLATE = {
  normal:            'atlas1-p02',
  ureteral_stone:    'atlas2-p03',
  bladder_hematuria: 'atlas2-p04',
  bph:               'atlas2-p01',
};

// The lesion callout drawn on the mapped plate (null for normal). station must be a
// hotspot the plate labels — enforced by urinary-plates.test.mjs.
export const CASE_ANNOTATION = {
  normal: null,
  ureteral_stone: {
    x: 0.35, y: 0.47, station: 'ureter',
    text: 'Stone obstructing the ureter — hydronephrosis backs up above, the tract goes silent below.',
  },
  bladder_hematuria: {
    x: 0.50, y: 0.22, station: 'bladder',
    text: 'Bladder tumor — painless gross hematuria. Nothing is obstructed; the cargo changes color.',
  },
  bph: {
    x: 0.63, y: 0.54, station: 'prostate',
    text: 'Hyperplastic prostate compressing the urethra; the bladder distends above it.',
  },
};

// Resolve a case to everything the view needs to render it.
export function plateForCase(caseId) {
  const id = CASE_PLATE[caseId];
  if (!id) throw new Error(`no plate mapped for case: ${caseId}`);
  const plate = PLATES[id];
  return { id, ...plate, annotation: CASE_ANNOTATION[caseId] ?? null };
}
