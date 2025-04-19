
import { useCallback } from "react";
import { BookingData } from "../types/bookingTypes";
import { availableRooms } from "../data/roomsData";

type PricingProps = {
  getStandardRoom: () => any;
  getRoomUpgradePrice: (roomId: string) => number;
  eventSpace: string | null;
  eventType: string | null;
  attendees: number | null;
  eventDuration: number | null;
  eventAddons: string[];
}

export function usePricing({
  getStandardRoom,
  getRoomUpgradePrice,
  eventSpace, 
  eventType, 
  attendees, 
  eventDuration, 
  eventAddons
}: PricingProps) {
  
  const getDefaultAddOnQuantity = useCallback((duration: string): number => {
    return Math.floor(parseInt(duration) / 2);
  }, []);

  const calculateTotalPrice = useCallback((bookingData: BookingData): number => {
    let total = 0;
    
    // Package price calculation
    if (bookingData.selectedPackage) {
      total += bookingData.selectedPackage.basePrice * parseInt(bookingData.duration);
    }

    // Add-ons price calculation
    bookingData.addOnCategories.forEach(category => {
      category.items.forEach(item => {
        if (item.selected) {
          total += item.price * item.quantity;
        }
      });
    });

    // Room price calculation
    if (bookingData.selectedRoom && !bookingData.selectedRoom.isStandard && bookingData.selectedPackage?.includesStandardRoom) {
      const standardRoom = getStandardRoom();
      if (standardRoom) {
        const upgradePrice = bookingData.selectedRoom.price - standardRoom.price;
        total += upgradePrice * parseInt(bookingData.duration);
      }
    } else if (bookingData.selectedRoom && !bookingData.selectedPackage?.includesStandardRoom) {
      total += bookingData.selectedRoom.price * parseInt(bookingData.duration);
    }

    // Room add-ons price calculation
    bookingData.roomAddOns.forEach(addon => {
      if (addon.selected) {
        total += addon.price;
      }
    });

    // Event space price calculation
    if (eventSpace && eventType && attendees) {
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
      
      const basePrice = venuePrices[eventSpace] || 0;
      total += basePrice;
      
      const multiplier = eventMultipliers[eventType] || 1;
      total = total * multiplier;
      
      if (eventDuration && eventDuration > 4) {
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
      
      if (eventAddons.includes('extendedHours') && eventDuration) {
        total += eventDuration * 300;
      }

      // Add room booking costs
      if (eventAddons.includes('room-booking')) {
        const roomType = bookingData.selectedRoom?.id || '';
        if (roomType) {
          const room = availableRooms.find(r => r.id === roomType);
          if (room) {
            const roomCount = Math.round(attendees * 0.1);
            const nights = parseInt(bookingData.duration) || 1;
            total += room.price * roomCount * nights;
          }
        }
      }
    }

    return total;
  }, [eventSpace, eventType, eventDuration, attendees, eventAddons, getStandardRoom]);
  
  return {
    getDefaultAddOnQuantity,
    calculateTotalPrice
  };
}
