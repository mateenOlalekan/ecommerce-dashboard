'use client'
import { useState } from "react";
import {FiPlus,FiPackage,FiDollarSign} from "react-icons/fi";
import { LuShoppingCart,LuBox, } from "react-icons/lu";
import { StatusFilter,ordersData} from '@/app/data/data';
export default function OrderFunction(){
      const [statusFilters] = useState<StatusFilter[]>([
        { key: 'all', label: 'All Orders', count: 128, color: 'gray' },
        { key: 'pending', label: 'Pending', count: 24, color: 'yellow' },
        { key: 'processing', label: 'Processing', count: 18, color: 'blue' },
        { key: 'shipped', label: 'Shipped', count: 42, color: 'purple' },
        { key: 'delivered', label: 'Delivered', count: 36, color: 'green' },
        { key: 'cancelled', label: 'Cancelled', count: 8, color: 'red' },
      ]);
    return(
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" >
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
              <p className="text-gray-500 mt-1">Manage customer orders and fulfillment</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg flex items-center hover:bg-gray-50">
                <FiPlus className="mr-2" /> Export
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center">
                <FiPlus className="mr-2" /> Create Order
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" data-aos="fade-up">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{ordersData.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <LuShoppingCart className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Orders</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{statusFilters.find(f => f.key === 'pending')!.count}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                  <FiPackage className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">This Month Revenue</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">$12,458.75</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <FiDollarSign className="text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Order Value</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">$156.24</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <LuBox className="text-xl" />
                </div>
              </div>
            </div>
          </div>        
        </>
    )
}