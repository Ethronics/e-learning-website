import React from 'react';
import './CourseDetail.css';

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews mb-4">
      <h2 className="h4 font-weight-bold mb-3">Reviews/Testimonials</h2>
      {reviews.map((review, index) => (
        <div key={index} className="mb-3">
          <p className="font-weight-bold">{review.student}</p>
          <p>{review.comment}</p>
          <p>{review.practicalFeedback}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
