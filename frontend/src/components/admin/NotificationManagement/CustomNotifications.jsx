// CustomNotifications.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomNotifications = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [recipients, setRecipients] = useState('');

    const handleSendNotification = () => {
        axios.post('/api/notifications1/custom', { title, message, recipients })
            .then(response => {
                // Handle success
            });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Send Custom Notifications</h2>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter notification title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
            <Form.Group controlId="recipients" className="mt-3">
                <Form.Label>Recipients</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter recipient IDs (comma separated)"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" onClick={handleSendNotification} className="mt-4">
                Send Notification
            </Button>
        </div>
    );
};

export default CustomNotifications;
