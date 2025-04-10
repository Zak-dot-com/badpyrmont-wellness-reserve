
import { useBooking } from '@/contexts/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingStepper from '@/components/booking/BookingStepper';
import BookingSummary from '@/components/booking/BookingSummary';
import PackageSelection from '@/components/booking/steps/PackageSelection';
import AddOnSelection from '@/components/booking/steps/AddOnSelection';
import RoomSelection from '@/components/booking/steps/RoomSelection';
import CheckoutForm from '@/components/booking/steps/CheckoutForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, x: -50 }
};

const BookingPage = () => {
  const { currentStep, calculateTotalPrice } = useBooking();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const totalPrice = calculateTotalPrice();

  // Make sure drawer is closed when switching to desktop view
  useEffect(() => {
    if (!isMobile && openDrawer) {
      setOpenDrawer(false);
    }
  }, [isMobile, openDrawer]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PackageSelection />;
      case 2:
        return <AddOnSelection />;
      case 3:
        return <RoomSelection />;
      case 4:
        return <CheckoutForm />;
      default:
        return <PackageSelection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-screen-xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Book Your Wellness Retreat
            </motion.h1>
            
            <BookingStepper />
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {renderCurrentStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Always render BookingSummary for desktop */}
              {!isMobile && (
                <div className="lg:col-span-1 relative">
                  <BookingSummary />
                </div>
              )}
              
              {/* For mobile, show a floating button that opens a drawer with BookingSummary */}
              {isMobile && (
                <div className="fixed bottom-6 right-6 z-10">
                  <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                    <DrawerTrigger asChild>
                      <Button 
                        className="rounded-full h-16 w-16 bg-amber-500 hover:bg-amber-600 shadow-lg flex flex-col items-center justify-center"
                      >
                        <ShoppingBag className="h-6 w-6" />
                        <span className="text-xs mt-1">€{totalPrice.toFixed(2)}</span>
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[85vh] overflow-y-auto">
                      <div className="px-4 py-6">
                        <BookingSummary />
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
