import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../features/auth/auth.api';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((response) => {
        if (active) {
          setUser(response.user);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    setUser(response.user);

    return response;
  };

  const register = async (userData) => {
    const response = await registerUser(userData);

    setUser(response.user);

    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser: loadUser,
    }),
    [user, loading, loadUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

