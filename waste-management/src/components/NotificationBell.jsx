// src/components/NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiCheck, FiX, FiAlertTriangle, FiDollarSign, FiTrash2 } from 'react-icons/fi';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: "New waste collection request received",
      time: "2 min ago",
      icon: <FiAlertTriangle className="text-blue-500" />
    },
    {
      id: 2,
      message: "Payment received from Customer #1234",
      time: "1 hour ago",
      icon: <FiDollarSign className="text-green-500" />
    },
    {
      id: 3,
      message: "Maintenance scheduled for tomorrow",
      time: "3 hours ago",
      icon: <FiCheck className="text-yellow-500" />
    }
  ];

  const unreadCount = notifications.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative"
        aria-label="Notifications"
      >
        <FiBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 transform transition-all duration-200 ease-in-out z-50 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Notifications</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No new notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBell;