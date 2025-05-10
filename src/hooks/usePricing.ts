
import { useCallback } from "react";
import { BookingData } from "../types/bookingTypes";
import { availableRooms } from "../data/roomsData";
import { differenceInDays } from "date-fns";

type PricingProps = {
  getStandardRoom: () => any;
  getRoomUpgradePrice: (roomId: string) => number;
  eventSpace: string | null;
  eventType: string | null;
  attendees: number | null;
  eventDuration: number | null;
  eventAddons: string[];
  eventDate?: Date | null; // Added eventDate prop
}

export function usePricing({
  getStandardRoom,
  getRoomUpgradePrice,
  eventSpace, 
  eventType, 
  attendees, 
  eventDuration, 
  eventAddons,
  eventDate // Add eventDate parameter
}: PricingProps) {
  
  const getDefaultAddOnQuantity = useCallback((duration: string): number => {
    return Math.floor(parseInt(duration) / 2);
  }, []);

  const calculateTotalPrice = useCallback((bookingData: BookingData): number => {
    let total = 0;
    
    // Check for event booking from session storage first
    const sessionEventBooking = sessionStorage.getItem('eventBooking');
    if (sessionEventBooking) {
      const eventBooking = JSON.parse(sessionEventBooking);
      if (eventBooking?.event?.earlyBirdPrice && eventBooking?.registration?.attendees) {
        return eventBooking.event.earlyBirdPrice * eventBooking.registration.attendees;
      }
    }
    
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
      
      // Update per attendee cost calculation
      if (attendees > 0) {
        // Base ticket price per attendee
        total += attendees * 75; // Base ticket price
        
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
