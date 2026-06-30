// Hardware catalog — shape, coverage, station validity.
// Run: node --test blog/pa-orientation/urinary-hardware.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HARDWARE, HW_GROUPS, hardwareFor } from './urinary-hardware.js';

const ids = Object.keys(HARDWARE);
const VALID_STATIONS = ['kidney', 'ureter', 'bladder', 'prostate', 'urethra', 'external'];
const PATIENT_KEYS = ['whatItIs', 'whyItMatters', 'whatIsDone', 'whatToWatch'];

test('catalog has the 10 core devices incl. the stent', () => {
  assert.ok(ids.length >= 10, `expected >=10 devices, got ${ids.length}`);
  assert.ok(HARDWARE.ureteric_stent, 'ureteric_stent must exist');
});

test('every device has id, label, a valid group, clinician fields, and pearls', () => {
  for (const id of ids) {
    const d = HARDWARE[id];
    assert.equal(d.id, id, `${id}: id mismatch`);
    assert.ok(d.label && typeof d.label === 'string', `${id}: label`);
    assert.ok(HW_GROUPS.some((g) => g.key === d.group), `${id}: bad group ${d.group}`);
    for (const f of ['whatItSits', 'whyPlaced', 'howWorks']) {
      assert.ok(typeof d[f] === 'string' && d[f].trim(), `${id}: ${f} empty`);
    }
    assert.ok(Array.isArray(d.complications) && d.complications.length, `${id}: complications`);
    assert.ok(Array.isArray(d.pearls) && d.pearls.length, `${id}: pearls`);
  }
});

test('every device maps to valid tract stations for the figure overlay', () => {
  for (const id of ids) {
    const st = HARDWARE[id].stations;
    assert.ok(Array.isArray(st) && st.length, `${id}: stations missing`);
    for (const s of st) assert.ok(VALID_STATIONS.includes(s), `${id}: invalid station ${s}`);
  }
});

test('every device has a patient In-plain-words block', () => {
  for (const id of ids) {
    const p = HARDWARE[id].patient;
    assert.ok(p && typeof p === 'object', `${id}: missing patient block`);
    for (const k of PATIENT_KEYS) assert.ok(p[k] && p[k].trim(), `${id}: patient.${k}`);
  }
});

test('every group key is non-empty and used by at least one device', () => {
  for (const g of HW_GROUPS) {
    assert.ok(g.key && g.label, 'group needs key+label');
    assert.ok(ids.some((id) => HARDWARE[id].group === g.key), `group ${g.key} unused`);
  }
});

test('hardwareFor returns the device or null', () => {
  assert.equal(hardwareFor('ureteric_stent').id, 'ureteric_stent');
  assert.equal(hardwareFor('nope'), null);
});
