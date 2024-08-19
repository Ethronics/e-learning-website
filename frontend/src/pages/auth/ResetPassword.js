import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post(`/api/reset-password/${token}`, { password });
      setMessage(data.message);
      setError('');
      setTimeout(() => {
        navigate.push('/login');
      }, 2000);
    } catch (err) {
      setError('Failed to reset password');
      setMessage('');
    }
  };

  return (
    <div>
        <Navigation />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">New Password</label>
            <input
              type="password"
              className="form-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="form-input w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-blue w-full">Reset Password</button>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ResetPassword;
