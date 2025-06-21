import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div 
        className="h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/placeholder.svg')" }}
      >
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white">About Us</h1>
      </div>
      
      <div className="container-custom py-16">
        {/* Brand Story */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Story</h2>
            <p className="text-lg text-dark">
              Founded in 2015, Lizzy Hans House of Fashion is dedicated to providing premium, sustainable, and ethical fashion pieces that inspire confidence and elegance.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;