const app = require('../server.js');

module.exports = (req, res) => {
    // Vercel's Edge network automatically strips the "/api" prefix from the URL 
    // when routing to the api/ directory.
    // We add it back here so that your existing Express routes (e.g., app.use('/api/auth'))
    // will still match correctly without needing to rewrite all your backend code!
    if (!req.url.startsWith('/api')) {
        req.url = '/api' + req.url;
    }
    
    return app(req, res);
};
