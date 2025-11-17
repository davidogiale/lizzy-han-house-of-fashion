
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useOrderQuery, useOrderItemsQuery } from '@/hooks/useOrderQueries';
import { useOrderMutations } from '@/hooks/useOrderMutations';
import { OrderDetailsHeader } from '@/components/admin/order-details/OrderDetailsHeader';
import { OrderSummaryCard } from '@/components/admin/order-details/OrderSummaryCard';
import { OrderItemsCard } from '@/components/admin/order-details/OrderItemsCard';
import { CustomerInfoCard } from '@/components/admin/order-details/CustomerInfoCard';
import { ShippingAddressCard } from '@/components/admin/order-details/ShippingAddressCard';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";

const AdminOrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: order, isLoading: orderLoading, isError: orderError } = useOrderQuery(orderId);
  const { data: orderItems, isLoading: itemsLoading, isError: itemsError } = useOrderItemsQuery(orderId);
  const { updateStatusMutation, deleteOrderMutation } = useOrderMutations(orderId);

  const handleStatusChange = (newStatus: string) => {
    if (order) {
      updateStatusMutation.mutate({ orderId: order.id, status: newStatus });
    }
  };

  const handleDeleteOrder = () => {
    if (order) {
      deleteOrderMutation.mutate(order.id);
    }
  };

  const handleVerifyPayment = async () => {
    if (!order) return;
    
    setVerifyingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke('paystack-verify-status', {
        body: { reference: order.id }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Payment Verified",
        description: `Order status updated to: ${data.status}`,
      });
      
      await queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    } catch (err) {
      console.error('Error verifying payment:', err);
      toast({
        title: "Error",
        description: "Failed to verify payment status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifyingPayment(false);
    }
  };

  // Auto-verify payment status if order is pending
  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (order && order.status === 'pending') {
        console.log(`Verifying payment status for order ${order.id}...`);
        
        try {
          const { data, error } = await supabase.functions.invoke('paystack-verify-status', {
            body: { reference: order.id }
          });
          
          if (error) {
            console.error('Error verifying payment status:', error);
          } else {
            console.log('Payment status verified:', data);
            // Refresh order data
            await queryClient.invalidateQueries({ queryKey: ["order", orderId] });
            await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
        }
      }
    };

    verifyPaymentStatus();
  }, [order?.id, order?.status]);

  if (orderLoading || itemsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Loading order details</p>
        </div>
      </div>
    );
  }

  if (orderError || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground">Could not load order details</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <OrderDetailsHeader
          order={order}
          onStatusChange={handleStatusChange}
          onDeleteOrder={handleDeleteOrder}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          onVerifyPayment={handleVerifyPayment}
          verifyingPayment={verifyingPayment}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderSummaryCard order={order} />
            <OrderItemsCard orderItems={orderItems} itemsError={itemsError} />
          </div>

          <div className="space-y-6">
            <CustomerInfoCard order={order} />
            <ShippingAddressCard order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
