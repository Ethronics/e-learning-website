import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  // const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debugging: Check if userId is being captured correctly
    console.log('Fetching profile for userId:', userId);

    // Use a relative path to access the local JSON file
    axios.get('/user.json')
      .then(response => {
        console.log('Fetched data:', response.data);

        // Ensure userId is treated as a string
        const userData = response.data.users.find(u => u.id === userId);

        if (!userData) {
          setError('User not found');
        } else {
          setUser(userData);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
      });
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="widget p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{user.name}'s Profile</h2>
      <div className="flex items-center mb-4">
        <img
          src={`/Images/${userId}.png`} // Assuming profile images are named by userId
          alt={`${user.name}'s Profile`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
