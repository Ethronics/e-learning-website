// CurriculumDropdown.jsx
import React from 'react';

const CurriculumDropdown = ({ curricula, onSelect }) => {
  return (
    <div className="mb-6">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-full"
      >
        <option value="">Select Curriculum</option>
        {curricula.map((curriculum) => (
          <option key={curriculum.id} value={curriculum.id}>
            {curriculum.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurriculumDropdown;
