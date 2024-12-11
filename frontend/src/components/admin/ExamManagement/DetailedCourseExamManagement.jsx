import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailedCourseExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', options: [], correctOption: '' });
  const [newExam, setNewExam] = useState({ title: '', description: '', date: '' });
  const [isEditingExam, setIsEditingExam] = useState(false);

  useEffect(() => {
    // Fetch list of exams for the course
    axios.get('/exam.json')
      .then(response => setExams(response.data.exams))
      .catch(error => console.error(error));
  }, []);

  const handleSelectExam = (exam) => {
    setSelectedExam(exam);
    setQuestions(exam.questions);
  };

  const handleCreateExam = () => {
    const updatedExams = [...exams, { ...newExam, id: exams.length + 1, questions: [] }];
    setExams(updatedExams);
    setNewExam({ title: '', description: '', date: '' });
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questions, { ...newQuestion, id: questions.length + 1 }];
    setQuestions(updatedQuestions);
    setNewQuestion({ question: '', options: [], correctOption: '' });
  };

  const handleEditExamDetails = () => {
    const updatedExams = exams.map(exam => 
      exam.id === selectedExam.id ? { ...exam, ...newExam, questions } : exam
    );
    setExams(updatedExams);
    setSelectedExam(null);
    setIsEditingExam(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Detailed Course Exam Management</h2>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Manage Exams</h3>

        {/* Exam List and Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-medium">Exams List</h4>
          <ul className="bg-gray-100 p-4 rounded-lg">
            {exams.map(exam => (
              <li 
                key={exam.id} 
                onClick={() => handleSelectExam(exam)}
                className="cursor-pointer p-2 hover:bg-blue-100"
              >
                {exam.title} - {exam.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Exam Details and Editing */}
        {selectedExam && (
          <div className="mb-6">
            <h4 className="text-lg font-medium">Exam Details</h4>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p><strong>Title:</strong> {selectedExam.title}</p>
              <p><strong>Description:</strong> {selectedExam.description}</p>
              <p><strong>Date:</strong> {selectedExam.date}</p>

              <button 
                onClick={() => setIsEditingExam(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
              >
                Edit Exam Details
              </button>

              {isEditingExam && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Edit Exam</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                      type="text"
                      value={newExam.title}
                      onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                      className="mt-1 p-2 border rounded w-full"
                      placeholder="Enter exam title"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      value={newExam.description}
                      onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                      className="mt-1 p-2 border rounded w-full"
                      placeholder="Enter exam description"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input 
                      type="date"
                      value={newExam.date}
                      onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <button 
                    onClick={handleEditExamDetails}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Creating New Exam */}
        <div className="mb-6">
          <h4 className="text-lg font-medium">Create New Exam</h4>
          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                type="text"
                value={newExam.title}
                onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter exam title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                value={newExam.description}
                onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter exam description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <button 
              onClick={handleCreateExam}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Exam
            </button>
          </div>
        </div>

        {/* Question Management */}
        {selectedExam && (
          <div className="mb-6">
            <h4 className="text-lg font-medium">Manage Questions</h4>
            <div className="bg-gray-200 p-4 rounded-lg">
              <ul className="mb-4">
                {questions.map(question => (
                  <li key={question.id} className="p-2 border-b">
                    {question.question}
                  </li>
                ))}
              </ul>

              <h5 className="text-md font-medium mb-2">Add New Question</h5>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <input 
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter question"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                <input 
                  type="text"
                  value={newQuestion.options.join(', ')}
                  onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value.split(', ') })}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter options separated by commas"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Correct Option</label>
                <input 
                  type="text"
                  value={newQuestion.correctOption}
                  onChange={(e) => setNewQuestion({ ...newQuestion, correctOption: e.target.value })}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter correct option"
                />
              </div>
              <button 
                onClick={handleAddQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCourseExamManagement;
