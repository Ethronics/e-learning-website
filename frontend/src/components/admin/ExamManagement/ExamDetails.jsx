// src/components/ExamDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamDetails = ({ exam, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editQuestion, setEditQuestion] = useState(null);

  useEffect(() => {
    axios.get(`/api/exams/${exam.id}/questions`)
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [exam]);

  const handleAddQuestion = () => {
    axios.post(`/api/exams/${exam.id}/questions`, { content: newQuestion })
      .then(response => {
        setQuestions([...questions, response.data]);
        setNewQuestion('');
      })
      .catch(error => console.error('Error adding question:', error));
  };

  const handleEditQuestion = (question) => {
    setEditQuestion(question);
  };

  const handleUpdateQuestion = () => {
    axios.put(`/api/exams/${exam.id}/questions/${editQuestion.id}`, { content: editQuestion.content })
      .then(response => {
        setQuestions(questions.map(q => q.id === editQuestion.id ? response.data : q));
        setEditQuestion(null);
      })
      .catch(error => console.error('Error updating question:', error));
  };

  const handleDeleteQuestion = (questionId) => {
    axios.delete(`/api/exams/${exam.id}/questions/${questionId}`)
      .then(() => {
        setQuestions(questions.filter(q => q.id !== questionId));
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <button 
        className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={onBack}
      >
        Back to Exam Pool
      </button>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      <h2 className="text-xl font-semibold mb-4">Questions</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handleAddQuestion}
          disabled={!newQuestion}
        >
          Add Question
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2">Question</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr key={question.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">
                  {editQuestion?.id === question.id ? (
                    <input
                      type="text"
                      value={editQuestion.content}
                      onChange={(e) => setEditQuestion({ ...editQuestion, content: e.target.value })}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  ) : (
                    question.content
                  )}
                </td>
                <td className="border-b px-4 py-2">
                  {editQuestion?.id === question.id ? (
                    <>
                      <button 
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        onClick={handleUpdateQuestion}
                      >
                        Save
                      </button>
                      <button 
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={() => setEditQuestion(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleEditQuestion(question)}
                      >
                        Edit
                      </button>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamDetails;
