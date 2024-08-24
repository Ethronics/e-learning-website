
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import AppNavbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import CourseTitleDescription from './CourseDetails/CourseTitleAndDescription';
import InstructorDetails from './CourseDetails/InstructorDetails';
import CourseContentOutline from './CourseDetails/CourseContentOutline';
import Reviews from './CourseDetails/Reviews';
import RelatedCourses from './CourseDetails/RelatedCourses';
import UpcomingSessions from './CourseDetails/UpcomingPracticalSessions';
import './CourseDetails/CourseDetail.css'; 

const CourseDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Use useNavigate for navigation in React Router v6
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get('/ap.json');
          const courses = response.data.courses1;
  
          const courseDetails = courses.find(course => course.id === parseInt(id, 10));
          if (courseDetails) {
            setCourse(courseDetails);
          } else {
            setError('Course not found.');
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching course details:', error);
          setError('Failed to load course details.');
          setLoading(false);
        }
      };
  
      fetchCourseDetails();
    }, [id]);
  
    const handleEnrollClick = () => {
        navigate(`/login`);  // Navigate to Course Content Page
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!course) return <div>No course data available</div>;
  
    return (
        <div>
            <AppNavbar />
        <div className="container mt-4">
          <Row>
            <Col md={8}>
              <CourseTitleDescription 
                title={course.title}
                description={course.description}
                tags={course.tags}
              />
            </Col>
            <Col md={4}>
              <InstructorDetails instructor={course.instructor} />
            </Col>
          </Row>
          <CourseContentOutline contentOutline={course.contentOutline} />
          <Reviews reviews={course.reviews} />
          <RelatedCourses relatedCourses={course.relatedCourses} />
          <UpcomingSessions upcomingSessions={course.upcomingSessions} />
        </div>
        <div style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            zIndex: 1000
        }}>
            <button className="btn btn-primary" onClick={handleEnrollClick}>
                Enroll Now
            </button>
        </div>
        <Footer />

        {/* Fixed "Enroll Now" Button */}
        

        </div>
      );
    };

export default CourseDetailsPage;

