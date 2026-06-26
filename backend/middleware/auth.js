const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied', expired: true });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Auth Error:', err.name, err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Session expired. Please login again.', expired: true });
        }
        res.status(401).json({ msg: 'Token is not valid. Please login again.', expired: true });
    }
};
