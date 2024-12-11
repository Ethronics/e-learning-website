import React from 'react';
import './CourseDetail.css';

const CourseContentOutline = ({ contentOutline }) => {
  return (
    <div className="course-content-outline mb-4">
      <h2 className="h4 font-weight-bold mb-3">Course Content Outline</h2>
      <ul className="lesson-list">
        {contentOutline.flatMap(module => module.lessons).map((lesson, index) => (
          <li key={index} className="lesson-item">
            <div className="lesson-content">
              <span className="lesson-title">{lesson}</span>
              {lesson.pdf && (
                <a
                  href={lesson.pdf}
                  className="pdf-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-file-pdf"></i> View PDF
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseContentOutline;
