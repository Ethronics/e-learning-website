// RoleManagement.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editingRoleId, setEditingRoleId] = useState(null);

    useEffect(() => {
        axios.get('/api.json').then(response => setRoles(response.data.roles1));
    }, []);

    const handleAddRole = () => {
        axios.post('/api/roles', { name: newRole }).then(response => {
            setRoles([...roles, response.data]);
            setNewRole('');
        });
    };

    const handleEditRole = (roleId) => {
        axios.put(`/api/roles/${roleId}`, { name: editRole }).then(response => {
            setRoles(roles.map(role => role.id === roleId ? response.data : role));
            setEditRole('');
            setEditingRoleId(null);
        });
    };

    const handleDeleteRole = (roleId) => {
        axios.delete(`/api/roles/${roleId}`).then(() => {
            setRoles(roles.filter(role => role.id !== roleId));
        });
    };

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Role Management</h2>
            <div className="mb-4">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="New Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleAddRole}>
                        Add Role
                    </Button>
                </InputGroup>
            </div>
            <ul>
                {roles.map(role => (
                    <li key={role.id} className="flex items-center mb-2">
                        <span className="mr-2">{role.name}</span>
                        {editingRoleId === role.id ? (
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Edit Role"
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                />
                                <Button
                                    variant="success"
                                    onClick={() => handleEditRole(role.id)}
                                >
                                    Save
                                </Button>
                            </InputGroup>
                        ) : (
                            <>
                                <Button
                                    variant="warning"
                                    className="mr-2"
                                    onClick={() => {
                                        setEditingRoleId(role.id);
                                        setEditRole(role.name);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteRole(role.id)}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagement;
