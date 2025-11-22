'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiChevronDown, FiFilter, FiSearch, FiEye, FiEdit, FiTrash2, FiPlus, FiGrid, FiClock, FiCheck, FiX, FiTruck, FiDollarSign, FiPackage } from 'react-icons/fi';
import { LuShoppingCart, LuStar, LuBox, LuUser, LuCalendar } from 'react-icons/lu';
import { BsThreeDotsVertical, BsTags, BsImage, BsCreditCard } from 'react-icons/bs';


export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [statusFilters] = useState([
    { key: 'all', label: 'All Orders', count: 128, color: 'gray' },
    { key: 'pending', label: 'Pending', count: 24, color: 'yellow' },
    { key: 'processing', label: 'Processing', count: 18, color: 'blue' },
    { key: 'shipped', label: 'Shipped', count: 42, color: 'purple' },
    { key: 'delivered', label: 'Delivered', count: 36, color: 'green' },
    { key: 'cancelled', label: 'Cancelled', count: 8, color: 'red' },
  ]);

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

  // Sample orders data
  const ordersData = [
    {
      id: 'ORD-78945',
      customer: { name: 'Emily Johnson', email: 'emily@example.com' },
      date: '2023-11-15T14:30:00Z',
      status: 'delivered',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Wireless Bluetooth Headphones', price: 159.99, quantity: 1 },
        { name: 'Phone Case', price: 24.99, quantity: 1 }
      ],
      total: 184.98,
      shipping: { address: '123 Main St, New York, NY 10001', method: 'express' },
      tracking: { carrier: 'UPS', number: '1Z999AA10123456784' }
    },
    {
      id: 'ORD-78946',
      customer: { name: 'Michael Brown', email: 'michael@example.com' },
      date: '2023-11-14T10:15:00Z',
      status: 'processing',
      payment: { method: 'paypal', status: 'completed' },
      items: [
        { name: 'Smart Fitness Tracker', price: 89.99, quantity: 2 }
      ],
      total: 179.98,
      shipping: { address: '456 Oak Ave, Los Angeles, CA 90001', method: 'standard' },
      tracking: null
    },
    {
      id: 'ORD-78947',
      customer: { name: 'Sarah Williams', email: 'sarah@example.com' },
      date: '2023-11-14T09:45:00Z',
      status: 'shipped',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Organic Cotton T-Shirt', price: 29.99, quantity: 3 },
        { name: 'Stainless Steel Water Bottle', price: 34.99, quantity: 1 }
      ],
      total: 124.96,
      shipping: { address: '789 Pine Rd, Chicago, IL 60601', method: 'standard' },
      tracking: { carrier: 'USPS', number: '94001118992213456784' }
    },
    {
      id: 'ORD-78948',
      customer: { name: 'David Miller', email: 'david@example.com' },
      date: '2023-11-13T16:20:00Z',
      status: 'pending',
      payment: { method: 'credit_card', status: 'pending' },
      items: [
        { name: 'Professional Camera Lens', price: 499.99, quantity: 1 }
      ],
      total: 499.99,
      shipping: { address: '321 Elm St, Houston, TX 77001', method: 'express' },
      tracking: null
    },
    {
      id: 'ORD-78949',
      customer: { name: 'Jennifer Davis', email: 'jennifer@example.com' },
      date: '2023-11-12T11:30:00Z',
      status: 'cancelled',
      payment: { method: 'paypal', status: 'refunded' },
      items: [
        { name: 'Yoga Mat Premium', price: 59.99, quantity: 1 },
        { name: 'Wireless Phone Charger', price: 24.99, quantity: 2 }
      ],
      total: 109.97,
      shipping: { address: '654 Maple Dr, Phoenix, AZ 85001', method: 'standard' },
      tracking: null
    },
    {
      id: 'ORD-78950',
      customer: { name: 'Robert Wilson', email: 'robert@example.com' },
      date: '2023-11-12T09:15:00Z',
      status: 'delivered',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Ceramic Coffee Mug Set', price: 39.99, quantity: 1 }
      ],
      total: 39.99,
      shipping: { address: '987 Cedar Ln, Philadelphia, PA 19101', method: 'standard' },
      tracking: { carrier: 'FedEx', number: '789012345678' }
    },
    {
      id: 'ORD-78951',
      customer: { name: 'Lisa Anderson', email: 'lisa@example.com' },
      date: '2023-11-11T13:45:00Z',
      status: 'processing',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Wireless Bluetooth Headphones', price: 159.99, quantity: 1 },
        { name: 'Phone Case', price: 24.99, quantity: 1 },
        { name: 'Screen Protector', price: 14.99, quantity: 1 }
      ],
      total: 199.97,
      shipping: { address: '147 Walnut St, San Antonio, TX 78201', method: 'express' },
      tracking: null
    },
    {
      id: 'ORD-78952',
      customer: { name: 'James Taylor', email: 'james@example.com' },
      date: '2023-11-10T15:20:00Z',
      status: 'shipped',
      payment: { method: 'paypal', status: 'completed' },
      items: [
        { name: 'Stainless Steel Water Bottle', price: 34.99, quantity: 2 }
      ],
      total: 69.98,
      shipping: { address: '258 Birch Ave, San Diego, CA 92101', method: 'standard' },
      tracking: { carrier: 'USPS', number: '94001118992215678943' }
    }
  ];

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FiClock className="w-4 h-4" />,
      processing: <FiPackage className="w-4 h-4" />,
      shipped: <FiTruck className="w-4 h-4" />,
      delivered: <FiCheck className="w-4 h-4" />,
      cancelled: <FiX className="w-4 h-4" />
    };
    return icons[status] || <LuBox className="w-4 h-4" />;
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

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real application, this would update the order status in the database
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // For demo purposes, we'll just update the local state
    const updatedOrders = ordersData.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    // You would typically set this to your state
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Orders Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
              <p className="text-gray-500 mt-1">Manage customer orders and fulfillment</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50">
                <FiPlus className="mr-2" /> Export
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center">
                <FiPlus className="mr-2" /> Create Order
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-aos="fade-up">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{ordersData.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <LuShoppingCart className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Orders</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{statusFilters.find(f => f.key === 'pending').count}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                  <FiPackage className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">This Month Revenue</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">$12,458.75</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <FiDollarSign className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Order Value</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">$156.24</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <LuBox className="text-xl" />
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${activeFilter === filter.key ? `bg-${filter.color}-600 text-white` : `bg-${filter.color}-100 text-${filter.color}-800 hover:bg-${filter.color}-200`}`}
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
                    placeholder="Search orders..."
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

            {/* Date Filters */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <LuCalendar className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Nov 1, 2023</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="text-sm text-gray-700">Nov 15, 2023</span>
                <FiChevronDown className="text-gray-500 ml-2" />
              </div>
              
              <select className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-green-500">
                <option>All Payment Methods</option>
                <option>Credit Card</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
              </select>
              
              <select className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-green-500">
                <option>All Shipping Methods</option>
                <option>Standard</option>
                <option>Express</option>
                <option>Overnight</option>
              </select>
            </div>
          </motion.div>

          {/* Orders Table */}
          <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
            data-aos="fade-up"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                            <LuUser className="text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                            <div className="text-xs text-gray-500">{order.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BsCreditCard className="text-gray-500 mr-1" />
                          <span className="text-sm text-gray-700 capitalize">{order.payment.method.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => viewOrderDetails(order)}
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

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No orders found</div>
                <div className="text-gray-500 text-sm">Try changing your filters or search query</div>
              </div>
            )}

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                <span className="font-medium">{filteredOrders.length}</span> results
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

      {/* Order Details Sidebar */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowOrderDetails(false)}></div>
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-2xl"
              >
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowOrderDetails(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{selectedOrder.id}</p>
                  </div>
                  <div className="flex-1 py-6 px-6 space-y-6">
                    {/* Order Status Card */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-3">Order Status</h3>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-1 capitalize">{selectedOrder.status}</span>
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Update Status
                          </button>
                          <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Print Invoice
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Customer Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                            <LuUser className="text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{selectedOrder.customer.name}</div>
                            <div className="text-sm text-gray-500">{selectedOrder.customer.email}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          <div className="font-medium mb-1">Shipping Address</div>
                          <div>{selectedOrder.shipping.address}</div>
                          <div className="mt-1 capitalize">Method: {selectedOrder.shipping.method}</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Order Items</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                                <BsImage className="text-gray-400" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-700">Total</div>
                          <div className="text-lg font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Payment Method</div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.payment.method.replace('_', ' ')}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Payment Status</div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.payment.status}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Transaction Date</div>
                            <div className="text-sm font-medium text-gray-900">{formatDate(selectedOrder.date)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Information */}
                    {selectedOrder.tracking && (
                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-3">Shipping Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Carrier</div>
                              <div className="text-sm font-medium text-gray-900">{selectedOrder.tracking.carrier}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Tracking Number</div>
                              <div className="text-sm font-medium text-gray-900">{selectedOrder.tracking.number}</div>
                            </div>
                          </div>
                          <button className="mt-3 text-sm text-green-600 font-medium hover:text-green-800">
                            Track Package
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FiEdit className="mr-2" /> Edit Order
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Send Customer Update
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