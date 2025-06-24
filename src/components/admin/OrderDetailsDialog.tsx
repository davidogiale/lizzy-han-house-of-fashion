
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full mx-auto">
        <DialogHeader className="px-1">
          <DialogTitle className="text-lg sm:text-xl">Order Details</DialogTitle>
          <DialogDescription className="text-sm">
            Complete information for order {order.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 px-1">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-medium text-sm sm:text-base">Order ID:</span>
                <span className="text-xs sm:text-sm font-mono break-all">{order.id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-medium text-sm sm:text-base">User ID:</span>
                <span className="text-xs sm:text-sm font-mono break-all">{order.user_id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-medium text-sm sm:text-base">Status:</span>
                <Badge variant="outline" className="self-start sm:self-auto text-xs">{order.status}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-medium text-sm sm:text-base">Total:</span>
                <span className="font-semibold text-sm sm:text-base">
                  {order.total.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-medium text-sm sm:text-base">Order Date:</span>
                <span className="text-sm sm:text-base">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <span className="font-medium text-sm sm:text-base block mb-1">Full Name:</span>
                <p className="text-sm sm:text-base">{order.shipping_address_full_name}</p>
              </div>
              <div>
                <span className="font-medium text-sm sm:text-base block mb-1">Phone:</span>
                <p className="text-sm sm:text-base break-all">{order.shipping_address_phone}</p>
              </div>
              <div>
                <span className="font-medium text-sm sm:text-base block mb-1">Address:</span>
                <p className="text-sm sm:text-base leading-relaxed">
                  {order.shipping_address_line}
                  <br />
                  {order.shipping_address_city}, {order.shipping_address_state}
                  <br />
                  {order.shipping_address_postal_code}
                </p>
              </div>
              <div>
                <span className="font-medium text-sm sm:text-base block mb-1">Shipping Method:</span>
                <p className="text-sm sm:text-base">{order.shipping_method}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
