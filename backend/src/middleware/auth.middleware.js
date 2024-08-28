const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/httpStatus');

module.exports = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        console.error('No token provided');
        return res.status(UNAUTHORIZED).send('No token provided');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(UNAUTHORIZED).send('Invalid token');
    }
};
