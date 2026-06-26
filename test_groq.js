const Groq = require('groq-sdk');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env'), override: true });

async function testGroq() {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        const groq = new Groq({ apiKey });

        console.log("Fetching available models...");
        const models = await groq.models.list();
        
        console.log("=== Available Models ===");
        models.data.forEach(m => console.log(m.id));
        console.log("========================");
    } catch (e) {
        console.error("❌ Groq Test Failed:", e.message);
    }
}

testGroq();
