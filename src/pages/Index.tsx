import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import ShopTheLook from '@/components/home/ShopTheLook';
import CustomerFavorites from '@/components/home/CustomerFavorites';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <NewArrivalsCarousel />
      <ShopTheLook />
      <CustomerFavorites />
    </Layout>
  );
};

export default Index;