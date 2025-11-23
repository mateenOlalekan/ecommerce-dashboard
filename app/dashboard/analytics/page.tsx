'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
 FiShoppingCart, FiUsers, FiTrendingUp, FiPieChart,
  FiCalendar, FiDownload, FiRefreshCw,FiDollarSign
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsTags, BsImage, BsCreditCard } from 'react-icons/bs';


// Import Chart.js and necessary components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);

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

  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 19000, 18000, 22000, 19500, 24000, 26000, 31000, 29500, 35000, 42000, 48000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Orders',
        data: [245, 320, 290, 350, 310, 380, 420, 480, 450, 520, 590, 645],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue & Orders Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const trafficData = {
    labels: ['Direct', 'Social Media', 'Organic Search', 'Email', 'Referral'],
    datasets: [
      {
        label: 'Traffic Source',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const trafficChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const conversionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [2.3, 2.5, 2.7, 2.9, 3.1, 3.4, 3.2, 3.5, 3.7, 3.9, 4.2, 4.5],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
    ],
  };

  const conversionChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Conversion Rate Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Function to simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Analytics Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
              <p className="text-gray-500 mt-1">Track and analyze your store performance</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button 
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50"
                onClick={refreshData}
                disabled={isLoading}
              >
                <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center">
                <FiDownload className="mr-2" /> Export Report
              </button>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between" data-aos="fade-up">
            <div className="flex items-center space-x-2 mb-3 md:mb-0">
              <FiCalendar className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['7d', '30d', '90d', '6m', '12m', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${dateRange === range ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {range === 'custom' ? <FiCalendar className="mr-1" /> : null}
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6" data-aos="fade-up">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FiDollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">$248,568.00</p>
                <span className="flex items-center text-sm font-medium text-green-600">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  12.5%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">From 2,458 orders</div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FiShoppingCart className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">2,458</p>
                <span className="flex items-center text-sm font-medium text-green-600">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  8.2%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">+184 from last period</div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <FiTrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">4.25%</p>
                <span className="flex items-center text-sm font-medium text-green-600">
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  2.1%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">From 57,823 visits</div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <FiPieChart className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">$101.12</p>
                <span className="flex items-center text-sm font-medium text-red-600">
                  <FiTrendingUp className="w-4 h-4 mr-1 transform rotate-45" />
                  1.2%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">From $102.35 last period</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6" data-aos="fade-up">
            {/* Revenue & Orders Chart */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
                <h3 className="text-md font-medium text-gray-800">Revenue & Orders Overview</h3>
                <div className="flex space-x-2 mt-2 md:mt-0">
                  {['revenue', 'orders', 'both'].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${activeMetric === metric ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <Line data={salesData} options={revenueChartOptions} />
              </div>
            </div>

            {/* Traffic Sources Chart */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-md font-medium text-gray-800">Traffic Sources</h3>
                <button className="text-sm text-green-600 font-medium">View details</button>
              </div>
              <div className="h-80 flex items-center justify-center">
                <Doughnut data={trafficData} options={trafficChartOptions} />
              </div>
            </div>

            {/* Conversion Rate Chart */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-md font-medium text-gray-800">Conversion Rate</h3>
                <button className="text-sm text-green-600 font-medium">View details</button>
              </div>
              <div className="h-80">
                <Bar data={conversionData} options={conversionChartOptions} />
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6" data-aos="fade-up">
            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-md font-medium text-gray-800">Top Selling Products</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { name: 'Wireless Bluetooth Headphones', sales: 245, revenue: '$39,200' },
                  { name: 'Smart Fitness Tracker', sales: 189, revenue: '$17,008' },
                  { name: 'Stainless Steel Water Bottle', sales: 156, revenue: '$5,458' },
                  { name: 'Organic Cotton T-Shirt', sales: 132, revenue: '$3,958' },
                  { name: 'Professional Camera Lens', sales: 87, revenue: '$43,499' },
                ].map((product, index) => (
                  <div key={index} className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                        <BsImage className="text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sales} units sold</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Metrics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-md font-medium text-gray-800">Customer Metrics</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                      <FiUsers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">New Customers</div>
                      <div className="text-xs text-gray-500">This month</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">458</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <FiTrendingUp className="w-3 h-3 mr-1" /> 12.5%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
                      <FiShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Repeat Customer Rate</div>
                      <div className="text-xs text-gray-500">Lifetime value</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">38.2%</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <FiTrendingUp className="w-3 h-3 mr-1" /> 4.2%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
                      <FiDollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Customer Lifetime Value</div>
                      <div className="text-xs text-gray-500">Average per customer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">$542.50</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <FiTrendingUp className="w-3 h-3 mr-1" /> 7.8%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 mr-3">
                      <FiTrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Cart Abandonment Rate</div>
                      <div className="text-xs text-gray-500">Last 30 days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">68.5%</div>
                    <div className="text-xs text-red-600 flex items-center">
                      <FiTrendingUp className="w-3 h-3 mr-1 transform rotate-45" /> 2.3%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-aos="fade-up">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-md font-medium text-gray-800">Performance Summary</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">4.8s</div>
                  <div className="text-sm text-gray-500">Avg. Page Load</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">98.7%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">2.4%</div>
                  <div className="text-sm text-gray-500">Bounce Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">3.2m</div>
                  <div className="text-sm text-gray-500">Avg. Session</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}