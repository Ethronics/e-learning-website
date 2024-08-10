import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import './CourseDetail.css';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get('/api2.json');
        const allCourses = res.data.curriculums.flatMap(curriculum => curriculum.courses);
        const selectedCourse = allCourses.find(course => course.id === parseInt(id));
        if (selectedCourse) {
          setCourse(selectedCourse);
        } else {
          setError('Course not found.');
        }
      } catch (err) {
        setError('Error fetching course details.');
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!course) return <div>Loading...</div>;

  return (
    
    <div>
      <Navigation />
      <Row>
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={course.image || 'https://via.placeholder.com/500x300'} />
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <p><strong>Price:</strong> ${course.price || 'Not available'}</p>
              <p><strong>Duration:</strong> {course.duration || 'Not available'} hours</p>
              <p><strong>Lessons:</strong> {course.lessons?.length || 0}</p>
              <Button variant="primary">Enroll Now</Button>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <h4>Syllabus</h4>
              <ListGroup variant="flush">
                {course.modules?.map(module => (
                  <ListGroup.Item key={module.id}>
                    <h5>{module.title}</h5>
                    <ul>
                      {module.lessons?.map(lesson => (
                        <li key={lesson.id}>{lesson.title}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img src={course.instructor?.image || 'https://via.placeholder.com/100'} roundedCircle />
                </Col>
                <Col md={8}>
                  <h4>{course.instructor?.name || 'Not available'}</h4>
                  <p><strong>Rating:</strong> {course.instructor?.rating || 'Not available'}</p>
                  <p><strong>Contact:</strong> {course.instructor?.contact || 'Not available'}</p>
                  <p><strong>Bio:</strong> {course.instructor?.bio || 'Not available'}</p>
                  <p><strong>Experience:</strong> {course.instructor?.experience || 'Not available'}</p>
                  <p><strong>Education:</strong> {course.instructor?.education || 'Not available'}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <h4>Related Courses</h4>
              <ul>
                {course.relatedCourses?.map(rc => (
                  <li key={rc.id}>
                    <Link to={`/courses/${rc.id}`}>{rc.name}</Link>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default CourseDetail;
