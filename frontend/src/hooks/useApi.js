import { useCallback, useState } from 'react';

export function useApi(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError('');

      try {
        const result = await apiFunction(...args);

        return result;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong';

        setError(message);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return {
    execute,
    loading,
    error,
    setError,
  };
}