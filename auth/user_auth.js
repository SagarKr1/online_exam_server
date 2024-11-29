const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    try {
        // Check if authorization header exists and starts with "Bearer"
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                res.status(401);
                throw new Error('Not authorized, token missing');
            }

            // Verify token
            const secret = "#hckbjagskj@hasg";
            const decoded = jwt.verify(token, secret);

            // Attach decoded information to request object (optional)
            req.user = decoded;

            // Proceed to next middleware
            return next();
        }

        // If authorization header is missing
        res.status(401);
        throw new Error('Not authorized, no token provided');
    } catch (error) {
        console.error(error.message);
        res.status(401);
        throw new Error('Not authorized, token invalid or expired');
    }
});

module.exports = authMiddleware;
