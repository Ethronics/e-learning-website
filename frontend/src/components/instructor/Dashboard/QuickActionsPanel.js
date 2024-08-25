import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };
  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4">Quick Actions</h4>
     
      <div className="d-flex flex-wrap">
      <button
        className="btn btn-primary mb-3"
        onClick={handleCreateQuiz}
      >
        Create Quiz
      </button>
        <Link to="/question-bank" className="btn btn-primary me-2 mb-2">Question Bank</Link>
        <Link to="/create-exam" className="btn btn-primary me-2 mb-2">Create Exam</Link>
        {/* <Link to="/manage-grades" className="btn btn-primary me-2 mb-2">Manage Grades</Link> */}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
