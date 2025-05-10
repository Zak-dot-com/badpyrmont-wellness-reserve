
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

  return {
    handleSetEventSpace
  };
}
