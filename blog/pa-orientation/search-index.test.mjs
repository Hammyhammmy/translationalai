// Site-wide search index — generation coverage + shape.
// Run: node --test blog/pa-orientation/search-index.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIndex } from './search-index-build.mjs';
import { CASES } from './urinary-model.js';
import { PRESENTATIONS } from './urinary-presentations.js';
import { ONC_CANCERS, ONC_CONCEPTS } from './urinary-oncology.js';
import { ANDRO_TOPICS } from './urinary-andrology.js';
import { TRAUMA_TOPICS } from './urinary-trauma.js';

const INDEX = await buildIndex();
const interactive = INDEX.filter((e) => e.page === 'Urinary Interactive.html');
const byKey = (tab, id) => interactive.find((e) => e.tab === tab && e.id === id);

// --- shape ------------------------------------------------------------------

test('every entry has page, label, sub, text, href', () => {
  for (const e of INDEX) {
    assert.equal(typeof e.page, 'string', 'page');
    assert.ok(e.label && typeof e.label === 'string', `label for ${e.id || e.href}`);
    assert.equal(typeof e.sub, 'string', 'sub');
    assert.ok(e.text && typeof e.text === 'string', `text for ${e.label}`);
    assert.equal(e.text, e.text.toLowerCase(), `text lowercased for ${e.label}`);
    assert.ok(e.href && typeof e.href === 'string', `href for ${e.label}`);
  }
});

// --- Interactive structured coverage ---------------------------------------

test('every presentation is indexed with a tab+id query href', () => {
  for (const id of Object.keys(PRESENTATIONS)) {
    const e = byKey('presentations', id);
    assert.ok(e, `presentation ${id} missing from index`);
    assert.equal(e.href, `Urinary Interactive.html?tab=presentations&id=${id}`);
    assert.equal(e.label, PRESENTATIONS[id].label);
  }
});

test('every condition (except normal) is indexed', () => {
  for (const id of Object.keys(CASES)) {
    if (id === 'normal') continue;
    const e = byKey('conditions', id);
    assert.ok(e, `condition ${id} missing from index`);
    assert.equal(e.href, `Urinary Interactive.html?tab=conditions&id=${id}`);
  }
});

test('a condition patient-education block is searchable', () => {
  // bph has an authored patient block; its plain-language handles should be findable
  const e = byKey('conditions', 'bph');
  assert.ok(e, 'bph present');
  assert.ok(e.text.includes('in plain words') || e.text.includes('dutasteride'),
    'patient-block text not indexed for bph');
});

test('oncology, andrology, trauma topics are indexed', () => {
  for (const id of ONC_CANCERS.concat(ONC_CONCEPTS)) {
    assert.ok(byKey('oncology', id), `oncology ${id} missing`);
  }
  for (const id of ANDRO_TOPICS) {
    assert.ok(byKey('andrology', id), `andrology ${id} missing`);
  }
  for (const id of TRAUMA_TOPICS) {
    assert.ok(byKey('trauma', id), `trauma ${id} missing`);
  }
});

test('normal physiology stations are indexed', () => {
  for (const id of ['overview', 'kidney', 'nephron', 'ureter', 'bladder', 'sphincters', 'urethra']) {
    const e = byKey('normal', id);
    assert.ok(e, `normal ${id} missing`);
  }
});

test('index text is clean of authoring markup (no ** or newlines)', () => {
  for (const e of INDEX) {
    assert.ok(!e.text.includes('**'), `bold markup leaked into index: ${e.label}`);
    assert.ok(!/[\n\r]/.test(e.text), `newline leaked into index: ${e.label}`);
  }
});

test('authored bold content is still findable by its words', () => {
  // stones management now has "**Calcium oxalate / phosphate**" — searchable as plain words
  const e = byKey('presentations', 'stone_prevention');
  assert.ok(e, 'stone_prevention present');
  assert.ok(e.text.includes('calcium oxalate'), 'bolded label words still indexed');
});

test('search text actually contains body content, not just the label', () => {
  // retention presentation should be findable by a body phrase
  const e = byKey('presentations', 'retention');
  assert.ok(e, 'retention present');
  assert.ok(e.text.includes('post-obstructive diuresis'), 'body text indexed');
});

// --- static page scraping (slice 2) ----------------------------------------

const STATIC_PAGES = [
  'Three Geometries of Failure.html',
  'The Urinary Tract.html',
  'Urology Consults.html',
  'Urology Procedures.html',
  'Urology Medications.html',
  'Urology Operations.html',
  'Urology Follow-Up.html',
  'Atlas Viewer.html',
];

test('every static page contributes at least one entry', () => {
  for (const page of STATIC_PAGES) {
    const n = INDEX.filter((e) => e.page === page).length;
    assert.ok(n >= 1, `${page} contributed ${n} entries`);
  }
});

test('static entries deep-link with a text fragment', () => {
  const statics = INDEX.filter((e) => STATIC_PAGES.includes(e.page));
  assert.ok(statics.length >= 40, `expected >=40 static entries, got ${statics.length}`);
  for (const e of statics) {
    assert.ok(e.href.startsWith(`${e.page}#:~:text=`), `bad href: ${e.href}`);
  }
});

test('clinical card titles are indexed as their own entries with body text', () => {
  // consult-title "3. Gross Hematuria" should be a discrete, body-bearing entry
  const e = INDEX.find((x) => x.page === 'Urology Consults.html' && /gross h(a)?ematuria/i.test(x.label));
  assert.ok(e, 'Gross Hematuria consult entry missing');
  assert.ok(e.text.length > e.label.length + 20, 'entry should carry section body, not just its title');
  assert.equal(e.sub, 'Consults');
});

test('html entities are decoded in labels', () => {
  const h1 = INDEX.find((x) => x.page === 'Urology Consults.html' && x.label.includes('ER'));
  assert.ok(h1, 'consults h1 present');
  assert.ok(!h1.label.includes('&amp;'), `raw entity leaked: ${h1.label}`);
});
