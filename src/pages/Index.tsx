
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import CallToAction from '@/components/home/CallToAction';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SocialMediaSection from '@/components/home/SocialMediaSection';

const Index = () => {
  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <HeroSection />
      <PageLayout>
        <FeaturesSection />
        <PackagesSection />
        <TestimonialsSection />
        <CallToAction />
        <SocialMediaSection />
      </PageLayout>
    </motion.div>
  );
};

export default Index;
