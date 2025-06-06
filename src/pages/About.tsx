
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
              Founded in 2015, Vogue started with a simple idea: to create timeless fashion that respects both people and the planet. 
              Our journey began in a small studio with a team of passionate designers committed to sustainability and ethical production.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/placeholder.svg" 
                alt="Our workshop" 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-playfair font-semibold">Our Mission</h3>
              <p className="text-dark">
                At Vogue, we believe that fashion should be both beautiful and responsible. Our mission is to create clothing that stands the test of time in quality and design, while minimizing our environmental footprint and ensuring fair working conditions throughout our supply chain.
              </p>
              <p className="text-dark">
                We're committed to transparency in everything we do, from sourcing materials to manufacturing processes. By choosing Vogue, you're not just buying clothing – you're supporting a movement towards a more sustainable and ethical fashion industry.
              </p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality & Durability</h3>
              <p className="text-dark">
                We create garments that are made to last, using premium materials and expert craftsmanship to ensure longevity.
              </p>
            </div>
            
            <div className="bg-muted p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-dark">
                From eco-friendly materials to responsible production, we strive to reduce our environmental impact at every step.
              </p>
            </div>
            
            <div className="bg-muted p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
              <p className="text-dark">
                We ensure fair wages and safe working conditions for everyone involved in making our products.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div>
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/placeholder.svg" 
                  alt="Emma Wilson - Founder & Creative Director" 
                  className="w-48 h-48 object-cover mx-auto"
                />
              </div>
              <h3 className="font-semibold text-lg">Emma Wilson</h3>
              <p className="text-accent mb-2">Founder & Creative Director</p>
              <p className="text-dark text-sm">
                With over 15 years in fashion design, Emma leads our creative vision with an unwavering commitment to sustainable practices.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/placeholder.svg" 
                  alt="David Chen - Head of Production" 
                  className="w-48 h-48 object-cover mx-auto"
                />
              </div>
              <h3 className="font-semibold text-lg">David Chen</h3>
              <p className="text-accent mb-2">Head of Production</p>
              <p className="text-dark text-sm">
                David ensures our manufacturing processes meet the highest standards of quality and ethical production.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/placeholder.svg" 
                  alt="Sophia Martinez - Lead Designer" 
                  className="w-48 h-48 object-cover mx-auto"
                />
              </div>
              <h3 className="font-semibold text-lg">Sophia Martinez</h3>
              <p className="text-accent mb-2">Lead Designer</p>
              <p className="text-dark text-sm">
                Sophia's innovative designs blend contemporary trends with timeless aesthetics, creating pieces that stand the test of time.
              </p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img 
                  src="/placeholder.svg" 
                  alt="Marcus Johnson - Sustainability Officer" 
                  className="w-48 h-48 object-cover mx-auto"
                />
              </div>
              <h3 className="font-semibold text-lg">Marcus Johnson</h3>
              <p className="text-accent mb-2">Sustainability Officer</p>
              <p className="text-dark text-sm">
                Marcus leads our sustainability initiatives, constantly researching and implementing eco-friendly practices across our operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
