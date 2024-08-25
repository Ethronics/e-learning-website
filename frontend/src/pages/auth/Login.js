import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navigation from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ emailOrUsername, password });
      if (user.role === 'student') {
        navigate.push('/student-dashboard');
      } else if (user.role === 'instructor') {
        navigate.push('/instructor-dashboard');
      } else if (user.role === 'admin') {
        navigate.push('/admin-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  

  return (
    <div>
    <Navigation />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <img src="src/assets/ethlogo-1-137x137.png" alt="Logo" />
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email or Username</label>
            <input
              type="text"
              className="form-input w-full"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            //   required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="form-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            //   required
            />
          </div>
          <button type="submit" className="btn btn-blue w-full">Login</button>
        </form>
        <div className="mt-6 text-center">
          <a href="/forgot-password" className="text-blue-600">Forgot password?</a>
        </div>
        <div className="mt-6 text-center">
          <p>Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Login;
