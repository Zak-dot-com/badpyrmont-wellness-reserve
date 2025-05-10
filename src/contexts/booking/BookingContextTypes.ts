
import { 
  BookingType, 
  BookingData, 
  DurationType, 
  PackageType,
  RoomType,
  CustomerInfo,
  EventSpace,
  EventDate,
  EventType,
  EventAttendees,
  EventDuration,
  EventAddons
} from "../../types/bookingTypes";
import { Dispatch, SetStateAction } from 'react';

export type BookingContextType = {
  currentStep: number;
  bookingData: BookingData;
  availablePackages: PackageType[];
  availableRooms: RoomType[];
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  selectPackage: (packageId: string) => void;
  resetPackage: () => void;
  setDuration: (duration: DurationType) => void;
  setStartDate: (date: Date | null) => void;
  toggleAddOn: (categoryId: string, itemId: string) => void;
  removeAddOn: (categoryId: string, itemId: string) => void;
  updateAddOnQuantity: (categoryId: string, itemId: string, quantity: number) => void;
  selectRoom: (roomId: string) => void;
  resetRoom: () => void;
  toggleRoomAddOn: (addOnId: string) => void;
  removeRoomAddOn: (addOnId: string) => void;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  calculateEndDate: () => Date | null;
  calculateTotalPrice: () => number;
  getDefaultAddOnQuantity: () => number;
  getStandardRoom: () => RoomType | null;
  getRoomUpgradePrice: (roomId: string) => number;
  eventSpace: string | null;
  eventDate: Date | null;
  attendees: number | null;
  eventType: string | null;
  eventDuration: number | null;
  eventAddons: string[];
  setEventSpace: (eventSpace: string) => void;
  setEventDate: (date: Date) => void;
  setAttendees: (count: number) => void;
  setEventType: (type: string) => void;
  setEventDuration: (hours: number) => void;
  setEventAddons: (addons: string[]) => void;
  bookingType: BookingType;
  setBookingType: (type: BookingType) => void;
  selectedPackage: PackageType | null;
  selectedDuration: string;
  selectedAddOns: string[];
  selectedRoom: RoomType | null;
  bookedDays: number;
  startDate: Date | null;
  resetAllSelections: () => void;
};
