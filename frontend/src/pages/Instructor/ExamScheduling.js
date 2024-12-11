// ExamScheduling.js
import React, { useState } from 'react';

const ExamScheduling = () => {
  const [examId, setExamId] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSchedule = async (event) => {
    event.preventDefault();
    // Logic to schedule the exam
    // You can POST the data to your server here
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Schedule Exam</h2>
      <form onSubmit={handleSchedule}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Select Exam</label>
          <input
            type="text"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Schedule Date</label>
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Notifications</label>
          <textarea
            value={notifications.join('\n')}
            onChange={(e) => setNotifications(e.target.value.split('\n'))}
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Schedule Exam
        </button>
      </form>
    </div>
  );
};

export default ExamScheduling;
