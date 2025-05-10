
import { useState } from 'react';
import { addDays } from "date-fns";
import { DurationType, BookingData } from "../../types/bookingTypes";

export function useBookingDates(bookingData: BookingData) {
  const setDuration = (setState: React.Dispatch<React.SetStateAction<BookingData>>, duration: DurationType) => {
    setState(prev => ({
      ...prev,
      duration
    }));
  };

  const setStartDate = (setState: React.Dispatch<React.SetStateAction<BookingData>>, date: Date | null) => {
    setState(prev => ({
      ...prev,
      startDate: date
    }));
  };

  const calculateEndDate = (startDate: Date | null, duration: string): Date | null => {
    if (!startDate) return null;
    return addDays(startDate, parseInt(duration));
  };

  return {
    setDuration,
    setStartDate,
    calculateEndDate
  };
}
