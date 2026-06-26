const Groq = require('groq-sdk');

console.log("Test 1: undefined");
try {
    const groq = undefined ? new Groq({ apiKey: undefined }) : null;
    console.log("Test 1 passed, groq is", groq);
} catch (e) {
    console.log("Test 1 failed:", e.message);
}

console.log("Test 2: empty string");
try {
    const groq = "" ? new Groq({ apiKey: "" }) : null;
    console.log("Test 2 passed, groq is", groq);
} catch (e) {
    console.log("Test 2 failed:", e.message);
}

console.log("Test 3: space string");
try {
    const groq = " " ? new Groq({ apiKey: " " }) : null;
    console.log("Test 3 passed, groq is", groq);
} catch (e) {
    console.log("Test 3 failed:", e.message);
}

console.log("Test 4: string 'undefined'");
try {
    const groq = "undefined" ? new Groq({ apiKey: "undefined" }) : null;
    console.log("Test 4 passed, groq is", !!groq);
} catch (e) {
    console.log("Test 4 failed:", e.message);
}
