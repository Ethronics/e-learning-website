import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCurriculumForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [prerequisite, setPrerequisite] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get('/apji.json').then(response => {
            setCourses(response.data.courses);
            setInstructors(response.data.instructors);
        });
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('detail', detail);
        formData.append('prerequisite', prerequisite);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('file', file);
        formData.append('courses', JSON.stringify(selectedCourses));
        formData.append('instructors', JSON.stringify(selectedInstructors));

        axios.post('/api/curricula', formData).then(response => {
            // Handle success (e.g., show success message, reset form)
        });
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create New Curriculum</h2>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Curriculum Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter curriculum title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="description" className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter a brief description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="detail" className="mt-2">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter detailed information"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="prerequisite" className="mt-2">
                    <Form.Label>Prerequisite</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter prerequisite"
                        value={prerequisite}
                        onChange={(e) => setPrerequisite(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="file" className="mt-2">
                    <Form.Label>Upload Image or Video</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Form.Group controlId="startDate" className="mt-2">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="endDate" className="mt-2">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="courses" className="mt-2">
                    <Form.Label>Assign Courses</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={selectedCourses}
                        onChange={(e) => setSelectedCourses(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="instructors" className="mt-2">
                    <Form.Label>Assign Instructors</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={selectedInstructors}
                        onChange={(e) => setSelectedInstructors(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        {instructors.map(instructor => (
                            <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} className="mt-4">Create Curriculum</Button>
            </Form>
        </div>
    );
};

export default CreateCurriculumForm;
