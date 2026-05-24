(function () {
  const docs = [
    { file: 'index.html', short: 'Index', title: 'Anatomy of Software' },
    { file: '2026-05-24_three-patterns-of-the-body.html', short: 'Three Patterns', title: 'Three Patterns of the Body', badge: 'all' },
    { file: '2026-05-24_software-layers-anatomy-edition.html', short: 'Layers', title: 'Software Layers — The Anatomy Edition', badge: 'layers' },
    { file: '2026-05-24_the-pipeline-edition.html', short: 'Conduits', title: 'Software Conduits — The Pipeline Edition', badge: 'conduit' },
    { file: '2026-05-24_the-vasculature-edition.html', short: 'Networks', title: 'Software Networks — The Vasculature Edition', badge: 'network' },
    { file: '2026-05-23_the-phantom-panel-bug.html', short: 'Phantom Panel', title: 'The Phantom Panel — A Case Study', badge: 'case' },
  ];

  const badgeColors = {
    all:     { bg: '#f0fdf4', fg: '#16a34a' },
    layers:  { bg: '#fef2f2', fg: '#dc2626' },
    conduit: { bg: '#eff6ff', fg: '#2563eb' },
    network: { bg: '#f5f3ff', fg: '#7c3aed' },
    case:    { bg: '#fffbeb', fg: '#d97706' },
  };

  const currentFile = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'anatomy-nav';

  const style = document.createElement('style');
  style.textContent = `
    #anatomy-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 9999;
      background: rgba(250,250,249,0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #e7e5e4;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #anatomy-nav .nav-inner {
      max-width: 740px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 0;
      height: 44px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    #anatomy-nav .nav-inner::-webkit-scrollbar { display: none; }
    #anatomy-nav a {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      color: #78716c;
      text-decoration: none;
      white-space: nowrap;
      border-radius: 6px;
      transition: background 0.12s, color 0.12s;
      flex-shrink: 0;
    }
    #anatomy-nav a:hover { background: #f5f5f4; color: #1c1917; }
    #anatomy-nav a.active { background: #f5f5f4; color: #1c1917; }
    #anatomy-nav .nav-badge {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 1px 5px;
      border-radius: 6px;
    }
    #anatomy-nav .nav-home {
      font-weight: 800;
      font-size: 13px;
      color: #1c1917;
      letter-spacing: -0.02em;
      padding-right: 14px;
      margin-right: 4px;
      border-right: 1px solid #e7e5e4;
    }
    #anatomy-nav .nav-home:hover { background: transparent; }
    body { padding-top: 52px !important; }

    @media (max-width: 600px) {
      #anatomy-nav a { padding: 6px 7px; font-size: 11px; }
      #anatomy-nav .nav-home { font-size: 12px; padding-right: 10px; margin-right: 2px; }
    }
  `;
  document.head.appendChild(style);

  const inner = document.createElement('div');
  inner.className = 'nav-inner';

  docs.forEach(function (doc) {
    const a = document.createElement('a');
    a.href = doc.file;
    a.title = doc.title;

    if (doc.file === 'index.html') {
      a.className = 'nav-home';
      a.textContent = 'AoS';
      if (currentFile === 'index.html') a.classList.add('active');
    } else {
      a.textContent = doc.short;
      if (doc.badge && badgeColors[doc.badge]) {
        const badge = document.createElement('span');
        badge.className = 'nav-badge';
        badge.style.background = badgeColors[doc.badge].bg;
        badge.style.color = badgeColors[doc.badge].fg;
        badge.textContent = doc.badge === 'all' ? '1-2-3' : doc.badge;
        a.appendChild(badge);
      }
      if (currentFile === doc.file) a.classList.add('active');
    }

    inner.appendChild(a);
  });

  nav.appendChild(inner);
  document.body.prepend(nav);
})();
