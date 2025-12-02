"use client";
import { JSX } from "react";
import { LuDollarSign, LuShoppingCart, LuUser,} from "react-icons/lu";
import { FcPieChart} from "react-icons/fc";
import { FiHome, FiBox, FiShoppingCart, FiUser, FiTrendingUp, FiDollarSign, FiBell, FiMessageSquare, FiSettings, FiHelpCircle } from "react-icons/fi";
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

interface recent{
  id:string;
  customer:string,
  date:string,
  amount:string,
  status:string,
  items:number,
  payment:string,

}

export const recentOrders: recent[] = [
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

// Sample conversations data
export const conversationsData = [
    {
      id: 'CONV-1001',
      user: { name: 'Emily Johnson', email: 'emily.johnson@example.com', avatar: '/images/avatars/emily.jpg' },
      lastMessage: 'Hello, I have a question about my order #78945',
      timestamp: '2023-11-15T14:30:00Z',
      unread: 2,
      status: 'unread'
    },
    {
      id: 'CONV-1002',
      user: { name: 'Michael Brown', email: 'michael.brown@example.com', avatar: '/images/avatars/michael.jpg' },
      lastMessage: 'Thank you for your help with the return process',
      timestamp: '2023-11-14T10:15:00Z',
      unread: 0,
      status: 'read'
    },
    {
      id: 'CONV-1003',
      user: { name: 'Sarah Williams', email: 'sarah.williams@example.com', avatar: '/images/avatars/sarah.jpg' },
      lastMessage: 'When will my order be shipped?',
      timestamp: '2023-11-14T09:45:00Z',
      unread: 1,
      status: 'unread'
    },

  ];




// types.ts

export interface Customer {
  name: string;
  email: string;
}

export interface Payment {
  method: string;
  status: string;
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
}

export interface Shipping {
  address: string;
  method: string;
}

export interface Tracking {
  carrier: string;
  number: string;
}

export interface Order {
  id: string;
  customer: Customer;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment: Payment;
  items: Item[];
  total: number;
  shipping: Shipping;
  tracking: Tracking | null;
}

export interface StatusFilter {
  key: string;
  label: string;
  count: number;
  color: string;
}
export const ordersData: Order[] = [
    {
      id: 'ORD-78945',
      customer: { name: 'Emily Johnson', email: 'emily@example.com' },
      date: '2023-11-15T14:30:00Z',
      status: 'delivered',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Wireless Bluetooth Headphones', price: 159.99, quantity: 1 },
        { name: 'Phone Case', price: 24.99, quantity: 1 }
      ],
      total: 184.98,
      shipping: { address: '123 Main St, New York, NY 10001', method: 'express' },
      tracking: { carrier: 'UPS', number: '1Z999AA10123456784' }
    },
    {
      id: 'ORD-78946',
      customer: { name: 'Michael Brown', email: 'michael@example.com' },
      date: '2023-11-14T10:15:00Z',
      status: 'processing',
      payment: { method: 'paypal', status: 'completed' },
      items: [
        { name: 'Smart Fitness Tracker', price: 89.99, quantity: 2 }
      ],
      total: 179.98,
      shipping: { address: '456 Oak Ave, Los Angeles, CA 90001', method: 'standard' },
      tracking: null
    },
    {
      id: 'ORD-78947',
      customer: { name: 'Sarah Williams', email: 'sarah@example.com' },
      date: '2023-11-14T09:45:00Z',
      status: 'shipped',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Organic Cotton T-Shirt', price: 29.99, quantity: 3 },
        { name: 'Stainless Steel Water Bottle', price: 34.99, quantity: 1 }
      ],
      total: 124.96,
      shipping: { address: '789 Pine Rd, Chicago, IL 60601', method: 'standard' },
      tracking: { carrier: 'USPS', number: '94001118992213456784' }
    },
    {
      id: 'ORD-78948',
      customer: { name: 'David Miller', email: 'david@example.com' },
      date: '2023-11-13T16:20:00Z',
      status: 'pending',
      payment: { method: 'credit_card', status: 'pending' },
      items: [
        { name: 'Professional Camera Lens', price: 499.99, quantity: 1 }
      ],
      total: 499.99,
      shipping: { address: '321 Elm St, Houston, TX 77001', method: 'express' },
      tracking: null
    },
    {
      id: 'ORD-78949',
      customer: { name: 'Jennifer Davis', email: 'jennifer@example.com' },
      date: '2023-11-12T11:30:00Z',
      status: 'cancelled',
      payment: { method: 'paypal', status: 'refunded' },
      items: [
        { name: 'Yoga Mat Premium', price: 59.99, quantity: 1 },
        { name: 'Wireless Phone Charger', price: 24.99, quantity: 2 }
      ],
      total: 109.97,
      shipping: { address: '654 Maple Dr, Phoenix, AZ 85001', method: 'standard' },
      tracking: null
    },
    {
      id: 'ORD-78950',
      customer: { name: 'Robert Wilson', email: 'robert@example.com' },
      date: '2023-11-12T09:15:00Z',
      status: 'delivered',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Ceramic Coffee Mug Set', price: 39.99, quantity: 1 }
      ],
      total: 39.99,
      shipping: { address: '987 Cedar Ln, Philadelphia, PA 19101', method: 'standard' },
      tracking: { carrier: 'FedEx', number: '789012345678' }
    },
    {
      id: 'ORD-78951',
      customer: { name: 'Lisa Anderson', email: 'lisa@example.com' },
      date: '2023-11-11T13:45:00Z',
      status: 'processing',
      payment: { method: 'credit_card', status: 'completed' },
      items: [
        { name: 'Wireless Bluetooth Headphones', price: 159.99, quantity: 1 },
        { name: 'Phone Case', price: 24.99, quantity: 1 },
        { name: 'Screen Protector', price: 14.99, quantity: 1 }
      ],
      total: 199.97,
      shipping: { address: '147 Walnut St, San Antonio, TX 78201', method: 'express' },
      tracking: null
    },
    {
      id: 'ORD-78952',
      customer: { name: 'James Taylor', email: 'james@example.com' },
      date: '2023-11-10T15:20:00Z',
      status: 'shipped',
      payment: { method: 'paypal', status: 'completed' },
      items: [
        { name: 'Stainless Steel Water Bottle', price: 34.99, quantity: 2 }
      ],
      total: 69.98,
      shipping: { address: '258 Birch Ave, San Diego, CA 92101', method: 'standard' },
      tracking: { carrier: 'USPS', number: '94001118992215678943' }
    }
  ];