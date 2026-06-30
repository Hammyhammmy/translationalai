// Completion guard: every condition + presentation has a patient-education block.
// Run: node --test blog/pa-orientation/patient-coverage.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLINICAL } from './urinary-clinical.js';
import { PRESENTATIONS } from './urinary-presentations.js';

const DISEASE_KEYS = ['whatItIs', 'whyItMatters', 'whatIsDone', 'whatToWatch'];

function assertBlock(p, where) {
  assert.ok(p && typeof p === 'object', `${where}: missing patient block`);
  for (const k of DISEASE_KEYS) {
    assert.ok(typeof p[k] === 'string' && p[k].trim().length > 0, `${where}: patient.${k} empty/missing`);
  }
}

test('every condition (CLINICAL entry) has a patient block', () => {
  for (const id of Object.keys(CLINICAL)) assertBlock(CLINICAL[id].patient, `CLINICAL.${id}`);
});

test('every presentation has a patient block', () => {
  for (const id of Object.keys(PRESENTATIONS)) assertBlock(PRESENTATIONS[id].patient, `PRESENTATIONS.${id}`);
});
