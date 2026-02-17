"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, subWeeks, subMonths } from "date-fns";

// ---------- Types ----------
type SalesDataPoint = {
  date: string;       // ISO date or formatted label
  sales: number;
  orders: number;
};

type TimeRange = "7d" | "30d" | "90d";

// ---------- Mock API function (replace with real fetch) ----------
const fetchSalesData = async (range: TimeRange): Promise<SalesDataPoint[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate mock data based on range
  const now = new Date();
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const data: SalesDataPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      date: format(date, "MMM dd"), // e.g., "Apr 05"
      sales: Math.floor(Math.random() * 8000) + 2000, // random between 2000-10000
      orders: Math.floor(Math.random() * 50) + 10,    // random between 10-60
    });
  }
  return data;
};

// ---------- Helper to format currency ----------
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

// ---------- Main Component ----------
export default function ChartSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [data, setData] = useState<SalesDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data whenever timeRange changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSalesData(timeRange);
        setData(result);
      } catch (err) {
        setError("Failed to load sales data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeRange]);

  // Calculate summary statistics
  const totalSales = data.reduce((acc, point) => acc + point.sales, 0);
  const totalOrders = data.reduce((acc, point) => acc + point.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      {/* Header with title and filter buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Sales Performance
        </h2>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : "Last 90 days"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-600 font-medium">Total Sales</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalSales)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-600 font-medium">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-600 font-medium">Avg. Order Value</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(avgOrderValue)}</p>
        </div>
      </div>

      {/* Chart area with loading/error states */}
      {loading && (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="h-80 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="left"
                stroke="#6b7280"
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "Sales") return [formatCurrency(value), name];
                  return [value, name];
                }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}