
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Courses.css';
import robotics from './robotics.png'
import python from './python.png'
import react from './react.png'


function Courses() {
  return (
    <section id="courses" className="courses-section">
      <Container>
        <h2 className="text-center mb-5">Popular Courses</h2>
        <Row>
          <Col md={4}>
            <Card className="course-card">
              <Card.Img variant="top" src={robotics}/>
              <Card.Body>
                <Card.Title>Robotics</Card.Title>
                <Card.Text>Learn the basics of Robotics with this comprehensive course.</Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="course-card">
              <Card.Img variant="top" src={python} />
              <Card.Body>
                <Card.Title>Pyton</Card.Title>
                <Card.Text>Learn the basics of pyton with this comprehensive course.</Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="course-card">
              <Card.Img variant="top" src={react} />
              <Card.Body>
                <Card.Title>React</Card.Title>
                <Card.Text>Learn the React development with this comprehensive course.</Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
