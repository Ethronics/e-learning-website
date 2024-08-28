import React, { useState } from 'react';
import axios from 'axios';

const RoleManagement = ({ userId, currentRole }) => {
  const [newRole, setNewRole] = useState(currentRole);

  const handleRoleChange = () => {
    axios.post(`/api/users/${userId}/role`, { role: newRole })
      .then(response => alert('Role updated successfully'))
      .catch(error => console.error('Error updating role:', error));
  };

  return (
    <div className="widget p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Role Management</h2>
      <select
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        className="select select-bordered w-full mb-4"
      >
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRoleChange} className="btn btn-primary">
        Update Role
      </button>
    </div>
  );
};

export default RoleManagement;
