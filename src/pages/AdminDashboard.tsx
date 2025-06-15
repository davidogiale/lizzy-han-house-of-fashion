
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCustomers } from "@/components/admin/AdminCustomers";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

const ADMIN_SECTIONS = [
  { value: 'overview', label: 'Overview' },
  { value: 'orders', label: 'Orders' },
  { value: 'products', label: 'Products' },
  { value: 'customers', label: 'Customers' },
  { value: 'settings', label: 'Settings' },
];

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const { user, loading, signOut } = useAuth();
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
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Checking authentication</p>
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
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ----- MOBILE LAYOUT -----
  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Tabs
          value={currentPage}
          onValueChange={setCurrentPage}
          className="w-full"
        >
          <div className="sticky top-0 z-40 bg-background shadow-sm">
            <TabsList className="w-full flex overflow-x-auto rounded-none px-0 pt-2 pb-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {ADMIN_SECTIONS.map(section => (
                <TabsTrigger
                  key={section.value}
                  value={section.value}
                  className="flex-1 min-w-[110px] px-3 py-2 text-base data-[state=active]:font-bold"
                >
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="w-full overflow-x-auto">
            <TabsContent value="overview" className="pt-2">{currentPage === 'overview' && <AdminOverview />}</TabsContent>
            <TabsContent value="orders" className="pt-2">{currentPage === 'orders' && <AdminOrders />}</TabsContent>
            <TabsContent value="products" className="pt-2">{currentPage === 'products' && <AdminProducts />}</TabsContent>
            <TabsContent value="customers" className="pt-2">{currentPage === 'customers' && <AdminCustomers />}</TabsContent>
            <TabsContent value="settings" className="pt-2">{currentPage === 'settings' && <AdminSettings />}</TabsContent>
          </div>
        </Tabs>
      </div>
    );
  }

  // ----- DESKTOP LAYOUT -----
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <SidebarInset>
          <AdminHeader />
          <main className="flex-1 p-6">
            {renderPage()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;

