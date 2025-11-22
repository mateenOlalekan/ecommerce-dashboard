import { FiHome,     FiBox,     FiShoppingCart,     FiUser,     FiTrendingUp,     FiDollarSign,FiBell,FiMessageSquare,FiSettings,FiHelpCircle  } from "react-icons/fi";
import {Store} from "lucide-react"

  import {JSX} from "react";
  
  interface NavItem {
    name: string;
    icon: JSX.Element;
    active: boolean;
    href:string;
    count?: number; // made optional
  }

  interface NavAccountItem {
    name: string;
    icon: JSX.Element;
    href:string;
    count?: number; // made optional
  }
  
  export const navigationItems: NavItem[] = [
    { name: "Dashboard",href: "/", icon: <FiHome className="text-xl" />, active: true },
    { name: "Products",href: "/dashboard/products", icon: <FiBox className="text-xl" />, active: false },
    { name: "Orders",href: "/dashboard/orders", icon: <FiShoppingCart className="text-xl" />, active: false, count: 5 },
    { name: "Customers",href: "/dashboard/customer", icon: <FiUser className="text-xl" />, active: false },
    { name: "Retailers",href: "/dashboard/retailer", icon: <Store className="text-xl" />, active: false },
    { name: "Analytics",href: "/dashboard/analytics", icon: <FiTrendingUp className="text-xl" />, active: false },
    { name: "Revenue",href: "/dashboard/revenue", icon: <FiDollarSign className="text-xl" />, active: false },
  ];
  
   export const accountItems : NavAccountItem[] = [
     { name: 'Notifications',href: "/dashboard/notifications", icon: <FiBell className="text-xl" />, count: 3 },
     { name: 'Messages',href: "/dashboard/message", icon: <FiMessageSquare className="text-xl" />, count: 7 },
     { name: 'Settings',href: "/dashboard/settings", icon: <FiSettings className="text-xl" /> },
     { name: 'Help & Support',href: "/dashboard/help", icon: <FiHelpCircle className="text-xl" /> },
   ];