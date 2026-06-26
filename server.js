const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env'), override: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Database Connection
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB Connected'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
} else {
    console.warn('⚠️ MONGO_URI is not set - MongoDB connection skipped.');
}

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, '/')));

// API Root
app.get('/api', (req, res) => {
    res.json({
        msg: 'Path2Profession Backend is Running!',
        version: '1.1.0-ATS-UPLOAD'
    });
});

// Import Routes
const authRoutes = require('./backend/routes/auth');
const resumeRoutes = require('./backend/routes/resume');
const chatRoutes = require('./backend/routes/chat');
const jobsRoutes = require('./backend/routes/jobs');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/jobs', jobsRoutes);

// Fallback for SPA (Serve index.html for any other route)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server First (only if not running in Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);

        // Connect to Database after server starts to avoid blocking
        console.log('⏳ Connecting to MongoDB...');
        mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
            .then(() => console.log('✅ MongoDB Connected'))
            .catch(err => console.error('❌ MongoDB Connection Error:', err));
    });
} else {
    // For Vercel Serverless
    if (process.env.MONGO_URI) {
        console.log('⏳ Connecting to MongoDB (Vercel)...');
        mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
            .then(() => console.log('✅ MongoDB Connected (Vercel)'))
            .catch(err => console.error('❌ MongoDB Connection Error (Vercel):', err));
    } else {
        console.warn('⚠️ MONGO_URI is not set (Vercel) - MongoDB connection skipped.');
    }
}

// Export for Vercel
module.exports = app;
