
import React from "react";
import ShippingAddressForm, { ShippingAddress } from "@/components/checkout/ShippingAddressForm";

interface CartShippingAddressSectionProps {
  shippingAddress: ShippingAddress | null;
  isCheckingOut: boolean;
  setShippingAddress: (address: ShippingAddress) => void;
}

const CartShippingAddressSection: React.FC<CartShippingAddressSectionProps> = ({
  shippingAddress,
  setShippingAddress,
  isCheckingOut,
}) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
    <ShippingAddressForm
      onSubmit={setShippingAddress}
      defaultValues={shippingAddress ?? undefined}
      disabled={isCheckingOut}
    />
    {shippingAddress && (
      <div className="bg-muted border rounded p-4 mt-2">
        <div className="font-medium mb-1">Current Address:</div>
        <div className="text-sm text-muted-foreground mb-1">
          {shippingAddress.fullName}, {shippingAddress.phone}
        </div>
        <div className="text-sm">
          {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postalCode}
        </div>
      </div>
    )}
  </section>
);

export default CartShippingAddressSection;
