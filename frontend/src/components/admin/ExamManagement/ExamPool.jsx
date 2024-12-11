// src/components/ExamPool.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExamDetails from './ExamDetails';

const ExamPool = () => {
  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [formatFilter, setFormatFilter] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => {
        setExams(response.data.exams);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
  }, []);

  const filteredExams = exams.filter(exam => {
    return (
      exam.title.toLowerCase().includes(search.toLowerCase()) &&
      (!courseFilter || exam.course === courseFilter) &&
      (!subjectFilter || exam.subject === subjectFilter) &&
      (!difficultyFilter || exam.difficulty === difficultyFilter) &&
      (!formatFilter || exam.format === formatFilter)
    );
  });

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {selectedExam ? (
        <ExamDetails exam={selectedExam} onBack={() => setSelectedExam(null)} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Exam Pool</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All Courses</option>
              {/* Populate dynamically from data */}
              <option value="Mathematics 101">Mathematics 101</option>
              <option value="History 201">History 201</option>
            </select>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All Subjects</option>
              {/* Populate dynamically from data */}
              <option value="Algebra">Algebra</option>
              <option value="Ancient Civilizations">Ancient Civilizations</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All Formats</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="Essay">Essay</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b px-4 py-2">Title</th>
                  <th className="border-b px-4 py-2">Course</th>
                  <th className="border-b px-4 py-2">Subject</th>
                  <th className="border-b px-4 py-2">Difficulty</th>
                  <th className="border-b px-4 py-2">Format</th>
                  <th className="border-b px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map(exam => (
                  <tr key={exam.id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">{exam.title}</td>
                    <td className="border-b px-4 py-2">{exam.course}</td>
                    <td className="border-b px-4 py-2">{exam.subject}</td>
                    <td className="border-b px-4 py-2">{exam.difficulty}</td>
                    <td className="border-b px-4 py-2">{exam.format}</td>
                    <td className="border-b px-4 py-2">
                      <button 
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleExamClick(exam)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamPool;
