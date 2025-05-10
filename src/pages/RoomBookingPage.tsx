
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoomBookingContainer from '@/components/booking/room/RoomBookingContainer';

const RoomBookingPage = () => {
  const {
    setBookingType,
    setStartDate,
    setDuration,
    calculateEndDate,
    currentStep,
    setCurrentStep,
    bookingData,
    selectRoom
  } = useBooking();

  const { navigateToStep } = useBooking();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState<'dates' | 'room' | 'checkout'>('dates');
  const notificationsShown = useRef(false);

  // Initialize booking context for room-only booking
  useEffect(() => {
    setBookingType('room');

    // Get room type from URL if present
    const roomParam = searchParams.get('room');
    if (roomParam) {
      // Pre-select the room by ID
      selectRoom(roomParam);
      setActiveStep('room'); // Move to the room selection step
      
      // Only show notification once
      if (!notificationsShown.current) {
        toast.info("Room type pre-selected. Please confirm your selection or choose dates.");
        notificationsShown.current = true;
      }
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
  }, [searchParams, setBookingType, setStartDate, setDuration, selectRoom]);

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
      navigateToStep(setActiveStep, setCurrentStep, 'checkout');
    }
  };

  const handleBack = () => {
    if (activeStep === 'room') {
      setActiveStep('dates');
    } else if (activeStep === 'checkout') {
      navigateToStep(setActiveStep, setCurrentStep, 'room');
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
      navigateToStep(setActiveStep, setCurrentStep, 'checkout');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <RoomBookingContainer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          bookingData={bookingData}
          setStartDate={setStartDate}
          setDuration={setDuration}
          calculateEndDate={calculateEndDate}
          handleStepClick={handleStepClick}
          handleContinue={handleContinue}
          handleBack={handleBack}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RoomBookingPage;
