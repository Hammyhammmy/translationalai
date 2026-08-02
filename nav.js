// Shared nav/footer for v1-clinical
(function () {
    const current = (location.pathname.split('/').pop() || 'index.html');
    const isActive = (p) => current === p ? ' active' : '';

    const navHTML = `
    <nav class="nav">
        <div class="nav-inner">
            <a href="/" class="nav-logo">
                <span class="nav-logo-mark"></span>
                TranslationalAI
            </a>
            <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <div class="nav-links">
                <a href="/" class="nav-link${isActive('index.html')}">ChartPrepper</a>
                <a href="team.html" class="nav-link${isActive('team.html')}">About</a>
                <a href="https://chart.translational.ca/login" class="nav-cta" target="_blank" rel="noopener">Launch ChartPrepper →</a>
            </div>
        </div>
    </nav>`;

    const footHTML = `
    <footer class="foot">
        <div class="foot-grid">
            <div>
                <div class="foot-brand"><span class="nav-logo-mark"></span> TranslationalAI</div>
                <div class="foot-tag">Clinical AI with source-level transparency — every sentence traced to its source.</div>
            </div>
            <div class="foot-col">
                <h4>Product</h4>
                <a href="/">ChartPrepper</a>
            </div>
            <div class="foot-col">
                <h4>Company</h4>
                <a href="team.html">About</a>
                <a href="in-use.html">In use</a>
                <a href="mailto:yan+websitesignup@translational.ca">Pilot access</a>
            </div>
            <div class="foot-col">
                <h4>Tools</h4>
                <a href="https://chart.translational.ca/login" target="_blank" rel="noopener">ChartPrepper</a>
                <a href="https://fax.translational.ca" target="_blank" rel="noopener">Fax Triage</a>
                <a href="https://emr.translational.ca" target="_blank" rel="noopener">LightEMR</a>
                <a href="https://schedule-generator-465306031489.northamerica-northeast1.run.app" target="_blank" rel="noopener">Call Schedule</a>
                <a href="https://publicprostateland.onrender.com/" target="_blank" rel="noopener">Partner in Practice</a>
            </div>
            <div class="foot-col">
                <h4>Contact</h4>
                <a href="mailto:yan@translational.ca">yan@translational.ca</a>
                <a href="mailto:yan+enterpriseAPI@translational.ca">Enterprise & API</a>
                <a href="https://www.linkedin.com/in/hanmu-yan-42441a306" target="_blank" rel="noopener">LinkedIn</a>
            </div>
        </div>
        <div class="foot-bottom">
            <span>© ${new Date().getFullYear()} TranslationalAI — Canadian-built clinical AI</span>
            <span>PHIPA-aligned · All data stored and processed in Canada</span>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', footHTML);
        // mobile menu toggle
        const t = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        if (t && links) {
            t.addEventListener('click', () => {
                const open = links.classList.toggle('open');
                t.setAttribute('aria-expanded', open ? 'true' : 'false');
                t.classList.toggle('open', open);
            });
            // close menu on link click
            links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
                links.classList.remove('open');
                t.classList.remove('open');
                t.setAttribute('aria-expanded', 'false');
            }));
        }
    });
})();
