
import { supabase } from "@/integrations/supabase/client";

// Helper to get the first and last day of the (current or previous) month
function getMonthRange(offset = 0) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + offset;
  // Start date (1st day of the month)
  const start = new Date(year, month, 1);
  // End date (last day of the month)
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

export async function fetchAdminStats() {
  // Get current and previous month ranges for orders
  const { start: startThisMonth, end: endThisMonth } = getMonthRange(0);
  const { start: startLastMonth, end: endLastMonth } = getMonthRange(-1);

  // Total Revenue (all time)
  const { data: revenueData, error: revenueError } = await supabase
    .from("orders")
    .select("total")
    .neq("status", "cancelled");

  // Revenue This Month
  const { data: revenueMonthData, error: revenueMonthError } = await supabase
    .from("orders")
    .select("total, created_at")
    .gte("created_at", startThisMonth.toISOString())
    .lt("created_at", endThisMonth.toISOString())
    .neq("status", "cancelled");

  // Revenue Last Month
  const { data: revenueLastMonthData, error: revenueLastMonthError } = await supabase
    .from("orders")
    .select("total, created_at")
    .gte("created_at", startLastMonth.toISOString())
    .lt("created_at", endLastMonth.toISOString())
    .neq("status", "cancelled");

  // Total Orders (all time)
  const { count: totalOrders, error: ordersError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Orders This Month
  const { count: monthOrders, error: monthOrdersError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startThisMonth.toISOString())
    .lt("created_at", endThisMonth.toISOString());

  // Orders Last Month
  const { count: lastMonthOrders, error: lastMonthOrdersError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startLastMonth.toISOString())
    .lt("created_at", endLastMonth.toISOString());

  // Total Customers
  const { count: customerCount, error: customersError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Customers This Month
  const { count: monthCustomers, error: monthCustomersError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startThisMonth.toISOString())
    .lt("created_at", endThisMonth.toISOString());

  // Customers Last Month
  const { count: lastMonthCustomers, error: lastMonthCustomersError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startLastMonth.toISOString())
    .lt("created_at", endLastMonth.toISOString());

  // Calculate sums, growth
  const allRevenue = revenueData ? revenueData.reduce((sum, r) => sum + Number(r.total || 0), 0) : 0;
  const thisMonthRevenue = revenueMonthData ? revenueMonthData.reduce((sum, r) => sum + Number(r.total || 0), 0) : 0;
  const lastMonthRevenue = revenueLastMonthData ? revenueLastMonthData.reduce((sum, r) => sum + Number(r.total || 0), 0) : 0;

  // Growth calculations
  function getGrowth(current: number, previous: number) {
    if (previous === 0) return current ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }
  const revenueGrowth = getGrowth(thisMonthRevenue, lastMonthRevenue);
  const orderGrowth = getGrowth(monthOrders || 0, lastMonthOrders || 0);
  const customerGrowth = getGrowth(monthCustomers || 0, lastMonthCustomers || 0);

  // Error aggregation
  const error =
    revenueError ||
    revenueMonthError ||
    revenueLastMonthError ||
    ordersError ||
    monthOrdersError ||
    lastMonthOrdersError ||
    customersError ||
    monthCustomersError ||
    lastMonthCustomersError;

  return {
    allRevenue,
    thisMonthRevenue,
    lastMonthRevenue,
    totalOrders: totalOrders || 0,
    monthOrders: monthOrders || 0,
    lastMonthOrders: lastMonthOrders || 0,
    customerCount: customerCount || 0,
    monthCustomers: monthCustomers || 0,
    lastMonthCustomers: lastMonthCustomers || 0,
    revenueGrowth,
    orderGrowth,
    customerGrowth,
    error,
  };
}
