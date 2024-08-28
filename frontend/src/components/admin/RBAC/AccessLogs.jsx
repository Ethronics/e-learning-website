// AccessLogs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccessLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('/api.json').then(response => setLogs(response.data.accessLogs));
    }, []);

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Access Logs</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">User</th>
                        <th className="px-4 py-2 border-b">Action</th>
                        <th className="px-4 py-2 border-b">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td className="px-4 py-2 border-b">{log.date}</td>
                            <td className="px-4 py-2 border-b">{log.user}</td>
                            <td className="px-4 py-2 border-b">{log.action}</td>
                            <td className="px-4 py-2 border-b">{log.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccessLogs;
