// src/components/admin/UserManagement/UserDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import RoleManagement from './RoleManagement';
import AccountStatusControls from './AccountStatusControls';
import ActivityLogs from './ActivityLogs';

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user data from user.json based on userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user.json');
        const users = response.data.users;
        const selectedUser = users.find(user => user.id === userId);

        if (selectedUser) {
          setUser(selectedUser);
        } else {
          setError('User not found');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* User Profile */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <UserProfile userId={userId} user={user} />
      </div>
      
      {/* Role Management */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <RoleManagement userId={userId} currentRole={user.role} />
      </div>
      
      {/* Account Status Controls */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <AccountStatusControls userId={userId} currentStatus={user.status} />
      </div>
      
      {/* Activity Logs */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <ActivityLogs userId={userId} activityHistory={user.activityHistory} />
      </div>
    </div>
  );
};

export default UserDetail;
