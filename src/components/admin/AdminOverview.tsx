
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Package,
  Users,
  TrendingUp,
  Calendar,
  User,
  MapPin,
  Eye,
} from "lucide-react";
import { fetchAdminStats } from "./adminStats";
import { supabase } from "@/integrations/supabase/client";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

// Update the iconMap to use BarChart3 instead of DollarSign
const iconMap = {
  revenue: BarChart3,
  orders: Package,
  customers: Users,
  growth: TrendingUp,
};

type Order = {
  id: string;
  user_id: string;
  status: string;
  total: number;
  shipping_address_full_name: string;
  shipping_address_phone: string;
  shipping_address_line: string;
  shipping_address_city: string;
  shipping_address_state: string;
  shipping_address_postal_code: string;
  shipping_method: string;
  created_at: string;
  updated_at: string;
};

async function fetchRecentOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  if (error) throw error;
  return data as Order[];
}

export function AdminOverview() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: fetchRecentOrders,
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

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
      title: "Customers",
      value: stats.customerCount.toLocaleString(),
      change: `+${stats.customerGrowth.toFixed(1)}% from last month`,
      icon: iconMap.customers,
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

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </div>

        {ordersLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentOrders && recentOrders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentOrders.map((order) => (
              <Card 
                key={order.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOrderClick(order)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-mono truncate">
                      #{order.id.slice(-8)}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold text-foreground">
                    {order.total.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{order.shipping_address_full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">
                        {order.shipping_address_city}, {order.shipping_address_state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No recent orders found.
            </CardContent>
          </Card>
        )}
      </div>

      <OrderDetailsDialog 
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
