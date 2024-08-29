import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import StudentDashboard from './pages/Student/StudentDashboard';
import CourseCatalog2 from './components/Gues/CourseCatalog';
import CourseDetail2 from './components/Gues/CourseDetailsPage';
import CurriculumDetail2 from './components/Gues/curriculumcatalog/CurriculumDetail';
import BlogList2 from './components/home/BlogList';
import SingleBlog2 from './components/home/SingleBlog';

import AuthProvider from './context/AuthContext';

// Student Pages
import CourseCatalog from './pages/Student/CourseCatalog';
import CourseDetail from './pages/Student/CourseDetailsPage';
import CurriculumDetail from './components/student/curriculumcatalog/CurriculumDetail';
import CourseContentPage from './pages/Student/CourseContentPage';
import CartPage from './pages/Student/cart';
import PaymentPage from './pages/Student/PaymentPage';
import InstructorProfilePage from './pages/Student/InstructorProfilePage';
import BlogList from './components/student/blog/BlogList';
import SingleBlog from './components/student/blog/SingleBlog';
import ProfilePage from './pages/Student/ProfilePage';
import ExamPage from './pages/Student/Exam';

// Instructor Pages
import InstructorDashboard from './pages/Instructor/InstructorDashboard1';
import QuizCreationPage from './pages/Instructor/QuizCreationPage';
import Coursesi from './pages/Instructor/CourseOverview';
import CourseDetail1 from './pages/Instructor/CourseDetail';
import EnrolledStudents from './pages/Instructor/EnrolledStudents';
import ProfileAndSettings from './pages/Instructor/ProfileSetting';
import CourseManagement from './pages/Instructor/ContentEditor';
import StudentDetail from './pages/Instructor/StudentDetail';
import GradeSubmission from './pages/Instructor/GradeSubmission';
import StudentManagement from './pages/Instructor/StudentManagement';
import QuestionBank from './pages/Instructor/QuestionBank';
import ExamCreation from './pages/Instructor/ExamCreation';
import ExamScheduling from './pages/Instructor/ExamScheduling';

// Admin Pages
import Sidebar from './components/admin/Common/Sidebar';
import Header from './components/admin/Common/Navbar';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagementPage';
import CourseApproval from './pages/Admin/CourseApprovalPage';
import ExamManagement from './pages/Admin/ExamManagementPage';
import BlogNewsManagement from './pages/Admin/BlogManagementPage';
import RBACPage from './pages/Admin/AddUser';
import CurriculumManagementPage from './pages/Admin/CurriculumManagementPage';
import PaymentList from './pages/Admin/PaymentList';
import PaymentManagement from './pages/Admin/PaymentApproval';

import 'bootstrap/dist/css/bootstrap.min.css';

function Auth() {
  const { loadUserFromStorage, user } = useContext(AuthContext);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />

          {/* Guest Routes */}
          <Route path="/curriculum2" element={<CourseCatalog2 />} />
          <Route path="/course2/:id" element={<CourseDetail2 />} />
          <Route path="/curricula2/:id" element={<CurriculumDetail2 />} />
          <Route path="/blogs" element={<BlogList2 />} />
          <Route path="/blog/:blogId" element={<SingleBlog2 />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Student Routes */}
          {user?.role === 'student' && (
            <>
              <Route path="/stdash" element={<StudentDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blogs1" element={<BlogList />} />
              <Route path="/blog1/:blogId" element={<SingleBlog />} />
              <Route path="/curriculum" element={<CourseCatalog />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/curricula/:id" element={<CurriculumDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/instructors/:id" element={<InstructorProfilePage />} />
              <Route path="/content" element={<CourseContentPage />} />
              <Route path="/exam" element={<ExamPage />} />
            </>
          )}

          {/* Instructor Routes */}
          {user?.role === 'instructor' && (
            <>
              <Route path="/instdash" element={<InstructorDashboard />} />
              <Route path="/coursesi" element={<Coursesi />} />
              <Route path="/course-detail/:courseId" element={<CourseDetail1 />} />
              <Route path="/courses/:courseId/students/:studentId/grade" element={<GradeSubmission />} />
              <Route path="/courses/:courseId/students/:studentId" element={<StudentDetail />} />
              <Route path="/course-students/:courseId" element={<EnrolledStudents />} />
              <Route path="/courses/:courseId/students" element={<StudentManagement />} />
              <Route path="/create-quiz" element={<QuizCreationPage />} />
              <Route path="/profilei" element={<ProfileAndSettings />} />
              <Route path="/course-management/:courseId" element={<CourseManagement />} />
              <Route path="/question-bank" element={<QuestionBank />} />
              <Route path="/create-exam" element={<ExamCreation />} />
              <Route path="/schedule-exam" element={<ExamScheduling />} />
            </>
          )}

          {/* Admin Routes */}
          {user?.role === 'admin' && (
            <div className="flex">
              {/* Sidebar */}
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
                <Header OpenSidebar={OpenSidebar} />
                <main className="p-6">
                  <Routes>
                    <Route path="/admindash" element={<AdminDashboard />} />
                    <Route path="/adminusers" element={<UserManagement />} />
                    <Route path="/coursesapp" element={<CourseApproval />} />
                    <Route path="/admin/payments/:transactionId" element={<PaymentManagement />} />
                    <Route path="/admincurriculum" element={<CurriculumManagementPage />} />
                    <Route path="/adminexams" element={<ExamManagement />} />
                    <Route
                      path="/admin/payments"
                      element={<PaymentList onViewDetails={(transactionId) => {
                        window.location.href = `/admin/payments/${transactionId}`;
                      }} />}
                    />
                    <Route path="/blog-news" element={<BlogNewsManagement />} />
                    <Route path="/adduser" element={<RBACPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          )}

          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Auth;