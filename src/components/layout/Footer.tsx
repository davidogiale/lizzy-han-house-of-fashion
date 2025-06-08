
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Vogue</h3>
            <p className="text-gray-300 mb-4">
              Elevating women's style with our premium collection of modern, sustainable fashion that celebrates individuality and confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-inter text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/dresses" className="text-gray-300 hover:text-accent transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop/tops" className="text-gray-300 hover:text-accent transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link to="/shop/bottoms" className="text-gray-300 hover:text-accent transition-colors">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="text-gray-300 hover:text-accent transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop/new-arrivals" className="text-gray-300 hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/sale" className="text-gray-300 hover:text-accent transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-inter text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-inter text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-300 hover:text-accent transition-colors">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Vogue Women's Fashion. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">We accept:</span>
            <div className="flex space-x-2">
              <div className="bg-white h-6 w-10 rounded flex items-center justify-center">
                <span className="text-xs text-primary font-bold">VISA</span>
              </div>
              <div className="bg-white h-6 w-10 rounded flex items-center justify-center">
                <span className="text-xs text-primary font-bold">MC</span>
              </div>
              <div className="bg-white h-6 w-10 rounded flex items-center justify-center">
                <span className="text-xs text-primary font-bold">AMEX</span>
              </div>
              <div className="bg-white h-6 w-10 rounded flex items-center justify-center">
                <span className="text-xs text-primary font-bold">PP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
