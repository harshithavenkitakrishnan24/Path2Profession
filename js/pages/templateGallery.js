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
        // Base colors mapped to common categories
        const baseColors = {
            'modern': '#6366f1',
            'creative': '#ec4899',
            'professional': '#0ea5e9',
            'minimal': '#14b8a6',
            'executive': '#f59e0b',
            'designer': '#8b5cf6',
            'developer': '#10b981',
            'academic': '#4f46e5',
            'corporate': '#0284c7',
            'startup': '#f43f5e',
            'elegant': '#d946ef',
            'simple': '#64748b'
        };

        const baseTemplate = Object.keys(baseColors).find(base =>
            templateId === base || templateId.startsWith(base + '-')
        );

        const baseColorStr = baseColors[baseTemplate] || '#6366f1';
        
        return this.generatePreview(templateId, baseColorStr);
    }
    
    // Kept the helper so the random hue-adjust generator works
    adjustColorHSL(hex, hueShift, satShift, lightShift) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = (h * 360 + hueShift) % 360;
        if (h < 0) h += 360;
        s = Math.max(0, Math.min(1, s + (satShift / 100)));
        l = Math.max(0, Math.min(1, l + (lightShift / 100)));

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

        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
    }

    generatePreview(templateId, baseColorStr) {
        let seedStr = templateId + "salt7";
        let h = 0xdeadbeef;
        for(let i = 0; i < seedStr.length; i++)
            h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h ^= h >>> 13;
        
        let seed = h;
        const random = () => {
            seed = (seed * 16807) % 2147483647;
            return Math.abs((seed - 1) / 2147483646);
        };

        random(); random();

        const hueShift = (random() * 60) - 30;
        const color = this.adjustColorHSL(baseColorStr || '#6366f1', hueShift, 0, 0);

        const isDark = random() > 0.85;
        const bgList = isDark ? ['#1e293b', '#0f172a', '#171717', '#000000'] : ['#ffffff', '#f8fafc', '#f1f5f9', '#fafafa'];
        const bg = bgList[Math.floor(random() * bgList.length)];
        const txt = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';
        const txtDark = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)';
        
        const cardRadius = [0, 2, 4, 8, 12][Math.floor(random() * 5)];
        const font = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'][Math.floor(random() * 5)];
        const cardStyle = `width: 100%; height: 100%; background: ${bg}; font-family: ${font}, sans-serif; overflow: hidden; position: relative; display: flex; flex-direction: column; border: 1px solid ${isDark?'#334155':'#e2e8f0'}; border-radius: ${cardRadius}px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);`;

        const line = (w, h, c, m, radius='1px') => `<div style="width: ${w}; height: ${h}px; background: ${c}; margin: ${m}; border-radius: ${radius}; flex-shrink: 0;"></div>`;
        
        const textBlock = (lines, w, m, algn='left') => {
            let html = `<div style="margin:${m}; display:flex; flex-direction:column; align-items:${algn==='center'?'center':(algn==='right'?'flex-end':'flex-start')}">`;
            for(let i=0; i<lines; i++) {
                let lw = (i === lines-1) ? (40 + random() * 40) + '%' : w;
                html += line(lw, 3, txt, '0 0 5px 0');
            }
            return html + '</div>';
        };

        const layoutModes = [0, 1, 2, 3, 4, 5];
        const layoutMode = layoutModes[Math.floor(random() * layoutModes.length)];

        const avatarShape = random() > 0.5 ? '50%' : (random() > 0.5 ? '8px' : '0');
        const hasAvatar = random() > 0.3;
        const avatarSize = 25 + Math.floor(random() * 25);
        const avatarEl = hasAvatar ? `<div style="width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${avatarShape}; background: ${color}; flex-shrink: 0;"></div>` : '';

        const aligns = ['left', 'center', 'right'];
        const titleAlign = aligns[Math.floor(random() * aligns.length)];
        const titleWidth = 40 + Math.floor(random() * 40);

        if (layoutMode === 0) { // SIDEBAR
            const isRow = random() > 0.5 ? 'row' : 'row-reverse';
            const sbWidth = 25 + Math.floor(random() * 15);
            const sbBg = random() > 0.5 ? color : (isDark ? '#334155' : `${color}15`);
            const isSolid = sbBg === color;
            const sbTxt = isSolid ? 'rgba(255,255,255,0.6)' : txt;
            const sbTitle = isSolid ? '#fff' : color;
            
            return `<div style="${cardStyle} flex-direction: ${isRow};">
                <div style="width: ${sbWidth}%; height: 100%; background: ${sbBg}; padding: 12px; display: flex; flex-direction: column; align-items: ${titleAlign === 'right' ? 'flex-end' : (titleAlign==='center'?'center':'flex-start')};">
                    ${hasAvatar ? `<div style="margin-bottom: 12px">${avatarEl.replace(color, isSolid?'rgba(255,255,255,0.3)':color)}</div>` : ''}
                    ${line(titleWidth+'%', isSolid?8:5, sbTitle, '0 0 6px 0')}
                    ${line('80%', 3, sbTxt, '0 0 12px 0')}
                    <div style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
                        <div>
                            ${line('50%', 4, sbTitle, '0 0 6px 0')}
                            ${textBlock(Math.floor(2+random()*3), '100%', '0', titleAlign)}
                        </div>
                        <div>
                            ${line('50%', 4, sbTitle, '0 0 6px 0')}
                            ${textBlock(Math.floor(2+random()*3), '100%', '0', titleAlign)}
                        </div>
                    </div>
                </div>
                <div style="flex: 1; padding: 15px; display: flex; flex-direction: column; background: ${bg};">
                    ${!hasAvatar ? line('60%', 8, color, '0 0 12px 0') : ''}
                    ${line('40%', 5, color, '0 0 8px 0')}
                    ${textBlock(Math.floor(3+random()*4), '100%', '0 0 12px 0')}
                    ${line('40%', 5, color, '0 0 8px 0')}
                    ${textBlock(Math.floor(3+random()*4), '100%', '0 0 12px 0')}
                    ${line('40%', 5, color, '0 0 8px 0')}
                    ${textBlock(2, '100%', '0')}
                </div>
            </div>`;
        } 
        else if (layoutMode === 1) { // HEADER BLOCK
            const headerSizes = [15, 20, 25, 30];
            const hdHeight = headerSizes[Math.floor(random() * headerSizes.length)];
            const hdBg = random() > 0.4 ? color : 'transparent';
            const isSolid = hdBg === color;
            const borderBtm = !isSolid && random() > 0.5 ? `2px solid ${color}` : 'none';
            const hdTxt = isSolid ? '#fff' : color;
            const hdSub = isSolid ? 'rgba(255,255,255,0.7)' : txtDark;
            const hAlign = titleAlign;
            const mAuto = hAlign === 'center' ? '0 auto' : (hAlign === 'right' ? '0 0 0 auto' : '0');
            const cols = random() > 0.6 ? 2 : 1;

            return `<div style="${cardStyle}">
                <div style="height: ${hdHeight}%; background: ${hdBg}; border-bottom: ${borderBtm}; padding: 12px; display: flex; flex-direction: ${hAlign==='center'?'column':'row'}; align-items: ${hAlign==='center'?'center':(hAlign==='right'?'flex-end':'flex-start')}; justify-content: ${hAlign==='center'?'center':(hAlign==='right'?'flex-end':'space-between')};">
                    ${hasAvatar ? `<div style="margin:${hAlign==='center'?'0 0 8px 0':(hAlign==='right'?'0 0 0 10px':'0 10px 0 0')}; order:${hAlign==='right'?2:0}">${avatarEl.replace(color, isSolid?'rgba(255,255,255,0.3)':color)}</div>` : ''}
                    <div style="flex:1; text-align: ${hAlign};">
                        ${line(titleWidth+'%', 8, hdTxt, mAuto + ' 6px')}
                        ${line('40%', 3, hdSub, mAuto)}
                    </div>
                </div>
                <div style="flex: 1; padding: ${10 + Math.floor(random()*10)}px; display: ${cols===2?'grid':'flex'}; grid-template-columns: 1fr 1fr; gap: 10px; flex-direction: column;">
                    <div style="flex:1">
                        ${line('50%', 5, color, '0 0 6px 0')}
                        ${textBlock(Math.floor(3+random()*3), '100%', '0 0 10px 0')}
                        ${cols===1 ? line('50%', 5, color, '0 0 6px 0') : ''}
                        ${cols===1 ? textBlock(Math.floor(3+random()*3), '100%', '0') : ''}
                    </div>
                    ${cols===2 ? `<div style="flex:1">
                        ${line('50%', 5, color, '0 0 6px 0')}
                        ${textBlock(Math.floor(4+random()*4), '100%', '0')}
                    </div>` : ''}
                </div>
            </div>`;
        }
        else if (layoutMode === 2) { // SPLIT TOP/BOTTOM
            const splitRatio = 30 + Math.floor(random() * 30);
            const topColor = color;
            const btmColor = random() > 0.5 ? (isDark ? '#334155' : `${color}10`) : bg;
            const topAlign = aligns[Math.floor(random() * aligns.length)];
            
            return `<div style="${cardStyle}">
                <div style="height: ${splitRatio}%; background: ${topColor}; padding: 15px; display: flex; flex-direction: column; justify-content: ${topAlign === 'center' ? 'center' : (topAlign === 'right' ? 'flex-end' : 'flex-start')}; align-items: ${titleAlign==='center'?'center':(titleAlign==='right'?'flex-end':'flex-start')};">
                    ${hasAvatar ? `<div style="margin-bottom:10px">${avatarEl.replace(color, 'rgba(255,255,255,0.3)')}</div>` : ''}
                    ${line('60%', 8, '#fff', '0 0 6px 0')}
                    ${textBlock(2, '80%', '0', titleAlign).replace(new RegExp(txt, 'g'), 'rgba(255,255,255,0.5)')}
                </div>
                <div style="flex: 1; background: ${btmColor}; padding: 15px; display: flex; flex-direction: column; gap: 10px; overflow: hidden;">
                    ${line('40%', 5, color, '0')}
                    ${textBlock(3, '100%', '0')}
                    ${line('40%', 5, color, '0')}
                    ${textBlock(3, '100%', '0')}
                </div>
            </div>`;
        }
        else if (layoutMode === 3) { // MASONRY / GRID
            const hasHero = random() > 0.3;
            const boxCount = 2 + Math.floor(random() * 4);
            const boxRadius = [0, 4, 8, 16][Math.floor(random() * 4)];
            const boxBg = isDark ? '#334155' : `${color}10`;
            
            let gridHtml = '';
            for(let i=0; i<boxCount; i++) {
                gridHtml += `<div style="background: ${boxBg}; padding: 8px; border-radius: ${boxRadius}px; display:flex; flex-direction:column;">
                    ${line('50%', 4, color, '0 0 6px 0')}
                    ${textBlock(3, '100%', '0')}
                </div>`;
            }

            return `<div style="${cardStyle} padding: 15px;">
                ${hasHero ? `<div style="display:flex; align-items:center; margin-bottom: 15px; gap:10px; border-bottom: ${random()>0.5?'2px dashed':'2px solid'} ${color}50; padding-bottom: 10px;">
                    ${hasAvatar ? avatarEl : ''}
                    <div style="flex:1; text-align: ${titleAlign};">
                        ${line('70%', 8, color, titleAlign==='center'?'0 auto 6px':(titleAlign==='right'?'0 0 6px auto':'0 0 6px 0'))}
                        ${line('40%', 3, txtDark, titleAlign==='center'?'0 auto':(titleAlign==='right'?'0 0 0 auto':'0'))}
                    </div>
                </div>` : ''}
                <div style="display: grid; grid-template-columns: repeat(${boxCount > 3 ? 2 : (boxCount === 3 ? 3 : 2)}, 1fr); gap: 8px; flex: 1; align-content: start;">
                    ${gridHtml}
                    ${boxCount % 2 !== 0 && boxCount > 3 ? `<div style="grid-column: 1 / -1; background: ${boxBg}; padding: 8px; border-radius: ${boxRadius}px;">${line('30%', 4, color, '0 0 6px 0')}${textBlock(2, '100%', '0')}</div>` : ''}
                </div>
            </div>`;
        }
        else if (layoutMode === 4) { // MINIMALIST CENTERED
            const isBordered = random() > 0.5;
            const borderSize = 2 + Math.floor(random() * 10);
            return `<div style="${cardStyle} padding: 20px 15px; align-items: center; text-align: center; ${isBordered ? `border: ${borderSize}px solid ${color}20;` : ''}">
                ${hasAvatar ? `<div style="margin-bottom: 12px">${avatarEl}</div>` : ''}
                ${line('50%', 8, color, '0 auto 8px')}
                ${line('30%', 3, txtDark, '0 auto 15px')}
                
                <div style="width: 100%; max-width: 85%; flex: 1; display: flex; flex-direction: ${random()>0.5?'column':'row'}; gap: 10px; line-height: 1;">
                    <div style="flex:1">
                        ${line('40%', 4, color, '0 auto 6px')}
                        ${textBlock(3, '100%', '0', 'center')}
                    </div>
                    <div style="flex:1">
                        ${line('40%', 4, color, '0 auto 6px')}
                        ${textBlock(3, '100%', '0', 'center')}
                    </div>
                </div>
            </div>`;
        }
        else { // BOXED / CREATIVE
            const decoType = Math.floor(random() * 4);
            
            let decoHtml = '';
            let contentStyle = 'flex: 1; display:flex; flex-direction:column; gap: 10px; z-index: 2; position:relative;';
            let containerPad = '15px';
            
            if (decoType === 0) {
                decoHtml = `<div style="position:absolute; top: 15px; left: -10px; right: -10px; height: 35px; background: ${color}; transform: rotate(${random()>0.5?'-2deg':'2deg'}); z-index:1;"></div>`;
                contentStyle += ' margin-top: 40px;';
            } else if (decoType === 1) {
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const ltr = letters[Math.floor(random() * letters.length)];
                decoHtml = `<div style="position:absolute; right: -10%; bottom: -10%; font-size: 150px; font-weight:900; color: ${color}10; z-index:0; line-height:1;">${ltr}</div>`;
            } else if (decoType === 2) {
                containerPad = '0';
                decoHtml = `<div style="height: 30%; background: ${color}; position:absolute; top:0; left:0; right:0; z-index:0;"></div>`;
                contentStyle = `flex: 1; display:flex; flex-direction:column; gap:8px; z-index: 2; position:relative; background: ${bg}; margin: 15px; padding: 12px; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);`;
            } else {
                decoHtml = `<div style="position:absolute; top:0; left:0; right:0; height: 40px; background: ${color}; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0); z-index:0;"></div>`;
                contentStyle += ' margin-top: 20px;';
            }

            return `<div style="${cardStyle} padding: ${containerPad};">
                ${decoHtml}
                <div style="${contentStyle}">
                    ${hasAvatar && decoType !== 0 ? `<div style="align-self:${titleAlign==='right'?'flex-end':(titleAlign==='center'?'center':'flex-start')}">${avatarEl}</div>` : ''}
                    ${line('60%', 8, color, '0 0 6px 0')}
                    ${line('40%', 3, txtDark, '0 0 10px 0')}
                    ${line('35%', 5, color, '0 0 6px 0')}
                    ${textBlock(3, '100%', '0')}
                    ${line('35%', 5, color, '0 0 6px 0')}
                    ${textBlock(3, '100%', '0')}
                </div>
            </div>`;
        }
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
