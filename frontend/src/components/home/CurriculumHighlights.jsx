import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurriculumHighlights = () => {
  const [curricula, setCurricula] = useState([]);

  useEffect(() => {
    axios.get('/ap1.json')
      .then(response => setCurricula(response.data.curricula))
      .catch(error => console.error('Error fetching curricula:', error));
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Curriculum Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curricula.map(curriculum => (
            <div key={curriculum.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{curriculum.title}</h3>
              <p className="text-gray-600 mb-4">{curriculum.description}</p>
              <a href={`/curricula/${curriculum.id}`} className="text-blue-500 hover:underline">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumHighlights;