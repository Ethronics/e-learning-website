
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
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">
                <Button className='btn-ln'>Home</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/courses" activeClassName="active">
                <Button className='btn-ln'>Courses</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" activeClassName="active">
                <Button className='btn-ln'>About</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blogs" activeClassName="active">
                <Button className='btn-ln'>Blogs</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" activeClassName="active">
                <Button variant="primary" className='btn'>Signin</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AppNavbar;
