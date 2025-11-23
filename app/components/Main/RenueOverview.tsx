'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown} from 'react-icons/fi';
import { TbChartArcs} from 'react-icons/tb';
export default function ReviewOverview(){
    return(
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
    )
}