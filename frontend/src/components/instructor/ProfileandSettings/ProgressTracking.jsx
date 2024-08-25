import React from 'react';

const ProgressTracking = ({ progress }) => {
  return (
    <div className="mt-4">
      <h4 className="text-md font-bold mb-2">Progress Tracking</h4>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2">{progress}% Complete</p>
    </div>
  );
};

export default ProgressTracking;
