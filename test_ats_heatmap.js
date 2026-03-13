require('dotenv').config();
const { analyzeATSHeatmap } = require('./backend/services/aiService');

async function testHeatmap() {
    const resumeData = {
        personalInfo: {
            name: "John Doe",
            title: "Software Engineer",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            location: "San Francisco, CA"
        },
        summary: "I am a software engineer with 5 years of experience in full-stack development. I have a strong background in JavaScript, Node.js, and React.",
        skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "HTML", "CSS"],
        experience: [
            {
                title: "Senior Software Engineer",
                company: "Tech Corp",
                startDate: "2020-01",
                endDate: "Present",
                description: "Led a team of 5 developers to build a new microservices architecture. Improved application performance by 30%."
            },
            {
                title: "Software Engineer",
                company: "Startup Inc",
                startDate: "2018-05",
                endDate: "2019-12",
                description: "Developed and maintained several RESTful APIs using Node.js and Express. Collaborated with the frontend team to integrate APIs with React."
            }
        ],
        education: [
            {
                degree: "Bachelor of Science in Computer Science",
                school: "University of Technology",
                startDate: "2014-08",
                endDate: "2018-05"
            }
        ]
    };

    console.log("Analyzing resume...");
    try {
        const result = await analyzeATSHeatmap(resumeData);
        console.log("Analysis Result:");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Analysis Failed:", error);
    }
}

testHeatmap();
