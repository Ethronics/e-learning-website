import React from 'react';
import './CourseDetail.css';

const Prerequisites = ({ prerequisites, preparatoryCourses }) => {
  return (
    <div className="prerequisites mb-4">
      <h2 className="h4 font-weight-bold mb-3">Prerequisites</h2>
      <ul className="list-unstyled">
        {prerequisites.map((prerequisite, index) => (
          <li key={index}>{prerequisite}</li>
        ))}
      </ul>
      {preparatoryCourses && (
        <div className="mt-4">
          <h3 className="h5 font-weight-bold">Preparatory Courses</h3>
          <ul className="list-unstyled">
            {preparatoryCourses.map((course, index) => (
              <li key={index}><a href={`/courses/${course.id}`} className="text-primary">{course.title}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Prerequisites;
