
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/hooks/useCart';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount, cartItems } = useCart();

  const handleSignOut = async () => {
    await signOut();
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.products?.price || 0) * item.quantity;
  }, 0);

  return (
    <header className="sticky top-0 bg-white z-50 shadow-sm border-b">
      <div className="container-custom mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left Section: Hamburger & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="flex-shrink-0">
              <img src="/Lizz.png" alt="Lizzy Han" className="h-8 md:h-12 object-contain" />
            </Link>
          </div>

          {/* Center Section: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm tracking-wide">
            <Link to="/" className="text-primary hover:text-accent transition-colors uppercase">
              Home
            </Link>
            <Link to="/shop" className="text-primary hover:text-accent transition-colors uppercase">
              Shop
            </Link>
            <Link to="#" className="text-primary hover:text-accent transition-colors uppercase">
              Blog
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-primary hover:text-accent transition-colors uppercase outline-none">
                About Us <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Section: Icons & Tools */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-primary hover:text-accent transition-colors">
                    <User size={22} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/account" className="text-primary hover:text-accent transition-colors">
                <User size={22} />
              </Link>
            )}

            {/* Search */}
            <button 
              className="text-primary hover:text-accent transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} />
            </button>

            {/* Wishlist / Heart */}
            <Link to="#" className="relative text-primary hover:text-accent transition-colors hidden sm:block">
              <Heart size={22} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                0
              </span>
            </Link>

            {/* Price */}
            <div className="hidden md:block font-medium text-sm">
              ₦{totalPrice.toFixed(2)}
            </div>
            
            {/* Cart / Bag */}
            <Link to="/cart" className="relative text-primary hover:text-accent transition-colors">
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2 z-50">
            <nav className="flex flex-col space-y-4 px-6 py-6 container mx-auto">
              <Link 
                to="/" 
                className="text-primary hover:text-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                to="/shop" 
                className="text-primary hover:text-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link 
                to="#" 
                className="text-primary hover:text-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BLOG
              </Link>
               <Link 
                to="/contact" 
                className="text-primary hover:text-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT US
              </Link>
              
              <div className="h-px bg-gray-100 my-2" />
              
              {/* Mobile Extra Links */}
              <Link 
                to="/cart" 
                className="flex items-center justify-between text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Cart</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{cartCount} items - ₦{totalPrice.toFixed(2)}</span>
              </Link>
              
               <button 
                className="text-left text-primary hover:text-accent transition-colors"
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Search
              </button>
            </nav>
          </div>
        )}
      </div>
      
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
