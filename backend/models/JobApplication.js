const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['wishlist', 'applied', 'interview', 'offer', 'rejected'],
        default: 'applied'
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: String
    },
    location: {
        type: String
    },
    jobDescription: {
        type: String
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
