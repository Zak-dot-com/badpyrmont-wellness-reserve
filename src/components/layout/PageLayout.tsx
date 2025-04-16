import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
interface PageLayoutProps {
  children: ReactNode;
}
const PageLayout = ({
  children
}: PageLayoutProps) => {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 py-[79px]">
        <div className="container mx-auto max-w-screen-xl px-0">
          {children}
        </div>
      </main>
      <Footer />
    </div>;
};
export default PageLayout;