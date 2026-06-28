// Slice — full ~30-case catalog + mechanism consequences.
// Run: node --test blog/pa-orientation/urinary-catalog.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STATIONS, CASES, MECHANISMS, evaluateCase } from './urinary-model.js';

const ids = Object.keys(CASES);
const within = (s) => STATIONS.includes(s) || s === 'neural' || s === 'testis' || s === null;

// --- catalog shape ----------------------------------------------------------

test('catalog has ~30 cases incl. normal', () => {
  assert.ok(ids.length >= 28, `expected >=28 cases, got ${ids.length}`);
  assert.ok(CASES.normal, 'normal must exist');
});

test('every case has id, label, group, mechanism, a valid station, and a note', () => {
  for (const id of ids) {
    const c = CASES[id];
    assert.equal(c.id, id);
    assert.equal(typeof c.label, 'string');
    assert.ok(c.label.length, `${id} label`);
    assert.ok(['kidney','ureter','bladder','control','urethra','scrotum'].includes(c.group), `${id} group`);
    assert.ok(MECHANISMS.includes(c.mechanism), `${id} mechanism ${c.mechanism}`);
    assert.ok(within(c.lesionStation), `${id} lesionStation ${c.lesionStation}`);
    assert.equal(typeof c.note, 'string');
    assert.ok(c.note.length, `${id} note`);
  }
});

test('evaluateCase resolves every case in both phases without throwing', () => {
  for (const id of ids) {
    for (const ph of ['STORAGE','VOIDING']) {
      const r = evaluateCase(id, ph);
      assert.equal(r.caseId, id);
      assert.equal(r.phase, ph);
    }
  }
});

test('obstruction invariant holds for every obstruction case with a conduit lesion', () => {
  for (const id of ids) {
    const r = evaluateCase(id, 'VOIDING');
    if (r.mechanism !== 'obstruction' || !STATIONS.includes(r.lesionStation)) continue;
    assert.equal(r.flowBlocked, true, `${id} should block`);
    assert.ok(!r.dilatedStations.includes(r.lesionStation), `${id} lesion not dilated`);
    assert.ok(!r.silentStations.includes(r.lesionStation), `${id} lesion not silent`);
    assert.deepEqual(r.dilatedStations.filter(s => r.silentStations.includes(s)), [], `${id} no overlap`);
  }
});

// --- backward compatibility (existing 4 cases unchanged) --------------------

test('existing cases keep their behavior', () => {
  const stone = evaluateCase('ureteral_stone','VOIDING');
  assert.deepEqual(stone.dilatedStations, ['kidney']);
  assert.equal(stone.hydronephrosis, true);
  const bph = evaluateCase('bph','VOIDING');
  assert.equal(bph.bladderDistension, true);
  assert.equal(bph.exitFlow, 'blocked');
  const hema = evaluateCase('bladder_hematuria','VOIDING');
  assert.equal(hema.particleColor, 'blood');
});

// --- per-mechanism representatives ------------------------------------------

test('bleeding (glomerular hematuria): blood from the kidney down, no obstruction', () => {
  const r = evaluateCase('glomerular_hematuria','VOIDING');
  assert.equal(r.mechanism, 'bleeding');
  assert.equal(r.particleColor, 'blood');
  assert.equal(r.particleColorFrom, 'kidney');
  assert.equal(r.flowBlocked, false);
});

test('infection: pyelonephritis is systemic+inflamed at the kidney; cystitis is local', () => {
  const pyelo = evaluateCase('pyelonephritis','VOIDING');
  assert.equal(pyelo.mechanism, 'infection');
  assert.equal(pyelo.inflamed, 'kidney');
  assert.equal(pyelo.systemic, true);
  const cyst = evaluateCase('cystitis','VOIDING');
  assert.equal(cyst.inflamed, 'bladder');
  assert.equal(cyst.systemic, false);
});

test('malignancy: renal mass marks a mass and painless hematuria', () => {
  const r = evaluateCase('renal_mass','VOIDING');
  assert.equal(r.mechanism, 'malignancy');
  assert.equal(r.mass, 'kidney');
  assert.equal(r.particleColor, 'blood');
});

test('reflux: vesicoureteral reflux reverses flow toward the kidney', () => {
  const r = evaluateCase('vesicoureteral_reflux','VOIDING');
  assert.equal(r.mechanism, 'reflux');
  assert.equal(r.flowReversed, true);
  assert.equal(r.refluxTo, 'kidney');
});

test('neurogenic LMN retains (distended bladder); UMN is functional/high-pressure', () => {
  const lmn = evaluateCase('neurogenic_lmn','VOIDING');
  assert.equal(lmn.mechanism, 'neurogenic');
  assert.equal(lmn.functional, true);
  assert.equal(lmn.bladderDistension, true);
  const umn = evaluateCase('neurogenic_umn','VOIDING');
  assert.equal(umn.functional, true);
});

test('detrusor-sphincter dyssynergia is a functional outlet obstruction (back-pressure)', () => {
  const r = evaluateCase('detrusor_sphincter_dyssynergia','VOIDING');
  assert.equal(r.flowBlocked, true);
  assert.equal(r.functional, true);
  assert.ok(r.dilatedStations.includes('bladder'), 'back-pressure reaches the bladder');
});

test('incontinence: stress incontinence leaks at the outlet, no obstruction', () => {
  const r = evaluateCase('stress_incontinence','VOIDING');
  assert.equal(r.mechanism, 'incontinence');
  assert.equal(r.flowBlocked, false);
  assert.equal(r.exitFlow, 'leak');
});

test('structural: bladder diverticulum marks a structural lesion, no obstruction', () => {
  const r = evaluateCase('bladder_diverticulum','VOIDING');
  assert.equal(r.mechanism, 'structural');
  assert.equal(r.structuralAt, 'bladder');
  assert.equal(r.flowBlocked, false);
});

test('overactivity: detrusor overactivity is a functional storage failure', () => {
  const r = evaluateCase('detrusor_overactivity','VOIDING');
  assert.equal(r.mechanism, 'overactivity');
  assert.equal(r.functional, true);
  assert.equal(r.flowBlocked, false);
});

// --- fault phase (phase is intrinsic to a condition, not a free toggle) ---

test('every case has faultPhase of null | storage | voiding', () => {
  for (const id of ids) assert.ok([null,'storage','voiding'].includes(CASES[id].faultPhase), `${id}: ${CASES[id].faultPhase}`);
});

test('storage-phase problems are pinned to storage', () => {
  for (const id of ['detrusor_overactivity','stress_incontinence','neurogenic_umn'])
    assert.equal(CASES[id].faultPhase, 'storage', `${id}`);
});

test('voiding-phase problems are pinned to voiding', () => {
  for (const id of ['bph','urethral_stone','urethral_stricture','meatal_stenosis',
                    'posterior_urethral_valve','detrusor_sphincter_dyssynergia',
                    'vesicoureteral_reflux','neurogenic_lmn'])
    assert.equal(CASES[id].faultPhase, 'voiding', `${id}`);
});

test('upper-tract and non-functional cases have no fault phase', () => {
  for (const id of ['glomerular_hematuria','pyelonephritis','renal_mass','staghorn_stone',
                    'ureteral_stone','ureteral_stricture','ureteral_compression',
                    'cystitis','bladder_hematuria','urothelial_carcinoma','prostatitis'])
    assert.equal(CASES[id].faultPhase, null, `${id}`);
});

test('evaluateCase echoes faultPhase', () => {
  for (const id of ids) assert.equal(evaluateCase(id,'VOIDING').faultPhase, CASES[id].faultPhase, `${id}`);
});

// --- testicular / scrotal subsystem (not a conduit; vascular / infective) ---

test('vascular is a registered mechanism', () => {
  assert.ok(MECHANISMS.includes('vascular'));
});

test('testicular torsion is a vascular, ischemic, phase-less scrotal emergency', () => {
  const c = CASES.testicular_torsion;
  assert.ok(c, 'torsion case exists');
  assert.equal(c.group, 'scrotum');
  assert.equal(c.mechanism, 'vascular');
  assert.equal(c.lesionStation, 'testis');
  assert.equal(c.faultPhase, null);
  const r = evaluateCase('testicular_torsion','VOIDING');
  assert.equal(r.ischemic, true);
  assert.equal(r.flowBlocked, false); // not a urinary conduit obstruction
});

test('epididymo-orchitis is a scrotal infection inflaming the testis', () => {
  const c = CASES.epididymo_orchitis;
  assert.ok(c);
  assert.equal(c.group, 'scrotum');
  assert.equal(c.mechanism, 'infection');
  const r = evaluateCase('epididymo_orchitis','VOIDING');
  assert.equal(r.inflamed, 'testis');
});

test('urethral stone is an outlet obstruction reaching the kidney', () => {
  const r = evaluateCase('urethral_stone','VOIDING');
  assert.equal(r.lesionStation, 'urethra');
  assert.equal(r.flowBlocked, true);
  assert.equal(r.hydronephrosis, true);
  assert.equal(r.bladderDistension, true);
});
