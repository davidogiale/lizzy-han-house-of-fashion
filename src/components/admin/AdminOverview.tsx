
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
    </div>
  );
}
