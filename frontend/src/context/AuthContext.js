// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('user'));
//     if (loggedInUser) {
//       setUser(loggedInUser);
//     }
//     setLoading(false);
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const { data } = await axios.post('/api/login', credentials);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       return data.user;
//     } catch (error) {
//       throw new Error('Login failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const register = async (userInfo) => {
//     try {
//       const { data } = await axios.post('/api/register', userInfo);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       return data.user;
//     } catch (error) {
//       throw new Error('Registration failed');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
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

export default AuthProvider; // This exports AuthProvider as default
