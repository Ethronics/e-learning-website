import React from 'react';

const RatingsAndReviews = ({ ratings, reviews }) => {
  const averageRating = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;

  return (
    <div className="ratings-and-reviews">
      <h3 className="text-xl font-bold">Ratings & Reviews</h3>
      <p><strong>Average Rating:</strong> {averageRating.toFixed(1)} / 5</p>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review bg-white p-4 rounded-lg shadow-md mb-4">
            <p><strong>{review.author}:</strong> {review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAndReviews;
