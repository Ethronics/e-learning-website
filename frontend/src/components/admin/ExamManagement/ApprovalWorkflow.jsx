// src/components/ApprovalWorkflow.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovalWorkflow = () => {
  const [pendingExams, setPendingExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [comments, setComments] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    inApp: true
  });

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => {
        setPendingExams(response.data.pendingExams);
      })
      .catch(error => {
        console.error('Error fetching pending exams:', error);
      });
  }, []);

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
  };

  const handleApproval = (status) => {
    axios.post('/api/updateExamStatus', {
      id: selectedExam.id,
      status: status,
      comments: comments
    })
      .then(() => {
        setPendingExams(pendingExams.filter(exam => exam.id !== selectedExam.id));
        setSelectedExam(null);
      })
      .catch(error => {
        console.error('Error updating exam status:', error);
      });
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleNotificationSettingChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Approval Workflow</h1>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2">Title</th>
              <th className="border-b px-4 py-2">Instructor</th>
              <th className="border-b px-4 py-2">Submission Date</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingExams.map(exam => (
              <tr key={exam.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleExamClick(exam)}>
                <td className="border-b px-4 py-2">{exam.title}</td>
                <td className="border-b px-4 py-2">{exam.instructor}</td>
                <td className="border-b px-4 py-2">{exam.submissionDate}</td>
                <td className="border-b px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedExam && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Review Exam: {selectedExam.title}</h2>
          <div className="mb-4">
            <h3 className="font-medium">Exam Content</h3>
            <p className="border p-4 rounded bg-gray-50">{selectedExam.content}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="comments" className="block font-medium mb-1">Comments</label>
            <textarea
              id="comments"
              value={comments}
              onChange={handleCommentsChange}
              className="border border-gray-300 rounded p-2 w-full"
              rows="4"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <button onClick={() => handleApproval('Approved')} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
            <button onClick={() => handleApproval('Disapproved')} className="bg-red-500 text-white px-4 py-2 rounded">Disapprove</button>
            <button onClick={() => handleApproval('Revision Requested')} className="bg-yellow-500 text-white px-4 py-2 rounded">Request Revision</button>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Notification Settings</h3>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={notificationSettings.email}
                onChange={handleNotificationSettingChange}
                className="form-checkbox"
              />
              <span className="ml-2">Email Notification</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="inApp"
                checked={notificationSettings.inApp}
                onChange={handleNotificationSettingChange}
                className="form-checkbox"
              />
              <span className="ml-2">In-App Notification</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalWorkflow;
