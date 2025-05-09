import React, { useEffect } from 'react';
import { useBooking } from '@/contexts/booking';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { EventSessionSummary, EventBookingSummary } from './EventBookingSummary';
import { PackageBookingSummary } from './PackageBookingSummary';

const BookingSummary = () => {
  const {
    selectedPackage,
    selectedDuration,
    selectedAddOns,
    selectedRoom,
    bookedDays,
    startDate,
    calculateTotalPrice,
    bookingType,
    resetAllSelections, // Use the comprehensive reset function
    // Event space properties
    eventSpace,
    eventDate,
    attendees,
    eventType,
    eventDuration,
    eventAddons
  } = useBooking();

  const sessionEventBooking = sessionStorage.getItem('eventBooking');
  const eventBooking = sessionEventBooking ? JSON.parse(sessionEventBooking) : null;

  useEffect(() => {
    console.log("BookingSummary re-rendering with:", {
      eventSpace,
      eventType,
      attendees,
      eventDuration,
      eventAddons,
      selectedRoom,
      selectedPackage,
      selectedDuration,
      startDate
    });
  }, [
    eventSpace,
    eventType,
    attendees,
    eventDuration,
    eventAddons,
    selectedRoom,
    selectedPackage,
    selectedDuration,
    startDate
  ]);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const totalPrice = calculateTotalPrice();

  const handleReset = () => {
    // Use the consolidated reset function to clear everything
    resetAllSelections();
    
    // Display success message
    toast.success("All selections have been cleared. You can start a new booking.");
  };

  const renderBookingDetails = () => {
    if (eventBooking) {
      return <EventSessionSummary event={eventBooking.event} registration={eventBooking.registration} />;
    } 
    
    if (bookingType === 'event') {
      return (
        <EventBookingSummary
          eventSpace={eventSpace}
          eventDate={eventDate}
          attendees={attendees}
          eventType={eventType}
          eventDuration={eventDuration}
          eventAddons={eventAddons}
          formatDate={formatDate}
        />
      );
    } 
    
    return (
      <PackageBookingSummary
        selectedPackage={selectedPackage}
        selectedRoom={selectedRoom}
        selectedDuration={selectedDuration}
        bookedDays={bookedDays}
        startDate={startDate}
        selectedAddOns={selectedAddOns}
        formatDate={formatDate}
      />
    );
  };

  const hasSelections = bookingType || selectedPackage || selectedRoom || eventSpace;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Booking Summary</h3>
        
        {hasSelections && (
          <Button 
            variant="accent" 
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1.5"
          >
            <RefreshCcw className="h-4 w-4" />
            Start over
          </Button>
        )}
      </div>
      
      {renderBookingDetails()}

      <hr className="my-4 border-gray-200" />

      <div className="mb-4 flex justify-between items-center font-bold">
        <span className="text-lg">Total Price:</span>
        <span className="text-xl text-amber-600">€{totalPrice.toFixed(2)}</span>
      </div>

      <p className="text-gray-500 text-xs mt-4">
        * Prices include all taxes and service fees
      </p>
    </div>
  );
};

export default BookingSummary;
