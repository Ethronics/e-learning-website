import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDirectory = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    axios.get('/user.json')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole ? user.role === filterRole : true) &&
      (filterStatus ? user.status === filterStatus : true)
    );
  });

  return (
    <div className="widget p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">User Directory</h2>
      
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="select select-bordered w-full md:w-1/6"
        >
          <option value="">Role</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered w-full md:w-1/6"
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Profile</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={`/images/${user.id}.png`} // Assuming profile images are named by userId
                    alt={`${user.name}'s Profile`}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium text-lg">{user.name}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="text-sm text-gray-600">{user.role}</div>
                </td>
                <td className="px-4 py-2">
                  <div className={`text-sm font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDirectory;
