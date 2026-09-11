function createAuthConfig(env = process.env) {
    const secret = env.JWT_SECRET;
    if (typeof secret !== 'string' || secret.trim().length < 32 ||
        /change.?me|replace.?me|secret|generate|placeholder|example|password|<|>/i.test(secret) ||
        new Set(secret).size < 8) {
        throw new Error('JWT_SECRET must be a strong random secret of at least 32 characters, not a placeholder');
    }

    const sameSite = (env.COOKIE_SAME_SITE ?? 'lax').trim().toLowerCase();
    if (!['lax', 'strict', 'none'].includes(sameSite)) {
        throw new Error('COOKIE_SAME_SITE must be lax, strict, or none');
    }
    const lifetimeSeconds = 24 * 60 * 60;
    const cookie = Object.freeze({
        httpOnly: true,
        secure: env.NODE_ENV === 'production' || sameSite === 'none',
        sameSite,
        path: '/'
    });

    return Object.freeze({
        secret,
        cookieName: 'token',
        lifetimeSeconds,
        issuer: 'prepai-api',
        audience: 'prepai-web',
        algorithm: 'HS256',
        cookie,
        cookieMaxAge: lifetimeSeconds * 1000
    });
}

let config;
function getAuthConfig() {
    config ??= createAuthConfig();
    return config;
}

function getCookieOptions() {
    const auth = getAuthConfig();
    return { ...auth.cookie, maxAge: auth.cookieMaxAge };
}

function getClearCookieOptions() {
    return { ...getAuthConfig().cookie };
}

module.exports = { createAuthConfig, getAuthConfig, getCookieOptions, getClearCookieOptions };
