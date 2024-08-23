import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
// import AdminDashboard from './pages/Admin/AdminDashboard1';
import StudentDashboard from './pages/Student/StudentDashboard';
 //guess
import CourseCatalog2 from './components/Gues/CourseCatalog';
import CourseDetail2 from './components/Gues/CourseDetailsPage';
import CurriculumDetail2 from './components/Gues/curriculumcatalog/CurriculumDetail';
import BlogList2 from './components/home/BlogList';
import SingleBlog2 from './components/home/SingleBlog';

import AuthProvider from './context/AuthContext';
// student
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
// import StudentGrades from './pages/Student/StudentGrades';
import ExamPage from './pages/Student/Exam';

// intructors Page
 
import InstructorDashboard from './pages/Instructor/InstructorDashboard1';
import QuizCreationPage from './pages/Instructor/QuizCreationPage';
import CourseDetail1 from './pages/Instructor/CourseDetail';
import EnrolledStudents from './pages/Instructor/EnrolledStudents';
import NotificationsAndMessaging from './pages/Instructor/NotificationsAndMessaging';
import ProfileAndSettings from './pages/Instructor/ProfileSetting';
import CourseManagement from './pages/Instructor/ContentEditor';
import StudentDetail from './pages/Instructor/StudentDetail';
import GradeSubmission from './pages/Instructor/GradeSubmission';
 
import StudentManagement from './pages/Instructor/StudentManagement';
import QuestionBank from './pages/Instructor/QuestionBank';
import ExamCreation from './pages/Instructor/ExamCreation';
import ExamScheduling from './pages/Instructor/ExamScheduling';
import GradingInterface from './pages/Instructor/GradingInterface';

import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = () => {
  const { loadUserFromStorage } = useContext(AuthContext);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
        
          <Route path="/curriculum2" element={<CourseCatalog2 />} />
          <Route path="/course2/:id" element={<CourseDetail2 />} />
          <Route path="/curricula2/:id" element={<CurriculumDetail2 />} />
          <Route path="/blogs" element={<BlogList2 />} />
          <Route path="/blog/:blogId" element={<SingleBlog2 />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
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
          {/* <Route path="/grades" element={<StudentGrades />} /> */}
          {/* <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} /> */}
          <Route path="/student/dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/instructor/dashboard" element={<PrivateRoute role="instructor"><InstructorDashboard /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/home" />} />
          
         {/* instructor routes */}
         <Route path="/instdash" element={<InstructorDashboard />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail1 />} />
        <Route path="/courses/:courseId/students/:studentId/grade" element={<GradeSubmission />} />
        <Route path="/courses/:courseId/students/:studentId" element={<StudentDetail />} />
        {/* <Route path="/courses/:courseId/students/:studentId/grades" element={<StudentGrades />} /> */}
        <Route path="/course-students/:courseId" element={<EnrolledStudents />} />
        <Route path="/courses/:courseId/students" element={<StudentManagement />} />
        <Route path="/create-quiz" element={<QuizCreationPage />} />
        <Route path="/notifications" element={<NotificationsAndMessaging />} />
        <Route path="/profile" element={<ProfileAndSettings />} />
        <Route path="/course-management/:courseId" element={<CourseManagement />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/create-exam" element={<ExamCreation />} />
        <Route path="/schedule-exam" element={<ExamScheduling />} />
        <Route path="/grading" element={<GradingInterface />} />

          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;
