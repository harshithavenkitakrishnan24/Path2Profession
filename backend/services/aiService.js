const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env'), override: true });

if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY is not set – Gemini client will be disabled.');
}
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY is not set – Groq client will be disabled.');
}

/**
 * Generate resume content using AI (used for manual entry/builder)
 */
const generateResumeContent = async (userInputs) => {
    try {
        console.log("Attempting resume generation with Groq...");
        const jsonString = await generateWithGroq(userInputs);
        return sanitizeParsedData(JSON.parse(jsonString));
    } catch (groqError) {
        console.error("Groq generation failed, falling back to Gemini:", groqError.message);
        const data = await generateWithGemini(userInputs);
        return sanitizeParsedData(data);
    }
};

/**
 * Parse resume from raw text (used for file uploads)
 */
const parseResumeFromText = async (rawText) => {
    try {
        console.log(`Attempting resume parsing with Gemini. Raw text length: ${rawText.length}`);
        return await parseWithGemini(rawText);
    } catch (geminiError) {
        console.error("Gemini parsing failed, falling back to Groq:", geminiError.message);
        const jsonString = await parseWithGroq(rawText);
        return sanitizeParsedData(JSON.parse(jsonString));
    }
};

// --- PRIVATE IMPLEMENTATIONS ---

const generateWithGroq = async (userInputs) => {
    if (!process.env.GROQ_API_KEY) throw new Error('Groq client not configured – GROQ_API_KEY is missing');
    const prompt = getGenerationPrompt(userInputs);

    console.log("Calling Groq (Native Fetch)...");
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: "You are an expert ATS Resume Builder. Return ONLY valid JSON." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Groq API fetch failed");
    }

    const data = await response.json();
    console.log("Groq generation successful.");
    return data.choices[0]?.message?.content || "{}";
};

const parseWithGroq = async (rawText) => {
    if (!process.env.GROQ_API_KEY) throw new Error('Groq client not configured – GROQ_API_KEY is missing');
    const prompt = getParsingPrompt(rawText);

    console.log("Calling Groq for parsing (Native Fetch)...");
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: "You are an expert ATS Resume Parser. Return ONLY valid JSON." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.1,
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Groq API fetch failed");
    }

    const data = await response.json();
    console.log("Groq parsing successful.");
    const jsonString = data.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(jsonString);
    return sanitizeParsedData(parsedData);
};

const sanitizeParsedData = (data) => {
    if (!data || typeof data !== 'object') data = {};

    // Ensure root level summary
    if (data.personalInfo && data.personalInfo.summary && !data.summary) {
        data.summary = data.personalInfo.summary;
    }

    // Ensure IDs and correct keys in arrays
    const sanitizeArray = (arr, titleKey) => {
        if (!Array.isArray(arr)) return [];
        return arr.map((item, i) => {
            if (typeof item !== 'object' || item === null) {
                return {
                    id: Date.now() + Math.floor(Math.random() * 1000) + i,
                    [titleKey]: String(item)
                };
            }

            // Robust Description Extraction: Check common keys the AI might use
            let description = item.description || item.details || item.content || item.bulletPoints || item.responsibilities || '';
            if (Array.isArray(description)) description = description.join('\n');

            return {
                ...item,
                id: item.id || (Date.now() + Math.floor(Math.random() * 1000) + i),
                description: String(description)
            };
        });
    };

    data.experience = sanitizeArray(data.experience, 'title');
    data.education = sanitizeArray(data.education, 'degree');
    data.projects = sanitizeArray(data.projects, 'title');

    // Also sanitize customSections
    if (Array.isArray(data.customSections)) {
        data.customSections = data.customSections.map(section => ({
            ...section,
            items: sanitizeArray(section.items, 'title')
        }));
    }

    if (!data.personalInfo) data.personalInfo = {};
    if (data.personalInfo.name) {
        data.personalInfo.name = data.personalInfo.name.toUpperCase();
    }

    if (!data.sections) {
        data.sections = ['experience', 'education', 'skills', 'projects', 'certifications'];
    }

    return data;
};

const generateWithGemini = async (userInputs) => {
    if (!genAI) throw new Error('Gemini client not configured – GEMINI_API_KEY is missing');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = getGenerationPrompt(userInputs);

    console.log("Calling Gemini (Fallback)...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return extractJsonFromText(text);
};

const parseWithGemini = async (rawText) => {
    if (!genAI) throw new Error('Gemini client not configured – GEMINI_API_KEY is missing');
    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.1,
            responseMimeType: "application/json"
        }
    });

    const prompt = getParsingPrompt(rawText);

    console.log("Calling Gemini for Parse...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw AI Response Length:", text.length);
    console.log("Is JSON:", text.trim().startsWith('{'));

    const parsedData = extractJsonFromText(text);
    return sanitizeParsedData(parsedData);
};

// --- PROMPT HELPERS ---

const getGenerationPrompt = (userInputs) => {
    return `Create a highly professional ATS-optimized resume in JSON format.
    Details: ${JSON.stringify(userInputs)}
    
    CRITICAL RULES:
    1. Mapping: Use "title" instead of "role", "startDate" and "endDate" instead of "year" or "duration".
    2. Description: MUST be a single string. If multiple points, separate with \\n.
    3. Completeness: Ensure personalInfo, experience, education, skills, projects, and certifications are filled.

    JSON Structure: {
        "suggestedTemplate": "ats-basic",
        "personalInfo": { "name": "UPPERCASE", "title": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "portfolio": "", "summary": "" },
        "experience": [{ "company": "", "title": "", "location": "", "startDate": "", "endDate": "", "description": "" }],
        "education": [{ "school": "", "degree": "", "location": "", "startDate": "", "endDate": "" }],
        "skills": [],
        "projects": [{ "title": "", "subtitle": "Tech Stack", "description": "" }],
        "certifications": []
    }`;
};

const getParsingPrompt = (rawText) => {
    return `You are a robotic, high-fidelity Resume Data Extractor. Your ONLY mission is to COPY and PASTE every single word from the provided text into the structured JSON below.
    
    CRITICAL QUALITY RULES:
    1. NEVER summarize. Extract 100% of the text.
    2. Map "INTERNSHIP EXPERIENCE" or "WORK EXPERIENCE" sections strictly to the "experience" array.
    3. Map "PROJECTS" or academic projects strictly to the "projects" array.
    4. Map "SKILLS" to the "skills" array.
    5. Ensure "HSC" and "SSLC" education entries are fully captured in the "education" array.
    6. ANYTHING ELSE (Declaration, Ongoing skills, etc.) MUST go into the "customSections" array. 
    7. Each description field MUST contain the full text, including all bullet points.
    
    TEXT TO EXTRACT: 
    """${rawText.substring(0, 35000)}"""
    
    STRICT JSON Structure to return: {
        "atsScore": 85,
        "atsFeedback": ["Actionable point 1", "Actionable point 2"],
        "personalInfo": { 
            "name": "UPPERCASE", 
            "title": "Exact Header Title", 
            "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "", "github": ""
        },
        "summary": "Exact About/Profile text",
        "experience": [
            { "company": "Exact Co", "title": "Exact Role", "location": "", "startDate": "", "endDate": "", "description": "LITERAL FULL DESCRIPTION" }
        ],
        "education": [
            { "school": "Exact Inst", "degree": "Exact Deg", "location": "", "startDate": "", "endDate": "" }
        ],
        "skills": ["Skill 1", "Skill 2"],
        "projects": [
            { "title": "Exact Project Name", "subtitle": "Tech", "description": "LITERAL FULL DESCRIPTION" }
        ],
        "certifications": ["Cert 1"],
        "languages": ["Lang 1"],
        "interests": ["Interest 1"],
        "customSections": [
            { 
                "title": "SECTION NAME", 
                "items": [{ "title": "", "subtitle": "", "description": "LITERAL CONTENT" }]
            }
        ]
    }`;
};

const extractJsonFromText = (text) => {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid format");
    return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
};

module.exports = { generateResumeContent, parseResumeFromText };
