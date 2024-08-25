// src/components/UI/Card.js
import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
