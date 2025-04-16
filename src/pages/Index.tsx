
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import CallToAction from '@/components/home/CallToAction';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <PageLayout>
      <div>
        <HeroSection />
        <div className="py-12">
          <FeaturesSection />
          <PackagesSection />
          <TestimonialsSection />
          <CallToAction />
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
