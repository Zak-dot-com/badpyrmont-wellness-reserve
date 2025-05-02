
import { useEffect, useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoomSelection from '@/components/booking/steps/RoomSelection';
import BookingSummary from '@/components/booking/BookingSummary';
import DateSelector from '@/components/home/DateSelector';
import CheckoutForm from '@/components/booking/steps/CheckoutForm';
import WellnessPackageDialog from '@/components/booking/steps/WellnessPackageDialog';
import CancellationPolicy from '@/components/booking/CancellationPolicy';

const RoomBookingPage = () => {
  const {
    setBookingType,
    setStartDate,
    setDuration,
    calculateEndDate,
    currentStep,
    setCurrentStep,
    bookingData
  } = useBooking();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState<'dates' | 'room' | 'checkout'>('dates');
  const [showWellnessDialog, setShowWellnessDialog] = useState(false);

  // Initialize booking context for room-only booking
  useEffect(() => {
    setBookingType('room');

    // Get room type from URL if present
    const roomParam = searchParams.get('room');
    if (roomParam) {
      setActiveStep('room');
      toast.info("Room type pre-selected. Please select your dates.");
    }

    // Get dates from URL if present
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    if (startDateParam) {
      setStartDate(new Date(startDateParam));

      // Calculate duration from start/end dates if both are present
      if (endDateParam) {
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
    }
  }, [searchParams, setBookingType, setStartDate, setDuration]);
  
  const handleContinue = () => {
    if (activeStep === 'dates') {
      if (!bookingData.startDate) {
        toast.error("Please select check-in and check-out dates");
        return;
      }
      setActiveStep('room');
    } else if (activeStep === 'room') {
      if (!bookingData.selectedRoom) {
        toast.error("Please select a room");
        return;
      }
      setActiveStep('checkout');
      setCurrentStep(4); // Set to checkout step for consistency with main flow
    }
  };
  
  const handleBack = () => {
    if (activeStep === 'room') {
      setActiveStep('dates');
    } else if (activeStep === 'checkout') {
      setActiveStep('room');
      setCurrentStep(3); // Reset to room selection step
    }
  };
  
  const handleStepClick = (step: 'dates' | 'room' | 'checkout') => {
    // Only allow going backward or staying on current step
    if (step === activeStep) return;
    if (step === 'dates') {
      setActiveStep('dates');
    } else if (step === 'room') {
      // Only allow if dates are selected
      if (!bookingData.startDate) {
        toast.error("Please select your dates first");
        return;
      }
      setActiveStep('room');
    } else if (step === 'checkout') {
      // Only allow if room is selected
      if (!bookingData.selectedRoom) {
        toast.error("Please select a room first");
        return;
      }
      setActiveStep('checkout');
      setCurrentStep(4);
    }
  };
  
  const handleAddWellnessOptions = () => {
    setShowWellnessDialog(true);
  };

  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-[115px]">
          <div className="max-w-screen-xl mx-auto">
            <motion.h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              Book Your Stay
            </motion.h1>
            
            <div className="mb-8">
              <div className="flex justify-center">
                <div className="flex items-center">
                  <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", activeStep === 'dates' ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-white")} onClick={() => handleStepClick('dates')}>
                    <span className={cn("text-sm font-semibold", activeStep === 'dates' ? "text-amber-700" : "text-gray-500")}>1</span>
                  </div>
                  <div className={cn("w-12 h-0.5", activeStep !== 'dates' ? "bg-amber-500" : "bg-gray-300")}></div>
                  <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", activeStep === 'room' ? "border-amber-500 bg-amber-50" : activeStep === 'checkout' ? "border-amber-500 bg-white" : "border-gray-300 bg-white")} onClick={() => handleStepClick('room')}>
                    <span className={cn("text-sm font-semibold", activeStep === 'room' ? "text-amber-700" : activeStep === 'checkout' ? "text-amber-700" : "text-gray-500")}>2</span>
                  </div>
                  <div className={cn("w-12 h-0.5", activeStep === 'checkout' ? "bg-amber-500" : "bg-gray-300")}></div>
                  <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", activeStep === 'checkout' ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-white")} onClick={() => handleStepClick('checkout')}>
                    <span className={cn("text-sm font-semibold", activeStep === 'checkout' ? "text-amber-700" : "text-gray-500")}>3</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex space-x-16 text-sm">
                  <span className={cn("cursor-pointer", activeStep === 'dates' ? "text-amber-700 font-medium" : "text-gray-500")} onClick={() => handleStepClick('dates')}>
                    Dates
                  </span>
                  <span className={cn("cursor-pointer", activeStep === 'room' ? "text-amber-700 font-medium" : "text-gray-500")} onClick={() => handleStepClick('room')}>
                    Room
                  </span>
                  <span className={cn("cursor-pointer", activeStep === 'checkout' ? "text-amber-700 font-medium" : "text-gray-500")} onClick={() => handleStepClick('checkout')}>
                    Checkout
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {activeStep === 'dates' && <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -20
              }} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Select Your Stay Dates</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-in / Check-out
                          </label>
                          <DateSelector showRange={true} startDate={bookingData.startDate} endDate={calculateEndDate()} onStartDateChange={setStartDate} onEndDateChange={() => {}} />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                          </label>
                          <div className="flex space-x-4">
                            {['4', '7', '14'].map(day => <Button key={day} type="button" variant={bookingData.duration === day ? "default" : "outline"} className={cn("flex-1", bookingData.duration === day ? "bg-amber-500 hover:bg-amber-600" : "")} onClick={() => setDuration(day as any)}>
                                {day} {parseInt(day) === 1 ? 'day' : 'days'}
                              </Button>)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <strong>Selected Stay:</strong> {bookingData.startDate ? `${format(bookingData.startDate, 'MMM dd, yyyy')} to ${calculateEndDate() ? format(calculateEndDate()!, 'MMM dd, yyyy') : 'Not selected'} (${bookingData.duration} days)` : 'Please select your dates'}
                        </p>
                      </div>
                      
                      <CancellationPolicy showFull={true} />

                      <div className="flex justify-end">
                        <Button onClick={handleContinue} className="bg-amber-800 hover:bg-amber-900" size="lg">
                          Continue to Room Selection
                        </Button>
                      </div>
                    </div>
                  </motion.div>}
                
                {activeStep === 'room' && <RoomSelection />}
                
                {activeStep === 'checkout' && <CheckoutForm />}
                
                {activeStep === 'room' && <div className="flex justify-between mt-8">
                    <Button onClick={handleBack} variant="outline" size="lg">
                      Back
                    </Button>
                    
                    <Button onClick={handleContinue} className="bg-amber-800 hover:bg-amber-900" size="lg">
                      Continue to Checkout
                    </Button>
                  </div>}
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <BookingSummary />
                  
                  {activeStep !== 'checkout' && <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 text-amber-700">
                        <PackageCheck size={20} />
                        <span className="font-medium">Looking for wellness options?</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Enhance your stay with our wellness packages and spa treatments.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full mt-3 border-amber-500 text-amber-700 hover:bg-amber-50"
                        onClick={handleAddWellnessOptions}
                      >
                        Add Wellness Package
                      </Button>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Wellness Package Dialog */}
      <WellnessPackageDialog open={showWellnessDialog} onOpenChange={setShowWellnessDialog} />
    </div>;
};
export default RoomBookingPage;
