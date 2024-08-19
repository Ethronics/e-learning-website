import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import CourseTitleDescription from '../../components/student/CourseDetails/CourseTitleAndDescription';
import InstructorDetails from '../../components/student/CourseDetails/InstructorDetails';
import CourseContentOutline from '../../components/student/CourseDetails/CourseContentOutline';
import Prerequisites from '../../components/student/CourseDetails/Prerequisites';
import Reviews from '../../components/student/CourseDetails/Reviews';
import EnrollmentButton from '../../components/student/CourseDetails/EnrollmentButton';
import RelatedCourses from '../../components/student/CourseDetails/RelatedCourses';
import UpcomingSessions from '../../components/student/CourseDetails/UpcomingPracticalSessions';
import '../../components/student/CourseDetails/CourseDetail.css'; 

const CourseDetailsPage = () => {
    const { id } = useParams();
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
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!course) return <div>No course data available</div>;
  
    return (
        <div>
            <AppNavbar />
        <div className="container mt-4">
          <div className="sticky-top mb-4">
            <EnrollmentButton cta="Enroll Now" promoCodes={course.promoCodes} />
          </div>
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
          <Prerequisites 
            prerequisites={course.prerequisites}
            preparatoryCourses={course.preparatoryCourses}
          />
          <Reviews reviews={course.reviews} />
          <RelatedCourses relatedCourses={course.relatedCourses} />
          <UpcomingSessions upcomingSessions={course.upcomingSessions} />
        </div>
        <Footer />
        </div>
      );

    };

export default CourseDetailsPage;
