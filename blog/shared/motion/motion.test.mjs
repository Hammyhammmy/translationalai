// The shared engine owns the animation loop and the on-screen check. A page that starts
// its own requestAnimationFrame loop or IntersectionObserver is a hand-rolled engine
// creeping back in: move it onto shared/motion/ instead.
// Run: node --test blog/shared/motion/motion.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { KIDNEY_R, KIDNEY_L, URETER_R, URETER_L, anchors } from './anatomy.js';
import { lerp, lerpRaw, smooth, easeInOut, mix, scopeIds, clamp } from './motion-core.js';

const BLOG = fileURLToPath(new URL('../../', import.meta.url));
const OWN = /requestAnimationFrame\s*\(|new\s+IntersectionObserver\s*\(/;
// Not moved onto the shared engine yet. Each entry must still need to be here:
// the test fails once a file is migrated, so the list only ever shrinks.
const NOT_YET = [];

function files(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n.startsWith('.')) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.(js|mjs|html)$/.test(n) && !n.endsWith('.test.mjs')) out.push(relative(BLOG, p));
  }
  return out;
}

test('only shared/motion runs an animation loop or on-screen observer', () => {
  const own = files(BLOG).filter(f => !f.startsWith('shared/motion/') && OWN.test(readFileSync(join(BLOG, f), 'utf8')));
  for (const f of own) assert.ok(NOT_YET.includes(f), `${f} runs its own loop/observer: use onFrame/onVisible from shared/motion/motion-core.js`);
  for (const f of NOT_YET) assert.ok(own.includes(f), `${f} no longer needs an exception: remove it from NOT_YET`);
});

test('animated scenes take time from the engine, not the wall clock', () => {
  const CLOCK = /performance\.now\s*\(|Date\.now\s*\(/;
  const scenes = ['pa-orientation/consult-motion.js', 'pa-orientation/procedure-motion.js', 'pa-orientation/tract-motion.js', 'pa-orientation/Urinary Interactive.html', 'molecular-targets/transporters.html'];
  for (const f of scenes) assert.ok(!CLOCK.test(readFileSync(join(BLOG, f), 'utf8')), `${f} reads the wall clock: accumulate dt instead, so pause and reduced motion stop it`);
});

test('maths helpers keep their exact shapes (players depend on them frame for frame)', () => {
  assert.equal(lerp(0, 10, 1.5), 10);
  assert.equal(lerpRaw(0, 10, 1.5), 15);
  assert.equal(smooth(.5), .5);
  assert.equal(smooth(-1), 0);
  assert.equal(easeInOut(.25), .125);
  assert.equal(clamp(5), 1);
  assert.equal(mix('#000000', '#ffffff', .5), '#808080');
});

test('ids and url(#) references are scoped per player', () => {
  assert.equal(scopeIds('<g id="a"></g><path marker-end="url(#ah)"/>', 'p1-'), '<g id="p1-a"></g><path marker-end="url(#p1-ah)"/>');
});

test('the Interactive page draws the shared anatomy outlines, not its own copy', () => {
  const html = readFileSync(join(BLOG, 'pa-orientation/Urinary Interactive.html'), 'utf8');
  const d = id => (html.match(new RegExp(`id="${id}" d="([^"]+)"`)) || [])[1];
  assert.equal(d('kidA'), KIDNEY_R); assert.equal(d('kidB'), KIDNEY_L);
  for (const id of ['urA', 'dilA']) assert.equal(d(id), URETER_R, id);
  for (const id of ['urB', 'dilB']) assert.equal(d(id), URETER_L, id);
});

test('named points move with the outlet', () => {
  assert.deepEqual(anchors('male').sphincters, [200, 557]);
  assert.deepEqual(anchors('female').exit, [200, 562]);
});
