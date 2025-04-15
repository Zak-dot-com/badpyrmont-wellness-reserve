
import { useCallback } from 'react';
import { EventSpace, EventType, EventDate, EventAttendees, EventDuration, EventAddons } from '../types/bookingTypes';

export function useEventBooking(
  eventSpace: EventSpace,
  eventDate: EventDate,
  eventType: EventType,
  attendees: EventAttendees,
  eventDuration: EventDuration,
  eventAddons: EventAddons,
  setEventSpace: (space: string) => void,
  setEventDate: (date: Date) => void,
  setEventType: (type: string) => void,
  setAttendees: (count: number) => void,
  setEventDuration: (hours: number) => void,
  setEventAddons: (addons: string[]) => void
) {
  
  const getEventSpaceDetail = useCallback((id: string | null) => {
    if (!id) return null;
    
    const eventSpaces = {
      'garden-pavilion': 'Garden Pavilion',
      'grand-ballroom': 'Grand Ballroom',
      'executive-hall': 'Executive Hall',
      'rooftop-terrace': 'Rooftop Terrace',
    };
    
    return eventSpaces[id as keyof typeof eventSpaces] || id;
  }, []);

  const getEventTypeDetail = useCallback((id: string | null) => {
    if (!id) return null;
    
    const eventTypes = {
      'wedding': 'Wedding',
      'corporate': 'Corporate Event',
      'birthday': 'Birthday Party',
      'conference': 'Conference',
      'social': 'Social Gathering',
    };
    
    return eventTypes[id as keyof typeof eventTypes] || id;
  }, []);

  const getEventAddonDetail = useCallback((id: string) => {
    const addons = {
      'catering': 'Premium Catering',
      'liveMusic': 'Live Music',
      'decoration': 'Deluxe Decoration',
      'extendedHours': 'Extended Hours',
    };
    
    return addons[id as keyof typeof addons] || id;
  }, []);

  return {
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
    setEventAddons,
    getEventSpaceDetail,
    getEventTypeDetail,
    getEventAddonDetail
  };
}
