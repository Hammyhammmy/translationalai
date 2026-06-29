// Guard: the committed search-index.json must match what buildIndex() produces.
// If this fails, regenerate:  node blog/pa-orientation/search-index-build.mjs
// Run: node --test blog/pa-orientation/search-index-staleness.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildIndex } from './search-index-build.mjs';

const here = dirname(fileURLToPath(import.meta.url));

test('committed search-index.json is up to date with its sources', async () => {
  let committed;
  try {
    committed = JSON.parse(await readFile(join(here, 'search-index.json'), 'utf8'));
  } catch (e) {
    assert.fail('search-index.json missing or unparseable — run: node blog/pa-orientation/search-index-build.mjs');
  }
  const fresh = await buildIndex();
  assert.deepEqual(
    committed,
    fresh,
    'search-index.json is stale — regenerate with: node blog/pa-orientation/search-index-build.mjs',
  );
});
