const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

// Middleware to check if API key is configured
const checkApiKey = (req, res, next) => {
    if (!process.env.GROQ_API_KEY) {
        return res.status(503).json({
            msg: 'Groq API Key is missing. Please add GROQ_API_KEY to your .env file.',
            missingKey: true
        });
    }
    next();
};

// @route   POST api/chat
// @desc    Get response from Groq AI
// @access  Public (or Private if you want to protect it)
router.post('/', checkApiKey, async (req, res) => {
    const { message, context } = req.body;
    console.log('Received chat request:', message, context);
    console.log('Using model: llama-3.3-70b-versatile (Groq)');

    if (!message) {
        return res.status(400).json({ msg: 'Message is required' });
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        // Context can be used to set the persona
        let systemPrompt = "You are a helpful AI assistant.";

        if (context === 'general') {
            systemPrompt = `You are a helpful AI Career and Tech Assistant for "Path2Profession". 
            Your goal is to help users with career advice, technology trends, coding questions, and motivation.
            Keep answers concise, professional, and encouraging.`;
        } else if (context === 'skills') {
            systemPrompt = `Analyze the skill demand for the user's inquiry. Provide insights on current trends.`;
        } else if (context === 'cover_letter') {
            systemPrompt = `You are an expert career coach. Write a professional, compelling, and highly personalized cover letter based on the provided job description. 
            Focus on matching skills from a typical professional background to the job requirements. 
            The tone should be enthusiastic but professional. 
            Structure: Introduction, 2-3 body paragraphs highlighting relevant experience/skills, and a strong closing. 
            Format with clear paragraphs. Do NOT use placeholders like [Your Name] if you can avoid it, or make them very obvious.`;
        } else if (context === 'interview_prep') {
            systemPrompt = `You are a senior hiring manager. Create a comprehensive interview preparation guide based on the provided job description.
            
            CRITICAL: Return ONLY a raw JSON object. Do NOT include any introductory text, pleasantries, or markdown code blocks (like \`\`\`json).
            
            Structure:
            {
                "overview": "Brief summary",
                "technical_questions": [
                    { "question": "", "tips": "" }
                ],
                "behavioral_questions": [
                    { "question": "", "tips": "" }
                ],
                "key_topics": []
            }`;
        } else if (context === 'job_analysis') {
            systemPrompt = `Analyze the job description and extract key details.
            
            CRITICAL: Return ONLY a raw JSON object. Do NOT include any introductory text or markdown code blocks.
            
            Structure:
            {
                "experience_level": "Entry/Mid/Senior",
                "skills": ["Skill 1", "Skill 2"],
                "keywords": ["Keyword 1", "Keyword 2"],
                "interview_questions": ["Question 1", "Question 2"]
            }`;
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const text = completion.choices[0]?.message?.content || "";
        res.json({ reply: text });

    } catch (err) {
        console.error('Groq API Error:', err.message);
        res.status(500).json({
            msg: 'Error communicating with AI service',
            error: err.message
        });
    }
});

module.exports = router;
