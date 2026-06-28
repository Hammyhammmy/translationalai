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
    @media (max-width: 640px) {
      .cg-nav { margin: -40px -20px 24px; padding: 0 14px; }
      .cg-nav-inner { gap: 0; height: 46px; }
      .cg-brand { font-size: 12px; margin-right: 12px; }
      .cg-link { font-size: 11.5px; padding: 6px 8px; }
    }
    @media print { .cg-nav { display: none; } }
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

  nav.appendChild(inner);

  // Insert as first child of body so it sticks to the top
  if (document.body) {
    document.body.insertBefore(nav, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.insertBefore(nav, document.body.firstChild);
    });
  }
})();
