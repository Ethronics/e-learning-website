import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/inst1.json')
      .then(response => {
        setCourses(response.data.courses);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course-detail/${courseId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h4 className="text-xl font-semibold mb-4">Course Overview</h4>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            onClick={() => handleCourseClick(course.id)}
          >
            <h5 className="text-lg font-semibold">{course.title}</h5>
            <p>Enrollment: {course.enrollment}</p>
            <p>Completion Rate: {course.completionRate}%</p>
            <p>Feedback: {course.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;