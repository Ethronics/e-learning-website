import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './logo.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4}>
                      <div className='con1'>
                        <div className="about">
                            <a href="/about">
                            <div className='img2'>
                                <img
                                    src={logo}
                                    alt="E-Learn Logo"
                                    style={{ height: '40px' }} 
                                />
                                </div>
                                <div className='name1'>
                                <h5>
                                    <span className="black eth">ETHRONICS</span>
                                    <span className="white">INSTITUTE OF </span>
                                    <span className="orange">ROBOTICS </span>
                                    <span className="white">& </span>
                                    <span className="blue">AUTONOMOUS </span>
                                    <span className="blue">SYSTEMS</span>
                                </h5>
                                </div>
                            </a>
                        </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">about</a></li>
                            <li><a href="/" className="text-white">services</a></li>
                            <li><a href="/" className="text-white">privacy term</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: Ethronics@elearning.com</p>
                        <p>Phone: +251 9- - - - - - - -</p>
                        <div className="social-links">
                            <a href="https://www.linkedin.com" className="text-white me-3" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://www.youtube.com" className="text-white me-3" aria-label="YouTube">
                                <i className="bi bi-youtube"></i>
                            </a>
                            <a href="https://www.facebook.com" className="text-white me-3" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://github.com" className="text-white" aria-label="GitHub">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
