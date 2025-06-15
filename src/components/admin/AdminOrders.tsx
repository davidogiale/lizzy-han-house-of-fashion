import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Order[];
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "default";
    case "processing":
      return "secondary";
    case "shipped":
      return "outline";
    case "pending":
      return "destructive";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}

export function AdminOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchOrders,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders and track shipments
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="min-w-[900px]">
          <Card className="">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Error loading orders"
                  : (orders?.length ?? 0) + " total orders"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Shipping Name</TableHead>
                    <TableHead>Shipping Address</TableHead>
                    <TableHead>Postal Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading || isError ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">
                        {isLoading
                          ? "Loading orders..."
                          : "Could not load orders. Please try again."}
                      </TableCell>
                    </TableRow>
                  ) : orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {order.user_id}
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString()}{" "}
                          {new Date(order.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          {order.total.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                        <TableCell>{order.shipping_address_full_name}</TableCell>
                        <TableCell>
                          <div>
                            {order.shipping_address_line}
                            <br />
                            {order.shipping_address_city},{" "}
                            {order.shipping_address_state}
                            <br />
                            {order.shipping_address_phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.shipping_address_postal_code}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View order</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
