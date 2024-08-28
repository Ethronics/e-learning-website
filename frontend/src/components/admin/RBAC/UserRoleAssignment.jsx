// UserRoleAssignment.jsx
import React, { useState, useEffect } from 'react';
import {  Form } from 'react-bootstrap';
import axios from 'axios';

const UserRoleAssignment = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRole, setUserRole] = useState({});

    useEffect(() => {
        axios.get('/api.json').then(response => setUsers(response.data.users1));
        axios.get('/api.json').then(response => setRoles(response.data.roles1));
    }, []);

    const handleRoleChange = (userId, roleId) => {
        axios.post(`/api/users/${userId}/role`, { roleId }).then(response => {
            setUserRole(prevUserRole => ({
                ...prevUserRole,
                [userId]: roleId
            }));
        });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">User Role Assignment</h2>
            {users.map(user => (
                <div key={user.id} className="mb-4">
                    <Form.Group controlId={`userRole_${user.id}`}>
                        <Form.Label>{user.name}</Form.Label>
                        <Form.Control
                            as="select"
                            value={userRole[user.id] || ''}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            ))}
        </div>
    );
};

export default UserRoleAssignment;
