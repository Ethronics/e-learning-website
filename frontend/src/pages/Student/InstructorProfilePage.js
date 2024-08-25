import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import ProfilePhotoAndBio from '../../components/student/InstructorProfile/ProfilePhotoAndBio';
import CoursesOffered from '../../components/student/InstructorProfile/CoursesOffered';
import RatingsAndReviews from '../../components/student/InstructorProfile/RatingsAndReviews';
import SocialMediaLinks from '../../components/student/InstructorProfile/SocialMediaLinks';
import PracticalSessionSchedule from '../../components/student/InstructorProfile/PracticalSessionSchedule';
import InstructorStudentInteractionHistory from '../../components/student/InstructorProfile/InstructorStudentInteractionHistory';

const InstructorProfilePage = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const response = await axios.get('/ap.json'); // Update path as necessary
        const instructors = response.data.instructors;
        const instructorDetails = instructors.find(inst => inst.id === parseInt(id, 10));
        if (instructorDetails) {
          setInstructor(instructorDetails);
        } else {
          setError('Instructor not found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructor details:', error);
        setError('Failed to load instructor details.');
        setLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!instructor) return <div>No instructor data available</div>;

  return (
    <div>
        <AppNavbar />
    <div className="instructor-profile container mx-auto p-4">
      <ProfilePhotoAndBio
        photo={instructor.photo}
        bio={instructor.bio}
        background={instructor.background}
        teachingPhilosophy={instructor.teachingPhilosophy}
        socialLinks={instructor.socialLinks}
      />
      <CoursesOffered courses={instructor.courses} />
      <RatingsAndReviews ratings={instructor.ratings} reviews={instructor.reviews} />
      <SocialMediaLinks links={instructor.socialLinks} />
      <PracticalSessionSchedule sessions={instructor.practicalSessions} />
      <InstructorStudentInteractionHistory interactions={instructor.interactions} />
    </div>
    <Footer />
    </div>
  );
};

export default InstructorProfilePage;
