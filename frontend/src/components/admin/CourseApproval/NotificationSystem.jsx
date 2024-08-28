import React from 'react';

const NotificationSystem = ({ message }) => {
    return (
        <div className={`p-4 mb-4 text-sm ${message.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`}>
            {message.text}
        </div>
    );
};

export default NotificationSystem;
