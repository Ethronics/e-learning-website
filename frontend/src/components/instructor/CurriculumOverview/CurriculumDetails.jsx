import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CurriculumDetails = ({ permissions = {} }) => {
  const [curricula, setCurricula] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const { curriculumId } = useParams();

  useEffect(() => {
    // Fetch data from the local JSON file
    axios.get('/cur.json')
      .then(response => setCurricula(response.data.curricula))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (curriculumId && curricula.length > 0) {
      const curriculum = curricula.find(c => c.id === parseInt(curriculumId));
      setSelectedCurriculum(curriculum);
    }
  }, [curriculumId, curricula]);

  if (!curricula.length) return <div>Loading...</div>;

  if (selectedCurriculum) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{selectedCurriculum.title}</h2>
        <p className="text-gray-600 mb-4">{selectedCurriculum.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-medium">Courses in this Curriculum</h3>
          <ul className="list-disc list-inside">
            {selectedCurriculum.courses.map(course => (
              <li key={course.id} className="text-gray-700">
                {course.title} ({course.instructor})
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium">Details</h3>
          <p>Available: {new Date(selectedCurriculum.startDate).toLocaleDateString()} - {new Date(selectedCurriculum.endDate).toLocaleDateString()}</p>
          <p>Time Left: {selectedCurriculum.remainingTime} days</p>
        </div>

        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${selectedCurriculum.progress}%` }}></div>
        </div>

        <div className="flex space-x-4">
          {permissions.canEditCurricula && (
            <Link
              to={`/curriculum/${selectedCurriculum.id}/edit`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Manage Courses
            </Link>
          )}
          <Link
            to="/curricula"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Back to Curricula
          </Link>
        </div>
      </div>
    );
  }

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
                  <Link to={`/curriculum/${curriculum.id}/edit`} className="text-blue-500">Manage Courses</Link>
                )}
                <Link to={`/curriculum/${curriculum.id}`} className="text-blue-500">View Curriculum</Link>
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

export default CurriculumDetails;
