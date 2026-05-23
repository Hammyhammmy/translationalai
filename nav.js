// Shared nav/footer for v1-clinical
(function () {
    const current = (location.pathname.split('/').pop() || 'home.html');
    const isActive = (p) => current === p ? ' active' : '';

    const navHTML = `
    <nav class="nav">
        <div class="nav-inner">
            <a href="home.html" class="nav-logo">
                <span class="nav-logo-mark"></span>
                TranslationalAI
            </a>
            <div class="nav-links">
                <a href="chartprepper.html" class="nav-link${isActive('chartprepper.html')}">ChartPrepper</a>
                <a href="lab.html" class="nav-link${isActive('lab.html')}">Lab</a>
                <a href="team.html" class="nav-link${isActive('team.html')}">About</a>
                <a href="investors.html" class="nav-link${isActive('investors.html')}">Investors</a>
                <a href="https://chart.translational.ca/login" class="nav-cta" target="_blank" rel="noopener">Launch ChartPrepper →</a>
            </div>
        </div>
    </nav>`;

    const footHTML = `
    <footer class="foot">
        <div class="foot-grid">
            <div>
                <div class="foot-brand"><span class="nav-logo-mark"></span> TranslationalAI</div>
                <div class="foot-tag">Verifiable clinical AI. Built by clinicians, audited by structure. Designed and hosted in Canada.</div>
            </div>
            <div class="foot-col">
                <h4>Product</h4>
                <a href="chartprepper.html">ChartPrepper</a>
                <a href="lab.html">The Lab</a>
            </div>
            <div class="foot-col">
                <h4>Company</h4>
                <a href="team.html">About</a>
                <a href="investors.html">Investors</a>
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
                <a href="mailto:yan+investors@translational.ca">yan+investors@translational.ca</a>
                <a href="mailto:yan+enterpriseAPI@translational.ca">Enterprise & API</a>
            </div>
        </div>
        <div class="foot-bottom">
            <span>© ${new Date().getFullYear()} TranslationalAI — Canadian-built clinical AI</span>
            <span>PIPEDA-aligned · All data stored and processed in Canada</span>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', footHTML);
    });
})();
