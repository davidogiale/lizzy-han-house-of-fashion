import React from 'react';
import Layout from '@/components/layout/Layout';

const TermsAndConditions: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Terms & Conditions</h1>

        <p className="text-muted-foreground mb-6">
          By using this website, you agree to be bound by the following Terms & Conditions. These terms apply to all visitors, users, and customers of Lizzy Hans House of Fashion.
        </p>

        {/* 1. Use of Website */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Use of Our Website</h2>
          <p className="text-muted-foreground">
            You agree to use this website only for lawful purposes and in accordance with these Terms. You must not use this site to engage in any fraudulent or illegal activity or to interfere with its functionality.
          </p>
        </section>

        {/* 2. Product Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Product Descriptions</h2>
          <p className="text-muted-foreground">
            We strive to ensure all product descriptions, prices, and availability are accurate. However, errors may occasionally occur. We reserve the right to correct any errors and update information at any time without prior notice.
          </p>
        </section>

        {/* 3. Pricing & Payments */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Pricing & Payments</h2>
          <p className="text-muted-foreground">
            All prices are listed in Nigerian Naira (₦). We accept various payment methods securely processed through third-party providers. Orders will only be processed once full payment has been received.
          </p>
        </section>

        {/* 4. Order Acceptance */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Order Acceptance</h2>
          <p className="text-muted-foreground">
            We reserve the right to accept or reject any order. You will receive a confirmation email once your order has been accepted. We may cancel orders for reasons including product availability, payment issues, or suspected fraud.
          </p>
        </section>

        {/* 5. Returns & Exchanges */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Returns & Exchanges</h2>
          <p className="text-muted-foreground">
            Our return and exchange policy is available on our <a href="/shipping-and-returns" className="text-primary underline">Shipping & Returns</a> page. Please read it carefully before making a purchase.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on this website—including logos, images, designs, and text—is the property of Lizzy Hans House of Fashion and is protected by copyright and trademark laws. You may not use or reproduce any materials without our written permission.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            We are not liable for any indirect, incidental, or consequential damages resulting from the use of our website or products. All products are sold “as-is” unless otherwise stated.
          </p>
        </section>

        {/* 8. Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.
          </p>
        </section>

        {/* 9. Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to These Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the site following any changes constitutes your acceptance of those changes.
          </p>
        </section>

        {/* 10. Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <p className="text-muted-foreground mt-2">
            <strong>Email:</strong> <a href="mailto:egovincent06@gmail.com" className="text-primary underline">egovincent06@gmail.com</a>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;

