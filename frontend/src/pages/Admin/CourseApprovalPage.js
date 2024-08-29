import React, { useState } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import PendingCoursesList from '../../components/admin/CourseApproval/PendingCoursesList';
import CoursePreview from '../../components/admin/CourseApproval/CoursePreview';
import ReviewTools from '../../components/admin/CourseApproval/ReviewTools';
import ApprovalWorkflow from '../../components/admin/CourseApproval/ApprovalWorkflow';
import NotificationSystem from '../../components/admin/CourseApproval/NotificationSystem';
import ApprovalHistory from '../../components/admin/CourseApproval/ApprovalHistory';

const CourseApprovalPage = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [notification, setNotification] = useState(null);

    const handleReviewComplete = (review) => {
        setReviewData(review);
    };

    const handleApprove = () => {
        setNotification({ type: 'success', text: 'Course approved successfully!' });
        // Handle approval logic, e.g., API call to update the course status
    };

    const handleReject = () => {
        setNotification({ type: 'error', text: 'Course rejected.' });
        // Handle rejection logic, e.g., API call to update the course status
    };

    const handleBack = () => {
        setSelectedCourse(null);
        setReviewData(null); // Clear review data when going back
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
            {notification && <NotificationSystem message={notification} />}
            
            {!selectedCourse ? (
                <div>
                    <PendingCoursesList onSelectCourse={setSelectedCourse} />
                    <ApprovalHistory />
                </div>
            ) : (
                <div>
                    <button 
                        onClick={handleBack} 
                        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            <CoursePreview course={selectedCourse} />
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <ReviewTools onReviewComplete={handleReviewComplete} />
                        </div>
                        <div className="col-span-full mt-6">
                            <ApprovalWorkflow
                                course={selectedCourse}
                                reviewData={reviewData}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
        </main>
        </div>
    </div>
    );
};

export default CourseApprovalPage;
