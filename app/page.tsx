'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiChevronDown, FiFilter, FiTrendingUp, FiTrendingDown, FiRefreshCw } from 'react-icons/fi';
import { LuDollarSign, LuShoppingCart, LuUser, LuBarChart3 } from 'react-icons/lu';
import { FcPieChart, FcSalesPerformance } from "react-icons/fc";
import { TbChartArcs, TbShoppingCartDiscount } from 'react-icons/tb';
import { BsBagCheck, BsStarHalf, BsBoxSeam, BsGraphUp, BsExclamationTriangle } from 'react-icons/bs';
import { IoStatsChart, IoTime } from 'react-icons/io5';
import {}

// Types for better type safety
interface StatData {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element;
  color: string;
  chartColor: string;
  textColor: string;
  trend: 'up' | 'down';
  description?: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
  items: number;
  payment: string;
}

interface Product {
  name: string;
  price: number;
  sold: number;
  stock: number;
  rating: number;
  category: string;
  revenue: number;
  growth: number;
}

export default function EcommerceDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [refreshing, setRefreshing] = useState(false);

  // Enhanced mobile detection with error handling
  useEffect(() => {
    const checkIsMobile = () => {
      try {
        setIsMobile(window.innerWidth < 1024);
        if (window.innerWidth >= 1024) {
          setIsSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
        }
      } catch (error) {
        console.error('Error checking mobile view:', error);
        setIsMobile(false);
      }
    };

    checkIsMobile();
    
    // Initialize AOS with error handling
    try {
      AOS.init({ 
        duration: 800, 
        easing: 'ease-in-out', 
        once: true,
        offset: 50
      });
    } catch (error) {
      console.error('AOS initialization failed:', error);
    }

    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timer);
    };
  }, []);

  // Refresh data function
  const refreshData = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  // Enhanced stats data with better color coding and trends
  const statsData: StatData[] = useMemo(() => [
    { 
      title: 'Total Revenue', 
      value: '$45,263.00', 
      change: '+12.5%', 
      icon: <LuDollarSign className="text-2xl" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      chartColor: 'bg-green-100',
      textColor: 'text-green-600',
      trend: 'up',
      description: 'Compared to last month'
    },
    { 
      title: 'Total Orders', 
      value: '2,846', 
      change: '+8.2%', 
      icon: <LuShoppingCart className="text-2xl" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      chartColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      trend: 'up',
      description: '324 more than last month'
    },
    { 
      title: 'New Customers', 
      value: '542', 
      change: '+15.7%', 
      icon: <LuUser className="text-2xl" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      chartColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      trend: 'up',
      description: 'Highest growth this quarter'
    },
    { 
      title: 'Conversion Rate', 
      value: '28.8%', 
      change: '+2.5%', 
      icon: <FcPieChart className="text-2xl" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      chartColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      trend: 'up',
      description: 'Improved by 2.5% points'
    },
  ], []);

  // Enhanced recent orders with more details
  const recentOrders: Order[] = useMemo(() => [
    { 
      id: '#1001', 
      customer: 'Sarah Johnson', 
      date: '2 hours ago', 
      amount: '$345.75', 
      status: 'Completed',
      items: 3,
      payment: 'Credit Card'
    },
    { 
      id: '#1002', 
      customer: 'Michael Brown', 
      date: '4 hours ago', 
      amount: '$230.50', 
      status: 'Processing',
      items: 2,
      payment: 'PayPal'
    },
    { 
      id: '#1003', 
      customer: 'Emily Wilson', 
      date: '6 hours ago', 
      amount: '$199.99', 
      status: 'Completed',
      items: 1,
      payment: 'Credit Card'
    },
    { 
      id: '#1004', 
      customer: 'John Davis', 
      date: '1 day ago', 
      amount: '$455.25', 
      status: 'Shipped',
      items: 4,
      payment: 'Stripe'
    },
    { 
      id: '#1005', 
      customer: 'Robert Garcia', 
      date: '1 day ago', 
      amount: '$129.99', 
      status: 'Cancelled',
      items: 1,
      payment: 'Credit Card'
    },
  ], []);

  // Enhanced top products with more details
  const topProducts: Product[] = useMemo(() => [
    { name: 'Wireless Headphones', price: 159.99, sold: 245, stock: 32, rating: 4.8, category: 'Electronics', revenue: 39197.55, growth: 15 },
    { name: 'Smart Watch Series 5', price: 249.99, sold: 189, stock: 15, rating: 4.6, category: 'Electronics', revenue: 47248.11, growth: 22 },
    { name: 'Bluetooth Speaker', price: 79.99, sold: 167, stock: 41, rating: 4.5, category: 'Electronics', revenue: 13358.33, growth: 8 },
    { name: 'Phone Charging Dock', price: 39.99, sold: 242, stock: 56, rating: 4.3, category: 'Accessories', revenue: 9677.58, growth: 12 },
    { name: 'Fitness Tracker', price: 89.99, sold: 135, stock: 12, rating: 4.7, category: 'Fitness', revenue: 12148.65, growth: 18 },
  ], []);

  // Status badge component
  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusConfig = {
      Completed: { color: 'bg-green-100 text-green-800', icon: '✓' },
      Processing: { color: 'bg-yellow-100 text-yellow-800', icon: '⟳' },
      Shipped: { color: 'bg-blue-100 text-blue-800', icon: '🚚' },
      Cancelled: { color: 'bg-red-100 text-red-800', icon: '✕' }
    };

    const config = statusConfig[status];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {status}
      </span>
    );
  };

  // Loading skeleton component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 p-5 rounded-2xl h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-200 p-6 rounded-2xl h-96"></div>
        <div className="bg-gray-200 p-6 rounded-2xl h-96"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <SkeletonLoader />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-fit bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}


        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8" data-aos="fade-up">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className={`p-3 ${stat.color} rounded-xl text-white shadow-lg`}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {stat.trend === 'up' ? (
                      <FiTrendingUp className="text-green-500 mr-1" />
                    ) : (
                      <FiTrendingDown className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{stat.description}</span>
                </div>
                
                {/* Animated progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-1 rounded-full ${stat.chartColor}`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Overview */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-right"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
                  <p className="text-sm text-gray-500 mt-1">Monthly revenue performance</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                    View Report <FiChevronDown className="ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="h-72 bg-gradient-to-br from-green-50 to-indigo-50 rounded-2xl flex flex-col items-center justify-center p-4">
                <div className="text-center mb-6">
                  <TbChartArcs className="text-4xl text-green-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Revenue Analytics</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">$45,263.00</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
                </div>
                
                {/* Simple bar chart visualization */}
                <div className="flex items-end justify-center space-x-2 w-full max-w-md">
                  {[40, 60, 75, 90, 65, 80, 95, 70, 85, 100, 85, 95].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-6 bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(height * 452.63).toFixed(0)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                  <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
                </div>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                  View All <FiChevronDown className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-72 overflow-y-auto">
                <AnimatePresence>
                  {recentOrders.map((order, index) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-200 border border-transparent hover:border-green-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          order.status === 'Completed' ? 'bg-green-100' :
                          order.status === 'Processing' ? 'bg-yellow-100' :
                          order.status === 'Shipped' ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          <BsBagCheck className={
                            order.status === 'Completed' ? 'text-green-600' :
                            order.status === 'Processing' ? 'text-yellow-600' :
                            order.status === 'Shipped' ? 'text-blue-600' : 'text-red-600'
                          } />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{order.id}</p>
                          <p className="text-xs text-gray-600">{order.customer}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <IoTime className="text-gray-400 text-xs" />
                            <p className="text-xs text-gray-500">{order.date}</p>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">{order.items} items</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">{order.amount}</p>
                        <div className="mt-2">
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{order.payment}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Top Products and Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Top Selling Products */}
            <motion.div 
              className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
                  <p className="text-sm text-gray-500 mt-1">Best performing products</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                    <FiFilter className="mr-1" /> Filter
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-4 font-medium pl-2">Product</th>
                      <th className="pb-4 font-medium">Price</th>
                      <th className="pb-4 font-medium">Sold</th>
                      <th className="pb-4 font-medium">Revenue</th>
                      <th className="pb-4 font-medium">Stock</th>
                      <th className="pb-4 font-medium">Rating</th>
                      <th className="pb-4 font-medium pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ backgroundColor: "#f8fafc" }}
                        className="border-b hover:bg-gray-50 group"
                      >
                        <td className="py-4 pl-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                              <BsBoxSeam className="text-gray-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-sm font-bold text-gray-800">${product.price.toFixed(2)}</p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <BsGraphUp className="text-green-500 mr-1 text-sm" />
                            <span className="text-sm font-medium text-gray-800">{product.sold}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800">
                              ${product.revenue.toLocaleString()}
                            </span>
                            <span className="text-xs text-green-600">+{product.growth}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col space-y-1">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              product.stock > 20 
                                ? 'bg-green-100 text-green-800' 
                                : product.stock > 10 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock} left
                            </span>
                            {product.stock < 15 && (
                              <div className="flex items-center text-xs text-red-600">
                                <BsExclamationTriangle className="mr-1" />
                                Low stock
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <BsStarHalf className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">/5.0</span>
                          </div>
                        </td>
                        <td className="py-4 pr-2">
                          <div className="flex items-center space-x-2">
                            <button className="text-sm text-green-600 hover:text-green-800 font-medium px-3 py-1 rounded-lg hover:bg-green-50 transition-colors">
                              View
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                              Edit
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Performance</h2>
                  <p className="text-sm text-gray-500 mt-1">Key metrics</p>
                </div>
                <IoStatsChart className="text-green-500 text-xl" />
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Average Order Value', value: '$156.80', change: '+5.2%', icon: <LuDollarSign /> },
                  { label: 'Customer Satisfaction', value: '94.2%', change: '+1.8%', icon: <BsStarHalf /> },
                  { label: 'Return Rate', value: '2.4%', change: '-0.6%', icon: <TbShoppingCartDiscount /> },
                  { label: 'Cart Abandonment', value: '18.7%', change: '-3.1%', icon: <LuShoppingCart /> },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{metric.label}</p>
                        <p className="text-xs text-gray-500">Last 30 days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800">{metric.value}</p>
                      <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Pending Orders</p>
                    <p className="text-lg font-bold text-blue-800">24</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium">New Reviews</p>
                    <p className="text-lg font-bold text-purple-800">18</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}