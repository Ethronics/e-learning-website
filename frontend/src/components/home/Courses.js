
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/ap1.json')
      .then(response => setCourses(response.data.courses))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={course.thumbnail} alt={course.title} className="mb-4 rounded-md"/>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">New</span>
                <a href={`/courses/${course.id}`} className="text-blue-500 hover:underline">Enroll Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;

