
import { BookingType } from "../../types/bookingTypes";

export function useBookingEvents() {
  const handleSetEventSpace = (
    setEventSpace: (space: string) => void,
    setBookingType: (type: BookingType) => void,
    space: string
  ) => {
    setEventSpace(space);
    setBookingType('event');
  };

  const navigateToStep = (
    setActiveStep: (step: 'dates' | 'room' | 'checkout') => void,
    setCurrentStep: (step: number) => void,
    step: 'dates' | 'room' | 'checkout'
  ) => {
    console.log("navigateToStep called with step:", step);
    setActiveStep(step);
    
    if (step === 'checkout') {
      setCurrentStep(4); // Set to checkout step for consistency with main flow
    } else if (step === 'room') {
      setCurrentStep(3); // Room selection step
    } else {
      setCurrentStep(1); // Dates selection step
    }
  };

  return {
    handleSetEventSpace,
    navigateToStep
  };
}
