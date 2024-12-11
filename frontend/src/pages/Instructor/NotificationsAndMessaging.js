import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../components/instructor/Common/Navbar'

const NotificationsAndMessaging = () => {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/inst1.json');
        setNotifications(response.data.notifications);
        setMessages(response.data.messages);
        setAnnouncement(response.data.announcements);
      } catch (error) {
        console.error('Error fetching notifications and messages', error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async () => {
    // Logic to send a new message
    // This is just a placeholder; actual implementation will involve API calls and form handling
    try {
      await axios.post('/send-message', { content: newMessage });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4 space-y-6">
      {/* Notification Inbox */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Notification Inbox</h2>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-4 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p>{notification.message}</p>
              <span className="text-sm text-gray-600">{notification.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messaging Center */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Messaging Center</h2>
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">{message.sender}</h3>
              <p>{message.content}</p>
              <span className="text-sm text-gray-600">{message.date}</span>
            </div>
          ))}
          <div className="mt-6">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Tools */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Announcement Tools</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Course-Wide Announcements</h3>
            <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Create New Announcement
            </button>
            {/* Add more functionality as needed */}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Admin Announcements</h3>
            <div className="space-y-2">
              {announcement.map(ann => (
                <div key={ann.id} className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="text-lg font-semibold">{ann.title}</h4>
                  <p>{ann.message}</p>
                  <span className="text-sm text-gray-600">{ann.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NotificationsAndMessaging;
