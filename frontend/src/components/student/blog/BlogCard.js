
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const BlogCard = ({ title, excerpt, imageUrl, blogId }) => {
    return (
        <Card className="mb-4 d-flex flex-row" style={{ height: '150px', width: '100%' }}>
            <Card.Img variant="top" src={imageUrl} style={{ width: '150px', height: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between" style={{ paddingLeft: '20px' }}>
                <div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3em' }}>{excerpt}</Card.Text>
                </div>
                <Link to={`/blog1/${blogId}`}>
                    <a href='/blog1/${blogId'>More</a>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default BlogCard;

