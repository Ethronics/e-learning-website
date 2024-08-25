import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileInformation = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profilePicture: ''
  });

  useEffect(() => {
    // Fetch the current profile information from API
    axios.get('/api.json')
      .then(response => setProfile(response.data.profile))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the updated profile data to API
    axios.put('/api/profile', profile)
      .then(response => console.log('Profile updated:', response.data))
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input type="text" name="address" value={profile.address} onChange={handleChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea name="bio" value={profile.bio} onChange={handleChange} className="mt-2 p-2 border rounded-lg w-full"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileInformation;
