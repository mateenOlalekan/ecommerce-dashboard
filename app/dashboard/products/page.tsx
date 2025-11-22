'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiChevronDown, FiFilter, FiSearch, FiEye, FiEdit, FiTrash2, FiPlus, FiGrid, FiList } from 'react-icons/fi';
import { LuShoppingCart, LuStar, LuBox } from 'react-icons/lu';
import { BsThreeDotsVertical, BsTags, BsImage } from 'react-icons/bs';


export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

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

  // Sample products data
  const productsData = [
    { 
      id: 'prod-001', 
      name: 'Wireless Bluetooth Headphones', 
      category: 'Electronics',
      price: 159.99,
      cost: 89.50,
      stock: 45,
      sku: 'WH-1000XM4',
      status: 'published',
      rating: 4.8,
      reviews: 245,
      image: '/images/products/headphones.jpg',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
      tags: ['wireless', 'noise-cancelling', 'premium'],
      createdAt: '2023-10-15T14:30:00Z',
      updatedAt: '2023-11-05T09:15:00Z'
    },
    { 
      id: 'prod-002', 
      name: 'Smart Fitness Tracker', 
      category: 'Electronics',
      price: 89.99,
      cost: 45.75,
      stock: 128,
      sku: 'FIT-TRACK-PRO',
      status: 'published',
      rating: 4.6,
      reviews: 189,
      image: '/images/products/fitness-tracker.jpg',
      description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
      tags: ['fitness', 'wearable', 'health'],
      createdAt: '2023-09-22T10:15:00Z',
      updatedAt: '2023-11-02T14:20:00Z'
    },
    { 
      id: 'prod-003', 
      name: 'Organic Cotton T-Shirt', 
      category: 'Clothing',
      price: 29.99,
      cost: 12.50,
      stock: 0,
      sku: 'TS-ORG-COTTON',
      status: 'draft',
      rating: 4.5,
      reviews: 87,
      image: '/images/products/tshirt.jpg',
      description: 'Comfortable organic cotton t-shirt available in multiple colors.',
      tags: ['organic', 'cotton', 'sustainable'],
      createdAt: '2023-08-30T16:45:00Z',
      updatedAt: '2023-11-01T11:30:00Z'
    },
    { 
      id: 'prod-004', 
      name: 'Stainless Steel Water Bottle', 
      category: 'Accessories',
      price: 34.99,
      cost: 18.25,
      stock: 76,
      sku: 'WB-SSTEEL-1L',
      status: 'published',
      rating: 4.7,
      reviews: 132,
      image: '/images/products/water-bottle.jpg',
      description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
      tags: ['eco-friendly', 'insulated', 'bpa-free'],
      createdAt: '2023-10-05T09:20:00Z',
      updatedAt: '2023-10-28T16:40:00Z'
    },
    { 
      id: 'prod-005', 
      name: 'Professional Camera Lens', 
      category: 'Electronics',
      price: 499.99,
      cost: 285.00,
      stock: 12,
      sku: 'LENS-50MM-F1.8',
      status: 'published',
      rating: 4.9,
      reviews: 76,
      image: '/images/products/camera-lens.jpg',
      description: 'Professional-grade 50mm prime lens with f/1.8 aperture for stunning portraits.',
      tags: ['photography', 'professional', 'prime-lens'],
      createdAt: '2023-09-10T13:15:00Z',
      updatedAt: '2023-10-25T10:45:00Z'
    },
    { 
      id: 'prod-006', 
      name: 'Yoga Mat Premium', 
      category: 'Fitness',
      price: 59.99,
      cost: 28.90,
      stock: 34,
      sku: 'YG-MAT-PREMIUM',
      status: 'published',
      rating: 4.4,
      reviews: 54,
      image: '/images/products/yoga-mat.jpg',
      description: 'Eco-friendly yoga mat with non-slip surface and carrying strap.',
      tags: ['yoga', 'fitness', 'eco-friendly'],
      createdAt: '2023-10-18T11:45:00Z',
      updatedAt: '2023-10-30T14:15:00Z'
    },
    { 
      id: 'prod-007', 
      name: 'Ceramic Coffee Mug Set', 
      category: 'Home & Kitchen',
      price: 39.99,
      cost: 19.75,
      stock: 89,
      sku: 'MUG-SET-4PC',
      status: 'published',
      rating: 4.3,
      reviews: 43,
      image: '/images/products/coffee-mug.jpg',
      description: 'Set of 4 handmade ceramic coffee mugs with modern design.',
      tags: ['kitchen', 'ceramic', 'handmade'],
      createdAt: '2023-08-15T14:20:00Z',
      updatedAt: '2023-10-22T09:30:00Z'
    },
    { 
      id: 'prod-008', 
      name: 'Wireless Phone Charger', 
      category: 'Electronics',
      price: 24.99,
      cost: 11.50,
      stock: 156,
      sku: 'WRLS-CHRGR-15W',
      status: 'published',
      rating: 4.2,
      reviews: 98,
      image: '/images/products/wireless-charger.jpg',
      description: 'Fast 15W wireless charger compatible with all Qi-enabled devices.',
      tags: ['electronics', 'charging', 'wireless'],
      createdAt: '2023-10-22T16:30:00Z',
      updatedAt: '2023-11-04T12:20:00Z'
    },
  ];

  const statusFilters = [
    { key: 'all', label: 'All Products', count: productsData.length },
    { key: 'published', label: 'Published', count: productsData.filter(product => product.status === 'published').length },
    { key: 'draft', label: 'Draft', count: productsData.filter(product => product.status === 'draft').length },
    { key: 'outofstock', label: 'Out of Stock', count: productsData.filter(product => product.stock === 0).length },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'homekitchen', label: 'Home & Kitchen' },
  ];

  const filteredProducts = productsData.filter(product => {
    const matchesStatus = activeFilter === 'all' || 
                         (activeFilter === 'published' && product.status === 'published') ||
                         (activeFilter === 'draft' && product.status === 'draft') ||
                         (activeFilter === 'outofstock' && product.stock === 0);
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status, stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (status === 'published') return 'bg-green-100 text-green-800';
    if (status === 'draft') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status, stock) => {
    if (stock === 0) return 'Out of Stock';
    if (status === 'published') return 'Published';
    if (status === 'draft') return 'Draft';
    return status;
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Products Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
              <p className="text-gray-500 mt-1">Manage your product catalog and inventory</p>
            </div>
            <button className="mt-4 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center">
              <FiPlus className="mr-2" /> Add New Product
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-aos="fade-up">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{productsData.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <LuBox className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{statusFilters.find(f => f.key === 'published').count}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <FiEye className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Out of Stock</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{statusFilters.find(f => f.key === 'outofstock').count}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-xl text-red-600">
                  <LuBox className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Categories</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{categories.length - 1}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <BsTags className="text-xl" />
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
                    {filter.label} <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{filter.count}</span>
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
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
                  />
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium"
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid/List View */}
          {viewMode === 'grid' ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6"
              data-aos="fade-up"
            >
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <BsImage className="text-3xl text-gray-400" />
                    </div>
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status, product.stock)}`}>
                      {getStatusText(product.status, product.stock)}
                    </span>
                    <div className="absolute top-3 right-3">
                      <button className="p-1.5 bg-white rounded-lg shadow-sm text-gray-500 hover:text-gray-700">
                        <BsThreeDotsVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <LuStar className="text-yellow-400 w-4 h-4" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {product.stock} in stock
                      </span>
                      <span className="text-sm text-gray-500">{product.sku}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => viewProductDetails(product)}
                        className="text-sm text-green-600 hover:text-green-800 font-medium"
                      >
                        View Details
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
              data-aos="fade-up"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product, index) => (
                      <motion.tr 
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                              <BsImage className="text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <LuStar className="text-yellow-400 w-3 h-3 mr-1" />
                                {product.rating} ({product.reviews})
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={`${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status, product.stock)}`}>
                            {getStatusText(product.status, product.stock)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              onClick={() => viewProductDetails(product)}
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

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">No products found</div>
                  <div className="text-gray-500 text-sm">Try changing your filters or search query</div>
                </div>
              )}

              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                  <span className="font-medium">{filteredProducts.length}</span> results
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
          )}
        </main>
      </div>

      {/* Product Details Sidebar */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowProductDetails(false)}></div>
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
                      <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowProductDetails(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{selectedProduct.sku}</p>
                  </div>
                  <div className="flex-1 py-6 px-6 space-y-6">
                    <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <BsImage className="text-3xl text-gray-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">Product Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium">{selectedProduct.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{selectedProduct.category}</p>
                        <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">Pricing & Inventory</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-sm font-medium">${selectedProduct.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Cost</p>
                          <p className="text-sm font-medium">${selectedProduct.cost.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className="text-sm font-medium">{selectedProduct.stock} units</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedProduct.status, selectedProduct.stock)}`}>
                            {getStatusText(selectedProduct.status, selectedProduct.stock)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">Reviews & Ratings</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <LuStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{selectedProduct.rating}</span>
                          <span className="text-sm text-gray-500 ml-2">({selectedProduct.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">Product Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.tags.map((tag, index) => (
                          <span key={index} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FiEdit className="mr-2" /> Edit Product
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Update Inventory
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