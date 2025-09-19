import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandSection from '@/components/BrandSection';
import ExploreSection from '@/components/ExploreSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import PopularMakesSection from '@/components/PopularMakesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandSection />
      <ExploreSection />
      <AboutSection />
      <FeaturesSection />
      <PopularMakesSection />
      <Footer />
    </div>
  );
};

export default Index;
