
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(); // This exports AuthContext

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from local storage if available
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Log in user
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  // Log out user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Register user
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/register', userData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loadUserFromStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
