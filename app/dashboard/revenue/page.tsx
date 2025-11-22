'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiChevronDown, FiFilter, FiTrendingUp, FiCalendar, FiDownload } from 'react-icons/fi';
import { LuDollarSign, LuShoppingCart, LuUsers } from 'react-icons/lu';
import { TbChartArcs, TbChartLine, TbChartPie } from 'react-icons/tb';
import { BsBagCheck, BsGraphUp, BsCurrencyDollar } from 'react-icons/bs';


export default function RevenuePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('revenue');

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

  // Revenue data
  const revenueData = {
    totalRevenue: 24563.00,
    previousPeriodRevenue: 21840.50,
    revenueChange: 12.5,
    orders: 1846,
    averageOrderValue: 133.08,
    customers: 342,
    conversionRate: 4.8,
    refunds: 1245.50,
    refundRate: 5.1
  };

  // Time range options
  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'ytd', label: 'Year to Date' },
    { value: '12m', label: 'Last 12 Months' }
  ];

  // Metrics options
  const metrics = [
    { value: 'revenue', label: 'Revenue', icon: <LuDollarSign /> },
    { value: 'orders', label: 'Orders', icon: <LuShoppingCart /> },
    { value: 'customers', label: 'Customers', icon: <LuUsers /> }
  ];

  // Sample chart data (would come from API in real app)
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [18500, 21000, 19500, 22000, 23000, 24500, 26000, 25500, 27000, 28000, 29500, 24563],
    orders: [1420, 1560, 1480, 1620, 1680, 1720, 1780, 1740, 1820, 1880, 1920, 1846],
    customers: [280, 310, 295, 320, 330, 335, 340, 338, 345, 350, 355, 342]
  };

  // Revenue by category
  const revenueByCategory = [
    { category: 'Electronics', revenue: 9850, percentage: 40.1, color: 'bg-blue-500' },
    { category: 'Fashion', revenue: 6320, percentage: 25.7, color: 'bg-purple-500' },
    { category: 'Home & Kitchen', revenue: 4210, percentage: 17.1, color: 'bg-green-500' },
    { category: 'Books', revenue: 2180, percentage: 8.9, color: 'bg-yellow-500' },
    { category: 'Other', revenue: 2003, percentage: 8.2, color: 'bg-gray-500' }
  ];

  // Top products by revenue
  const topProducts = [
    { name: 'Wireless Headphones', revenue: 3920, units: 245, price: 159.99 },
    { name: 'Smart Watch Series 5', revenue: 4725, units: 189, price: 249.99 },
    { name: 'Bluetooth Speaker', revenue: 1335, units: 167, price: 79.99 },
    { name: 'Phone Charging Dock', revenue: 568, units: 142, price: 39.99 },
    { name: 'Fitness Tracker', revenue: 1215, units: 135, price: 89.99 }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Get chart data based on selected metric
  const getChartData = () => {
    switch (activeMetric) {
      case 'revenue': return chartData.revenue;
      case 'orders': return chartData.orders;
      case 'customers': return chartData.customers;
      default: return chartData.revenue;
    }
  };

  // Get chart label based on selected metric
  const getChartLabel = () => {
    switch (activeMetric) {
      case 'revenue': return 'Revenue';
      case 'orders': return 'Orders';
      case 'customers': return 'Customers';
      default: return 'Revenue';
    }
  };

  // Calculate max value for chart scaling
  const maxChartValue = Math.max(...getChartData()) * 1.1;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}


        {/* Revenue Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Revenue Analytics</h1>
              <p className="text-gray-500 mt-1">Track and analyze your revenue performance</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50">
                <FiDownload className="mr-2" /> Export Report
              </button>
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Revenue Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6" data-aos="fade-up">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{formatCurrency(revenueData.totalRevenue)}</h3>
                  <span className={`text-xs font-medium ${revenueData.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'} bg-green-50 px-2 py-1 rounded-full mt-2 inline-block`}>
                    {revenueData.revenueChange >= 0 ? '+' : ''}{revenueData.revenueChange}%
                  </span>
                </div>
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <LuDollarSign className="text-2xl" />
                </div>
              </div>
              <div className="h-1 bg-green-100 rounded-full mt-4"></div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{revenueData.orders}</h3>
                  <span className="text-xs text-gray-500 mt-2">Avg. Order: {formatCurrency(revenueData.averageOrderValue)}</span>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <LuShoppingCart className="text-2xl" />
                </div>
              </div>
              <div className="h-1 bg-blue-100 rounded-full mt-4"></div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Customers</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{revenueData.customers}</h3>
                  <span className="text-xs text-gray-500 mt-2">Conversion: {revenueData.conversionRate}%</span>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <LuUsers className="text-2xl" />
                </div>
              </div>
              <div className="h-1 bg-purple-100 rounded-full mt-4"></div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Refunds</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{formatCurrency(revenueData.refunds)}</h3>
                  <span className="text-xs text-gray-500 mt-2">{revenueData.refundRate}% refund rate</span>
                </div>
                <div className="p-3 bg-red-100 rounded-xl text-red-600">
                  <FiTrendingUp className="text-2xl" />
                </div>
              </div>
              <div className="h-1 bg-red-100 rounded-full mt-4"></div>
            </motion.div>
          </div>

          {/* Main Revenue Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div 
              className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-right"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
                <div className="flex items-center space-x-2">
                  {metrics.map(metric => (
                    <button
                      key={metric.value}
                      onClick={() => setActiveMetric(metric.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${activeMetric === metric.value ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {metric.icon}
                      <span className="ml-1.5">{metric.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-80">
                {/* Chart container */}
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-1 flex items-end space-x-1 pb-4">
                    {getChartData().map((value, index) => {
                      const height = (value / maxChartValue) * 100;
                      return (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                            style={{ height: `${height}%` }}
                            title={`${chartData.labels[index]}: ${activeMetric === 'revenue' ? formatCurrency(value) : value}`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                    {chartData.labels.map((label, index) => (
                      <span key={index} className="flex-1 text-center">{label}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {getChartLabel()} from {timeRanges.find(t => t.value === timeRange)?.label}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Revenue by Category</h2>
                <FiFilter className="text-gray-400" />
              </div>
              
              <div className="space-y-5">
                {revenueByCategory.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">{item.category}</span>
                      <span className="text-sm font-medium text-gray-800">{formatCurrency(item.revenue)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{item.percentage}%</span>
                      <span className="text-xs text-gray-500">{Math.round(item.revenue / revenueData.totalRevenue * 100)}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Top Products and Revenue Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-right"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Top Products by Revenue</h2>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <BsCurrencyDollar className="text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.units} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{formatCurrency(product.revenue)}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(product.price)} each</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Revenue Trends</h2>
                <TbChartPie className="text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-800">Recurring Revenue</p>
                      <p className="text-xs text-gray-500">Subscription services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{formatCurrency(5250)}</p>
                    <p className="text-xs text-green-600">+8.2% from last month</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <BsGraphUp className="text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-800">New Customers</p>
                      <p className="text-xs text-gray-500">First-time buyers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{formatCurrency(8920)}</p>
                    <p className="text-xs text-green-600">+12.7% from last month</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TbChartLine className="text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-800">Repeat Customers</p>
                      <p className="text-xs text-gray-500">Loyalty sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{formatCurrency(15643)}</p>
                    <p className="text-xs text-green-600">+5.3% from last month</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            data-aos="fade-up"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Customer Lifetime Value</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{formatCurrency(1245)}</p>
                <p className="text-xs text-green-600 mt-2">+9.2% from last quarter</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Acquisition Cost</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{formatCurrency(45.75)}</p>
                <p className="text-xs text-green-600 mt-2">-3.4% from last quarter</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Repeat Purchase Rate</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">42.8%</p>
                <p className="text-xs text-green-600 mt-2">+5.1% from last quarter</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Cart Abandonment Rate</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">68.3%</p>
                <p className="text-xs text-red-600 mt-2">+2.7% from last quarter</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}