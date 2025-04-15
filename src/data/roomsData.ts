
import { RoomType, RoomAddOn } from "../types/bookingTypes";

export const availableRooms: RoomType[] = [
  {
    id: "single-standard",
    type: "single",
    name: "Single Room",
    description: "Comfortable single room with all essential amenities",
    price: 80,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1470&auto=format&fit=crop",
    isStandard: true
  },
  {
    id: "deluxe-room",
    type: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and mountain view",
    price: 150,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
    isStandard: false
  },
  {
    id: "vip-suite",
    type: "suite",
    name: "VIP Suite",
    description: "Luxurious suite with separate living area and panoramic views",
    price: 280,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
    isStandard: false
  }
];

export const initialRoomAddOns: RoomAddOn[] = [
  {
    id: "vip-treatment",
    name: "VIP Treatment",
    description: "Premium concierge service and daily amenities",
    price: 150,
    icon: "circle-check",
    selected: false
  },
  {
    id: "extra-parking",
    name: "Extra Parking",
    description: "Additional secure parking space",
    price: 25,
    icon: "circle-parking",
    selected: false
  },
  {
    id: "high-speed-wifi",
    name: "High Speed WiFi",
    description: "Dedicated high-speed internet connection",
    price: 15,
    icon: "wifi",
    selected: false
  },
  {
    id: "breakfast-in-bed",
    name: "Breakfast in Bed",
    description: "Daily gourmet breakfast delivered to your room",
    price: 40,
    icon: "bed",
    selected: false
  }
];
