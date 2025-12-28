/**
 * Shared Navigation Component
 * This script injects the navigation bar into all pages
 */

(function() {
    // Get current page to set active state
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    // Navigation HTML
    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="nav-logo">TranslationalAI</a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="home.html" ${currentPage === 'home.html' || currentPage === 'index.html' ? 'class="active"' : ''}>Home</a></li>
                <li><a href="lightscribe.html" ${currentPage === 'lightscribe.html' ? 'class="active"' : ''}>LightScribe</a></li>
                <li><a href="chartprepper.html" ${currentPage === 'chartprepper.html' ? 'class="active"' : ''}>ChartPrepper</a></li>
                <li><a href="partner-in-practice.html" ${currentPage === 'partner-in-practice.html' ? 'class="active"' : ''}>Partner in Practice</a></li>
                <li><a href="team.html" ${currentPage === 'team.html' ? 'class="active"' : ''}>About</a></li>
                <li class="nav-divider">|</li>
                <li class="nav-dropdown">
                    <a href="#" class="nav-dropdown-toggle">Logins <span class="dropdown-arrow">▼</span></a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="https://lightscribe-service-260133948622.northamerica-northeast1.run.app/" target="_blank" rel="noopener noreferrer">LightScribe Login</a></li>
                        <li><a href="https://chartprepper-service-cokcye7pwq-nn.a.run.app/" target="_blank" rel="noopener noreferrer">ChartPrepper Login</a></li>
                    </ul>
                </li>
            </ul>
            <div class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    `;
    
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Mobile menu toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Dropdown functionality
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        // Desktop: hover to show
        const dropdown = dropdownToggle.closest('.nav-dropdown');
        if (dropdown) {
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.classList.remove('show');
            });
        }
        
        // Mobile: click to toggle
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }
})();

