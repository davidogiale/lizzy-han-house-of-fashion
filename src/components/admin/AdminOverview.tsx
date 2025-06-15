
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, Users, TrendingUp } from 'lucide-react';
import { fetchAdminStats } from "./adminStats";

const iconMap = {
  revenue: DollarSign,
  orders: Package,
  customers: Users,
  growth: TrendingUp,
};

export function AdminOverview() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  });

  // Show loading or error states
  if (isLoading) {
    return (
      <div className="flex py-12 justify-center items-center">
        <span className="animate-pulse text-lg font-bold">Loading admin stats...</span>
      </div>
    );
  }

  if (!stats || stats.error || error) {
    // Ensure we extract message string if stats.error is an object
    const statsErrorMessage =
      typeof stats?.error === 'object' && stats?.error !== null && 'message' in stats.error
        ? (stats.error as any).message
        : stats?.error;

    return (
      <div className="flex py-12 justify-center items-center text-destructive">
        <span>
          Could not load admin stats. Please try again.<br />
          <span className="text-muted-foreground text-sm">
            {statsErrorMessage || error?.message}
          </span>
        </span>
      </div>
    );
  }

  // Stats to display
  const cards = [
    {
      title: "Total Revenue",
      value: stats.allRevenue.toLocaleString('en-US', { style: "currency", currency: "USD" }),
      change: `+${stats.revenueGrowth.toFixed(1)}% from last month`,
      icon: iconMap.revenue,
    },
    {
      title: "Orders",
      value: stats.totalOrders.toLocaleString(),
      change: `+${stats.orderGrowth.toFixed(1)}% from last month`,
      icon: iconMap.orders,
    },
    {
      title: "Customers",
      value: stats.customerCount.toLocaleString(),
      change: `+${stats.customerGrowth.toFixed(1)}% from last month`,
      icon: iconMap.customers,
    },
    {
      title: "Growth",
      value: `+${stats.revenueGrowth.toFixed(1)}%`,
      change: `Revenue growth from last month`,
      icon: iconMap.growth,
    },
  ];

  // Table sample data (static for now, will be implemented later)
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$99.99",
      status: "Completed",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$149.99",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "$79.99",
      status: "Shipped",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: "$199.99",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="overflow-x-auto w-full max-w-full">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-[640px] md:min-w-0">
          {cards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Recent Orders */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[800px]">
          {/* Table/Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                You have {recentOrders.length} orders this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-medium px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2">{order.email}</td>
                      <td className="px-4 py-2">{order.amount}</td>
                      <td className="px-4 py-2">
                        <Badge variant={
                          order.status === 'Completed' ? 'default' :
                            order.status === 'Processing' ? 'secondary' :
                              order.status === 'Shipped' ? 'outline' : 'destructive'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
