const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, NOT_FOUND } = require('../constants/httpStatus');
const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.error('No token provided');
        return res.status(UNAUTHORIZED).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            console.error('User not found');
            return res.status(NOT_FOUND).send('User not found');
        }

        // Attach the user to the request
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(UNAUTHORIZED).send('Invalid token');
    }
};
