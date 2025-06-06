
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-8xl font-bold text-accent mb-6">404</h1>
          <h2 className="text-3xl font-playfair font-bold mb-4">Page Not Found</h2>
          <p className="text-dark text-lg mb-8">
            We're sorry, the page you requested could not be found.
            Please check the URL or navigate back to our homepage.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <Button className="btn-primary">
                Back to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="btn-outline">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
