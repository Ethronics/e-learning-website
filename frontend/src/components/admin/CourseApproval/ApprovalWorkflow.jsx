import React from 'react';

const ApprovalWorkflow = ({ course, reviewData, onApprove, onReject }) => {
    // Display the message when either course or reviewData is missing
    if (!course || !reviewData) {
        return <div>Select a course and complete the review to start the approval process.</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Approval Workflow</h2>
            <div className="mb-4">
                <strong className="text-lg">Course:</strong> {course.title}
            </div>
            <div className="mb-4">
                <strong className="text-lg">Instructor:</strong> {course.instructorName}
            </div>
            <div className="mb-4">
                <strong className="text-lg">Quality Check:</strong> {reviewData.qualityCheck ? 'Passed' : 'Failed'}
            </div>
            <div className="mb-4">
                <strong className="text-lg">Compliance Check:</strong> {reviewData.complianceCheck ? 'Passed' : 'Failed'}
            </div>
            <div className="mb-4">
                <strong className="text-lg">Relevance Check:</strong> {reviewData.relevanceCheck ? 'Passed' : 'Failed'}
            </div>
            <div className="mb-4">
                <strong className="text-lg">Notes:</strong> {reviewData.notes}
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={onApprove}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Approve
                </button>
                <button
                    onClick={onReject}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default ApprovalWorkflow;
