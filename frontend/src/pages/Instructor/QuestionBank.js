// QuestionBank.js
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/instructor/Common/Navbar'

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Question Bank</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id} className="mb-2 p-4 border rounded-lg">
            <p><strong>Question:</strong> {question.question}</p>
            <p><strong>Type:</strong> {question.type}</p>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default QuestionBank;
