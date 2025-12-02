'use client';

import { useState, useEffect,JSX } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {FiChevronDown,FiFilter,FiSearch,FiEye,FiEdit,FiTrash2,FiPlus,FiClock,FiCheck,FiX,FiTruck,FiDollarSign,FiPackage} from 'react-icons/fi';
import { LuShoppingCart, LuBox, LuUser, LuCalendar } from 'react-icons/lu';
import { BsImage, BsCreditCard } from 'react-icons/bs';
import { StatusFilter,ordersData,Order } from '@/app/data/data';
import OrderHeader from "./orderHeader";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [statusFilters] = useState<StatusFilter[]>([
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

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, JSX.Element> = {
      pending: <FiClock className="w-4 h-4" />,
      processing: <FiPackage className="w-4 h-4" />,
      shipped: <FiTruck className="w-4 h-4" />,
      delivered: <FiCheck className="w-4 h-4" />,
      cancelled: <FiX className="w-4 h-4" />
    };
    return icons[status] || <LuBox className="w-4 h-4" />;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);

  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Orders Content */}
        <main className="flex-1 overflow-y-auto p-2 md:p-3">
          {/* Page Header and Stats Overview  */}
          <OrderHeader/>

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
                    className="pl-10 pr-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
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