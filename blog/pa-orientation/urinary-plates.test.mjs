// Slice A — tests for the atlas-plate registry that the interactive overlay reads.
// Run: node --test blog/pa-orientation/urinary-plates.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from './urinary-model.js';
import { PLATES, CASE_PLATE, plateForCase } from './urinary-plates.js';

const within01 = (n) => typeof n === 'number' && n >= 0 && n <= 1;

// --- registry integrity -----------------------------------------------------

test('every PLATES entry has a src, natural dimensions, label, and station hotspots', () => {
  for (const [id, p] of Object.entries(PLATES)) {
    assert.match(p.src, /^images\/atlas.*\.jpg$/, `${id} src`);
    assert.ok(p.w > 0 && p.h > 0, `${id} dimensions`);
    assert.equal(typeof p.label, 'string');
    assert.ok(p.stations && Object.keys(p.stations).length > 0, `${id} stations`);
  }
});

test('every station hotspot is a normalized in-bounds coordinate', () => {
  for (const [id, p] of Object.entries(PLATES)) {
    for (const [s, c] of Object.entries(p.stations)) {
      assert.ok(within01(c.x) && within01(c.y), `${id}.${s} coord out of [0,1]`);
    }
  }
});

// --- case -> plate mapping --------------------------------------------------

// Plates are optional companions to the vector model, not required for every
// catalog case — so validate the mappings that exist, not full coverage.
test('every plate-mapped case points to a known case and a known plate', () => {
  for (const [id, plateId] of Object.entries(CASE_PLATE)) {
    assert.ok(CASES[id], `plate mapping for unknown case ${id}`);
    assert.ok(PLATES[plateId], `case ${id} -> unknown plate ${plateId}`);
  }
});

test('plateForCase(normal) returns the male overview plate with prostate + bladder hotspots', () => {
  const p = plateForCase('normal');
  assert.equal(p.id, 'atlas1-p02');
  assert.match(p.src, /atlas1-p02/);
  assert.ok(p.stations.prostate, 'overview must label the prostate');
  assert.ok(p.stations.bladder && p.stations.kidney);
  assert.equal(p.annotation, null); // normal has no lesion callout
});

test('plateForCase(bph) -> BPH plate, lesion annotation at the prostate', () => {
  const p = plateForCase('bph');
  assert.equal(p.id, 'atlas2-p01');
  assert.ok(p.annotation, 'BPH must have a lesion annotation');
  assert.equal(p.annotation.station, 'prostate');
  assert.ok(within01(p.annotation.x) && within01(p.annotation.y));
});

test('plateForCase(ureteral_stone) -> upper-tract plate, lesion at the ureter', () => {
  const p = plateForCase('ureteral_stone');
  assert.equal(p.id, 'atlas2-p03');
  assert.equal(p.annotation.station, 'ureter');
  assert.ok(p.stations.kidney, 'must be able to highlight the hydronephrotic kidney upstream');
});

test('plateForCase(bladder_hematuria) -> bladder plate, lesion at the bladder', () => {
  const p = plateForCase('bladder_hematuria');
  assert.equal(p.id, 'atlas2-p04');
  assert.equal(p.annotation.station, 'bladder');
});

// --- cross-registry invariant ----------------------------------------------

test("each case's lesion annotation sits on a station the plate actually labels", () => {
  for (const id of Object.keys(CASE_PLATE)) {
    const p = plateForCase(id);
    if (!p.annotation) continue;
    assert.ok(
      p.stations[p.annotation.station],
      `${id}: annotation station "${p.annotation.station}" missing from plate ${p.id} hotspots`,
    );
    assert.ok(within01(p.annotation.x) && within01(p.annotation.y), `${id} annotation coord`);
  }
});

test('plateForCase throws on an unknown case', () => {
  assert.throws(() => plateForCase('not_a_case'));
});
