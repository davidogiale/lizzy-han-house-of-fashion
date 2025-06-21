
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
import { ScrollArea } from "@/components/ui/scroll-area";
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

export function AdminOrders() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchOrders,
  });

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders and track shipments
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="w-full">
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
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] w-full">
            <div className="min-w-[1000px] p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Order ID</TableHead>
                    <TableHead className="w-[140px]">User ID</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                    <TableHead className="w-[100px]">Total</TableHead>
                    <TableHead className="w-[150px]">Shipping Name</TableHead>
                    <TableHead className="w-[200px]">Shipping Address</TableHead>
                    <TableHead className="w-[100px]">Postal Code</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading || isError ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        {isLoading
                          ? "Loading orders..."
                          : "Could not load orders. Please try again."}
                      </TableCell>
                    </TableRow>
                  ) : orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="truncate font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell className="truncate">
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
                          {order.total.toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          })}
                        </TableCell>
                        <TableCell>{order.shipping_address_full_name}</TableCell>
                        <TableCell>
                          <div className="whitespace-pre-line">
                            {order.shipping_address_line}
                            {"\n"}
                            {order.shipping_address_city},{" "}
                            {order.shipping_address_state}
                            {"\n"}
                            {order.shipping_address_phone}
                          </div>
                        </TableCell>
                        <TableCell>{order.shipping_address_postal_code}</TableCell>
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
                      <TableCell colSpan={8} className="text-center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
