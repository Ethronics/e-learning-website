import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../home/Navbar';
import Footer from '../../home/Footer';

const CurriculumDetail = () => {
  const { id } = useParams(); // Get the curriculum ID from route params
  const [curriculum, setCurriculum] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/cur.json`); // Adjust path to your JSON file
        const { curricula, courses: allCourses } = response.data;

        // Debugging: Log the data to ensure it's being fetched correctly
        console.log('Fetched Data:', response.data);

        const foundCurriculum = curricula.find(item => item.id === parseInt(id));

        if (foundCurriculum) {
          setCurriculum(foundCurriculum);
          const curriculumCourses = foundCurriculum.courses;
          const filteredCourses = allCourses.filter(course =>
            curriculumCourses.some(currCourse => currCourse.id === course.id)
          );
          setCourses(filteredCourses);
        } else {
          setError('Curriculum not found');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!curriculum) {
    return <div>No Curriculum Data Available</div>;
  }

  return (
    <div>
        <AppNavbar />
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">{curriculum.title}</h2>
        <p className="text-lg mb-4">{curriculum.description}</p>
        <p className="mb-4"><strong>Start Date:</strong> {curriculum.startDate}</p>
        <p className="mb-4"><strong>End Date:</strong> {curriculum.endDate}</p>
        <p className="mb-4"><strong>Instructors:</strong> {curriculum.instructors.join(', ')}</p>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? courses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
                <img src={course.thumbnail || 'default-thumbnail.jpg'} alt={course.title || 'No Title'} className="mb-4 rounded-md"/>
                <h3 className="text-xl font-semibold mb-2">{course.title || 'No Title'}</h3>
                <p className="text-gray-600 mb-4">{course.description || 'No Description'}</p>
                <p className="mb-4"><strong>Price:</strong> ${course.price || '0.00'}</p>
                <a href={`/course/${course.id}`} className="text-blue-500 hover:underline">View Details</a>
              </div>
            )) : <p>No Courses Available</p>}
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default CurriculumDetail;
