import React, { useState } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import ExamPool from '../../components/admin/ExamManagement/ExamPool';
import ApprovalWorkflow from '../../components/admin/ExamManagement/ApprovalWorkflow';
import CheatingPreventionSettings from '../../components/admin/ExamManagement/CheatingPreventionSettings';
import ComplaintResolution from '../../components/admin/ExamManagement/ComplaintResolution';
import StatisticsReports from '../../components/admin/ExamManagement/StatisticsAndReports';
import RealTimeExamMonitoring from '../../components/admin/ExamManagement/RealTimeExamMonitoring';
import DetailedCourseExamManagement from '../../components/admin/ExamManagement/DetailedCourseExamManagement';

function ExamManagementPage() {
    const [selectedSection, setSelectedSection] = useState('All');

    const renderSection = () => {
        switch (selectedSection) {
            case 'Exam Pool':
                return <ExamPool />;
            case 'Approval Workflow':
                return <ApprovalWorkflow />;
            case 'Cheating Prevention':
                return <CheatingPreventionSettings />;
            case 'Complaint Resolution':
                return <ComplaintResolution />;
            case 'Statistics Reports':
                return <StatisticsReports />;
            case 'Real-Time Monitoring':
                return <RealTimeExamMonitoring />;
            case 'Course Exam Management':
                return <DetailedCourseExamManagement />;
            default:
                return (
                    <>
                        <ExamPool />
                        <ApprovalWorkflow />
                        <CheatingPreventionSettings />
                        <ComplaintResolution />
                        <StatisticsReports />
                        <RealTimeExamMonitoring />
                        <DetailedCourseExamManagement />
                    </>
                );
        }
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
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Exam Management</h1>
                <div>
                    <select 
                        value={selectedSection} 
                        onChange={(e) => setSelectedSection(e.target.value)} 
                        className="p-2 border rounded"
                    >
                        <option value="All">All Sections</option>
                        <option value="Exam Pool">Exam Pool</option>
                        <option value="Approval Workflow">Approval Workflow</option>
                        <option value="Cheating Prevention">Cheating Prevention</option>
                        <option value="Complaint Resolution">Complaint Resolution</option>
                        <option value="Statistics Reports">Statistics Reports</option>
                        <option value="Real-Time Monitoring">Real-Time Monitoring</option>
                        <option value="Course Exam Management">Course Exam Management</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1">
                {renderSection()}
            </div>
        </div>
        </main>
        </div>
    </div>
    );
}

export default ExamManagementPage;
