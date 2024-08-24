import React from "react";

const RecentActivity = ({ activities }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      {activities.map((activity) => (
        <div key={activity.id} className="mb-4">
          <p>{activity.activity}</p>
          <small className="text-gray-500">{activity.date}</small>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
