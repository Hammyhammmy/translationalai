// Prostatitis split: acute bacterial (infection) vs chronic prostatitis / CPPS
// (inflammation) — the male mirror of interstitial cystitis.
// Run: node --test blog/pa-orientation/urinary-cpps.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES, evaluateCase } from './urinary-model.js';
import { CLINICAL } from './urinary-clinical.js';
import { PRESENTATIONS } from './urinary-presentations.js';

test('prostatitis is now the ACUTE BACTERIAL entry (infection, systemic)', () => {
  const c = CASES.prostatitis;
  assert.ok(c, 'prostatitis case exists');
  assert.equal(c.mechanism, 'infection');
  assert.match(c.label, /acute/i, 'label names the acute form');
  assert.equal(c.systemic, true);
});

test('cpps is a chronic, non-infectious inflammation of the prostate/outlet', () => {
  const c = CASES.cpps;
  assert.ok(c, 'cpps case exists');
  assert.equal(c.group, 'urethra');
  assert.equal(c.mechanism, 'inflammation');
  assert.equal(c.faultPhase, null);
});

test('evaluateCase(cpps): inflamed at the outlet, non-systemic, no flow block', () => {
  const r = evaluateCase('cpps', 'VOIDING');
  assert.equal(r.inflamed, 'urethra');
  assert.equal(r.systemic, false);
  assert.equal(r.flowBlocked, false);
});

test('cpps carries its own clinical workup', () => {
  const w = CLINICAL.cpps;
  assert.ok(w, 'cpps clinical entry exists');
  for (const f of ['history', 'exam', 'labs', 'imaging', 'treatment'])
    assert.ok(w[f] && w[f].length > 30, `cpps.${f}`);
  assert.ok(Array.isArray(w.pearls) && w.pearls.length, 'cpps pearls');
});

test('the Chronic pelvic pain presentation points at cpps (the non-bacterial form)', () => {
  const ids = PRESENTATIONS.chronic_pelvic_pain.differential.map((d) => d.caseId);
  assert.ok(ids.includes('cpps'), 'CPP differential links cpps');
});
