const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const revokedTokenModel = require('../models/revokedToken.model');
const { getAuthConfig, getCookieOptions, getClearCookieOptions } = require('../config/auth');
const { createToken, verifyToken, isInvalidToken } = require('../utils/token');

function issueSession(res, user) {
    const token = createToken(user._id.toString());
    const session = verifyToken(token);
    res.cookie(getAuthConfig().cookieName, token, getCookieOptions());
    return session.expiresAt.toISOString();
}

function sanitizeUser(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

async function registerUser(req, res) {
    const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Username, email and password are required'
        });
    }

    if (username.length < 3) {
        return res.status(400).json({
            message: 'Username must be at least 3 characters'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters'
        });
    }

    const existingUser = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (existingUser) {
        if (existingUser.email === email) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        return res.status(409).json({
            message: 'Username is already taken'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const sessionExpiresAt = issueSession(res, newUser);

    return res.status(201).json({
        message: 'User registered successfully',
        user: sanitizeUser(newUser),
        sessionExpiresAt
    });
}

async function loginUser(req, res) {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const sessionExpiresAt = issueSession(res, user);

    return res.status(200).json({
        message: 'Login successful',
        user: sanitizeUser(user),
        sessionExpiresAt
    });
}

async function logoutUser(req, res) {
    const token = req.cookies?.[getAuthConfig().cookieName];
    res.clearCookie(getAuthConfig().cookieName, getClearCookieOptions());

    if (token) {
        try {
            const session = verifyToken(token);
            await revokedTokenModel.updateOne(
                { jti: session.sessionId },
                { $setOnInsert: { jti: session.sessionId, expiresAt: session.expiresAt } },
                { upsert: true }
            );
        } catch (error) {
            // Concurrent upserts and already-invalid cookies are safe repeat logouts.
            if (!isInvalidToken(error) && error.code !== 11000) {
                console.error('Logout revocation storage failed');
                return res.status(503).json({ message: 'Unable to revoke session. Local cookie cleared.' });
            }
        }
    }

    return res.status(200).json({
        message: 'Logout successful'
    });
}

async function getMeController(req, res) {
    const user = await userModel
        .findById(req.user.id)
        .select('_id username email');

    if (!user) {
        res.clearCookie(getAuthConfig().cookieName, getClearCookieOptions());
        return res.status(401).json({
            message: 'Authentication required'
        });
    }

    return res.status(200).json({
        message: 'User fetched successfully',
        user: sanitizeUser(user),
        sessionExpiresAt: req.user.expiresAt.toISOString()
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMeController
};
