
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Pages that should show bottom navigation and hide footer on mobile
  const pagesWithBottomNav = ['/shop', '/search', '/cart', '/account'];
  const isProductPage = location.pathname.startsWith('/product/');
  const shouldShowBottomNav = pagesWithBottomNav.includes(location.pathname) || isProductPage;
  const shouldHideFooterOnMobile = shouldShowBottomNav;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <div className={shouldHideFooterOnMobile ? 'hidden md:block' : ''}>
        <Footer />
      </div>
      {shouldShowBottomNav && <BottomNavigation />}
      <Toaster />
    </div>
  );
};

export default Layout;
