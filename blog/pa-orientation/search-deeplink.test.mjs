// Deep-link parsing for the Interactive page (?tab=&id=).
// Run: node --test blog/pa-orientation/search-deeplink.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDeepLink } from './search-deeplink.js';

const has = (tab, id) => ({ conditions: { bph: 1 }, presentations: { retention: 1 } })[tab]?.[id];

test('valid tab + known id resolves', () => {
  assert.deepEqual(parseDeepLink('?tab=conditions&id=bph', has), { tab: 'conditions', id: 'bph' });
});

test('unknown tab is rejected', () => {
  assert.equal(parseDeepLink('?tab=nope&id=bph', has), null);
});

test('no params resolves to null', () => {
  assert.equal(parseDeepLink('', has), null);
});

test('valid tab with unknown id still switches the tab (id dropped)', () => {
  assert.deepEqual(parseDeepLink('?tab=conditions&id=bogus', has), { tab: 'conditions', id: null });
});
