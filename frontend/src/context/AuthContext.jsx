import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('petcure_token');
      const savedUser = localStorage.getItem('petcure_user');
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('petcure_token');
          localStorage.removeItem('petcure_user');
        }
      }
      setLoading(false);
    };

    // Small delay to make the loading transition feel intentional and smooth
    const timer = setTimeout(checkAuth, 600);
    return () => clearTimeout(timer);
  }, []);

  const login = (userData) => {
    localStorage.setItem('petcure_token', userData.token);
    localStorage.setItem('petcure_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('petcure_token');
    localStorage.removeItem('petcure_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
