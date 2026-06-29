// Slice 4 — worst-offender prose fields are authored with paragraph breaks + bold.
// Run: node --test blog/pa-orientation/prose-authored.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prose, plain } from './prose.js';
import { PRESENTATIONS } from './urinary-presentations.js';
import { NORMAL_TEACH } from './urinary-normal.js';
import { ANDROLOGY } from './urinary-andrology.js';

// management blocks that should now be paragraphed + bold-labelled
const AUTHORED_MGMT = ['stone_prevention', 'retention', 'renal_colic', 'chronic_pelvic_pain', 'luts', 'acute_scrotum', 'hematuria'];

test('authored management blocks render as multiple paragraphs with bold labels', () => {
  for (const k of AUTHORED_MGMT) {
    const raw = PRESENTATIONS[k].management;
    assert.ok(raw.includes('\n\n'), `${k}: no paragraph break authored`);
    assert.ok(raw.includes('**'), `${k}: no bold label authored`);
    const html = prose(raw);
    assert.ok((html.match(/<p>/g) || []).length >= 2, `${k}: prose() produced <2 paragraphs`);
    assert.ok(html.includes('<b>'), `${k}: prose() produced no bold`);
  }
});

test('flagship narrative walls are split into paragraphs', () => {
  assert.ok(NORMAL_TEACH.nephron.physiology.includes('\n\n'), 'nephron physiology not paragraphed');
  assert.ok(ANDROLOGY.varicocele.sections[3].body.includes('\n\n'), 'varicocele body not paragraphed');
});

test('authoring did not strand raw markup in the plain text (round-trips clean)', () => {
  for (const k of AUTHORED_MGMT) {
    const p = plain(PRESENTATIONS[k].management);
    assert.ok(!p.includes('**'), `${k}: ** survived plain()`);
    assert.ok(!p.includes('\n'), `${k}: newline survived plain()`);
  }
});
