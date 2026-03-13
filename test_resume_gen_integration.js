const { generateResumeContent } = require('./backend/services/aiService');
require('dotenv').config();

async function testResumeGen() {
    console.log("Testing generateResumeContent with working model...");
    const mockInput = {
        name: "Dr. Arvind Kumar",
        email: "arvind.med@example.com",
        phone: "+91 9845012345",
        location: "Coimbatore, India",
        category: "Doctor / Healthcare Professional",
        jobRole: "Senior Pediatrician",
        experience: "Senior Level (5+ years)",
        skills: "Patient diagnosis, Emergency care, Medical procedures, Neonatal care",
        education: "MBBS, MD in Pediatrics",
        workHistory: "Senior Pediatrician at Apollo Hospitals - Handled emergency cases and specialized in neonatal care; 10 years experience",
        projects: "Lead a research project on childhood nutrition; Published 3 papers in medical journals",
        certifications: "Registered with Tamil Nadu Medical Council, PALS Certified",
        bio_data: "Compassionate pediatrician with a decade of clinical experience in high-volume hospital settings."
    };

    try {
        const result = await generateResumeContent(mockInput);
        console.log("SUCCESS! Generated Content Preview:");
        console.log("Template:", result.suggestedTemplate);
        console.log("Summary:", result.personalInfo.summary);
        console.log("Experience Count:", result.experience.length);
        console.log("Full Result keys:", Object.keys(result));
    } catch (error) {
        console.error("FAILURE:", error.message);
    }
}

testResumeGen();
