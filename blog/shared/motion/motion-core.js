// Shared animation engine for every animated diagram on the blog (consults, procedures,
// the urinary model, transporters). Pages describe WHAT moves; this file owns HOW:
//   - one requestAnimationFrame loop for all players on a page
//   - visibility (players tick only while on screen)
//   - prefers-reduced-motion (players open paused on a still frame)
//   - SVG helpers, particles that ride a path, pooled pill callouts, colour/easing maths
//   - the test hook (?m=...) every player reads
// motion.test.mjs fails if a page outside shared/motion/ starts its own loop or observer.
// No dependencies.

export const NS = 'http://www.w3.org/2000/svg';
export const REDUCE = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();

// ---------- maths ----------
export const C01 = t => Math.max(0, Math.min(1, t));
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * C01(t);       // clamped
export const lerpRaw = (a, b, t) => a + (b - a) * t;         // unclamped
export const smooth = t => { t = C01(t); return t * t * (3 - 2 * t); };              // smoothstep
export const easeInOut = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;  // quadratic in-out
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
export const mix = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * C01(t)).toString(16).padStart(2, '0')).join(''); };

// ---------- SVG ----------
export const mk = (t, a = {}, parent) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (parent) parent.appendChild(e); return e; };
export const set = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
// several players share a page, so each prefixes its element ids
export const scopeIds = (html, pre) => html.replace(/id="([^"]+)"/g, `id="${pre}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${pre}$1)`);

// Pill callouts, pooled per key. Call begin(), then co() for each pill that should show
// this frame, then end() hides the rest. maxX keeps pills inside the viewBox; raise
// re-appends each pill so it sits above anything drawn later.
export function callouts(layer, { maxX = 396, raise = false } = {}) {
  const CO = {};
  return {
    co(key, text, color, x, y) {
      let g = CO[key];
      if (!g || g._t !== text) {
        if (g) g.remove();
        g = mk('g'); g._t = text; g._w = text.length * 6.1 + 14;
        g.append(mk('rect', { x: 0, y: -11, width: g._w, height: 20, rx: 6, fill: color }));
        const t = mk('text', { x: 7, y: 3, 'font-size': 11, 'font-weight': 700, fill: '#fff' }); t.textContent = text; g.append(t);
        layer.append(g); CO[key] = g;
      }
      g._on = true; g.setAttribute('transform', `translate(${Math.max(4, Math.min(x, maxX - g._w))},${y})`);
      if (raise) layer.appendChild(g);
    },
    begin() { for (const k in CO) CO[k]._on = false; },
    end() { for (const k in CO) CO[k].style.display = CO[k]._on ? '' : 'none'; },
    get pool() { return CO; },
  };
}

// A player's drawing kit: helpers bound to its own id prefix.
// Particles are {el, t, i}; t is the position along a path, 0..1.
export function kit(pre = '') {
  const $ = id => document.getElementById(pre + id);
  const S = (id, a) => { const e = typeof id === 'string' ? $(id) : id; if (!e) return; set(e, a); };
  const show = (id, on) => { const e = $(id); if (e) e.style.display = on ? '' : 'none'; };
  const P = {};
  const path = id => { if (!P[id]) { const e = $(id); P[id] = { e, L: e.getTotalLength() }; } return P[id]; };
  const at = (id, t) => { const p = path(id); const q = p.e.getPointAtLength(C01(t) * p.L); return [q.x, q.y]; };
  const parts = (gid, n, fill, r = 3) => dots($(gid), n, fill, r);
  const place = (pt, xy, vis = true, fill) => { pt.el.setAttribute('cx', xy[0]); pt.el.setAttribute('cy', xy[1]); pt.el.style.display = vis ? '' : 'none'; if (fill) pt.el.setAttribute('fill', fill); };
  // move dots along the path with this id (see ride)
  const flow = (arr, id, dt, speed, opts) => { const p = path(id); ride(arr, p.e, p.L, dt, speed, opts); };
  return { $, mk, S, show, path, at, parts, place, flow };
}

// ---------- dots that ride a path: one rule for every diagram ----------
// A dot is {el, t, i}: t is how far along its path it is (0..1), i its index.
export function dots(group, n, fill, r = 3) {
  return Array.from({ length: n }, (_, i) => ({ el: mk('circle', { r, fill, stroke: '#fff', 'stroke-width': 1 }, group), t: i / n, i }));
}
// Move one dot. rate is in path lengths per second (negative runs backwards). With cap set,
// dots queue behind that point (a stone, a clot) instead of wrapping round.
export function advance(p, dt, rate, cap = null) {
  p.t += rate * dt;
  if (cap != null) { const c = cap - .03 - .028 * (p.i % 6); if (p.t > c) p.t = Math.max(0, c); }
  else { p.t %= 1; if (p.t < 0) p.t += 1; }
}
// Move dots along an SVG path and place them. rate as in advance(); for a constant speed on
// screen whatever the path's length, pass pxRate(px per second, L). vis hides the dots one by
// one, or their whole group when `group` is given; fill recolours them; rev mirrors the path.
export function ride(arr, pathEl, L, dt, rate, { cap = null, vis = true, fill = null, rev = false, group = null } = {}) {
  if (group) group.style.display = vis ? '' : 'none';
  for (const p of arr) {
    advance(p, dt, rate, cap);
    const q = pathEl.getPointAtLength(C01(rev ? 1 - p.t : p.t) * L);
    p.el.setAttribute('cx', q.x); p.el.setAttribute('cy', q.y);
    if (!group) p.el.style.display = vis ? '' : 'none';
    if (fill) p.el.setAttribute('fill', fill);
  }
}
export const pxRate = (pxPerSecond, L) => pxPerSecond / L;

// distance along a path (1 px resolution) of the point nearest (x, y)
export function nearestLen(path, x, y) { const L = path.getTotalLength(); let best = 0, bd = 1e9; for (let s = 0; s <= L; s += 1) { const q = path.getPointAtLength(s); const d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; best = s; } } return best; }

// ---------- the one loop ----------
const ticks = new Set();
let last = 0, raf = 0;
function loop(ts) {
  const dt = Math.min((ts - last) / 1000, .05) || .016; last = ts;
  for (const f of ticks) f(dt);
  raf = requestAnimationFrame(loop);
}
// fn(dt) runs every frame; returns an unsubscribe
export function onFrame(fn) { ticks.add(fn); if (!raf) raf = requestAnimationFrame(loop); return () => ticks.delete(fn); }

// cb(isOnScreen) whenever el scrolls in or out; one observer per threshold
const observers = new Map();
export function onVisible(el, cb, threshold = 0) {
  if (!('IntersectionObserver' in window)) { cb(true); return; }
  let io = observers.get(threshold);
  if (!io) { io = new IntersectionObserver(es => es.forEach(e => e.target._motionVis && e.target._motionVis(e.isIntersecting)), { threshold }); observers.set(threshold, io); }
  el._motionVis = cb; io.observe(el);
}

// ---------- page plumbing ----------
const injected = new Set();
export function injectCSS(key, css) { if (injected.has(key)) return; injected.add(key); const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); }

// Test hook shared by every player: ?m=<key>-<a>-<b> (each player says what a and b mean),
// and &noscroll to leave the page where it is.
export function testHook() {
  try { const q = new URLSearchParams(location.search); const m = q.get('m'); if (!m) return null; const [key, ...rest] = m.split('-'); return { key, args: rest, noscroll: q.has('noscroll') }; } catch (e) { return null; }
}
