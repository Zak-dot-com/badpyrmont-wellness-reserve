
import React, { createContext, useContext, useState } from "react";

// Import types
import { 
  BookingType, 
  BookingData, 
  DurationType, 
  CustomerInfo
} from "../types/bookingTypes";
import { BookingContextType } from "./booking/BookingContextTypes";

// Import data
import { initialBookingData } from "../data/initialData";
import { availablePackages } from "../data/packagesData";
import { availableRooms } from "../data/roomsData";

// Import custom hooks
import { usePackages } from "../hooks/usePackages";
import { useRooms } from "../hooks/useRooms";
import { useAddOns } from "../hooks/useAddOns";
import { usePricing } from "../hooks/usePricing";
import { useEventBooking } from "../hooks/useEventBooking";

// Import refactored booking hooks
import { useBookingDates } from "./booking/useBookingDates";
import { useBookingPackages } from "./booking/useBookingPackages";
import { useBookingRooms } from "./booking/useBookingRooms";
import { useBookingAddOns } from "./booking/useBookingAddOns";
import { useBookingEvents } from "./booking/useBookingEvents";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [eventSpace, setEventSpace] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [attendees, setAttendees] = useState<number | null>(50);
  const [eventType, setEventType] = useState<string | null>(null);
  const [eventDuration, setEventDuration] = useState<number | null>(4);
  const [eventAddons, setEventAddons] = useState<string[]>([]);
  const [bookingType, setBookingType] = useState<BookingType>(null);

  // Custom hooks
  const { getStandardRoom, getRoomUpgradePrice, selectRoom: roomSelector, toggleRoomAddOn, removeRoomAddOn } = useRooms();
  const { selectPackage: packageSelector } = usePackages(bookingData.selectedPackage);
  const { toggleAddOn, removeAddOn, updateAddOnQuantity, getSelectedAddOns } = useAddOns();
  const { getDefaultAddOnQuantity, calculateTotalPrice } = usePricing({
    getStandardRoom, 
    getRoomUpgradePrice,
    eventSpace, 
    eventType, 
    attendees, 
    eventDuration, 
    eventAddons,
    eventDate
  });
  const eventBooking = useEventBooking(
    eventSpace,
    eventDate,
    eventType,
    attendees,
    eventDuration,
    eventAddons,
    setEventSpace,
    setEventDate,
    setEventType,
    setAttendees,
    setEventDuration,
    setEventAddons
  );

  // Refactored booking hooks
  const { calculateEndDate } = useBookingDates(bookingData);
  const { selectPackage: packageOperation, resetPackage: resetPackageOperation } = useBookingPackages();
  const { 
    handleSelectRoom, 
    resetRoom: resetRoomOperation,
    handleToggleRoomAddOn,
    handleRemoveRoomAddOn
  } = useBookingRooms();
  const { 
    handleToggleAddOn, 
    handleRemoveAddOn, 
    handleUpdateAddOnQuantity 
  } = useBookingAddOns();
  const { handleSetEventSpace } = useBookingEvents();

  // Navigation
  const goToNextStep = () => {
    setCurrentStep(prevStep => {
      if (bookingType === 'event') {
        return 4; // Checkout step
      }
      return prevStep + 1;
    });
  };

  // Use refactored package operations
  const selectPackage = (packageId: string) => {
    packageOperation(
      setBookingData, 
      setBookingType, 
      packageId, 
      packageSelector, 
      getStandardRoom, 
      bookingData.selectedRoom
    );
  };

  const resetPackage = () => {
    resetPackageOperation(setBookingData, bookingType, setBookingType);
  };

  // Duration and date operations
  const setDuration = (duration: DurationType) => {
    setBookingData(prev => ({
      ...prev,
      duration
    }));
  };

  const setStartDate = (date: Date | null) => {
    setBookingData(prev => ({
      ...prev,
      startDate: date
    }));
  };

  // Add-on operations
  const toggleAddOnHandler = (categoryId: string, itemId: string) => {
    handleToggleAddOn(
      setBookingData, 
      categoryId, 
      itemId, 
      toggleAddOn, 
      getDefaultAddOnQuantity
    );
  };

  const removeAddOnHandler = (categoryId: string, itemId: string) => {
    handleRemoveAddOn(setBookingData, categoryId, itemId, removeAddOn);
  };

  const updateAddOnQuantityHandler = (categoryId: string, itemId: string, quantity: number) => {
    handleUpdateAddOnQuantity(setBookingData, categoryId, itemId, quantity, updateAddOnQuantity);
  };

  // Room operations
  const selectRoomHandler = (roomId: string) => {
    handleSelectRoom(setBookingData, setBookingType, roomId, roomSelector);
  };

  const resetRoomHandler = () => {
    resetRoomOperation(setBookingData, bookingType, setBookingType);
  };

  const toggleRoomAddOnHandler = (addOnId: string) => {
    handleToggleRoomAddOn(setBookingData, addOnId, toggleRoomAddOn);
  };

  const removeRoomAddOnHandler = (addOnId: string) => {
    handleRemoveRoomAddOn(setBookingData, addOnId, removeRoomAddOn);
  };

  // Customer info operations
  const setCustomerInfo = (info: Partial<CustomerInfo>) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info }
    }));
  };

  // Update event space operations
  const setEventSpaceHandler = (space: string) => {
    handleSetEventSpace(setEventSpace, setBookingType, space);
  };

  // Reset all selections
  const resetAllSelections = () => {
    // Reset booking data to initial state
    setBookingData({
      ...initialBookingData,
      customerInfo: bookingData.customerInfo // Preserve customer information
    });
    
    // Reset event booking data
    setEventSpace(null);
    setEventDate(null);
    setEventType(null);
    setAttendees(50);
    setEventDuration(4);
    setEventAddons([]);
    
    // Reset booking type
    setBookingType(null);
    
    // Reset to first step
    setCurrentStep(1);
    
    // Clear any event booking data in session storage
    sessionStorage.removeItem('eventBooking');
  };

  const selectedAddOns = getSelectedAddOns(bookingData.addOnCategories, bookingData.roomAddOns);
  const bookedDays = bookingData.duration ? parseInt(bookingData.duration) : 0;

  return (
    <BookingContext.Provider value={{
      currentStep,
      bookingData,
      availablePackages,
      availableRooms,
      setCurrentStep,
      goToNextStep,
      selectPackage,
      resetPackage,
      setDuration,
      setStartDate,
      toggleAddOn: toggleAddOnHandler,
      removeAddOn: removeAddOnHandler,
      updateAddOnQuantity: updateAddOnQuantityHandler,
      selectRoom: selectRoomHandler,
      resetRoom: resetRoomHandler,
      toggleRoomAddOn: toggleRoomAddOnHandler,
      removeRoomAddOn: removeRoomAddOnHandler,
      setCustomerInfo,
      calculateEndDate: () => calculateEndDate(bookingData.startDate, bookingData.duration),
      calculateTotalPrice: () => calculateTotalPrice(bookingData),
      getDefaultAddOnQuantity: () => getDefaultAddOnQuantity(bookingData.duration),
      getStandardRoom,
      getRoomUpgradePrice,
      ...eventBooking,
      eventSpace,
      setEventSpace: setEventSpaceHandler,
      bookingType,
      setBookingType,
      selectedPackage: bookingData.selectedPackage,
      selectedDuration: bookingData.duration,
      selectedAddOns,
      selectedRoom: bookingData.selectedRoom,
      bookedDays,
      startDate: bookingData.startDate,
      resetAllSelections
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
