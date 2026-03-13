const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel() {
    try {
        console.log("Testing gemini-flash-latest...");
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Say hello in JSON format: { 'message': 'hello' }");
        const response = await result.response;
        console.log("Response Text:", response.text());
        console.log("SUCCESS");
    } catch (error) {
        console.error("FAILURE:", error.message);
        if (error.response) {
            console.error("Response data:", await error.response.json());
        }
    }
}

testModel();
