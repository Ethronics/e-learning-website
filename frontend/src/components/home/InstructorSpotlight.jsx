
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorSpotlight = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios.get('/ap1.json')
      .then(response => setInstructors(response.data.instructors))
      .catch(error => console.error('Error fetching instructors:', error));
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Instructor Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map(instructor => (
            <div key={instructor.id} className="bg-gray p-6 ">
              <img src={instructor.photo} alt={instructor.name} className="mb-4  w-32 h-32 mx-auto"/>
              <h3 className="text-xl font-semibold text-center mb-2">{instructor.name}</h3>
              <p className="text-gray-600 text-center mb-4">{instructor.bio}</p>
              <div className="text-center">
                <a href={`/instructors/${instructor.id}`} className="text-blue-500 hover:underline">View Profile</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorSpotlight;
