// ============================================
// RESUME ENTRY PAGE - AI vs Manual Selection
// ============================================

export class ResumeEntryPage {
    constructor() {
        this.element = null;
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page resume-entry-page';
        page.innerHTML = `
            <style>
                .resume-entry-page {
                    min-height: calc(100vh - 80px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-xl) var(--spacing-md);
                    background: radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
                }
                
                .entry-container {
                    max-width: 1000px;
                    width: 100%;
                    text-align: center;
                }
                
                .entry-header {
                    margin-bottom: var(--spacing-xl);
                }
                
                .entry-header h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: var(--spacing-sm);
                }
                
                .entry-header p {
                    color: var(--text-secondary);
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .options-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: var(--spacing-xl);
                    margin-top: var(--spacing-xl);
                }
                
                @media (min-width: 1024px) {
                    .options-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                
                .option-card {
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .option-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: var(--accent-gradient);
                    opacity: 0;
                    transition: opacity var(--transition-normal);
                    z-index: 0;
                }
                
                .option-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--accent-primary);
                    box-shadow: var(--shadow-glow);
                }
                
                .option-card:hover::before {
                    opacity: 0.03;
                }
                
                .option-content {
                    position: relative;
                    z-index: 1;
                }
                
                .option-icon {
                    font-size: 4rem;
                    margin-bottom: var(--spacing-md);
                    display: block;
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .option-card h2 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                }
                
                .option-card p {
                    color: var(--text-secondary);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: var(--spacing-lg);
                }
                
                .option-features {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 var(--spacing-lg);
                    text-align: left;
                    width: 100%;
                }
                
                .option-features li {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-bottom: var(--spacing-xs);
                }
                
                .option-features li::before {
                    content: '✨';
                    font-size: 0.8rem;
                }
                
                .option-btn {
                    padding: 12px 32px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    border: none;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    width: 100%;
                }
                
                .btn-ai {
                    background: var(--accent-gradient);
                    color: white;
                    box-shadow: var(--shadow-glow);
                }
                
                .btn-manual {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 2px solid var(--border-color);
                }

                .btn-upload {
                    background: var(--bg-tertiary);
                    color: #10b981;
                    border: 2px solid #10b981;
                }
                
                .option-card:hover .btn-manual {
                    border-color: var(--accent-primary);
                    background: var(--bg-secondary);
                }

                .option-card:hover .btn-upload {
                    background: #10b981;
                    color: white;
                }
                
                .badge {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #FFD700;
                    color: #000;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    box-shadow: 0 4px 10px rgba(255, 215, 0, 0.4);
                }

                /* Loading Overlay */
                .upload-loading-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(8px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    color: white;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(255, 255, 255, 0.1);
                    border-top-color: #6366f1;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: var(--spacing-md);
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .entry-header h1 {
                        font-size: 2.2rem;
                    }
                    .options-grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* Saved Resumes Section */
                .saved-resumes-section {
                    margin-top: 60px;
                    text-align: left;
                    animation: fadeInUp 0.8s ease-out 0.6s both;
                }

                .saved-resumes-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 12px;
                }

                .resume-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }

                .resume-item-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: all var(--transition-normal);
                }

                .resume-item-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: var(--shadow-sm);
                    transform: translateY(-2px);
                }

                .resume-item-info h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: var(--text-primary);
                }

                .resume-item-info p {
                    margin: 4px 0 0;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }

                .resume-item-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: auto;
                }

                .action-btn {
                    flex: 1;
                    padding: 8px;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid var(--border-color);
                }

                .btn-edit {
                    background: var(--accent-primary);
                    color: white;
                    border: none;
                }

                .btn-delete {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }

                .btn-delete:hover {
                    background: #ef4444;
                    color: white;
                }

                .no-resumes {
                    text-align: center;
                    padding: 40px;
                    background: var(--bg-tertiary);
                    border-radius: var(--radius-lg);
                    color: var(--text-secondary);
                }
            </style>
            
            <div class="entry-container">
                <div class="entry-header">
                    <h1>How would you like to start?</h1>
                    <p>Choose the method that works best for you. Both options provide professional, ATS-optimized results.</p>
                </div>
                
                <div class="options-grid">
                    <!-- AI Option -->
                    <div class="option-card" id="aiOption">
                        <div class="badge">Recommended</div>
                        <div class="option-content">
                            <span class="option-icon">✨</span>
                            <h2>Create with AI</h2>
                            <p>Answer a few simple questions and let our AI build a professional, tailored resume for you in seconds.</p>
                            <ul class="option-features">
                                <li>Optimized for your job role</li>
                                <li>No writing required</li>
                                <li>Smart layout selection</li>
                            </ul>
                            <button class="option-btn btn-ai">Start with AI</button>
                        </div>
                    </div>

                    <!-- Upload Option -->
                    <div class="option-card" id="uploadOption">
                        <div class="option-content">
                            <span class="option-icon">📤</span>
                            <h2>Upload Resume</h2>
                            <p>Already have an old resume? Upload it and our AI will convert it to a modern, ATS-friendly format.</p>
                            <ul class="option-features">
                                <li>PDF & DOCX supported</li>
                                <li>Instant ATS optimization</li>
                                <li>Keep your details intact</li>
                            </ul>
                            <button class="option-btn btn-upload">Upload & Convert</button>
                            <input type="file" id="resumeUploadInput" accept=".pdf,.docx,.doc" style="display: none;">
                        </div>
                    </div>
                    
                    <!-- Manual Option -->
                    <div class="option-card" id="manualOption">
                        <div class="option-content">
                            <span class="option-icon">🎨</span>
                            <h2>Pick a Template</h2>
                            <p>Browse our collection of 800+ professional templates and customize every detail to match your personal style.</p>
                            <ul class="option-features">
                                <li>Complete creative control</li>
                                <li>Over 800+ design options</li>
                                <li>Drag-and-drop sections</li>
                            </ul>
                            <button class="option-btn btn-manual">Choose Design</button>
                        </div>
                    </div>
                </div>

                <!-- My Resumes Section -->
                <div class="saved-resumes-section">
                    <div class="saved-resumes-header">
                        <h2>My Saved Resumes</h2>
                    </div>
                    <div id="savedResumesList" class="resume-list">
                        <div class="no-resumes">Loading your resumes...</div>
                    </div>
                </div>
            </div>

            <div id="loadingOverlay" class="upload-loading-overlay" style="display: none;">
                <div class="spinner"></div>
                <h3>Processing your resume...</h3>
                <p>Gemini AI is analyzing and optimizing your content.</p>
            </div>
        `;

        this.element = page;
        this.attachEventListeners();
        return page;
    }

    attachEventListeners() {
        const aiOption = this.element.querySelector('#aiOption');
        const uploadOption = this.element.querySelector('#uploadOption');
        const manualOption = this.element.querySelector('#manualOption');
        const fileInput = this.element.querySelector('#resumeUploadInput');
        const loadingOverlay = this.element.querySelector('#loadingOverlay');

        if (aiOption) {
            aiOption.addEventListener('click', () => {
                localStorage.removeItem('currentResumeId');
                localStorage.setItem('selectedTemplate', 'ats-basic');
                localStorage.setItem('openAiModal', 'true');
                this.navigateTo('resume');
            });
        }

        if (uploadOption && fileInput) {
            uploadOption.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                localStorage.removeItem('currentResumeId');
                localStorage.removeItem('resumeData');

                // Basic validation
                const allowedTypes = ['.pdf', '.docx', '.doc'];
                const ext = '.' + file.name.split('.').pop().toLowerCase();
                if (!allowedTypes.includes(ext)) {
                    alert('Please upload a PDF or Word document (.docx, .doc)');
                    fileInput.value = ''; // Reset
                    return;
                }

                try {
                    loadingOverlay.style.display = 'flex';

                    const resumeApi = (await import('../services/api.js')).default;
                    const parsedData = await resumeApi.resume.upload(file);

                    if (parsedData) {
                        // Normalize the parsed data for the builder
                        localStorage.setItem('resumeData', JSON.stringify(parsedData));
                        localStorage.setItem('selectedTemplate', 'ats-basic');
                        localStorage.setItem('resumeViewMode', 'true'); // Enable simplified view

                        // Small delay for smooth transition
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                            fileInput.value = ''; // Reset
                            this.navigateTo('resume');
                        }, 500);
                    }
                } catch (error) {
                    console.error('Upload failed:', error);
                    alert('Failed to parse resume: ' + (error.message || 'Unknown error'));
                    loadingOverlay.style.display = 'none';
                    fileInput.value = ''; // Reset
                }
            });
        }

        if (manualOption) {
            manualOption.addEventListener('click', () => {
                localStorage.removeItem('currentResumeId');
                localStorage.removeItem('resumeData');
                this.navigateTo('gallery');
            });
        }

        // Fetch saved resumes
        this.loadSavedResumes();
    }

    async loadSavedResumes() {
        const listContainer = this.element.querySelector('#savedResumesList');
        if (!listContainer) return;

        try {
            const api = (await import('../services/api.js')).default;
            const resumes = await api.resume.get();

            if (!resumes || resumes.length === 0) {
                listContainer.innerHTML = '<div class="no-resumes">You haven\'t created any resumes yet. Start with one of the options above!</div>';
                return;
            }

            listContainer.innerHTML = resumes.map(res => `
                <div class="resume-item-card" data-id="${res._id}">
                    <div class="resume-item-info">
                        <h3>${res.title || 'Untitled Resume'}</h3>
                        <p>Last edited: ${new Date(res.lastModified).toLocaleDateString()}</p>
                    </div>
                    <div class="resume-item-actions">
                        <button class="action-btn btn-edit" data-action="edit">Edit</button>
                        <button class="action-btn btn-delete" data-action="delete">Delete</button>
                    </div>
                </div>
            `).join('');

            // Add action listeners
            listContainer.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const card = btn.closest('.resume-item-card');
                    const id = card.dataset.id;
                    const action = btn.dataset.action;

                    if (action === 'edit') {
                        const resume = resumes.find(r => r._id === id);
                        localStorage.setItem('resumeData', JSON.stringify(resume.data));
                        localStorage.setItem('currentResumeId', id);
                        localStorage.setItem('selectedTemplate', resume.templateId || 'ats-basic');
                        this.navigateTo('resume');
                    } else if (action === 'delete') {
                        if (confirm('Are you sure you want to delete this resume?')) {
                            try {
                                await api.resume.delete(id);
                                this.loadSavedResumes(); // Refresh
                            } catch (err) {
                                alert('Failed to delete: ' + err.message);
                            }
                        }
                    }
                });
            });

        } catch (error) {
            console.error('Error loading resumes:', error);
            listContainer.innerHTML = '<div class="no-resumes">Error loading resumes. Please try again.</div>';
        }
    }

    navigateTo(pageName) {
        const navLink = document.querySelector(`[data-page="${pageName}"]`);
        if (navLink) {
            navLink.click();
        } else {
            // Fallback for gallery since it's hidden in original nav
            const event = new CustomEvent('navigate', { detail: pageName });
            document.dispatchEvent(event);
        }
    }
}
