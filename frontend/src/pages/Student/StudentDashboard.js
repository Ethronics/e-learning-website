import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import AppNavbar from '../../components/student/Common/Navbar';
import CourseProgressOverview from '../../components/student/Student Dashboard/CourseProgressOverview';
// import UpcomingLessons from '../../components/student/Student Dashboard/UpcomingLessonsDeadlines';
import RecentActivity from '../../components/student/Student Dashboard/RecentActivity';
import CertificatesEarned from '../../components/student/Student Dashboard/CertificatesEarned';
import Notifications from '../../components/student/Student Dashboard/Notifications';
// import PracticalSessionTracker from '../../components/student/Student Dashboard/PracticalSessionTracker';
import QuizPerformanceOverview from '../../components/student/Student Dashboard/QuizPerformanceOverview';
// import PersonalizedLearningPaths from '../../components/student/Student Dashboard/PersonalizedLearningPaths';
import NotificationModal from '../../components/student/Student Dashboard/NotificationModal';
import SettingsPage from '../../components/student/Student Dashboard/SettingsPage';
// import { fetchStudentData } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faCertificate,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import user from '../../assets/user1.png';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isExamNotificationOpen, setIsExamNotificationOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/sdas.json');  // Fetch data from api.json
        setStudentData(response.data.student);

        // Simulate exam notification
        setTimeout(() => {
          setIsExamNotificationOpen(true);
        }, 2000);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    getData();
  }, []);

  if (!studentData) return <div>Loading...</div>;

  const handleGoToExam = () => {
    // Redirect to exam page
    window.location.href = "/exam ";
  };

  const toggleContent = (content) => {
    setActiveContent((prevContent) => (prevContent === content ? null : content));
  };

  const renderActiveContent = () => {
    switch (activeContent) {
      case "notifications":
        return <Notifications notifications={studentData.notifications} />;
      case "settings":
        return <SettingsPage />;
      case "certificates":
        return <CertificatesEarned certificates={studentData.certificates} />;
      case "quizPerformance":
        return <QuizPerformanceOverview quizzes={studentData.quizPerformance} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AppNavbar />
      {/* Header with Profile Picture and Icons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={user}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4 cursor-pointer"
            onClick={() => navigate("/profile")} // Navigate to profile page on click
          />
          <h1 className="text-2xl font-bold">Welcome, {studentData.name}</h1>
        </div>
        <div className="flex space-x-4">
          <FontAwesomeIcon
            icon={faBell}
            size="lg"
            onClick={() => toggleContent("notifications")}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faCertificate}
            size="lg"
            onClick={() => toggleContent("certificates")}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faChartLine}
            size="lg"
            onClick={() => toggleContent("quizPerformance")}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faCog}
            size="lg"
            onClick={() => toggleContent("settings")}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Active Content Display */}
      {activeContent && (
        <div className="mb-4">
          {renderActiveContent()}
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseProgressOverview courses={studentData.courses} />
        <RecentActivity activities={studentData.recentActivity} />
        {/* <PersonalizedLearningPaths paths={studentData.personalizedLearningPaths} /> */}
        <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faBell} size="lg" className="mr-2" />
          <h2 className="text-lg font-semibold">New Exam Available</h2>
        </div>
        <p>A new exam has been posted. Would you like to take it now?</p>
        <div className="mt-4">
          <button
            onClick={handleGoToExam}
            className="btn btn-primary mr-2"
          >
            Go to Exam
          </button>
        </div>
      </div>
      </div>

      {/* Exam Notification Modal */}
     <NotificationModal
        isOpen={isExamNotificationOpen}
        onClose={() => setIsExamNotificationOpen(false)}
        onGoToExam={handleGoToExam}
      />
    </div> 
  );
};

export default StudentDashboard;
