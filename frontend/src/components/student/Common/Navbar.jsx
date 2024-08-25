import React, { useState }   from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/ethlogo-1-137x137.png';
import user from '../../../assets/user1.png';

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
    <span className="black">ETHRONICS</span>                          
    <span className="black">- INSTITUTE OF </span>
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
      <Link to="/stdash" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Dashboard</Button>
      </Link>
      <Link to="/curriculum" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Curriculums</Button>
      </Link>
      <Link to="/schedules" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Schedules</Button>
      </Link>
      <Link to="/grades" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Grades</Button>
      </Link>
      <Link to="/blogs1" className="block mt-2 sm:mt-0 sm:ml-4 text-gray-600 hover:text-gray-800">
      <Button className='btn-ln'>Blogs</Button>
      </Link>
     
      
      {/* Profile Dropdown */}
      <div className="relative mt-2 sm:mt-0 sm:ml-4">
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-gray-800 flex items-center focus:outline-none"
        >
          <img src={user} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="ml-2 hidden sm:block">Instructor</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
            <Link
              to="/profile"
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
