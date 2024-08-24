import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalInformation = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    contactInfo: '',
    bio: '',
    address: '',
    fieldOfStudy: '',
    education: '',
    profilePicture: '',
  });

  useEffect(() => {
    // Fetch profile data from local api.json
    axios.get('/sdas.json')
      .then(response => {
        setProfileData(response.data.studentProfile);
      })
      .catch(error => console.error("Error fetching profile data:", error));
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload and set the profile picture URL
      setProfileData({ ...profileData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated profile data to the backend (or local api.json for now)
    axios.post('/api/updateProfile', profileData)
      .then(response => {
        alert("Profile updated successfully!");
      })
      .catch(error => console.error("Error updating profile:", error));
  };

  return (
    <div>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Student Profile</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
            <input type="file" onChange={handleProfilePictureUpload} />
            {profileData.profilePicture && (
              <img src={profileData.profilePicture} alt="Profile" className="mt-4 w-32 h-32 rounded-full" />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Contact Information</label>
            <input
              type="text"
              name="contactInfo"
              value={profileData.contactInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={profileData.fieldOfStudy}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Education</label>
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
