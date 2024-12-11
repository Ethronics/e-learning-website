// src/pages/Admin/UserManagementPage.js
import React, { useState } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import UserDirectory from '../../components/admin/UserManagement/UserDirectory';
import UserDetail from '../../components/admin/UserManagement/UserDetail';

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBack = () => {
    setSelectedUser(null);
};
const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
};

return (
   <div className="flex">
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
            <Header OpenSidebar={OpenSidebar} />
            <main className="p-6">
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
    </main>
        </div>
    </div>
  );
};

export default UserManagementPage;
