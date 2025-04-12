
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import CallToAction from '@/components/home/CallToAction';
import BookingBar from '@/components/home/BookingBar';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="relative">
          <HeroSection />
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-6 lg:px-24 xl:px-32">
            <BookingBar className="mx-auto max-w-7xl" />
          </div>
        </div>
        <div className="pt-24 md:pt-32">
          <FeaturesSection />
          <PackagesSection />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
