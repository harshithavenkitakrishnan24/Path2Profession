const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
    try {
        // The SDK doesn't have a direct listModels method on the client instance in some versions.
        // We have to use the model manager if exposed, or just rely on documentation.
        // However, let's try a direct fetch to the API endpoint to see what models are available
        // since the SDK is abstracting it and failing.

        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        console.log("Available Models via REST API:");
        if (data.models) {
            data.models.forEach(m => {
                console.log(`- ${m.name}`);
                if (m.supportedGenerationMethods) {
                    console.log(`  Supported Config: ${m.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

main();
