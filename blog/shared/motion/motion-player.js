// The step player: a diagram beside numbered steps, a caption and Play/Pause.
// A scene is plain data plus a draw function:
//   { title, steps: [{ n: name, d: seconds, c: caption }], poster: [step, seconds],
//     build(): svg markup (ids are scoped per player), init(), draw({ k, st, dt, T }) }
// k = step index, st = seconds into the step, T = seconds since the player started.
// Reduced motion → opens paused on the poster frame. Test hook: ?m=<key>-<step>-<seconds>.
import { REDUCE, onFrame, onVisible, scopeIds, injectCSS, testHook } from './motion-core.js';

const CSS = `
.cmotion{border:1px solid var(--border);border-radius:12px;background:var(--bg);margin:6px 0 18px;padding:12px;display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:16px;align-items:start}
.cmotion svg{display:block;width:100%;height:auto;background:#fff;border-radius:10px}
.cm-side{display:flex;flex-direction:column;gap:10px;min-width:0}
.cm-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cm-k{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cm-play{margin-left:auto;font:inherit;font-size:12px;border:1px solid var(--border);background:var(--card);border-radius:7px;padding:3px 10px;cursor:pointer;color:var(--text)}
.cm-steps{display:flex;flex-wrap:wrap;gap:6px}
.cm-steps button{font:inherit;font-size:12px;line-height:1.4;border:1px solid var(--border);background:var(--card);border-radius:7px;padding:4px 9px;cursor:pointer;color:var(--text);text-align:left}
.cm-steps button[aria-current="true"]{background:var(--accent-light);border-color:var(--accent);color:var(--accent);font-weight:600}
.cm-cap{font-size:14px;line-height:1.55;min-height:3.2em}
.cm-cap b{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
@media(max-width:640px){.cmotion{grid-template-columns:1fr}.cmotion svg{max-width:340px;margin:0 auto}}
`;

function mount(host, cur, pre, viewBox) {
  host.innerHTML = `<svg viewBox="${viewBox}" role="img" aria-label="Animation: ${cur.title.replace(/^\d+\.\s*/, '')}">${scopeIds(cur.build() + '<g id="co"></g>', pre)}</svg>
    <div class="cm-side"><div class="cm-top"><span class="cm-k">Watch it happen</span><button class="cm-play">Pause</button></div>
    <div class="cm-steps">${cur.steps.map((s, i) => `<button data-i="${i}">${i + 1}. ${s.n}</button>`).join('')}</div>
    <div class="cm-cap" aria-live="polite"></div></div>`;
  cur.init();
  const playBtn = host.querySelector('.cm-play'), cap = host.querySelector('.cm-cap'), btns = [...host.querySelectorAll('.cm-steps button')];
  let k = 0, st = 0, T = 0, playing = false, userPaused = REDUCE, visible = false, done = false;
  const caption = () => { cap.innerHTML = `<b>Step ${k + 1} of ${cur.steps.length}</b>${cur.steps[k].c}`; btns.forEach((b, i) => b.setAttribute('aria-current', String(i === k))); };
  const frame = (dt, force) => {
    T += dt;
    if (playing || force) {
      st += dt; const d = cur.steps[k].d;
      if (st > d && !force) { if (k < cur.steps.length - 1) { k++; st = 0; caption(); } else { st = d; done = true; setPlay(false); } }
    }
    cur.draw({ k, st, dt, T });
  };
  // jump to a step and fast-forward `sec` seconds in fixed 1/30 s frames, so the result is repeatable
  const jump = (i, sec) => { k = Math.max(0, Math.min(i, cur.steps.length - 1)); st = 0; done = false; const m = Math.round(sec * 30); for (let j = 0; j < m; j++) frame(1 / 30, true); frame(0, true); caption(); };
  const setPlay = on => { playing = on; playBtn.textContent = on ? 'Pause' : (done ? 'Replay' : 'Play'); };
  const want = () => setPlay(visible && !userPaused && !done);
  playBtn.onclick = () => { if (done) { jump(0, 0); userPaused = false; setPlay(true); } else if (playing) { userPaused = true; setPlay(false); } else { userPaused = false; setPlay(true); } };
  btns.forEach(b => b.onclick = () => { jump(+b.dataset.i, 0); userPaused = REDUCE; if (!REDUCE) setPlay(true); });
  if (REDUCE) jump(cur.poster[0], cur.poster[1]); else jump(0, 0);
  onVisible(host, on => { visible = on; want(); }, .35);
  onFrame(dt => { if (playing) frame(dt); });
  return { jump, host, pause() { userPaused = true; setPlay(false); } };
}

// Mount a step player on every element matching `selector`.
// keyAttr names the data attribute that picks the scene; makeScene(key, idPrefix) returns it.
export function mountStepPlayers({ selector, keyAttr, makeScene, prefix, viewBox }) {
  const hosts = [...document.querySelectorAll(selector)];
  if (hosts.length) injectCSS('step-player', CSS);
  const players = hosts.map((h, i) => { const pre = prefix + i + '-', cur = makeScene(h.dataset[keyAttr], pre); return cur ? mount(h, cur, pre, viewBox) : null; });
  const hook = testHook();
  if (hook) {
    const p = players.find(p => p && p.host.dataset[keyAttr] === hook.key);
    if (p) {
      p.jump(+hook.args[0] || 0, +(hook.args[1] || 0)); p.pause();
      p.host.dataset.top = Math.round(p.host.getBoundingClientRect().top + scrollY);
      if (!hook.noscroll) p.host.scrollIntoView({ block: 'start' });
    }
  }
  return players;
}
