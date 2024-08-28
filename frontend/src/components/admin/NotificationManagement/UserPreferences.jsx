// UserPreferences.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UserPreferences = () => {
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(false);
    const [inApp, setInApp] = useState(true);

    const handleSavePreferences = () => {
        axios.post('/api/users/preferences', { email, sms, inApp })
            .then(response => {
                // Handle success
            });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">User Notification Preferences</h2>
            <Form.Check
                type="checkbox"
                label="Email Notifications"
                checked={email}
                onChange={() => setEmail(!email)}
            />
            <Form.Check
                type="checkbox"
                label="SMS Notifications"
                checked={sms}
                onChange={() => setSms(!sms)}
                className="mt-2"
            />
            <Form.Check
                type="checkbox"
                label="In-App Notifications"
                checked={inApp}
                onChange={() => setInApp(!inApp)}
                className="mt-2"
            />
            <Button variant="primary" onClick={handleSavePreferences} className="mt-4">
                Save Preferences
            </Button>
        </div>
    );
};

export default UserPreferences;
