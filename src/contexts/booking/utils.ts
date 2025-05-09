
import { addDays } from "date-fns";
import { BookingData, DurationType } from "@/types/bookingTypes";
import { initialBookingData } from "@/data/initialData";

export const calculateEndDate = (startDate: Date | null, duration: string): Date | null => {
  if (!startDate) return null;
  return addDays(startDate, parseInt(duration));
};

export const getDerivedSelectionData = (bookingData: BookingData) => {
  const bookedDays = bookingData.duration ? parseInt(bookingData.duration) : 0;
  return { bookedDays };
};

export const getResetBookingData = (currentCustomerInfo: BookingData['customerInfo']) => {
  // Reset booking data to initial state but preserve customer information
  return {
    ...initialBookingData,
    customerInfo: currentCustomerInfo
  };
};

export const setBookingDuration = (duration: DurationType) => {
  return duration;
};
