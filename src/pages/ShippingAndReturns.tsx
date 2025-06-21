import React from 'react';
import Layout from '@/components/layout/Layout';


const ShippingAndReturns: React.FC = () => {
  return (
   <Layout>   
    <div className="container-custom py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Shipping & Returns</h1>

      {/* Shipping Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <p className="text-muted-foreground mb-4">
          We aim to process and ship all orders within <strong>1–2 business days</strong>. Orders placed on weekends or public holidays will be processed the next business day.
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Domestic Shipping (Nigeria):</strong> 2–5 business days</li>
        </ul>
      </section>

      {/* Returns Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Return & Exchange Policy</h2>
        <p className="text-muted-foreground mb-4">
          Your satisfaction is our top priority. If you're not completely happy with your purchase, you may return eligible items within <strong>7 days</strong> of receiving your order.
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Items must be returned unworn, unwashed, and in their original condition with tags attached.</li>
          <li>Return shipping costs are the responsibility of the customer, unless the item is defective or incorrect.</li>
          <li>We currently do not offer refunds—returns are eligible for exchange or store credit only.</li>
        </ul>
      </section>

      {/* How to Return */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">How to Initiate a Return</h2>
        <p className="text-muted-foreground mb-4">
          To start a return or exchange, please email us at <a href="mailto:support@lizzyhansfashion.com" className="text-primary underline">egovincent06@gmail.com</a> with your order number and the reason for return. Our team will guide you through the process.
        </p>
      </section>

      {/* Final Note */}
      <section>
        <p className="text-muted-foreground">
          If you have any questions about our shipping or return policy, don’t hesitate to contact our support team. We're here to help!
        </p>
      </section>
    </div>
   </Layout>

  );
};

export default ShippingAndReturns;

