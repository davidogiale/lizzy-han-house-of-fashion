
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Package,
  TrendingUp,
} from "lucide-react";
import { fetchAdminStats } from "./adminStats";

// Update the iconMap to use BarChart3 instead of DollarSign
const iconMap = {
  revenue: BarChart3,
  orders: Package,
  growth: TrendingUp,
};

export function AdminOverview() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  });

  if (isLoading) {
    return (
      <div className="flex py-12 justify-center items-center">
        <span className="animate-pulse text-lg font-bold">Loading admin stats...</span>
      </div>
    );
  }

  if (!stats || stats.error || error) {
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

  const cards = [
    {
      title: "Total Revenue",
      value: `₦${stats.allRevenue.toLocaleString('en-NG')}`,
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
      title: "Growth",
      value: `+${stats.revenueGrowth.toFixed(1)}%`,
      change: "Revenue growth from last month",
      icon: iconMap.growth,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="w-full">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
