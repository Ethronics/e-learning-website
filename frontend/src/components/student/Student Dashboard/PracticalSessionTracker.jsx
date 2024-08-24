import React from "react";

const PracticalSessionTracker = ({ sessions }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Practical Session Tracker</h2>
      {sessions.map((session) => (
        <div key={session.id} className="mb-4">
          <h3 className="font-semibold">{session.title}</h3>
          <p>Date: {session.date}</p>
          <p>Status: {session.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PracticalSessionTracker;
