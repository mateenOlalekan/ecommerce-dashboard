'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FiChevronDown, FiFilter, FiSearch, FiEye, FiEdit, FiTrash2, 
  FiPlus, FiMail, FiPhone, FiCalendar, FiShoppingCart, FiDollarSign,
  FiMapPin, FiUser, FiStar, FiBox
} from 'react-icons/fi';


export default function RetailersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [showRetailerDetails, setShowRetailerDetails] = useState(false);

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

  // Sample retailers data
  const retailersData = [
    {
      id: 'RET-2001',
      name: 'TechGadgets Inc.',
      email: 'contact@techgadgets.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2022-05-15T14:30:00Z',
      status: 'active',
      products: 45,
      totalSales: 45875.25,
      location: 'San Francisco, CA',
      lastOrder: '2023-11-10T09:15:00Z',
      rating: 4.8,
      owner: 'John Smith'
    },
    {
      id: 'RET-2002',
      name: 'FashionHub Boutique',
      email: 'info@fashionhub.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-01-22T10:15:00Z',
      status: 'active',
      products: 32,
      totalSales: 28950.75,
      location: 'New York, NY',
      lastOrder: '2023-11-08T14:20:00Z',
      rating: 4.5,
      owner: 'Emma Johnson'
    },
    {
      id: 'RET-2003',
      name: 'HomeEssentials Store',
      email: 'support@homeessentials.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2022-11-10T09:45:00Z',
      status: 'active',
      products: 28,
      totalSales: 18765.40,
      location: 'Chicago, IL',
      lastOrder: '2023-10-28T11:30:00Z',
      rating: 4.2,
      owner: 'Michael Brown'
    },
    {
      id: 'RET-2004',
      name: 'SportsGear Outlet',
      email: 'sales@sportsgear.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-03-30T16:20:00Z',
      status: 'pending',
      products: 18,
      totalSales: 9875.50,
      location: 'Denver, CO',
      lastOrder: '2023-09-15T16:40:00Z',
      rating: 4.0,
      owner: 'Sarah Williams'
    },
    {
      id: 'RET-2005',
      name: 'BeautyCorner',
      email: 'hello@beautycorner.com',
      phone: '+1 (555) 567-8901',
      joinDate: '2022-08-18T11:30:00Z',
      status: 'active',
      products: 52,
      totalSales: 37650.80,
      location: 'Los Angeles, CA',
      lastOrder: '2023-11-12T13:45:00Z',
      rating: 4.7,
      owner: 'David Miller'
    },
    {
      id: 'RET-2006',
      name: 'BookWorld',
      email: 'orders@bookworld.com',
      phone: '+1 (555) 678-9012',
      joinDate: '2023-02-14T09:15:00Z',
      status: 'suspended',
      products: 12,
      totalSales: 6540.25,
      location: 'Seattle, WA',
      lastOrder: '2023-08-10T10:20:00Z',
      rating: 3.8,
      owner: 'Jennifer Davis'
    },
    {
      id: 'RET-2007',
      name: 'PetParadise',
      email: 'info@petparadise.com',
      phone: '+1 (555) 789-0123',
      joinDate: '2022-12-05T13:45:00Z',
      status: 'active',
      products: 36,
      totalSales: 21540.60,
      location: 'Austin, TX',
      lastOrder: '2023-11-05T15:10:00Z',
      rating: 4.6,
      owner: 'Robert Wilson'
    },
    {
      id: 'RET-2008',
      name: 'GardenGurus',
      email: 'contact@gardengurus.com',
      phone: '+1 (555) 890-1234',
      joinDate: '2023-05-20T15:20:00Z',
      status: 'active',
      products: 24,
      totalSales: 13245.90,
      location: 'Portland, OR',
      lastOrder: '2023-11-14T12:30:00Z',
      rating: 4.3,
      owner: 'Lisa Anderson'
    }
  ];

  const statusFilters = [
    { key: 'all', label: 'All Retailers', count: retailersData.length },
    { key: 'active', label: 'Active', count: retailersData.filter(r => r.status === 'active').length },
    { key: 'pending', label: 'Pending', count: retailersData.filter(r => r.status === 'pending').length },
    { key: 'suspended', label: 'Suspended', count: retailersData.filter(r => r.status === 'suspended').length },
  ];

  const filteredRetailers = retailersData.filter(retailer => {
    const matchesStatus = activeFilter === 'all' || 
                         (activeFilter === 'active' && retailer.status === 'active') ||
                         (activeFilter === 'pending' && retailer.status === 'pending') ||
                         (activeFilter === 'suspended' && retailer.status === 'suspended');
    const matchesSearch = searchQuery === '' || 
      retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-green-100 text-green-800';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'suspended') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const viewRetailerDetails = (retailer) => {
    setSelectedRetailer(retailer);
    setShowRetailerDetails(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}


        {/* Retailers Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Retailer Management</h1>
              <p className="text-gray-500 mt-1">Manage your retailer partners and their stores</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50">
                <FiPlus className="mr-2" /> Export
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center">
                <FiPlus className="mr-2" /> Add Retailer
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-aos="fade-up">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Retailers</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{retailersData.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <FiBox className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Retailers</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{statusFilters.find(f => f.key === 'active').count}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <FiBox className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{retailersData.reduce((sum, retailer) => sum + retailer.products, 0)}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <FiShoppingCart className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Retailer Sales</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">${retailersData.reduce((sum, retailer) => sum + retailer.totalSales, 0).toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                  <FiDollarSign className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <motion.div 
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6"
            data-aos="fade-up"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${activeFilter === filter.key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {filter.label} <span className="ml-1 bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{filter.count}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search retailers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
                  />
                </div>

                <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg">
                  <FiFilter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Retailers Table */}
          <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
            data-aos="fade-up"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRetailers.map((retailer, index) => (
                    <motion.tr 
                      key={retailer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiBox className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{retailer.name}</div>
                            <div className="text-sm text-gray-500">{retailer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {retailer.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(retailer.joinDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {retailer.products}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${retailer.totalSales.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">{retailer.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(retailer.status)}`}>
                          {retailer.status.charAt(0).toUpperCase() + retailer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => viewRetailerDetails(retailer)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded" title="Edit">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded" title="Delete">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRetailers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No retailers found</div>
                <div className="text-gray-500 text-sm">Try changing your filters or search query</div>
              </div>
            )}

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRetailers.length}</span> of{' '}
                <span className="font-medium">{filteredRetailers.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                  1
                </button>
                <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Retailer Details Sidebar */}
      {showRetailerDetails && selectedRetailer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowRetailerDetails(false)}></div>
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-md"
              >
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Retailer Details</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowRetailerDetails(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{selectedRetailer.id}</p>
                  </div>
                  <div className="flex-1 py-6 px-6 space-y-6">
                    {/* Retailer Profile */}
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FiBox className="text-gray-500 text-2xl" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{selectedRetailer.name}</h3>
                        <p className="text-sm text-gray-500">Owner: {selectedRetailer.owner}</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Contact Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex items-center">
                          <FiMail className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{selectedRetailer.email}</span>
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{selectedRetailer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <FiMapPin className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{selectedRetailer.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Account Information */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Account Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(selectedRetailer.joinDate)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Status</p>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRetailer.status)}`}>
                            {selectedRetailer.status.charAt(0).toUpperCase() + selectedRetailer.status.slice(1)}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Rating</p>
                          <div className="flex items-center">
                            <FiStar className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{selectedRetailer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Statistics */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Performance Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Total Products</p>
                          <p className="text-lg font-medium text-gray-900">{selectedRetailer.products}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Total Sales</p>
                          <p className="text-lg font-medium text-gray-900">${selectedRetailer.totalSales.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Avg. Product Value</p>
                          <p className="text-lg font-medium text-gray-900">${(selectedRetailer.totalSales / selectedRetailer.products).toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Last Order</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(selectedRetailer.lastOrder)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FiEdit className="mr-2" /> Edit Retailer
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      View Products
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}