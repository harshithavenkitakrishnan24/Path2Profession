const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // For some reason the library doesn't expose listModels directly on the main class in some versions,
        // but let's try to infer from a simple generate content or just try 'gemini-pro' (without 1.0/1.5) again
        // cleanly.

        // Actually, let's try to use the model "gemini-1.0-pro" which is the older stable one if 1.5 isn't working
        console.log("Trying gemini-1.0-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.0-pro!", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.0-pro:", error.message);

        try {
            console.log("Trying gemini-pro...");
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Hello");
            console.log("Success with gemini-pro!", result.response.text());
        } catch (e) {
            console.error("Error with gemini-pro:", e.message);
        }
    }
}

listModels();
