import React from 'react';
import axios from 'axios';

const AccountStatusControls = ({ userId, currentStatus }) => {
  const updateStatus = (status) => {
    axios.post(`/api/users/${userId}/status`, { status })
      .then(response => alert('Account status updated successfully'))
      .catch(error => console.error('Error updating account status:', error));
  };

  const deleteUser = () => {
    axios.delete(`/api/users/${userId}`)
      .then(response => alert('Account deleted successfully'))
      .catch(error => console.error('Error deleting account:', error));
  };

  return (
    <div className="widget p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Account Status Controls</h2>
      <button onClick={() => updateStatus('Active')} className="btn btn-success mr-2">
        Activate
      </button>
      <button onClick={() => updateStatus('Inactive')} className="btn btn-warning mr-2">
        Deactivate
      </button>
      <button onClick={deleteUser} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default AccountStatusControls;
