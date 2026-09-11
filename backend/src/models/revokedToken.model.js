const mongoose = require('mongoose');

const revokedTokenSchema = new mongoose.Schema({
    jti: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
});
revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// A new collection avoids the legacy blacklist's unique raw-token index.
module.exports = mongoose.model('RevokedToken', revokedTokenSchema, 'revoked_tokens');
