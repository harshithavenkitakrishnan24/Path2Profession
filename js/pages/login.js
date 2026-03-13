// ============================================
// LOGIN PAGE
// ============================================



// import api from '../services/api.js'; // REMOVED


export class LoginPage {
    constructor() {
        this.element = null;
        this.isLoginMode = true; // Default to Login

        if (window.location.protocol === 'file:') {
            alert('CRITICAL ERROR: You are opening this file directly.\n\nPlease open http://localhost:5000 in your browser to use the app.');
        }
    }

    render() {
        const page = document.createElement('div');

        page.className = 'page login-page';
        page.innerHTML = `
            <style>
                .login-page {
                    min-height: calc(100vh - 80px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-xl);
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
                    position: relative;
                    overflow: hidden;
                }
                
                .login-page::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
                    animation: rotate 30s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .login-container {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 450px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    box-shadow: var(--shadow-lg);
                    backdrop-filter: blur(20px);
                }
                
                .login-header {
                    text-align: center;
                    margin-bottom: var(--spacing-xl);
                }
                
                .login-header h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: var(--spacing-xs);
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .login-header p {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                }
                
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
                
                .form-group label {
                    color: var(--text-primary);
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .form-group input {
                    width: 100%;
                    padding: var(--spacing-sm) var(--spacing-md);
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-family: var(--font-secondary);
                    font-size: 1rem;
                    transition: all var(--transition-fast);
                }
                
                .form-group input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 3px var(--accent-glow);
                }
                
                .form-group input::placeholder {
                    color: var(--text-muted);
                }
                
                .password-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .password-wrapper input {
                    padding-right: 45px;
                }
                
                .password-toggle {
                    position: absolute;
                    right: 12px;
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 4px;
                    transition: all var(--transition-fast);
                    user-select: none;
                }
                
                .password-toggle:hover {
                    color: var(--accent-primary);
                    transform: scale(1.1);
                }
                
                .forgot-password {
                    text-align: right;
                    margin-top: calc(-1 * var(--spacing-sm));
                }
                
                .forgot-password a {
                    color: var(--accent-primary);
                    text-decoration: none;
                    font-size: 0.85rem;
                    transition: color var(--transition-fast);
                }
                
                .forgot-password a:hover {
                    color: var(--accent-secondary);
                    text-decoration: underline;
                }
                
                .login-btn {
                    width: 100%;
                    padding: var(--spacing-md);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    box-shadow: var(--shadow-sm);
                    margin-top: var(--spacing-sm);
                }
                
                .login-btn:hover {
                    box-shadow: var(--shadow-glow);
                    transform: translateY(-2px);
                }
                
                .login-btn:active {
                    transform: translateY(0);
                }
                
                .divider {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    margin: var(--spacing-lg) 0;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                
                .divider::before,
                .divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--border-color);
                }
                
                .social-login {
                    display: flex;
                    gap: var(--spacing-sm);
                }
                
                .social-btn {
                    flex: 1;
                    padding: 8px 24px;
                    background: #131314;
                    border: 1px solid #8e918f;
                    border-radius: 100px;
                    color: #e3e3e3;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-sm);
                    height: 40px;
                    min-width: 200px;
                }
                
                .social-btn:hover {
                    background: #202124;
                    border-color: #a1a3a1;
                    transform: translateY(-1px);
                }
                
                .guest-btn {
                    width: 100%;
                    padding: var(--spacing-sm);
                    background: var(--bg-tertiary);
                    border: 2px dashed var(--border-color);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-xs);
                    margin-top: var(--spacing-md);
                }
                
                .guest-btn:hover {
                    background: var(--bg-secondary);
                    border-color: var(--accent-primary);
                    border-style: solid;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .toggle-mode {
                    text-align: center;
                    margin-top: var(--spacing-lg);
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                }
                
                .toggle-mode a {
                    color: var(--accent-primary);
                    text-decoration: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: color var(--transition-fast);
                }
                
                .toggle-mode a:hover {
                    color: var(--accent-secondary);
                    text-decoration: underline;
                }
                
                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                    color: #ef4444;
                    padding: var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: 0.9rem;
                    display: none;
                }
                
                .error-message.show {
                    display: block;
                }
                
                /* Toast Notification Styles */
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                    pointer-events: none;
                }
                
                .toast {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md) var(--spacing-lg);
                    min-width: 320px;
                    max-width: 400px;
                    box-shadow: var(--shadow-lg);
                    backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    pointer-events: auto;
                    animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    position: relative;
                    overflow: hidden;
                }
                
                .toast::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background: var(--accent-gradient);
                }
                
                .toast.success::before {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                
                .toast.error::before {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                }
                
                .toast.info::before {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                }
                
                .toast.warning::before {
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                }
                
                .toast-icon {
                    font-size: 1.5rem;
                    flex-shrink: 0;
                    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .toast-content {
                    flex: 1;
                }
                
                .toast-title {
                    font-weight: 600;
                    font-size: 1rem;
                    color: var(--text-primary);
                    margin-bottom: 2px;
                }
                
                .toast-message {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    line-height: 1.4;
                }
                
                .toast-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 4px;
                    border-radius: var(--radius-sm);
                    transition: all var(--transition-fast);
                    flex-shrink: 0;
                }
                
                .toast-close:hover {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                }
                
                .toast.removing {
                    animation: slideOutRight 0.3s ease-in-out forwards;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                
                @keyframes bounceIn {
                    0% {
                        transform: scale(0);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                
                @media (max-width: 480px) {
                    .login-container {
                        padding: var(--spacing-lg);
                    }
                    
                    .login-header h2 {
                        font-size: 1.75rem;
                    }
                    
                    .social-login {
                        flex-direction: column;
                    }
                    
                    .toast-container {
                        left: 20px;
                        right: 20px;
                    }
                    
                    .toast {
                        min-width: auto;
                        max-width: 100%;
                    }
                }
            </style>
            
            <!-- Toast Container -->
            <div class="toast-container" id="toastContainer"></div>
            
            <div class="login-container">
                <div class="login-header">
                    <h2 id="formTitle">Welcome Back</h2>
                    <p id="formSubtitle">Sign in to continue to Path2profession</p>
                </div>
                
                <div class="error-message" id="errorMessage"></div>
                
                <form class="login-form" id="authForm">
                    <div class="form-group" id="nameGroup">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Create Password</label>
                        <div class="password-wrapper">
                            <input type="password" id="password" placeholder="Create a password" required>
                            <button type="button" class="password-toggle" data-target="password">👁️</button>
                        </div>
                    </div>
                    
                    <div class="form-group" id="confirmPasswordGroup">
                        <label for="confirmPassword">Confirm Password</label>
                        <div class="password-wrapper">
                            <input type="password" id="confirmPassword" placeholder="Confirm your password">
                            <button type="button" class="password-toggle" data-target="confirmPassword">👁️</button>
                        </div>
                    </div>

                    <div class="form-group" id="phoneGroup">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="Enter your phone number">
                    </div>

                    <!-- Captcha Section -->
                    <div id="captchaContainer" style="display: none; margin-bottom: 1rem;">
                        <label style="color: var(--text-primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Verification</label>
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                            <canvas id="captchaCanvas" width="150" height="50" style="background: #222; border-radius: 8px; cursor: pointer;" title="Click to refresh"></canvas>
                            <button type="button" id="refreshCaptcha" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">🔄</button>
                        </div>
                        <input type="text" id="captchaInput" class="input" placeholder="Enter the code above" style="width: 100%; padding: 0.75rem; border-radius: 8px;">
                    </div>
                    
                    <div class="form-group" id="otpGroup" style="display: none;">
                        <label for="otp">Verification Code</label>
                        <input type="text" id="otp" placeholder="Enter 6-digit code" maxlength="6" style="letter-spacing: 4px; text-align: center; font-size: 1.2rem;">
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 5px;">
                            Code sent to your email. Check console if testing.
                        </p>
                    </div>
                    
                    <div class="forgot-password" id="forgotPassword">
                        <a href="#" id="forgotLink">Forgot password?</a>
                    </div>
                    
                    <button type="submit" class="login-btn" id="submitBtn">Sign In</button>
                    <button type="button" class="login-btn" id="verifyBtn" style="display: none; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">Verify Code</button>
                </form>
                
                <div class="divider" id="divider">or continue with</div>
                
                <div class="social-login" id="socialLogin" style="display: flex; flex-direction: column; gap: 12px; align-items: center; width: 100%;">
                    <div id="googleBtnContainer" style="width: 200px;">
                        <div id="googleSignInDiv"></div>
                    </div>
                    <button class="social-btn" id="githubBtn">
                        <svg height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                        <span>Continue with GitHub</span>
                    </button>
                </div>
                
                <!-- Guest button removed -->
                
                <div class="toggle-mode" id="toggleMode">
                    <span id="toggleText">Don't have an account?</span>
                    <a id="toggleLink">Sign Up</a>
                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();

        // Apply initial state
        this.toggleMode();

        return page;
    }

    attachEventListeners() {
        const form = this.element.querySelector('#authForm');
        const toggleLink = this.element.querySelector('#toggleLink');
        const googleBtn = this.element.querySelector('#googleBtn');
        const githubBtn = this.element.querySelector('#githubBtn');
        const forgotLink = this.element.querySelector('#forgotLink');
        const verifyBtn = this.element.querySelector('#verifyBtn');

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Verify OTP Button
        verifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleOTPVerification();
        });

        // Toggle between login and signup
        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });

        // Social login buttons
        // googleBtn.addEventListener('click', () => {
        //     this.handleSocialLogin('Google');
        // });
        // this.initGoogleSignIn(); // MOVED TO onMount

        githubBtn.addEventListener('click', () => {
            this.handleSocialLogin('GitHub');
        });

        // Forgot password
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });

        // Captcha Refresh
        const refreshCaptchaBtn = this.element.querySelector('#refreshCaptcha');
        const captchaCanvas = this.element.querySelector('#captchaCanvas');

        if (refreshCaptchaBtn) {
            refreshCaptchaBtn.addEventListener('click', () => this.generateCaptcha());
        }
        if (captchaCanvas) {
            captchaCanvas.addEventListener('click', () => this.generateCaptcha());
        }

        // Password toggle buttons
        const passwordToggles = this.element.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const input = this.element.querySelector(`#${targetId}`);

                if (input.type === 'password') {
                    input.type = 'text';
                    toggle.textContent = '🙈'; // Hide icon
                } else {
                    input.type = 'password';
                    toggle.textContent = '👁️'; // Show icon
                }
            });
        });
    }

    toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        this.isOtpMode = false; // Reset OTP mode

        const formTitle = this.element.querySelector('#formTitle');
        const formSubtitle = this.element.querySelector('#formSubtitle');
        const nameGroup = this.element.querySelector('#nameGroup');
        const phoneGroup = this.element.querySelector('#phoneGroup');
        const captchaContainer = this.element.querySelector('#captchaContainer');
        const confirmPasswordGroup = this.element.querySelector('#confirmPasswordGroup');
        const forgotPassword = this.element.querySelector('#forgotPassword');
        const submitBtn = this.element.querySelector('#submitBtn');
        const verifyBtn = this.element.querySelector('#verifyBtn');
        const otpGroup = this.element.querySelector('#otpGroup');
        const toggleText = this.element.querySelector('#toggleText');
        const toggleLink = this.element.querySelector('#toggleLink');
        const errorMessage = this.element.querySelector('#errorMessage');
        const socialLogin = this.element.querySelector('#socialLogin');
        const divider = this.element.querySelector('#divider');
        const toggleModeDiv = this.element.querySelector('#toggleMode');

        // Hide error message
        errorMessage.classList.remove('show');

        // Reset OTP UI
        otpGroup.style.display = 'none';
        verifyBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        socialLogin.style.display = 'flex';
        divider.style.display = 'flex';
        toggleModeDiv.style.display = 'block';

        // Re-initialize Google Sign-In if we toggle between login/signup
        // to ensure the button is properly rendered in the container
        this.initGoogleSignIn();

        if (this.isLoginMode) {
            formTitle.textContent = 'Welcome Back';
            formSubtitle.textContent = 'Sign in to continue to Path2profession';
            nameGroup.style.display = 'none';
            phoneGroup.style.display = 'none';
            captchaContainer.style.display = 'none';
            confirmPasswordGroup.style.display = 'none';
            forgotPassword.style.display = 'block';
            submitBtn.textContent = 'Sign In';
            toggleText.textContent = "Don't have an account?";
            toggleLink.textContent = 'Sign Up';

            // Update labels for Login mode
            this.element.querySelector('label[for="password"]').textContent = "Password";
        } else {
            formTitle.textContent = 'Create Account';
            formSubtitle.textContent = 'Join Path2profession and start building your career';
            nameGroup.style.display = 'block';
            phoneGroup.style.display = 'block';
            captchaContainer.style.display = 'block';
            this.generateCaptcha();
            confirmPasswordGroup.style.display = 'block';
            forgotPassword.style.display = 'none';
            submitBtn.textContent = 'Sign Up';
            toggleText.textContent = 'Already have an account?';
            toggleLink.textContent = 'Sign In';

            // Update labels for Signup mode
            this.element.querySelector('label[for="password"]').textContent = "Create Password";
        }
    }

    showOtpUI(email, type) {
        this.isOtpMode = true;
        this.pendingEmail = email;
        this.authType = type; // 'login' or 'register'

        const formTitle = this.element.querySelector('#formTitle');
        const formSubtitle = this.element.querySelector('#formSubtitle');
        const nameGroup = this.element.querySelector('#nameGroup');
        const phoneGroup = this.element.querySelector('#phoneGroup');
        const captchaContainer = this.element.querySelector('#captchaContainer');
        const confirmPasswordGroup = this.element.querySelector('#confirmPasswordGroup');
        const forgotPassword = this.element.querySelector('#forgotPassword');
        const submitBtn = this.element.querySelector('#submitBtn');
        const verifyBtn = this.element.querySelector('#verifyBtn');
        const otpGroup = this.element.querySelector('#otpGroup');
        const socialLogin = this.element.querySelector('#socialLogin');
        const divider = this.element.querySelector('#divider');
        const toggleModeDiv = this.element.querySelector('#toggleMode');

        // Hide standard fields
        nameGroup.style.display = 'none';
        phoneGroup.style.display = 'none';
        captchaContainer.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        forgotPassword.style.display = 'none';
        this.element.querySelector('.form-group:nth-child(2)').style.display = 'none'; // Email
        this.element.querySelector('.form-group:nth-child(3)').style.display = 'none'; // Password

        // Hide social login and toggle
        socialLogin.style.display = 'none';
        divider.style.display = 'none';
        toggleModeDiv.style.display = 'none';

        // Show OTP fields
        otpGroup.style.display = 'block';
        submitBtn.style.display = 'none';
        verifyBtn.style.display = 'block';

        formTitle.textContent = 'Verify Email';
        formSubtitle.textContent = `Enter the 6-digit code sent to ${email}`;

        // Focus OTP input
        setTimeout(() => this.element.querySelector('#otp').focus(), 100);
    }

    generateCaptcha() {
        if (this.isLoginMode) return; // Don't generate if in login mode (though hidden)

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captchaCodes = '';
        for (let i = 0; i < 6; i++) {
            captchaCodes += chars[Math.floor(Math.random() * chars.length)];
        }
        this.currentCaptcha = captchaCodes;

        const canvas = this.element.querySelector('#captchaCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#222';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add noise
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = Math.random() > 0.5 ? '#333' : '#444';
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, 2 * Math.PI);
                ctx.fill();
            }

            ctx.font = 'bold 24px Courier New';
            ctx.fillStyle = '#6366f1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw text with slight rotation for each char
            let x = 20;
            for (let i = 0; i < captchaCodes.length; i++) {
                ctx.save();
                ctx.translate(x, 25);
                ctx.rotate((Math.random() - 0.5) * 0.4);
                ctx.fillText(captchaCodes[i], 0, 0);
                ctx.restore();
                x += 20;
            }
        }
    }

    async handleSubmit() {
        const email = this.element.querySelector('#email').value;
        const password = this.element.querySelector('#password').value;
        const errorMessage = this.element.querySelector('#errorMessage');
        const submitBtn = this.element.querySelector('#submitBtn');

        // Basic validation
        if (!email || !password) {
            this.showError('Please fill in all required fields');
            return;
        }

        if (!this.isLoginMode) {
            const fullName = this.element.querySelector('#fullName').value;
            const phone = this.element.querySelector('#phone').value;
            const captchaInput = this.element.querySelector('#captchaInput').value;
            const confirmPassword = this.element.querySelector('#confirmPassword').value;

            if (!fullName) {
                this.showError('Please enter your full name');
                return;
            }

            if (!phone) {
                this.showError('Please enter your phone number');
                return;
            }

            if (this.currentCaptcha && captchaInput !== this.currentCaptcha) {
                this.showError('Invalid Captcha. Please try again.');
                this.generateCaptcha(); // Refresh on failure
                return;
            }

            if (password !== confirmPassword) {
                this.showError('Passwords do not match');
                return;
            }

            if (password.length < 6) {
                this.showError('Password must be at least 6 characters');
                return;
            }
        }

        // Hide error message
        errorMessage.classList.remove('show');

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        try {
            let response;
            if (this.isLoginMode) {
                // LOGIN FLOW
                console.log('Attempting login with:', email);
                const { default: api } = await import('../services/api.js');
                response = await api.auth.login(email, password);
                console.log('Login response:', response);
            } else {
                // SIGNUP FLOW
                const fullName = this.element.querySelector('#fullName').value;
                console.log('Attempting registration with:', email, fullName);
                const { default: api } = await import('../services/api.js');
                response = await api.auth.register(email, password, fullName);
                console.log('Registration response:', response);
            }

            // If successful, show Success Toast
            this.showToast('success', 'Success!', 'Welcome to Path2Profession!');

            // DIRECT LOGIN (No OTP)
            if (response.token) {
                localStorage.setItem('token', response.token);
                const user = response.user;
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userName', user.displayName);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('isAuthenticated', 'true');

                // Redirect
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                // Fallback (should not happen with new backend)
                this.showOtpUI(email, response.type);
            }

        } catch (error) {
            console.error('Login/Register Error:', error);
            alert('Login Error: ' + error.message);
            this.showError(error.message);
            this.showToast('error', 'Error!', error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = this.isLoginMode ? 'Sign In' : 'Sign Up';
        }
    }

    async handleOTPVerification() {
        const otpInput = this.element.querySelector('#otp');
        const otp = otpInput.value;
        const verifyBtn = this.element.querySelector('#verifyBtn');

        if (!otp || otp.length !== 6) {
            this.showError('Please enter a valid 6-digit code');
            return;
        }

        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Verifying...';

        try {
            const { default: api } = await import('../services/api.js');
            const response = await api.auth.verifyOTP(this.pendingEmail, otp);

            // SUCCESS!
            localStorage.setItem('token', response.token);
            const user = response.user;
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('isAuthenticated', 'true');

            this.showToast('success', 'Verified!', 'You are now logged in.');

            // Redirect
            setTimeout(() => {
                window.location.hash = '#home';
            }, 1000);

        } catch (error) {
            this.showError(error.message);
        }
    }

    async initGoogleSignIn() {
        try {
            // Wait for Google script to load if it hasn't yet
            if (typeof google === 'undefined') {
                console.log('Waiting for Google Identity Services script...');
                let retries = 0;
                while (typeof google === 'undefined' && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
            }

            if (typeof google === 'undefined') {
                console.error('Google Identity Services script failed to load.');
                return;
            }

            const { default: api } = await import('../services/api.js');
            const config = await api.auth.getConfig();

            if (!config || !config.googleClientId) {
                console.warn('Google Client ID not found. Google Sign-In will not be initialized.');
                return;
            }

            google.accounts.id.initialize({
                client_id: config.googleClientId,
                callback: this.handleGoogleCallback.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });

            // Display One Tap prompt
            google.accounts.id.prompt();

            const googleSignInDiv = this.element.querySelector('#googleSignInDiv');
            if (googleSignInDiv) {
                google.accounts.id.renderButton(
                    googleSignInDiv,
                    {
                        theme: "filled_black",
                        size: "large",
                        shape: "pill",
                        width: 200,
                        text: "signin_with"
                    }
                );
            }
        } catch (error) {
            console.error('Failed to initialize Google Sign-In:', error);
        }
    }

    async handleGoogleCallback(response) {
        console.log('Google Sign-In response received');
        try {
            const { default: api } = await import('../services/api.js');
            const result = await api.auth.googleLogin(response.credential);

            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userEmail', result.user.email);
                localStorage.setItem('userName', result.user.displayName);
                localStorage.setItem('userId', result.user.id);
                localStorage.setItem('isAuthenticated', 'true');

                this.showToast('success', 'Logged In!', `Welcome, ${result.user.displayName}`);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            this.showToast('error', 'Login Failed', error.message);
        }
    }

    handleSocialLogin(provider) {
        console.log(`${provider} login attempted`);
        this.showToast('info', 'Coming Soon!', `${provider} authentication will be available in a future update.`);
    }

    handleForgotPassword() {
        console.log('Forgot password clicked');
        this.showToast('info', 'Coming Soon!', 'Password reset functionality is being worked on.');
    }

    showToast(type, title, message) {
        const toastContainer = this.element.querySelector('#toastContainer');
        const toast = document.createElement('div');

        toast.className = `toast ${type}`;

        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
        `;

        // Close on click
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        });

        // Auto remove
        setTimeout(() => {
            if (toast.isConnected) {
                toast.classList.add('removing');
                toast.addEventListener('animationend', () => {
                    toast.remove();
                });
            }
        }, 5000);

        toastContainer.appendChild(toast);
    }

    // Lifecycle Method: Called after page is attached to DOM
    onMount() {
        console.log('LoginPage mounted');
        this.initGoogleSignIn();
    }
}


