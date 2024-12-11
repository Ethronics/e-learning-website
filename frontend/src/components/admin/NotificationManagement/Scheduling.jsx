// Scheduling.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Scheduling = () => {
    const [notificationType, setNotificationType] = useState('reminder');
    const [dateTime, setDateTime] = useState('');
    const [message, setMessage] = useState('');

    const handleScheduleNotification = () => {
        axios.post('/api/notifications1/schedule', { notificationType, dateTime, message })
            .then(response => {
                // Handle success
            });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Schedule Notifications</h2>
            <Form.Group controlId="notificationType">
                <Form.Label>Notification Type</Form.Label>
                <Form.Control
                    as="select"
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                >
                    <option value="reminder">Reminder</option>
                    <option value="deadline">Deadline</option>
                    <option value="alert">Alert</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateTime" className="mt-3">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="message" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter notification message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" onClick={handleScheduleNotification} className="mt-4">
                Schedule Notification
            </Button>
        </div>
    );
};

export default Scheduling;
