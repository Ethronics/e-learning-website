// NotificationHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get('/api.json/notifications1').then(response => setHistory(response.data.history));
    }, []);

    return (
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Notification History</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">Type</th>
                        <th className="px-4 py-2 border-b">Message</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map(entry => (
                        <tr key={entry.id}>
                            <td className="px-4 py-2 border-b">{entry.date}</td>
                            <td className="px-4 py-2 border-b">{entry.type}</td>
                            <td className="px-4 py-2 border-b">{entry.message}</td>
                            <td className="px-4 py-2 border-b">{entry.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationHistory;
