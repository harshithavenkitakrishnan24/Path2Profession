const { parseResumeFromText } = require('./backend/services/aiService');
require('dotenv').config();

async function testParsing() {
    const mockRawText = `
    RUDRA PRASAD
    Chennai, Tamil Nadu
    Email: rudra@example.com | Phone: +91 9876543210
    LinkedIn: linkedin.com/in/rudra
    
    PROFESSIONAL SUMMARY
    Dedicated Full Stack Developer with 3 years of experience in building scalable web applications using React, Node.js, and MongoDB. Proven track record of optimizing performance and enhancing user experience.
    
    EXPERIENCE
    Senior Developer | TechCorp, Bangalore | Jan 2022 - Present
    - Led a team of 5 developers to build a new e-commerce platform.
    - Reduced API response time by 40% through caching and DB optimization.
    - Implemented secure authentication using JWT and OAuth.
    
    Junior Developer | WebSoft, Chennai | June 2020 - Dec 2021
    - Developed and maintained 10+ client websites using HTML, CSS, and JavaScript.
    - Collaborated with designers to implement responsive UI components.
    
    EDUCATION
    B.E. Computer Science | Anna University | 2016 - 2020
    GPA: 8.5/10
    
    SKILLS
    Languages: JavaScript, Python, Java
    Frameworks: React, Node.js, Express, Tailwind CSS
    Databases: MongoDB, PostgreSQL, Redis
    Tools: Git, Docker, AWS, Jenkins
    
    PROJECTS
    Portfolio Website: Built a personal portfolio using Next.js and Framer Motion.
    Task Manager App: Created a real-time task management tool with Socket.io.
    `;

    try {
        console.log("Testing AI Parsing...");
        const result = await parseResumeFromText(mockRawText);
        console.log("Parsed Result:", JSON.stringify(result, null, 2));

        if (result.personalInfo.name === 'RUDRA PRASAD' && result.skills.includes('React')) {
            console.log("\n✅ AI Parsing Test Passed!");
        } else {
            console.log("\n❌ AI Parsing Test Failed: Unexpected data structure or missing values.");
        }
    } catch (error) {
        console.error("❌ Test Error:", error);
    }
}

testParsing();
