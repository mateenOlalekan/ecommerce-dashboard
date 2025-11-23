'use client';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { BsBagCheck } from 'react-icons/bs';
import { IoTime } from 'react-icons/io5';
import { Order, recentOrders } from "../../data/data";

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

export default function RecentOrder() {
  return (
    <motion.div 
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
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
        {recentOrders.map((order, index) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
      </div>
    </motion.div>
  );
}