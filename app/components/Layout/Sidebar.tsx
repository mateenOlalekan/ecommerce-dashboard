'use client';

import { useState, useEffect,JSX } from "react";
import { FiLogOut, FiHome, FiBox, FiShoppingCart, FiUser, FiTrendingUp, FiDollarSign, FiBell, FiMessageSquare, FiSettings, FiHelpCircle } from "react-icons/fi";
import { Store } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";
import { PanelRightClose, PanelRightOpen, X } from "lucide-react";
import {NavigationItem,AccountItem,navigationItems,accountItems} from "../../data/data"

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onClose }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    // Close mobile sidebar when item is clicked
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && onClose) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-blur-2xl bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: isMobileOpen ? 0 : (window.innerWidth >= 1024 ? 0 : -300)
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed lg:relative inset-y-0 left-0 z-50
                   bg-gradient-to-b from-green-900 to-green-800
                   shadow-xl flex flex-col text-white 
                   transition-all duration-300 
                   ${isSidebarOpen ? "w-64" : "w-16"}
                   ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-green-700 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
              <FiShoppingCart className="text-2xl text-green-700" />
            </div>
            {isSidebarOpen && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-bold tracking-wide"
              >
                Avalon Mart
              </motion.h1>
            )}
          </div>

          {/* Close button for mobile */}
          {isMobileOpen && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Toggle Button for desktop */}
          {!isMobileOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute -right-4 p-2 rounded-lg bg-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hidden lg:block"
            >
              {isSidebarOpen ? (
                <PanelRightClose className="text-green-700 w-5 h-5" />
              ) : (
                <PanelRightOpen className="text-green-700 w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1 px-2">
            {isSidebarOpen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-2 text-xs font-semibold uppercase tracking-wide text-green-300 mb-1"
              >
                Main
              </motion.p>
            )}
            {navigationItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <motion.div
                  data-tooltip-id={`tooltip-${index}`}
                  data-tooltip-content={item.name}
                  whileHover={{ x: isSidebarOpen ? 4 : 0 }}
                  onClick={() => handleItemClick(index)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer group ${
                    activeItem === index
                      ? "bg-green-700 shadow-md border-l-4 border-green-300"
                      : "hover:bg-green-700 hover:border-l-4 hover:border-green-500"
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
                      className="flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {item.count && isSidebarOpen && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-500 rounded-full min-w-6 flex items-center justify-center">
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

          {/* Account Navigation */}
          <div className="space-y-1 px-2">
            {isSidebarOpen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-2 text-xs font-semibold uppercase tracking-wide text-green-300 mb-2"
              >
                Account
              </motion.p>
            )}
            {accountItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <motion.div
                  data-tooltip-id={`acct-tooltip-${index}`}
                  data-tooltip-content={item.name}
                  whileHover={{ x: isSidebarOpen ? 4 : 0 }}
                  onClick={() => handleItemClick(index + navigationItems.length)}
                  className={`flex items-center gap-2 px-3 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer group ${
                    activeItem === index + navigationItems.length
                      ? "bg-green-700 shadow-md border-l-4 border-green-300"
                      : "hover:bg-green-700 hover:border-l-4 hover:border-green-500"
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
                      className="flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {item.count && isSidebarOpen && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-500 rounded-full min-w-6 flex items-center justify-center">
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
        </nav>

        {/* Logout Section */}
        <div className="px-4 py-4 border-t border-green-700">
          <Link href="/logout">
            <motion.div
              data-tooltip-id="logout-tooltip"
              data-tooltip-content="Logout"
              whileHover={{ x: isSidebarOpen ? 4 : 0 }}
              className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:bg-green-700 cursor-pointer group"
            >
              <FiLogOut className={`text-lg flex-shrink-0 transition-colors duration-200 ${
                "text-green-200 group-hover:text-white"
              }`} />
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-green-200 group-hover:text-white"
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