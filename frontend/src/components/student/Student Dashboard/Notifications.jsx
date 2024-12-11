import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faTimes,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const Notifications = ({ notifications }) => {
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
    if (value === "all") {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(n => n.type === value));
    }
  };

  const handleSelectNotification = (id) => {
    setSelectedNotifications(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleMarkAsRead = () => {
    const updatedNotifications = filteredNotifications.map(notification => {
      if (selectedNotifications.includes(notification.id)) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setFilteredNotifications(updatedNotifications);
    setSelectedNotifications([]);
  };

  const handleMarkAsUnread = () => {
    const updatedNotifications = filteredNotifications.map(notification => {
      if (selectedNotifications.includes(notification.id)) {
        return { ...notification, read: false };
      }
      return notification;
    });
    setFilteredNotifications(updatedNotifications);
    setSelectedNotifications([]);
  };

  const handleDeleteSelected = () => {
    const updatedNotifications = filteredNotifications.filter(notification => 
      !selectedNotifications.includes(notification.id)
    );
    setFilteredNotifications(updatedNotifications);
    setSelectedNotifications([]);
  };

  const handleNotificationSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={handleNotificationSettings} className="text-blue-500">
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </button>
      </div>

      {settingsOpen && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Notification Settings</h3>
          <div className="mb-2">
            <label className="mr-2">Filter by Type:</label>
            <select value={filter} onChange={handleFilterChange} className="form-control">
              <option value="all">All</option>
              <option value="grades">Grades</option>
              <option value="practicalSessions">Practical Sessions</option>
              <option value="quizzes">Quizzes</option>
              <option value="announcements">Announcements</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Real-Time Alerts:</label>
            <input type="checkbox" id="realTimeAlerts" className="form-checkbox" />
            <label htmlFor="realTimeAlerts" className="ml-2">Enable</label>
          </div>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={handleMarkAsRead}
          className="btn btn-secondary mr-2"
          disabled={selectedNotifications.length === 0}
        >
          <FontAwesomeIcon icon={faCheck} className="mr-1" />
          Mark as Read
        </button>
        <button
          onClick={handleMarkAsUnread}
          className="btn btn-secondary mr-2"
          disabled={selectedNotifications.length === 0}
        >
          <FontAwesomeIcon icon={faTimes} className="mr-1" />
          Mark as Unread
        </button>
        <button
          onClick={handleDeleteSelected}
          className="btn btn-danger"
          disabled={selectedNotifications.length === 0}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          Delete Selected
        </button>
      </div>

      {filteredNotifications.length === 0 ? (
        <p>No notifications to display.</p>
      ) : (
        filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 mb-2 rounded-lg shadow-sm ${
              selectedNotifications.includes(notification.id)
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedNotifications.includes(notification.id)}
              onChange={() => handleSelectNotification(notification.id)}
              className="mr-2"
            />
            <p>{notification.message}</p>
            <small className="text-gray-500">{notification.date}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
