import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLogs = ({ userId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch the user.json file from the public directory
    axios.get('/user.json')
      .then(response => {
        const user = response.data.users.find(user => user.id === userId);
        if (user) {
          setLogs(user.activityHistory);
        } else {
          console.error('User not found');
        }
      })
      .catch(error => console.error('Error fetching activity logs:', error));
  }, [userId]);

  return (
    <div className="widget p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Activity Logs</h2>
      <ul>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))
        ) : (
          <li>No activity logs found for this user.</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityLogs;
