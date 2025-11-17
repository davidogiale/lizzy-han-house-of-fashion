
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Calendar, User, MapPin, RefreshCw } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchOrders,
  });

  const handleOrderClick = (order: Order) => {
    navigate(`/admin/order/${order.id}`);
  };

  const verifyPendingOrders = async () => {
    if (!orders || orders.length === 0) return;
    
    setIsVerifying(true);
    const pendingOrders = orders.filter(order => order.status === 'pending');
    
    if (pendingOrders.length === 0) {
      toast({
        title: "No pending orders",
        description: "All orders have been verified.",
      });
      setIsVerifying(false);
      return;
    }

    console.log(`Verifying ${pendingOrders.length} pending orders with Paystack...`);

    try {
      let successCount = 0;
      let notFoundCount = 0;
      let errorCount = 0;

      const verificationPromises = pendingOrders.map(async (order) => {
        try {
          const { data, error } = await supabase.functions.invoke('paystack-verify-status', {
            body: { reference: order.id }
          });
          
          if (error) {
            if (error.message?.includes('not found') || error.message?.includes('404')) {
              console.warn(`Order ${order.id} not found on Paystack (likely test/dummy order)`);
              notFoundCount++;
            } else {
              console.error(`Error verifying order ${order.id}:`, error);
              errorCount++;
            }
          } else {
            console.log(`Order ${order.id} verified successfully:`, data);
            successCount++;
          }
        } catch (err) {
          console.error(`Exception verifying order ${order.id}:`, err);
          errorCount++;
        }
      });

      await Promise.all(verificationPromises);
      
      // Refresh the orders list
      await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      
      if (notFoundCount > 0) {
        toast({
          title: "Verification Complete with Issues",
          description: `${successCount} verified, ${notFoundCount} not found on Paystack (test orders), ${errorCount} errors. Consider deleting test orders.`,
          variant: "default",
        });
      } else if (successCount > 0) {
        toast({
          title: "Verification Complete",
          description: `Successfully verified ${successCount} order(s) from Paystack.`,
        });
      } else {
        toast({
          title: "No Valid Orders",
          description: "No orders found on Paystack. These may be test orders that need to be deleted.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast({
        title: "Verification Error",
        description: "Failed to verify orders. Please check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-verify pending orders on mount
  useEffect(() => {
    if (orders && orders.length > 0) {
      const hasPendingOrders = orders.some(order => order.status === 'pending');
      if (hasPendingOrders) {
        verifyPendingOrders();
      }
    }
  }, [orders?.length]); // Only run when orders first load

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders and track shipments
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={verifyPendingOrders}
            disabled={isVerifying || isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isVerifying ? 'animate-spin' : ''}`} />
            Verify Payments
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading..."
              : isError
              ? "Error loading orders"
              : (orders?.length ?? 0) + " total orders"}
          </p>
        </div>

        {isLoading ? (
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
        ) : isError ? (
          <Card>
            <CardContent className="p-6 text-center text-destructive">
              Could not load orders. Please try again.
            </CardContent>
          </Card>
        ) : orders && orders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
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
              No orders found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
