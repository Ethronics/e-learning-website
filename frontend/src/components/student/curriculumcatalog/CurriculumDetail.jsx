import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import AppNavbar from '../../student/Common/Navbar';
import Footer from '../../home/Footer';

const CurriculumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [curriculum, setCurriculum] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/cur.json`);
        const { curricula, courses: allCourses } = response.data;

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

  const handleAddToCart = () => {
    addToCart({
      id: curriculum.id,
      title: curriculum.title,
      description: curriculum.description,
      price: curriculum.price || 0,
    });
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AppNavbar />
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Curriculum Details */}
            <div>
              <h2 className="text-3xl font-bold mb-6">{curriculum.title}</h2>
              <p className="text-lg mb-4">{curriculum.description}</p>
              <p className="mb-4"><strong>Start Date:</strong> {curriculum.startDate}</p>
              <p className="mb-4"><strong>End Date:</strong> {curriculum.endDate}</p>
              <p className="mb-4"><strong>Instructors:</strong> {curriculum.instructors.join(', ')}</p>
              <p className="mb-4"><strong>Price:</strong> {curriculum.price || '0'}.00 ETB</p> {/* Curriculum Price */}

              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Right Section - Curriculum Image or Video */}
            <div>
              {curriculum.mediaUrl ? (
                curriculum.mediaType === 'video' ? (
                  <video controls className="w-full rounded-lg shadow-lg">
                    <source src={curriculum.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={curriculum.mediaUrl}
                    alt={curriculum.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                )
              ) : (
                <img
                  src={curriculum.image}
                  alt="Default"
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.length > 0 ? (
                courses.map(course => (
                  <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <a href={`/course/${course.id}`} className="text-blue-500 hover:underline">
                      <img
                        src={course.thumbnail || 'default-thumbnail.jpg'}
                        alt={course.title || 'No Title'}
                        className="mb-4 rounded-md"
                      />
                      <h3 className="text-xl font-semibold mb-2">{course.title || 'No Title'}</h3>
                      <p className="text-gray-600 mb-4">{course.description || 'No Description'}</p>
                      <span className="text-blue-500 hover:underline">View Details</span>
                    </a>
                  </div>
                ))
              ) : (
                <p>No Courses Available</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CurriculumDetail;
