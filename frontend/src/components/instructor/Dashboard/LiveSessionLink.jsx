import React, { useState } from 'react';
import axios from 'axios';

const LiveSessionLink = ({ permissions }) => {
  const [sessionDetails, setSessionDetails] = useState({
    sessionTitle: '',
    sessionDate: '',
    sessionLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/schedule-live-session', sessionDetails)
      .then(response => {
        alert('Live session scheduled successfully');
      })
      .catch(error => console.error('Error scheduling live session:', error));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Schedule Live Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Session Title</label>
          <input
            type="text"
            name="sessionTitle"
            value={sessionDetails.sessionTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Session Date</label>
          <input
            type="datetime-local"
            name="sessionDate"
            value={sessionDetails.sessionDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Session Link</label>
          <input
            type="text"
            name="sessionLink"
            value={sessionDetails.sessionLink}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter video conferencing link"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Schedule Session</button>
      </form>
    </div>
  );
};

export default LiveSessionLink;
