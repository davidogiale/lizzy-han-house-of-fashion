
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    {
      icon: Search,
      label: 'Search',
      path: '/search',
    },
    {
      icon: ShoppingBag,
      label: 'Shop',
      path: '/shop',
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      path: '/cart',
      badge: cartItemsCount > 0 ? cartItemsCount : undefined,
    },
    {
      icon: User,
      label: 'Account',
      path: '/account',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center py-2 px-3 relative"
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  className={`${
                    isActive ? 'text-primary' : 'text-gray-600'
                  } transition-colors`}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span 
                className={`text-xs mt-1 ${
                  isActive ? 'text-primary font-medium' : 'text-gray-600'
                } transition-colors`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
