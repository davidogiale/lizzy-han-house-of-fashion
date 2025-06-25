
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from 'lucide-react';

type OrderItem = {
  id: string;
  quantity: number;
  price_at_time: number;
  products: {
    id: string;
    name: string;
    image_url: string | null;
    category: string;
    color: string | null;
    size: string | null;
  };
};

interface OrderItemsCardProps {
  orderItems: OrderItem[] | undefined;
  itemsError: boolean;
}

export const OrderItemsCard = ({ orderItems, itemsError }: OrderItemsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Items in this order
        </CardDescription>
      </CardHeader>
      <CardContent>
        {itemsError ? (
          <div className="text-center py-8 text-destructive">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Failed to load order items</p>
          </div>
        ) : !orderItems || orderItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No items found in this order</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  {item.products.image_url ? (
                    <img 
                      src={item.products.image_url} 
                      alt={item.products.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.products.name}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Category: {item.products.category}</p>
                    {item.products.color && <p>Color: {item.products.color}</p>}
                    {item.products.size && <p>Size: {item.products.size}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {item.price_at_time.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
