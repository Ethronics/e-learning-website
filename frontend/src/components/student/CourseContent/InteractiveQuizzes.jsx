import React, { useState } from "react";
import axios from "axios";

const InteractiveQuizzes = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmitQuiz = (quizId) => {
    axios.post(`/api/submit-quiz/${quizId}`, { answers: quizAnswers }).then((response) => {
      setQuizFeedback(response.data.feedback);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Interactive Quizzes</h2>
      {selectedQuiz ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">{selectedQuiz.title}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuiz(selectedQuiz.id);
            }}
          >
            {selectedQuiz.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <p>{question.text}</p>
                {question.options.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      onChange={() => handleAnswerChange(question.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Submit Quiz
            </button>
          </form>
          {quizFeedback && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Feedback:</h4>
              <p>{quizFeedback}</p>
            </div>
          )}
        </div>
      ) : (
        <ul className="space-y-2">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <button
                onClick={() => setSelectedQuiz(quiz)}
                className="text-blue-600 hover:underline"
              >
                {quiz.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InteractiveQuizzes;
