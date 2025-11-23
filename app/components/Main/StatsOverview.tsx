'use client';
import { motion} from 'framer-motion';
import { FiTrendingUp, FiTrendingDown} from 'react-icons/fi';
import { statsData} from '@/app/data/data';
export default function StatsOverview(){
    return(
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
    )
}