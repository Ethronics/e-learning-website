
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Testimonials.css';
import prof from './prof.png';

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <Container>
        <h2 className="text-center mb-5">What Our Students Say</h2>
        <Row>
          <Col md={4}>
            <div className="testimonial text-center">
              <img src="../" alt="Student" />
              <p>"This platform has transformed my career!"</p>
              <h5>Biniyam</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className="testimonial text-center">
              <img src={prof} alt="Student" />
              <p>"The courses are well-structured and easy to follow."</p>
              <h5>Hayat</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className="testimonial text-center">
              <img src="path/to/student-photo.jpg" alt="Student" />
              <p>"I highly recommend this platform to anyone looking to learn."</p>
              <h5>Biruk</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
