import React   from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/ethlogo-1-137x137.png';
import user from '../../../assets/user1.png';


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
              <Nav.Link as={NavLink} to="/stdash" exact activeClassName="active">
                <Button className='btn-ln'>Dashboard</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/curriculum" activeClassName="active">
                <Button className='btn-ln'>Curriculums</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/schedules" activeClassName="active">
                <Button className='btn-ln'>Schedules</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/grades" activeClassName="active">
                <Button className='btn-ln'>Grades</Button>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blogs1" activeClassName="active">
                <Button className='btn-ln'>Blogs</Button>
              </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
          <div className="icons-section">
              <Dropdown alignRight>
                <Dropdown.Toggle as="div" className="profile-dropdown">
              
                <div className='img'>
        < img
              src={user}
              alt="E-Learn Logo"
              style={{ height: '60px', width: '60px', borderRadius: '50%'}} 
            />
        </div>
       
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
        </Container>
      </Navbar>

          </div>
  );
}

export default AppNavbar;
