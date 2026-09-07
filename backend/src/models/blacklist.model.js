const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

// Automatically remove blacklisted tokens after 24 hours.
blacklistSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 24 * 60 * 60 }
);

const blacklistModel = mongoose.model(
    'blacklist',
    blacklistSchema
);

module.exports = blacklistModel;