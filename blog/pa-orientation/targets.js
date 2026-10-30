// Drug targets of the lower urinary tract: one source for the receptor tags on the animated
// figure, the tag key, the "Molecular basis → treatment" rows on the Normal tab and the
// targets each condition is treated through. Change a fact here and every view follows.
// targets.test.mjs checks the scenes, the Normal tab and the Medications page agree with it.
//
// Sources (checked 2026-10-30):
//  - M3 drives detrusor contraction although M2 is more numerous; β3 is the main relaxing
//    β-receptor of human detrusor (β3 ~97% of β-AR mRNA). Andersson, Naunyn-Schmiedeberg's
//    Arch Pharmacol 2008 (doi 10.1007/s00210-007-0208-0); Korean J Urol β3 review.
//  - Distal ureter: α1D leads, then α1A (Itoh et al., 2007, PubMed 17681068); tamsulosin
//    blocks α1A and α1D.
//  - Storage is sympathetic (hypogastric, T10–L2; some texts T12–L2), voiding parasympathetic
//    (pelvic, S2–S4); the external sphincter is pudendal (Onuf's nucleus, S2–S4), nicotinic.
//  - Vibegron is left out: not available in Canada (Urology Medications page, Sept 2026).

// at: anatomy point(s) the tag points to (anatomy.js anchors)
// during: the figure phases ('fill' | 'urge' | 'void') when this receptor is driving;
//         null = not tied to the cycle (always lit when shown). An urge is an early M3
//         squeeze while the outlet still holds.
// drugs[].act: what the drug does to the target
export const TARGETS = {
  M3: {
    tag: 'M3', name: 'Muscarinic M3', kind: 'receptor', where: 'detrusor', at: ['bladder'], color: '#b45309',
    nerve: 'Pelvic nerve', system: 'parasympathetic', level: 'S2–S4', messenger: 'acetylcholine',
    effect: 'the bladder squeezes', during: ['urge', 'void'],
    drugs: [{ act: 'block', cls: 'Antimuscarinics', examples: ['oxybutynin', 'solifenacin'], use: 'overactive bladder' }],
  },
  B3: {
    tag: 'β3', name: 'Beta-3 adrenergic', kind: 'receptor', where: 'detrusor', at: ['bladder'], color: '#2563eb',
    nerve: 'Hypogastric nerve', system: 'sympathetic', level: 'T10–L2', messenger: 'noradrenaline',
    effect: 'the bladder relaxes, so it fills at low pressure', during: ['fill'],
    drugs: [{ act: 'stimulate', cls: 'β3 agonists', examples: ['mirabegron'], use: 'overactive bladder' }],
  },
  A1A: {
    tag: 'α1A', name: 'Alpha-1A adrenergic', kind: 'receptor', where: 'bladder neck and prostate', at: ['bladderNeck', 'prostate'], color: '#0f766e',
    nerve: 'Hypogastric nerve', system: 'sympathetic', level: 'T10–L2', messenger: 'noradrenaline',
    effect: 'the bladder neck and prostate tighten', during: ['fill', 'urge'],
    drugs: [{ act: 'block', cls: 'α1-blockers', examples: ['tamsulosin', 'silodosin'], use: 'BPH symptoms; a voiding trial after retention' }],
  },
  N: {
    tag: 'N', name: 'Nicotinic', kind: 'receptor', where: 'external sphincter', at: ['sphincters'], color: '#7c3aed',
    nerve: 'Pudendal nerve', system: 'somatic', level: 'S2–S4', messenger: 'acetylcholine',
    effect: 'the external sphincter tightens: the voluntary hold', during: ['fill', 'urge'],
    drugs: [], care: 'pelvic-floor training, not a drug',
  },
  A1D: {
    tag: 'α1D', name: 'Alpha-1D adrenergic (with α1A)', kind: 'receptor', where: 'distal ureter', at: ['distalUreter'], color: '#0e7490',
    effect: 'distal ureter smooth muscle tightens around a stone', during: null,
    drugs: [{ act: 'block', cls: 'α1-blockers', examples: ['tamsulosin'], use: 'helping a distal stone pass (medical expulsive therapy)' }],
  },
  AR5: {
    tag: '5α-R', name: '5α-reductase', kind: 'enzyme', where: 'prostate', at: ['prostate'], color: '#a16207', male: true,
    effect: 'turns testosterone into DHT, which grows the prostate', during: null,
    drugs: [{ act: 'inhibit', cls: '5α-reductase inhibitors', examples: ['finasteride', 'dutasteride'], use: 'shrinking a large prostate over months' }],
  },
  PDE5: {
    tag: 'PDE5', name: 'Phosphodiesterase-5', kind: 'enzyme', where: 'prostate and bladder neck smooth muscle', at: ['prostate'], color: '#be185d', male: true,
    effect: 'breaks down cGMP, so smooth muscle stays tighter', during: null,
    drugs: [{ act: 'inhibit', cls: 'PDE5 inhibitors', examples: ['tadalafil'], use: 'BPH symptoms and erectile dysfunction' }],
  },
};

// The four receptors that run the fill–void cycle: always tagged on the moving figure.
export const CYCLE_TARGETS = ['M3', 'B3', 'A1A', 'N'];

// Is this receptor driving right now? phase is the figure's 'fill' | 'urge' | 'void'.
export function isActive(id, phase) {
  const d = TARGETS[id].during;
  return !d || d.includes(phase);
}

const VERB = { block: 'block it', stimulate: 'stimulate it', inhibit: 'block it' };
// One plain sentence per drug class: "Antimuscarinics (oxybutynin, solifenacin) block it: overactive bladder."
export function drugLine(id) {
  const t = TARGETS[id];
  if (!t.drugs.length) return t.care ? cap(t.care) + '.' : '';
  return t.drugs.map(d => `${d.cls} (${d.examples.join(', ')}) ${VERB[d.act]}: ${d.use}.`).join(' ');
}
const cap = s => s[0].toUpperCase() + s.slice(1);

// A row for the key under a diagram: what it is, its nerve, what it does, the drugs.
export function keyRow(id) {
  const t = TARGETS[id];
  const via = t.nerve ? `${t.nerve} (${t.system}, ${t.level}), ${t.messenger} → ` : '';
  return { id, tag: t.tag, color: t.color, html: `<strong>${t.name}.</strong> ${via}${t.nerve ? t.effect : cap(t.effect)}. ${drugLine(id)}` };
}

// A row for the Normal tab's "Molecular basis → treatment" list.
export function moleculeRow(id) {
  const t = TARGETS[id], d = t.drugs[0];
  return {
    id, tag: t.tag, color: t.color,
    target: `${t.name} (${t.where})`,
    action: t.effect,
    drug: d ? `${d.cls} (${d.examples.join(', ')}): ${d.use}` : t.care,
  };
}
