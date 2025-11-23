  export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing" | "Shipped" | "Cancelled";
  items: number;
  payment: string;
}

  const recentOrders: Order[] = [
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
  export default function StatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusConfig = {
      Completed: { color: 'bg-green-100 text-green-800', icon: '✓' },
      Processing: { color: 'bg-yellow-100 text-yellow-800', icon: '⟳' },
      Shipped: { color: 'bg-blue-100 text-blue-800', icon: '🚚' },
      Cancelled: { color: 'bg-red-100 text-red-800', icon: '✕' }
    };

    const config = statusConfig[status];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {status}
      </span>
    );
  };