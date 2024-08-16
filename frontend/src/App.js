// src/App.js
import React from 'react';
import './App.css';
import AppNavbar from './components/Navbar';

function App() {
  return (
   
    <div className="App">
      <AppNavbar />
      <Hero />
      <Features />
      <Courses />
      <News />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
