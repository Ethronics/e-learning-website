import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationModal = ({ isOpen, onClose, onGoToExam }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faBell} size="lg" className="mr-2" />
          <h2 className="text-lg font-semibold">New Exam Available</h2>
        </div>
        <p>A new exam has been posted. Would you like to take it now?</p>
        <div className="mt-4">
          <button
            onClick={onGoToExam}
            className="btn btn-primary mr-2"
          >
            Go to Exam
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
