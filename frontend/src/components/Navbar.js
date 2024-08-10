
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css';
import logo from './logo.png';

function AppNavbar() {
  return (
    <div className='header' >
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="E-Learn Logo"
            style={{ height: '40px' }} 
          />
          ETHRONICS E-Learn
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/"><Button className='btn-ln'>Home</Button></Nav.Link>
            <Nav.Link href="./courses"><Button className='btn-ln'>Courses</Button></Nav.Link>
            <Nav.Link href="#About"><Button className='btn-ln'>About</Button></Nav.Link>
            <Nav.Link href="#About"><Button className='btn-ln'>Blogs</Button></Nav.Link>
            <Nav.Link href="./login"><Button variant="primary" className='btn'>Signin</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AppNavbar;
