import React from 'react';
import { Card } from 'react-bootstrap';
import './CourseDetail.css';

const CourseTitleDescription = ({ title, description, tags }) => {
  return (
    <div>
<Card>
<Card.Img variant="top" src={'https://via.placeholder.com/500x300'} />
<Card.Body>
  <Card.Title>{title}</Card.Title>
  <Card.Text>{description}</Card.Text>
  <p><strong>Duration:</strong> {'Not available'} hours</p>

</Card.Body>
</Card>
    </div>
  );
};

export default CourseTitleDescription;
 
