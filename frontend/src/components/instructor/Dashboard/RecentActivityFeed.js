import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('/inst1.json')
      .then(response => {
        setActivities(response.data.activities);
      })
      .catch(error => {
        console.error("There was an error fetching the recent activities!", error);
      });
  }, []);

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4">Recent Activity</h4>
      <ul className="list-group">
        {activities.map((activity, index) => (
          <li key={index} className="list-group-item">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
