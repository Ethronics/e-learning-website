import React, { useState } from 'react';

const PracticalSessionScheduler = () => {
  const [sessionDetails, setSessionDetails] = useState({
    date: '',
    time: '',
    lab: '',
    studentLimit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionDetails({ ...sessionDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Handle scheduling logic and admin approval process
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4">Schedule Practical Session</h4>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label>Lab</label>
          <select
            name="lab"
            className="form-control"
            value={sessionDetails.lab}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Lab</option>
            <option value="Lab 1">Lab 1</option>
            <option value="Lab 2">Lab 2</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Student Limit</label>
          <input
            type="number"
            name="studentLimit"
            className="form-control"
            value={sessionDetails.studentLimit}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit for Approval</button>
      </form>
    </div>
  );
};

export default PracticalSessionScheduler;
