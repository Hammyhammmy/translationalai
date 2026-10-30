// Receptor / drug-target tags for any animated diagram: a coloured pill per target, dotted
// leader lines to where it acts, lit while it is driving, ringed when the condition on show
// is treated through it, plus a matching key. Knows nothing about urology: the page passes
// the targets ({tag, color, ...}) and, every frame, where each pill sits and points.
import { mk, set } from './motion-core.js';

// layer: an SVG <g>. targets: { id: { tag, color } }.
export function targetTags(layer, targets) {
  const T = {};
  for (const id in targets) {
    const t = targets[id], w = t.tag.length * 6.6 + 10;
    const g = mk('g', { 'font-size': 10, 'font-weight': 700, 'data-target': id }, layer);
    const leads = mk('g', { stroke: t.color, 'stroke-width': 1.2, 'stroke-dasharray': '2 2' }, g);
    const pill = mk('g', {}, g);
    const ring = mk('rect', { x: -w / 2 - 3, y: -10, width: w + 6, height: 20, rx: 6, fill: 'none', stroke: '#1c1917', 'stroke-width': 1.6 }, pill);
    mk('rect', { x: -w / 2, y: -7, width: w, height: 14, rx: 4, fill: t.color, stroke: '#fff', 'stroke-width': 1 }, pill);
    const tx = mk('text', { x: 0, y: 3.5, 'text-anchor': 'middle', fill: '#fff' }, pill); tx.textContent = t.tag;
    T[id] = { g, leads, pill, ring, w };
  }
  return {
    // states: { id: { x, y, to: [[x, y], ...], lit, focus } }; ids left out are hidden
    update(states) {
      for (const id in T) {
        const s = states[id], o = T[id];
        o.g.style.display = s ? '' : 'none';
        if (!s) continue;
        o.pill.setAttribute('transform', `translate(${s.x},${s.y})`);
        o.g.setAttribute('opacity', s.lit ? 1 : 0.3);
        o.ring.style.display = s.focus ? '' : 'none';
        const to = s.to || [];
        while (o.leads.childNodes.length < to.length) mk('line', {}, o.leads);
        [...o.leads.childNodes].forEach((l, i) => {
          if (i >= to.length) { l.style.display = 'none'; return; }
          const [x2, y2] = to[i], x1 = s.x + (x2 > s.x ? o.w / 2 : -o.w / 2);
          l.style.display = ''; set(l, { x1, y1: s.y, x2, y2 });
        });
      }
    },
  };
}

// The key under a diagram: one row per target. rows: [{ id, tag, color, html }].
export function targetKeyHTML(rows) {
  return rows.map(r => `<div data-target="${r.id}"><b style="background:${r.color}">${r.tag}</b><span>${r.html}</span></div>`).join('');
}
// Light the key rows to match the figure: lit = Set of ids, focus = Set of ids.
export function lightKey(root, lit, focus) {
  root.querySelectorAll('[data-target]').forEach(d => { d.classList.toggle('on', lit.has(d.dataset.target)); d.classList.toggle('focus', focus.has(d.dataset.target)); });
}

export const TARGET_KEY_CSS = `
.rxkey{display:grid;gap:5px;font-size:12.5px;line-height:1.45;padding:8px 4px 2px;border-top:1px solid var(--border);margin-top:6px}
.rxkey>div{display:flex;gap:8px;align-items:baseline;opacity:.5;transition:opacity .25s}
.rxkey>div.on,.rxkey>div.focus{opacity:1}
.rxkey b{flex:none;min-width:36px;text-align:center;color:#fff;border-radius:5px;padding:0 5px;font-size:11.5px}
.rxkey>div.focus b{box-shadow:0 0 0 2px var(--bg),0 0 0 3.5px var(--text)}
.rxkey .why{color:var(--muted)}
`;
