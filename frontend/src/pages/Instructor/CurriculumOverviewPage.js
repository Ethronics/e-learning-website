import React from 'react';
import CurriculumDetails from '../../components/instructor/CurriculumOverview/CurriculumDetails';

const CurriculumOverview = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Curriculum Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-3">
          <CurriculumDetails />
        </div>
        
      </div>
    </div>
  );
};

export default CurriculumOverview;
