import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-playfair text-2xl font-bold">
           Lizzy Hans House of Fashion      
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/shop" className="text-primary hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/contact" className="text-primary hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icon Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              className="text-primary hover:text-accent transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-accent">
                    <User size={20} />
                  </Button>
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
                <User size={20} />
              </Link>
            )}
            
            {/* <Link to="/wishlist" className="text-primary hover:text-accent transition-colors">
              <Heart size={20} />
            </Link> */}
            <Link to="/cart" className="text-primary hover:text-accent transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-primary rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pt-4 pb-4 border-t mt-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/shop" 
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/contact" 
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex space-x-6 pt-2">
                <button 
                  className="text-primary hover:text-accent transition-colors"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Search size={20} />
                </button>
                <Link 
                  to="/account" 
                  className="text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                </Link>
                {/* <Link 
                  to="/wishlist" 
                  className="text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={20} />
                </Link> */}
                <Link 
                  to="/cart" 
                  className="text-primary hover:text-accent transition-colors relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-accent text-primary rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              {user && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 w-fit"
                >
                  Sign Out
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
      
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
