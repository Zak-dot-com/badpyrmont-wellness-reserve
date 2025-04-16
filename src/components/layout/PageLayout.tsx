
import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 max-w-screen-xl">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
