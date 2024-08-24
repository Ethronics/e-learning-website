import React from "react";

const PersonalizedLearningPaths = ({ paths }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Personalized Learning Paths</h2>
      {paths.map((path) => (
        <div key={path.id} className="mb-4">
          <h3 className="font-semibold">{path.title}</h3>
          <ul className="list-disc ml-4">
            {path.recommendedCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PersonalizedLearningPaths;
