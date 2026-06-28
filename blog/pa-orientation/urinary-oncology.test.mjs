// Tests for the GU oncology registry.
// Run: node --test blog/pa-orientation/urinary-oncology.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from './urinary-model.js';
import { ONCOLOGY, ONC_CANCERS, ONC_CONCEPTS, oncologyFor } from './urinary-oncology.js';

test('the treatment concepts are present', () => {
  for (const id of ['ar_axis','checkpoint','tki_vegf','fgfr','parp','adc','radioligand','bcg'])
    assert.equal(ONCOLOGY[id]?.kind, 'concept', `${id}`);
});

test('the GU cancers are present', () => {
  for (const id of ['prostate_ca','urothelial_ca','rcc','testicular_ca'])
    assert.equal(ONCOLOGY[id]?.kind, 'cancer', `${id}`);
});

test('each concept explains a mechanism, where it is used, and has pearls', () => {
  for (const id of ONC_CONCEPTS) {
    const c = ONCOLOGY[id];
    assert.ok(c.label && c.mechanism.length > 80 && c.usedIn.length > 20, `${id} depth`);
    assert.ok(Array.isArray(c.pearls) && c.pearls.length, `${id} pearls`);
  }
});

test('each cancer has teaching-depth lesion/markers/treatmentNote, classes and pearls', () => {
  for (const id of ONC_CANCERS) {
    const c = ONCOLOGY[id];
    assert.ok(['kidney','bladder','urethra','testis'].includes(c.organ), `${id} organ`);
    assert.ok(c.lesion.length > 80, `${id} lesion depth`);
    assert.ok(c.driver.length > 10 && c.markers.length > 80, `${id} markers depth`);
    assert.ok(c.treatmentNote.length > 60, `${id} treatmentNote`);
    assert.ok(Array.isArray(c.treatments) && c.treatments.length, `${id} treatments`);
    for (const t of c.treatments) assert.ok(t.class && t.drug && t.rationale, `${id} treatment incomplete`);
    assert.ok(Array.isArray(c.pearls) && c.pearls.length, `${id} pearls`);
  }
});

test('a cancer that maps to a condition points to a real case', () => {
  for (const id of ONC_CANCERS) {
    const c = ONCOLOGY[id];
    if (c.caseId) assert.ok(CASES[c.caseId], `${id} -> unknown case ${c.caseId}`);
  }
});

test('oncologyFor returns the entry or null', () => {
  assert.equal(oncologyFor('prostate_ca').organ, 'urethra');
  assert.equal(oncologyFor('nope'), null);
});
