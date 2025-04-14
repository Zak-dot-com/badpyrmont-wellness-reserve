
import { useBooking } from '@/contexts/BookingContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, x: -50 }
};

const BookingPage = () => {
  const { currentStep, calculateTotalPrice, selectRoom, selectPackage, setCurrentStep, setStartDate, setDuration } = useBooking();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const totalPrice = calculateTotalPrice();
  const [searchParams] = useSearchParams();
  const [bookingType, setBookingType] = useState<'package' | 'room' | 'event' | null>(null);

  // Parse query parameters to pre-select options
  useEffect(() => {
    // Determine booking type
    const type = searchParams.get('bookingType');
    const room = searchParams.get('room');
    const packageId = searchParams.get('package');
    const event = searchParams.get('event');
    const addPackage = searchParams.get('addPackage');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    
    // Handle date selection
    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
    
    // Set booking type
    if (type === 'room') {
      setBookingType('room');
    } else if (type === 'event') {
      setBookingType('event');
      // Handle event space booking logic
      toast.info("Event space booking selected. Choose your preferred date and services.");
    } else if (packageId) {
      setBookingType('package');
    } else {
      // Default to package booking if no specific type
      setBookingType('package');
    }
    
    // Handle room selection from homepage
    if (room) {
      selectRoom(room === 'standard' ? 'single-standard' : room === 'deluxe' ? 'deluxe-room' : 'vip-suite');
      setCurrentStep(3); // Jump to room selection step
      toast.info("Room type pre-selected. Please confirm your selection.");
    }
    
    // Handle package selection from homepage
    if (packageId) {
      selectPackage(packageId === 'relaxation' ? 'relaxation-retreat' : 
                   packageId === 'detox' ? 'detox-revitalize' : 'luxury-escape');
      toast.info("Package pre-selected. Please customize your wellness journey.");
    }
    
    // If coming from "Add Wellness Package" button
    if (addPackage === 'true') {
      setCurrentStep(1); // Go to package selection step
      toast.info("Select a wellness package to enhance your stay.");
    }
    
    // Calculate duration from start/end dates if both are present
    if (startDateParam && endDateParam) {
      const start = new Date(startDateParam);
      const end = new Date(endDateParam);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // Set closest duration from available options
      if (diffDays <= 4) {
        setDuration("4");
      } else if (diffDays <= 7) {
        setDuration("7");
      } else {
        setDuration("14");
      }
    }
  }, [searchParams, selectRoom, selectPackage, setCurrentStep, setStartDate, setDuration]);

  // Make sure drawer is closed when switching to desktop view
  useEffect(() => {
    if (!isMobile && openDrawer) {
      setOpenDrawer(false);
    }
  }, [isMobile, openDrawer]);

  const getPageTitle = () => {
    if (bookingType === 'room') {
      return "Book Your Stay";
    } else if (bookingType === 'event') {
      return "Book Your Event Space";
    } else {
      return "Book Your Wellness Retreat";
    }
  };

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
              {getPageTitle()}
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
              
              {/* Desktop BookingSummary */}
              {!isMobile && (
                <div className="lg:col-span-1 relative">
                  <BookingSummary />
                </div>
              )}
              
              {/* Mobile floating button with drawer */}
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
