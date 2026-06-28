// Tests for the Normal-teaching and Presentations registries.
// Run: node --test blog/pa-orientation/urinary-teach.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from './urinary-model.js';
import { NORMAL_TEACH, teachFor } from './urinary-normal.js';
import { PRESENTATIONS, presentationFor } from './urinary-presentations.js';

// ---- Normal teaching ----
test('normal teaching covers the core structures', () => {
  for (const id of ['kidney', 'nephron', 'ureter', 'bladder', 'sphincters', 'urethra'])
    assert.ok(NORMAL_TEACH[id], `missing structure: ${id}`);
});

test('each structure has label, teaching-depth anatomy/physiology, molecules, and pearls', () => {
  for (const [id, t] of Object.entries(NORMAL_TEACH)) {
    assert.equal(typeof t.label, 'string');
    assert.ok(t.anatomy.trim().length > 60, `${id} anatomy depth`);
    assert.ok(t.physiology.trim().length > 60, `${id} physiology depth`);
    assert.ok(Array.isArray(t.molecules), `${id} molecules array`);
    assert.ok(Array.isArray(t.pearls) && t.pearls.length, `${id} pearls`);
  }
});

test('molecule entries carry target, action and a drug link to treatment', () => {
  for (const [id, t] of Object.entries(NORMAL_TEACH)) {
    for (const m of t.molecules) {
      assert.ok(m.target && m.action && m.drug, `${id} molecule incomplete`);
    }
  }
});

test('the nephron and bladder expose their pharmacological targets', () => {
  assert.ok(NORMAL_TEACH.nephron.molecules.length >= 4, 'nephron transporters');
  assert.ok(NORMAL_TEACH.bladder.molecules.some(m => /M3|β3|b3/i.test(m.target)), 'bladder receptors');
  assert.equal(teachFor('nope'), null);
});

// ---- Presentations ----
test('the core presentations exist', () => {
  for (const id of ['retention', 'hematuria', 'renal_colic', 'acute_scrotum', 'luts'])
    assert.ok(PRESENTATIONS[id], `missing presentation: ${id}`);
});

test('each presentation has complaint, red flags, differential, workup, management, pearls', () => {
  for (const [id, p] of Object.entries(PRESENTATIONS)) {
    assert.ok(p.complaint.trim().length > 40, `${id} complaint depth`);
    assert.ok(Array.isArray(p.redFlags) && p.redFlags.length, `${id} redFlags`);
    assert.ok(Array.isArray(p.differential) && p.differential.length, `${id} differential`);
    assert.ok(Array.isArray(p.workup) && p.workup.length, `${id} workup`);
    assert.ok(p.management.trim().length > 40, `${id} management depth`);
    assert.ok(Array.isArray(p.pearls) && p.pearls.length, `${id} pearls`);
  }
});

test('every differential points to a real condition', () => {
  for (const [id, p] of Object.entries(PRESENTATIONS)) {
    for (const d of p.differential) {
      assert.ok(CASES[d.caseId], `${id}: differential references unknown case ${d.caseId}`);
      assert.ok(d.note && d.note.length, `${id}/${d.caseId} note`);
    }
  }
});

test('presentationFor returns the entry or null', () => {
  assert.ok(presentationFor('retention').workup.length > 0);
  assert.equal(presentationFor('nope'), null);
});
