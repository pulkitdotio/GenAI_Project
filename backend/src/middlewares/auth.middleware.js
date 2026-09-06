const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        const isBlacklisted = await blacklistModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: 'Token is invalid'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        console.error('Authentication middleware error:', error);

        return res.status(500).json({
            message: 'Authentication failed'
        });
    }
}

module.exports = authUser;