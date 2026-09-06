const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true
    })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(cookieParser());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API is running'
    });
});

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error(error);

    if (error.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'CORS policy blocked this request'
        });
    }

    if (error.name === 'MulterError') {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'Resume file must be smaller than 3MB'
            });
        }

        return res.status(400).json({
            message: error.message
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(error.errors).map((err) => err.message)
        });
    }

    if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern || {})[0];

        return res.status(409).json({
            message: `${duplicateField || 'Field'} already exists`
        });
    }

    return res.status(500).json({
        message: 'Internal server error'
    });
});

module.exports = app;