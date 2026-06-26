
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
                    max-width: 800px;
                    margin: 0 auto;
                    height: calc(100vh - 160px);
                    display: flex;
                    flex-direction: column;
                }
                
                .chat-container {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-md);
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    overflow: hidden;
                }
                
                .chat-header {
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--border-color);
                    background: var(--bg-glass);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .chat-header h2 {
                    font-size: 1.25rem;
                    color: var(--text-primary);
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
                    animation: fadeIn 0.3s ease-out;
                    max-width: 80%;
                }
                
                .message.user {
                    flex-direction: row-reverse;
                    align-self: flex-end;
                }
                
                .message.bot {
                    align-self: flex-start;
                }
                
                .message-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }
                
                .message.bot .message-avatar {
                    background: var(--accent-gradient);
                }
                
                .message.user .message-avatar {
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                }
                
                .message-content {
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    line-height: 1.5;
                    font-size: 0.95rem;
                }
                
                .message.bot .message-content {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border-top-left-radius: 2px;
                }
                
                .message.user .message-content {
                    background: var(--accent-gradient);
                    color: white;
                    border-top-right-radius: 2px;
                }
                
                .chat-input-area {
                    padding: var(--spacing-md);
                    border-top: 1px solid var(--border-color);
                    background: var(--bg-glass);
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
                    font-family: inherit;
                    resize: none;
                }
                
                .chat-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                }
                
                .send-btn {
                    padding: 0 var(--spacing-lg);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                    transition: opacity 0.2s;
                }

                .send-btn:hover {
                    opacity: 0.9;
                }

                .email-link-btn {
                    display: inline-block;
                    margin-top: var(--spacing-sm);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    background: var(--success);
                    color: white;
                    text-decoration: none;
                    border-radius: var(--radius-sm);
                    font-size: 0.9rem;
                    transition: transform 0.2s;
                }
                
                .email-link-btn:hover {
                    transform: translateY(-2px);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
            
            <div class="chat-container">
                <div class="chat-header">
                    <div class="message-avatar" style="background: var(--accent-gradient)">🤝</div>
                    <h2>Path2Profession Support</h2>
                </div>
                
                <div class="chat-messages" id="helpChatMessages">
                    <div class="message bot">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            Hello! I'm here to help. Please briefly describe the issue you're facing with the Resume Builder or any other feature.
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="chat-input-wrapper">
                        <textarea class="chat-input" id="helpInput" placeholder="Describe your issue here..." rows="1"></textarea>
                        <button class="send-btn" id="helpSendBtn">Send</button>
                    </div>
                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        return page;
    }

    attachEventListeners() {
        const sendBtn = this.element.querySelector('#helpSendBtn');
        const input = this.element.querySelector('#helpInput');

        const handleSend = () => {
            const message = input.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage('user', message);
            input.value = '';

            // Simulate typing delay
            setTimeout(() => {
                this.addMessage('bot', `
                    Thank you for describing the issue. 
                    <br><br>
                    Please click the button below to email our support team with these details.
                    <br>
                    <a href="mailto:support@path2profession.com?subject=Support Request: ${encodeURIComponent(message.substring(0, 50))}...&body=${encodeURIComponent(message)}" class="email-link-btn">
                        📧 Open Email Client
                    </a>
                `);
            }, 600);
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });
    }

    addMessage(sender, content) {
        const container = this.element.querySelector('#helpChatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;

        const avatar = sender === 'bot' ? '🤖' : '👤';

        msgDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${content}</div>
        `;

        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }
}
