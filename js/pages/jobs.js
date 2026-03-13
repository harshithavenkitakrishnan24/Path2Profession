import api from '../services/api.js';

export class JobsPage {
    constructor() {
        this.element = null;
        this.jobs = [];
        this.currentView = 'tracker'; // tracker, search
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page jobs-page';
        page.innerHTML = `
            <style>
                .jobs-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: var(--spacing-lg) 20px;
                }

                .jobs-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--spacing-xl);
                }

                .jobs-title-area h1 {
                    font-size: 2.5rem;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .jobs-nav {
                    display: flex;
                    gap: var(--spacing-xs);
                    background: var(--bg-tertiary);
                    padding: 6px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                    box-shadow: var(--shadow-sm);
                }

                .jobs-nav-btn {
                    padding: var(--spacing-sm) var(--spacing-lg);
                    border: none;
                    background: transparent;
                    color: var(--text-secondary);
                    cursor: pointer;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    transition: all var(--transition-fast);
                    font-size: 0.9rem;
                }

                .jobs-nav-btn.active {
                    background: var(--accent-gradient);
                    color: white;
                    box-shadow: var(--shadow-glow-sm);
                }

                /* Stats Dashboard */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-xl);
                }

                .stat-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-primary);
                }

                .stat-card::after {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
                    opacity: 0.1;
                    pointer-events: none;
                }

                .stat-label {
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .stat-trend {
                    font-size: 0.75rem;
                    color: var(--accent-primary);
                    background: var(--accent-glow);
                    padding: 2px 8px;
                    border-radius: 10px;
                    width: fit-content;
                }

                /* Kanban Board */
                .kanban-board {
                    display: grid;
                    grid-template-columns: repeat(5, 300px);
                    gap: var(--spacing-lg);
                    overflow-x: auto;
                    padding: 10px 5px var(--spacing-xl) 5px;
                    scroll-behavior: smooth;
                }

                /* Custom Scrollbar for Kanban */
                .kanban-board::-webkit-scrollbar {
                    height: 10px;
                }
                .kanban-board::-webkit-scrollbar-track {
                    background: var(--bg-tertiary);
                    border-radius: 10px;
                }
                .kanban-board::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: 10px;
                }
                .kanban-board::-webkit-scrollbar-thumb:hover {
                    background: var(--text-desc);
                }

                .kanban-column {
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    min-height: 600px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }

                .kanban-column:hover {
                    background: rgba(15, 23, 42, 0.6);
                    border-color: rgba(99, 102, 241, 0.3);
                }

                .column-header {
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 700;
                    color: var(--text-primary);
                    font-size: 1.1rem;
                }

                .header-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .header-icon {
                    font-size: 1.25rem;
                }

                .column-count {
                    background: var(--bg-tertiary);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    color: var(--accent-primary);
                    border: 1px solid var(--border-color);
                    font-weight: 600;
                }

                .column-content {
                    padding: var(--spacing-md);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                /* Empty State */
                .empty-column-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    margin-top: 50px;
                    color: var(--text-desc);
                    text-align: center;
                    opacity: 0.6;
                }

                .empty-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-sm);
                    filter: grayscale(1);
                }

                .empty-text {
                    font-size: 0.9rem;
                    max-width: 150px;
                }

                /* Job Card */
                .job-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    animation: slideUp 0.4s ease-out backwards;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .job-card:hover {
                    border-color: var(--accent-primary);
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
                    z-index: 10;
                }

                .job-card:active {
                    transform: translateY(-2px) scale(0.98);
                    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.4);
                }

                .job-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--spacing-sm);
                }

                .job-company {
                    font-weight: 700;
                    color: var(--text-primary);
                    font-size: 1.1rem;
                    letter-spacing: -0.5px;
                }

                .job-position {
                    color: var(--accent-primary);
                    font-size: 0.95rem;
                    font-weight: 500;
                    margin-bottom: var(--spacing-md);
                }

                .job-footer {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                    padding-top: var(--spacing-sm);
                    border-top: 1px solid var(--border-color);
                    margin-top: var(--spacing-sm);
                }

                .job-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }

                .status-badge {
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    font-weight: 700;
                    background: var(--bg-tertiary);
                }

                /* Modal Adjustments */
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    display: none;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .modal.active {
                    display: flex;
                    opacity: 1;
                }

                .modal-content {
                    background: var(--bg-secondary);
                    border: 1px solid var(--accent-glow);
                    box-shadow: 0 0 50px -10px var(--accent-glow);
                    width: 90%;
                    max-width: 700px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: var(--radius-xl);
                    position: relative;
                    animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                @keyframes modalPop {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .modal-header {
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .close-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: color 0.2s;
                }

                .close-btn:hover { color: var(--error); }

                .primary-btn {
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }

                .primary-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: 0.5s;
                    z-index: -1;
                }

                .primary-btn:hover::before {
                    left: 100%;
                }
            </style>

            <div class="jobs-header">
                <div class="jobs-title-area">
                    <h1>Smart Job Applications</h1>
                    <p style="color: var(--text-secondary); font-size: 1.1rem; margin-top: 8px;">Track your journey to professional success with AI assistance.</p>
                </div>
                <div class="jobs-nav">
                    <button class="jobs-nav-btn active" data-view="tracker">Application Tracker</button>
                    <button class="jobs-nav-btn" data-view="search">Find Jobs</button>
                </div>
            </div>

            <div id="tracker-view">
                <!-- Stats Dashboard -->
                <div class="stats-grid" id="statsDashboard">
                    <div class="stat-card">
                        <span class="stat-label">Total Applied</span>
                        <span class="stat-value" id="stat-total">0</span>
                        <span class="stat-trend">General Stats</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Interviews</span>
                        <span class="stat-value" id="stat-interviews">0</span>
                        <span class="stat-trend">Success Rate</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Wishlist Items</span>
                        <span class="stat-value" id="stat-wishlist">0</span>
                        <span class="stat-trend">Potential</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Offers</span>
                        <span class="stat-value" id="stat-offers" style="color: #10b981;">0</span>
                        <span class="stat-trend">Goal</span>
                    </div>
                </div>

                <div style="margin-bottom: var(--spacing-lg); display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: var(--text-primary); font-size: 1.5rem;">My Board</h3>
                    <button id="addJobBtn" class="primary-btn" style="width: auto; padding: var(--spacing-sm) var(--spacing-xl);">+ Add Application</button>
                </div>

                <div class="kanban-board">
                    ${this.renderColumn('wishlist', 'Wishlist', '📝')}
                    ${this.renderColumn('applied', 'Applied', '📤')}
                    ${this.renderColumn('interview', 'Interview', '🎯')}
                    ${this.renderColumn('offer', 'Offer', '🎉')}
                    ${this.renderColumn('rejected', 'Rejected', '📁')}
                </div>
            </div>

            <div id="search-view" style="display: none;">
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search for jobs (e.g. Frontend Developer)..." id="jobSearchInput">
                    <button class="search-btn" id="jobSearchBtn">Search Jobs</button>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="empty-state">Enter a job title to discover mock opportunities...</div>
                </div>
            </div>

            <!-- Add/Edit Job Modal -->
            <div class="modal" id="jobModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modalTitle">Edit Application</h2>
                        <button class="close-btn">&times;</button>
                    </div>
                    <form id="jobForm">
                        <input type="hidden" id="jobId">
                        
                        <div class="form-group">
                            <label class="form-label">Company Name *</label>
                            <input type="text" class="form-input" id="company" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Position *</label>
                            <input type="text" class="form-input" id="position" required>
                        </div>

                        <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <label class="form-label">Status</label>
                                <select class="form-input" id="status">
                                    <option value="wishlist">Wishlist</option>
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Location</label>
                                <input type="text" class="form-input" id="location">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Salary</label>
                            <input type="text" class="form-input" id="salary" placeholder="e.g. $80,000 - $100,000">
                        </div>

                        <div class="form-group">
                            <label class="form-label">Job Description (full text)</label>
                            <textarea class="form-textarea" id="jobDescription" placeholder="Paste full JD here for AI analysis..."></textarea>
                        </div>

                        <div class="ai-actions">
                            <button type="button" class="ai-btn" id="aiCoverLetterBtn">
                                ✨ Generate Cover Letter
                            </button>
                            <button type="button" class="ai-btn" id="aiAnalyzeBtn">
                                🔍 Analyze Job & Skills
                            </button>
                            <button type="button" class="ai-btn" id="aiInterviewPrepBtn">
                                👨‍💼 Interview Preparation
                            </button>
                            <div class="ai-result" id="aiResult"></div>
                        </div>

                        <div class="form-group" style="margin-top: 20px;">
                            <label class="form-label">Notes</label>
                            <textarea class="form-textarea" id="notes"></textarea>
                        </div>

                        <button type="submit" class="primary-btn">Save Application</button>
                    </form>
                </div>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        this.fetchJobs();
        return page;
    }

    renderColumn(id, title, icon) {
        return `
            <div class="kanban-column" data-status="${id}">
                <div class="column-header">
                    <div class="header-title">
                        <span class="header-icon">${icon}</span>
                        <span>${title}</span>
                    </div>
                    <span class="column-count" id="count-${id}">0</span>
                </div>
                <div class="column-content" id="col-${id}">
                    <!-- Loaded dynamically -->
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Navigation Switching
        const navBtns = this.element.querySelectorAll('.jobs-nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const view = btn.dataset.view;
                this.element.querySelector('#tracker-view').style.display = view === 'tracker' ? 'block' : 'none';
                this.element.querySelector('#search-view').style.display = view === 'search' ? 'block' : 'none';
            });
        });

        // Search Mock Jobs
        this.element.querySelector('#jobSearchBtn').addEventListener('click', () => {
            const query = this.element.querySelector('#jobSearchInput').value;
            this.performMockSearch(query);
        });

        // Modal Controls
        const modal = this.element.querySelector('#jobModal');
        const closeModal = () => modal.classList.remove('active');

        this.element.querySelector('#addJobBtn').addEventListener('click', () => {
            this.resetForm();
            modal.classList.add('active');
        });

        this.element.querySelector('.close-btn').addEventListener('click', closeModal);

        // Form Submit
        this.element.querySelector('#jobForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveJob();
            closeModal();
        });

        // AI Buttons
        this.element.querySelector('#aiCoverLetterBtn').addEventListener('click', () => this.generateAIContent('cover_letter'));
        this.element.querySelector('#aiAnalyzeBtn').addEventListener('click', () => this.generateAIContent('job_analysis'));
        this.element.querySelector('#aiInterviewPrepBtn').addEventListener('click', () => this.generateAIContent('interview_prep'));
    }

    async fetchJobs() {
        try {
            this.jobs = await api.jobs.getAll();
            this.refreshBoard();
            this.updateStats();
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        }
    }

    updateStats() {
        const total = this.jobs.filter(j => j.status !== 'wishlist').length;
        const interviews = this.jobs.filter(j => j.status === 'interview').length;
        const wishlist = this.jobs.filter(j => j.status === 'wishlist').length;
        const offers = this.jobs.filter(j => j.status === 'offer').length;

        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-interviews').textContent = interviews;
        document.getElementById('stat-wishlist').textContent = wishlist;
        document.getElementById('stat-offers').textContent = offers;
    }

    refreshBoard() {
        const columns = {
            wishlist: { icon: '📝', text: 'Ready to target your next role?' },
            applied: { icon: '📤', text: 'No applications sent yet.' },
            interview: { icon: '🎯', text: 'The big stage awaits!' },
            offer: { icon: '🎉', text: 'Your success story starts here.' },
            rejected: { icon: '📁', text: 'Lessons for the next win.' }
        };

        Object.keys(columns).forEach(status => {
            const col = this.element.querySelector(`#col-${status}`);
            const countLabel = this.element.querySelector(`#count-${status}`);
            col.innerHTML = '';

            const statusJobs = this.jobs.filter(j => j.status === status);
            countLabel.textContent = statusJobs.length;

            if (statusJobs.length === 0) {
                col.innerHTML = `
                    <div class="empty-column-state">
                        <div class="empty-icon">${columns[status].icon}</div>
                        <div class="empty-text">${columns[status].text}</div>
                    </div>
                `;
            } else {
                statusJobs.forEach((job, index) => {
                    const card = document.createElement('div');
                    card.className = 'job-card';
                    card.style.animationDelay = `${index * 0.1}s`;

                    const date = new Date(job.dateApplied);
                    const timeAgo = this.getTimeAgo(date);

                    card.innerHTML = `
                        <div class="job-card-header">
                            <div class="job-company">${job.company}</div>
                            <span class="status-badge" style="color: var(--accent-primary);">${status}</span>
                        </div>
                        <div class="job-position">${job.position}</div>
                        <div class="job-footer">
                            <div class="job-meta-item">📍 ${job.location || 'Remote'}</div>
                            <div class="job-meta-item">🕒 ${timeAgo}</div>
                        </div>
                    `;
                    card.addEventListener('click', () => this.openEditModal(job));
                    col.appendChild(card);
                });
            }
        });
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return "Just now";
    }

    openEditModal(job) {
        const modal = this.element.querySelector('#jobModal');
        document.getElementById('modalTitle').textContent = 'Edit Application';
        document.getElementById('jobId').value = job._id;
        document.getElementById('company').value = job.company;
        document.getElementById('position').value = job.position;
        document.getElementById('status').value = job.status;
        document.getElementById('location').value = job.location || '';
        document.getElementById('salary').value = job.salary || '';
        document.getElementById('jobDescription').value = job.jobDescription || '';
        document.getElementById('notes').value = job.notes || '';
        document.getElementById('aiResult').style.display = 'none';

        modal.classList.add('active');
    }

    resetForm() {
        document.getElementById('modalTitle').textContent = 'Add Job Application';
        document.getElementById('jobForm').reset();
        document.getElementById('jobId').value = '';
        document.getElementById('aiResult').style.display = 'none';
        document.getElementById('status').value = 'applied'; // Default
    }

    async saveJob() {
        const id = document.getElementById('jobId').value;
        const jobData = {
            company: document.getElementById('company').value,
            position: document.getElementById('position').value,
            status: document.getElementById('status').value,
            location: document.getElementById('location').value,
            salary: document.getElementById('salary').value,
            jobDescription: document.getElementById('jobDescription').value,
            notes: document.getElementById('notes').value
        };

        try {
            if (id) {
                await api.jobs.update(id, jobData);
            } else {
                await api.jobs.create(jobData);
            }
            this.fetchJobs();
        } catch (error) {
            alert('Error saving job: ' + error.message);
        }
    }

    async generateAIContent(type) {
        const jd = document.getElementById('jobDescription').value;
        const resultDiv = document.getElementById('aiResult');

        if (!jd) {
            alert('Please paste a Job Description first.');
            return;
        }

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div class="typing-indicator" style="padding: 10px; display: flex; gap: 4px;"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div><span style="font-size: 0.9rem; margin-left: 8px; color: var(--text-secondary);">🤖 AI is thinking...</span></div>';

        try {
            const response = await api.chat.send(jd, type);
            const rawReply = response.reply;

            if (type === 'cover_letter') {
                this.renderCoverLetter(rawReply, resultDiv);
                return;
            }

            // Try to extract and parse JSON for analysis/prep
            const data = this.extractJson(rawReply);

            if (data) {
                if (type === 'job_analysis') {
                    this.renderJobAnalysis(data, resultDiv);
                } else if (type === 'interview_prep') {
                    this.renderInterviewPrep(data, resultDiv);
                }
            } else {
                // Fallback: If no JSON, render the raw text as a clean list
                this.renderLineByLine(rawReply, resultDiv, type);
            }
        } catch (error) {
            resultDiv.innerHTML = `<div style="color: #ef4444; padding: 10px; font-size: 0.9rem;">⚠️ Error: ${error.message}</div>`;
        }
    }

    extractJson(text) {
        try {
            // Remove markdown code blocks if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            // Try direct parse
            try { return JSON.parse(cleanText); } catch (e) { }

            // Try to find JSON object bounds
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            if (start !== -1 && end !== -1 && end > start) {
                return JSON.parse(text.substring(start, end + 1));
            }
        } catch (e) {
            console.warn("JSON Extraction failed", e);
        }
        return null;
    }

    renderJobAnalysis(data, container) {
        let html = '<div class="analysis-container">';
        if (data.experience_level) {
            html += `<div class="analysis-section"><div class="experience-badge">${data.experience_level}</div></div>`;
        }
        if (data.skills && data.skills.length) {
            html += `
                <div class="analysis-section">
                    <div class="analysis-title">✨ Required Skills</div>
                    <div class="skill-tags">
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        if (data.keywords && data.keywords.length) {
            html += `<div class="analysis-section"><div class="analysis-title">🔑 Important Keywords</div><div class="keyword-list">${data.keywords.join(', ')}</div></div>`;
        }
        if (data.interview_questions && data.interview_questions.length) {
            html += `
                <div class="analysis-section">
                    <div class="analysis-title">❓ Potential Interview Questions</div>
                    <ul style="padding-left: 20px; color: var(--text-secondary); margin: 0; line-height: 1.6;">
                        ${data.interview_questions.map(q => `<li style="margin-bottom: 8px;">${q}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        html += '</div>';
        container.innerHTML = html;
    }

    renderInterviewPrep(data, container) {
        let html = '<div class="analysis-container">';
        html += `<div class="analysis-section"><div class="analysis-title">📖 Role Overview</div><p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${data.overview || ''}</p></div>`;

        const renderQList = (title, items, icon) => {
            if (!items || !items.length) return '';
            return `
                <div class="analysis-section">
                    <div class="analysis-title">${icon} ${title}</div>
                    ${items.map(q => `
                        <div style="margin-bottom: 12px; animation: slideInLeft 0.3s ease-out forwards;">
                            <div style="color: var(--text-primary); font-weight: 600; font-size: 0.95rem; display: flex; gap: 8px;"><span>Q:</span> <span>${q.question}</span></div>
                            <div style="color: var(--accent-primary); font-size: 0.9rem; padding: 10px; background: rgba(99, 102, 241, 0.05); border-radius: 8px; border-left: 3px solid var(--accent-primary); margin-top: 8px; margin-left: 20px;">
                                <span style="font-weight: 700;">💡 Tip:</span> ${q.tips}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        };

        html += renderQList("Technical Questions", data.technical_questions, "💻");
        html += renderQList("Soft Skills & Behavioral", data.behavioral_questions, "🤝");

        if (data.key_topics && data.key_topics.length) {
            html += `
                <div class="analysis-section">
                    <div class="analysis-title">📚 Key Topics to Study</div>
                    <div class="skill-tags">
                        ${data.key_topics.map(t => `<span class="skill-tag" style="background: var(--bg-tertiary);">${t}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        html += '</div>';
        container.innerHTML = html;
    }

    renderCoverLetter(letter, container) {
        container.innerHTML = `
            <div class="analysis-section">
                <div class="analysis-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    ✉️ Generated Cover Letter
                    <div style="display: flex; gap: 8px;">
                        <button id="copyToClipboard" class="primary-btn" style="width: auto; padding: 4px 12px; font-size: 0.8rem; margin: 0;">Copy</button>
                        <button id="downloadPDF" class="primary-btn" style="width: auto; padding: 4px 12px; font-size: 0.8rem; margin: 0; background: var(--success);">Download PDF</button>
                    </div>
                </div>
                <div id="coverLetterText" style="white-space: pre-wrap; font-size: 0.95rem; color: var(--text-secondary); background: var(--bg-secondary); padding: 20px; border-radius: 12px; border: 1px dashed var(--border-color); margin-top: 15px; line-height: 1.7;">${letter}</div>
            </div>
        `;

        document.getElementById('copyToClipboard').addEventListener('click', () => {
            navigator.clipboard.writeText(letter).then(() => {
                const btn = document.getElementById('copyToClipboard');
                btn.textContent = '✅ Copied!';
                setTimeout(() => btn.textContent = 'Copy', 2000);
            });
        });

        document.getElementById('downloadPDF').addEventListener('click', () => {
            this.downloadCoverLetterPDF(letter);
        });
    }

    downloadCoverLetterPDF(content) {
        if (!window.jspdf) {
            alert('PDF library not loaded yet. Please try again in a moment.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const company = document.getElementById('company').value || '[Company Name]';
        const position = document.getElementById('position').value || '[Position]';
        const date = new Date().toLocaleDateString();

        // Header Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(99, 102, 241); // accent-primary color
        doc.text("COVER LETTER", 20, 30);

        // Metadata
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139); // text-secondary
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${date}`, 20, 45);
        doc.text(`Company: ${company}`, 20, 52);
        doc.text(`Position: ${position}`, 20, 59);

        // Separator line
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(20, 65, 190, 65);

        // Content
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59); // text-primary
        const splitText = doc.splitTextToSize(content, 170);
        doc.text(splitText, 20, 80);

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184);
            doc.text(`Generated by Path2Profession AI`, 20, 285);
            doc.text(`Page ${i} of ${pageCount}`, 170, 285);
        }

        // Save
        const fileName = `${company.replace(/\s+/g, '_')}_Cover_Letter.pdf`;
        doc.save(fileName);
    }

    renderLineByLine(text, container, type) {
        // Fallback for non-JSON responses: Convert text to a clean list
        const lines = text.split('\n').filter(line => line.trim().length > 0);

        let html = '<div class="analysis-container">';
        html += `<div class="analysis-title">${type === 'interview_prep' ? '👨‍💼 Interview Guide' : '🔍 Analysis Results'}</div>`;
        html += `<div class="analysis-section"><ul style="padding-left: 20px; color: var(--text-secondary); line-height: 1.6; list-style-type: disc;">`;

        lines.forEach(line => {
            // Clean up common AI prefixes like "Sure, here is..." or "As a senior..."
            if (line.toLowerCase().startsWith('sure') || line.toLowerCase().startsWith('as a')) return;

            // Highlight bold text (AI often uses **text**) or numbers
            let cleanLine = line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim();
            if (!cleanLine) return;

            html += `<li style="margin-bottom: 12px; font-size: 0.95rem;">${cleanLine}</li>`;
        });

        html += `</ul></div></div>`;
        container.innerHTML = html;
    }

    performMockSearch(query) {
        const resultsContainer = this.element.querySelector('#searchResults');

        if (!query) {
            resultsContainer.innerHTML = '<div class="empty-state">Please enter a search term</div>';
            return;
        }

        // Mock Data
        const mockJobs = [
            { company: 'Tech Corp', position: `${query}`, location: 'Remote', salary: '$100k - $130k' },
            { company: 'InnovateOne', position: `Senior ${query}`, location: 'New York, NY', salary: '$120k - $150k' },
            { company: 'StartupX', position: `Junior ${query}`, location: 'San Francisco, CA', salary: '$80k - $100k' },
            { company: 'WebSolutions', position: `Lead ${query}`, location: 'Austin, TX', salary: '$140k+' },
            { company: 'DataSystems', position: `${query} Engineer`, location: 'Remote', salary: '$110k' }
        ];

        resultsContainer.innerHTML = '';
        mockJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="job-company">${job.company}</div>
                <div class="job-position">${job.position}</div>
                <div class="job-meta">
                    <div class="job-meta-item">📍 ${job.location}</div>
                    <div class="job-meta-item">💰 ${job.salary}</div>
                </div>
                <button class="primary-btn" style="padding: 6px 12px; font-size: 0.85rem; margin-top: 12px; width: 100%;">+ Track Application</button>
            `;

            card.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                this.addMockJob(job);
            });

            resultsContainer.appendChild(card);
        });
    }

    async addMockJob(job) {
        try {
            await api.jobs.create({
                company: job.company,
                position: job.position,
                location: job.location,
                salary: job.salary,
                status: 'wishlist'
            });
            alert('Job added to Wishlist!');
            this.fetchJobs();
        } catch (error) {
            alert('Error adding job: ' + error.message);
        }
    }
}
