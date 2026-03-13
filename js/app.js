// ============================================
// APP INITIALIZATION & ROUTING
// ============================================

import { HomePage } from './pages/home.js';
import { ResumePage } from './pages/resume.js';
import { ChatbotPage } from './pages/chatbot.js';
import { JobsPage } from './pages/jobs.js';

import { LoginPage } from './pages/login.js';
import { TemplateGalleryPage } from './pages/templateGallery.js';
import { ResumeEntryPage } from './pages/resumeEntry.js';
import { HelpPage } from './pages/help.js';

class App {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: HomePage,
            resume: ResumePage,
            chatbot: ChatbotPage,
            jobs: JobsPage,

            login: LoginPage,
            templates: ResumeEntryPage,
            gallery: TemplateGalleryPage,
            help: HelpPage
        };

        this.init();
    }

    init() {
        try {
            this.setupThemeToggle();
            this.setupNavigation();
        } catch (error) {
            console.error('Initialization error:', error);
        }

        // Handle Splash Screen
        const splashScreen = document.getElementById('splashScreen');
        const app = document.getElementById('app');

        // Safety timeout to ensure app is always shown
        setTimeout(() => {
            if (splashScreen && splashScreen.style.display !== 'none') {
                console.warn('Splash screen forced close due to timeout');
                splashScreen.style.display = 'none';
                if (app) {
                    app.style.display = 'block';
                    app.style.opacity = '1';
                }
                // Ensure auth is checked if we force open
                if (!this.authChecked) {
                    this.checkAuth();
                }
            }
        }, 5000);

        // Ensure app is hidden initially (already set in HTML)
        if (app) app.style.display = 'none';

        // Wait for animation - FASTER NOW (1.5s)
        setTimeout(() => {
            // Fade out splash
            if (splashScreen) {
                splashScreen.classList.add('fade-out');

                // Remove splash after fade out and show app
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    this.showApp(app);
                    // Proceed with Auth Check
                    if (!this.authChecked) {
                        this.checkAuth();
                    }
                }, 500);
            } else {
                console.warn('Splash screen not found, showing app immediately');
                this.showApp(app);
                this.checkAuth();
            }
        }, 1500); // Reduced from 3000 to 1500 for better UX
    }

    showApp(app) {
        if (app) {
            app.style.display = 'block';
            // Force layout reflow
            app.offsetHeight;
            app.style.opacity = '1';
        }
    }

    checkAuth() {
        this.authChecked = true; // Prevent double checking
        // Check if user is authenticated
        // REMOVED GUEST MODE CHECK as per requirements
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        // Update navigation visibility
        this.updateNavVisibility(isAuthenticated);

        // Load login page first if not authenticated
        if (isAuthenticated) {
            this.loadPage('home');
        } else {
            this.loadPage('login');
            // Update nav active state
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(l => l.classList.remove('active'));
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';

        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.querySelector('.theme-icon').textContent = newTheme === 'light' ? '☀️' : '🌙';
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const page = link.getAttribute('data-page');

                // Only handle routing if data-page is present
                if (page) {
                    e.preventDefault();

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Load page
                    this.loadPage(page);
                }
            });
        });

        // Add event listener for login link
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadPage('login');
            });
        }

        // Add event listener for logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();

                // Get current user email
                const userEmail = localStorage.getItem('userEmail');

                // Remove from active sessions
                if (userEmail) {
                    const activeSessions = JSON.parse(localStorage.getItem('activeSessions') || '[]');
                    const emailLower = userEmail.toLowerCase();
                    const updatedSessions = activeSessions.filter(email => email !== emailLower);
                    localStorage.setItem('activeSessions', JSON.stringify(updatedSessions));
                }

                // Clear authentication state
                // Clear authentication state
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('userEmail');
                // Reload to login page
                this.loadPage('login');
                // Update nav visibility
                this.updateNavVisibility(false);
            });
        }
    }

    loadPage(pageName) {
        const mainContent = document.getElementById('mainContent');
        const PageClass = this.pages[pageName];

        if (PageClass) {
            try {
                mainContent.innerHTML = '';
                const page = new PageClass();
                mainContent.appendChild(page.render());

                // New: Call onMount after the element is in the DOM
                if (typeof page.onMount === 'function') {
                    page.onMount();
                }

                this.currentPage = pageName;

                // Update navigation visibility based on current page
                const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
                this.updateNavVisibility(isAuthenticated);
            } catch (error) {
                console.error(`Error loading page ${pageName}:`, error);
                mainContent.innerHTML = `
                    <div style="padding: 40px; text-align: center; color: #ef4444;">
                        <h2>Something went wrong</h2>
                        <p>We couldn't load this page. Please try refreshing.</p>
                        <pre style="text-align: left; background: #fef2f2; padding: 20px; border-radius: 8px; margin-top: 20px; overflow: auto; max-width: 800px; margin-left: auto; margin-right: auto;">${error.message}\n${error.stack}</pre>
                        <button onclick="localStorage.removeItem('resumeData'); window.location.reload();" style="margin-top: 20px; padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Reset Resume Data & Retry</button>
                    </div>
                `;
            }
        }
    }

    updateNavVisibility(isLoggedIn) {
        const navMenu = document.getElementById('navMenu');
        const loginLink = document.getElementById('loginLink');
        const logoutBtn = document.getElementById('logoutBtn');

        if (isLoggedIn) {
            // Show navigation menu and logout button, hide login link
            if (navMenu) navMenu.classList.remove('hidden');
            if (loginLink) loginLink.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            // Hide navigation menu and logout button, show login link
            if (navMenu) navMenu.classList.add('hidden');
            if (loginLink) loginLink.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
