
import React, { createContext, useContext, useState } from "react";
import { BookingContextType } from "./types";
import { BookingType, BookingData, DurationType, CustomerInfo } from "@/types/bookingTypes";
import { initialBookingData } from "@/data/initialData";
import { availablePackages } from "@/data/packagesData";
import { availableRooms } from "@/data/roomsData";
import { usePackages } from "@/hooks/usePackages";
import { useRooms } from "@/hooks/useRooms";
import { useAddOns } from "@/hooks/useAddOns";
import { usePricing } from "@/hooks/usePricing";
import { useEventBooking } from "@/hooks/useEventBooking";
import { calculateEndDate, getResetBookingData } from "./utils";
import { toggleAddOn, removeAddOn, updateAddOnQuantity, getSelectedAddOns } from "./addonOperations";
import { toggleRoomAddOn, removeRoomAddOn } from "./roomOperations";
import { handleSelectPackage } from "./packageOperations";

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
  const { getStandardRoom, getRoomUpgradePrice, selectRoom: roomSelector } = useRooms();
  const { selectPackage: packageSelector } = usePackages(bookingData.selectedPackage);
  const { getDefaultAddOnQuantity, calculateTotalPrice } = usePricing({
    getStandardRoom, 
    getRoomUpgradePrice,
    eventSpace, 
    eventType, 
    attendees, 
    eventDuration, 
    eventAddons
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

  // Navigation
  const goToNextStep = () => {
    setCurrentStep(prevStep => {
      if (bookingType === 'event') {
        return 4; // Checkout step
      }
      return prevStep + 1;
    });
  };

  // Make sure booking type is set when selecting a package
  const selectPackage = (packageId: string) => {
    setBookingType('package');
    
    const { selectedPackage: newPackage, selectedRoom: newRoom } = packageSelector(
      packageId, 
      getStandardRoom, 
      bookingData.selectedRoom
    );
    
    setBookingData(prev => ({
      ...prev,
      selectedPackage: newPackage,
      selectedRoom: newRoom
    }));
  };

  const resetPackage = () => {
    setBookingData(prev => ({
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

  const calculateEndDateFromState = (): Date | null => {
    return calculateEndDate(bookingData.startDate, bookingData.duration);
  };

  // Add-on operations
  const handleToggleAddOn = (categoryId: string, itemId: string) => {
    setBookingData(prev => {
      const updatedCategories = toggleAddOn(
        prev.addOnCategories, 
        categoryId, 
        itemId, 
        () => getDefaultAddOnQuantity(prev.duration)
      );
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const handleRemoveAddOn = (categoryId: string, itemId: string) => {
    setBookingData(prev => {
      const updatedCategories = removeAddOn(prev.addOnCategories, categoryId, itemId);
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const handleUpdateAddOnQuantity = (categoryId: string, itemId: string, quantity: number) => {
    setBookingData(prev => {
      const updatedCategories = updateAddOnQuantity(prev.addOnCategories, categoryId, itemId, quantity);
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  // Room operations with booking type integration
  const handleSelectRoom = (roomId: string) => {
    setBookingType('room');
    
    const selected = roomSelector(roomId);
    setBookingData(prev => ({
      ...prev,
      selectedRoom: selected
    }));
  };

  const resetRoom = () => {
    setBookingData(prev => ({
      ...prev,
      selectedRoom: null,
      roomAddOns: prev.roomAddOns.map(addon => ({ ...addon, selected: false }))
    }));
    
    // Only reset booking type if it's a room booking
    if (bookingType === 'room') {
      setBookingType(null);
    }
  };

  const handleToggleRoomAddOn = (addOnId: string) => {
    setBookingData(prev => {
      const updatedAddOns = toggleRoomAddOn(prev.roomAddOns, addOnId);
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  const handleRemoveRoomAddOn = (addOnId: string) => {
    setBookingData(prev => {
      const updatedAddOns = removeRoomAddOn(prev.roomAddOns, addOnId);
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  // Customer info operations
  const setCustomerInfo = (info: Partial<CustomerInfo>) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info }
    }));
  };

  // Update event space operations to set booking type
  const handleSetEventSpace = (space: string) => {
    setEventSpace(space);
    setBookingType('event');
  }

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
      toggleAddOn: handleToggleAddOn,
      removeAddOn: handleRemoveAddOn,
      updateAddOnQuantity: handleUpdateAddOnQuantity,
      selectRoom: handleSelectRoom,
      resetRoom,
      toggleRoomAddOn: handleToggleRoomAddOn,
      removeRoomAddOn: handleRemoveRoomAddOn,
      setCustomerInfo,
      calculateEndDate: calculateEndDateFromState,
      calculateTotalPrice: () => calculateTotalPrice(bookingData),
      getDefaultAddOnQuantity: () => getDefaultAddOnQuantity(bookingData.duration),
      getStandardRoom,
      getRoomUpgradePrice,
      ...eventBooking,
      eventSpace,
      setEventSpace: handleSetEventSpace,
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
