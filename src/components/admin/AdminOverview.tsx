import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15% from last month",
    icon: Package,
  },
  {
    title: "Customers",
    value: "1,423",
    change: "+8.2% from last month",
    icon: Users,
  },
  {
    title: "Growth",
    value: "+12.5%",
    change: "+2.1% from last month",
    icon: TrendingUp,
  },
];

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

export function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="overflow-x-auto w-full max-w-full">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-[640px] md:min-w-0">
          {stats.map((stat) => (
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
      <div className="overflow-x-auto w-full max-w-full">
        <Card className="min-w-[800px] md:min-w-0">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have {recentOrders.length} orders this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'Completed' ? 'default' :
                        order.status === 'Processing' ? 'secondary' :
                        order.status === 'Shipped' ? 'outline' : 'destructive'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
