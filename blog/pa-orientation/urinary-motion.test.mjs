// The animated tract must tell the same story as the physiology engine.
// Every condition gets a scene, and each scene agrees with evaluateCase():
// a ureter block draws on the ureter, an outlet block on the outlet, blood joins
// where the engine says it does, and so on.
// Run: node --test blog/pa-orientation/urinary-motion.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SCENES, sceneFor, NORMAL_SCENE } from './urinary-motion.js';
import { CASES, evaluateCase } from './urinary-model.js';

const ids = Object.keys(CASES).filter((id) => id !== 'normal');
const CYCLES = ['normal', 'stress', 'oab', 'retention', 'dsd'];

test('every condition has its own scene, and no scene is orphaned', () => {
  for (const id of ids) assert.ok(SCENES[id], `no scene for ${id}`);
  for (const id of Object.keys(SCENES)) assert.ok(CASES[id], `scene for unknown case ${id}`);
  assert.equal(sceneFor('normal'), NORMAL_SCENE);
});

test('every scene has a known bladder cycle and a plain-word tip', () => {
  for (const [id, s] of Object.entries(SCENES)) {
    assert.ok(CYCLES.includes(s.cycle), `${id}: cycle ${s.cycle}`);
    assert.ok(s.tip && s.tip.length <= 32, `${id}: tip missing or too long`);
  }
});

test('obstruction is drawn where the engine blocks flow', () => {
  for (const id of ids) {
    const st = evaluateCase(id, CASES[id].faultPhase ? CASES[id].faultPhase.toUpperCase() : 'VOIDING');
    if (CASES[id].mechanism !== 'obstruction') continue;
    const s = SCENES[id];
    if (st.lesionStation === 'ureter') {
      assert.ok(s.ureter && s.ureter.at > 0 && s.ureter.at < 1, `${id}: ureter block`);
    } else if (st.lesionStation === 'urethra') {
      assert.ok(s.outlet, `${id}: outlet block`);
    } else if (st.lesionStation === 'kidney') {
      assert.ok(s.staghorn, `${id}: kidney block`);
    }
  }
});

test('blood joins where the engine says it does', () => {
  for (const id of ids) {
    const st = evaluateCase(id);
    const b = SCENES[id].blood;
    if (st.particleColor === 'blood') {
      assert.ok(b, `${id}: engine bleeds, scene does not`);
      assert.equal(b.startsWith('kidney') ? 'kidney' : b, st.particleColorFrom, `${id}: wrong source`);
    } else {
      assert.equal(b, undefined, `${id}: scene bleeds, engine does not`);
    }
  }
});

test('mechanism-specific behaviour matches', () => {
  assert.equal(SCENES.vesicoureteral_reflux.reflux, true);
  assert.equal(SCENES.stress_incontinence.cycle, 'stress');
  assert.equal(SCENES.detrusor_overactivity.cycle, 'oab');
  assert.equal(SCENES.neurogenic_lmn.cycle, 'retention');
  assert.equal(SCENES.detrusor_sphincter_dyssynergia.cycle, 'dsd');
  assert.equal(SCENES.testicular_torsion.testis, 'torsion');
  for (const id of ids) {
    const st = evaluateCase(id);
    if (st.inflamed) assert.equal(!!SCENES[id].inflamed, CASES[id].mechanism === 'infection', `${id}: infection halo`);
  }
});

test('prostate and testis conditions force male anatomy; nothing else does', () => {
  const male = ['bph', 'prostate_carcinoma', 'prostatitis', 'cpps', 'posterior_urethral_valve', 'testicular_torsion', 'epididymo_orchitis'];
  for (const [id, s] of Object.entries(SCENES)) assert.equal(!!s.male, male.includes(id), `${id}: male flag`);
});
