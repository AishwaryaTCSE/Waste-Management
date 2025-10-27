// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiMenu, FiX, FiClock, FiCheck, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import NotificationBell from '../NotificationBell';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Waste Management Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              {/* Add user profile dropdown here */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="In Progress" 
            value="24" 
            icon={FiClock} 
            color="text-blue-500" 
          />
          <StatCard 
            title="Completed" 
            value="156" 
            icon={FiCheck} 
            color="text-green-500" 
          />
          <StatCard 
            title="Pending" 
            value="12" 
            icon={FiAlertTriangle} 
            color="text-yellow-500" 
          />
          <StatCard 
            title="Total Requests" 
            value="192" 
            icon={FiInfo} 
            color="text-purple-500" 
          />
        </div>

        {/* Page Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;