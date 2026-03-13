import api from '../services/api.js';

export class HelpPage {
    constructor() {
        this.element = null;
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page help-page';
        page.innerHTML = `
            <style>
                .help-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: var(--spacing-xl) var(--spacing-md);
                    color: var(--text-primary);
                }

                .help-header {
                    text-align: center;
                    margin-bottom: var(--spacing-xl);
                }

                .help-header h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: var(--spacing-sm);
                }

                .help-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .help-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                }

                .help-card {
                    background: var(--bg-glass);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    transition: all var(--transition-normal);
                    backdrop-filter: blur(10px);
                }

                .help-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-glow);
                    border-color: var(--accent-primary);
                }

                .card-icon {
                    font-size: 2rem;
                    margin-bottom: var(--spacing-md);
                    display: block;
                }

                .help-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: var(--spacing-md);
                    color: var(--accent-primary);
                }

                .help-card ul {
                    list-style: none;
                    padding: 0;
                }

                .help-card li {
                    margin-bottom: var(--spacing-sm);
                    display: flex;
                    align-items: flex-start;
                    gap: var(--spacing-sm);
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .help-card li::before {
                    content: '➜';
                    color: var(--accent-primary);
                    font-weight: bold;
                }

                /* FAQ Section */
                .faq-section {
                    margin-bottom: var(--spacing-xl);
                }

                .faq-section h2 {
                    text-align: center;
                    margin-bottom: var(--spacing-lg);
                    font-size: 2rem;
                }

                .faq-item {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--spacing-sm);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .faq-question {
                    padding: var(--spacing-md) var(--spacing-lg);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 600;
                    user-select: none;
                }

                .faq-question:hover {
                    background: var(--bg-tertiary);
                }

                .faq-answer {
                    padding: 0 var(--spacing-lg);
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .faq-item.active .faq-answer {
                    padding: 0 var(--spacing-lg) var(--spacing-md);
                    max-height: 200px;
                }

                .faq-item.active .faq-icon {
                    transform: rotate(180deg);
                }

                .faq-icon {
                    transition: transform 0.3s ease;
                }

                /* Chat Section */
                .support-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-xl);
                    align-items: start;
                }

                .contact-info {
                    padding: var(--spacing-xl);
                }

                .contact-info h2 {
                    font-size: 2rem;
                    margin-bottom: var(--spacing-md);
                }

                .contact-info p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-lg);
                }

                .chat-container {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-md);
                    display: flex;
                    flex-direction: column;
                    height: 500px;
                    overflow: hidden;
                }
                
                .chat-header {
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--border-color);
                    background: var(--bg-glass);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: var(--spacing-md);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .message {
                    display: flex;
                    gap: var(--spacing-sm);
                    max-width: 85%;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .message.user {
                    flex-direction: row-reverse;
                    align-self: flex-end;
                }
                
                .message.bot {
                    align-self: flex-start;
                }
                
                .message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    flex-shrink: 0;
                }
                
                .message-content {
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    line-height: 1.5;
                    font-size: 0.9rem;
                }
                
                .message.bot .message-content {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                }
                
                .message.user .message-content {
                    background: var(--accent-gradient);
                    color: white;
                }
                
                .chat-input-area {
                    padding: var(--spacing-md);
                    border-top: 1px solid var(--border-color);
                }
                
                .chat-input-wrapper {
                    display: flex;
                    gap: var(--spacing-sm);
                }
                
                .chat-input {
                    flex: 1;
                    padding: var(--spacing-sm) var(--spacing-md);
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    resize: none;
                }
                
                .send-btn {
                    padding: 0 var(--spacing-lg);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                }

                .email-link-btn {
                    display: inline-block;
                    margin-top: var(--spacing-sm);
                    padding: 8px 16px;
                    background: var(--accent-primary);
                    color: white;
                    text-decoration: none;
                    border-radius: var(--radius-sm);
                    font-size: 0.85rem;
                    transition: opacity 0.2s;
                    margin-right: 8px;
                }
                
                .copy-btn {
                    display: inline-block;
                    margin-top: var(--spacing-sm);
                    padding: 7px 14px;
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .copy-btn:hover {
                    background: var(--bg-secondary);
                    border-color: var(--accent-primary);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 992px) {
                    .support-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <div class="help-header">
                <h1>Help & Support Center</h1>
                <p>Everything you need to master your career journey with Path2Profession.</p>
            </div>

            <div class="help-grid">
                <!-- Quick Start -->
                <div class="help-card">
                    <span class="card-icon">🚀</span>
                    <h3>Quick Start Guide</h3>
                    <ul>
                        <li><strong>Build:</strong> Choose a template from the Gallery to start.</li>
                        <li><strong>AI Power:</strong> Use the "AI Generate" button to fill your resume instantly.</li>
                        <li><strong>Customize:</strong> Edit any text directly on the canvas.</li>
                        <li><strong>Download:</strong> Click "Download PDF" to save your professional resume.</li>
                    </ul>
                </div>

                <!-- ATS Tips -->
                <div class="help-card">
                    <span class="card-icon">🎯</span>
                    <h3>ATS Optimization Tips</h3>
                    <ul>
                        <li><strong>Clean Layout:</strong> Use "ATS Basic" for maximum software compatibility.</li>
                        <li><strong>Keywords:</strong> Match your skills with the Job Description keywords.</li>
                        <li><strong>Standard Headings:</strong> Use standard titles like "Work Experience" or "Education".</li>
                        <li><strong>PDF Format:</strong> Our export is designed to be easily readable by ATS scanners.</li>
                    </ul>
                </div>
            </div>

            <div class="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <div class="faq-question">How do I improve my ATS score? <span class="faq-icon">▼</span></div>
                        <div class="faq-answer">Include metrics (e.g., "Increased sales by 20%") and ensure your skills section matches the job you are applying for. The higher the keyword match, the higher the score.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Is my data secure? <span class="faq-icon">▼</span></div>
                        <div class="faq-answer">Yes, your data is stored securely and is only used to help you build and manage your resumes and job applications.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Can I manage multiple resumes? <span class="faq-icon">▼</span></div>
                        <div class="faq-answer">Absolutely! All your created resumes are saved in your dashboard under "My Resumes". You can duplicate and customize them for different jobs.</div>
                    </div>
                </div>
            </div>

            <div class="support-container">
                <div class="contact-info">
                    <h2>Still need help?</h2>
                    <p>Our intelligent assistant and support team are here for you 24/7. Ask a question or reach out via email.</p>
                    <div style="display: flex; align-items: center; gap: 10px; color: var(--text-secondary);">
                        <span>📍 Chennai, India</span>
                    </div>
                </div>

                <div class="chat-container">
                    <div class="chat-header">
                        <div class="message-avatar" style="background: var(--accent-gradient)">🤝</div>
                        <div style="font-weight: 600;">AI Support Assistant</div>
                    </div>
                    
                    <div class="chat-messages" id="helpChatMessages">
                        <div class="message bot">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                Hello! How can I assist you with Path2Profession today? Describe your issue below.
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input-area">
                        <div class="chat-input-wrapper">
                            <textarea class="chat-input" id="helpInput" placeholder="Type your issue..." rows="1"></textarea>
                            <button class="send-btn" id="helpSendBtn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        return page;
    }

    attachEventListeners() {
        // FAQ Accordion
        const faqQuestions = this.element.querySelectorAll('.faq-question');
        faqQuestions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                item.classList.toggle('active');
            });
        });

        // Chat functionality
        const sendBtn = this.element.querySelector('#helpSendBtn');
        const input = this.element.querySelector('#helpInput');

        sendBtn.addEventListener('click', () => this.handleSend());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Event delegation for copy buttons
        this.element.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                const text = copyBtn.dataset.copy;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '✅ Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    }

    async handleSend() {
        const input = this.element.querySelector('#helpInput');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call AI API
            const response = await api.chat.send(message, 'general');

            this.removeTypingIndicator();
            this.addMessage('bot', response.reply);

            // Add email fallback as a subtle hint after AI response
            const email = 'support@path2profession.com';
            const footerDiv = document.createElement('div');
            footerDiv.style.fontSize = '0.8rem';
            footerDiv.style.marginTop = 'var(--spacing-xs)';
            footerDiv.style.color = 'var(--text-secondary)';
            footerDiv.innerHTML = `Still have questions? <a href="mailto:${email}" style="color: var(--accent-primary)">Email us</a>`;

            const lastMessage = this.element.querySelector('#helpChatMessages').lastElementChild;
            if (lastMessage && lastMessage.querySelector('.message-content')) {
                lastMessage.querySelector('.message-content').appendChild(footerDiv);
            }

        } catch (error) {
            console.error('Support Chat Error:', error);
            this.removeTypingIndicator();

            const email = 'support@path2profession.com';
            this.addMessage('bot', `
                I'm having trouble connecting to my AI brain right now. 
                <br><br>
                Please reach out to our team directly:
                <br>
                <a href="mailto:${email}?subject=Support Req: ${encodeURIComponent(message.substring(0, 30))}" class="email-link-btn">
                    📧 Email Support
                </a>
                <button class="copy-btn" data-copy="${email}">
                    📋 Copy Address
                </button>
            `);
        }
    }

    showTypingIndicator() {
        const container = this.element.querySelector('#helpChatMessages');
        const indicator = document.createElement('div');
        indicator.className = 'message bot typing-indicator-msg';
        indicator.innerHTML = `
            <div class="message-avatar" style="background: var(--accent-gradient)">🤖</div>
            <div class="message-content" style="background: var(--bg-tertiary); display: flex; gap: 4px; padding: 10px;">
                <div class="typing-dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary); animation: pulse 1.4s infinite;"></div>
                <div class="typing-dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary); animation: pulse 1.4s infinite; animation-delay: 0.2s;"></div>
                <div class="typing-dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary); animation: pulse 1.4s infinite; animation-delay: 0.4s;"></div>
            </div>
        `;
        container.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = this.element.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
    }

    addMessage(sender, content) {
        const container = this.element.querySelector('#helpChatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;

        const avatar = sender === 'bot' ? '🤖' : '👤';

        msgDiv.innerHTML = `
            <div class="message-avatar" style="${sender === 'user' ? 'background: var(--bg-tertiary); border: 1px solid var(--border-color);' : 'background: var(--accent-gradient);'}">${avatar}</div>
            <div class="message-content">${content}</div>
        `;

        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }
}
