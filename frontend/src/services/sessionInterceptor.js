// Clear React auth state only for protected API failures, never navigate from Axios.
export function installSessionInterceptor(client, { getVersion, onUnauthorized }) {
  const requestId = client.interceptors.request.use((config) => {
    config.sessionVersion = getVersion();
    return config;
  });
  const responseId = client.interceptors.response.use(
    response => response,
    error => {
      const config = error.config;
      const isProtected = /^\/interview(?:\/|$)/.test(config?.url || '');
      if (error.response?.status === 401 && isProtected &&
          config.sessionVersion === getVersion()) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
  return () => {
    client.interceptors.request.eject(requestId);
    client.interceptors.response.eject(responseId);
  };
}
