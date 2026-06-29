// Tests for the GU trauma registry.
// Run: node --test blog/pa-orientation/urinary-trauma.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRAUMA, TRAUMA_TOPICS, traumaFor, TRAUMA_FIGURE } from './urinary-trauma.js';

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

// The interactive figure draws each injury as its SIGN (haematuria, leak, blood at meatus,
// haematocele). Every trauma topic must declare a consequence overlay, or it would silently
// fall back to a bare circle — the exact failure this whole feature exists to fix.
test('every trauma topic has a figure consequence descriptor', () => {
  const STATIONS = ['kidney', 'ureter', 'bladder', 'prostate', 'urethra', 'testis'];
  for (const id of TRAUMA_TOPICS) {
    const f = TRAUMA_FIGURE[id];
    assert.ok(f, `${id} missing TRAUMA_FIGURE entry`);
    assert.ok(STATIONS.includes(f.mark), `${id}.mark must be a known station, got ${f.mark}`);
    assert.ok(Array.isArray(f.callout) && f.callout.length === 2, `${id}.callout must be 2 plain-word lines`);
    f.callout.forEach((line) => assert.ok(line && line.trim().length, `${id}.callout line empty`));
    // 'blood' (haematuria stream) only makes sense where the station feeds the conduit downward
    if (f.blood) assert.ok(['kidney', 'ureter', 'bladder'].includes(f.mark), `${id}.blood needs an upper-tract mark`);
  }
});

test('the urethral overlay carries the golden rule', () => {
  const u = TRAUMA_FIGURE.urethral_trauma;
  assert.ok(u.meatusBlood, 'urethral injury shows blood at the meatus');
  assert.ok(u.highRiding, 'urethral injury shows a high-riding prostate');
  assert.ok(u.callout.some((l) => /catheter/i.test(l)), 'the do-not-catheterise rule must be on the figure');
});
