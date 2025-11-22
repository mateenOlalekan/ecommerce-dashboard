"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Store,
  Mail,
  Phone,
  ShoppingCart,
  Package,
  CreditCard,
  DollarSign,
  MapPin,
  Shield,
  Ban,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Activity,
  Truck,
} from "lucide-react";

export default function RetailerProfilePage() {
  const params = useParams();
  const retailerId = params.id; // dynamic [id]

  // Dummy retailer (replace with API data)
  const retailer = {
    id: retailerId,
    name: "GreenTech Supplies",
    email: "contact@greentech.com",
    phone: "+1 (555) 789-1234",
    status: "Active",
    verified: true,
    joined: "2022-11-15",
    lastLogin: "2025-09-16",
    totalSales: 48250,
    totalPayouts: 44000,
    products: [
      { id: "P-101", name: "Eco Laptop", stock: 45, price: 899.99 },
      { id: "P-102", name: "Solar Charger", stock: 120, price: 49.99 },
      { id: "P-103", name: "GreenTooth Speaker", stock: 32, price: 159.99 },
    ],
    wholesaleOrders: [
      {
        id: "W-5001",
        buyer: "TechMart Stores",
        date: "2025-08-25",
        amount: 5000,
        status: "Shipped",
      },
      {
        id: "W-5002",
        buyer: "EcoWorld Retail",
        date: "2025-09-02",
        amount: 7500,
        status: "Processing",
      },
    ],
    payouts: [
      { id: "PY-2001", date: "2025-08-10", amount: 8000, status: "Completed" },
      { id: "PY-2002", date: "2025-08-30", amount: 6200, status: "Pending" },
    ],
    tickets: [
      {
        id: "RTK-901",
        subject: "Payment delay",
        status: "Open",
        date: "2025-09-05",
      },
      {
        id: "RTK-902",
        subject: "Product listing approval",
        status: "Resolved",
        date: "2025-08-18",
      },
    ],
    activity: [
      "Updated stock for P-102 Solar Charger",
      "Shipped Wholesale Order W-5001",
      "Requested payout PY-2002",
      "Resolved dispute RTK-902",
    ],
  };

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <Store className="w-8 h-8 text-green-600" />
          {retailer.name} (Retailer)
        </h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-600">
            <RefreshCw className="w-4 h-4" /> Reset Password
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Shield className="w-4 h-4" /> Verify Retailer
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700">
            <Ban className="w-4 h-4" /> Suspend
          </button>
        </div>
      </div>

      {/* Retailer Info */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <h2 className="text-xl font-semibold mb-3">Business Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Mail className="w-4 h-4 inline text-green-600 mr-2" />
              <b>Email:</b> {retailer.email}
            </li>
            <li>
              <Phone className="w-4 h-4 inline text-green-600 mr-2" />
              <b>Phone:</b> {retailer.phone}
            </li>
            <li>
              <b>Status:</b>{" "}
              <span
                className={`${
                  retailer.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                } font-medium`}
              >
                {retailer.status}
              </span>
            </li>
            <li>
              <b>Verified:</b>{" "}
              {retailer.verified ? (
                <CheckCircle className="w-4 h-4 inline text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 inline text-yellow-600" />
              )}
            </li>
            <li>
              <b>Joined:</b> {retailer.joined}
            </li>
            <li>
              <b>Last Login:</b> {retailer.lastLogin}
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3">Financial Overview</h2>
          <p className="text-2xl font-bold text-green-600">
            ${retailer.totalSales.toLocaleString()}
          </p>
          <p className="text-gray-600">
            Total sales, with ${retailer.totalPayouts.toLocaleString()} already
            paid out
          </p>
        </div>
      </motion.div>

      {/* Products */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-green-600" /> Products
        </h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {retailer.products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{p.id}</td>
                <td className="px-6 py-3">{p.name}</td>
                <td className="px-6 py-3">{p.stock}</td>
                <td className="px-6 py-3">${p.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wholesale Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-green-600" /> Wholesale Orders
        </h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {retailer.wholesaleOrders.map((wo) => (
              <tr key={wo.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{wo.id}</td>
                <td className="px-6 py-3">{wo.buyer}</td>
                <td className="px-6 py-3">{wo.date}</td>
                <td className="px-6 py-3">${wo.amount}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    wo.status === "Shipped"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {wo.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payouts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" /> Payouts
        </h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Payout ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {retailer.payouts.map((py) => (
              <tr key={py.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{py.id}</td>
                <td className="px-6 py-3">{py.date}</td>
                <td className="px-6 py-3">${py.amount}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    py.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {py.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Support Tickets */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-600" /> Support Tickets
        </h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {retailer.tickets.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{t.id}</td>
                <td className="px-6 py-3">{t.subject}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    t.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {t.status}
                </td>
                <td className="px-6 py-3">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" /> Activity Log
        </h2>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          {retailer.activity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
