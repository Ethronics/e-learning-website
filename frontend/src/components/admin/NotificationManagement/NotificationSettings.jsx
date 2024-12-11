// NotificationSettings.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NotificationSettings = () => {
    const [notificationType, setNotificationType] = useState('email');
    const [frequency, setFrequency] = useState('daily');

    const handleSaveSettings = () => {
        axios.post('/api,js/notifications1/settings', { notificationType, frequency })
            .then(response => {
                // Handle success
            });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <Form.Group controlId="notificationType">
                <Form.Label>Notification Type</Form.Label>
                <Form.Control
                    as="select"
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="in-app">In-App</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="frequency" className="mt-3">
                <Form.Label>Notification Frequency</Form.Label>
                <Form.Control
                    as="select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleSaveSettings} className="mt-4">
                Save Settings
            </Button>
        </div>
    );
};

export default NotificationSettings;
