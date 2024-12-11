import React, { useState } from 'react';
import Navigation from '../../components/instructor/Common/Navbar'

const QuizCreationPage = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const addQuestion = () => {
    setQuestions([...questions, { question: currentQuestion, type: questionType, options, correctOption }]);
    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectOption('');
  };

  const handleQuizSubmit = () => {
    // Save the quiz to the backend (use Axios to send the quiz data to your API)
    // For now, just log the quiz to the console
    console.log({
      title: quizTitle,
      questions: questions
    });
    // Reset form
    setQuizTitle('');
    setQuestions([]);
  };

  return (
    <div>
      <Navigation />
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
      <div className="mb-4">
        <label className="block text-lg mb-2">Quiz Title:</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter quiz title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Question:</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter question"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Question Type:</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="short-answer">Short Answer</option>
          <option value="true-false">True/False</option>
          <option value="drag-and-drop">Drag and Drop</option>
        </select>
      </div>

      {questionType === 'multiple-choice' && (
        <div>
          <h4 className="mb-2">Options:</h4>
          {options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full p-2 border rounded"
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-lg mb-2">Correct Option:</label>
            <input
              type="text"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter correct option"
            />
          </div>
        </div>
      )}

      {/* Add other question types handling here */}
      <button
        className="btn btn-primary mb-4"
        onClick={addQuestion}
      >
        Add Question
      </button>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Quiz Questions:</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mb-2">
              <strong>Q{index + 1}:</strong> {q.question} (Type: {q.type})<br />
              {q.type === 'multiple-choice' && (
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                  <strong>Correct Answer:</strong> {q.correctOption}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="btn btn-success"
        onClick={handleQuizSubmit}
      >
        Submit Quiz
      </button>
    </div>
    </div>
  );
};

export default QuizCreationPage;
