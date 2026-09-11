const DEFAULT_DESTINATION = '/dashboard';

// Router state is input, not a trusted URL. Keep navigation on this origin.
export function getAuthDestination(from) {
  if (typeof from !== 'string' || !from.startsWith('/') ||
      from.startsWith('//') || /[\\\s]/u.test(from)) {
    return DEFAULT_DESTINATION;
  }

  try {
    const url = new URL(from, 'https://prepai.internal');
    if (url.origin !== 'https://prepai.internal' || url.pathname.startsWith('//') ||
        /^\/(login|register)\/*$/i.test(url.pathname)) {
      return DEFAULT_DESTINATION;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_DESTINATION;
  }
}

export function getAuthState(from) {
  return { from: getAuthDestination(from) };
}
