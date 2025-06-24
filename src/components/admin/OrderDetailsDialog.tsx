
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Complete information for order {order.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID:</span>
                <span className="text-sm font-mono">{order.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">User ID:</span>
                <span className="text-sm font-mono">{order.user_id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge variant="outline">{order.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-semibold">
                  {order.total.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Full Name:</span>
                <p className="text-sm mt-1">{order.shipping_address_full_name}</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-sm mt-1">{order.shipping_address_phone}</p>
              </div>
              <div>
                <span className="font-medium">Address:</span>
                <p className="text-sm mt-1 whitespace-pre-line">
                  {order.shipping_address_line}
                  {"\n"}
                  {order.shipping_address_city}, {order.shipping_address_state}
                  {"\n"}
                  {order.shipping_address_postal_code}
                </p>
              </div>
              <div>
                <span className="font-medium">Shipping Method:</span>
                <p className="text-sm mt-1">{order.shipping_method}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
