// Tests for the GU trauma registry.
// Run: node --test blog/pa-orientation/urinary-trauma.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAUMA, TRAUMA_TOPICS, traumaFor } from './urinary-trauma.js';

test('the GU trauma topics are present', () => {
  for (const id of ['renal_trauma', 'bladder_trauma', 'urethral_trauma', 'testicular_trauma'])
    assert.ok(TRAUMA[id], `missing topic: ${id}`);
});

test('each trauma topic has teaching-depth sections, a model region, and pearls', () => {
  for (const id of TRAUMA_TOPICS) {
    const t = TRAUMA[id];
    assert.equal(typeof t.label, 'string');
    assert.ok(['kidney', 'bladder', 'urethra', 'testis'].includes(t.region), `${id} region`);
    assert.ok(Array.isArray(t.sections) && t.sections.length >= 2, `${id} sections`);
    for (const s of t.sections) {
      assert.ok(s.h && s.h.length, `${id} section heading`);
      assert.ok(s.body && s.body.trim().length > 80, `${id} section depth`);
    }
    assert.ok(Array.isArray(t.pearls) && t.pearls.length, `${id} pearls`);
  }
});

test('traumaFor returns the entry or null', () => {
  assert.equal(traumaFor('urethral_trauma').region, 'urethra');
  assert.equal(traumaFor('nope'), null);
});
