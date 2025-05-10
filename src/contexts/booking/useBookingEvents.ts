
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

  const calculateEndTime = (startTime: string, durationHours: number): string => {
    if (!startTime) return '';
    
    // Parse the start time (format: HH:MM)
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Calculate end time
    let endHours = hours + durationHours;
    
    // Handle overflow to next day
    if (endHours >= 24) {
      endHours = endHours - 24;
    }
    
    // Format the result as HH:MM
    return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return {
    handleSetEventSpace,
    calculateEndTime
  };
}
