
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import ProfileForm from '@/components/auth/ProfileForm';

const Account: React.FC = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center pb-24 md:pb-16">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (user) {
    return (
      <Layout>
        <div className="container-custom py-16 pb-24 md:pb-16">
          <ProfileForm />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 pb-24 md:pb-16">
        <AuthForm 
          isLogin={isLogin} 
          onToggleMode={() => setIsLogin(!isLogin)} 
        />
      </div>
    </Layout>
  );
};

export default Account;
