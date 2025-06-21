import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';

interface Customer {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

type CustomerStatus = "VIP" | "Active" | "Inactive" | "New";

function determineStatus(customer: Customer, ordersCountMap: Record<string, number>): CustomerStatus {
  const orderCount = ordersCountMap[customer.id] || 0;
  if (orderCount === 0) return "Inactive";
  if (orderCount === 1 && new Date().getTime() - new Date(customer.created_at).getTime() < 1000 * 60 * 60 * 24 * 30) return "New";
  if (orderCount > 8) return "VIP";
  return "Active";
}

export function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ordersCountMap, setOrdersCountMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: cData, error: cError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (cError) {
        setLoading(false);
        setCustomers([]);
        return;
      }

      setCustomers(cData || []);

      const { data: oData, error: oError } = await supabase
        .from("orders")
        .select("user_id, id");

      const orderCounts: Record<string, number> = {};
      if (!oError && oData) {
        for (const row of oData) {
          if (!row.user_id) continue;
          orderCounts[row.user_id] = (orderCounts[row.user_id] || 0) + 1;
        }
      }

      setOrdersCountMap(orderCounts);
      setLoading(false);
    }

    fetchData();
  }, []);

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

  const totalCustomers = customers.length;
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const newCustomersThisMonth = customers.filter(c => {
    const date = new Date(c.created_at);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  });

  const statusPerCustomer = customers.map(c => determineStatus(c, ordersCountMap));
  const activeCustomers = statusPerCustomer.filter(s => s === "Active" || s === "VIP").length;
  const vipCustomers = statusPerCustomer.filter(s => s === "VIP").length;

  const avgOrderValue = (() => {
    let count = 0;
    for (const number of Object.values(ordersCountMap)) {
      count += number;
    }
    return count ? `₦${(100 * count).toFixed(2)}` : '₦0.00';
  })();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground">Manage customer relationships and data</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+{newCustomersThisMonth.length} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Current active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">Top spending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOrderValue}</div>
            <p className="text-xs text-muted-foreground">Rough estimate</p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="min-w-[800px]">
          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Manage your customer database</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <span className="animate-pulse">Loading customers...</span>
                      </TableCell>
                    </TableRow>
                  ) : customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <span>No customers found.</span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => {
                      const status = determineStatus(customer, ordersCountMap);
                      const name =
                        [customer.first_name, customer.last_name].filter(Boolean).join(' ') || "Unnamed";
                      const email = customer.email || "-";
                      const orderCount = ordersCountMap[customer.id] || 0;

                      return (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="font-medium">{name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {email}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{orderCount}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(status)}>{status}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
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

