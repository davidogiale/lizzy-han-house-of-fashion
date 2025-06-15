
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Menu } from 'lucide-react';

const ADMIN_SECTIONS = [
  { value: 'overview', label: 'Overview' },
  { value: 'orders', label: 'Orders' },
  { value: 'products', label: 'Products' },
  { value: 'customers', label: 'Customers' },
  { value: 'settings', label: 'Settings' },
];

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    const currentSection = ADMIN_SECTIONS.find(sec => sec.value === currentPage);

    return (
      <div className="min-h-screen w-full bg-background">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-background shadow-sm flex items-center justify-between px-4 py-2">
          <button
            className="flex items-center justify-center p-2 -ml-2"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            type="button"
          >
            <Menu size={28} />
          </button>
          <span className="font-bold text-lg truncate">
            {currentSection?.label ?? ""}
          </span>
          <div className="w-8" /> {/* placeholder for menu alignment */}
        </header>
        {/* Drawer Menu */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="p-0">
            <DrawerHeader>
              <DrawerTitle>Admin Sections</DrawerTitle>
            </DrawerHeader>
            <nav className="flex flex-col gap-1 p-4">
              {ADMIN_SECTIONS.map((section) => (
                <button
                  key={section.value}
                  className={`text-left rounded px-3 py-3 font-medium text-base transition-colors ${
                    section.value === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setCurrentPage(section.value);
                    setDrawerOpen(false);
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>
            <div className="flex justify-end p-4">
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
        {/* Content */}
        <main className="p-3 pb-8">{renderPage()}</main>
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

