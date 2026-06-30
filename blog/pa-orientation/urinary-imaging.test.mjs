// Imaging catalog — modalities + findings shape, station + caseId validity.
// Run: node --test blog/pa-orientation/urinary-imaging.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MODALITIES, FINDINGS, MOD_GROUPS, modalityFor, findingFor } from './urinary-imaging.js';
import { CASES } from './urinary-model.js';

const STATIONS = ['kidney', 'ureter', 'bladder', 'prostate', 'urethra'];

test('has the 4 core modalities incl. ultrasound', () => {
  for (const id of ['xray', 'ultrasound', 'ct', 'mri']) assert.ok(MODALITIES[id], `modality ${id} missing`);
});

test('every modality has whatFor, a how-to-read list, valid group, pearls', () => {
  for (const id of Object.keys(MODALITIES)) {
    const m = MODALITIES[id];
    assert.equal(m.id, id);
    assert.ok(m.label && m.whatFor, `${id}: label/whatFor`);
    assert.ok(MOD_GROUPS.some((g) => g.key === m.group), `${id}: bad group ${m.group}`);
    assert.ok(Array.isArray(m.howRead) && m.howRead.length, `${id}: howRead`);
    assert.ok(Array.isArray(m.pearls) && m.pearls.length, `${id}: pearls`);
  }
});

test("modality 'key findings' all point to real conditions", () => {
  for (const id of Object.keys(MODALITIES)) {
    for (const cid of MODALITIES[id].findings || []) {
      assert.ok(CASES[cid], `${id}: findings caseId '${cid}' not in CASES`);
    }
  }
});

test('has the 6 core findings incl. hydronephrosis', () => {
  for (const id of ['hydronephrosis', 'ureteric_stone', 'renal_mass', 'bladder_tumour', 'urethral_stricture', 'vur_reflux']) {
    assert.ok(FINDINGS[id], `finding ${id} missing`);
  }
});

test('every finding has a valid station, a sign, pitfalls, a caseId in CASES, and modality images list', () => {
  for (const id of Object.keys(FINDINGS)) {
    const f = FINDINGS[id];
    assert.equal(f.id, id);
    assert.ok(STATIONS.includes(f.station), `${id}: bad station ${f.station}`);
    assert.ok(f.sign && f.sign.trim(), `${id}: sign`);
    assert.ok(Array.isArray(f.pitfalls) && f.pitfalls.length, `${id}: pitfalls`);
    assert.ok(CASES[f.caseId], `${id}: caseId '${f.caseId}' not in CASES`);
    assert.ok(Array.isArray(f.images), `${id}: images array`);
    for (const im of f.images) assert.ok(im.modality && im.caption, `${id}: image needs modality+caption`);
  }
});

test('helpers return the entry or null', () => {
  assert.equal(modalityFor('ultrasound').id, 'ultrasound');
  assert.equal(modalityFor('nope'), null);
  assert.equal(findingFor('hydronephrosis').id, 'hydronephrosis');
  assert.equal(findingFor('nope'), null);
});
