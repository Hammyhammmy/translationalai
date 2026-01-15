document.addEventListener('DOMContentLoaded', function () {
    // Determine which page is active based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Navigation items configuration
    const navItems = [
        { href: 'index.html', label: 'Home', page: 'index.html' },
        { href: 'prostate.html', label: 'Prostate (Rapid Bx)', page: 'prostate.html' },
        { href: 'hematuria.html', label: 'Hematuria', page: 'hematuria.html' },
        { href: 'renal.html', label: 'Renal Mass', page: 'renal.html' },
        { href: 'stones.html', label: 'Kidney Stones', page: 'stones.html' },
        { href: 'retention.html', label: 'Urinary Retention', page: 'retention.html' },
        { href: '#', label: 'MD Advice', page: 'advice', special: 'email-link' }
    ];

    // Build navigation HTML
    const navHtml = `
        <nav class="clinic-nav">
            <ul>
                ${navItems.map(item => {
        const isActive = item.page === currentPage;
        const activeClass = isActive ? ' class="active"' : '';
        const specialClass = item.special === 'email-link' ? ' class="clinic-email-link" style="color: var(--primary); font-weight: 700;"' : '';

        return `<li><a href="${item.href}"${activeClass}${specialClass}>${item.label}</a></li>`;
    }).join('\n                ')}
            </ul>
        </nav>
    `;

    // Inject navigation at the top of body
    document.body.insertAdjacentHTML('afterbegin', navHtml);
});
