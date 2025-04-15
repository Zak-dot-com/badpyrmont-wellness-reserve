
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import CallToAction from '@/components/home/CallToAction';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="pt-24 md:pt-32 py-0">
          <FeaturesSection />
          <PackagesSection />
          <TestimonialsSection />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>;
};

export default Index;
