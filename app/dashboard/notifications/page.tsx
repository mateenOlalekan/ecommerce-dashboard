'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FiBell, FiCheck, FiX, FiShoppingCart, FiDollarSign, FiUser,
  FiPackage, FiStar, FiAlertTriangle, FiInfo
} from 'react-icons/fi';


export default function NotificationsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Sample notifications data
  const notificationsData = [
    {
      id: 'NOTIF-1001',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #78945 has been placed by Emily Johnson',
      timestamp: '2023-11-15T14:30:00Z',
      read: false,
      icon: <FiShoppingCart className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'NOTIF-1002',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment for order #78945 has been successfully processed',
      timestamp: '2023-11-15T14:35:00Z',
      read: false,
      icon: <FiDollarSign className="w-5 h-5 text-green-500" />
    },
    {
      id: 'NOTIF-1003',
      type: 'customer',
      title: 'New Customer Registration',
      message: 'Michael Brown has created a new account',
      timestamp: '2023-11-14T10:15:00Z',
      read: true,
      icon: <FiUser className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'NOTIF-1004',
      type: 'product',
      title: 'Low Stock Alert',
      message: 'Wireless Bluetooth Headphones is running low in stock (15 units left)',
      timestamp: '2023-11-14T09:45:00Z',
      read: true,
      icon: <FiPackage className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 'NOTIF-1005',
      type: 'review',
      title: 'New Product Review',
      message: 'Sarah Williams has reviewed Smart Fitness Tracker with 5 stars',
      timestamp: '2023-11-13T16:20:00Z',
      read: true,
      icon: <FiStar className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'NOTIF-1006',
      type: 'system',
      title: 'System Update Available',
      message: 'A new system update is available. Please update to version 2.3.1',
      timestamp: '2023-11-12T11:30:00Z',
      read: true,
      icon: <FiInfo className="w-5 h-5 text-gray-500" />
    }
  ];

  const filters = [
    { key: 'all', label: 'All Notifications' },
    { key: 'unread', label: 'Unread' },
    { key: 'orders', label: 'Orders' },
    { key: 'customers', label: 'Customers' },
    { key: 'system', label: 'System' }
  ];

  const filteredNotifications = notificationsData.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const markAsRead = (id) => {
    // In a real app, you would update the notification status in your backend
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // In a real app, you would update all notifications status in your backend
    console.log('Marking all notifications as read');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Notifications Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-500 mt-1">Stay updated with your store activity</p>
            </div>
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center mt-4 md:mt-0"
            >
              <FiCheck className="mr-2" /> Mark All as Read
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6" data-aos="fade-up">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === filter.key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.icon}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-500">{formatDate(notification.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="ml-3 p-1 text-gray-400 hover:text-gray-500"
                        title="Mark as read"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <FiBell className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}