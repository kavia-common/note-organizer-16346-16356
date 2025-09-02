import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, me as apiMe } from '../services/api';
import { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication context. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides auth state (token, user) and actions (login, logout).
   * Persists token in localStorage.
   */
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthToken(token || null);
    if (token) {
      apiMe()
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken('');
          localStorage.removeItem('token');
          setAuthToken(null);
        })
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [token]);

  const value = useMemo(() => ({
    token,
    user,
    ready,
    async login(username, password) {
      const data = await apiLogin(username, password);
      const t = data?.access_token;
      if (t) {
        setToken(t);
        localStorage.setItem('token', t);
        setAuthToken(t);
        const profile = await apiMe();
        setUser(profile);
      }
      return data;
    },
    logout() {
      setToken('');
      setUser(null);
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  }), [token, user, ready]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
