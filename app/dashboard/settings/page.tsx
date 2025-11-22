'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FiChevronDown, FiSave, FiUpload, FiDownload, FiShield, FiCreditCard,
  FiBox, FiTruck, FiMail, FiUser, FiGlobe, FiBell, FiLock
} from 'react-icons/fi';


export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    storeName: '5Star Ecommerce',
    storeEmail: 'admin@5starecommerce.com',
    currency: 'USD',
    timezone: 'America/New_York',
    maintenanceMode: false,
    enableNotifications: true,
    lowStockThreshold: 10,
    autoPublishReviews: false
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <FiBox className="w-4 h-4" /> },
    { id: 'shipping', label: 'Shipping', icon: <FiTruck className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments', icon: <FiCreditCard className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <FiShield className="w-4 h-4" /> }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        
        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-500 mt-1">Manage your store configuration</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50">
                <FiDownload className="mr-2" /> Export
              </button>
              <button 
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>

          {/* Settings Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
            <div className="flex flex-col md:flex-row">
              {/* Settings Sidebar */}
              <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="p-4 space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${activeTab === tab.id ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {tab.icon}
                      <span className="ml-3">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1 p-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input
                          type="text"
                          name="storeName"
                          value={settings.storeName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                        <input
                          type="email"
                          name="storeEmail"
                          value={settings.storeEmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select
                          name="currency"
                          value={settings.currency}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="JPY">JPY (¥)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select
                          name="timezone"
                          value={settings.timezone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="maintenanceMode"
                        name="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                        Enable Maintenance Mode
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive important updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="enableNotifications"
                            checked={settings.enableNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Low Stock Alerts</h3>
                          <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            name="lowStockThreshold"
                            value={settings.lowStockThreshold}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Auto-publish Reviews</h3>
                          <p className="text-sm text-gray-500">Automatically publish new product reviews</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="autoPublishReviews"
                            checked={settings.autoPublishReviews}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
                        <div className="space-y-3">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
                            Update Password
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                            Enable 2FA
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Active Sessions</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Current Session</p>
                              <p className="text-sm text-gray-500">Chrome on Windows • New York, US</p>
                            </div>
                            <button className="text-sm text-red-600 hover:text-red-800">
                              Log Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add other tabs content here */}
                {(activeTab === 'shipping' || activeTab === 'payments') && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <FiBox className="w-12 h-12 text-gray-300 mx-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Settings section coming soon</h3>
                      <p className="mt-1 text-sm text-gray-500">This section is under development</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}