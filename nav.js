/**
 * Shared Navigation Component
 * This script injects the navigation bar into all pages
 */

(function () {
    // Get current page to set active state
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    // Navigation HTML
    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="nav-logo">TranslationalAI</a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="chartprepper.html" ${currentPage === 'chartprepper.html' ? 'class="active"' : ''}>ChartPrepper</a></li>
                <li class="nav-dropdown">
                    <a href="#" class="nav-dropdown-toggle">More<span class="dropdown-arrow">▼</span></a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="lightemr.html">LightEMR</a></li>
                        <li><a href="partner-in-practice.html">Partner in Practice</a></li>
                        <li><a href="data-science.html">Data Science</a></li>
                    </ul>
                </li>
                <li><a href="team.html" ${currentPage === 'team.html' ? 'class="active"' : ''}>About</a></li>
                <li class="nav-divider">|</li>
                <li><a href="https://chart.translational.ca/login" target="_blank" rel="noopener noreferrer" style="background:var(--primary); color:white; padding:6px 16px; border-radius:20px; font-weight:600; font-size:13px;">Launch ChartPrepper</a></li>
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
    const dropdown = document.querySelector('.nav-dropdown');

    if (dropdownToggle && dropdownMenu && dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            dropdownMenu.classList.add('show');
            dropdown.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownMenu.classList.remove('show');
            dropdown.classList.remove('show');
        });

        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
            dropdown.classList.toggle('show');
        });
    }

    // Footer HTML
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-copy">
                &copy; ${new Date().getFullYear()} TranslationalAI. All rights reserved.
            </div>
            <ul class="footer-links">
                <li><a href="mailto:yan+websitesignup@translational.ca">Contact</a></li>
            </ul>
        </div>
    </footer>
    `;

    // Insert footer at the end of body
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    });
})();


