// Completion guard: every condition + presentation has a patient-education block.
// Run: node --test blog/pa-orientation/patient-coverage.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLINICAL } from './urinary-clinical.js';
import { PRESENTATIONS } from './urinary-presentations.js';
import { ONCOLOGY } from './urinary-oncology.js';
import { ANDROLOGY } from './urinary-andrology.js';
import { TRAUMA } from './urinary-trauma.js';
import { NORMAL_TEACH } from './urinary-normal.js';

const DISEASE_KEYS = ['whatItIs', 'whyItMatters', 'whatIsDone', 'whatToWatch'];
const NORMAL_KEYS = ['whatItIs', 'whatItDoes', 'howKeptWell', 'whatToWatch'];

function assertAll(obj, keys, name) {
  for (const id of Object.keys(obj)) {
    const p = obj[id].patient;
    assert.ok(p && typeof p === 'object', `${name}.${id}: missing patient block`);
    for (const k of keys) {
      assert.ok(typeof p[k] === 'string' && p[k].trim().length > 0, `${name}.${id}: patient.${k} empty/missing`);
    }
  }
}

test('every condition (CLINICAL) has a patient block', () => assertAll(CLINICAL, DISEASE_KEYS, 'CLINICAL'));
test('every presentation has a patient block', () => assertAll(PRESENTATIONS, DISEASE_KEYS, 'PRESENTATIONS'));
test('every oncology entry has a patient block', () => assertAll(ONCOLOGY, DISEASE_KEYS, 'ONCOLOGY'));
test('every andrology entry has a patient block', () => assertAll(ANDROLOGY, DISEASE_KEYS, 'ANDROLOGY'));
test('every trauma entry has a patient block', () => assertAll(TRAUMA, DISEASE_KEYS, 'TRAUMA'));
test('every normal-anatomy entry has a patient block (normal variant)', () => assertAll(NORMAL_TEACH, NORMAL_KEYS, 'NORMAL_TEACH'));

test('no brand names and no second-person voice across all patient blocks', () => {
  const BRANDS = /\b(Flomax|Viagra|Cialis|Levitra|Avodart|Proscar|Propecia|Vesicare|Myrbetriq|Zoladex|Rapaflo|Jalyn|Toviaz|Detrol|Ditropan|Botox)\b/;
  const YOU = /\b(you|your|yourself)\b/i;
  const mods = [['CLINICAL', CLINICAL], ['PRESENTATIONS', PRESENTATIONS], ['ONCOLOGY', ONCOLOGY], ['ANDROLOGY', ANDROLOGY], ['TRAUMA', TRAUMA], ['NORMAL', NORMAL_TEACH]];
  for (const [name, obj] of mods) {
    for (const id of Object.keys(obj)) {
      const txt = Object.values(obj[id].patient).join(' || ');
      assert.ok(!BRANDS.test(txt), `${name}.${id}: brand name "${(txt.match(BRANDS) || [])[0]}"`);
      assert.ok(!YOU.test(txt), `${name}.${id}: second-person voice`);
    }
  }
});
