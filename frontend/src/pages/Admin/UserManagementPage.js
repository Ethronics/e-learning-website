// src/pages/Admin/UserManagementPage.js
import React, { useState } from 'react';
import UserDirectory from '../../components/admin/UserManagement/UserDirectory';
import UserDetail from '../../components/admin/UserManagement/UserDetail';

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBack = () => {
    setSelectedUser(null);
};
  return (
    <div className="container mx-auto p-6">
      
     {!selectedUser ? (
           <div >
        <UserDirectory onSelectUser={setSelectedUser} />
      </div>
     ) : (
      <div>
      <button 
                        onClick={handleBack} 
                        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>
       <div>
         <UserDetail userId={selectedUser.id} />
       </div>
       </div>
      )}
    </div>

  );
};

export default UserManagementPage;
