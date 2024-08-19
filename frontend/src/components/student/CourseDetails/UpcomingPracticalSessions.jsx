import React from 'react';
import './CourseDetail.css';

const UpcomingSessions = ({ upcomingSessions }) => {
  return (
    <div className="upcoming-sessions mb-4">
      <h2 className="h4 font-weight-bold mb-3">Upcoming Practical Sessions</h2>
      <ul className="list-unstyled">
        {upcomingSessions.map((session, index) => (
          <li key={index} className="mb-3">
            <p><strong>Date:</strong> {session.date}</p>
            <p><strong>Time:</strong> {session.time}</p>
            <p>{session.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSessions;
