import React, { useState } from 'react';

const QuizCreationTool = () => {
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    lesson: '',
    questionType: 'multiple-choice',
    question: '',
    correctAnswer: '',
    attempts: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Handle quiz creation logic
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4">Create a Quiz</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Quiz Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={quizDetails.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Lesson</label>
          <input
            type="text"
            name="lesson"
            className="form-control"
            value={quizDetails.lesson}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Question Type</label>
          <select
            name="questionType"
            className="form-control"
            value={quizDetails.questionType}
            onChange={handleInputChange}
            required
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="short-answer">Short Answer</option>
            <option value="true-false">True/False</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Question</label>
          <textarea
            name="question"
            className="form-control"
            value={quizDetails.question}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            className="form-control"
            value={quizDetails.correctAnswer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Attempts Allowed</label>
          <input
            type="number"
            name="attempts"
            className="form-control"
            value={quizDetails.attempts}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreationTool;
