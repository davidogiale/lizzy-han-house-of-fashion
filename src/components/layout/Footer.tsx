
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
            <h3 className="font-playfair text-xl font-bold mb-4">Lizzy Han House of Fashion</h3>
            <p className="text-gray-300 mb-4">
              Elevating personal style with our premium collection of modern, sustainable fashion for men and women — celebrating individuality and confidence.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/Lizzyhanhouseoffashion/" target="_blank" rel="noopener noreferrer">
                <Instagram className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="./shipping-and-returns" className="hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Optional: Add more columns like Contact Info, Newsletter, etc. */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">Email: egovincent06@gmail.com</p>
            <p className="text-gray-300">Phone: +234 8067526146</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-2">Get the latest news and exclusive offers.</p>
            {/* You can later add a newsletter form here */}
          </div>
        </div>

        <div className="text-center mt-12 text-gray-400 text-sm">
          &copy; {currentYear} Lizzy Han House of Fashion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
