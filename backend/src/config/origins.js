function parseAllowedOrigins(env = process.env) {
    const configured = env.CLIENT_URLS || env.CLIENT_URL;
    if (!configured?.trim()) {
        throw new Error('Configure CLIENT_URLS or CLIENT_URL with trusted frontend origins');
    }
    return Object.freeze([...new Set(configured.split(',').map((value) => {
        try {
            const url = new URL(value.trim());
            if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
                url.pathname !== '/' || url.search || url.hash ||
                (env.NODE_ENV === 'production' && url.protocol !== 'https:')) {
                throw new Error();
            }
            return url.origin;
        } catch {
            throw new Error('CLIENT_URLS/CLIENT_URL must contain only HTTP(S) origins (HTTPS in production), without paths or credentials');
        }
    }))]);
}

let origins;
function getAllowedOrigins() {
    origins ??= parseAllowedOrigins();
    return origins;
}

module.exports = { parseAllowedOrigins, getAllowedOrigins };
