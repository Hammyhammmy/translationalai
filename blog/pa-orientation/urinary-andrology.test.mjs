// Tests for the andrology registry.
// Run: node --test blog/pa-orientation/urinary-andrology.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ANDROLOGY, ANDRO_TOPICS, androFor } from './urinary-andrology.js';

test('the core andrology topics are present', () => {
  for (const id of ['hpg_axis', 'hypogonadism', 'infertility', 'varicocele', 'hcg_gonadotropins'])
    assert.ok(ANDROLOGY[id], `missing topic: ${id}`);
});

test('each topic has a label, teaching-depth sections, and pearls', () => {
  for (const id of ANDRO_TOPICS) {
    const t = ANDROLOGY[id];
    assert.equal(typeof t.label, 'string');
    assert.ok(['physiology', 'condition', 'therapy'].includes(t.kind), `${id} kind`);
    assert.ok(Array.isArray(t.sections) && t.sections.length >= 2, `${id} sections`);
    for (const s of t.sections) {
      assert.ok(s.h && s.h.length, `${id} section heading`);
      assert.ok(s.body && s.body.trim().length > 80, `${id} section depth`);
    }
    assert.ok(Array.isArray(t.pearls) && t.pearls.length, `${id} pearls`);
  }
});

test('topics with a region point at a real model station', () => {
  for (const id of ANDRO_TOPICS) {
    const r = ANDROLOGY[id].region;
    assert.ok(r === null || ['testis', 'bladder', 'urethra', 'kidney', 'ureter'].includes(r), `${id} region ${r}`);
  }
});

test('androFor returns the entry or null', () => {
  assert.equal(androFor('varicocele').kind, 'condition');
  assert.equal(androFor('nope'), null);
});
