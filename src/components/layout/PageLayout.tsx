
import React, { ReactNode, useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePageType } from '@/hooks/usePageType';
import { AnimatePresence, motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { topPadding } = usePageType();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure smooth page entry animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Header />
      
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative ${topPadding}`}
          >
            <div className="mx-auto">
              {children}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
