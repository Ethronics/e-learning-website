import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseAssignmentManagement = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);

  useEffect(() => {
    axios.get('/api.json')
      .then(response => setAssignedCourses(response.data.curricula[0].assignedCourses))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="text-md font-semibold mb-2">Assigned Courses</h4>
      <ul className="space-y-2">
        {assignedCourses.map(course => (
          <li key={course.courseId} className="bg-gray-100 p-2 rounded-lg flex justify-between">
            <div>
              <h5 className="font-semibold">{course.title}</h5>
              <p>Permissions: {course.permissions.join(', ')}</p>
            </div>
            <button className="text-blue-500">Collaborate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseAssignmentManagement;
