import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
// import AdminDashboard from './pages/Admin/AdminDashboard1';
// import StudentDashboard from './pages/Student/StudentDashboard';
// import InstructorDashboard from './pages/Instructor/InstructorDashboard1';
import AuthProvider from './context/AuthContext';
// import CourseCatalog from './components/home/CourseCatalog';
// import CourseDetail from './components/home/CourseDetail';
import CourseCatalog from './pages/Student/CourseCatalog';
import CourseDetail from './pages/Student/CourseDetailsPage';
import CurriculumDetail from './components/student/curriculumcatalog/CurriculumDetail';
// import InstructorProfilePage from './pages/Student/InstructorProfilePage'; 
import BlogList from './components/home/BlogList';
import SingleBlog from './components/home/SingleBlog';
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
          <Route path="/curriculum" element={<CourseCatalog />} /><Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:blogId" element={<SingleBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/curricula/:id" element={<CurriculumDetail />} />
          {/* <Route path="/instructors/:id" element={<InstructorProfilePage />} />  */}
      
          {/* <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/student/dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/instructor/dashboard" element={<PrivateRoute role="instructor"><InstructorDashboard /></PrivateRoute>} /> */}
          <Route path="/" element={<Navigate to="/home" />} />

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
