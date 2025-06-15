import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, MoreHorizontal } from 'lucide-react';

const customers = [
  {
    id: "CUST-001",
    name: "Emma Thompson",
    email: "emma@example.com",
    joinDate: "2023-12-15",
    orders: 8,
    totalSpent: "$1,245.67",
    status: "Active",
    lastOrder: "2024-01-15",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    joinDate: "2024-01-02",
    orders: 3,
    totalSpent: "$456.20",
    status: "Active",
    lastOrder: "2024-01-14",
  },
  {
    id: "CUST-003",
    name: "Rachel Green",
    email: "rachel@example.com",
    joinDate: "2023-11-20",
    orders: 12,
    totalSpent: "$2,134.85",
    status: "VIP",
    lastOrder: "2024-01-14",
  },
  {
    id: "CUST-004",
    name: "Monica Geller",
    email: "monica@example.com",
    joinDate: "2023-10-10",
    orders: 1,
    totalSpent: "$67.20",
    status: "New",
    lastOrder: "2024-01-13",
  },
  {
    id: "CUST-005",
    name: "Phoebe Buffay",
    email: "phoebe@example.com",
    joinDate: "2023-09-05",
    orders: 0,
    totalSpent: "$0.00",
    status: "Inactive",
    lastOrder: "Never",
  },
];

export function AdminCustomers() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'default';
      case 'Active':
        return 'secondary';
      case 'New':
        return 'outline';
      case 'Inactive':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground">Manage customer relationships and data</p>
        </div>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Send Newsletter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === 'Active' || c.status === 'VIP').length}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === 'VIP').length}</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$127.50</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto w-full max-w-full">
        <Card className="min-w-[800px] md:min-w-0">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>
              Manage your customer database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
