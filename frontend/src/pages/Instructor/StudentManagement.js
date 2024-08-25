import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/instructor/Common/Navbar'

const StudentManagement = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/inst1.json');
        const data = await response.json();
        const enrolledStudents = data['enrolled-students'][courseId] || [];

        setStudents(enrolledStudents);
        setFilteredStudents(enrolledStudents);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    fetchStudents();
  }, [courseId]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => 
        student.name.toLowerCase().includes(event.target.value.toLowerCase())
      ));
    }
  };

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Student Management</h2>
        
        {/* Filter Input */}
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search students..."
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />

        {/* Student Roster */}
        <h3 className="text-xl font-semibold mb-2">Student List</h3>
        <ul>
          {filteredStudents.map(student => (
            <li key={student.id} className="border-b py-2">
              <div className="flex justify-between">
              <img src={student.profileImage} alt={student.name} className="h-10 w-10 rounded-full mr-3" />
                <span>{student.name}</span>
                <span>{student.email}</span>
                <a
                  href={`/courses/${courseId}/students/${student.id}`}
                  className="text-blue-500 underline"
                >
                  View 
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default StudentManagement;
