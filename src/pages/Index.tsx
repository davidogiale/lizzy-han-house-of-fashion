import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroImageGrid from '@/components/home/HeroImageGrid';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import CustomerFavorites from '@/components/home/CustomerFavorites';

const Index = () => {
  return (
    <Layout>
      <HeroImageGrid />
      <FeaturedCollections />
      <NewArrivalsCarousel />
      <CustomerFavorites />
    </Layout>
  );
};

export default Index;
