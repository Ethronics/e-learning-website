import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch activity log from local api.json
    axios.get('/sdas.json')
      .then(response => setActivityLog(response.data.activityLog))
      .catch(error => console.error("Error fetching activity log:", error));
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activityLog.length > 0 ? (
          <ul>
            {activityLog.map((activity, index) => (
              <li key={index} className="mb-4">
                <p className="text-gray-700">{activity.date}: {activity.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities recorded.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
