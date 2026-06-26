// Using global fetch (Node v24)

async function testHttpResumeGen() {
    console.log("Testing HTTP POST http://localhost:5000/api/resume/generate...");

    // We need a token. Let's assume we can't easily get one without login.
    // However, I can temporarily disable auth on the /generate route for this test, 
    // or use a mock token if the auth middleware allows it.

    // For now, let's check if the server is reachable and what it returns without a token.
    try {
        const response = await fetch('http://localhost:5000/api/resume/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobRole: "Developer",
                experience: "Mid Level",
                skills: "React",
                education: "B.Tech",
                bio_data: ""
            })
        });

        const data = await response.json();
        console.log("HTTP Response Status:", response.status);
        console.log("HTTP Response Body:", data);

        if (response.status === 401) {
            console.log("Expected: 401 Unauthorized (No token provided)");
        }
    } catch (error) {
        console.error("HTTP Request Failed:", error.message);
    }
}

testHttpResumeGen();
