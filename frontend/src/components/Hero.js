// src/components/Hero.js
import React from 'react';
import { Button, Form, FormControl, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Hero.css';

function Hero() {
  return (
    <div className="hero-section">
      <Container className="text-center">
        <h1 className="display-4">Learn without limits</h1>
        <p className="lead"> <b>Getting Best Quality <br />Education’s know More Easier with<br />  <b>ETHRONICS E-Learn</b></b> </p>
        <Form className="search-form d-flex justify-content-center mt-4">
      <div className="input-group">
        <FormControl
          type="text"
          placeholder="Search for courses..."
          className="search-input"
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="bi bi-search"></i> {/* Search icon */}
          </span>
        </div>
      </div>
    </Form>
        <div className="get">
        <Button variant="primary" className="ml-2">
            Get Start
          </Button></div>
      </Container>
    </div>
  );
};

export default Hero;
