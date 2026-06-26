// ============================================
// AI CHATBOT PAGE - WITH RESUME FILE UPLOAD
// ============================================

import api from '../services/api.js';

export class ChatbotPage {
    constructor() {
        this.element = null;
        this.messages = [];
        this.currentMode = 'feedback'; // feedback, ab-test, skills, general
        this.uploadedResumeText = null; // Stores extracted text from uploaded file
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

                .mode-list { list-style: none; padding: 0; }

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

                .mode-item:hover { background: var(--bg-tertiary); color: var(--text-primary); }
                .mode-item.active { background: var(--accent-gradient); color: white; }

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

                .message { display: flex; gap: var(--spacing-sm); animation: fadeIn 0.3s ease-out; }
                .message.user { flex-direction: row-reverse; }

                .message-avatar {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.25rem;
                    flex-shrink: 0;
                }

                .message.bot .message-avatar { background: var(--accent-gradient); }
                .message.user .message-avatar { background: var(--bg-tertiary); border: 2px solid var(--border-color); }

                .message-content {
                    max-width: 75%;
                    background: var(--bg-tertiary);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    line-height: 1.6;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }

                .message.user .message-content { background: var(--accent-gradient); color: white; }
                .message.bot .message-content { border: 1px solid var(--border-color); }

                /* File Attachment Badge */
                .file-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(99, 102, 241, 0.15);
                    border: 1px solid var(--accent-primary);
                    color: var(--accent-primary);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                /* Resume Upload Strip */
                .resume-upload-strip {
                    padding: 8px var(--spacing-md);
                    background: rgba(99, 102, 241, 0.05);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }

                .resume-upload-strip.has-file {
                    background: rgba(16, 185, 129, 0.08);
                    border-bottom-color: rgba(16, 185, 129, 0.3);
                    color: var(--success);
                }

                .upload-resume-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 14px;
                    background: transparent;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .upload-resume-label:hover {
                    border-color: var(--accent-primary);
                    color: var(--accent-primary);
                    background: rgba(99, 102, 241, 0.05);
                }

                .clear-file-btn {
                    background: none;
                    border: none;
                    color: rgba(239, 68, 68, 0.7);
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0 4px;
                    transition: color 0.2s;
                }
                .clear-file-btn:hover { color: #ef4444; }

                /* Processing overlay */
                .processing-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: rgba(99,102,241,0.1);
                    border-radius: 12px;
                    font-size: 0.8rem;
                    color: var(--accent-primary);
                    animation: pulse 1.4s infinite;
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
                    align-items: flex-end;
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

                /* Attach Button */
                .attach-btn {
                    width: 42px; height: 42px;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem;
                    transition: all 0.2s;
                    flex-shrink: 0;
                    position: relative;
                }
                .attach-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
                .attach-btn.has-file { border-color: #10b981; color: #10b981; background: rgba(16,185,129,0.1); }

                .send-btn {
                    padding: var(--spacing-sm) var(--spacing-lg);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all var(--transition-fast);
                    height: 42px;
                }

                .send-btn:hover { box-shadow: var(--shadow-glow); transform: translateY(-2px); }
                .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .quick-actions {
                    display: flex;
                    gap: var(--spacing-xs);
                    margin-bottom: var(--spacing-sm);
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

                .quick-action-btn:hover { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }

                .typing-indicator { display: flex; gap: 4px; padding: var(--spacing-sm); }
                .typing-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary); animation: pulse 1.4s infinite; }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                @media (max-width: 768px) {
                    .chatbot-page { grid-template-columns: 1fr; }
                    .chat-sidebar { display: none; }
                }
            </style>

            <div class="chat-sidebar">
                <div class="sidebar-header">AI Modes</div>
                <ul class="mode-list">
                    <li class="mode-item active" data-mode="feedback">
                        <span>💬</span><span>Resume Feedback</span>
                    </li>
                    <li class="mode-item" data-mode="ab-test">
                        <span>⚖️</span><span>A/B Testing</span>
                    </li>
                    <li class="mode-item" data-mode="skills">
                        <span>📊</span><span>Skill Analysis</span>
                    </li>
                    <li class="mode-item" data-mode="general">
                        <span>💬</span><span>General Chat</span>
                    </li>
                </ul>
            </div>

            <div class="chat-container">
                <div class="chat-header">
                    <h2 id="chatTitle">AI Chatbot - Resume Feedback</h2>
                    <p id="chatDescription">Get expert feedback on your resume from a recruiter's perspective</p>
                </div>

                <!-- Resume Upload Strip -->
                <div class="resume-upload-strip" id="resumeStrip">
                    <label for="resumeFileInput" class="upload-resume-label">📎 Attach Resume (PDF/Image)</label>
                    <input type="file" id="resumeFileInput" style="display:none;" accept=".pdf,image/*">
                    <span id="resumeFileStatus">No file attached. Upload your resume to get a full AI analysis!</span>
                </div>

                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">Hello! I'm your AI Career Assistant. I can help you with resume feedback, A/B testing, interview preparation, and skill analysis.

📎 <strong>New!</strong> You can now upload your resume (PDF or image) using the button above, and I'll give you a full AI-powered analysis!</div>
                    </div>
                </div>

                <div class="chat-input-area">
                    <div class="quick-actions" id="quickActions">
                        <button class="quick-action-btn" data-action="analyze">📄 Analyze my resume</button>
                        <button class="quick-action-btn" data-action="improve">How to improve?</button>
                        <button class="quick-action-btn" data-action="ats">ATS optimization tips</button>
                    </div>
                    <div class="chat-input-wrapper">
                        <textarea class="chat-input" id="chatInput" placeholder="Type your message..." rows="1"></textarea>
                        <button class="send-btn" id="sendBtn">Send</button>
                    </div>
                </div>
            </div>

            <!-- Hidden PDF.js worker script loader -->
            <script id="pdfjs-config" type="application/json">{"workerSrc": "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"}</script>
        `;

        this.element = page;
        this.attachEventListeners();
        this.loadPDFJS();
        return page;
    }

    loadPDFJS() {
        if (window.pdfjsLib) return; // Already loaded
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        document.head.appendChild(script);
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
        const quickActionsContainer = this.element.querySelector('#quickActions');
        quickActionsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.quick-action-btn');
            if (btn) this.handleQuickAction(btn.getAttribute('data-action'));
        });

        // File Upload
        const fileInput = this.element.querySelector('#resumeFileInput');
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
    }

    async handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const strip = this.element.querySelector('#resumeStrip');
        const statusEl = this.element.querySelector('#resumeFileStatus');

        statusEl.innerHTML = `<span class="processing-badge">⏳ Reading ${file.name}...</span>`;

        try {
            let extractedText = '';

            if (file.type === 'application/pdf') {
                extractedText = await this.extractTextFromPDF(file);
            } else if (file.type.startsWith('image/')) {
                // For images, we convert to base64 and inform the user we'll describe what we see
                extractedText = await this.extractTextFromImage(file);
            } else {
                // Plain text files
                extractedText = await file.text();
            }

            if (!extractedText || extractedText.trim().length < 50) {
                throw new Error('Could not extract enough text. The file may be image-only or scanned. Please try a text-based PDF.');
            }

            this.uploadedResumeText = extractedText;

            // Update UI
            strip.classList.add('has-file');
            statusEl.innerHTML = `
                <span>✅ <strong>${file.name}</strong> attached (${Math.round(extractedText.length / 10)} words extracted)</span>
                <button class="clear-file-btn" id="clearFileBtn" title="Remove file">✕</button>
            `;

            this.element.querySelector('#clearFileBtn').addEventListener('click', () => {
                this.uploadedResumeText = null;
                strip.classList.remove('has-file');
                statusEl.textContent = 'No file attached. Upload your resume to get a full AI analysis!';
                e.target.value = '';
            });

            // Auto-trigger analysis
            this.addMessage('user', `📎 Resume uploaded: ${file.name}\n\nPlease analyze my resume.`);
            await this.generateAIResponse(
                `Please analyze this resume:\n\n${extractedText}`,
                'resume_analysis'
            );

        } catch (err) {
            strip.classList.remove('has-file');
            statusEl.textContent = `❌ Error: ${err.message}`;
            this.addMessage('bot', `⚠️ Could not read the file: **${err.message}**\n\nPlease try:\n• A text-based PDF (not scanned)\n• Copy-paste your resume text into the chat box`);
        }
    }

    extractTextFromPDF(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    // Wait for PDF.js to load
                    let attempts = 0;
                    while (!window.pdfjsLib && attempts < 20) {
                        await new Promise(r => setTimeout(r, 300));
                        attempts++;
                    }
                    if (!window.pdfjsLib) throw new Error('PDF library failed to load. Please refresh and try again.');

                    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

                    const typedArray = new Uint8Array(e.target.result);
                    const pdf = await window.pdfjsLib.getDocument(typedArray).promise;

                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                    resolve(fullText);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read the file.'));
            reader.readAsArrayBuffer(file);
        });
    }

    extractTextFromImage(file) {
        return new Promise((resolve, reject) => {
            // For image resumes, we can't do OCR client-side easily.
            // We'll prompt the user to convert to PDF, but still try to describe the image.
            reject(new Error('Image OCR is not supported directly. Please convert your resume to a PDF and try again.'));
        });
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
            feedback: "Get expert feedback on your resume from a recruiter's perspective",
            'ab-test': 'Compare two resume versions and see which performs better',
            skills: 'Discover which skills are in demand for your target role',
            general: 'Ask me anything about career advice, technology, or general topics'
        };

        this.element.querySelector('#chatTitle').textContent = titles[mode];
        this.element.querySelector('#chatDescription').textContent = descriptions[mode];

        const quickActionsMap = {
            feedback: [
                { text: '📄 Analyze my resume', action: 'analyze' },
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

        const container = this.element.querySelector('#quickActions');
        container.innerHTML = '';
        quickActionsMap[mode].forEach(qa => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.setAttribute('data-action', qa.action);
            btn.textContent = qa.text;
            container.appendChild(btn);
        });
    }

    sendMessage() {
        const input = this.element.querySelector('#chatInput');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        // If user asks to analyze resume and we have one uploaded, include it
        let context = this.currentMode === 'skills' ? 'skills' : 'general';
        let aiMessage = message;

        const isAskingForAnalysis = /analyze|review|check|feedback|improve|rate/i.test(message);
        if (isAskingForAnalysis && this.uploadedResumeText) {
            context = 'resume_analysis';
            aiMessage = `${message}\n\nHere is my resume:\n\n${this.uploadedResumeText}`;
        }

        this.generateAIResponse(aiMessage, context);
    }

    addMessage(sender, content) {
        const messagesContainer = this.element.querySelector('#chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        const avatar = sender === 'bot' ? '🤖' : '👤';
        // Format bold **text** for bot messages
        const formattedContent = sender === 'bot'
            ? content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            : content;
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${formattedContent}</div>
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

    async generateAIResponse(userMessage, contextOverride = null) {
        this.showTypingIndicator();
        const sendBtn = this.element.querySelector('#sendBtn');
        sendBtn.disabled = true;

        try {
            let context = contextOverride || (this.currentMode === 'skills' ? 'skills' : 'general');
            const data = await api.chat.send(userMessage, context);
            this.removeTypingIndicator();
            this.addMessage('bot', data.reply);
        } catch (error) {
            console.error('Chat Error:', error);
            this.removeTypingIndicator();

            let errorMessage = `I'm having trouble connecting. (Error: ${error.message})`;
            if (error.message.includes('503') || error.message.includes('API Key is missing')) {
                errorMessage = `⚠️ **AI Service Error:** The AI key is missing or invalid.\n\nPlease check your \`.env\` file has a valid \`GROQ_API_KEY\`.`;
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage = `⚠️ **Connection Failed:** Cannot reach the backend server.\n\nRun \`npm start\` in the project folder and refresh.`;
            }
            this.addMessage('bot', errorMessage);
        } finally {
            sendBtn.disabled = false;
        }
    }

    handleQuickAction(action) {
        const actionMessages = {
            analyze: this.uploadedResumeText
                ? `Please analyze my uploaded resume and give me detailed feedback.`
                : `Please analyze my resume. (Tip: Upload your resume using the 📎 button above for a full AI analysis!)`,
            improve: 'How can I improve my resume to get more interview calls?',
            ats: 'What are the best ATS optimization tips for my resume?',
            compare: 'I want to compare two resume versions',
            better: 'Which version is better?',
            differences: 'What are the key differences?',
            trending: 'What skills are trending in tech right now?',
            gaps: 'How can I identify and fix skill gaps in my resume?',
            learning: 'Suggest a learning path for me',
            career: 'Give me some career advice for a fresher in tech',
            tech: 'What are the latest technology trends I should know about?',
            motivation: 'I need some motivation to keep going with my job search'
        };

        const message = actionMessages[action] || action;

        if (action === 'analyze' && this.uploadedResumeText) {
            // Directly trigger analysis with the uploaded resume
            this.addMessage('user', '📄 Please analyze my uploaded resume and give me detailed feedback.');
            this.generateAIResponse(
                `Please analyze my resume:\n\n${this.uploadedResumeText}`,
                'resume_analysis'
            );
        } else {
            this.element.querySelector('#chatInput').value = message;
            this.sendMessage();
        }
    }
}
