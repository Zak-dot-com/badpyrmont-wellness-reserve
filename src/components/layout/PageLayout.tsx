
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({
  children
}: PageLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className={`flex-grow relative py-0 ${!isHomePage ? 'pt-40' : 'pt-32'}`}>
        <div className="container mx-auto max-w-screen-xl px-0">
          {children}
        </div>
      </main>
      <Footer />
    </div>;
};

export default PageLayout;
