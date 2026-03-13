require('dotenv').config();

console.log('Checking Environment Variables...');
console.log('Current Directory:', process.cwd());
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);

if (process.env.GEMINI_API_KEY) {
    const key = process.env.GEMINI_API_KEY;
    console.log('GEMINI_API_KEY length:', key.length);
    console.log('GEMINI_API_KEY start:', key.substring(0, 5));
    console.log('GEMINI_API_KEY end:', key.substring(key.length - 5));
} else {
    console.log('GEMINI_API_KEY is MISSING or UNDEFINED');
}
