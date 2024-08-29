import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/admin/Common/Sidebar';
import Header from './components/admin/Common/Navbar';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagementPage from './pages/Admin/UserManagementPage';
import CourseApprovalPage from './pages/Admin/CourseApprovalPage';
 
import ExamManagementPage from './pages/Admin/ExamManagementPage';
 
import BlogManagementPage from './pages/Admin/BlogManagementPage';
import AddUserPage from './pages/Admin/AddUser';
// import NotificationManagementPage from './pages/Admin/NotificationManagementPage';
import CurriculumManagementPage from './pages/Admin/CurriculumManagementPage';
import PaymentList from './pages/Admin/PaymentList';
import PaymentApproval from './pages/Admin/PaymentApproval';

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
          <Header OpenSidebar={OpenSidebar} />
          <main className="p-6">
          <Routes>
                    <Route path="/admindash" element={<AdminDashboard />} />
                    <Route path="/adminusers" element={<UserManagementPage />} />
                    <Route path="/coursesapp" element={<CourseApprovalPage />} />
                    <Route path="/admin/payments/:transactionId" element={<PaymentApproval />} />
                    <Route path="/admincurriculum" element={<CurriculumManagementPage />} />
                    <Route path="/adminexams" element={<ExamManagementPage />} />
                    <Route
                      path="/admin/payments"
                      element={<PaymentList onViewDetails={(transactionId) => {
                        window.location.href = `/admin/payments/${transactionId}`;
                      }} />}
                    />
                    <Route path="/blog-news" element={<BlogManagementPage />} />
                    <Route path="/adduser" element={<AddUserPage />} />
                  </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default Admin;
