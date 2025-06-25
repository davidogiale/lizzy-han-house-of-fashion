
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone } from 'lucide-react';

type Order = {
  shipping_address_full_name: string;
  shipping_address_phone: string;
};

interface CustomerInfoCardProps {
  order: Order;
}

export const CustomerInfoCard = ({ order }: CustomerInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Customer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-medium">{order.shipping_address_full_name}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{order.shipping_address_phone}</span>
        </div>
      </CardContent>
    </Card>
  );
};
