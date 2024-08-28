
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'chart.js/auto';


const StatisticsAndReports = () => {
  const [examPerformance, setExamPerformance] = useState({});
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [courseReports, setCourseReports] = useState([]);

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => {
        setExamPerformance(response.data.examPerformance);
        setStudentPerformance(response.data.studentPerformance);
        setCourseReports(response.data.courseReports);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Statistics and Reports</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Exam Performance Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-lg">Metrics Dashboard</h3>
            <p>Average Score: {examPerformance.averageScore || 'N/A'}</p>
            <p>Pass Rate: {examPerformance.passRate || 'N/A'}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-lg">Question Difficulty</h3>
            <ul>
              {examPerformance.questionDifficulty && Object.entries(examPerformance.questionDifficulty).map(([difficulty, percentage]) => (
                <li key={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: {percentage}%
                </li>
              ))}
            </ul>
          </div>
        
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Student Performance Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b px-4 py-2">Student Name</th>
                <th className="border-b px-4 py-2">Exam Title</th>
                <th className="border-b px-4 py-2">Score</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentPerformance.map(student => (
                student.examScores.map((score, index) => (
                  <tr key={index}>
                    <td className="border-b px-4 py-2">{student.studentName}</td>
                    <td className="border-b px-4 py-2">{score.examTitle}</td>
                    <td className="border-b px-4 py-2">{score.score}</td>
                    <td className="border-b px-4 py-2">
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course-Based Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b px-4 py-2">Course Title</th>
                <th className="border-b px-4 py-2">Average Score</th>
                <th className="border-b px-4 py-2">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {courseReports.map((course, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">{course.courseTitle}</td>
                  <td className="border-b px-4 py-2">{course.averageScore}</td>
                  <td className="border-b px-4 py-2">{course.passRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsAndReports;
