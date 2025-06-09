
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from 'lucide-react';

const orders = [
  {
    id: "ORD-2024-001",
    customer: "Emma Thompson",
    email: "emma@example.com",
    date: "2024-01-15",
    total: "$156.99",
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-2024-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    date: "2024-01-14",
    total: "$89.50",
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-2024-003",
    customer: "Rachel Green",
    email: "rachel@example.com",
    date: "2024-01-14",
    total: "$234.75",
    status: "Shipped",
    items: 4,
  },
  {
    id: "ORD-2024-004",
    customer: "Monica Geller",
    email: "monica@example.com",
    date: "2024-01-13",
    total: "$67.20",
    status: "Pending",
    items: 1,
  },
  {
    id: "ORD-2024-005",
    customer: "Phoebe Buffay",
    email: "phoebe@example.com",
    date: "2024-01-13",
    total: "$145.30",
    status: "Cancelled",
    items: 2,
  },
];

export function AdminOrders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Processing':
        return 'secondary';
      case 'Shipped':
        return 'outline';
      case 'Pending':
        return 'destructive';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">Manage customer orders and track shipments</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            {orders.length} total orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
