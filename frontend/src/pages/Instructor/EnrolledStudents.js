import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../../components/instructor/Common/Navbar'

const EnrolledStudents = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/inst1.json');
        const data = await response.json();
        const enrolledStudents = data['enrolled-students'][courseId] || [];
        setStudents(enrolledStudents);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    fetchStudents();
  }, [courseId]);

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="mb-2">
            <Link to={`/courses/${courseId}/students/${student.id}`} className="text-blue-500 underline">
              {student.name} ({student.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default EnrolledStudents;
