// Build the site-wide search index from source.
//   node blog/pa-orientation/search-index-build.mjs   → writes search-index.json
//   import { buildIndex } from './search-index-build.mjs'  → returns the array (tests)
//
// Two content sources:
//   1. The Interactive page's JS data modules (clean authored fields) → ?tab=&id= hrefs.
//   2. The 8 static prose pages (heading → section text) → #:~:text= deep links.  [slice 2]
import { CASES } from './urinary-model.js';
import { NORMAL_TEACH } from './urinary-normal.js';
import { PRESENTATIONS } from './urinary-presentations.js';
import { ONCOLOGY, ONC_CANCERS, ONC_CONCEPTS } from './urinary-oncology.js';
import { ANDROLOGY, ANDRO_TOPICS } from './urinary-andrology.js';
import { TRAUMA, TRAUMA_TOPICS } from './urinary-trauma.js';
import { plain } from './prose.js';

const INTERACTIVE = 'Urinary Interactive.html';

// Flatten any nested entry object into a single searchable text blob.
function collect(v, acc) {
  if (v == null) return;
  if (typeof v === 'string') acc.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collect(x, acc));
  else if (typeof v === 'object') for (const k in v) collect(v[k], acc);
}

function interactiveEntry(tab, id, entry, sub) {
  const acc = [];
  collect(entry, acc);
  return {
    page: INTERACTIVE,
    tab,
    id,
    label: entry.label || id,
    sub,
    text: plain(acc.join(' · ')).toLowerCase(),
    href: `${INTERACTIVE}?tab=${tab}&id=${id}`,
  };
}

function interactiveEntries() {
  const NORMAL_IDS = ['overview', 'kidney', 'nephron', 'ureter', 'bladder', 'sphincters', 'urethra'];
  return [
    ...NORMAL_IDS.map((id) => interactiveEntry('normal', id, NORMAL_TEACH[id], 'Normal physiology')),
    ...Object.keys(PRESENTATIONS).map((id) => interactiveEntry('presentations', id, PRESENTATIONS[id], 'Presentation')),
    ...Object.keys(CASES).filter((id) => id !== 'normal').map((id) => interactiveEntry('conditions', id, CASES[id], 'Condition')),
    ...ONC_CANCERS.concat(ONC_CONCEPTS).map((id) => interactiveEntry('oncology', id, ONCOLOGY[id], ONCOLOGY[id].kind === 'concept' ? 'Oncology · concept' : 'Oncology')),
    ...ANDRO_TOPICS.map((id) => interactiveEntry('andrology', id, ANDROLOGY[id], 'Andrology')),
    ...TRAUMA_TOPICS.map((id) => interactiveEntry('trauma', id, TRAUMA[id], 'Trauma')),
  ];
}

// --- static prose pages -----------------------------------------------------
// Anchor points = section headings (h1-h3) + any element whose class contains
// "title" (consult-title, drug-title, stn-title, …). These split each page into
// card-sized chunks; the text between one anchor and the next is its body.
const STATIC_PAGES = [
  ['Three Geometries of Failure.html', 'Geometries'],
  ['The Urinary Tract.html', 'Urinary Tract'],
  ['Urology Consults.html', 'Consults'],
  ['Urology Procedures.html', 'Procedures'],
  ['Urology Medications.html', 'Meds'],
  ['Urology Operations.html', 'Operations'],
  ['Urology Follow-Up.html', 'Follow-Up'],
  ['Atlas Viewer.html', 'Atlas'],
];

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–' };
function decode(s) { return s.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? m); }
function strip(html) { return decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(); }

function staticEntries(page, sub, html) {
  const body = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  // Collect anchors: [index, endIndex, label]
  const anchors = [];
  let m;
  const headingRe = /<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  while ((m = headingRe.exec(body))) anchors.push({ i: m.index, end: headingRe.lastIndex, label: strip(m[1]) });
  const titleRe = /<(\w+)\b[^>]*\bclass="[^"]*(?<![\w-])[\w-]*title[\w-]*[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
  while ((m = titleRe.exec(body))) {
    if (/\bsubtitle\b/.test(m[0])) continue; // page subtitles are chrome, not content
    anchors.push({ i: m.index, end: titleRe.lastIndex, label: strip(m[2]) });
  }
  anchors.sort((a, b) => a.i - b.i);

  const seen = new Set();
  const out = [];
  for (let k = 0; k < anchors.length; k++) {
    const a = anchors[k];
    if (!a.label || seen.has(a.label)) continue; // keep first; text fragments must be unique
    seen.add(a.label);
    const next = anchors[k + 1] ? anchors[k + 1].i : body.length;
    const sectionText = strip(body.slice(a.end, next));
    out.push({
      page,
      label: a.label,
      sub,
      text: `${a.label} · ${sectionText}`.toLowerCase(),
      href: `${page}#:~:text=${encodeURIComponent(a.label)}`,
    });
  }
  return out;
}

export async function buildIndex() {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const url = await import('node:url');
  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const out = [...interactiveEntries()];
  for (const [page, sub] of STATIC_PAGES) {
    const html = await fs.readFile(path.join(here, page), 'utf8');
    out.push(...staticEntries(page, sub, html));
  }
  return out;
}

// Run as a script → write the artifact.
if (import.meta.url === `file://${process.argv[1]}`) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const url = await import('node:url');
  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const index = await buildIndex();
  await fs.writeFile(path.join(here, 'search-index.json'), JSON.stringify(index, null, 0) + '\n');
  console.log(`wrote search-index.json (${index.length} entries)`);
}
