// targets.js is the one source for receptor/enzyme facts. These checks keep the figure's tags,
// the conditions, the Normal tab and the Medications page from drifting away from it.
// Run: node --test blog/pa-orientation/targets.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TARGETS, CYCLE_TARGETS, isActive, moleculeRow, keyRow } from './targets.js';
import { SCENES } from './urinary-motion.js';
import { NORMAL_TEACH } from './urinary-normal.js';
import { anchors } from '../shared/motion/anatomy.js';

const read = f => readFileSync(new URL(f, import.meta.url), 'utf8');

test('every target is complete and points at a real place on the figure', () => {
  const A = anchors('male');
  for (const [id, t] of Object.entries(TARGETS)) {
    for (const k of ['tag', 'name', 'where', 'color', 'effect']) assert.ok(t[k], `${id}.${k}`);
    for (const a of t.at) assert.ok(A[a], `${id}: unknown anatomy point ${a}`);
    assert.ok(t.drugs.length || t.care, `${id}: no drug and no care line`);
    for (const d of t.drugs) assert.ok(d.examples.length && d.cls && d.use && ['block', 'stimulate', 'inhibit'].includes(d.act), `${id}: drug entry`);
    if (t.nerve) for (const k of ['system', 'level', 'messenger']) assert.ok(t[k], `${id}.${k}`);
    assert.ok(keyRow(id).html.includes(t.name));
  }
});

test('the fill–void receptors light up in the right phase', () => {
  assert.deepEqual(CYCLE_TARGETS.filter(id => isActive(id, 'fill')), ['B3', 'A1A', 'N']);
  assert.deepEqual(CYCLE_TARGETS.filter(id => isActive(id, 'void')), ['M3']);
  assert.ok(isActive('M3', 'urge') && !isActive('B3', 'urge'), 'an urge is an early M3 squeeze');
});

test('conditions only name targets the figure can draw', () => {
  const engine = read('./tract-motion.js');
  for (const [id, s] of Object.entries(SCENES)) for (const t of s.targets || []) {
    assert.ok(TARGETS[t], `${id}: unknown target ${t}`);
    assert.ok(engine.includes(`id==='${t}'`), `${id}: tract-motion.js has no position for ${t}`);
    if (TARGETS[t].male) assert.ok(s.male, `${id}: ${t} needs male anatomy`);
  }
  assert.deepEqual(SCENES.bph.targets, ['A1A', 'AR5']);
  assert.deepEqual(SCENES.detrusor_overactivity.targets, ['M3', 'B3']);
});

test('the Normal tab rows for receptors and enzymes come from targets.js', () => {
  const rows = Object.values(NORMAL_TEACH).flatMap(t => t.molecules);
  for (const id of Object.keys(TARGETS)) {
    const r = rows.find(m => m.id === id);
    assert.ok(r, `Normal tab has no ${id} row`);
    assert.deepEqual(r, moleculeRow(id));
  }
  // and no hand-typed copy of a target's name sits beside them
  const hand = rows.filter(m => !m.id).map(m => m.target).join(' | ');
  assert.doesNotMatch(hand, /\b(M3|β3|α1|nicotinic|5α-reductase|PDE5)\b/i, `hand-typed receptor row: ${hand}`);
});

test('every drug the figure names is covered on the Medications page', () => {
  const meds = read('./Urology Medications.html').toLowerCase();
  for (const [id, t] of Object.entries(TARGETS)) for (const d of t.drugs) for (const x of d.examples)
    assert.ok(meds.includes(x.toLowerCase()), `${id}: ${x} is not on Urology Medications.html`);
});

test('the engines that draw the tags load (a syntax slip blanks the whole figure)', async () => {
  for (const m of ['./tract-motion.js', '../shared/motion/target-tags.js']) await import(m);
});
