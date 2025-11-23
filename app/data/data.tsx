"use client";
import { JSX } from "react";
import { LuDollarSign, LuShoppingCart, LuUser,} from "react-icons/lu";
import { FcPieChart} from "react-icons/fc";
import { FiLogOut, FiHome, FiBox, FiShoppingCart, FiUser, FiTrendingUp, FiDollarSign, FiBell, FiMessageSquare, FiSettings, FiHelpCircle } from "react-icons/fi";
import { Store } from "lucide-react";

export interface StatData {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element;
  color: string;
  chartColor: string;
  textColor: string;
  trend: "up" | "down";
  description?: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing" | "Shipped" | "Cancelled";
  items: number;
  payment: string;
}

export interface Product {
  name: string;
  price: number;
  sold: number;
  stock: number;
  rating: number;
  category: string;
  revenue: number;
  growth: number;
}
export interface NavigationItem {
  name: string;
  href: string;
  icon: JSX.Element;
  active?: boolean;
  count?: number;
}

export interface AccountItem {
  name: string;
  href: string;
  icon: JSX.Element;
  count?: number;
}

// ✅ STATIC DATA — no hooks needed
export const statsData: StatData[] = [
  {
    title: "Total Revenue",
    value: "$45,263.00",
    change: "+12.5%",
    icon: <LuDollarSign className="text-2xl" />,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    chartColor: "bg-green-100",
    textColor: "text-green-600",
    trend: "up",
    description: "Compared to last month",
  },
  {
    title: "Total Orders",
    value: "2,846",
    change: "+8.2%",
    icon: <LuShoppingCart className="text-2xl" />,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    chartColor: "bg-blue-100",
    textColor: "text-blue-600",
    trend: "up",
    description: "324 more than last month",
  },
  {
    title: "New Customers",
    value: "542",
    change: "+15.7%",
    icon: <LuUser className="text-2xl" />,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    chartColor: "bg-purple-100",
    textColor: "text-purple-600",
    trend: "up",
    description: "Highest growth this quarter",
  },
  {
    title: "Conversion Rate",
    value: "28.8%",
    change: "+2.5%",
    icon: <FcPieChart className="text-2xl" />,
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    chartColor: "bg-orange-100",
    textColor: "text-orange-600",
    trend: "up",
    description: "Improved by 2.5% points",
  },
];

export const recentOrders: Order[] = [
  {
    id: "#1001",
    customer: "Sarah Johnson",
    date: "2 hours ago",
    amount: "$345.75",
    status: "Completed",
    items: 3,
    payment: "Credit Card",
  },
  {
    id: "#1002",
    customer: "Michael Brown",
    date: "4 hours ago",
    amount: "$230.50",
    status: "Processing",
    items: 2,
    payment: "PayPal",
  },
  {
    id: "#1003",
    customer: "Emily Wilson",
    date: "6 hours ago",
    amount: "$199.99",
    status: "Completed",
    items: 1,
    payment: "Credit Card",
  },
  {
    id: "#1004",
    customer: "John Davis",
    date: "1 day ago",
    amount: "$455.25",
    status: "Shipped",
    items: 4,
    payment: "Stripe",
  },
  {
    id: "#1005",
    customer: "Robert Garcia",
    date: "1 day ago",
    amount: "$129.99",
    status: "Cancelled",
    items: 1,
    payment: "Credit Card",
  },
];

export const topProducts: Product[] = [
  {
    name: "Wireless Headphones",
    price: 159.99,
    sold: 245,
    stock: 32,
    rating: 4.8,
    category: "Electronics",
    revenue: 39197.55,
    growth: 15,
  },
  {
    name: "Smart Watch Series 5",
    price: 249.99,
    sold: 189,
    stock: 15,
    rating: 4.6,
    category: "Electronics",
    revenue: 47248.11,
    growth: 22,
  },
  {
    name: "Bluetooth Speaker",
    price: 79.99,
    sold: 167,
    stock: 41,
    rating: 4.5,
    category: "Electronics",
    revenue: 13358.33,
    growth: 8,
  },
  {
    name: "Phone Charging Dock",
    price: 39.99,
    sold: 242,
    stock: 56,
    rating: 4.3,
    category: "Accessories",
    revenue: 9677.58,
    growth: 12,
  },
  {
    name: "Fitness Tracker",
    price: 89.99,
    sold: 135,
    stock: 12,
    rating: 4.7,
    category: "Fitness",
    revenue: 12148.65,
    growth: 18,
  },
];

export const navigationItems: NavigationItem[] = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: <FiHome className="text-xl" />, 
    active: true 
  },
  { 
    name: "Products", 
    href: "/dashboard/products", 
    icon: <FiBox className="text-xl" />, 
    active: false 
  },
  { 
    name: "Orders", 
    href: "/dashboard/orders", 
    icon: <FiShoppingCart className="text-xl" />, 
    active: false, 
    count: 5 
  },
  { 
    name: "Customers", 
    href: "/dashboard/customer", 
    icon: <FiUser className="text-xl" />, 
    active: false 
  },
  { 
    name: "Retailers", 
    href: "/dashboard/retailer", 
    icon: <Store className="text-xl" />, 
    active: false 
  },
  { 
    name: "Analytics", 
    href: "/dashboard/analytics", 
    icon: <FiTrendingUp className="text-xl" />, 
    active: false 
  },
  { 
    name: "Revenue", 
    href: "/dashboard/revenue", 
    icon: <FiDollarSign className="text-xl" />, 
    active: false 
  },
];

export const accountItems: AccountItem[] = [
  { 
    name: 'Notifications', 
    href: "/dashboard/notifications", 
    icon: <FiBell className="text-xl" />, 
    count: 3 
  },
  { 
    name: 'Messages', 
    href: "/dashboard/message", 
    icon: <FiMessageSquare className="text-xl" />, 
    count: 7 
  },
  { 
    name: 'Settings', 
    href: "/dashboard/settings", 
    icon: <FiSettings className="text-xl" /> 
  },
  { 
    name: 'Help & Support', 
    href: "/dashboard/help", 
    icon: <FiHelpCircle className="text-xl" /> 
  },
];