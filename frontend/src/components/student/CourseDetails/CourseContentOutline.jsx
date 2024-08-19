import React from 'react';
import './CourseDetail.css';

const CourseContentOutline = ({ contentOutline }) => {
  return (
    <div className="course-content-outline mb-4">
      <h2 className="h4 font-weight-bold mb-3">Course Content Outline</h2>
      <ul className="list-unstyled">
        {contentOutline.map((module, index) => (
          <li key={index} className="mb-3">
            <h5 className="font-weight-bold">{module.module}</h5>
            <ul className="list-unstyled">
              {module.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex}>{lesson}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseContentOutline;
