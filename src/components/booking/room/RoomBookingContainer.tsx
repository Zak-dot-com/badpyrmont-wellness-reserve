
import React from 'react';
import { motion } from 'framer-motion';
import StepIndicator from './StepIndicator';
import SidebarContent from './SidebarContent';
import DateSelectionStep from './DateSelectionStep';
import RoomSelection from '@/components/booking/steps/RoomSelection';
import CheckoutForm from '@/components/booking/steps/CheckoutForm';
import NavigationButtons from '@/components/booking/steps/room-selection/NavigationButtons';
import { Button } from '@/components/ui/button';
import { BookingData, DurationType } from '@/types/bookingTypes';

type RoomBookingContainerProps = {
  activeStep: 'dates' | 'room' | 'checkout';
  setActiveStep: (step: 'dates' | 'room' | 'checkout') => void;
  bookingData: BookingData;
  setStartDate: (date: Date | null) => void;
  setDuration: (duration: DurationType) => void;
  calculateEndDate: () => Date | null;
  handleStepClick: (step: 'dates' | 'room' | 'checkout') => void;
  handleContinue: () => void;
  handleBack: () => void;
};

const RoomBookingContainer = ({
  activeStep,
  setActiveStep,
  bookingData,
  setStartDate,
  setDuration,
  calculateEndDate,
  handleStepClick,
  handleContinue,
  handleBack
}: RoomBookingContainerProps) => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-[115px]">
      <div className="max-w-screen-xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Book Your Stay
        </motion.h1>
        
        <StepIndicator 
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {activeStep === 'dates' && (
              <DateSelectionStep
                bookingData={bookingData}
                setStartDate={setStartDate}
                setDuration={setDuration}
                calculateEndDate={calculateEndDate}
                onContinue={handleContinue}
              />
            )}
            
            {activeStep === 'room' && (
              <RoomSelection 
                isEditMode={false} 
                onEditComplete={() => {}}
              />
            )}
            
            {activeStep === 'checkout' && <CheckoutForm />}
            
            {activeStep === 'room' && (
              <NavigationButtons 
                isEditMode={false}
                onBack={handleBack}
                onContinue={handleContinue}
                disabled={!bookingData.selectedRoom}
              />
            )}
            
            {activeStep === 'checkout' && (
              <div className="flex justify-between mt-8">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <SidebarContent activeStep={activeStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingContainer;
