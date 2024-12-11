import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PermissionsReview = () => {
  const [permissions, setPermissions] = useState({
    role: '',
    curriculumPermissions: [],
    accessHistory: []
  });

  useEffect(() => {
    // Fetch the permissions data from API
    axios.get('/api.json')
      .then(response => setPermissions(response.data.permissions))
      .catch(error => console.error('Error fetching permissions data:', error));
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Permissions Review</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Role Information</h3>
        <p>{permissions.role}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Curriculum-Specific Permissions</h3>
        <ul>
          {permissions.curriculumPermissions.map((permission, index) => (
            <li key={index} className="border-b py-2">
              {permission.curriculum}: {permission.accessLevel}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Access History</h3>
        <ul>
          {permissions.accessHistory.map((history, index) => (
            <li key={index} className="border-b py-2">
              {history.date}: {history.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PermissionsReview;
