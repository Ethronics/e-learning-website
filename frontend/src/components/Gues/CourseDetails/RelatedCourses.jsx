import React from 'react';
import './CourseDetail.css';

const RelatedCourses = ({ relatedCourses }) => {
  return (
    <div className="related-courses mb-4">
      <h2 className="h4 font-weight-bold mb-3">Related Courses</h2>
      <ul className="list-unstyled">
        {relatedCourses.map((course, index) => (
          <li key={index}>
            <a href={`/course/${course.id}`} className="text-primary">{course.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedCourses;
