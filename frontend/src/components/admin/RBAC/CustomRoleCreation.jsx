// CustomRoleCreation.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomRoleCreation = () => {
    const [roleName, setRoleName] = useState('');
    const [permissions, setPermissions] = useState({});

    const handleCreateRole = () => {
        axios.post('/api/roles/custom', { name: roleName, permissions }).then(response => {
            // Handle success
        });
    };

    const handlePermissionChange = (permission, value) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [permission]: value
        }));
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Custom Role Creation</h2>
            <Form.Group controlId="roleName">
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
            </Form.Group>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Permissions</h3>
                <Form.Check
                    type="checkbox"
                    label="Content Creation"
                    onChange={(e) => handlePermissionChange('contentCreation', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Course Approval"
                    onChange={(e) => handlePermissionChange('courseApproval', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Financial Management"
                    onChange={(e) => handlePermissionChange('financialManagement', e.target.checked)}
                />
                {/* Add more permissions as needed */}
            </div>
            <Button variant="primary" onClick={handleCreateRole} className="mt-4">
                Create Role
            </Button>
        </div>
    );
};

export default CustomRoleCreation;
