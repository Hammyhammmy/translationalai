// Clinical workup registry — every pathology case has History/Exam/Labs/Imaging/Treatment.
// Run: node --test blog/pa-orientation/urinary-clinical.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from './urinary-model.js';
import { CLINICAL, FIELDS, clinicalFor } from './urinary-clinical.js';

const pathologies = Object.keys(CASES).filter((id) => id !== 'normal');

test('FIELDS are History, Exam, Labs, Imaging, Treatment', () => {
  assert.deepEqual(FIELDS, ['history', 'exam', 'labs', 'imaging', 'treatment']);
});

test('every pathology case has teaching-depth fields and pearls', () => {
  for (const id of pathologies) {
    const c = CLINICAL[id];
    assert.ok(c, `missing clinical entry: ${id}`);
    for (const f of FIELDS) {
      assert.equal(typeof c[f], 'string', `${id}.${f} type`);
      assert.ok(c[f].trim().length > 30, `${id}.${f} too shallow`);
    }
    assert.ok(Array.isArray(c.pearls) && c.pearls.length, `${id} pearls`);
  }
});

test('clinicalFor returns the entry, or null for normal/unknown', () => {
  assert.equal(clinicalFor('bph').treatment.length > 0, true);
  assert.equal(clinicalFor('normal'), null);
  assert.equal(clinicalFor('nope'), null);
});

test('no stray clinical entries for unknown cases', () => {
  for (const id of Object.keys(CLINICAL)) {
    assert.ok(CASES[id], `clinical entry for unknown case: ${id}`);
  }
});
