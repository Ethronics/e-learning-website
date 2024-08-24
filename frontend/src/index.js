
// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated for React 18+
// // import Admin from './Admin';
// // import Inst from './Instructor';
// import Auth from './Auth';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'; // Optional: if you have global styles

// // Create the root element
// const root = ReactDOM.createRoot(document.getElementById('root'));

// // Render the App component into the root element
// root.render(
//   <React.StrictMode>
//     <Auth />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Student from './Auth';
// import Student from './Admin';
// import Student from './Instructor';
// import Student from './student';
// import Student from './pages/Student/GradesAndCertificatesPage';
// import Student from './pages/Student/ExamPage';
// import Student from './pages/Exam';
// import Student from './pages/Student/CourseContentPage';
// import Student from './pages/cart';
// import Student from './pages/Student/CourseCatalog'
// import Student from './pages/Student/CourseDetailsPage'
// import Student from './Home';
import AuthProvider from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <Student />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

