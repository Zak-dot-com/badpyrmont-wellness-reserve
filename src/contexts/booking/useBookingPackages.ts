
import { BookingType, BookingData, RoomType } from "../../types/bookingTypes";

export function useBookingPackages() {
  const selectPackage = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    setBookingType: (type: BookingType) => void,
    packageId: string, 
    packageSelector: Function,
    getStandardRoom: () => RoomType | null, 
    currentRoom: RoomType | null
  ) => {
    setBookingType('package');
    
    const { selectedPackage: newPackage, selectedRoom: newRoom } = packageSelector(
      packageId, 
      getStandardRoom, 
      currentRoom
    );
    
    setState(prev => ({
      ...prev,
      selectedPackage: newPackage,
      selectedRoom: newRoom
    }));
  };

  const resetPackage = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    bookingType: BookingType,
    setBookingType: (type: BookingType) => void
  ) => {
    setState(prev => ({
      ...prev,
      selectedPackage: null,
      startDate: null,
      duration: "4"
    }));
    
    // Only reset booking type if it's a package booking
    if (bookingType === 'package') {
      setBookingType(null);
    }
  };

  return {
    selectPackage,
    resetPackage
  };
}
