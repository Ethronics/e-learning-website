import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/instructor/Dashboard/DashboardLayout';
import CourseOverview from '../../components/instructor/Dashboard/CourseOverview';
import CurriculumOverview from './CurriculumOverviewPage';

import StudentEngagementMetrics from '../../components/instructor/Dashboard/StudentEngagementMetrics';
import RecentActivityFeed from '../../components/instructor/Dashboard/RecentActivityFeed';
import QuickActionsPanel from '../../components/instructor/Dashboard/QuickActionsPanel';
import PracticalSessionScheduler from '../../components/instructor/Dashboard/PracticalSessionScheduler';
import LiveSessionLink from '../../components/instructor/Dashboard/LiveSessionLink';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [engagementData, setEngagementData] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/inst1.json');
        setCourses(response.data.courses);
        setEngagementData(response.data.engagementData);
        setRecentActivities(response.data.recentActivities);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <DashboardLayout>
      <StudentEngagementMetrics engagementData={engagementData} />
        <div className="container mx-auto p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CourseOverview courses={courses} />
            <CurriculumOverview />
            <RecentActivityFeed activities={recentActivities} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionsPanel />
            <PracticalSessionScheduler />
            <LiveSessionLink />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default InstructorDashboard;
