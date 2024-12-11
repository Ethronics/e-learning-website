import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealTimeExamMonitoring = () => {
//   const [students, setStudents] = useState([]);
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [alerts, setAlerts] = useState([]);
  
//   useEffect(() => {
//     // Fetch the list of students and their exam status
//     axios.get('/exam.json')
//       .then(response => setStudents(response.data.students))
//       .catch(error => console.error(error));
//   }, []);

//   const handleStartMonitoring = () => {
//     setIsMonitoring(true);
//     // Start monitoring logic can be added here, such as WebSocket connections
//     console.log('Monitoring started');
//   };

//   const handleStopMonitoring = () => {
//     setIsMonitoring(false);
//     // Stop monitoring logic
//     console.log('Monitoring stopped');
//   };

//   const triggerAlert = (studentId, message) => {
//     setAlerts([...alerts, { studentId, message }]);
//     // Additional logic to handle alert actions can be added here
//   };

  const [liveExams, setLiveExams] = useState([]);

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => {
        setLiveExams(response.data.liveExams);
      })
      .catch(error => console.error('Error fetching exam data:', error));
  }, []);

  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeAdjustment, setTimeAdjustment] = useState('');
  const [applyToAll, setApplyToAll] = useState(false);

  const handleTimeAdjustment = () => {
    const updatedExams = liveExams.map(exam => {
      if (exam.examId === selectedExam.examId) {
        return {
          ...exam,
          students: exam.students.map(student => {
            if (applyToAll || student.studentId === selectedStudent.studentId) {
              return {
                ...student,
                timeLeft: timeAdjustment
              };
            }
            return student;
          })
        };
      }
      return exam;
    });

    setLiveExams(updatedExams);

    // Simulate an API call to update the server-side data
    axios.post('/api/updateTime', { 
      examId: selectedExam.examId, 
      studentId: applyToAll ? null : selectedStudent.studentId, 
      timeLeft: timeAdjustment 
    })
    .then(response => console.log('Time updated successfully'))
    .catch(error => console.error('Error updating time:', error));
  };

  const handleToggleRandomization = (examId) => {
    const updatedExams = liveExams.map(exam => {
      if (exam.examId === examId) {
        return {
          ...exam,
          isRandomized: !exam.isRandomized
        };
      }
      return exam;
    });

    setLiveExams(updatedExams);

    // Simulate an API call to update the server-side data
    axios.post('/api/toggleRandomization', { examId, isRandomized: !updatedExams.find(exam => exam.examId === examId).isRandomized })
      .then(response => console.log('Randomization updated successfully'))
      .catch(error => console.error('Error updating randomization:', error));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Live Exam View</h2>
      {liveExams.map(exam => (
        <div key={exam.examId} className="mb-4">
          <h3 className="text-xl font-medium">{exam.examTitle}</h3>
          <ul className="mt-2">
            {exam.students.map(student => (
              <li key={student.studentId} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">Progress: {student.progress}%</p>
                </div>
                <p className="text-sm text-gray-600">Time Left: {student.timeLeft}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2 className="text-2xl font-semibold mb-4">Time Management</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Exam:</label>
        <select 
          className="mt-1 block w-full border border-gray-300 rounded-md"
          onChange={e => setSelectedExam(liveExams.find(exam => exam.examId === parseInt(e.target.value)))}
        >
          <option value="">-- Select an Exam --</option>
          {liveExams.map(exam => (
            <option key={exam.examId} value={exam.examId}>{exam.examTitle}</option>
          ))}
        </select>
      </div>
      {selectedExam && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Student:</label>
          <select 
            className="mt-1 block w-full border border-gray-300 rounded-md"
            onChange={e => setSelectedStudent(selectedExam.students.find(student => student.studentId === parseInt(e.target.value)))}
            disabled={applyToAll}
          >
            <option value="">-- Select a Student --</option>
            {selectedExam.students.map(student => (
              <option key={student.studentId} value={student.studentId}>{student.name}</option>
            ))}
          </select>
          <div className="mt-2 flex items-center">
            <input 
              type="checkbox" 
              id="applyToAll"
              className="mr-2"
              checked={applyToAll}
              onChange={() => setApplyToAll(!applyToAll)}
            />
            <label htmlFor="applyToAll" className="text-sm font-medium text-gray-700">Apply to All Students</label>
          </div>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Adjust Time (in minutes):</label>
        <input 
          type="text" 
          className="mt-1 block w-full border border-gray-300 rounded-md"
          value={timeAdjustment}
          onChange={e => setTimeAdjustment(e.target.value)}
        />
      </div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleTimeAdjustment}
        disabled={!timeAdjustment}
      >
        Update Time
      </button>
    
    
      <h2 className="text-2xl font-semibold mb-4">Randomization Control</h2>
      {liveExams.map(exam => (
        <div key={exam.examId} className="flex justify-between items-center mb-4">
          <p className="font-medium">{exam.examTitle}</p>
          <button 
            className={`px-4 py-2 rounded-md ${exam.isRandomized ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            onClick={() => handleToggleRandomization(exam.examId)}
          >
            {exam.isRandomized ? 'Disable Randomization' : 'Enable Randomization'}
          </button>
        </div>
      ))}

    </div>
  );
};

export default RealTimeExamMonitoring;
