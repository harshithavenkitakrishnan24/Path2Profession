const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function run() {
    try {
        console.log("Using API Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

        // Direct REST API Call to List Models
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

        console.log("Testing REST API URL:", url.replace(apiKey, "HIDDEN_KEY"));

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("REST API Error:", data);
        } else {
            console.log("Available Models:");
            if (data.models) {
                data.models.forEach(model => {
                    if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`- ${model.name}`);
                    }
                });
            } else {
                console.log("No models found or structure unexpected:", data);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

run();
