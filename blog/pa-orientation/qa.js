// "When patients ask…" block — grouped patient questions + model SPOKEN answers a PA can
// adapt at the bedside. Sibling to patient.js; data lives in urinary-qa.js. Second-person
// voice by design (unlike the third-person patient block). Bold (**…**) via prose().
import { prose } from './prose.js';
import { askFor, mergedGroups } from './urinary-qa.js';

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function itemHTML(it) {
  const why = it.why ? `<div class="qa-why"><b>Why:</b> ${prose(it.why)}</div>` : '';
  return `<div class="qa-item"><div class="qa-q">${prose(it.q)}</div><div class="qa-a">${prose(it.a)}</div>${why}</div>`;
}

function groupHTML(g) {
  const tag = g.shared ? '<span class="tag-canned">shared</span>' : '';
  return `<div class="qa-gt">${esc(g.title)}${tag}</div>${g.items.map(itemHTML).join('')}`;
}

// Inner groups only (no card wrapper / heading) — used by the standalone Patient Q&A page,
// which supplies its own per-condition heading.
export function qaGroupsHTML(id) {
  return mergedGroups(askFor(id)).map(groupHTML).join('');
}

export function qaHTML(id) {
  const inner = qaGroupsHTML(id);
  if (!inner) return '';
  return (
    '<div class="card qa">' +
    '<div class="qa-head"><span class="qa-title">When patients ask…</span></div>' +
    inner +
    '</div>'
  );
}
