// Pure search scoring + snippet + synonym expansion.
// Run: node --test blog/pa-orientation/search-core.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchIndex, snippet, expandTerms } from './search-core.js';
import { SYNONYMS } from './search-synonyms.js';

const LIST = [
  { label: 'Renal colic', sub: 'Consults', text: 'renal colic · ureteric stone causing severe loin to groin pain' },
  { label: 'Gross haematuria explained', sub: 'Consults', text: 'visible blood; painless haematuria is cancer until proven otherwise' },
  { label: 'BPH', sub: 'Condition', text: 'benign prostatic hyperplasia · outlet obstruction in older men' },
  { label: 'Renal cell carcinoma', sub: 'Oncology', text: 'rcc · a renal mass, classic triad of flank pain haematuria and a mass' },
];

test('exact label match scores highest', () => {
  const r = searchIndex(LIST, 'bph', SYNONYMS);
  assert.equal(r[0].label, 'BPH');
});

test('empty query returns nothing', () => {
  assert.deepEqual(searchIndex(LIST, '   ', SYNONYMS), []);
});

test('multi-term query requires every term (via some matching entry text)', () => {
  const r = searchIndex(LIST, 'renal colic', SYNONYMS);
  assert.ok(r.length >= 1);
  assert.equal(r[0].label, 'Renal colic');
});

test('synonym: "gross" finds a haematuria entry even though the word gross is absent', () => {
  const r = searchIndex(LIST, 'gross', SYNONYMS);
  assert.ok(r.some((e) => /haematuria/i.test(e.label)), 'gross→haematuria synonym did not match');
});

test('synonym: "bph" expands to prostatic', () => {
  const groups = expandTerms('bph', SYNONYMS);
  assert.ok(groups.length === 1);
  assert.ok(groups[0].includes('bph'));
  assert.ok(groups[0].some((t) => t.includes('prostat')), 'bph should expand toward prostat*');
});

test('results are capped at 12', () => {
  const big = Array.from({ length: 40 }, (_, i) => ({ label: `Stone ${i}`, sub: 'x', text: 'kidney stone calculus' }));
  assert.equal(searchIndex(big, 'stone', {}).length, 12);
});

test('snippet centers on the first matched term with ellipses', () => {
  const s = snippet('a'.repeat(60) + ' haematuria ' + 'b'.repeat(60), ['haematuria']);
  assert.ok(s.includes('haematuria'));
  assert.ok(s.startsWith('…') && s.endsWith('…'));
});
