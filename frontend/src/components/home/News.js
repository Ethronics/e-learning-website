import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './News.css';

const News = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api.json');
        // Slice the blogs array to get only the first 3 blogs
        const limitedBlogs = response.data.blogs.slice(0, 3);
        setBlogs(limitedBlogs);
      } catch (error) {
        console.error('Error fetching the blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="news" className="news-section">
      <Container>
        <h2 className="text-center mb-5">Latest News</h2>
        <Row>
          {blogs.map((blog) => (
            <Col key={blog.id} md={4}>
              <Card className="news-card">
                <Card.Img variant="top" src={blog.imageUrl} alt={blog.title} />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.excerpt}</Card.Text>
                  <Link to={`/blog/${blog.id}`}>
                    <button className="btn btn-primary">More</button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default News;
