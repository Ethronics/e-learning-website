import React from 'react';
import { Link } from 'react-router-dom';

const CoursesOffered = ({ courses }) => {
  return (
    <div className="courses-offered">
      <h3 className="text-xl font-bold">Courses Offered</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course.id} className="course-card bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">{course.title}</h4>
            <p className="text-gray-600">{course.description}</p>
            <Link to={`/course/${course.id}`} className="text-blue-500 hover:underline">View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOffered;
