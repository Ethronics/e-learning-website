import React from "react";

const PracticalSessionFeedback = ({ feedback }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Practical Session Feedback</h2>
      <ul className="space-y-2">
        {feedback.map((item) => (
          <li key={item.id} className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-medium">{item.sessionTitle}</p>
            <p>{item.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticalSessionFeedback;
