const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobApplication = require('../models/JobApplication');

// @route   GET api/jobs
// @desc    Get all job applications for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const jobs = await JobApplication.find({ user: req.user.id }).sort({ dateApplied: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/jobs
// @desc    Add new job application
// @access  Private
router.post('/', auth, async (req, res) => {
    const { company, position, status, jobDescription, salary, location, notes } = req.body;

    try {
        const newJob = new JobApplication({
            user: req.user.id,
            company,
            position,
            status,
            jobDescription,
            salary,
            location,
            notes
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/jobs/:id
// @desc    Update job application
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { company, position, status, jobDescription, salary, location, notes } = req.body;

    // Build job object
    const jobFields = {};
    if (company) jobFields.company = company;
    if (position) jobFields.position = position;
    if (status) jobFields.status = status;
    if (jobDescription) jobFields.jobDescription = jobDescription;
    if (salary) jobFields.salary = salary;
    if (location) jobFields.location = location;
    if (notes) jobFields.notes = notes;

    try {
        let job = await JobApplication.findById(req.params.id);

        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // Make sure user owns job
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        job = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { $set: jobFields },
            { new: true }
        );

        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/jobs/:id
// @desc    Delete job application
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let job = await JobApplication.findById(req.params.id);

        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // Make sure user owns job
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await JobApplication.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Job application removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
