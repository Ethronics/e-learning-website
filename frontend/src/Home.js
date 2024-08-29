
import React from 'react';
import AppNavbar from './components/home/Navbar';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import Courses from './components/home/Courses';
import News from './components/home/News';
import CurriculumHighlights from './components/home/CurriculumHighlights';
import InstructorSpotlight from './components/home/InstructorSpotlight';
import Testimonials from './components/home/Testimonials';
import Footer from './components/home/Footer';

function Home() {
  return (
   
    <div className="App">
      <AppNavbar />
      <Hero />
      <Features />
      <Courses />
      <InstructorSpotlight />
      <News />
      <Testimonials />
      <CurriculumHighlights />
      <Footer />
    </div>
  );
}

export default Home;
