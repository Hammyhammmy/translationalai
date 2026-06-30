// Patient-education block: labelled HTML + clean copy text.
// Run: node --test blog/pa-orientation/patient.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { patientHTML, patientCopyText } from './patient.js';

const DISEASE = {
  whatItIs: 'An enlarged prostate — **BPH** — not a cancer.',
  whyItMatters: 'It surrounds the urethra and narrows the flow.',
  whatIsDone: 'An **alpha-blocker** relaxes the muscle; **TURP** if needed.',
  whatToWatch: 'Sudden inability to pass urine is an emergency.',
};
const NORMAL = {
  whatItIs: 'A bean-shaped organ that filters blood.',
  whatItDoes: 'Clears waste and balances salts.',
  howKeptWell: 'Hydration and blood-pressure control.',
  whatToWatch: 'Swelling or blood in the urine.',
};

test('empty/undefined yields empty string', () => {
  assert.equal(patientHTML(undefined), '');
  assert.equal(patientHTML(null), '');
  assert.equal(patientHTML({}), '');
});

test('disease block renders the four labels in order', () => {
  const h = patientHTML(DISEASE);
  const order = ['What it is', 'Why it matters', 'What is done', 'What to watch for'];
  let last = -1;
  for (const lbl of order) {
    const at = h.indexOf(lbl);
    assert.ok(at > last, `label "${lbl}" missing or out of order`);
    last = at;
  }
  assert.ok(!h.includes('What it does'), 'disease block should not show normal-variant labels');
});

test('normal-anatomy block uses the adapted labels', () => {
  const h = patientHTML(NORMAL);
  for (const lbl of ['What it is', 'What it does', 'How it is kept well', 'What to watch for']) {
    assert.ok(h.includes(lbl), `normal label "${lbl}" missing`);
  }
  assert.ok(!h.includes('What is done'), 'normal block should not show disease-variant labels');
});

test('bold handles render via prose(); no raw ** survives', () => {
  const h = patientHTML(DISEASE);
  assert.ok(h.includes('<b>BPH</b>'), 'bold not rendered');
  assert.ok(!h.includes('**'), 'raw ** leaked');
});

test('block has the In-plain-words title, a Copy button, and a safety footer', () => {
  const h = patientHTML(DISEASE);
  assert.ok(/in plain words/i.test(h), 'missing title');
  assert.ok(/class="pat-copy"/.test(h), 'missing copy button');
  assert.ok(/clinician will tailor/i.test(h), 'missing safety footer');
});

test('copy text is clean "Label: text" lines, no markup or HTML', () => {
  const t = patientCopyText(DISEASE);
  const lines = t.split('\n');
  assert.equal(lines[0], 'What it is: An enlarged prostate — BPH — not a cancer.');
  assert.equal(lines[2], 'What is done: An alpha-blocker relaxes the muscle; TURP if needed.');
  assert.ok(!t.includes('**'), 'markup leaked into copy text');
  assert.ok(!t.includes('<'), 'HTML leaked into copy text');
});

test('copy text honours the normal-variant labels and order', () => {
  const t = patientCopyText(NORMAL);
  assert.ok(t.startsWith('What it is: '), 'wrong first label');
  assert.ok(t.includes('\nHow it is kept well: '), 'missing normal label');
});
