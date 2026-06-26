// ============================================
// HOME PAGE
// ============================================

export class HomePage {
    constructor() {
        this.element = null;
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page home-page';
        page.innerHTML = `
            <style>
                .home-page {
                    padding: 0;
                    overflow: hidden;
                }
                
                /* Hero Section with Animated Background */
                .hero {
                    position: relative;
                    text-align: center;
                    padding: 100px var(--spacing-md) 80px;
                    margin-bottom: var(--spacing-xl);
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
                    overflow: hidden;
                }
                
                .hero::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .hero-content {
                    position: relative;
                    z-index: 1;
                }
                
                .hero h1 {
                    font-size: 4rem;
                    font-weight: 800;
                    margin-bottom: var(--spacing-md);
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.2;
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .hero .subtitle {
                    font-size: 1.4rem;
                    color: var(--text-secondary);
                    max-width: 700px;
                    margin: 0 auto var(--spacing-lg);
                    line-height: 1.8;
                    animation: fadeInUp 0.8s ease-out 0.2s both;
                }
                
                .hero .highlight {
                    color: var(--accent-primary);
                    font-weight: 600;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* CTA Buttons */
                .cta-buttons {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                    flex-wrap: wrap;
                    animation: fadeInUp 0.8s ease-out 0.4s both;
                }
                
                .cta-buttons .btn {
                    padding: 1rem 2.5rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: var(--radius-lg);
                    position: relative;
                    overflow: hidden;
                }
                
                .cta-buttons .btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                .cta-buttons .btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                /* Stats Section */
                .stats-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-lg);
                    max-width: 1200px;
                    margin: 0 auto var(--spacing-xl);
                    padding: 0 var(--spacing-md);
                }
                
                .stat-card {
                    text-align: center;
                    padding: var(--spacing-lg);
                    background: var(--bg-glass);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-normal);
                }
                
                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-glow);
                    border-color: var(--accent-primary);
                }
                
                .stat-card[data-navigate]:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 0 30px var(--accent-glow);
                }
                
                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: var(--spacing-xs);
                }
                
                .stat-label {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                
                /* Features Grid */
                .features-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 var(--spacing-md) var(--spacing-xl);
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: var(--spacing-xl);
                }
                
                .section-header h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: var(--spacing-sm);
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .section-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                    gap: var(--spacing-lg);
                }
                
                .feature-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    transition: all var(--transition-normal);
                    position: relative;
                    overflow: hidden;
                }
                
                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background: var(--accent-gradient);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform var(--transition-normal);
                }
                
                .feature-card:hover::before {
                    transform: scaleX(1);
                }
                
                .feature-card:hover {
                    transform: translateY(-10px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--accent-primary);
                }
                
                .feature-icon-wrapper {
                    width: 70px;
                    height: 70px;
                    background: var(--accent-gradient);
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: var(--spacing-md);
                    box-shadow: var(--shadow-glow);
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .feature-card:nth-child(2) .feature-icon-wrapper {
                    animation-delay: 0.5s;
                }
                
                .feature-card:nth-child(3) .feature-icon-wrapper {
                    animation-delay: 1s;
                }
                
                .feature-icon {
                    font-size: 2rem;
                }
                
                .feature-card h3 {
                    font-size: 1.6rem;
                    margin-bottom: var(--spacing-sm);
                    color: var(--text-primary);
                    font-weight: 700;
                }
                
                .feature-card p {
                    color: var(--text-secondary);
                    line-height: 1.7;
                    margin-bottom: var(--spacing-md);
                    font-size: 1.05rem;
                }
                
                .feature-list {
                    list-style: none;
                    padding: 0;
                }
                
                .feature-list li {
                    padding: var(--spacing-xs) 0;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-size: 0.95rem;
                }
                
                .feature-list li::before {
                    content: '✓';
                    width: 24px;
                    height: 24px;
                    background: rgba(16, 185, 129, 0.2);
                    color: var(--success);
                    font-weight: bold;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .hero h1 {
                        font-size: 2.5rem;
                    }
                    
                    .hero .subtitle {
                        font-size: 1.1rem;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .stats-section {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .section-header h2 {
                        font-size: 2rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .hero {
                        padding: 60px var(--spacing-md) 40px;
                    }
                    
                    .stats-section {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <div class="hero">
                <div class="hero-content">
                    <h1>Accelerate Your Career Journey</h1>
                    <p class="subtitle">Build <span class="highlight">ATS-friendly resumes</span>, get <span class="highlight">AI-powered feedback</span>, and ace your interviews with confidence</p>
                    <div class="cta-buttons">
                        <button class="btn btn-primary" data-navigate="templates">🚀 Build Resume Now</button>
                        <button class="btn btn-secondary" data-navigate="chatbot">💬 Talk to AI Chatbot</button>
                    </div>
                </div>
            </div>
            
            <div class="stats-section">
                <div class="stat-card" data-navigate="templates" style="cursor: pointer;">
                    <div class="stat-number">200+</div>
                    <div class="stat-label">Template Combinations</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Click to explore →</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">AI</div>
                    <div class="stat-label">Powered Insights</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">ATS Compatible</div>
                </div>
            </div>
            
            <div class="features-section">
                <div class="section-header">
                    <h2>Everything You Need to Succeed</h2>
                    <p>Comprehensive tools designed to help you land your dream job</p>
                </div>
                
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon-wrapper">
                            <span class="feature-icon">📄</span>
                        </div>
                        <h3>Resume Builder</h3>
                        <p>Create professional, ATS-optimized resumes with AI assistance or manual customization</p>
                        <ul class="feature-list">
                            <li>AI-powered content generation</li>
                            <li>16+ professional templates</li>
                            <li>Real-time preview & editing</li>
                            <li>One-click PDF export</li>
                        </ul>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon-wrapper">
                            <span class="feature-icon">🤖</span>
                        </div>
                        <h3>AI Chatbot</h3>
                        <p>Get expert feedback from our AI that thinks like a professional recruiter</p>
                        <ul class="feature-list">
                            <li>Resume quality analysis</li>
                            <li>A/B testing for resumes</li>
                            <li>Skill demand insights</li>
                            <li>Career guidance & tips</li>
                        </ul>
                    </div>
                    

                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        return page;
    }

    attachEventListeners() {
        const buttons = this.element.querySelectorAll('[data-navigate]');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-navigate');
                const navLink = document.querySelector(`[data-page="${target}"]`);
                if (navLink) navLink.click();
            });
        });
    }
}
