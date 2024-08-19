import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.css';
import logo from './logo.png'; // Adjust the path as needed

function AppNavbar() {
  return (
    <div className='header'>
      <Navbar expand="lg">
        <Container>
        
          <div className='cont1'>
                <div className='img'>
        < img
              src={logo}
              alt="E-Learn Logo"
              style={{ height: '60px', width: '60px'}} 
            />
        </div>
        <div className='name1'>
          <h4>
          <span className="black">ETHRONICS</span>                          
          <span className="black">- INSTITUTE OF </span>
          <span className="orange">ROBOTICS </span>
          <span className="black">& </span>
          <span className="blue">AUTONOMOUS </span>
          <span className="blue">SYSTEMS</span>
          </h4>
        </div>
        </div>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto custom-nav">
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">
                <Button className='btn-ln'>Home</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/curriculum" activeClassName="active">
                <Button className='btn-ln'>Curriculums</Button>
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
}

export default AppNavbar;
