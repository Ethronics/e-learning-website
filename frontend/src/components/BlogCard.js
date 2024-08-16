
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const BlogCard = ({ title, excerpt, imageUrl, blogId }) => {
    return (
        <Card className="mb-4">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{excerpt}</Card.Text>
                <Link to={`/blog/${blogId}`}>
                    <Button variant="primary">Read More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default BlogCard;
