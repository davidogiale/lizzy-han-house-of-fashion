
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package } from 'lucide-react';

type Order = {
  id: string;
  status: string;
  created_at: string;
  shipping_method: string;
  total: number;
};

interface OrderSummaryCardProps {
  order: Order;
}

export const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Summary
          <Badge variant="outline" className="text-sm">
            {order.status}
          </Badge>
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">#{order.id.slice(-8)}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Ordered on {new Date(order.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>Shipping Method: {order.shipping_method}</span>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>{order.total.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
