require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Database Connection
// Connection will happen after app.listen to avoid blocking during startup

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

// Start Server First
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
