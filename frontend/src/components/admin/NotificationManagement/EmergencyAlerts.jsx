// EmergencyAlerts.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EmergencyAlerts = () => {
    const [message, setMessage] = useState('');

    const handleSendAlert = () => {
        axios.post('/api/notifications1/emergency', { message })
            .then(response => {
                // Handle success
            });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Emergency Alerts</h2>
            <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter urgent message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="danger" onClick={handleSendAlert} className="mt-4">
                Send Emergency Alert
            </Button>
        </div>
    );
};

export default EmergencyAlerts;
