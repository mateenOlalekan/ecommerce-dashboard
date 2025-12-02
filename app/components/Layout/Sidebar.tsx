'use client';
import { useState, useEffect} from "react";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";
import { PanelRightClose, PanelRightOpen, X } from "lucide-react";
import {navigationItems,accountItems} from "../../data/data"

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onClose }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize AOS and set mounted state
  useEffect(() => {
    setIsMounted(true);
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    // Close mobile sidebar when item is clicked
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && onClose) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  // Safe window check for animations
  const getInitialX = () => {
    if (!isMounted) return -300;
    return isMobileOpen ? 0 : (window.innerWidth >= 1024 ? 0 : -300);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: isMounted ? (isMobileOpen ? 0 : (window.innerWidth >= 1024 ? 0 : -300)) : -300
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed lg:sticky top-0 h-screen left-0 z-50
                   bg-gradient-to-b from-green-900 to-green-800
                   shadow-xl flex flex-col text-white 
                   transition-all duration-300 
                   ${isSidebarOpen ? "w-64" : "w-16"}
                   ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ height: '100vh' }}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b border-green-700 relative min-h-[64px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow flex-shrink-0">
              <FiShoppingCart className="text-2xl text-green-700" />
            </div>
            {isSidebarOpen && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-bold tracking-wide truncate"
              >
                Avalon Mart
              </motion.h1>
            )}
          </div>

          {/* Close button for mobile */}
          {isMobileOpen && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Toggle Button for desktop */}
          {!isMobileOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-6 p-2 rounded-lg bg-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hidden lg:flex items-center justify-center z-10"
              style={{ width: '24px', height: '24px' }}
            >
              {isSidebarOpen ? (
                <PanelRightClose className="text-green-700 w-4 h-4" />
              ) : (
                <PanelRightOpen className="text-green-700 w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-4 px-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            {isSidebarOpen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 text-xs font-semibold uppercase tracking-wide text-green-300 mb-2"
              >
                Main
              </motion.p>
            )}
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                <Link key={index} href={item.href} className="block">
                  <motion.div
                    data-tooltip-id={`tooltip-${index}`}
                    data-tooltip-content={item.name}
                    whileHover={{ x: isSidebarOpen ? 4 : 0 }}
                    onClick={() => handleItemClick(index)}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer group ${
                      activeItem === index
                        ? "bg-green-700 shadow-md border-l-2 border-green-300"
                        : "hover:bg-green-700 hover:border-l-2 hover:border-green-500"
                    } ${!isSidebarOpen ? "justify-center" : ""}`}
                  >
                    <span className={`flex-shrink-0 transition-colors duration-200 ${
                      activeItem === index ? "text-white" : "text-green-200 group-hover:text-white"
                    }`}>
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="ml-3 flex-1 truncate"
                      >
                        {item.name}
                      </motion.span>
                    )}
                    {item.count && isSidebarOpen && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-500 rounded-full min-w-6 flex items-center justify-center ml-2">
                        {item.count}
                      </span>
                    )}
                    {!isSidebarOpen && (
                      <Tooltip id={`tooltip-${index}`} place="right" />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Navigation */}
          <div className="space-y-1">
            {isSidebarOpen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 text-xs font-semibold uppercase tracking-wide text-green-300 mb-2"
              >
                Account
              </motion.p>
            )}
            <div className="space-y-1">
              {accountItems.map((item, index) => (
                <Link key={index} href={item.href} className="block">
                  <motion.div
                    data-tooltip-id={`acct-tooltip-${index}`}
                    data-tooltip-content={item.name}
                    whileHover={{ x: isSidebarOpen ? 4 : 0 }}
                    onClick={() => handleItemClick(index + navigationItems.length)}
                    className={`flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer group ${
                      activeItem === index + navigationItems.length
                        ? "bg-green-700 shadow-md border-l-2 border-green-300"
                        : "hover:bg-green-700 hover:border-l-2 hover:border-green-500"
                    } ${!isSidebarOpen ? "justify-center" : ""}`}
                  >
                    <span className={`flex-shrink-0 transition-colors duration-200 ${
                      activeItem === index + navigationItems.length ? "text-white" : "text-green-200 group-hover:text-white"
                    }`}>
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="ml-3 flex-1 truncate"
                      >
                        {item.name}
                      </motion.span>
                    )}
                    {item.count && isSidebarOpen && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-500 rounded-full min-w-6 flex items-center justify-center ml-2">
                        {item.count}
                      </span>
                    )}
                    {!isSidebarOpen && (
                      <Tooltip id={`acct-tooltip-${index}`} place="right" />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-green-700 mt-auto">
          <Link href="/logout">
            <motion.div
              data-tooltip-id="logout-tooltip"
              data-tooltip-content="Logout"
              whileHover={{ x: isSidebarOpen ? 4 : 0 }}
              className="flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:bg-green-700 cursor-pointer group"
            >
              <FiLogOut className={`text-lg flex-shrink-0 transition-colors duration-200 ${
                "text-green-200 group-hover:text-white"
              }`} />
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ml-3 text-green-200 group-hover:text-white"
                >
                  Logout
                </motion.span>
              )}
              {!isSidebarOpen && <Tooltip id="logout-tooltip" place="right" />}
            </motion.div>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}