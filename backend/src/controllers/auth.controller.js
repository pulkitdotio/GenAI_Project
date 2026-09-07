const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

const COOKIE_NAME = 'token';

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
    };
}

function getClearCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/'
    };
}

function createToken(userId) {
    return jwt.sign(
        {
            id: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );
}

function sanitizeUser(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

async function registerUser(req, res) {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

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

    const token = createToken(newUser._id.toString());

    res.cookie(
        COOKIE_NAME,
        token,
        getCookieOptions()
    );

    return res.status(201).json({
        message: 'User registered successfully',
        user: sanitizeUser(newUser)
    });
}

async function loginUser(req, res) {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    const user = await userModel.findOne({ email });

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

    const token = createToken(user._id.toString());

    res.cookie(
        COOKIE_NAME,
        token,
        getCookieOptions()
    );

    return res.status(200).json({
        message: 'Login successful',
        user: sanitizeUser(user)
    });
}

async function logoutUser(req, res) {
    const token = req.cookies?.[COOKIE_NAME];

    if (token) {
        try {
            await blacklistModel.create({
                token
            });
        } catch (error) {
            // Ignore duplicate token errors during repeated logout requests.
            if (error.code !== 11000) {
                throw error;
            }
        }
    }

    res.clearCookie(
        COOKIE_NAME,
        getClearCookieOptions()
    );

    return res.status(200).json({
        message: 'Logout successful'
    });
}

async function getMeController(req, res) {
    const user = await userModel
        .findById(req.user.id)
        .select('_id username email');

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    return res.status(200).json({
        message: 'User fetched successfully',
        user: sanitizeUser(user)
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMeController
};