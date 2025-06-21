import React from 'react';
import Layout from '@/components/layout/Layout';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>

        <p className="text-muted-foreground mb-6">
          This Privacy Policy describes how Lizzy Hans House of Fashion ("we", "our", or "us") collects, uses, and protects your personal information when you visit our website or make a purchase.
        </p>

        {/* 1. Information Collection */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Personal Information:</strong> name, email address, shipping address, phone number, and payment details.</li>
            <li><strong>Order Information:</strong> products purchased, transaction total, and order history.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, and site usage data collected via cookies.</li>
          </ul>
        </section>

        {/* 2. Use of Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To process and fulfill orders</li>
            <li>To provide customer service and support</li>
            <li>To personalize your shopping experience</li>
            <li>To send order updates and promotional emails (with your consent)</li>
            <li>To analyze and improve our services and website</li>
          </ul>
        </section>

        {/* 3. Sharing of Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We only share your information with trusted third parties who help us operate our website, process payments, and deliver orders — such as payment processors and logistics partners.
          </p>
        </section>

        {/* 4. Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We implement industry-standard security measures to protect your information. However, no system is 100% secure, and we cannot guarantee absolute security of your data.
          </p>
        </section>

        {/* 5. Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to improve your experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
          </p>
        </section>

        {/* 6. Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for marketing communications at any time</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            To exercise these rights, please contact us at <a href="mailto:egovincent06@gmail.com" className="text-primary underline">egovincent06@gmail.com</a>.
          </p>
        </section>

        {/* 7. Changes to Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Updated versions will be posted on this page with the effective date.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
          </p>
          <p className="text-muted-foreground mt-2">
            <strong>Email:</strong> <a href="mailto:egovincent06@gmail.com" className="text-primary underline">egovincent06@gmail.com</a>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;

