import React, { useState, useEffect } from 'react';
import './CourseDetail.css';

const InstructorDetails = ({ instructor }) => {
    const [instructors, setInstructors] = useState([]);
  return (
    <div className="instructor-details mb-4">
      <h2 className="h4 font-weight-bold mb-2">Instructor Details</h2>
      <div className="d-flex align-items-center mb-3">
        <img src={instructor.photo} alt={instructor.name} className="rounded-circle mr-3" style={{ width: '80px', height: '80px' }} />
        <div>
          <h3 className="h5 font-weight-bold">{instructor.name}</h3>
          <p>{instructor.bio}</p>
          <a href={`/instructors/${instructor.id}`} className="text-blue-500 hover:underline">View Full Profile</a>
          <div className="mt-2">
            {instructor.socialMedia.map((social, index) => (
              <a key={index} href={social.url} className="btn-link text-primary mr-2">{social.platform}</a>
            ))}
          </div>
          <div className="mt-2">
            <p><strong>Experience:</strong> {instructor.experience}</p>
            <p><strong>Education:</strong> {instructor.education}</p>
            <p><strong>Rating:</strong> {instructor.ratings} stars</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="h5 font-weight-bold">Other Courses by {instructor.name}:</h4>
        <ul className="list-unstyled">
          {instructor.otherCourses.map((course, index) => (
            <li key={index}><a href={`/course/${course.id}`} className="text-primary">{course.title}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructorDetails;
