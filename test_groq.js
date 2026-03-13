const Groq = require('groq-sdk');
require('dotenv').config();

async function testGroq() {
    try {
        console.log("Starting Groq test...");
        console.log("Using API Key:", process.env.GROQ_API_KEY.substring(0, 10) + "...");
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: "Say hello" }
            ],
            model: "llama-3.3-70b-versatile"
        });

        console.log("Response:", completion.choices[0].message.content);
    } catch (e) {
        console.error("Groq Test Failed:", e.message);
    }
}

testGroq();
