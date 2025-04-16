
import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePageType } from '@/hooks/usePageType';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({
  children
}: PageLayoutProps) => {
  const { topPadding } = usePageType();

  return <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className={`flex-grow relative py-0 ${topPadding}`}>
        <div className="container mx-auto max-w-screen-xl px-0">
          {children}
        </div>
      </main>
      <Footer />
    </div>;
};

export default PageLayout;
