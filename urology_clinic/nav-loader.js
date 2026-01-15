document.addEventListener('DOMContentLoaded', function () {
    // Determine which page is active based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Mobile navigation items (icon bar) - main items only
    const mobileNavItems = [
        { href: 'prostate.html', label: 'Prostate (Rapid Bx)', shortLabel: 'Prostate', page: 'prostate.html' },
        { href: 'hematuria.html', label: 'Hematuria', shortLabel: 'Hematuria', page: 'hematuria.html' },
        { href: 'renal.html', label: 'Renal Mass', shortLabel: 'Renal', page: 'renal.html' },
        { href: 'stones.html', label: 'Kidney Stones', shortLabel: 'Stones', page: 'stones.html' },
        { href: 'retention.html', label: 'Urinary Retention', shortLabel: 'Retention', page: 'retention.html' }
    ];

    // All navigation items (hamburger menu) - includes Home, About Us, and MD Advice
    const allNavItems = [
        { href: 'index.html', label: 'Home', shortLabel: 'Home', page: 'index.html' },
        { href: 'prostate.html', label: 'Prostate (Rapid Bx)', shortLabel: 'Prostate', page: 'prostate.html' },
        { href: 'hematuria.html', label: 'Hematuria', shortLabel: 'Hematuria', page: 'hematuria.html' },
        { href: 'renal.html', label: 'Renal Mass', shortLabel: 'Renal', page: 'renal.html' },
        { href: 'stones.html', label: 'Kidney Stones', shortLabel: 'Stones', page: 'stones.html' },
        { href: 'retention.html', label: 'Urinary Retention', shortLabel: 'Retention', page: 'retention.html' },
        { href: 'about.html', label: 'About Us', shortLabel: 'About', page: 'about.html' },
        { href: '#', label: 'For Doctors', shortLabel: 'For Doctors', page: 'advice', special: 'email-link' }
    ];

    // Build mobile text navigation bar (only main items)
    const mobileIconBar = `
        <div class="clinic-nav-icons">
            ${mobileNavItems.map(item => {
        const isActive = item.page === currentPage;
        const activeClass = isActive ? ' active' : '';
        const specialClass = item.special === 'email-link' ? ' clinic-email-link' : '';
        
        return `<a href="${item.href}" class="nav-icon${activeClass}${specialClass}" title="${item.label}" aria-label="${item.label}">
                    <span class="nav-icon-label">${item.shortLabel}</span>
                </a>`;
    }).join('\n            ')}
        </div>
    `;

    // Build navigation HTML with hamburger menu (all items)
    const navHtml = `
        <nav class="clinic-nav">
            <div class="clinic-nav-container">
                ${mobileIconBar}
                <button class="clinic-nav-toggle" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="clinic-nav-menu">
                    ${allNavItems.map(item => {
        const isActive = item.page === currentPage;
        const activeClass = isActive ? ' class="active"' : '';
        const specialClass = item.special === 'email-link' ? ' class="clinic-email-link" style="color: var(--primary); font-weight: 700;"' : '';

        return `<li><a href="${item.href}"${activeClass}${specialClass}>${item.label}</a></li>`;
    }).join('\n                    ')}
                </ul>
            </div>
        </nav>
    `;

    // Inject navigation at the top of body
    document.body.insertAdjacentHTML('afterbegin', navHtml);

    // Mobile menu toggle functionality
    const navToggle = document.querySelector('.clinic-nav-toggle');
    const navMenu = document.querySelector('.clinic-nav-menu');
    const navLinks = document.querySelectorAll('.clinic-nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = event.target.closest('.clinic-nav');
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close menu on window resize if it's open and we're above mobile breakpoint
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }, 250);
        });
    }
});
