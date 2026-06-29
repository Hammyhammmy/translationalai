// Clinical Geometry — top navigation ribbon
// Injects a sticky horizontal ribbon at the top of every page that uses it.
// Active link is the current page (by filename).

(function () {
  const PAGES = [
    { href: 'Three Geometries of Failure.html', label: 'Geometries' },
    { href: 'The Urinary Tract.html', label: 'Urinary Tract' },
    { href: 'Urinary Interactive.html', label: 'Interactive' },
    { href: 'Urology Consults.html', label: 'Consults' },
    { href: 'Urology Procedures.html', label: 'Procedures' },
    { href: 'Urology Medications.html', label: 'Meds' },
    { href: 'Urology Operations.html', label: 'Operations' },
    { href: 'Urology Follow-Up.html', label: 'Follow-Up' },
    { href: 'Atlas Viewer.html', label: 'Atlas', accent: true },
  ];

  // Determine current page by filename
  const here = decodeURIComponent((location.pathname.split('/').pop() || 'index.html'));
  const isHome = here === 'index.html' || here === '';

  // Inject scoped styles
  const style = document.createElement('style');
  style.textContent = `
    .cg-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 250, 249, 0.92);
      backdrop-filter: saturate(180%) blur(12px);
      -webkit-backdrop-filter: saturate(180%) blur(12px);
      border-bottom: 1px solid #e7e5e4;
      padding: 0 20px;
      margin: -40px -20px 36px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .cg-nav-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 2px;
      height: 50px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .cg-nav-inner::-webkit-scrollbar { display: none; }
    .cg-brand {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-right: 18px;
      color: #1c1917;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .cg-brand:hover { opacity: 0.7; }
    .cg-brand .cg-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: linear-gradient(135deg, #dc2626 0%, #2563eb 50%, #7c3aed 100%);
      display: inline-block;
    }
    .cg-link {
      font-size: 12.5px;
      font-weight: 500;
      color: #78716c;
      text-decoration: none;
      padding: 7px 11px;
      border-radius: 6px;
      white-space: nowrap;
      transition: background 0.12s ease, color 0.12s ease;
    }
    .cg-link:hover { background: #f5f5f4; color: #1c1917; }
    .cg-link.active {
      color: #1c1917;
      background: #f5f5f4;
      font-weight: 700;
    }
    .cg-link.accent {
      color: #78716c;
      font-style: italic;
    }
    .cg-link.accent.active { color: #1c1917; font-style: normal; }
    .cg-spacer { flex: 1; min-width: 8px; }
    .cg-spacer { flex: 1; min-width: 8px; }
    .cg-search-btn {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;
      font-family: inherit; font-size: 12.5px; color: #78716c;
      background: #fff; border: 1px solid #e7e5e4; border-radius: 7px;
      padding: 6px 9px; cursor: pointer; white-space: nowrap;
      transition: border-color 0.12s ease, color 0.12s ease;
    }
    .cg-search-btn:hover { border-color: #d6d3d1; color: #1c1917; }
    .cg-search-btn kbd {
      font-family: inherit; font-size: 10.5px; color: #a8a29e;
      border: 1px solid #e7e5e4; border-radius: 4px; padding: 0 4px; margin-left: 2px;
    }
    .cg-search-label { }
    .cg-pal-backdrop {
      position: fixed; inset: 0; z-index: 200; background: rgba(28,25,23,0.18);
      display: none; align-items: flex-start; justify-content: center;
    }
    .cg-pal-backdrop.open { display: flex; }
    .cg-pal {
      margin-top: 12vh; width: min(560px, calc(100vw - 28px));
      background: #fff; border: 1px solid #e7e5e4; border-radius: 13px;
      box-shadow: 0 18px 50px rgba(0,0,0,0.22); overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .cg-pal input {
      width: 100%; box-sizing: border-box; border: none; outline: none;
      font-family: inherit; font-size: 15px; color: #1c1917;
      padding: 15px 16px; border-bottom: 1px solid #f0efed;
    }
    .cg-pal-res { max-height: 56vh; overflow: auto; padding: 6px; }
    .cg-pal-res:empty { display: none; }
    .cg-r {
      display: block; width: 100%; text-align: left; border: none; background: none;
      font-family: inherit; cursor: pointer; padding: 9px 11px; border-radius: 8px;
      text-decoration: none;
    }
    .cg-r:hover, .cg-r.active { background: #f5f5f4; }
    .cg-r .l { display: block; font-size: 13.5px; font-weight: 600; color: #1c1917; }
    .cg-r .c { font-size: 11px; font-weight: 600; color: #2563eb; text-transform: uppercase; letter-spacing: 0.03em; }
    .cg-r .s { display: block; font-size: 12px; color: #78716c; margin-top: 2px; }
    .cg-pal-empty { padding: 16px; font-size: 13px; color: #a8a29e; }
    @media (max-width: 640px) {
      .cg-nav { margin: -40px -20px 24px; padding: 0 14px; }
      .cg-nav-inner { gap: 0; height: 46px; }
      .cg-brand { font-size: 12px; margin-right: 12px; }
      .cg-link { font-size: 11.5px; padding: 6px 8px; }
      .cg-search-label, .cg-search-btn kbd { display: none; }
      .cg-search-btn { padding: 6px; }
    }
    @media print { .cg-nav, .cg-pal-backdrop { display: none !important; } }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.className = 'cg-nav';
  const inner = document.createElement('div');
  inner.className = 'cg-nav-inner';

  // Brand → home
  const brand = document.createElement('a');
  brand.href = 'index.html';
  brand.className = 'cg-brand';
  brand.innerHTML = '<span class="cg-dot"></span>Clinical Geometry';
  if (isHome) brand.style.opacity = '1';
  inner.appendChild(brand);

  // Spacer pushes links to natural flow position right of brand
  for (const p of PAGES) {
    const a = document.createElement('a');
    a.href = p.href;
    a.className = 'cg-link' + (p.accent ? ' accent' : '');
    if (p.href === here) a.classList.add('active');
    a.textContent = p.label;
    inner.appendChild(a);
  }

  // Spacer + search button, pinned to the right of the ribbon
  const spacer = document.createElement('div');
  spacer.className = 'cg-spacer';
  inner.appendChild(spacer);

  const searchBtn = document.createElement('button');
  searchBtn.type = 'button';
  searchBtn.className = 'cg-search-btn';
  searchBtn.setAttribute('aria-label', 'Search the site');
  searchBtn.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>' +
    '<span class="cg-search-label">Search</span><kbd>/</kbd>';
  inner.appendChild(searchBtn);

  nav.appendChild(inner);

  // Command-palette overlay (lazy: index + scorer load on first open)
  const backdrop = document.createElement('div');
  backdrop.className = 'cg-pal-backdrop';
  backdrop.innerHTML =
    '<div class="cg-pal" role="dialog" aria-label="Site search">' +
    '<input type="text" placeholder="Search conditions, drugs, consults, keywords…" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false">' +
    '<div class="cg-pal-res" role="listbox"></div></div>';
  const palInput = backdrop.querySelector('input');
  const palRes = backdrop.querySelector('.cg-pal-res');

  let core = null; // { searchIndex, snippet, matchTokens }
  let SYN = {};
  let INDEX = null;
  let list = [];
  let active = -1;

  async function ensureLoaded() {
    if (INDEX) return true;
    try {
      const [coreMod, synMod, idx] = await Promise.all([
        import('./search-core.js'),
        import('./search-synonyms.js'),
        fetch('search-index.json').then((r) => r.json()),
      ]);
      core = coreMod;
      SYN = synMod.SYNONYMS;
      INDEX = idx;
      return true;
    } catch (e) {
      palRes.innerHTML = '<div class="cg-pal-empty">Search is unavailable on this page.</div>';
      return false;
    }
  }

  const escHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function paint() {
    const q = palInput.value;
    if (!q.trim() || !INDEX) { palRes.innerHTML = ''; return; }
    list = core.searchIndex(INDEX, q, SYN);
    if (!list.length) {
      palRes.innerHTML = `<div class="cg-pal-empty">No matches for “${escHtml(q.trim())}”</div>`;
      return;
    }
    const toks = core.matchTokens(q, SYN);
    palRes.innerHTML = list
      .map((it, i) => {
        const snip = core.snippet(it.text, toks);
        return `<a class="cg-r${i === active ? ' active' : ''}" href="${escHtml(it.href)}" data-i="${i}" role="option">` +
          `<span class="c">${escHtml(it.sub)}</span>` +
          `<span class="l">${escHtml(it.label)}</span>` +
          (snip ? `<span class="s">${escHtml(snip)}</span>` : '') +
          `</a>`;
      })
      .join('');
  }

  async function open() {
    backdrop.classList.add('open');
    palInput.setAttribute('aria-expanded', 'true');
    palInput.focus();
    if (await ensureLoaded()) paint();
  }
  function close() {
    backdrop.classList.remove('open');
    palInput.setAttribute('aria-expanded', 'false');
    palInput.value = '';
    palRes.innerHTML = '';
    active = -1;
  }

  searchBtn.addEventListener('click', open);
  palInput.addEventListener('input', () => { active = -1; paint(); });
  palInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, list.length - 1); paint(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); paint(); }
    else if (e.key === 'Enter') { e.preventDefault(); const it = list[active >= 0 ? active : 0]; if (it) location.href = it.href; }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement || {}).tagName || '';
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag) && !backdrop.classList.contains('open')) {
      e.preventDefault();
      open();
    }
  });

  // Insert as first child of body so it sticks to the top
  function mount() {
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.appendChild(backdrop);
  }
  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
