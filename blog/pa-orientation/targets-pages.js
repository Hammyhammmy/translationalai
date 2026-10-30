// Receptor text on the static pages (Urology Medications, The Urinary Tract), generated from
// targets.js so the pages, the figure and the Normal tab never disagree. Each region sits
// between <!-- targets:name --> and <!-- /targets --> in the page's HTML; targets-build.mjs
// rewrites them, and targets.test.mjs fails if a page is out of date.
// The pages stay plain HTML, so site search and readers without JavaScript still see the text.
import { TARGETS as T } from './targets.js';

export const PAGES = ['Urology Medications.html', 'The Urinary Tract.html'];

const ACT = { block: 'Block', stimulate: 'Stimulate', inhibit: 'Block' };
const at = id => `${T[id].tag} (${T[id].where})`;
// a drug card's receptor line: one target spelled out, several listed
function recep(ids) {
  if (ids.length > 1) return ids.map(at).join(' · ');
  const t = T[ids[0]];
  return `${ACT[t.drugs[0].act]} ${at(ids[0])}: normally ${t.effect}${t.alsoIn ? `. Also in ${t.alsoIn}: the side effects` : ''}`;
}

export const REGIONS = {
  // Medications: the station-by-station table
  'meds-ureter': () => `Smooth muscle, peristalsis · ${T.A1D.tag} ${T.A1D.short}`,
  'meds-bladder': () => ['M3', 'B3'].map(id => `${T[id].tag} (${T[id].short})`).join(', '),
  'meds-neck': () => `${T.A1A.tag} (${T.A1A.short})`,
  'meds-prostate': () => ['A1A', 'AR5', 'PDE5'].map(id => `${T[id].tag} ${T[id].short}`).join(' · '),
  // Medications: the receptor line under each drug class
  'meds-a1': () => recep(['A1A', 'A1B', 'A1D']),
  'meds-5ari': () => recep(['AR5']),
  'meds-antimusc': () => recep(['M3']),
  'meds-b3': () => recep(['B3']),
  'meds-pde5': () => recep(['PDE5']),
  // The Urinary Tract: storage vs voiding
  'tract-cycle': () => `
    <tr>
      <td><strong>STORAGE</strong><br><span style="font-size: 12px; color: var(--muted);">${T.B3.system} dominant (${T.B3.level})</span></td>
      <td>Relaxed (${T.B3.tag}): bladder fills at low pressure</td>
      <td>Closed (${T.A1A.tag})</td>
      <td>Tonic contraction (${T.N.nerve.toLowerCase()}, ${T.N.name.toLowerCase()})</td>
    </tr>
    <tr>
      <td><strong>VOIDING</strong><br><span style="font-size: 12px; color: var(--muted);">${T.M3.system} dominant (${T.M3.level})</span></td>
      <td>Contracts (${T.M3.tag})</td>
      <td>Opens reflexively</td>
      <td>Voluntary relaxation</td>
    </tr>
  `,
};

const RE = /<!-- targets:([\w-]+) -->[\s\S]*?<!-- \/targets -->/g;
export function render(html) {
  return html.replace(RE, (_, k) => {
    if (!REGIONS[k]) throw new Error(`unknown targets region ${k}`);
    return `<!-- targets:${k} -->${REGIONS[k]()}<!-- /targets -->`;
  });
}
export const regionsIn = html => [...html.matchAll(RE)].map(m => m[1]);
