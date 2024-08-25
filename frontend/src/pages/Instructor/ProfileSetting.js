import React, { useState } from 'react';
import ProfileInformation from '../../components/instructor/ProfileandSettings/ProfileInformation';
import AccountSettings from '../../components/instructor/ProfileandSettings/AccountSettings';
import PermissionsReview from '../../components/instructor/ProfileandSettings/PermissionsReview';
import Navigation from '../../components/instructor/Common/Navbar';
import prof from '../../assets/instmen1.png';
import axios from 'axios';

const ProfileSetting = () => {
  const [activeSection, setActiveSection] = useState('profile'); 
  const [profileData, setProfileData] = useState({
    profilePicture: prof, 
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileData({ ...profileData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the profile picture to the backend or local storage
    if (selectedFile) {
      const updatedProfileData = { ...profileData, profilePicture: URL.createObjectURL(selectedFile) };
      setProfileData(updatedProfileData);

      // Simulate an API call
      axios.post('/api/updateProfile', updatedProfileData)
        .then(response => {
          alert("Profile updated successfully!");
        })
        .catch(error => console.error("Error updating profile:", error));
    } else {
      alert("No changes were made.");
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileInformation />;
      case 'account':
        return <AccountSettings />;
      case 'permissions':
        return <PermissionsReview />;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Profile & Settings</h1>
        
        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
          <input type="file" onChange={handleProfilePictureUpload} />
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="mt-4 w-32 h-32 rounded-full object-cover"
          />
        </div>
        
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          Save
        </button>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-4 py-2 rounded-full ${
              activeSection === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveSection('account')}
            className={`px-4 py-2 rounded-full ${
              activeSection === 'account' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setActiveSection('permissions')}
            className={`px-4 py-2 rounded-full ${
              activeSection === 'permissions' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Permissions Review
          </button>
        </div>

        {/* Render the selected section */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
