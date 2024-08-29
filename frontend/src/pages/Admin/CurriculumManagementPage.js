import React, { useState } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import CreateCurriculumForm from '../../components/admin/CurriculumManagement/CreateCurriculumForm';
import CurriculumList from '../../components/admin/CurriculumManagement/CurriculumList';
import CourseManagement from '../../components/admin/CurriculumManagement/CourseManagement';

const CurriculumManagementPage = () => {
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);

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
            <h1 className="text-2xl font-bold mb-6">Curriculum Management</h1>
            
            <CreateCurriculumForm />

            <div className="mt-8">
                <CurriculumList onSelectCurriculum={(curriculumId) => setSelectedCurriculum(curriculumId)} />
            </div>

            {selectedCurriculum && (
                <div className="mt-8">
                    <CourseManagement curriculumId={selectedCurriculum} />
                </div>
            )}
        </div>
        </main>
        </div>
    </div>
    );
};

export default CurriculumManagementPage;
