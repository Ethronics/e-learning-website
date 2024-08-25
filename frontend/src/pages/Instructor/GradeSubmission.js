import React, { useState } from "react";
import Navigation from '../../components/instructor/Common/Navbar'

const GradeSubmissionPage = () => {
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [assignmentGrade, setAssignmentGrade] = useState("");
  const [projectGrade, setProjectGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAddGrade = () => {
    setGrades([...grades, { studentId, grade, assignmentGrade, projectGrade, feedback }]);
    setStudentId("");
    setGrade("");
    setAssignmentGrade("");
    setProjectGrade("");
    setFeedback("");
  };

  const handleSubmit = () => {
    // Submit the grades to the backend or API here
    alert("Grades submitted successfully!");
  };

  return (
    <div>
      <Navigation />
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Grade Submission</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-600 font-medium">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Student ID"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Exam Grade</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Exam Grade"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Assignment Grade</label>
          <input
            type="text"
            value={assignmentGrade}
            onChange={(e) => setAssignmentGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Assignment Grade"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Project (Lab) Grade</label>
          <input
            type="text"
            value={projectGrade}
            onChange={(e) => setProjectGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Project (Lab) Grade"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Provide feedback (optional)"
          ></textarea>
        </div>

        <button
          onClick={handleAddGrade}
          className="w-full bg-blue-500 text-white font-medium p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Grade
        </button>
      </div>

      {grades.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Grades List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-3 font-medium text-gray-700">Student ID</th>
                  <th className="border-b p-3 font-medium text-gray-700">Exam Grade</th>
                  <th className="border-b p-3 font-medium text-gray-700">Assignment Grade</th>
                  <th className="border-b p-3 font-medium text-gray-700">Project (Lab) Grade</th>
                  <th className="border-b p-3 font-medium text-gray-700">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b p-3">{item.studentId}</td>
                    <td className="border-b p-3">{item.grade}</td>
                    <td className="border-b p-3">{item.assignmentGrade}</td>
                    <td className="border-b p-3">{item.projectGrade}</td>
                    <td className="border-b p-3">{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {grades.length > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white font-medium p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Submit Grades
        </button>
      )}
    </div>
    </div>
  );
};

export default GradeSubmissionPage;
