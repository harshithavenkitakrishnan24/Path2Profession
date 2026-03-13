const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');
const { generateResumeContent, parseResumeFromText, generateSelfIntro, generateLinkedInOptimization, generateColdEmailTemplates, analyzeATSHeatmap } = require('../services/aiService');

const { extractTextFromPDF, extractTextFromDocx } = require('../services/parserService');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   GET api/resume
// @desc    Get all resumes for the current user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ lastModified: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/resume/:id
// @desc    Get specific resume by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/resume/generate
// @desc    Generate resume content using AI
// @access  Private
router.post('/generate', auth, async (req, res) => {
    try {
        const {
            name, email, phone, location, linkedin, github, portfolio,
            category, jobRole, experience, skills, bio_data, education,
            workHistory, projects, certifications, jobDescription
        } = req.body;

        // Basic validation
        if (!jobRole || !experience || !skills) {
            return res.status(400).json({ msg: 'Please provide Job Role, Experience, and Skills' });
        }

        const generatedData = await generateResumeContent({
            name, email, phone, location, linkedin, github, portfolio,
            category, jobRole, experience, skills, bio_data, education,
            workHistory, projects, certifications, jobDescription
        });
        res.json(generatedData);

    } catch (err) {
        console.error(err.message);
        // Ensure error is returned as JSON
        res.status(500).json({ msg: 'Server Error: AG_DEBUG_FIX_ACTIVE: ' + err.message });
    }
});

// @route   POST api/resume/upload
// @desc    Upload an existing resume and convert to ATS friendly JSON
// @access  Private
router.post('/upload', [auth, upload.single('resume')], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload a file' });
        }

        const fileName = req.file.originalname;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        let extractedText = '';

        console.log(`Processing file: ${fileName}, Type: ${fileExtension}`);

        if (fileExtension === 'pdf') {
            extractedText = await extractTextFromPDF(req.file.buffer);
        } else if (fileExtension === 'docx' || fileExtension === 'doc') {
            extractedText = await extractTextFromDocx(req.file.buffer);
        } else {
            return res.status(400).json({ msg: 'Unsupported file format. Please upload PDF or DOCX' });
        }

        if (!extractedText || extractedText.trim().length < 50) {
            return res.status(400).json({ msg: 'Could not extract enough text from the file' });
        }

        console.log("Extracting content using AI...");
        const parsedData = await parseResumeFromText(extractedText);
        res.json(parsedData);

    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ msg: 'Server Error during upload: ' + err.message });
    }
});

// @route   POST api/resume
// @desc    Save or Update resume
// @access  Private
router.post('/', auth, async (req, res) => {
    const { id, title, templateId, data } = req.body;

    try {
        if (id) {
            // Update existing
            let resume = await Resume.findOne({ _id: id, user: req.user.id });
            if (!resume) {
                return res.status(404).json({ msg: 'Resume not found' });
            }

            resume.title = title || resume.title;
            resume.templateId = templateId || resume.templateId;
            resume.data = data;
            resume.lastModified = Date.now();
            await resume.save();
            return res.json(resume);
        }

        // Create new
        const resume = new Resume({
            user: req.user.id,
            title: title || 'My Resume',
            templateId: templateId || 'modern',
            data
        });

        await resume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/resume/:id
// @desc    Delete a resume
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        await resume.deleteOne();
        res.json({ msg: 'Resume removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/resume/self-intro
// @desc    Generate a self-introduction script based on resume data
// @access  Private
router.post('/self-intro', auth, async (req, res) => {
    try {
        const { resumeData } = req.body;
        if (!resumeData) {
            return res.status(400).json({ msg: 'No resume data provided' });
        }

        const intro = await generateSelfIntro(resumeData);
        res.json(intro);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
});

// @route   POST api/resume/linkedin-optimization
// @desc    Generate LinkedIn About & Experience optimization
// @access  Private
router.post('/linkedin-optimization', auth, async (req, res) => {
    try {
        const { resumeData } = req.body;
        if (!resumeData) {
            return res.status(400).json({ msg: 'No resume data provided' });
        }

        const optimization = await generateLinkedInOptimization(resumeData);
        res.json(optimization);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
});

// @route   POST api/resume/cold-email
// @desc    Generate Cold Email Templates based on resume data
// @access  Private
router.post('/cold-email', auth, async (req, res) => {
    try {
        const { resumeData } = req.body;
        if (!resumeData) {
            return res.status(400).json({ msg: 'No resume data provided' });
        }

        const templates = await generateColdEmailTemplates(resumeData);
        res.json(templates);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
});

// @route   POST api/resume/ats-heatmap
// @desc    Generate ATS Heatmap Analysis based on resume data
// @access  Private
router.post('/ats-heatmap', auth, async (req, res) => {
    try {
        const { resumeData } = req.body;
        if (!resumeData) {
            return res.status(400).json({ msg: 'No resume data provided' });
        }

        const analysis = await analyzeATSHeatmap(resumeData);
        res.json(analysis);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
});

module.exports = router;
