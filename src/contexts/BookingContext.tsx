
import React, { createContext, useContext, useState } from "react";
import { addDays } from "date-fns";

// Define our types
export type PackageType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  type: string;
  image?: string;
};

export type DurationType = "4" | "7" | "14";

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

export type RoomType = {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type RoomAddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  selected: boolean;
};

export type BookingData = {
  selectedPackage: PackageType | null;
  duration: DurationType;
  startDate: Date | null;
  addOnCategories: AddOnCategory[];
  selectedRoom: RoomType | null;
  roomAddOns: RoomAddOn[];
  totalPrice: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

type BookingContextType = {
  currentStep: number;
  bookingData: BookingData;
  availablePackages: PackageType[];
  availableRooms: RoomType[];
  setCurrentStep: (step: number) => void;
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
  setCustomerInfo: (info: Partial<BookingData['customerInfo']>) => void;
  calculateEndDate: () => Date | null;
  calculateTotalPrice: () => number;
  getDefaultAddOnQuantity: () => number;
};

// Initial data
const initialData: BookingData = {
  selectedPackage: null,
  duration: "4",
  startDate: null,
  addOnCategories: [
    {
      id: "wellness-treatments",
      name: "Wellness Treatments",
      items: [
        {
          id: "massage-therapy",
          name: "Massage Therapy",
          description: "60-minute relaxing massage session",
          price: 80,
          selected: false,
          quantity: 2
        },
        {
          id: "facial-treatment",
          name: "Facial Treatment",
          description: "Rejuvenating facial with organic products",
          price: 95,
          selected: false,
          quantity: 2
        },
        {
          id: "hot-stone-therapy",
          name: "Hot Stone Therapy",
          description: "Therapeutic hot stone massage",
          price: 120,
          selected: false,
          quantity: 2
        },
        {
          id: "aromatherapy",
          name: "Aromatherapy Session",
          description: "Relaxing aromatherapy treatment",
          price: 75,
          selected: false,
          quantity: 2
        },
        {
          id: "body-scrub",
          name: "Full Body Scrub",
          description: "Exfoliating body scrub treatment",
          price: 85,
          selected: false,
          quantity: 2
        }
      ]
    },
    {
      id: "fitness-activities",
      name: "Fitness Activities",
      items: [
        {
          id: "personal-trainer",
          name: "Personal Trainer",
          description: "One-on-one fitness sessions",
          price: 110,
          selected: false,
          quantity: 2
        },
        {
          id: "yoga-classes",
          name: "Yoga Classes",
          description: "Daily yoga sessions",
          price: 60,
          selected: false,
          quantity: 2
        },
        {
          id: "aqua-fitness",
          name: "Aqua Fitness",
          description: "Water-based fitness activities",
          price: 55,
          selected: false,
          quantity: 2
        },
        {
          id: "meditation",
          name: "Guided Meditation",
          description: "Daily meditation sessions",
          price: 45,
          selected: false,
          quantity: 2
        },
        {
          id: "pilates",
          name: "Pilates Classes",
          description: "Core-strengthening pilates sessions",
          price: 65,
          selected: false,
          quantity: 2
        }
      ]
    },
    {
      id: "nutrition",
      name: "Nutrition & Diet",
      items: [
        {
          id: "diet-consultation",
          name: "Diet Consultation",
          description: "Personalized nutrition planning",
          price: 140,
          selected: false,
          quantity: 2
        },
        {
          id: "detox-program",
          name: "Detox Program",
          description: "Specialized detox meal plan",
          price: 190,
          selected: false,
          quantity: 2
        },
        {
          id: "cooking-class",
          name: "Healthy Cooking Class",
          description: "Learn to prepare healthy meals",
          price: 85,
          selected: false,
          quantity: 2
        },
        {
          id: "juice-cleanse",
          name: "Juice Cleanse",
          description: "Fresh, organic juice cleanse program",
          price: 110,
          selected: false,
          quantity: 2
        },
        {
          id: "nutrition-workshop",
          name: "Nutrition Workshop",
          description: "Group workshop on healthy eating",
          price: 70,
          selected: false,
          quantity: 2
        }
      ]
    }
  ],
  selectedRoom: null,
  roomAddOns: [
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
  ],
  totalPrice: 0,
  customerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }
};

const availablePackages: PackageType[] = [
  {
    id: "relaxation-retreat",
    name: "Relaxation Retreat",
    description: "A peaceful wellness package focused on relaxation and stress relief",
    basePrice: 120, // per day
    type: "relaxation",
    image: "/placeholder.svg"
  },
  {
    id: "detox-revitalize",
    name: "Detox & Revitalize",
    description: "Cleanse your body and mind with this comprehensive detox program",
    basePrice: 150, // per day
    type: "wellness",
    image: "/placeholder.svg"
  },
  {
    id: "fitness-reboot",
    name: "Fitness Reboot",
    description: "Energize your body with intensive fitness activities and recovery treatments",
    basePrice: 165, // per day
    type: "fitness",
    image: "/placeholder.svg"
  },
  {
    id: "luxury-escape",
    name: "Luxury Wellness Escape",
    description: "Our premium package with exclusive treatments and personalized service",
    basePrice: 220, // per day
    type: "rejuvenation",
    image: "/placeholder.svg"
  }
];

const availableRooms: RoomType[] = [
  {
    id: "single-standard",
    type: "single",
    name: "Single Room",
    description: "Comfortable single room with all essential amenities",
    price: 80, // per night
    image: "/placeholder.svg"
  },
  {
    id: "deluxe-room",
    type: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and mountain view",
    price: 150, // per night
    image: "/placeholder.svg"
  },
  {
    id: "vip-suite",
    type: "suite",
    name: "VIP Suite",
    description: "Luxurious suite with separate living area and panoramic views",
    price: 280, // per night
    image: "/placeholder.svg"
  }
];

// Create context with default values
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialData);

  // Helper functions
  const selectPackage = (packageId: string) => {
    const selected = availablePackages.find(p => p.id === packageId) || null;
    setBookingData(prev => ({
      ...prev,
      selectedPackage: selected
    }));
  };

  const resetPackage = () => {
    setBookingData(prev => ({
      ...prev,
      selectedPackage: null,
      startDate: null,
      duration: "4"
    }));
  };

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

  const calculateEndDate = (): Date | null => {
    if (!bookingData.startDate) return null;
    return addDays(bookingData.startDate, parseInt(bookingData.duration));
  };

  const getDefaultAddOnQuantity = (): number => {
    return Math.floor(parseInt(bookingData.duration) / 2);
  };

  const toggleAddOn = (categoryId: string, itemId: string) => {
    setBookingData(prev => {
      const updatedCategories = prev.addOnCategories.map(category => {
        if (category.id === categoryId) {
          const updatedItems = category.items.map(item => {
            if (item.id === itemId) {
              const isSelected = !item.selected;
              return { 
                ...item, 
                selected: isSelected,
                quantity: isSelected ? getDefaultAddOnQuantity() : item.quantity 
              };
            }
            return item;
          });
          return { ...category, items: updatedItems };
        }
        return category;
      });
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const removeAddOn = (categoryId: string, itemId: string) => {
    setBookingData(prev => {
      const updatedCategories = prev.addOnCategories.map(category => {
        if (category.id === categoryId) {
          const updatedItems = category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, selected: false };
            }
            return item;
          });
          return { ...category, items: updatedItems };
        }
        return category;
      });
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const updateAddOnQuantity = (categoryId: string, itemId: string, quantity: number) => {
    setBookingData(prev => {
      const updatedCategories = prev.addOnCategories.map(category => {
        if (category.id === categoryId) {
          const updatedItems = category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, quantity: Math.max(1, quantity) };
            }
            return item;
          });
          return { ...category, items: updatedItems };
        }
        return category;
      });
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const selectRoom = (roomId: string) => {
    const selected = availableRooms.find(r => r.id === roomId) || null;
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
  };

  const toggleRoomAddOn = (addOnId: string) => {
    setBookingData(prev => {
      const updatedAddOns = prev.roomAddOns.map(addon => {
        if (addon.id === addOnId) {
          return { ...addon, selected: !addon.selected };
        }
        return addon;
      });
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  const removeRoomAddOn = (addOnId: string) => {
    setBookingData(prev => {
      const updatedAddOns = prev.roomAddOns.map(addon => {
        if (addon.id === addOnId) {
          return { ...addon, selected: false };
        }
        return addon;
      });
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  const setCustomerInfo = (info: Partial<BookingData['customerInfo']>) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info }
    }));
  };

  const calculateTotalPrice = (): number => {
    let total = 0;

    // Package price
    if (bookingData.selectedPackage) {
      total += bookingData.selectedPackage.basePrice * parseInt(bookingData.duration);
    }

    // Add-ons price
    bookingData.addOnCategories.forEach(category => {
      category.items.forEach(item => {
        if (item.selected) {
          total += item.price * item.quantity;
        }
      });
    });

    // Room price
    if (bookingData.selectedRoom) {
      total += bookingData.selectedRoom.price * parseInt(bookingData.duration);
    }

    // Room add-ons
    bookingData.roomAddOns.forEach(addon => {
      if (addon.selected) {
        total += addon.price;
      }
    });

    return total;
  };

  return (
    <BookingContext.Provider value={{
      currentStep,
      bookingData,
      availablePackages,
      availableRooms,
      setCurrentStep,
      selectPackage,
      resetPackage,
      setDuration,
      setStartDate,
      toggleAddOn,
      removeAddOn,
      updateAddOnQuantity,
      selectRoom,
      resetRoom,
      toggleRoomAddOn,
      removeRoomAddOn,
      setCustomerInfo,
      calculateEndDate,
      calculateTotalPrice,
      getDefaultAddOnQuantity
    }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook to use the booking context
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
