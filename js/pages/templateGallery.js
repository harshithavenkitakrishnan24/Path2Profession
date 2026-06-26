// ============================================
// TEMPLATE GALLERY PAGE - Canva Style
// ============================================

export class TemplateGalleryPage {
    constructor() {
        this.element = null;
        this.selectedCategory = 'all';
        this.onTemplateSelect = null;
    }

    render() {
        const page = document.createElement('div');
        page.className = 'page template-gallery-page';
        page.innerHTML = `
            <style>
                .template-gallery-page {
                    padding: var(--spacing-xl) 0;
                    min-height: calc(100vh - 80px);
                }
                
                .gallery-header {
                    text-align: center;
                    margin-bottom: var(--spacing-xl);
                    padding: 0 var(--spacing-md);
                }
                
                .gallery-header h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: var(--spacing-sm);
                }
                
                .gallery-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .ai-create-btn {
                    margin-top: var(--spacing-md);
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                }

                .ai-create-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
                }

                .manual-create-btn {
                    margin-top: var(--spacing-md);
                    padding: 12px 24px;
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 2px solid var(--border-color);
                    border-radius: 50px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                }

                .manual-create-btn:hover {
                    transform: translateY(-2px);
                    border-color: var(--accent-primary);
                    background: var(--bg-secondary);
                }
                
                .category-filters {
                    display: flex;
                    justify-content: center;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-xl);
                    flex-wrap: wrap;
                    padding: 0 var(--spacing-md);
                }
                
                .category-btn {
                    padding: var(--spacing-sm) var(--spacing-lg);
                    background: var(--bg-tertiary);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    color: var(--text-secondary);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    font-family: var(--font-primary);
                    font-size: 0.95rem;
                }
                
                .category-btn:hover {
                    border-color: var(--accent-primary);
                    color: var(--text-primary);
                    transform: translateY(-2px);
                }
                
                .category-btn.active {
                    background: var(--accent-gradient);
                    color: white;
                    border-color: transparent;
                    box-shadow: var(--shadow-glow);
                }
                
                .templates-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--spacing-md);
                }
                
                .category-section {
                    margin-bottom: var(--spacing-xl);
                }
                
                .category-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-lg);
                    padding-bottom: var(--spacing-sm);
                    border-bottom: 2px solid var(--border-color);
                }
                
                .templates-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: var(--spacing-lg);
                }
                
                .template-card {
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    overflow: hidden;
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    position: relative;
                }
                
                .template-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--accent-primary);
                }
                
                .template-card:hover .template-overlay {
                    opacity: 1;
                }
                
                .template-preview {
                    width: 100%;
                    height: 360px;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .template-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity var(--transition-normal);
                }
                
                .use-template-btn {
                    background: white;
                    color: var(--accent-primary);
                    padding: var(--spacing-sm) var(--spacing-lg);
                    border-radius: var(--radius-lg);
                    font-weight: 700;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    box-shadow: var(--shadow-lg);
                }
                
                .template-info {
                    padding: var(--spacing-md);
                }
                
                .template-name {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-xs);
                }
                
                .template-description {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                
                .template-tags {
                    display: flex;
                    gap: var(--spacing-xs);
                    margin-top: var(--spacing-sm);
                    flex-wrap: wrap;
                }
                
                .template-tag {
                    padding: 4px 10px;
                    background: var(--bg-tertiary);
                    border-radius: var(--radius-sm);
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .templates-grid {
                        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                        gap: var(--spacing-md);
                    }
                    
                    .template-preview {
                        height: 300px;
                    }
                    
                    .gallery-header h1 {
                        font-size: 2rem;
                    }
                }
            </style>
            
            <div class="gallery-header">
                <h1>📄 800+ Resume Templates</h1>
                <p>Choose from our massive collection of professional templates - 100+ options in each category for every industry, career level, and style</p>
            </div>
            
            <div class="category-filters">
                <button class="category-btn active" data-category="all">All Professional</button>
                <button class="category-btn" data-category="classic">Classic Corporate</button>
                <button class="category-btn" data-category="modern">Modern Professional</button>
                <button class="category-btn" data-category="creative">Creative Professional</button>
                <button class="category-btn" data-category="industry">Industry Specialist</button>
                <button class="category-btn" data-category="entry_level">Entry-Level Pro</button>
                <button class="category-btn" data-category="executive">Executive Leadership</button>
                <button class="category-btn" data-category="distinctive">Distinctive Style</button>
                <button class="category-btn" data-category="ats">ATS Optimized</button>
            </div>
            
            <div class="templates-container" id="templatesContainer">
                <!-- Templates will be rendered here -->
            </div>
        `;

        this.element = page;
        this.renderTemplates();
        this.attachEventListeners();

        // AI Create Button Listener
        const aiBtn = page.querySelector('#createWithAiBtn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => {
                // Determine a default template (e.g., 'professional')
                const defaultTemplate = 'professional';

                // Save selection
                localStorage.setItem('selectedTemplate', defaultTemplate);

                // Set a flag to auto-open AI modal
                localStorage.setItem('openAiModal', 'true');

                // Navigate to resume builder
                // We need to trigger the navigation from the main app
                // Since this is a component, we can dispatch a custom event or click the hidden link
                const resumeLink = document.querySelector('[data-page="resume"]');
                if (resumeLink) {
                    resumeLink.click();
                } else {
                    // Fallback if link not found (unlikely)
                    window.location.reload();
                }
            });
        }

        return page;
    }

    generateTemplateData() {
        const categories = {
            classic: {
                bases: ['professional', 'executive', 'traditional', 'formal', 'corporate', 'lawyer', 'consultant'],
                tags: ['Traditional', 'Clean', 'Professional', 'Corporate', 'Standard']
            },
            modern: {
                bases: ['modern', 'minimal', 'swiss', 'clean', 'sleek', 'geometric', 'simple', 'contemporary'],
                tags: ['Sleek', 'Split', 'Clean', 'White Space', 'Grid']
            },
            creative: {
                bases: ['creative', 'designer', 'portfolio', 'colorful', 'bold', 'vibrant', 'artistic'],
                tags: ['Design', 'Artistic', 'Visual', 'Graphic', 'Bright']
            },
            industry: {
                bases: ['technical', 'academic', 'medical', 'teaching', 'engineering', 'sales', 'nursing'],
                tags: ['Specialist', 'Detailed', 'Industry', 'Targeted']
            },
            executive: {
                bases: ['ceo', 'director', 'vp', 'manager', 'partner', 'chief', 'head-of'],
                tags: ['Leadership', 'Strategy', 'Management', 'Senior']
            },
            distinctive: {
                bases: ['rainbow', 'sunset', 'ocean', 'forest', 'lavender', 'coral', 'neon'],
                tags: ['Unique', 'Standout', 'Colorful', 'Personal']
            },
            ats: {
                bases: ['ats-basic', 'ats-professional', 'ats-modern', 'ats-classic', 'ats-tech', 'ats-clean'],
                tags: ['ATS-Friendly', 'Scannable', 'Optimized', 'Simple']
            },
            entry_level: {
                bases: ['freshman', 'intern', 'graduate', 'student', 'entry-level', 'trainee', 'junior'],
                tags: ['Student', 'Entry', 'Starter', 'Growth']
            }
        };

        const templates = {};

        // Suffixes that trigger different layouts defined in getLayoutType
        const layoutSuffixes = [
            'plus', 'pro', 'elite', 'premium', 'advanced', 'standard', 'classic',
            'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10',
            'alpha', 'beta', 'gamma', 'delta', 'omega', 'prime', 'max', 'ultra',
            'deluxe', 'superior', 'enhanced', 'refined', 'polished', 'perfected',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
            'lite', 'full', 'complete', 'total', 'ultimate', 'supreme', 'master'
        ];

        // Generate templates for each category
        for (const [category, config] of Object.entries(categories)) {
            templates[category] = [];
            let count = 0;

            // 1. Add Base Templates
            config.bases.forEach(base => {
                templates[category].push({
                    id: base,
                    name: this.formatName(base),
                    description: `Standard ${base} template layout`,
                    tags: [config.tags[0], 'Standard']
                });
                count++;
            });

            // 2. Generate Variations until we reach ~120
            let suffixIndex = 0;
            let baseIndex = 0;

            while (count < 120) {
                const base = config.bases[baseIndex % config.bases.length];
                const suffix = layoutSuffixes[suffixIndex % layoutSuffixes.length];
                const styleId = `${base}-${suffix}`;

                // Create a unique name
                const variationName = `${this.formatName(base)} ${this.formatName(suffix)}`;

                templates[category].push({
                    id: styleId,
                    name: variationName,
                    description: `${this.formatName(suffix)} variation of ${base} style`,
                    tags: [config.tags[count % config.tags.length], 'Variation']
                });

                count++;
                suffixIndex++;
                if (suffixIndex % layoutSuffixes.length === 0) {
                    baseIndex++; // Rotate base only after using all suffixes
                }
            }
        }

        return templates;
    }

    formatName(str) {
        return str.split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }


    renderTemplates() {
        const container = this.element.querySelector('#templatesContainer');
        const templates = this.generateTemplateData();

        let html = '';

        for (const [category, items] of Object.entries(templates)) {
            html += `
                <div class="category-section" data-category="${category}">
                    <h2 class="category-title">${this.getCategoryTitle(category)}</h2>
                    <div class="templates-grid">
            `;

            items.forEach(template => {
                html += this.createTemplateCard(template);
            });

            html += `
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    getCategoryTitle(category) {
        const titles = {
            classic: 'Classic Corporate & Professional',
            modern: 'Modern & Minimalist Professional',
            creative: 'Creative & Sophisticated',
            industry: 'Industry-Specific Specialist',
            entry_level: 'Entry-Level Professional',
            executive: 'Executive & Leadership',
            distinctive: 'Distinctive Professional Styles',
            ats: 'ATS-Optimized Professional'
        };
        return titles[category] || category;
    }

    createTemplateCard(template) {
        return `
            <div class="template-card" data-template="${template.id}">
                <div class="template-preview">
                    ${this.getTemplatePreview(template.id)}
                    <div class="template-overlay">
                        <button class="use-template-btn">Use Template</button>
                    </div>
                </div>
                <div class="template-info">
                    <div class="template-name">${template.name}</div>
                    <div class="template-description">${template.description}</div>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getTemplatePreview(templateId) {
        // Define BASE color schemes - ADJUSTED FOR PROFESSIONAL/CORPORATE LOOK
        const baseColors = {
            professional: '#1e3a8a', executive: '#0f172a', finance: '#064e3b', academic: '#1e40af',
            corporate: '#1e3a8a', traditional: '#334155', elegant: '#4c1d95', formal: '#111827',
            business: '#1e3a8a', lawyer: '#0f172a', consultant: '#0e7490', manager: '#7c2d12',
            modern: '#1d4ed8', minimal: '#475569', technical: '#0369a1', startup: '#b45309',
            sleek: '#5b21b6', contemporary: '#0891b2', simple: '#52525b', clean: '#334155',
            swiss: '#334155', geometric: '#4338ca', 'tech-pro': '#0369a1', developer: '#059669',
            creative: '#be185d', designer: '#be123c', marketing: '#c2410c', portfolio: '#6d28d9',
            artistic: '#a21caf', colorful: '#0f766e', bold: '#991b1b', vibrant: '#b45309',
            illustrator: '#7e22ce', photographer: '#0e7490', writer: '#4338ca', media: '#be185d',
            healthcare: '#059669', education: '#1d4ed8', sales: '#ea580c', engineering: '#0f172a',
            nursing: '#047857', doctor: '#065f46', teacher: '#1e40af', professor: '#1e3a8a',
            architect: '#334155', scientist: '#0e7490', accountant: '#064e3b', hr: '#9f1239',
            realtor: '#b45309', chef: '#991b1b', hospitality: '#c2410c',
            freshman: '#1d4ed8', intern: '#0891b2', graduate: '#7c3aed', 'entry-level': '#4338ca',
            college: '#2563eb', scholarship: '#6d28d9', volunteer: '#059669', 'part-time': '#d97706',
            campus: '#be185d', trainee: '#0284c7', apprentice: '#047857', junior: '#4f46e5',
            ceo: '#0f172a', cto: '#0369a1', cfo: '#064e3b', vp: '#7f1d1d',
            director: '#3730a3', 'senior-exec': '#0f172a', 'board-member': '#334155', president: '#111827',
            partner: '#0e7490', 'general-manager': '#1e40af', 'head-of': '#4338ca', chief: '#0f172a',
            rainbow: '#1e3a8a', sunset: '#9a3412', ocean: '#0c4a6e', forest: '#14532d',
            lavender: '#581c87', coral: '#9f1239', mint: '#0f766e', 'rose-gold': '#881337',
            neon: '#111827', pastel: '#374151', autumn: '#78350f', spring: '#3f6212',
            'ats-basic': '#334155', 'ats-professional': '#1e3a8a', 'ats-modern': '#1d4ed8', 'ats-classic': '#1e293b',
            'ats-tech': '#0369a1', 'ats-executive': '#0f172a', 'ats-clean': '#475569', 'ats-simple': '#52525b',
            'ats-standard': '#334155', 'ats-optimized': '#1e3a8a', 'ats-friendly': '#1d4ed8', 'ats-safe': '#1e293b'
        };

        // Extract base template name (before first dash for variations)
        const baseTemplate = Object.keys(baseColors).find(base =>
            templateId === base || templateId.startsWith(base + '-')
        );

        const baseColor = baseColors[baseTemplate] || '#6366f1';

        // Generate unique color for this specific template variation
        const color = this.getUniqueColor(templateId, baseColor);

        // Generate different layout styles based on template ID
        const layoutType = this.getLayoutType(templateId);

        // Get unique font family
        const font = this.getUniqueFont(templateId);

        return this.generatePreview(templateId, color, layoutType, font);
    }

    getUniqueFont(templateId) {
        const fonts = [
            'Arial, Helvetica, sans-serif',
            '"Times New Roman", Times, serif',
            '"Courier New", Courier, monospace',
            'Georgia, serif',
            '"Trebuchet MS", sans-serif',
            'Verdana, sans-serif',
            '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            '"Garamond", serif',
            '"Palatino Linotype", "Book Antiqua", Palatino, serif',
            '"Arial Black", Gadget, sans-serif'
        ];

        let hash = 0;
        for (let i = 0; i < templateId.length; i++) {
            hash = templateId.charCodeAt(i) + ((hash << 5) - hash);
        }

        return fonts[Math.abs(hash) % fonts.length];
    }

    getLayoutType(templateId) {
        // Extract variation suffix to determine layout
        const variations = {
            'plus': 'bordered-header',
            'pro': 'side-accent',
            'elite': 'full-gradient',
            'premium': 'two-column',
            'advanced': 'minimal-header',
            'standard': 'gradient-header',
            'classic': 'bordered-header',
            'v1': 'gradient-header',
            'v2': 'bordered-header',
            'v3': 'side-accent',
            'v4': 'full-gradient',
            'v5': 'two-column',
            'v6': 'minimal-header',
            'v7': 'split-design',
            'v8': 'modern-grid',
            'v9': 'timeline-layout',
            'v10': 'infographic-style',
            'alpha': 'gradient-header',
            'beta': 'side-accent',
            'gamma': 'two-column',
            'delta': 'full-gradient',
            'omega': 'minimal-header',
            'prime': 'bordered-header',
            'max': 'split-design',
            'ultra': 'modern-grid',
            'deluxe': 'timeline-layout',
            'superior': 'infographic-style',
            'enhanced': 'gradient-header',
            'refined': 'side-accent',
            'polished': 'two-column',
            'perfected': 'full-gradient',
            'a': 'gradient-header',
            'b': 'bordered-header',
            'c': 'side-accent',
            'd': 'full-gradient',
            'e': 'two-column',
            'f': 'minimal-header',
            'g': 'split-design',
            'h': 'modern-grid',
            'i': 'timeline-layout',
            'j': 'infographic-style',
            'one': 'gradient-header',
            'two': 'bordered-header',
            'three': 'side-accent',
            'four': 'full-gradient',
            'five': 'two-column',
            'six': 'minimal-header',
            'seven': 'split-design',
            'eight': 'modern-grid',
            'lite': 'minimal-header',
            'full': 'full-gradient',
            'complete': 'two-column',
            'total': 'modern-grid',
            'ultimate': 'infographic-style',
            'supreme': 'timeline-layout',
            'master': 'split-design',
            'expert': 'gradient-header',
            'specialist': 'bordered-header',
            'professional': 'side-accent',
            'executive': 'full-gradient',
            'senior': 'two-column',
            'lead': 'minimal-header',
            'core': 'gradient-header',
            'essential': 'bordered-header',
            'fundamental': 'side-accent',
            'primary': 'full-gradient',
            'main': 'two-column',
            'principal': 'minimal-header',
            'original': 'gradient-header',
            'new': 'modern-grid',
            'fresh': 'timeline-layout',
            'modern': 'split-design',
            'contemporary': 'infographic-style',
            'updated': 'gradient-header',
            'revised': 'bordered-header',
            'improved': 'side-accent',
            'optimized': 'full-gradient',
            'streamlined': 'minimal-header',
            'simplified': 'two-column',
            'extended': 'split-design',
            'expanded': 'modern-grid',
            'comprehensive': 'timeline-layout',
            'detailed': 'infographic-style',
            'thorough': 'gradient-header',
            'compact': 'minimal-header',
            'concise': 'bordered-header',
            'brief': 'side-accent',
            'quick': 'full-gradient',
            'fast': 'two-column',
            'rapid': 'modern-grid',
            'bold': 'full-gradient',
            'bright': 'gradient-header',
            'brilliant': 'infographic-style',
            'stunning': 'timeline-layout',
            'striking': 'split-design',
            'dynamic': 'modern-grid',
            'elegant': 'minimal-header',
            'sophisticated': 'two-column',
            'refined': 'bordered-header',
            'classy': 'side-accent',
            'stylish': 'gradient-header',
            'chic': 'full-gradient'
        };

        // Check for variation suffix in template ID
        const idLower = templateId.toLowerCase();
        for (const [suffix, layout] of Object.entries(variations)) {
            if (idLower.includes('-' + suffix)) {
                return layout;
            }
        }

        // Base template layouts (for templates without suffixes)
        const baseLayouts = {
            // Classic - Traditional structures
            'professional': 'gradient-header',
            'executive': 'bordered-header',
            'finance': 'side-accent',
            'academic': 'minimal-header',
            'corporate': 'two-column',
            'traditional': 'bordered-header',
            'elegant': 'minimal-header',
            'formal': 'gradient-header',
            'business': 'side-accent',
            'lawyer': 'bordered-header',
            'consultant': 'two-column',
            'manager': 'full-gradient',

            // Modern - Contemporary layouts
            'modern': 'split-design',
            'minimal': 'minimal-header',
            'technical': 'modern-grid',
            'startup': 'full-gradient',
            'sleek': 'minimal-header',
            'contemporary': 'split-design',
            'simple': 'minimal-header',
            'clean': 'gradient-header',
            'swiss': 'minimal-header',
            'geometric': 'modern-grid',
            'tech-pro': 'timeline-layout',
            'developer': 'modern-grid',

            // Creative - Bold designs
            'creative': 'full-gradient',
            'designer': 'side-accent',
            'marketing': 'infographic-style',
            'portfolio': 'split-design',
            'artistic': 'timeline-layout',
            'colorful': 'rainbow-sections',
            'bold': 'large-typography',
            'vibrant': 'overlapping-sections',
            'illustrator': 'sketch-style',
            'photographer': 'photo-frame',
            'writer': 'editorial-layout',
            'media': 'broadcast-style',

            // Industry - Specialized structures
            'healthcare': 'clean-professional',
            'nursing': 'caring-layout',
            'doctor': 'medical-chart',
            'education': 'academic-style',
            'teacher': 'classroom-layout',
            'professor': 'publication-style',
            'sales': 'dynamic-header',
            'realtor': 'property-card',
            'hospitality': 'service-layout',
            'engineering': 'technical-grid',
            'architect': 'blueprint-style',
            'scientist': 'research-paper',
            'accountant': 'spreadsheet-style',
            'hr': 'people-focused',
            'chef': 'menu-style',

            // Student - Entry-level layouts
            'freshman': 'minimal-header',
            'intern': 'gradient-header',
            'graduate': 'side-accent',
            'entry-level': 'minimal-header',
            'college': 'gradient-header',
            'scholarship': 'academic-style',
            'volunteer': 'caring-layout',
            'part-time': 'minimal-header',
            'campus': 'gradient-header',
            'trainee': 'side-accent',
            'apprentice': 'minimal-header',
            'junior': 'gradient-header',

            // Executive - Leadership layouts
            'ceo': 'full-gradient',
            'cto': 'modern-grid',
            'cfo': 'two-column',
            'vp': 'bordered-header',
            'director': 'two-column',
            'senior-exec': 'full-gradient',
            'board-member': 'minimal-header',
            'president': 'bordered-header',
            'partner': 'two-column',
            'gm': 'side-accent',
            'head-of': 'two-column',
            'chief': 'full-gradient',

            // Colorful - Vibrant layouts
            'rainbow': 'rainbow-sections',
            'sunset': 'gradient-header',
            'ocean': 'side-accent',
            'forest': 'gradient-header',
            'lavender': 'minimal-header',
            'coral': 'gradient-header',
            'mint': 'minimal-header',
            'rose-gold': 'elegant-minimal',
            'neon': 'full-gradient',
            'pastel': 'minimal-header',
            'autumn': 'gradient-header',
            'spring': 'gradient-header',

            // ATS - Clean layouts
            'ats-basic': 'minimal-header',
            'ats-professional': 'gradient-header',
            'ats-modern': 'minimal-header',
            'ats-classic': 'bordered-header',
            'ats-tech': 'modern-grid',
            'ats-executive': 'two-column',
            'ats-clean': 'minimal-header',
            'ats-simple': 'minimal-header',
            'ats-standard': 'gradient-header',
            'ats-optimized': 'minimal-header',
            'ats-friendly': 'gradient-header',
            'ats-safe': 'minimal-header'
        };

        return baseLayouts[templateId] || 'gradient-header';
    }

    getUniqueColor(templateId, baseColor) {
        // Generate a unique color variation based on template ID
        // This ensures each template has a visually distinct color

        // Hash the template ID to get a consistent number
        let hash = 0;
        for (let i = 0; i < templateId.length; i++) {
            hash = templateId.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Convert to 32bit integer
        }

        // Use hash to adjust hue, saturation, and lightness
        const hueShift = (hash % 60) - 30; // -30 to +30 degree shift
        const satShift = ((hash >> 8) % 20) - 10; // -10 to +10% saturation
        const lightShift = ((hash >> 16) % 15) - 7; // -7 to +7% lightness

        // Convert hex to HSL, adjust, and convert back
        const adjustedColor = this.adjustColorHSL(baseColor, hueShift, satShift, lightShift);

        return adjustedColor;
    }

    adjustColorHSL(hex, hueShift, satShift, lightShift) {
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        // Convert RGB to HSL
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        // Apply shifts
        h = (h * 360 + hueShift) % 360;
        if (h < 0) h += 360;
        s = Math.max(0, Math.min(1, s + satShift / 100));
        l = Math.max(0, Math.min(1, l + lightShift / 100));

        // Convert HSL back to RGB
        let r2, g2, b2;
        if (s === 0) {
            r2 = g2 = b2 = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r2 = hue2rgb(p, q, h / 360 + 1 / 3);
            g2 = hue2rgb(p, q, h / 360);
            b2 = hue2rgb(p, q, h / 360 - 1 / 3);
        }

        // Convert RGB to hex
        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
    }

    generatePreview(templateId, color, layoutType, font = 'Arial, sans-serif') {
        const name = templateId.charAt(0).toUpperCase() + templateId.slice(1).replace(/-/g, ' ');

        switch (layoutType) {
            case 'gradient-header':
                return `<div style="width: 90%; height: 90%; background: #f5f5f5; border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: ${color}; border: 4px solid ${color}; margin-right: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">JD</div>
                        <div style="flex: 1;">
                            <div style="font-size: 18px; font-weight: bold; color: ${color}; text-transform: uppercase; letter-spacing: 1px;">JOHN DOE</div>
                            <div style="font-size: 10px; color: #666; margin-top: 2px;">${name}</div>
                            <div style="font-size: 7px; color: #888; margin-top: 3px;">hello@email.com | +123-456-7890 | 123 Street, City</div>
                        </div>
                    </div>
                    <div style="border-top: 2px solid ${color}; margin-bottom: 8px;"></div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 3px;">PROFILE SUMMARY</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.3;">Highly qualified professional with 7+ years of experience...</div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 3px;">EDUCATION</div>
                        <div style="font-size: 7px; font-weight: bold; color: #333;">University Name</div>
                        <div style="font-size: 6px; color: #666;">Master of Science • 2020-2022</div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 3px;">WORK EXPERIENCE</div>
                        <div style="font-size: 7px; font-weight: bold; color: #333;">${name} | Company Name</div>
                        <div style="font-size: 6px; color: #666;">2020 - Present</div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="flex: 1;">
                            <div style="font-size: 8px; font-weight: bold; color: ${color}; margin-bottom: 2px;">SKILLS</div>
                            <div style="font-size: 6px; color: #666;">• Leadership<br>• Management</div>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-size: 8px; font-weight: bold; color: ${color}; margin-bottom: 2px;">LANGUAGES</div>
                            <div style="font-size: 6px; color: #666;">• English<br>• Spanish</div>
                        </div>
                    </div>
                </div>`;

            case 'bordered-header':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="text-align: center; border-top: 4px solid ${color}; border-bottom: 4px solid ${color}; padding: 12px 0; margin-bottom: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">JD</div>
                        <div style="font-size: 16px; font-weight: bold; color: ${color}; text-transform: uppercase;">JOHN DOE</div>
                        <div style="font-size: 9px; color: #666; margin-top: 2px;">${name}</div>
                        <div style="font-size: 7px; color: #888; margin-top: 2px;">hello@email.com | +123-456-7890</div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 2px; margin-bottom: 4px;">PROFILE SUMMARY</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.3;">Experienced professional with proven track record...</div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 2px; margin-bottom: 4px;">WORK EXPERIENCE</div>
                        <div style="font-size: 7px; font-weight: bold; color: #333;">${name} | Company</div>
                        <div style="font-size: 6px; color: #666;">2020 - Present</div>
                    </div>
                </div>`;

            case 'side-accent':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 15px; padding-left: 20px; border-left: 5px solid ${color}; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; margin-right: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">JD</div>
                        <div>
                            <div style="font-size: 16px; font-weight: bold; color: #1a202c;">JOHN DOE</div>
                            <div style="font-size: 9px; color: ${color}; font-weight: 600; margin-top: 2px;">${name}</div>
                            <div style="font-size: 7px; color: #888; margin-top: 2px;">hello@email.com | +123-456-7890</div>
                        </div>
                    </div>
                    <div style="border-left: 3px solid ${color}; padding-left: 10px; margin-bottom: 8px; background: #f9fafb; padding: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 3px;">PROFILE SUMMARY</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.3;">Professional with expertise in multiple areas...</div>
                    </div>
                    <div style="border-left: 3px solid ${color}; padding-left: 10px; background: #f9fafb; padding: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 3px;">WORK EXPERIENCE</div>
                        <div style="font-size: 7px; font-weight: bold; color: #333;">${name} | Company</div>
                        <div style="font-size: 6px; color: #666;">2020 - Present</div>
                    </div>
                </div>`;

            case 'full-gradient':
                return `<div style="width: 90%; height: 90%; background: linear-gradient(135deg, ${color} 0%, ${this.adjustColor(color, -40)} 100%); border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); color: white; font-family: ${font};">
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <div style="width: 55px; height: 55px; border-radius: 50%; background: white; margin-right: 12px; display: flex; align-items: center; justify-content: center; color: ${color}; font-size: 22px; font-weight: bold; border: 3px solid white;">JD</div>
                        <div>
                            <div style="font-size: 18px; font-weight: bold; text-transform: uppercase;">JOHN DOE</div>
                            <div style="font-size: 9px; opacity: 0.95; margin-top: 2px;">${name}</div>
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                        <div style="font-size: 8px; font-weight: bold; margin-bottom: 3px;">ABOUT</div>
                        <div style="font-size: 6px; opacity: 0.9; line-height: 1.3;">Dynamic professional with proven expertise...</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; background: rgba(255,255,255,0.15); padding: 6px; border-radius: 4px;">
                            <div style="font-size: 7px; font-weight: bold; margin-bottom: 2px;">EXPERIENCE</div>
                            <div style="font-size: 6px; opacity: 0.9;">5+ Years</div>
                        </div>
                        <div style="flex: 1; background: rgba(255,255,255,0.15); padding: 6px; border-radius: 4px;">
                            <div style="font-size: 7px; font-weight: bold; margin-bottom: 2px;">EDUCATION</div>
                            <div style="font-size: 6px; opacity: 0.9;">Master's</div>
                        </div>
                    </div>
                </div>`;

            case 'minimal-header':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <div style="width: 45px; height: 45px; border-radius: 50%; background: ${color}20; border: 2px solid ${color}; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; color: ${color}; font-size: 18px; font-weight: 300;">JD</div>
                        <div style="font-size: 20px; font-weight: 300; color: #1a202c; letter-spacing: 2px;">JOHN DOE</div>
                        <div style="font-size: 9px; color: ${color}; margin-top: 3px; font-weight: 500;">${name}</div>
                        <div style="width: 40px; height: 2px; background: ${color}; margin: 8px auto;"></div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: 600; color: ${color}; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Profile</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.4;">Minimalist professional with clean approach...</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: 600; color: ${color}; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Experience</div>
                        <div style="font-size: 7px; color: #333; font-weight: 500;">Senior ${name}</div>
                        <div style="font-size: 6px; color: #888;">2020 - Present</div>
                    </div>
                </div>`;

            case 'two-column':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; font-family: ${font};">
                    <div style="width: 35%; background: ${color}15; padding: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">JD</div>
                        <div style="font-size: 12px; font-weight: bold; color: ${color}; text-align: center; margin-bottom: 10px;">JOHN DOE</div>
                        <div style="font-size: 8px; color: #666; margin-bottom: 8px; font-weight: bold;">CONTACT</div>
                        <div style="font-size: 6px; color: #888; margin-bottom: 2px;">hello@email.com</div>
                        <div style="font-size: 6px; color: #888; margin-bottom: 8px;">+123-456-7890</div>
                        <div style="font-size: 8px; color: #666; margin-bottom: 4px; font-weight: bold;">SKILLS</div>
                        <div style="font-size: 6px; color: #888;">• Leadership<br>• Management</div>
                    </div>
                    <div style="width: 65%; padding: 12px;">
                        <div style="font-size: 10px; color: ${color}; margin-bottom: 2px;">${name}</div>
                        <div style="border-bottom: 2px solid ${color}; margin-bottom: 8px;"></div>
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 4px;">PROFILE SUMMARY</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.3; margin-bottom: 8px;">Professional with extensive experience...</div>
                        <div style="font-size: 9px; font-weight: bold; color: ${color}; margin-bottom: 4px;">WORK EXPERIENCE</div>
                        <div style="font-size: 7px; font-weight: bold; color: #333;">Senior Position | Company</div>
                        <div style="font-size: 6px; color: #666;">2020 - Present</div>
                    </div>
                </div>`;

            case 'side-bar':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex;">
                    <div style="width: 8px; background: ${color};"></div>
                    <div style="flex: 1; padding: 20px;">
                        <div style="font-size: 20px; font-weight: bold; color: #1a202c; margin-bottom: 5px;">John Doe</div>
                        <div style="font-size: 10px; color: ${color}; margin-bottom: 15px;">${name} Expert</div>
                        <div style="font-size: 11px; font-weight: bold; color: ${color}; margin-bottom: 8px;">EXPERIENCE</div>
                        <div style="font-size: 9px; color: #666;">Senior Professional</div>
                    </div>
                </div>`;

            case 'split-design':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; font-family: ${font};">
                    <div style="width: 40%; background: ${color}; color: white; padding: 15px;">
                        <div style="width: 55px; height: 55px; border-radius: 50%; background: white; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: ${color}; font-size: 24px; font-weight: bold;">JD</div>
                        <div style="text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 12px;">JOHN DOE</div>
                        <div style="font-size: 7px; margin-bottom: 10px; opacity: 0.9;">
                            <div style="margin-bottom: 4px;">📧 hello@email.com</div>
                            <div style="margin-bottom: 4px;">📱 +123-456-7890</div>
                            <div>📍 City, Country</div>
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 8px; margin-top: 8px;">
                            <div style="font-size: 8px; font-weight: bold; margin-bottom: 4px;">SKILLS</div>
                            <div style="font-size: 6px; opacity: 0.9;">• Leadership<br>• Strategy<br>• Innovation</div>
                        </div>
                    </div>
                    <div style="width: 60%; padding: 15px;">
                        <div style="font-size: 10px; color: ${color}; font-weight: bold; margin-bottom: 2px;">${name}</div>
                        <div style="border-bottom: 3px solid ${color}; margin-bottom: 10px;"></div>
                        <div style="margin-bottom: 8px;">
                            <div style="font-size: 8px; font-weight: bold; color: ${color}; margin-bottom: 3px;">PROFESSIONAL SUMMARY</div>
                            <div style="font-size: 6px; color: #666; line-height: 1.3;">Results-driven professional with extensive background...</div>
                        </div>
                        <div>
                            <div style="font-size: 8px; font-weight: bold; color: ${color}; margin-bottom: 3px;">CAREER HIGHLIGHTS</div>
                            <div style="font-size: 7px; font-weight: bold; color: #333;">Senior Position</div>
                            <div style="font-size: 6px; color: #888;">Company • 2020-Present</div>
                        </div>
                    </div>
                </div>`;

            case 'modern-grid':
                return `<div style="width: 90%; height: 90%; background: #f8f9fa; border: 1px solid #e0e0e0; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="background: white; padding: 10px; border-radius: 6px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 45px; height: 45px; border-radius: 8px; background: ${color}; margin-right: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">JD</div>
                            <div>
                                <div style="font-size: 14px; font-weight: bold; color: #1a202c;">JOHN DOE</div>
                                <div style="font-size: 8px; color: ${color}; font-weight: 600;">${name}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
                        <div style="background: white; padding: 8px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 3px;">📧 EMAIL</div>
                            <div style="font-size: 5px; color: #666;">hello@email.com</div>
                        </div>
                        <div style="background: white; padding: 8px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 3px;">📱 PHONE</div>
                            <div style="font-size: 5px; color: #666;">+123-456-7890</div>
                        </div>
                    </div>
                    <div style="background: white; padding: 8px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 6px;">
                        <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 3px;">💼 EXPERIENCE</div>
                        <div style="font-size: 6px; font-weight: bold; color: #333;">Senior ${name}</div>
                        <div style="font-size: 5px; color: #888;">Company • 2020-Present</div>
                    </div>
                    <div style="background: white; padding: 8px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 3px;">🎓 EDUCATION</div>
                        <div style="font-size: 6px; color: #666;">Master's Degree • 2018-2020</div>
                    </div>
                </div>`;

            case 'timeline-layout':
                return `<div style="width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="text-align: center; margin-bottom: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${color}; margin: 0 auto 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">JD</div>
                        <div style="font-size: 16px; font-weight: bold; color: #1a202c;">JOHN DOE</div>
                        <div style="font-size: 8px; color: ${color}; font-weight: 600;">${name}</div>
                    </div>
                    <div style="position: relative; padding-left: 20px;">
                        <div style="position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: ${color};"></div>
                        <div style="margin-bottom: 10px; position: relative;">
                            <div style="position: absolute; left: -17px; top: 2px; width: 8px; height: 8px; border-radius: 50%; background: ${color}; border: 2px solid white; box-shadow: 0 0 0 2px ${color};"></div>
                            <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 2px;">2020 - PRESENT</div>
                            <div style="font-size: 8px; font-weight: bold; color: #333;">Senior ${name}</div>
                            <div style="font-size: 6px; color: #666; line-height: 1.3;">Leading innovative projects and teams...</div>
                        </div>
                        <div style="margin-bottom: 10px; position: relative;">
                            <div style="position: absolute; left: -17px; top: 2px; width: 8px; height: 8px; border-radius: 50%; background: white; border: 2px solid ${color};"></div>
                            <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 2px;">2018 - 2020</div>
                            <div style="font-size: 8px; font-weight: bold; color: #333;">Education</div>
                            <div style="font-size: 6px; color: #666;">Master's Degree</div>
                        </div>
                    </div>
                </div>`;

            case 'infographic-style':
                return `<div style="width: 90%; height: 90%; background: linear-gradient(to bottom, white 0%, ${color}10 100%); border: 1px solid #e0e0e0; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: ${font};">
                    <div style="text-align: center; margin-bottom: 10px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, ${color}, ${this.adjustColor(color, -30)}); margin: 0 auto 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold; box-shadow: 0 3px 8px rgba(0,0,0,0.2);">JD</div>
                        <div style="font-size: 15px; font-weight: bold; color: #1a202c;">JOHN DOE</div>
                        <div style="font-size: 8px; color: ${color}; font-weight: 600;">${name}</div>
                    </div>
                    <div style="display: flex; justify-content: space-around; margin-bottom: 10px;">
                        <div style="text-align: center; background: white; padding: 6px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1; margin: 0 3px;">
                            <div style="font-size: 16px; color: ${color}; margin-bottom: 2px;">💼</div>
                            <div style="font-size: 6px; font-weight: bold; color: #333;">5+ Years</div>
                            <div style="font-size: 5px; color: #888;">Experience</div>
                        </div>
                        <div style="text-align: center; background: white; padding: 6px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1; margin: 0 3px;">
                            <div style="font-size: 16px; color: ${color}; margin-bottom: 2px;">🎓</div>
                            <div style="font-size: 6px; font-weight: bold; color: #333;">Master's</div>
                            <div style="font-size: 5px; color: #888;">Degree</div>
                        </div>
                        <div style="text-align: center; background: white; padding: 6px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1; margin: 0 3px;">
                            <div style="font-size: 16px; color: ${color}; margin-bottom: 2px;">⭐</div>
                            <div style="font-size: 6px; font-weight: bold; color: #333;">Expert</div>
                            <div style="font-size: 5px; color: #888;">Level</div>
                        </div>
                    </div>
                    <div style="background: white; padding: 8px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid ${color};">
                        <div style="font-size: 7px; font-weight: bold; color: ${color}; margin-bottom: 3px;">🚀 ABOUT ME</div>
                        <div style="font-size: 6px; color: #666; line-height: 1.3;">Innovative professional driving results...</div>
                    </div>
                </div>`;

            case 'academic-style':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="text-align: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid ${color};">
                        <div style="font-size: 20px; font-weight: bold; color: #1a202c;">John Doe</div>
                        <div style="font-size: 10px; color: ${color}; margin-top: 5px;">${name}</div>
                    </div>
                    <div style="font-size: 11px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EDUCATION</div>
                </div > `;

            case 'dynamic-header':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="background: linear-gradient(45deg, ${color}, ${this.adjustColor(color, -25)}); padding: 18px; color: white; clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);">
                        <div style="font-size: 18px; font-weight: bold;">John Doe</div>
                        <div style="font-size: 9px; opacity: 0.9;">${name}</div>
                    </div>
                    <div style="padding: 15px 20px;">
                        <div style="font-size: 10px; font-weight: bold; color: ${color};">EXPERIENCE</div>
                    </div>
                </div > `;

            case 'technical-grid':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-top: 5px solid ${color};" >
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 20px; font-weight: bold; color: #1a202c;">John Doe</div>
                        <div style="font-size: 10px; color: ${color}; font-family: monospace; margin-top: 3px;">${name}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div style="font-size: 9px; color: #666;">Experience</div>
                        <div style="font-size: 9px; color: #666;">Skills</div>
                    </div>
                </div > `;

            case 'structured-layout':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 2px solid ${color};" >
                    <div style="background: ${color}; color: white; padding: 12px; margin: -20px -20px 15px; text-align: center;">
                        <div style="font-size: 18px; font-weight: bold;">JOHN DOE</div>
                        <div style="font-size: 9px; opacity: 0.9; margin-top: 3px;">${name}</div>
                    </div>
                    <div style="font-size: 11px; font-weight: bold; color: ${color}; margin-bottom: 8px;">PROFESSIONAL EXPERIENCE</div>
                </div > `;

            // NEW UNIQUE LAYOUTS - Completely different structures
            case 'two-column-classic':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex;" >
                    <div style="width: 40%; background: ${color}08; padding: 15px; border-right: 2px solid ${color};">
                        <div style="font-size: 16px; font-weight: bold; color: ${color}; margin-bottom: 10px;">JOHN DOE</div>
                        <div style="font-size: 8px; color: #666; margin-bottom: 12px;">CONTACT</div>
                        <div style="font-size: 7px; color: #888; margin-bottom: 10px;">email@example.com<br>+1 234 567 8900</div>
                        <div style="font-size: 8px; color: #666; margin-bottom: 8px;">SKILLS</div>
                        <div style="font-size: 7px; color: #888;">• Skill 1<br>• Skill 2</div>
                    </div>
                    <div style="width: 60%; padding: 15px;">
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 8px;">EXPERIENCE</div>
                        <div style="font-size: 9px; font-weight: bold; margin-bottom: 3px;">${name}</div>
                        <div style="font-size: 7px; color: #666;">2020 - Present</div>
                    </div>
                </div > `;

            case 'centered-traditional':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;" >
                    <div style="margin-bottom: 15px; padding-bottom: 12px; border-bottom: 1px solid ${color};">
                        <div style="font-size: 22px; font-weight: bold; color: #1a202c;">JOHN DOE</div>
                        <div style="font-size: 10px; color: ${color}; margin-top: 5px;">${name}</div>
                        <div style="font-size: 8px; color: #666; margin-top: 5px;">email@example.com | +1 234 567 8900</div>
                    </div>
                    <div style="text-align: left; margin-bottom: 12px;">
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; text-align: center; margin-bottom: 8px;">PROFESSIONAL EXPERIENCE</div>
                        <div style="font-size: 9px; color: #666;">Senior Position | 2020 - Present</div>
                    </div>
                </div > `;

            case 'top-banner':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="background: ${color}; color: white; padding: 25px 20px; margin-bottom: 15px;">
                        <div style="font-size: 20px; font-weight: bold;">JOHN DOE</div>
                        <div style="font-size: 10px; opacity: 0.9; margin-top: 3px;">${name} | email@example.com</div>
                    </div>
                    <div style="padding: 0 20px;">
                        <div style="font-size: 11px; font-weight: bold; color: ${color}; margin-bottom: 8px;">EXPERIENCE</div>
                        <div style="font-size: 9px; color: #666;">Senior Role | Company</div>
                    </div>
                </div > `;

            case 'thin-sidebar':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex;" >
                    <div style="width: 30%; background: ${color}; color: white; padding: 15px;">
                        <div style="font-size: 14px; font-weight: bold; margin-bottom: 15px;">JOHN<br>DOE</div>
                        <div style="font-size: 7px; opacity: 0.9; margin-bottom: 10px;">CONTACT</div>
                        <div style="font-size: 6px; opacity: 0.8;">email@example.com</div>
                    </div>
                    <div style="width: 70%; padding: 15px;">
                        <div style="font-size: 12px; font-weight: bold; color: ${color}; margin-bottom: 10px;">${name}</div>
                        <div style="font-size: 10px; color: #666; margin-bottom: 8px;">EXPERIENCE</div>
                        <div style="font-size: 8px; color: #888;">Senior Position</div>
                    </div>
                </div > `;

            case 'boxed-sections':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="border: 2px solid ${color}; padding: 12px; margin-bottom: 12px; text-align: center;">
                        <div style="font-size: 18px; font-weight: bold; color: ${color};">JOHN DOE</div>
                        <div style="font-size: 9px; color: #666; margin-top: 3px;">${name}</div>
                    </div>
                    <div style="border: 1px solid ${color}; padding: 10px; margin-bottom: 10px;">
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                        <div style="font-size: 8px; color: #666;">Senior Role</div>
                    </div>
                </div > `;

            case 'diagonal-header':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;" >
                    <div style="background: linear-gradient(120deg, ${color} 60%, transparent 60%); padding: 20px; margin-bottom: 15px; color: white;">
                        <div style="font-size: 18px; font-weight: bold;">John Doe</div>
                        <div style="font-size: 9px; opacity: 0.9;">${name}</div>
                    </div>
                    <div style="padding: 0 20px;">
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                    </div>
                </div > `;

            case 'grid-layout':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div style="grid-column: 1 / -1; font-size: 20px; font-weight: bold; color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 8px;">John Doe</div>
                        <div style="font-size: 8px; color: #666;"><strong>Email:</strong> john@example.com</div>
                        <div style="font-size: 8px; color: #666;"><strong>Phone:</strong> +1 234 567 8900</div>
                    </div>
                    <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                </div > `;

            case 'portfolio-style':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="background: ${color}; height: 80px; position: relative;"></div>
                    <div style="padding: 15px; margin-top: -40px;">
                        <div style="background: white; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2); padding: 12px; margin-bottom: 12px;">
                            <div style="font-size: 18px; font-weight: bold; color: ${color};">John Doe</div>
                            <div style="font-size: 9px; color: #666;">${name}</div>
                        </div>
                        <div style="font-size: 10px; font-weight: bold; color: ${color};">EXPERIENCE</div>
                    </div>
                </div > `;

            case 'magazine-layout':
                return `< div style = "width: 90%; height: 90%; background: white; border: 1px solid #e0e0e0; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: grid; grid-template-columns: 2fr 1fr; gap: 12px;" >
                    <div>
                        <div style="font-size: 24px; font-weight: bold; color: ${color}; line-height: 1;">JOHN<br>DOE</div>
                        <div style="font-size: 9px; color: #666; margin-top: 8px; margin-bottom: 12px;">${name}</div>
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                        <div style="font-size: 8px; color: #666;">Senior Position</div>
                    </div>
                    <div style="background: ${color}10; padding: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${color}; margin-bottom: 6px;">CONTACT</div>
                        <div style="font-size: 7px; color: #666;">email@example.com</div>
                    </div>
                </div > `;

            case 'code-style':
                return `< div style = "width: 90%; height: 90%; background: #1a1a1a; border: 1px solid #333; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: monospace; color: #00ff00;" >
                    <div style="font-size: 10px; margin-bottom: 10px; color: #888;">// Resume.js</div>
                    <div style="font-size: 14px; margin-bottom: 8px;">const developer = {</div>
                    <div style="font-size: 12px; margin-left: 15px; margin-bottom: 6px;">  name: <span style="color: ${color};">"John Doe"</span>,</div>
                    <div style="font-size: 12px; margin-left: 15px; margin-bottom: 6px;">  role: <span style="color: ${color};">"${name}"</span>,</div>
                    <div style="font-size: 12px; margin-left: 15px;">  experience: <span style="color: #00ff00;">5</span></div>
                    <div style="font-size: 14px;">}</div>
                </div > `;

            case 'floating-header':
                return `< div style = "width: 90%; height: 90%; background: #f5f5f5; border: 1px solid #e0e0e0; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 15px; margin-bottom: 15px; border-left: 4px solid ${color};">
                        <div style="font-size: 18px; font-weight: bold; color: #1a202c;">John Doe</div>
                        <div style="font-size: 9px; color: ${color}; margin-top: 3px;">${name}</div>
                    </div>
                    <div style="background: white; padding: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                        <div style="font-size: 10px; font-weight: bold; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                        <div style="font-size: 8px; color: #666;">Senior Position</div>
                    </div>
                </div > `;

            case 'medical-chart':
                return `< div style = "width: 90%; height: 90%; background: white; border: 2px solid ${color}; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" >
                    <div style="border-bottom: 3px solid ${color}; padding-bottom: 10px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-size: 16px; font-weight: bold; color: ${color};">Dr. John Doe</div>
                                <div style="font-size: 8px; color: #666; margin-top: 3px;">${name}</div>
                            </div>
                            <div style="width: 40px; height: 40px; border: 2px solid ${color}; border-radius: 50%; background: ${color}10;"></div>
                        </div>
                    </div>
                    <div style="font-size: 9px; color: #666; margin-bottom: 6px;"><strong>Specialization:</strong> ${name}</div>
                    <div style="font-size: 9px; color: #666;"><strong>Experience:</strong> 5+ years</div>
                </div > `;

            case 'blueprint-style':
                return `< div style = "width: 90%; height: 90%; background: #1a3a52; border: 1px solid #2a4a62; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); color: white; font-family: monospace;" >
                    <div style="border: 1px solid ${color}; padding: 12px; margin-bottom: 12px;">
                        <div style="font-size: 16px; font-weight: bold; color: ${color};">JOHN DOE</div>
                        <div style="font-size: 8px; opacity: 0.8; margin-top: 3px;">${name}</div>
                    </div>
                    <div style="border-left: 2px solid ${color}; padding-left: 10px;">
                        <div style="font-size: 9px; color: ${color}; margin-bottom: 6px;">EXPERIENCE</div>
                        <div style="font-size: 7px; opacity: 0.8;">Senior Position</div>
                    </div>
                </div > `;

            case 'terminal-style':
                return `< div style = "width: 90%; height: 90%; background: #000; border: 1px solid #333; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: monospace; color: ${color};" >
                    <div style="font-size: 10px; margin-bottom: 10px; color: #666;">user@resume:~$</div>
                    <div style="font-size: 12px; margin-bottom: 8px;">$ cat profile.txt</div>
                    <div style="font-size: 10px; margin-bottom: 6px; color: #fff;">Name: John Doe</div>
                    <div style="font-size: 10px; margin-bottom: 6px; color: #fff;">Role: ${name}</div>
                    <div style="font-size: 10px; margin-bottom: 10px; color: #fff;">Status: Available</div>
                    <div style="font-size: 10px; color: #666;">$ _</div>
                </div > `;

            default:
                return this.generatePreview(templateId, color, 'gradient-header', font);
        }
    }

    adjustColor(color, percent) {
        // Simple color adjustment function
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    attachEventListeners() {
        // Category filter buttons
        const categoryBtns = this.element.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.filterByCategory(category);

                // Update active state
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Template cards - click anywhere on card
        const templateCards = this.element.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const templateId = card.getAttribute('data-template');
                this.selectTemplate(templateId);
            });
        });

        // Use Template buttons - explicit handling
        const useTemplateBtns = this.element.querySelectorAll('.use-template-btn');
        useTemplateBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent double triggering
                const card = btn.closest('.template-card');
                const templateId = card.getAttribute('data-template');
                this.selectTemplate(templateId);
            });
        });
    }

    filterByCategory(category) {
        this.selectedCategory = category;
        const sections = this.element.querySelectorAll('.category-section');

        sections.forEach(section => {
            if (category === 'all') {
                section.style.display = 'block';
            } else {
                const sectionCategory = section.getAttribute('data-category');
                section.style.display = sectionCategory === category ? 'block' : 'none';
            }
        });
    }

    selectTemplate(templateId) {
        console.log('Selected template:', templateId);

        // Store selected template in localStorage
        localStorage.setItem('selectedTemplate', templateId);

        // Navigate to resume builder
        const navLink = document.querySelector('[data-page="resume"]');
        if (navLink) {
            navLink.click();
        }
    }
}
