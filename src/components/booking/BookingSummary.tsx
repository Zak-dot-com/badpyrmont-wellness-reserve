
import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { Check, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    setBookingType,
    resetPackage,
    resetRoom,
    setCurrentStep,
    // Event space properties
    eventSpace,
    eventDate,
    attendees,
    eventType,
    eventDuration,
    eventAddons,
    setEventSpace,
    setEventDate,
    setEventType,
    setAttendees,
    setEventDuration,
    setEventAddons
  } = useBooking();

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const totalPrice = calculateTotalPrice();

  // Complete reset function to clear all selections
  const handleReset = () => {
    // Reset package selection if applicable
    if (selectedPackage) {
      resetPackage();
    }
    
    // Reset room selection if applicable
    if (selectedRoom) {
      resetRoom();
    }
    
    // Reset event selection if applicable
    if (eventSpace) {
      setEventSpace('');
      setEventDate(null);
      setEventType(null);
      setAttendees(null);
      setEventDuration(null);
      setEventAddons([]);
    }
    
    // Reset booking type to null
    setBookingType(null);
    
    // Go back to first step
    setCurrentStep(1);
    
    toast.success("Booking reset successfully. You can start a new selection.");
  };

  // Helper to get event specific details
  const getEventSpaceDetail = (id: string | null) => {
    if (!id) return null;
    
    const eventSpaces = {
      'garden-pavilion': 'Garden Pavilion',
      'grand-ballroom': 'Grand Ballroom',
      'executive-hall': 'Executive Hall',
      'rooftop-terrace': 'Rooftop Terrace',
    };
    
    return eventSpaces[id as keyof typeof eventSpaces] || id;
  };

  const getEventTypeDetail = (id: string | null) => {
    if (!id) return null;
    
    const eventTypes = {
      'wedding': 'Wedding',
      'corporate': 'Corporate Event',
      'birthday': 'Birthday Party',
      'conference': 'Conference',
      'social': 'Social Gathering',
    };
    
    return eventTypes[id as keyof typeof eventTypes] || id;
  };

  const getEventAddonDetail = (id: string) => {
    const addons = {
      'catering': 'Premium Catering',
      'liveMusic': 'Live Music',
      'decoration': 'Deluxe Decoration',
      'extendedHours': 'Extended Hours',
    };
    
    return addons[id as keyof typeof addons] || id;
  };

  const renderEventBookingSummary = () => {
    if (!eventSpace) {
      return <p className="text-gray-500 italic text-sm">Select an event space to see booking details</p>;
    }

    return (
      <div>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700">Venue</h4>
          <p className="font-semibold text-lg">{getEventSpaceDetail(eventSpace)}</p>
        </div>
        
        {eventType && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Event Type</h4>
            <p>{getEventTypeDetail(eventType)}</p>
          </div>
        )}
        
        {eventDate && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Date</h4>
            <p>{formatDate(eventDate)}</p>
          </div>
        )}
        
        {attendees && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
            <p>{attendees} people</p>
          </div>
        )}
        
        {eventDuration && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Duration</h4>
            <p>{eventDuration} hours</p>
          </div>
        )}
        
        {eventAddons && eventAddons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Selected Add-ons</h4>
            <ul className="mt-1">
              {eventAddons.map(addon => (
                <li key={addon} className="flex items-center gap-1.5 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  {getEventAddonDetail(addon)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderWellnessPackageSummary = () => {
    if (!selectedPackage && !selectedRoom) {
      return <p className="text-gray-500 italic text-sm">Select a package or room to see booking details</p>;
    }

    return (
      <>
        {selectedPackage && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Package</h4>
            <p className="font-semibold text-lg">
              {selectedPackage.id === 'relaxation-retreat'
                ? 'Relaxation Retreat'
                : selectedPackage.id === 'detox-revitalize'
                ? 'Detox & Revitalize'
                : 'Luxury Wellness Escape'}
            </p>
          </div>
        )}

        {selectedDuration && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Duration</h4>
            <p>{selectedDuration} days</p>
          </div>
        )}

        {startDate && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Start Date</h4>
            <p>{formatDate(startDate)}</p>
          </div>
        )}

        {selectedRoom && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Room</h4>
            <p>
              {selectedRoom.id === 'single-standard'
                ? 'Standard Room'
                : selectedRoom.id === 'deluxe-room'
                ? 'Deluxe Room'
                : 'VIP Suite'}
            </p>
          </div>
        )}

        {bookedDays > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Stay Length</h4>
            <p>{bookedDays} nights</p>
          </div>
        )}

        {selectedAddOns && selectedAddOns.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700">Selected Add-ons</h4>
            <ul className="mt-1">
              {selectedAddOns.map(addon => (
                <li key={addon} className="flex items-center gap-1.5 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  {addon === 'spa-credit'
                    ? 'Spa Treatment Credit'
                    : addon === 'private-training'
                    ? 'Private Fitness Training'
                    : addon === 'nutrition'
                    ? 'Nutrition Consultation'
                    : addon === 'airport-transfer'
                    ? 'Airport Transfer'
                    : 'Excursion Package'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  // Get booking details based on booking type
  const renderBookingDetails = () => {
    if (eventSpace || bookingType === 'event') {
      return renderEventBookingSummary();
    } else {
      return renderWellnessPackageSummary();
    }
  };

  // Show reset button only if there's something to reset
  const hasSelections = bookingType || selectedPackage || selectedRoom || eventSpace;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Booking Summary</h3>
        
        {hasSelections && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleReset}
            className="flex items-center text-amber-500 hover:text-amber-600 hover:bg-amber-50"
          >
            <RefreshCcw className="h-4 w-4 mr-1.5" />
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
