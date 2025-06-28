
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16 pb-24 md:pb-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-playfair font-bold mb-2">Check Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Didn't receive the email? Check your spam folder or contact support.</p>
            </div>
            
            <Link to="/account">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerification;
