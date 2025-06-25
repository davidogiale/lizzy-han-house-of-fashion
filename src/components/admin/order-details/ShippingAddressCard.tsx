
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from 'lucide-react';

type Order = {
  shipping_address_full_name: string;
  shipping_address_phone: string;
  shipping_address_line: string;
  shipping_address_city: string;
  shipping_address_state: string;
  shipping_address_postal_code: string;
};

interface ShippingAddressCardProps {
  order: Order;
}

export const ShippingAddressCard = ({ order }: ShippingAddressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-1">
          <p className="font-medium">{order.shipping_address_full_name}</p>
          <p>{order.shipping_address_line}</p>
          <p>{order.shipping_address_city}, {order.shipping_address_state}</p>
          <p>{order.shipping_address_postal_code}</p>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{order.shipping_address_phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
