import React, { useState } from 'react';
import Navigation from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/forgot-password', { email });
      setMessage(data.message);
      setError('');
    } catch (err) {
      setError('Failed to send reset link');
      setMessage('');
    }
  };

  return (
    <div>
    <Navigation />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="form-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-blue w-full">Send Reset Link</button>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ForgotPassword;
