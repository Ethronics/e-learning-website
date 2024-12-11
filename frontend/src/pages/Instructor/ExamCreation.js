// ExamCreation.js
import React, { useState, useEffect } from 'react';
import ExamScheduling from './ExamScheduling';
import Navigation from '../../components/instructor/Common/Navbar'

const ExamCreation = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json'); // Update with your endpoint
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to create a new exam
    // You can POST the data to your server here
  };

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Exam</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Exam Title</label>
          <input
            type="text"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={examDescription}
            onChange={(e) => setExamDescription(e.target.value)}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Time Limit (minutes)</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Select Questions</h3>
          {questions.map(question => (
            <div key={question.id} className="mb-2">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question.id)}
                onChange={() => {
                  setSelectedQuestions(prevState =>
                    prevState.includes(question.id)
                      ? prevState.filter(id => id !== question.id)
                      : [...prevState, question.id]
                  );
                }}
              />
              <span className="ml-2">{question.question}</span>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create Exam
        </button>
      </form>
      <div> <ExamScheduling /></div>
    </div>
    </div>
  );
};

export default ExamCreation;
