import React from 'react';

const MyCurricula = ({ curricula, permissions }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">My Curriculum</h2>
      <ul className="space-y-4">
        {curricula.map(curriculum => (
          <li key={curriculum.id} className="border-b pb-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{curriculum.title}</h3>
                <p className="text-sm text-gray-500">
                  Available: {new Date(curriculum.startDate).toLocaleDateString()} - 
                  {new Date(curriculum.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Time Left: {curriculum.remainingTime} days</p>
              </div>
              <div className="flex items-center space-x-2">
                {permissions.canEditCurricula && (
                  <a href={`/curriculum/${curriculum.id}/edit`} className="text-blue-500">Manage Courses</a>
                )}
                <a href={`/curriculum/${curriculum.id}`} className="text-blue-500">View Curriculum</a>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded mt-2">
              <div className="h-full bg-green-500 rounded" style={{ width: `${curriculum.progress}%` }}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCurricula;
