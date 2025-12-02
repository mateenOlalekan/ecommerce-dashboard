'use client'
import { Bell, MessageSquareText, Search, ChevronDown, Menu, Settings, HelpCircle, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowMessages(false);
  };

  return (
    <header className="w-full px-4 py-3 z-40 shadow-sm bg-white border-b border-gray-200 sticky top-0">
      <div className="flex justify-between items-center">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">AM</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 hidden sm:block">
              Avalon Mart
            </h1>
          </div>
        </div>

        {/* Middle Section - Dashboard Title and Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex items-center gap-6">

          
          {/* Search */}
          <div className={`flex items-center border rounded-lg px-3 py-2 w-full max-w-md transition-all duration-200 ${
            searchFocused ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 bg-gray-100'
          }`}>
            <Search className="text-gray-500 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="flex-1 bg-transparent outline-none px-2 text-sm placeholder-gray-500"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Search className="w-5 h-5 text-gray-600" />
          </button>



          {/* Messages */}
          <button 
            className="p-2 rounded-md hover:bg-gray-100 relative transition-colors duration-200"
            onClick={() => setShowMessages(!showMessages)}
          >
            <MessageSquareText className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              className="flex items-center gap-2 pl-2 pr-2 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleProfileMenu}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
                <span className="text-white font-medium text-sm">AO</span>
              </div>
              <div className="hidden lg:flex items-center">
                <span className="font-medium text-gray-700 text-sm">Admin</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 ml-1 transition-transform duration-200 ${
                  showProfileMenu ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 zoom-in-95">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">Admin Officer</p>
                  <p className="text-xs text-gray-500 mt-1">admin@avalonmart.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <Settings className="w-4 h-4 mr-3 text-gray-400" />
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <HelpCircle className="w-4 h-4 mr-3 text-gray-400" />
                    Help & Support
                  </button>
                </div>
                <div className="py-1 border-t border-gray-200">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dashboard Title and Search */}
      <div className="md:hidden mt-3 flex items-center justify-between gap-3">
        <div className={`flex items-center border rounded-lg px-3 py-2 flex-1 transition-all duration-200 ${
          searchFocused ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300 bg-gray-100'
        }`}>
          <Search className="text-gray-500 w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none px-2 text-sm placeholder-gray-500"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;