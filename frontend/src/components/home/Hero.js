// src/components/Hero.js
import React from 'react';
import { Button, FormControl, Container, InputGroup } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import './Hero.css';

function Hero() {
  return (
    <div className="hero-section">
      <Container className="text-center">
        <h1 className="display-4">Learn without limits</h1>
        <p className="lead">
          <b>Getting Best Quality <br />Education’s now More Easier with<br /> <b>ETHRONICS</b></b>
        </p>

        <InputGroup className="mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <FormControl
            type="text"
            placeholder="What do you want to learn?"
            aria-label="Search"
            aria-describedby="search-button"
            style={{
              fontSize: '20px',
              borderRadius: '10px 0 0 10px',
              border: '1px solid black',
              color: 'black',
              height: '45px', // Set explicit height
              padding: '0 10px'
            }}
          />
          <Button
            variant="primary"
            id="search-button"
            style={{
              borderRadius: '0 10px 10px 0',
              backgroundColor: '#6769B2',
              borderColor: '#6769B2',
              height: '45px', // Match the height with FormControl
              padding: '0 15px', // Adjust padding for a better look
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaSearch />
          </Button>
        </InputGroup>

        <div className="get">
          <Button variant="primary" className="ml-2">
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
