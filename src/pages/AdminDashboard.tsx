
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCustomers } from "@/components/admin/AdminCustomers";
import { useAuth } from '@/contexts/AuthContext';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart3, Package, Users, ShoppingCart } from 'lucide-react';

const ADMIN_SECTIONS = [
  { value: 'overview', label: 'Overview', icon: BarChart3 },
  { value: 'orders', label: 'Orders', icon: ShoppingCart },
  { value: 'products', label: 'Products', icon: Package },
  { value: 'customers', label: 'Customers', icon: Users },
];

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const { user, loading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const isMobile = useIsMobile();

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <AdminOverview />;
      case 'orders':
        return <AdminOrders />;
      case 'products':
        return <AdminProducts />;
      case 'customers':
        return <AdminCustomers />;
      default:
        return <AdminOverview />;
    }
  };

  // Show loading state while checking authentication and admin status
  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Checking authentication and permissions</p>
        </div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You must be logged in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/Account'} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show unauthorized message if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin dashboard. Admin privileges are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ----- MOBILE LAYOUT -----
  if (isMobile) {
    const currentSection = ADMIN_SECTIONS.find(sec => sec.value === currentPage);

    return (
      <div className="min-h-screen w-full bg-background pb-20">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-background shadow-sm flex items-center justify-center px-4 py-4">
          <span className="font-bold text-lg truncate">
            {currentSection?.label ?? "Admin Dashboard"}
          </span>
        </header>
        
        {/* Content */}
        <main className="p-3 pb-8">{renderPage()}</main>
        
        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex items-center justify-around py-2">
            {ADMIN_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = currentPage === section.value;
              
              return (
                <button
                  key={section.value}
                  className="flex flex-col items-center justify-center py-2 px-3"
                  onClick={() => setCurrentPage(section.value)}
                >
                  <Icon 
                    size={24} 
                    className={`${
                      isActive ? 'text-primary' : 'text-gray-600'
                    } transition-colors`}
                  />
                  <span 
                    className={`text-xs mt-1 ${
                      isActive ? 'text-primary font-medium' : 'text-gray-600'
                    } transition-colors`}
                  >
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }

  // ----- DESKTOP LAYOUT -----
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-full">
              {renderPage()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
