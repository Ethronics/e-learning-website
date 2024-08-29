import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/ethlogo-1-137x137.png';
import prof from '../../../assets/instmen1.png';
import './Navbar.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function AppNavbar() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return(
  <header className="sticky top-0 shadow-md z-50 ">
  <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    {/* Logo and Name */}
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
      <Link to="/instdash" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Dashboard</Button>
      </Link>
      <Link to="/coursesi" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Courses</Button>
      </Link>
      <Link to="/create-exam" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Create Exam</Button>
      </Link>
      <Link to="/create-quiz" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Create Quiz</Button>
      </Link>
      <Link to="/question-bank" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Exam Bank</Button>
      </Link>
      <Link to="/gradeform" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Grade Form</Button>
          </Link>
      {/* Profile Dropdown */}
      <div className="relative mt-2 sm:mt-0 sm:ml-4">
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-gray-800 flex items-center focus:outline-none"
        >
          <img src={prof} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="ml-2 hidden sm:block">Instructor</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
            <Link
              to="/profilei"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  </div>
</header>

  );
}

export default AppNavbar;