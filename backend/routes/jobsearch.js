const express = require('express');
const router = express.Router();
const jobScraper = require('../services/jobScraper');

// Proxy route for Job Search (Now powered by custom scraper)
router.get('/', async (req, res) => {
    try {
        const { keywords, location, page = 1 } = req.query;

        // Fetch jobs using the scraper service
        const jobs = await jobScraper.search(keywords, location);

        // Pagination (Simple local slicing)
        const perPage = 10;
        const startIndex = (parseInt(page) - 1) * perPage;
        const paginatedJobs = jobs.slice(startIndex, startIndex + perPage);

        res.json({
            success: true,
            data: {
                jobs: paginatedJobs,
                totalCount: jobs.length
            }
        });
        
    } catch (error) {
        console.error('Job Scraper Error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch jobs from the scraper',
            error: error.message
        });
    }
});

module.exports = router;
