import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CourseManagement = ({ curriculumId }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [assignedInstructor, setAssignedInstructor] = useState('');
    const [permissions, setPermissions] = useState({ addEditContent: false, manageCourse: false });

    // New course fields
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');

    useEffect(() => {
        axios.get(`${process.env.PUBLIC_URL}/apji.json`).then(response => {
            setCourses(response.data.courses);
            setInstructors(response.data.instructors);
        });
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            const selectedCurriculum = courses.find(course => course.id === parseInt(selectedCourse));
            if (selectedCurriculum) {
                const instructorId = selectedCurriculum.instructorId;
                setAssignedInstructor(instructorId);
                setSelectedInstructor(instructorId);
            }
        }
    }, [selectedCourse, courses]);

    const handleAssignInstructor = () => {
        const updatedCourses = courses.map(course => {
            if (course.id === parseInt(selectedCourse)) {
                return { ...course, instructorId: selectedInstructor };
            }
            return course;
        });

        setCourses(updatedCourses);
        setAssignedInstructor(selectedInstructor);
        // Normally, here you would update the JSON file or send a request to an API to persist the changes.
    };

    const handlePermissionChange = (permission) => {
        setPermissions(prev => ({ ...prev, [permission]: !prev[permission] }));
    };

    const handleCreateCourse = () => {
        const newCourse = { 
            id: Date.now(), 
            name: newCourseName, 
            description: newCourseDescription 
        };

        setCourses(prevCourses => [...prevCourses, newCourse]);
        setNewCourseName('');
        setNewCourseDescription('');
        setSelectedCourse(newCourse.id.toString()); // Automatically select the new course

        // Normally, here you would update the JSON file or send a request to an API to persist the new course.
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Manage Courses for Curriculum</h2>
            
            {/* Create New Course */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">Create New Course</h3>
                <Form.Group controlId="newCourseName" className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                        placeholder="Enter course name"
                    />
                </Form.Group>
                <Form.Group controlId="newCourseDescription" className="mb-3">
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={newCourseDescription}
                        onChange={(e) => setNewCourseDescription(e.target.value)}
                        placeholder="Enter course description"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleCreateCourse}>Create Course</Button>
            </div>

            {/* Select and Assign Instructor to Course */}
            <Form.Group controlId="course" className="mb-4">
                <Form.Label>Select Course</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            
            {selectedCourse && (
                <>
                    <Form.Group controlId="instructor" className="mb-4">
                        <Form.Label>Assign Instructor</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedInstructor}
                            onChange={(e) => setSelectedInstructor(e.target.value)}
                        >
                            <option value="">Select an instructor</option>
                            {instructors.map(instructor => (
                                <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {assignedInstructor && (
                        <p>Currently assigned instructor: {instructors.find(inst => inst.id === assignedInstructor)?.name}</p>
                    )}
                    <Button variant="primary" onClick={handleAssignInstructor}>Assign Instructor</Button>
                </>
            )}

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Permissions</h3>
                <Form.Check
                    type="checkbox"
                    label="Add/Edit Content"
                    checked={permissions.addEditContent}
                    onChange={() => handlePermissionChange('addEditContent')}
                />
                <Form.Check
                    type="checkbox"
                    label="Manage Course"
                    checked={permissions.manageCourse}
                    onChange={() => handlePermissionChange('manageCourse')}
                />
            </div>
        </div>
    );
};

export default CourseManagement;
