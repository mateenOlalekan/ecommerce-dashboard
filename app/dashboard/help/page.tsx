'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiHelpCircle, FiMail, FiPhone, FiBook, FiUsers, FiShoppingCart, 
  FiDollarSign, FiAlertTriangle, FiTrendingUp, FiSearch, FiMessageSquare, 
  FiVideo, FiFileText, FiArrowRight, FiExternalLink, FiHeadphones 
} from 'react-icons/fi';


export default function HelpPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);

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
    AOS.init({ duration: 300, easing: 'ease-in-out', once: true });
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn how to set up your store and manage basic settings',
      icon: <FiBook className="w-5 h-5" />,
      articles: [
        'Setting up your store',
        'Adding your first product',
        'Configuring payment methods',
        'Setting up shipping options'
      ]
    },
    {
      title: 'Order Management',
      description: 'Manage orders, process refunds, and handle customer requests',
      icon: <FiFileText className="w-5 h-5" />,
      articles: [
        'Processing orders',
        'Managing returns and refunds',
        'Handling customer inquiries',
        'Tracking shipments'
      ]
    },
    {
      title: 'Product Management',
      description: 'Add, edit, and organize your product catalog',
      icon: <FiShoppingCart className="w-5 h-5" />,
      articles: [
        'Adding new products',
        'Managing inventory',
        'Organizing categories',
        'Setting up variants'
      ]
    },
    {
      title: 'Customer Management',
      description: 'Manage customer accounts and communication',
      icon: <FiUsers className="w-5 h-5" />,
      articles: [
        'Managing customer accounts',
        'Handling customer service',
        'Setting up loyalty programs',
        'Managing reviews'
      ]
    },
    {
      title: 'Analytics & Reports',
      description: 'Track sales, revenue, and business performance',
      icon: <FiTrendingUp className="w-5 h-5" />,
      articles: [
        'Understanding sales reports',
        'Tracking customer behavior',
        'Revenue analysis',
        'Exporting data'
      ]
    },
    {
      title: 'Troubleshooting',
      description: 'Solve common issues and errors',
      icon: <FiAlertTriangle className="w-5 h-5" />,
      articles: [
        'Payment gateway issues',
        'Email delivery problems',
        'Performance optimization',
        'Error code solutions'
      ]
    }
  ];

  const popularArticles = [
    'How to process a refund',
    'Setting up tax rates',
    'Managing inventory levels',
    'Connecting your domain',
    'Setting up email notifications',
    'Troubleshooting payment issues',
    'Creating discount codes',
    'Managing user roles and permissions'
  ];

  const supportChannels = [
    {
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      icon: <FiHelpCircle className="w-5 h-5" />,
      action: 'Browse Articles',
      link: '#'
    },
    {
      title: 'Community Forum',
      description: 'Get help from other store owners',
      icon: <FiMessageSquare className="w-5 h-5" />,
      action: 'Join Community',
      link: '#'
    },
    {
      title: 'Email Support',
      description: 'Contact our support team directly',
      icon: <FiMail className="w-5 h-5" />,
      action: 'Send Email',
      link: 'mailto:support@5starecommerce.com'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: <FiVideo className="w-5 h-5" />,
      action: 'Watch Videos',
      link: '#'
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Navigate to Settings → Security → Reset Password. Enter your old password and choose a new one. If you forgot your password, use the 'Forgot Password' option on the login screen."
    },
    {
      question: "How can I add or update products?",
      answer: "Go to the Products section from the sidebar. You can add new products with images, price, stock quantity, and description. To update, click on an existing product and edit its details."
    },
    {
      question: "How do I manage customer accounts?",
      answer: "Head over to the Customers section. You can view all registered users, check their order history, block/unblock accounts, and assign roles like 'VIP Customer'."
    },
    {
      question: "How do I track revenue and sales?",
      answer: "Visit the Analytics section. You'll see daily, weekly, and monthly revenue, sales trends, and best-selling products. You can also export reports as CSV or PDF."
    },
    {
      question: "What if orders get stuck in 'Processing'?",
      answer: "Sometimes payment gateways delay confirmation. Check your payment settings in Settings → Payments. If the issue persists, manually update the order status or contact support."
    }
  ];

  const troubleshooting = [
    {
      issue: "Orders not showing up",
      solution: "Check if your database connection is live in Settings → Database. Ensure the Orders API is enabled. If still not visible, clear cache and refresh the dashboard."
    },
    {
      issue: "Payments failing",
      solution: "Go to Settings → Payments. Verify that your API keys (Stripe/PayPal) are active. Make sure your currency settings match your store settings."
    },
    {
      issue: "Emails not delivered",
      solution: "Check Settings → Notifications. Verify SMTP settings are correct. Ensure your domain has valid DNS records (SPF, DKIM)."
    },
    {
      issue: "Slow dashboard loading",
      solution: "Clear unused data, optimize images, and check server logs for bottlenecks. Consider enabling caching in Settings → Performance."
    }
  ];

  const bestPractices = [
    "Always update product stock immediately after receiving inventory.",
    "Respond to customer support tickets within 24 hours.",
    "Regularly export backups of your customer and order data.",
    "Use Analytics to identify top-selling products and focus on them.",
    "Run promotions and discounts during high-demand seasons.",
    "Keep your system and plugins updated for security and performance."
  ];

  const contactOptions = [
    {
      title: "Email Support",
      icon: <FiMail className="w-6 h-6" />,
      description: "support@5starecommerce.com",
      action: "Send Message"
    },
    {
      title: "Phone Support",
      icon: <FiPhone className="w-6 h-6" />,
      description: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      title: "Live Chat",
      icon: <FiHeadphones className="w-6 h-6" />,
      description: "Available 9AM-6PM EST",
      action: "Start Chat"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Help Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Help & Support Center</h1>
              <p className="text-gray-500 mt-1">Find answers, guides, and resources to help you manage your store</p>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6" data-aos="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-2">How can we help you today?</h2>
              <div className="relative mt-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6" data-aos="fade-up">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-3">
                <FiUsers className="w-6 h-6" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Customer Management</h3>
              <p className="text-sm text-gray-500 mb-4">Manage customer accounts, orders, and support tickets</p>
              <a href="#" className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn more <FiArrowRight className="ml-1" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-green-100 rounded-full text-green-600 mb-3">
                <FiShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Product Management</h3>
              <p className="text-sm text-gray-500 mb-4">Add, edit, or remove products and control inventory</p>
              <a href="#" className="text-sm text-green-600 font-medium hover:text-green-800 flex items-center">
                Learn more <FiArrowRight className="ml-1" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600 mb-3">
                <FiDollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Revenue Tracking</h3>
              <p className="text-sm text-gray-500 mb-4">Access analytics and reports to monitor sales</p>
              <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center">
                Learn more <FiArrowRight className="ml-1" />
              </a>
            </div>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6" data-aos="fade-up">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-green-600 mb-3">
                  {channel.icon}
                </div>
                <h3 className="text-md font-medium text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{channel.description}</p>
                <a
                  href={channel.link}
                  className="text-sm text-green-600 font-medium hover:text-green-800 flex items-center"
                >
                  {channel.action} <FiArrowRight className="ml-1" />
                </a>
              </div>
            ))}
          </div>

          {/* Help Categories */}
          <div className="mb-6" data-aos="fade-up">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {helpCategories.map((category, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="text-green-600 mr-3">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <a
                        key={articleIndex}
                        href="#"
                        className="block text-sm text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {article}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-aos="fade-up">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Popular Articles</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularArticles.map((article, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700">{article}</span>
                    <FiExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-aos="fade-up">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h3 className="text-md font-medium text-gray-900">{faq.question}</h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform ${activeFAQ === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-aos="fade-up">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <FiAlertTriangle className="text-yellow-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Troubleshooting Common Issues</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {troubleshooting.map((item, index) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="text-sm font-medium text-red-800">{item.issue}</h3>
                    <p className="text-sm text-gray-700 mt-1">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-aos="fade-up">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <FiTrendingUp className="text-green-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Best Practices</h2>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {bestPractices.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-green-50 rounded-2xl p-6 mb-6" data-aos="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-gray-900">Still need help?</h3>
                <p className="text-sm text-gray-600 mt-1">Our support team is here to help you</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="mailto:support@5starecommerce.com"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-aos="fade-up">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="text-green-600 mb-3">
                  {option.icon}
                </div>
                <h3 className="text-md font-medium text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                <a
                  href={option.link}
                  className="text-sm text-green-600 font-medium hover:text-green-800 flex items-center"
                >
                  {option.action} <FiArrowRight className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}