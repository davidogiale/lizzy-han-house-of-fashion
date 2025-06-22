
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Pages that should hide footer on mobile (when bottom nav is shown)
  const pagesWithBottomNav = ['/shop', '/search', '/cart', '/account'];
  const shouldHideFooterOnMobile = pagesWithBottomNav.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <div className={shouldHideFooterOnMobile ? 'hidden md:block' : ''}>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
