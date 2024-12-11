import React from "react";

const QuizPerformanceOverview = ({ quizzes }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Quiz Performance Overview</h2>
      {quizzes.map((quiz) => (
        <div key={quiz.quizId} className="mb-4">
          <h3 className="font-semibold">{quiz.title}</h3>
          <p>Score: {quiz.score}%</p>
          <small className="text-gray-500">Date: {quiz.date}</small>
        </div>
      ))}
    </div>
  );
};

export default QuizPerformanceOverview;
