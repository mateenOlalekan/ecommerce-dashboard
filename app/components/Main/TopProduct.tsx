'use client';
import {useMemo} from 'react';
import { FiFilter} from 'react-icons/fi';
import { BsStarHalf, BsBoxSeam, BsGraphUp, BsExclamationTriangle } from 'react-icons/bs';
import {Product} from "@/app/data/data"


export default function TopProduct() {
  const topProducts: Product[] = useMemo(() => [
    { name: 'Wireless Headphones', price: 159.99, sold: 245, stock: 32, rating: 4.8, category: 'Electronics', revenue: 39197.55, growth: 15 },
    { name: 'Smart Watch Series 5', price: 249.99, sold: 189, stock: 15, rating: 4.6, category: 'Electronics', revenue: 47248.11, growth: 22 },
    { name: 'Bluetooth Speaker', price: 79.99, sold: 167, stock: 41, rating: 4.5, category: 'Electronics', revenue: 13358.33, growth: 8 },
    { name: 'Phone Charging Dock', price: 39.99, sold: 242, stock: 56, rating: 4.3, category: 'Accessories', revenue: 9677.58, growth: 12 },
    { name: 'Fitness Tracker', price: 89.99, sold: 135, stock: 12, rating: 4.7, category: 'Fitness', revenue: 12148.65, growth: 18 },
  ], []);
  
  return (
    <div 
      className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr 
                        key={index}
                        className=" hover:bg-gray-50 group"
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
                        <td className="py-2">
                          <div className="flex flex-col space-y-1">
                            <span className={`text-xs font-medium px-2 w-fit py-1 rounded-full ${
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    )
}