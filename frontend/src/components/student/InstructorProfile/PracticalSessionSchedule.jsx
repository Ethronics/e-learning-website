import React from 'react';

const PracticalSessionSchedule = ({ sessions }) => {
  return (
    <div className="practical-session-schedule">
      <h3 className="text-xl font-bold">Upcoming Practical Sessions</h3>
      <div className="sessions">
        {sessions.map(session => (
          <div key={session.id} className="session bg-white p-4 rounded-lg shadow-md mb-4">
            <p><strong>Date:</strong> {session.date}</p>
            <p><strong>Topic:</strong> {session.topic}</p>
            <p><strong>Description:</strong> {session.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticalSessionSchedule;
