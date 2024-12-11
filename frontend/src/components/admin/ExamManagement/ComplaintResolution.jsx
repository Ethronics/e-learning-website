// src/components/ComplaintResolution.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintResolution = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [gradeAdjustment, setGradeAdjustment] = useState('');
  const [examRevision, setExamRevision] = useState('');

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => setComplaints(response.data.complaints))
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = (complaintId) => {
    axios.post('/api/addComment', { id: complaintId, comment: newComment })
      .then(response => {
        setComplaints(complaints.map(complaint =>
          complaint.id === complaintId
            ? { ...complaint, comments: [...complaint.comments, response.data.comment] }
            : complaint
        ));
        setNewComment('');
      })
      .catch(error => console.error('Error submitting comment:', error));
  };

  const handleGradeAdjustment = (complaintId) => {
    axios.post('/api/adjustGrade', { id: complaintId, adjustment: gradeAdjustment })
      .then(() => {
        setComplaints(complaints.map(complaint =>
          complaint.id === complaintId
            ? { ...complaint, status: 'Resolved' }
            : complaint
        ));
        setGradeAdjustment('');
        alert('Grade adjusted successfully!');
      })
      .catch(error => console.error('Error adjusting grade:', error));
  };

  const handleExamRevision = (complaintId) => {
    axios.post('/api/reviseExam', { id: complaintId, revision: examRevision })
      .then(() => {
        setComplaints(complaints.map(complaint =>
          complaint.id === complaintId
            ? { ...complaint, status: 'Resolved' }
            : complaint
        ));
        setExamRevision('');
        alert('Exam revised successfully!');
      })
      .catch(error => console.error('Error revising exam:', error));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Complaint Resolution</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Complaints</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b px-4 py-2">Student Name</th>
                <th className="border-b px-4 py-2">Exam Title</th>
                <th className="border-b px-4 py-2">Issue Description</th>
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(complaint => (
                <tr key={complaint.id}>
                  <td className="border-b px-4 py-2">{complaint.studentName}</td>
                  <td className="border-b px-4 py-2">{complaint.examTitle}</td>
                  <td className="border-b px-4 py-2">{complaint.issueDescription}</td>
                  <td className="border-b px-4 py-2">{complaint.status}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedComplaint && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Complaint Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-lg">Issue Description:</h3>
            <p className="mb-4">{selectedComplaint.issueDescription}</p>

            <h3 className="font-semibold text-lg">Comments</h3>
            <div className="mb-4">
              {selectedComplaint.comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <span className={`font-bold ${comment.role === 'Admin' ? 'text-red-500' : 'text-green-500'}`}>
                    {comment.role}:
                  </span> {comment.text} <span className="text-gray-500 text-sm">({new Date(comment.timestamp).toLocaleString()})</span>
                </div>
              ))}
            </div>

            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded p-2 mb-2"
            ></textarea>
            <button
              onClick={() => handleCommentSubmit(selectedComplaint.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Submit Comment
            </button>

            <div className="mt-4">
              <h3 className="font-semibold text-lg">Resolution Actions</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Adjust Grade</label>
                <input
                  type="number"
                  value={gradeAdjustment}
                  onChange={(e) => setGradeAdjustment(e.target.value)}
                  placeholder="New Grade"
                  className="border border-gray-300 rounded p-2"
                />
                <button
                  onClick={() => handleGradeAdjustment(selectedComplaint.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                >
                  Adjust Grade
                </button>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Revise Exam Questions</label>
                <textarea
                  value={examRevision}
                  onChange={(e) => setExamRevision(e.target.value)}
                  placeholder="Details for exam revision"
                  className="w-full border border-gray-300 rounded p-2"
                ></textarea>
                <button
                  onClick={() => handleExamRevision(selectedComplaint.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mt-2"
                >
                  Revise Exam
                </button>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Additional Feedback</label>
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Provide feedback to the student..."
                  className="w-full border border-gray-300 rounded p-2"
                ></textarea>
                <button
                  onClick={() => handleCommentSubmit(selectedComplaint.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                >
                  Provide Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintResolution;
