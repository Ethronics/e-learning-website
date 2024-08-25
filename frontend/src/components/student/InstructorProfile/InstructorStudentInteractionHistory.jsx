import React from 'react';

const InstructorStudentInteractionHistory = ({ interactions }) => {
  return (
    <div className="instructor-student-interaction-history">
      <h3 className="text-xl font-bold">Instructor-Student Interaction History</h3>
      <div className="interactions">
        {interactions.map((interaction, index) => (
          <div key={index} className="interaction bg-white p-4 rounded-lg shadow-md mb-4">
            <p><strong>Date:</strong> {interaction.date}</p>
            <p><strong>Type:</strong> {interaction.type}</p>
            <p><strong>Details:</strong> {interaction.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorStudentInteractionHistory;
