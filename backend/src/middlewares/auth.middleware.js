const revokedTokenModel = require('../models/revokedToken.model');
const { getAuthConfig, getClearCookieOptions } = require('../config/auth');
const { verifyToken, isInvalidToken } = require('../utils/token');

async function authUser(req, res, next) {
    const unauthorized = () => {
        res.clearCookie(getAuthConfig().cookieName, getClearCookieOptions());
        return res.status(401).json({ message: 'Authentication required' });
    };
    try {
        const token = req.cookies?.[getAuthConfig().cookieName];

        if (!token) {
            return unauthorized();
        }

        const session = verifyToken(token);
        const isBlacklisted = await revokedTokenModel.exists({ jti: session.sessionId });

        if (isBlacklisted) {
            return unauthorized();
        }

        req.user = session;

        next();
    } catch (error) {
        if (isInvalidToken(error)) return unauthorized();
        console.error('Authentication revocation check failed');
        return res.status(503).json({
            message: 'Authentication temporarily unavailable'
        });
    }
}

module.exports = authUser;
