import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../components/instructor/Common/Navbar'

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // Fetch the data from the local JSON file
        const response = await fetch('/inst1.json');
        const data = await response.json();

        // Extract the course details based on the courseId
        const courseDetail = data['course-detail'][courseId];
        
        if (courseDetail) {
          setCourse(courseDetail);
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course detail', error);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  const handleViewStudents = () => {
    navigate(`/courses/${courseId}/students`);
  };

  const handleManageCourse = () => {
    navigate(`/course-management/${courseId}`);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Enrollment:</strong> {course.enrollment}</p>
        <p><strong>Completion Rate:</strong> {course.completionRate}%</p>
        <p><strong>Feedback:</strong> {course.feedback}</p>
        <div className="mt-4 flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            onClick={handleViewStudents}
          >
            View Enrolled Students
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            onClick={handleManageCourse}
          >
            Manage Course
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseDetail;
