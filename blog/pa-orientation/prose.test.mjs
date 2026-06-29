// Pure prose mini-formatter: escape, **bold**, \n\n paragraphs.
// Run: node --test blog/pa-orientation/prose.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prose, plain } from './prose.js';

test('a string with no breaks becomes a single paragraph (backward compatible)', () => {
  assert.equal(prose('Just one sentence.'), '<p>Just one sentence.</p>');
});

test('double newline splits into separate paragraphs', () => {
  assert.equal(prose('First para.\n\nSecond para.'), '<p>First para.</p><p>Second para.</p>');
});

test('three or more newlines collapse to one paragraph break', () => {
  assert.equal(prose('A.\n\n\n\nB.'), '<p>A.</p><p>B.</p>');
});

test('**bold** becomes <b> within a paragraph', () => {
  assert.equal(prose('**Calcium** — thiazide.'), '<p><b>Calcium</b> — thiazide.</p>');
});

test('HTML special characters are escaped (no injection)', () => {
  assert.equal(prose('output >2 L/day & <stuff>'), '<p>output &gt;2 L/day &amp; &lt;stuff&gt;</p>');
});

test('bold markers are not left raw, and escaping happens before bolding', () => {
  const out = prose('**<x>** ok');
  assert.equal(out, '<p><b>&lt;x&gt;</b> ok</p>');
  assert.ok(!out.includes('**'), 'no raw ** left');
});

test('empty / whitespace-only input yields empty string', () => {
  assert.equal(prose(''), '');
  assert.equal(prose('   \n\n  '), '');
});

test('plain() strips bold markers and collapses newlines for indexing', () => {
  assert.equal(plain('**Calcium** — thiazide.\n\nUric acid — citrate.'), 'Calcium — thiazide. Uric acid — citrate.');
});

test('plain() leaves a plain string unchanged (aside from whitespace)', () => {
  assert.equal(plain('simple text'), 'simple text');
});
