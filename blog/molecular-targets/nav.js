// Molecular Targets & Treatment — series ribbon + scroll helpers.
// Injects: the series ribbon (cross-links + back to blog), a back-to-top button, and a
// scroll-progress bar on every page in the series. On transporters.html — which has no
// in-page nav of its own — the ribbon is made sticky and gains section jumps with
// scroll-spy. drug-targets-reference.html already has its own sticky frame nav, so there
// the ribbon stays non-sticky (no second sticky bar) and just gets the button + progress.

(function () {
  const PAGES = [
    { href: 'transporters.html', label: 'The Sodium Battery' },
    { href: 'drug-targets-reference.html', label: 'Mechanisms of Action' },
  ];
  // short labels for transporters' three <h2> sections, in document order
  const SECLABELS = ['The engine', 'Two worlds', 'No lumen'];

  const here = decodeURIComponent((location.pathname.split('/').pop() || ''));
  const onTransporters = here === 'transporters.html';

  const style = document.createElement('style');
  style.textContent = `
    .mt-nav{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
      background:#faf7f1;border-bottom:1px solid #e6ddcc;}
    .mt-nav.sticky{position:sticky;top:0;z-index:50;background:rgba(250,247,241,.93);
      backdrop-filter:saturate(160%) blur(8px);-webkit-backdrop-filter:saturate(160%) blur(8px);}
    .mt-nav-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:4px;
      flex-wrap:wrap;padding:8px 20px;}
    .mt-back{font-size:12.5px;font-weight:700;color:#9c3318;text-decoration:none;white-space:nowrap;margin-right:8px;}
    .mt-back:hover{opacity:.7;}
    .mt-series{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
      color:#9a9082;margin-right:12px;white-space:nowrap;}
    .mt-link{font-size:12.5px;font-weight:500;color:#6b6256;text-decoration:none;padding:5px 10px;
      border-radius:6px;white-space:nowrap;transition:background .12s ease,color .12s ease;}
    .mt-link:hover{background:#f0e9dd;color:#2a2520;}
    .mt-link.active{color:#2a2520;background:#f0e9dd;font-weight:700;}
    .mt-spacer{flex:1;min-width:8px;}
    .mt-sec{font-size:12px;color:#9a9082;text-decoration:none;padding:5px 8px;border-radius:6px;white-space:nowrap;}
    .mt-sec:hover{background:#f0e9dd;color:#2a2520;}
    .mt-sec.active{color:#9c3318;font-weight:700;}
    #mt-prog{position:fixed;top:0;left:0;height:3px;width:0;z-index:60;
      background:linear-gradient(90deg,#dc2626,#7c3aed);transition:width .08s linear;}
    #mt-top{position:fixed;right:22px;bottom:22px;z-index:55;width:42px;height:42px;border-radius:50%;
      background:#2a2520;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
      box-shadow:0 6px 20px rgba(0,0,0,.22);opacity:0;transform:translateY(8px) scale(.9);pointer-events:none;
      transition:opacity .18s ease,transform .18s ease;}
    #mt-top.show{opacity:1;transform:none;pointer-events:auto;}
    #mt-top:hover{background:#9c3318;}
    @media(max-width:560px){.mt-series{display:none;}}
    @media print{.mt-nav,#mt-prog,#mt-top{display:none!important;}}
  `;
  document.head.appendChild(style);

  // ── series ribbon ──
  const nav = document.createElement('nav');
  nav.className = 'mt-nav' + (onTransporters ? ' sticky' : '');
  const inner = document.createElement('div');
  inner.className = 'mt-nav-inner';

  const back = document.createElement('a');
  back.href = '../index.html';
  back.className = 'mt-back';
  back.textContent = '← Blog';
  inner.appendChild(back);

  if (!onTransporters) {
    const s = document.createElement('span');
    s.className = 'mt-series';
    s.textContent = 'Molecular Targets & Treatment';
    inner.appendChild(s);
  }
  for (const p of PAGES) {
    const a = document.createElement('a');
    a.href = p.href;
    a.className = 'mt-link' + (p.href === here ? ' active' : '');
    a.textContent = p.label;
    inner.appendChild(a);
  }

  // ── section jumps + scroll-spy (transporters only — it has no in-page nav) ──
  const secs = [], secLinks = new Map();
  if (onTransporters) {
    const h2s = [...document.querySelectorAll('.wrap h2')];
    if (h2s.length) {
      const sp = document.createElement('div');
      sp.className = 'mt-spacer';
      inner.appendChild(sp);
      h2s.forEach((h, i) => {
        if (!h.id) h.id = 'sec' + (i + 1);
        h.style.scrollMarginTop = '56px';
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.className = 'mt-sec';
        a.textContent = SECLABELS[i] || h.textContent.trim().slice(0, 18);
        inner.appendChild(a);
        secs.push(h);
        secLinks.set(h.id, a);
      });
    }
  }
  nav.appendChild(inner);

  // ── progress bar + back-to-top button (both pages) ──
  const prog = document.createElement('div');
  prog.id = 'mt-prog';

  const top = document.createElement('button');
  top.id = 'mt-top';
  top.type = 'button';
  top.setAttribute('aria-label', 'Back to top');
  top.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14V4M4 9l5-5 5 5"/></svg>';
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    top.classList.toggle('show', h.scrollTop > 320);
    if (secs.length) {
      let cur = secs[0];
      for (const s of secs) { if (s.getBoundingClientRect().top <= 80) cur = s; }
      secLinks.forEach((a) => a.classList.remove('active'));
      const a = secLinks.get(cur.id);
      if (a) a.classList.add('active');
    }
  }

  function mount() {
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.appendChild(prog);
    document.body.appendChild(top);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
