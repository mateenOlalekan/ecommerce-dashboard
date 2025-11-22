"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  ShoppingBag,
  CreditCard,
  MapPin,
  Shield,
  Ban,
  RefreshCw,
  MessageSquare,
  Activity,
} from "lucide-react";

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = params.id; // dynamic [id]

  // Dummy customer (replace with API data)
  const customer = {
    id: customerId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "Customer",
    status: "Active",
    joined: "2023-04-10",
    lastLogin: "2025-09-16",
    totalSpent: 1200,
    orders: [
      { id: "ORD-101", date: "2025-08-10", amount: 250, status: "Delivered" },
      { id: "ORD-102", date: "2025-08-22", amount: 300, status: "Shipped" },
      { id: "ORD-103", date: "2025-09-05", amount: 650, status: "Cancelled" },
    ],
    paymentMethods: [
      { type: "Visa", last4: "1234", expiry: "08/27" },
      { type: "PayPal", email: "john.paypal@example.com" },
    ],
    addresses: [
      {
        type: "Home",
        line1: "123 Green Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      {
        type: "Work",
        line1: "456 Market Road",
        city: "Brooklyn",
        state: "NY",
        zip: "11201",
        country: "USA",
      },
    ],
    tickets: [
      {
        id: "TCK-9001",
        subject: "Refund request",
        status: "Resolved",
        date: "2025-08-12",
      },
      {
        id: "TCK-9002",
        subject: "Login issue",
        status: "Open",
        date: "2025-09-01",
      },
    ],
    activity: [
      "Logged in from IP 192.168.1.1",
      "Placed Order ORD-102",
      "Changed password",
      "Opened support ticket TCK-9002",
    ],
  };

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <User className="w-8 h-8 text-green-600" />
          {customer.name}'s Profile
        </h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-600">
            <RefreshCw className="w-4 h-4" /> Reset Password
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Shield className="w-4 h-4" /> Promote Role
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700">
            <Ban className="w-4 h-4" /> Suspend
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Mail className="w-4 h-4 inline text-green-600 mr-2" />
              <b>Email:</b> {customer.email}
            </li>
            <li>
              <Phone className="w-4 h-4 inline text-green-600 mr-2" />
              <b>Phone:</b> {customer.phone}
            </li>
            <li>
              <b>Role:</b> {customer.role}
            </li>
            <li>
              <b>Status:</b>{" "}
              <span
                className={`${
                  customer.status === "Active" ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {customer.status}
              </span>
            </li>
            <li>
              <b>Joined:</b> {customer.joined}
            </li>
            <li>
              <b>Last Login:</b> {customer.lastLogin}
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3">Insights</h2>
          <p className="text-2xl font-bold text-green-600">
            ${customer.totalSpent.toLocaleString()}
          </p>
          <p className="text-gray-600">Total spent across {customer.orders.length} orders</p>
        </div>
      </motion.div>

      {/* Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-green-600" /> Orders
        </h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {customer.orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{o.id}</td>
                <td className="px-6 py-3">{o.date}</td>
                <td className="px-6 py-3">${o.amount}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    o.status === "Delivered"
                      ? "text-green-600"
                      : o.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {o.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-green-600" /> Payment Methods
        </h2>
        <ul className="space-y-2">
          {customer.paymentMethods.map((pm, i) => (
            <li key={i} className="border p-3 rounded-lg">
              {pm.type === "Visa"
                ? `💳 ${pm.type} ending in ${pm.last4} (Expires ${pm.expiry})`
                : `🅿️ PayPal: ${pm.email}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Addresses */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" /> Addresses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customer.addresses.map((addr, i) => (
            <div key={i} className="border p-4 rounded-lg">
              <h3 className="font-bold mb-2">{addr.type}</h3>
              <p>{addr.line1}</p>
              <p>
                {addr.city}, {addr.state} {addr.zip}
              </p>
              <p>{addr.country}</p>
            </div>
          ))}
        </div>
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
            {customer.tickets.map((t) => (
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
          {customer.activity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
