
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import SaleSection from '@/components/home/SaleSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <SaleSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
