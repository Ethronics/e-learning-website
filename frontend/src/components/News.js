// src/components/News.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './News.css';
import blog from './blog.png'

function News() {
  return (
    <section id="news" className="news-section">
      <Container>
        <h2 className="text-center mb-5">Latest News</h2>
        <Row>
          <Col md={4}>
            <Card className="news-card">
              <Card.Img variant="top" src={blog} />
              <Card.Body>
                <Card.Title>News Title</Card.Title>
                <Card.Text>Stay updated with the latest news in the industry.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="news-card">
              <Card.Img variant="top" src={blog} />
              <Card.Body>
                <Card.Title>News Title</Card.Title>
                <Card.Text>Stay updated with the latest news in the industry.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="news-card">
              <Card.Img variant="top" src={blog} />
              <Card.Body>
                <Card.Title>News Title</Card.Title>
                <Card.Text>Stay updated with the latest news in the industry.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default News;
