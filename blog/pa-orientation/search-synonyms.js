// Small curated synonym map for site search. Keys are terms a user might type;
// values are lowercase tokens that actually appear in the indexed text, so a
// typed abbreviation/variant still matches. Substring semantics: 'prostat'
// matches both "prostatic" and "prostate". British spelling dominates the index
// (haematuria), so American variants are bridged here.
export const SYNONYMS = {
  // haematuria family (index uses British 'haematuria'; Consults uses 'hematuria')
  hematuria: ['haematuria'],
  haematuria: ['hematuria'],
  gross: ['haematuria', 'hematuria'],
  visible: ['haematuria', 'hematuria'],
  macroscopic: ['haematuria', 'hematuria'],
  // prostate
  bph: ['prostat', 'benign prostatic'],
  turp: ['transurethral'],
  psa: ['prostat'],
  // infection / stones / cancer
  uti: ['cystitis', 'urinary tract infection', 'infection'],
  stone: ['calcul', 'urolithiasis', 'lithiasis'],
  stones: ['calcul', 'urolithiasis', 'lithiasis'],
  ca: ['cancer', 'carcinoma'],
  rcc: ['renal cell'],
  cauda: ['cauda equina'],
  // plain-language
  pee: ['urine', 'void', 'micturition', 'retention'],
};
