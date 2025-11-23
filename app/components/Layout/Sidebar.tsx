"use client";

import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip"; // external tooltip lib
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";

import { navigationItems, accountItems } from "@/app/Types/dataTypes";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={`fixed lg:relative inset-y-0 left-0 z-30
                 bg-gradient-to-b from-green-900 to-green-800 max-sm:hidden 
                 shadow-xl flex flex-col text-white 
                 transition-all duration-300 
                 ${isSidebarOpen ? "w-60" : "w-16"}`}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-green-700 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
            <TbShoppingCartDiscount className="text-2xl text-green-700" />
          </div>
          {isSidebarOpen && (
            <h1 className="text-lg font-bold tracking-wide">Avalon</h1>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 p-2 rounded-lg bg-white shadow-2xl transition"
        >
          {isSidebarOpen ? (
            <PanelRightClose className="text-green-700 w-5 h-5" />
          ) : (
            <PanelRightOpen className="text-green-700 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-6">
        {/* Main */}
        <div className="space-y-2 px-2">
          {isSidebarOpen && (
            <p className="px-2 text-xs font-semibold uppercase tracking-wide">
              Main
            </p>
          )}
          {navigationItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <motion.div
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item.name}
                whileHover={{ x: isSidebarOpen ? 5 : 0 }}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  item.active
                    ? "bg-green-700 shadow-md"
                    : "hover:bg-green-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isSidebarOpen && <span className="flex-1">{item.name}</span>}
                {item.count && isSidebarOpen && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-500 rounded-full">
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

        {/* Account */}
        <div className="space-y-2 px-2">
          {isSidebarOpen && (
            <p className="px-2 text-xs font-semibold uppercase tracking-wide">
              Account
            </p>
          )}
          {accountItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <motion.div
                data-tooltip-id={`acct-tooltip-${index}`}
                data-tooltip-content={item.name}
                whileHover={{ x: isSidebarOpen ? 5 : 0 }}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-green-700"
              >
                <span className="text-lg">{item.icon}</span>
                {isSidebarOpen && <span className="flex-1">{item.name}</span>}
                {!isSidebarOpen && (
                  <Tooltip id={`acct-tooltip-${index}`} place="right" />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-green-700">
        <Link href="/logout">
          <motion.div
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Logout"
            whileHover={{ x: isSidebarOpen ? 5 : 0 }}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-green-700"
          >
            <FiLogOut className="text-lg" />
            {isSidebarOpen && <span>Logout</span>}
            {!isSidebarOpen && <Tooltip id="logout-tooltip" place="right" />}
          </motion.div>
        </Link>
      </div>
    </motion.aside>
  );
}
