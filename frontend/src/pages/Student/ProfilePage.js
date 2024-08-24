import React from 'react';
import PersonalInformation from '../../components/student/ProfilePage/PersonalInformation';
import PasswordSecurity from '../../components/student/ProfilePage/PasswordSecurity';
import ActivityLog from '../../components/student/ProfilePage/ActivityLog';
import AppNavbar from '../../components/student/Common/Navbar';
import Footer from '../../components/home/Footer';

const ProfilePage = () => {
  return (
    <div>
      <AppNavbar />
      <div className="container mx-auto py-12">
        <PersonalInformation />
        <hr className="my-12" />
        <PasswordSecurity />
        <hr className="my-12" />
        <ActivityLog />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
