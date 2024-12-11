import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingCoursesList = ({ onSelectCourse }) => {
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        axios.get('/apffi.json')
            .then(response => setPendingCourses(response.data.pendingCourses))
            .catch(error => console.error('Error fetching pending courses:', error));
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Pending Courses</h2>
            <ul>
                {pendingCourses.map(course => (
                    <li
                        key={course.id}
                        className="border-b py-3 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => onSelectCourse(course)}
                    >
                        <div className="font-semibold text-lg">{course.title}</div>
                        <div className="text-sm text-gray-600">Instructor: {course.instructorName}</div>
                        <div className="text-sm text-gray-500">Submitted on: {course.submissionDate}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingCoursesList;
