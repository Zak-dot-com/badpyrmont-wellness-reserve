
import React from 'react';
import { Check } from 'lucide-react';
import { SummaryItemDetail, SummaryAddOnList } from './SummaryItemDetail';

type EventBookingData = {
  eventSpace: string | null;
  eventDate: Date | null;
  attendees: number | null;
  eventType: string | null;
  eventDuration: number | null;
  eventAddons: string[];
  formatDate: (date: Date | null) => string;
};

type EventSpaceMap = {
  [key: string]: string;
};

type EventTypeMap = {
  [key: string]: string;
};

type EventAddonMap = {
  [key: string]: string;
};

const eventSpaces: EventSpaceMap = {
  'garden-pavilion': 'Garden Pavilion',
  'grand-ballroom': 'Grand Ballroom',
  'executive-hall': 'Executive Hall',
  'rooftop-terrace': 'Rooftop Terrace',
};

const eventTypes: EventTypeMap = {
  'wedding': 'Wedding',
  'corporate': 'Corporate Event',
  'birthday': 'Birthday Party',
  'conference': 'Conference',
  'social': 'Social Gathering',
};

const eventAddons: EventAddonMap = {
  'catering': 'Premium Catering',
  'liveMusic': 'Live Music',
  'decoration': 'Deluxe Decoration',
  'extendedHours': 'Extended Hours',
  'room-booking': 'Room Booking',
};

const getEventSpaceDetail = (id: string | null): string | null => {
  if (!id) return null;
  return eventSpaces[id] || id;
};

const getEventTypeDetail = (id: string | null): string | null => {
  if (!id) return null;
  return eventTypes[id] || id;
};

const getEventAddonDetail = (id: string): string => {
  return eventAddons[id] || id;
};

export const EventSessionSummary = ({ 
  event, 
  registration 
}: { 
  event: any; 
  registration: any;
}) => {
  const totalTicketPrice = event.earlyBirdPrice * registration.attendees;

  return (
    <div className="space-y-4">
      <SummaryItemDetail label="Event" value={<p className="font-semibold text-lg">{event.title}</p>} />
      <SummaryItemDetail label="Date" value={new Date(event.date).toLocaleDateString()} />
      <SummaryItemDetail label="Location" value={event.location} />
      <SummaryItemDetail label="Attendees" value={registration.attendees} />

      <div>
        <h4 className="text-sm font-medium text-gray-700">Contact Information</h4>
        <p>{registration.name}</p>
        <p>{registration.email}</p>
        <p>{registration.countryCode} {registration.phone}</p>
      </div>

      <div className="pt-2">
        <div className="flex justify-between text-sm">
          <span>Ticket Price (per person):</span>
          <span>€{event.earlyBirdPrice}</span>
        </div>
        <div className="flex justify-between font-semibold mt-1">
          <span>Number of Attendees:</span>
          <span>{registration.attendees}</span>
        </div>
        <div className="flex justify-between font-semibold mt-2 text-amber-600">
          <span>Total Ticket Price:</span>
          <span>€{totalTicketPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export const EventBookingSummary = ({ 
  eventSpace, 
  eventDate, 
  attendees, 
  eventType, 
  eventDuration, 
  eventAddons,
  formatDate 
}: EventBookingData) => {
  if (!eventSpace) return null;

  return (
    <div className="space-y-4">
      <SummaryItemDetail 
        label="Event Space" 
        value={<p className="font-semibold text-lg">{getEventSpaceDetail(eventSpace)}</p>} 
      />

      {eventDate && (
        <SummaryItemDetail label="Event Date" value={formatDate(eventDate)} />
      )}

      {eventType && (
        <SummaryItemDetail label="Event Type" value={getEventTypeDetail(eventType)} />
      )}

      {attendees && (
        <SummaryItemDetail label="Attendees" value={attendees} />
      )}

      {eventDuration && (
        <SummaryItemDetail label="Duration" value={`${eventDuration} hours`} />
      )}

      {eventAddons && eventAddons.length > 0 && (
        <SummaryAddOnList 
          addons={eventAddons} 
          getAddonName={getEventAddonDetail}
        />
      )}
    </div>
  );
};
