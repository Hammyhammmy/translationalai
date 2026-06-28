// Unit tests for the urinary physiology engine (urinary-model.js).
// Pure logic, no DOM/Three.js. Run: node --test blog/pa-orientation/urinary-model.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STATIONS,
  PHASES,
  nextPhase,
  CASES,
  evaluateCase,
} from './urinary-model.js';

// ---------------------------------------------------------------------------
// Slice 1 — engine core: stations, flow order, phase state machine, innervation
// ---------------------------------------------------------------------------

test('STATIONS are the four conduit stations in flow order', () => {
  assert.deepEqual(STATIONS, ['kidney', 'ureter', 'bladder', 'urethra']);
});

test('flow is one-way: kidney is upstream of urethra', () => {
  assert.ok(STATIONS.indexOf('kidney') < STATIONS.indexOf('urethra'));
  assert.ok(STATIONS.indexOf('ureter') < STATIONS.indexOf('bladder'));
});

test('B2 storage phase is sympathetic: detrusor relaxed, internal sphincter closed', () => {
  const s = PHASES.STORAGE;
  assert.equal(s.division, 'sympathetic');
  assert.equal(s.nerveRoots, 'T10-L2');
  assert.equal(s.detrusor, 'relaxed');
  assert.equal(s.internalSphincter, 'closed');
  assert.equal(s.externalSphincter, 'contracted');
});

test('B3 voiding phase is parasympathetic: detrusor contracts, sphincters open', () => {
  const v = PHASES.VOIDING;
  assert.equal(v.division, 'parasympathetic');
  assert.equal(v.nerveRoots, 'S2-S4');
  assert.equal(v.detrusor, 'contracted');
  assert.equal(v.internalSphincter, 'open');
  assert.equal(v.externalSphincter, 'relaxed');
});

test('B4 phase toggle flips storage <-> voiding', () => {
  assert.equal(nextPhase('STORAGE'), 'VOIDING');
  assert.equal(nextPhase('VOIDING'), 'STORAGE');
});

test('normal flow exits only during voiding, stores during storage', () => {
  assert.equal(evaluateCase('normal', 'STORAGE').exitFlow, 'none');
  assert.equal(evaluateCase('normal', 'VOIDING').exitFlow, 'normal');
});

test('normal case has no lesion, no dilation, no silence, normal-colored urine', () => {
  const r = evaluateCase('normal', 'VOIDING');
  assert.equal(r.lesionStation, null);
  assert.equal(r.flowBlocked, false);
  assert.deepEqual(r.dilatedStations, []);
  assert.deepEqual(r.silentStations, []);
  assert.equal(r.particleColor, 'normal');
  assert.equal(r.hydronephrosis, false);
});

// ---------------------------------------------------------------------------
// Slice 2 — obstruction model: dilation strictly above the lesion, silence below
// ---------------------------------------------------------------------------

test('U1 ureteral stone: lesion at ureter, flow blocked', () => {
  const r = evaluateCase('ureteral_stone', 'VOIDING');
  assert.equal(r.lesionStation, 'ureter');
  assert.equal(r.mechanism, 'obstruction');
  assert.equal(r.flowBlocked, true);
});

test('U1 ureteral stone: hydronephrosis (kidney dilates), bladder does NOT distend', () => {
  const r = evaluateCase('ureteral_stone', 'VOIDING');
  assert.deepEqual(r.dilatedStations, ['kidney']); // strictly above the ureter
  assert.equal(r.hydronephrosis, true);
  assert.equal(r.bladderDistension, false); // bladder is downstream of the stone
  assert.equal(r.renalImpact, true);
});

test('U1 ureteral stone: downstream stations go silent', () => {
  const r = evaluateCase('ureteral_stone', 'VOIDING');
  assert.deepEqual(r.silentStations, ['bladder', 'urethra']);
});

test('E1 BPH: lesion at urethra/outlet, flow blocked at exit', () => {
  const r = evaluateCase('bph', 'VOIDING');
  assert.equal(r.lesionStation, 'urethra');
  assert.equal(r.mechanism, 'obstruction');
  assert.equal(r.flowBlocked, true);
  assert.equal(r.exitFlow, 'blocked');
});

test('E1 BPH: back-pressure reaches the kidney, bladder distends', () => {
  const r = evaluateCase('bph', 'VOIDING');
  // everything strictly above the urethra is under back-pressure
  assert.deepEqual(r.dilatedStations, ['kidney', 'ureter', 'bladder']);
  assert.equal(r.bladderDistension, true);
  assert.equal(r.hydronephrosis, true);
  assert.equal(r.renalImpact, true);
  assert.deepEqual(r.silentStations, []); // nothing below the outlet
});

test('obstruction invariant: lesion station is neither dilated nor silent; sets never overlap', () => {
  for (const id of ['ureteral_stone', 'bph']) {
    const r = evaluateCase(id, 'VOIDING');
    assert.ok(!r.dilatedStations.includes(r.lesionStation));
    assert.ok(!r.silentStations.includes(r.lesionStation));
    const overlap = r.dilatedStations.filter((s) => r.silentStations.includes(s));
    assert.deepEqual(overlap, []);
  }
});

// ---------------------------------------------------------------------------
// Slice 3 — bleeding model: hematuria recolors particles, no obstruction
// ---------------------------------------------------------------------------

test('BL1 bladder hematuria: urine recolors blood from the bladder downstream', () => {
  const r = evaluateCase('bladder_hematuria', 'VOIDING');
  assert.equal(r.lesionStation, 'bladder');
  assert.equal(r.mechanism, 'bleeding');
  assert.equal(r.particleColor, 'blood');
  assert.equal(r.particleColorFrom, 'bladder');
});

test('BL1 bladder hematuria: no obstruction, no dilation, flow continues', () => {
  const r = evaluateCase('bladder_hematuria', 'VOIDING');
  assert.equal(r.flowBlocked, false);
  assert.deepEqual(r.dilatedStations, []);
  assert.equal(r.hydronephrosis, false);
});

// ---------------------------------------------------------------------------
// Case registry sanity
// ---------------------------------------------------------------------------

test('all prototype cases are registered', () => {
  for (const id of ['normal', 'ureteral_stone', 'bladder_hematuria', 'bph']) {
    assert.ok(CASES[id], `missing case: ${id}`);
    assert.equal(typeof CASES[id].label, 'string');
  }
});
