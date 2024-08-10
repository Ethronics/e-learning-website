// src/components/Features.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Features.css';

function Features() {
  return (
    <section id="features" className="features-section">
      <Container>
        <h2 className="text-center mb-5">Features</h2>
        <Row>
          <Col md={4}>
            <div className="feature-box text-center">
              <i className="icon fas fa-laptop-code"></i>
              <h3>Interactive Courses</h3>
              <p>Learn with interactive content and real-world examples.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box text-center">
              <i className="icon fas fa-chalkboard-teacher"></i>
              <h3>Expert Instructors</h3>
              <p>Learn from industry experts who bring their real-world experience to the classroom.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box text-center">
              <i className="icon fas fa-certificate"></i>
              <h3>Certifications</h3>
              <p>Get certified and improve your career prospects.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
