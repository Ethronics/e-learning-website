// CurriculumList.jsx
import React from 'react';

const CurriculumList = ({ curricula }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Available Curricula</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curricula.map(curriculum => (
            <a href={`/curricula/${curriculum.id}`} className="text-blue-500 hover:underline">
            <div key={curriculum.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={curriculum.thumbnail} alt={curriculum.title} className="mb-4 rounded-md"/>
              <h3 className="text-xl font-semibold mb-2">{curriculum.title}</h3>
              <p className="text-gray-600 mb-4">{curriculum.description}</p>
              <a href={`/curricula/${curriculum.id}`} className="text-blue-500 hover:underline">View Details</a>
            </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumList;
