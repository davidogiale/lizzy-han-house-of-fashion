
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Truck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
}
interface CartOrderSummaryProps {
  subtotal: number;
  shippingOptions: ShippingOption[];
  selectedShipping: string;
  setSelectedShipping: (id: string) => void;
  total: number;
  isCheckingOut: boolean;
  cartItemsCount: number;
  shippingAddressFilled: boolean;
  onCheckout: () => void;
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  subtotal,
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
  total,
  isCheckingOut,
  cartItemsCount,
  shippingAddressFilled,
  onCheckout,
}) => (
  <div className="bg-muted p-6 rounded-lg h-fit">
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    <div className="space-y-2 mb-4">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>₦{subtotal.toLocaleString("en-NG")}</span>
      </div>
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="h-5 w-5 text-accent" />
          <span className="font-medium">Shipping:</span>
        </div>
        <RadioGroup
          value={selectedShipping}
          onValueChange={setSelectedShipping}
          className="gap-2"
        >
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-start gap-4 cursor-pointer border rounded-lg p-3 mb-2 ${selectedShipping === option.id
                ? "border-primary bg-white"
                : "border-muted-foreground bg-transparent"
                } transition-colors`}
            >
              <RadioGroupItem value={option.id} className="mt-1" />
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
                <div className="font-medium">₦{option.price.toLocaleString("en-NG")}</div>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span>₦{total.toLocaleString("en-NG")}</span>
      </div>
    </div>
    <Button
      className="w-full btn-primary mb-3"
      onClick={onCheckout}
      disabled={
        isCheckingOut ||
        cartItemsCount === 0 ||
        !shippingAddressFilled
      }
    >
      {isCheckingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
    </Button>
    <Link to="/shop">
      <Button variant="outline" className="w-full">
        Continue Shopping
      </Button>
    </Link>
  </div>
);

export default CartOrderSummary;
