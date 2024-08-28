// NotificationTemplates.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationTemplates = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios.get('/api/notifications1').then(response => setTemplates(response.data.templates));
    }, []);

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Notification Templates</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Template Name</th>
                        <th className="px-4 py-2 border-b">Content</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map(template => (
                        <tr key={template.id}>
                            <td className="px-4 py-2 border-b">{template.name}</td>
                            <td className="px-4 py-2 border-b">{template.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationTemplates;
