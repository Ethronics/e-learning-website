import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate.push('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-red">Logout</button>
  );
};

export default Logout;
