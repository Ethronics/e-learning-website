// PermissionSettings.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PermissionSettings = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        axios.get('/api.json').then(response => setRoles(response.data.roles1));
        axios.get('/api,json').then(response => setPermissions(response.data.permissions));
    }, []);

    const handleSavePermissions = () => {
        axios.post(`/api/permissions/${selectedRole}`, permissions[selectedRole]).then(response => {
            // Handle success
        });
    };

    const handlePermissionChange = (role, permission, value) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [role]: {
                ...prevPermissions[role],
                [permission]: value
            }
        }));
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Permission Settings</h2>
            <Form.Group controlId="roleSelect">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="">Select Role</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {selectedRole && (
                <div>
                    <h3 className="text-lg font-semibold mt-4">Permissions</h3>
                    {Object.keys(permissions[selectedRole] || {}).map(permission => (
                        <Form.Check
                            key={permission}
                            type="checkbox"
                            label={permission}
                            checked={permissions[selectedRole][permission]}
                            onChange={(e) => handlePermissionChange(selectedRole, permission, e.target.checked)}
                        />
                    ))}
                    <Button variant="primary" onClick={handleSavePermissions} className="mt-4">
                        Save Permissions
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PermissionSettings;
