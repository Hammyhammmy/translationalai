// The figure earns its place only where the model teaches something spatial.
// showsFigure() is the single source of truth; pain/hormonal/concept pages opt
// out with noFigure:true and get content full-width.
// Run: node --test blog/pa-orientation/urinary-figure.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { showsFigure } from './urinary-figure.js';
import { CASES } from './urinary-model.js';
import { ANDROLOGY } from './urinary-andrology.js';
import { NORMAL_TEACH } from './urinary-normal.js';

test('spatial conditions keep the figure', () => {
  assert.equal(showsFigure({ tab: 'conditions', entry: CASES.ureteral_stone }), true);
  assert.equal(showsFigure({ tab: 'conditions', entry: CASES.bph }), true);
});

test('the Normal physiology view always shows the model', () => {
  assert.equal(showsFigure({ tab: 'normal', entry: NORMAL_TEACH.kidney }), true);
});

test('pain syndromes suppress the figure (noFigure flag)', () => {
  assert.equal(showsFigure({ tab: 'conditions', entry: CASES.interstitial_cystitis }), false);
  assert.equal(showsFigure({ tab: 'conditions', entry: CASES.cpps }), false);
});

test('male infertility suppresses the figure even though it has a region', () => {
  assert.equal(ANDROLOGY.infertility.region, 'testis'); // has a region…
  assert.equal(showsFigure({ tab: 'andrology', entry: ANDROLOGY.infertility }), false); // …but still hidden
});

test('varicocele keeps the figure (genuinely scrotal/spatial)', () => {
  assert.equal(showsFigure({ tab: 'andrology', entry: ANDROLOGY.varicocele }), true);
});

test('non-spatial andrology (no region, no image) is suppressed', () => {
  assert.equal(showsFigure({ tab: 'andrology', entry: ANDROLOGY.hpg_axis }), false);
  assert.equal(showsFigure({ tab: 'andrology', entry: ANDROLOGY.erectile_dysfunction }), false);
});

test('oncology concept hides without a plate, shows with one', () => {
  const concept = { kind: 'concept' };
  assert.equal(showsFigure({ tab: 'oncology', entry: concept, hasImage: false }), false);
  assert.equal(showsFigure({ tab: 'oncology', entry: concept, hasImage: true }), true);
});

test('the suppress flags are set on the data entries', () => {
  assert.equal(CASES.interstitial_cystitis.noFigure, true);
  assert.equal(CASES.cpps.noFigure, true);
  assert.equal(ANDROLOGY.infertility.noFigure, true);
});
