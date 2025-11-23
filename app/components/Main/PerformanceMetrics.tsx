'use client';
import { motion} from 'framer-motion';
import { LuDollarSign, LuShoppingCart} from 'react-icons/lu';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { BsStarHalf} from 'react-icons/bs';
import { IoStatsChart} from 'react-icons/io5';

export default function PerformanceMetrics(){
    return(
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
    )
}