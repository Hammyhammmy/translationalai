// Rewrite the receptor regions of the static pages from targets.js (see targets-pages.js).
// Run before search-index-build.mjs: node targets-build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { PAGES, render } from './targets-pages.js';
for (const p of PAGES) {
  const f = new URL(p, import.meta.url), before = readFileSync(f, 'utf8'), after = render(before);
  if (after !== before) { writeFileSync(f, after); console.log('updated', p); }
}
