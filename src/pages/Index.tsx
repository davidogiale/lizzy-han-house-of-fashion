import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import ShopTheLook from '@/components/home/ShopTheLook';
import CustomerFavorites from '@/components/home/CustomerFavorites';
import InstagramFeed from '@/components/home/InstagramFeed';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <NewArrivalsCarousel />
      <ShopTheLook />
      <CustomerFavorites />
      {/*<InstagramFeed />*/}
      {/* <TestimonialsSection /> */}
    </Layout>
  );
};

export default Index;
