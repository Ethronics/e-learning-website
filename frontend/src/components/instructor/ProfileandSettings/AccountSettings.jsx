import React, { useState } from 'react';
import axios from 'axios';

const AccountSettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleNotificationChange = (e) => {
    setNotificationPreferences({ ...notificationPreferences, [e.target.name]: e.target.checked });
  };

  const handleSubmitPasswords = (e) => {
    e.preventDefault();
    // Submit the password change request to the API
    axios.put('/api/account/password', passwords)
      .then(response => console.log('Password updated:', response.data))
      .catch(error => console.error('Error updating password:', error));
  };

  const handleSubmitPreferences = (e) => {
    e.preventDefault();
    // Submit the notification preferences to the API
    axios.put('/api/account/notifications', notificationPreferences)
      .then(response => console.log('Preferences updated:', response.data))
      .catch(error => console.error('Error updating preferences:', error));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      <form onSubmit={handleSubmitPasswords}>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="mt-2 p-2 border rounded-lg w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Change Password</button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Two-Factor Authentication</h3>
        <label className="mt-4 inline-flex items-center">
          <input type="checkbox" checked={twoFactorEnabled} onChange={handleToggleTwoFactor} className="form-checkbox" />
          <span className="ml-2">Enable Two-Factor Authentication</span>
        </label>
      </div>

      <form onSubmit={handleSubmitPreferences} className="mt-8">
        <h3 className="text-lg font-bold">Notification Preferences</h3>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" name="emailNotifications" checked={notificationPreferences.emailNotifications} onChange={handleNotificationChange} className="form-checkbox" />
            <span className="ml-2">Email Notifications</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" name="smsNotifications" checked={notificationPreferences.smsNotifications} onChange={handleNotificationChange} className="form-checkbox" />
            <span className="ml-2">SMS Notifications</span>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Save Preferences</button>
      </form>
    </div>
  );
};

export default AccountSettings;
