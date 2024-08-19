import React from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import './CourseDetail.css';

const CourseTitleDescription = ({ title, description, tags }) => {
  return (
    <div>
<Card>
<Card.Img variant="top" src={'https://via.placeholder.com/500x300'} />
<Card.Body>
  <Card.Title>{title}</Card.Title>
  <Card.Text>{description}</Card.Text>
  <p><strong>Price:</strong> ${'Not available'}</p>
  <p><strong>Duration:</strong> {'Not available'} hours</p>
  
  <Button variant="primary">Enroll Now</Button>
</Card.Body>
</Card>
    </div>
  );
};

export default CourseTitleDescription;
 
