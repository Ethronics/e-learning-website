import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function AppNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Name */}
        <div className='cont1'>
          <div className='img'>
            <img
              src={logo}
              alt="E-Learn Logo"
              style={{ height: '60px', width: '60px' }}
            />
          </div>
          <div className='name1'>
            <h4>
              <span className="black eth">ETHRONICS</span>
              <span className="black">INSTITUTE OF </span>
              <span className="orange">ROBOTICS </span>
              <span className="black">& </span>
              <span className="blue">AUTONOMOUS </span>
              <span className="blue">SYSTEMS</span>
            </h4>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-gray-600 hover:text-gray-800 sm:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Main Navigation */}
        <nav className={`sm:flex sm:items-center ${mobileMenuOpen ? "block" : "hidden"}`}>
          {/* Header Links */}
          <Link to="/" className={`block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800 ${isActiveLink("/") ? "active-link" : ""}`}>
            <Button className='btn-ln'>Home</Button>
          </Link>
          <Link to="/curriculum2" className={`block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800 ${isActiveLink("/curriculum2") ? "active-link" : ""}`}>
            <Button className='btn-ln'>Curriculums</Button>
          </Link>
          <Link to="/about" className={`block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800 ${isActiveLink("/about") ? "active-link" : ""}`}>
            <Button className='btn-ln'>About</Button>
          </Link>
          <Link to="/blogs" className={`block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800 ${isActiveLink("/blogs") ? "active-link" : ""}`}>
            <Button className='btn-ln'>Blogs</Button>
          </Link>
          <Link to="/login" className={`block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800 ${isActiveLink("/login") ? "active-link" : ""}`}>
            <Button variant="primary" className='btn'>Signin</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppNavbar;
