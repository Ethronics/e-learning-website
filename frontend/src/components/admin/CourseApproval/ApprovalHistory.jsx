import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovalHistory = ({ onSelectCourse }) => {
    const [approvalHistory, setApprovalHistory] = useState([]);

    useEffect(() => {
        axios.get('/apffi.json')
            .then(response => setApprovalHistory(response.data.approvalHistory))
            .catch(error => console.error('Error fetching approval history:', error));
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
            <h2 className="text-xl font-bold mb-4">Approval History</h2>
            <ul>
                {approvalHistory.map((entry, index) => (
                    <li 
                    key={index} 
                    className="border-b py-2 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => onSelectCourse(entry.course)}
                    >
                        <div><strong>Course:</strong> {entry.courseTitle}</div>
                        <div><strong>Reviewed By:</strong> {entry.reviewer}</div>
                        <div><strong>Decision:</strong> {entry.decision}</div>
                        <div><strong>Date:</strong> {entry.date}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApprovalHistory;
