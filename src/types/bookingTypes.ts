
import { Dispatch, SetStateAction } from 'react';

// Package types
export type PackageType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  type: string;
  image?: string;
  includesStandardRoom: boolean;
};

// Duration type
export type DurationType = "4" | "7" | "14";

// Add-on types
export type AddOnCategory = {
  id: string;
  name: string;
  items: AddOnItem[];
};

export type AddOnItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  quantity: number;
};

// Room types
export type RoomType = {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isStandard?: boolean;
};

export type RoomAddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  selected: boolean;
};

// Customer info type
export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

// Main booking data type
export type BookingData = {
  selectedPackage: PackageType | null;
  duration: DurationType;
  startDate: Date | null;
  addOnCategories: AddOnCategory[];
  selectedRoom: RoomType | null;
  roomAddOns: RoomAddOn[];
  totalPrice: number;
  customerInfo: CustomerInfo;
};

// Booking types
export type BookingType = 'package' | 'room' | 'event' | null;

// Event types
export type EventSpace = string | null;
export type EventDate = Date | null;
export type EventAttendees = number | null;
export type EventType = string | null;
export type EventDuration = number | null;
export type EventAddons = string[];
