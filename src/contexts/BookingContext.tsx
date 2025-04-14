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
  includesStandardRoom: boolean;
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

export type BookingContextType = {
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
};

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
    basePrice: 200,
    type: "relaxation",
    image: "/placeholder.svg",
    includesStandardRoom: true
  },
  {
    id: "detox-revitalize",
    name: "Detox & Revitalize",
    description: "Cleanse your body and mind with this comprehensive detox program",
    basePrice: 230,
    type: "wellness",
    image: "/placeholder.svg",
    includesStandardRoom: true
  },
  {
    id: "fitness-reboot",
    name: "Fitness Reboot",
    description: "Energize your body with intensive fitness activities and recovery treatments",
    basePrice: 245,
    type: "fitness",
    image: "/placeholder.svg",
    includesStandardRoom: true
  },
  {
    id: "luxury-escape",
    name: "Luxury Wellness Escape",
    description: "Our premium package with exclusive treatments and personalized service",
    basePrice: 300,
    type: "rejuvenation",
    image: "/placeholder.svg",
    includesStandardRoom: true
  }
];

const availableRooms: RoomType[] = [
  {
    id: "single-standard",
    type: "single",
    name: "Single Room",
    description: "Comfortable single room with all essential amenities",
    price: 80,
    image: "/placeholder.svg",
    isStandard: true
  },
  {
    id: "deluxe-room",
    type: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and mountain view",
    price: 150,
    image: "/placeholder.svg",
    isStandard: false
  },
  {
    id: "vip-suite",
    type: "suite",
    name: "VIP Suite",
    description: "Luxurious suite with separate living area and panoramic views",
    price: 280,
    image: "/placeholder.svg",
    isStandard: false
  }
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialData);
  const [eventSpace, setEventSpace] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [attendees, setAttendees] = useState<number | null>(50);
  const [eventType, setEventType] = useState<string | null>(null);
  const [eventDuration, setEventDuration] = useState<number | null>(4);
  const [eventAddons, setEventAddons] = useState<string[]>([]);

  const getStandardRoom = (): RoomType | null => {
    return availableRooms.find(room => room.isStandard) || null;
  };

  const getRoomUpgradePrice = (roomId: string): number => {
    const standardRoom = getStandardRoom();
    const selectedRoom = availableRooms.find(r => r.id === roomId);
    
    if (!standardRoom || !selectedRoom || selectedRoom.isStandard) {
      return 0;
    }
    
    return selectedRoom.price - standardRoom.price;
  };

  const selectPackage = (packageId: string) => {
    const selected = availablePackages.find(p => p.id === packageId) || null;
    
    if (selected && selected.includesStandardRoom) {
      const standardRoom = getStandardRoom();
      
      setBookingData(prev => ({
        ...prev,
        selectedPackage: selected,
        selectedRoom: prev.selectedRoom?.isStandard ? standardRoom : prev.selectedRoom
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        selectedPackage: selected
      }));
    }
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

  const calculateTotalPrice = () => {
    let total = 0;
    
    if (bookingData.selectedPackage) {
      total += bookingData.selectedPackage.basePrice * parseInt(bookingData.duration);
    }

    bookingData.addOnCategories.forEach(category => {
      category.items.forEach(item => {
        if (item.selected) {
          total += item.price * item.quantity;
        }
      });
    });

    if (bookingData.selectedRoom && !bookingData.selectedRoom.isStandard && bookingData.selectedPackage?.includesStandardRoom) {
      const standardRoom = getStandardRoom();
      if (standardRoom) {
        const upgradePrice = bookingData.selectedRoom.price - standardRoom.price;
        total += upgradePrice * parseInt(bookingData.duration);
      }
    } else if (bookingData.selectedRoom && !bookingData.selectedPackage?.includesStandardRoom) {
      total += bookingData.selectedRoom.price * parseInt(bookingData.duration);
    }

    bookingData.roomAddOns.forEach(addon => {
      if (addon.selected) {
        total += addon.price;
      }
    });

    if (eventSpace && eventType && attendees && eventDuration) {
      const venuePrices: Record<string, number> = {
        'garden-pavilion': 1200,
        'grand-ballroom': 2000,
        'executive-hall': 1500,
        'rooftop-terrace': 1800,
      };
      
      const eventMultipliers: Record<string, number> = {
        'wedding': 1.2,
        'corporate': 1.0,
        'birthday': 0.9,
        'conference': 1.1,
        'social': 0.8,
      };
      
      total += venuePrices[eventSpace] || 0;
      
      total *= eventMultipliers[eventType] || 1;
      
      if (eventDuration > 4) {
        total += (eventDuration - 4) * 300;
      }
      
      if (attendees > 0) {
        total += attendees * 25;
        
        if (eventAddons.includes('catering')) {
          total += attendees * 45;
        }
        
        if (eventAddons.includes('decoration')) {
          total += attendees * 15;
        }
      }
      
      if (eventAddons.includes('liveMusic')) {
        total += 800;
      }
    }

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
      getDefaultAddOnQuantity,
      getStandardRoom,
      getRoomUpgradePrice,
      eventSpace,
      eventDate,
      attendees,
      eventType,
      eventDuration,
      eventAddons,
      setEventSpace,
      setEventDate,
      setAttendees,
      setEventType,
      setEventDuration,
      setEventAddons
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
