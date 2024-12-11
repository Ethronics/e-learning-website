import React, { useState } from "react";
import axios from "axios";

const AssignmentSubmission = ({ assignment }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assignment", file);

    axios.post(`/api/submit-assignment/${assignment.id}`, formData).then((response) => {
      alert("Assignment submitted successfully!");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Assignment Submission</h2>
      <p className="mb-4">{assignment.description}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
