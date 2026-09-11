const { randomUUID } = require('node:crypto');
const jwt = require('jsonwebtoken');
const { getAuthConfig } = require('../config/auth');

function createToken(userId, auth = getAuthConfig()) {
    return jwt.sign({}, auth.secret, {
        subject: userId,
        jwtid: randomUUID(),
        expiresIn: auth.lifetimeSeconds,
        issuer: auth.issuer,
        audience: auth.audience,
        algorithm: auth.algorithm
    });
}

function verifyToken(token, auth = getAuthConfig()) {
    const claims = jwt.verify(token, auth.secret, {
        algorithms: [auth.algorithm],
        issuer: auth.issuer,
        audience: auth.audience
    });
    if (typeof claims !== 'object' || !/^[a-f\d]{24}$/i.test(claims.sub || '') ||
        typeof claims.sub !== 'string' || typeof claims.jti !== 'string' ||
        !/^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(claims.jti) ||
        !Number.isSafeInteger(claims.exp) || !Number.isSafeInteger(claims.iat) ||
        claims.exp <= claims.iat) {
        throw new jwt.JsonWebTokenError('Invalid session claims');
    }
    return { id: claims.sub, sessionId: claims.jti, expiresAt: new Date(claims.exp * 1000) };
}

function isInvalidToken(error) {
    return error instanceof jwt.JsonWebTokenError;
}

module.exports = { createToken, verifyToken, isInvalidToken };
