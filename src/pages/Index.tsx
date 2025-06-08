
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import ShopTheLook from '@/components/home/ShopTheLook';
import CustomerFavorites from '@/components/home/CustomerFavorites';
import SaleSection from '@/components/home/SaleSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <NewArrivalsCarousel />
      <ShopTheLook />
      <CustomerFavorites />
      <SaleSection />
      <InstagramFeed />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
