import React from 'react';
import './CourseDetail.css';

const EnrollmentButton = ({ cta, promoCodes }) => {
  return (
    <div className="enrollment-button mb-4">
      <button className="btn btn-primary btn-lg">{cta}</button>
      {promoCodes && (
        <div className="mt-3">
          <h3 className="h5 font-weight-bold">Promo Codes:</h3>
          {promoCodes.map((promo, index) => (
            <p key={index}>Code: {promo.code}, Discount: {promo.discount}%</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentButton;
