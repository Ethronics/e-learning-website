import React, { useState } from 'react';
import CreateCurriculumForm from '../../components/admin/CurriculumManagement/CreateCurriculumForm';
import CurriculumList from '../../components/admin/CurriculumManagement/CurriculumList';
import CourseManagement from '../../components/admin/CurriculumManagement/CourseManagement';

const CurriculumManagementPage = () => {
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);

    return (
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
    );
};

export default CurriculumManagementPage;
