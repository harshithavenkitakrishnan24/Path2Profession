// ============================================
// AI CHATBOT PAGE
// ============================================

import api from '../services/api.js';

export class ChatbotPage {
    constructor() {
        this.element = null;
        this.messages = [];
        this.currentMode = 'feedback'; // feedback, ab-test, skills
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page chatbot-page';
        page.innerHTML = `
            <style>
                .chatbot-page {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    gap: var(--spacing-lg);
                    padding: var(--spacing-lg) 0;
                    height: calc(100vh - 160px);
                }
                
                .chat-sidebar {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    box-shadow: var(--shadow-md);
                }
                
                .sidebar-header {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: var(--spacing-md);
                    color: var(--text-primary);
                }
                
                .mode-list {
                    list-style: none;
                    padding: 0;
                }
                
                .mode-item {
                    padding: var(--spacing-sm);
                    margin-bottom: var(--spacing-xs);
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                }
                
                .mode-item:hover {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                }
                
                .mode-item.active {
                    background: var(--accent-gradient);
                    color: white;
                }
                
                .chat-container {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-md);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .chat-header {
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--border-color);
                    background: var(--bg-glass);
                    backdrop-filter: blur(10px);
                    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
                }
                
                .chat-header h2 {
                    font-size: 1.5rem;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .chat-header p {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-top: var(--spacing-xs);
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
                }
                
                .message.user {
                    flex-direction: row-reverse;
                }
                
                .message-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    flex-shrink: 0;
                }
                
                .message.bot .message-avatar {
                    background: var(--accent-gradient);
                }
                
                .message.user .message-avatar {
                    background: var(--bg-tertiary);
                    border: 2px solid var(--border-color);
                }
                
                .message-content {
                    max-width: 70%;
                    background: var(--bg-tertiary);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    line-height: 1.5;
                }
                
                .message.user .message-content {
                    background: var(--accent-gradient);
                    color: white;
                }
                
                .message.bot .message-content {
                    border: 1px solid var(--border-color);
                }
                
                .chat-input-area {
                    padding: var(--spacing-md);
                    border-top: 1px solid var(--border-color);
                    background: var(--bg-glass);
                    backdrop-filter: blur(10px);
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
                    font-family: var(--font-secondary);
                    font-size: 1rem;
                    resize: none;
                    max-height: 120px;
                }
                
                .chat-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 3px var(--accent-glow);
                }
                
                .send-btn {
                    padding: var(--spacing-sm) var(--spacing-lg);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all var(--transition-fast);
                }
                
                .send-btn:hover {
                    box-shadow: var(--shadow-glow);
                    transform: translateY(-2px);
                }
                
                .send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .quick-actions {
                    display: flex;
                    gap: var(--spacing-xs);
                    margin-top: var(--spacing-sm);
                    flex-wrap: wrap;
                }
                
                .quick-action-btn {
                    padding: var(--spacing-xs) var(--spacing-sm);
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    transition: all var(--transition-fast);
                }
                
                .quick-action-btn:hover {
                    background: var(--accent-primary);
                    color: white;
                    border-color: var(--accent-primary);
                }
                
                .analysis-card {
                    background: var(--bg-glass);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    margin-top: var(--spacing-sm);
                }
                
                .analysis-card h4 {
                    color: var(--accent-primary);
                    margin-bottom: var(--spacing-xs);
                }
                
                .analysis-card ul {
                    margin-left: var(--spacing-md);
                    color: var(--text-secondary);
                }
                
                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: var(--spacing-sm);
                }
                
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--accent-primary);
                    animation: pulse 1.4s infinite;
                }
                
                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @media (max-width: 768px) {
                    .chatbot-page {
                        grid-template-columns: 1fr;
                    }
                    
                    .chat-sidebar {
                        display: none;
                    }
                }
            </style>
            
            <div class="chat-sidebar">
                <div class="sidebar-header">AI Modes</div>
                <ul class="mode-list">
                    <li class="mode-item active" data-mode="feedback">
                        <span>💬</span>
                        <span>Resume Feedback</span>
                    </li>
                    <li class="mode-item" data-mode="ab-test">
                        <span>⚖️</span>
                        <span>A/B Testing</span>
                    </li>
                    <li class="mode-item" data-mode="skills">
                        <span>📊</span>
                        <span>Skill Analysis</span>
                    </li>
                    <li class="mode-item" data-mode="general">
                        <span>💬</span>
                        <span>General Chat</span>
                    </li>
                </ul>
            </div>
            
            <div class="chat-container">
                <div class="chat-header">
                    <h2 id="chatTitle">AI Chatbot - Resume Feedback</h2>
                    <p id="chatDescription">Get expert feedback on your resume from a recruiter's perspective</p>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            Hello! I'm your AI Chatbot assistant. I can help you with resume feedback, A/B testing, interview preparation, and skill demand analysis. How can I assist you today?
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="quick-actions" id="quickActions">
                        <button class="quick-action-btn" data-action="analyze">Analyze my resume</button>
                        <button class="quick-action-btn" data-action="improve">How to improve?</button>
                        <button class="quick-action-btn" data-action="ats">ATS optimization tips</button>
                    </div>
                    <div class="chat-input-wrapper">
                        <textarea class="chat-input" id="chatInput" placeholder="Type your message..." rows="1"></textarea>
                        <button class="send-btn" id="sendBtn">Send</button>
                    </div>
                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        this.addWelcomeMessage();
        return page;
    }

    attachEventListeners() {
        // Mode switching
        const modeItems = this.element.querySelectorAll('.mode-item');
        modeItems.forEach(item => {
            item.addEventListener('click', () => {
                const mode = item.getAttribute('data-mode');
                modeItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.switchMode(mode);
            });
        });

        // Send message
        const sendBtn = this.element.querySelector('#sendBtn');
        const chatInput = this.element.querySelector('#chatInput');

        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick actions
        const quickActions = this.element.querySelectorAll('.quick-action-btn');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    addWelcomeMessage() {
        // Already added in HTML
    }

    switchMode(mode) {
        this.currentMode = mode;
        const titles = {
            feedback: 'AI Chatbot - Resume Feedback',
            'ab-test': 'AI Chatbot - A/B Testing',
            skills: 'AI Chatbot - Skill Demand Analysis',
            general: 'AI Chatbot - General Assistant'
        };

        const descriptions = {
            feedback: 'Get expert feedback on your resume from a recruiter\'s perspective',
            'ab-test': 'Compare two resume versions and see which performs better',
            skills: 'Discover which skills are in demand for your target role',
            general: 'Ask me anything about career advice, technology, or general topics'
        };

        this.element.querySelector('#chatTitle').textContent = titles[mode];
        this.element.querySelector('#chatDescription').textContent = descriptions[mode];

        // Update quick actions
        const quickActionsMap = {
            feedback: [
                { text: 'Analyze my resume', action: 'analyze' },
                { text: 'How to improve?', action: 'improve' },
                { text: 'ATS optimization tips', action: 'ats' }
            ],
            'ab-test': [
                { text: 'Compare versions', action: 'compare' },
                { text: 'Which is better?', action: 'better' },
                { text: 'Key differences', action: 'differences' }
            ],
            skills: [
                { text: 'Trending skills', action: 'trending' },
                { text: 'Skill gaps', action: 'gaps' },
                { text: 'Learning path', action: 'learning' }
            ],
            general: [
                { text: 'Career Advice', action: 'career' },
                { text: 'Tech Trends', action: 'tech' },
                { text: 'Motivation', action: 'motivation' }
            ]
        };

        const quickActionsContainer = this.element.querySelector('#quickActions');
        quickActionsContainer.innerHTML = '';
        quickActionsMap[mode].forEach(qa => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.setAttribute('data-action', qa.action);
            btn.textContent = qa.text;
            btn.addEventListener('click', () => this.handleQuickAction(qa.action));
            quickActionsContainer.appendChild(btn);
        });
    }

    sendMessage() {
        const input = this.element.querySelector('#chatInput');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        // Generate AI response
        this.generateAIResponse(message);
    }

    addMessage(sender, content) {
        const messagesContainer = this.element.querySelector('#chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = sender === 'bot' ? '🤖' : '👤';
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${content}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = this.element.querySelector('#chatMessages');
        const indicator = document.createElement('div');
        indicator.className = 'message bot typing-indicator-msg';
        indicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = this.element.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
    }

    async generateAIResponse(userMessage) {
        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Determine context based on mode
            let context = 'general';
            if (this.currentMode === 'skills') context = 'skills';

            // Call API
            const data = await api.chat.send(userMessage, context);

            // Remove typing indicator and show response
            this.removeTypingIndicator();
            this.addMessage('bot', data.reply);

        } catch (error) {
            console.error('Chat Error:', error);
            this.removeTypingIndicator();

            // Handle specific errors
            let errorMessage = `I'm having trouble connecting to the server at ${API_URL}. (Error: ${error.message})`;

            if (error.message.includes('503') || error.message.includes('API Key is missing') || error.message.includes('Error communicating')) {
                errorMessage = `⚠️ **AI Service Error:** The backend is running, but it cannot reach the AI service (Groq). 
                
                Please check:
                1. Your \`.env\` file has a valid \`GROQ_API_KEY\`.
                2. You have an active internet connection.
                
                (Internal Error: ${error.message})`;
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Unexpected token')) {
                errorMessage = `⚠️ **Connection Failed:** Cannot reach the backend server at \`${API_URL}\`. 
                
                **To fix this:**
                1. Open a new terminal in the project folder.
                2. Run \`npm start\` or \`node server.js\`.
                3. Refresh this page.`;
            }

            this.addMessage('bot', errorMessage);
        }
    }

    handleQuickAction(action) {
        const actionMessages = {
            analyze: 'Please analyze my resume',
            improve: 'How can I improve my resume?',
            ats: 'What are the best ATS optimization tips?',
            compare: 'I want to compare two resume versions',
            better: 'Which version is better?',
            differences: 'What are the key differences?',

            trending: 'What skills are trending?',
            gaps: 'Analyze my skill gaps',
            learning: 'Suggest a learning path for me',
            career: 'Give me some career advice',
            tech: 'What are the latest technology trends?',
            motivation: 'I need some motivation'
        };

        const message = actionMessages[action] || action;
        this.element.querySelector('#chatInput').value = message;
        this.sendMessage();
    }
}
