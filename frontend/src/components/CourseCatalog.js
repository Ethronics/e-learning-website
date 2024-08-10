import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import './CourseCatalog.css';

const CourseCatalog = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        // Adjust URL of api and start  your server
        const res = await axios.get('/api1.json'); 

        if (res.data && Array.isArray(res.data.curriculums)) {
          setCurriculums(res.data.curriculums);
          setAllCourses(res.data.curriculums.flatMap(curriculum => curriculum.courses));
          setCourses(res.data.curriculums.flatMap(curriculum => curriculum.courses));
        } else {
          console.error('Unexpected data format for curriculums:', res.data);
        }
      } catch (error) {
        console.error('Error fetching curriculums:', error);
      }
    };
    fetchCurriculums();
  }, []);

  const handleCurriculumClick = (curriculum) => {
    setSelectedCurriculum(curriculum);
    // Filter courses based on the selected curriculum
    setCourses(curriculum.courses);
  };

  const handleShowAllCourses = () => {
    setSelectedCurriculum(null);
    setCourses(allCourses);
  };

  return (
      <div>
      <Navigation />
      <Row>
        <Col md={3} className="sidebar">
          <h5>Curriculums</h5>
          <ul className="list-group">
            <li 
              className={`list-group-item ${selectedCurriculum === null ? 'active' : ''}`} 
              onClick={handleShowAllCourses}
              style={{ cursor: 'pointer' }}
            >
              All Courses
            </li>
            {curriculums.map(curriculum => (
              <li 
                key={curriculum.id} 
                className={`list-group-item ${selectedCurriculum?.id === curriculum.id ? 'active' : ''}`} 
                onClick={() => handleCurriculumClick(curriculum)}
                style={{ cursor: 'pointer' }}
              >
                {curriculum.name}
              </li>
            ))}
          </ul>
        </Col>
        <Col md={9}>
          <Row>
            {courses.length > 0 ? (
              courses.map(course => (
                <Col key={course.id} md={6} lg={4}>
                  <Card className="mb-4">
                    <Card.Img variant="top" src={course.image || 'https://via.placeholder.com/150'} />
                    <Card.Body>
                      <Card.Title>{course.name}</Card.Title>
                      <Card.Text>{course.description}</Card.Text>
                      <Link to={`/courses/${course.id}`}>View Course</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>Select a curriculum to view courses.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Footer />
      </div>
    
  );
};

export default CourseCatalog;
