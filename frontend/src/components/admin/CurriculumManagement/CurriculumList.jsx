import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CurriculumList = ({ onSelectCurriculum }) => {
    const [curricula, setCurricula] = useState([]);

    useEffect(() => {
        axios.get('/apji.json').then(response => setCurricula(response.data.curricula));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/curricula/${id}`).then(response => {
            // Handle success (e.g., remove from list)
            setCurricula(curricula.filter(curriculum => curriculum.id !== id));
        });
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Curriculum List</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Start Date</th>
                        <th className="py-2 px-4 border-b">End Date</th>
                        <th className="py-2 px-4 border-b">Courses</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {curricula.map(curriculum => (
                        <tr key={curriculum.id}>
                            <td className="py-2 px-4 border-b">{curriculum.title}</td>
                            <td className="py-2 px-4 border-b">{new Date(curriculum.startDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{new Date(curriculum.endDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{curriculum.courses.length}</td>
                            <td className="py-2 px-4 border-b">
                                <Button
                                    variant="info"
                                    className="mr-2"
                                    onClick={() => onSelectCurriculum(curriculum.id)}
                                >
                                    Manage Courses
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(curriculum.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurriculumList;
