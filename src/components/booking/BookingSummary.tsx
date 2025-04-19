
import React, { useEffect } from 'react';
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

  // Force re-render when any of these values change
  useEffect(() => {
    // This empty effect will trigger a re-render when dependencies change
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

  // Make sure we call calculateTotalPrice to get the latest value
  const totalPrice = calculateTotalPrice();

  const handleReset = () => {
    if (selectedPackage) {
      resetPackage();
    }
    
    if (selectedRoom) {
      resetRoom();
    }
    
    if (eventSpace) {
      setEventSpace('');
      setEventDate(null);
      setEventType(null);
      setAttendees(null);
      setEventDuration(null);
      setEventAddons([]);
    }
    
    setBookingType(null);
    
    setCurrentStep(1);
    
    toast.success("Booking reset successfully. You can start a new selection.");
  };

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
      'room-booking': 'Room Booking',
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
              {eventAddons.map(addon => {
                if (addon === 'room-booking' && selectedRoom && attendees) {
                  const roomCount = Math.round(attendees * 0.1);
                  const nights = selectedDuration ? parseInt(selectedDuration) : 1;
                  return (
                    <li key={addon} className="flex items-start gap-1.5 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <span>{getEventAddonDetail(addon)}</span>
                        <div className="text-xs text-gray-600">
                          {roomCount} x {selectedRoom.name} for {nights} night{nights > 1 ? 's' : ''} 
                          <span className="text-amber-600"> (€{selectedRoom.price} per room/night)</span>
                        </div>
                      </div>
                    </li>
                  );
                }
                
                return (
                  <li key={addon} className="flex items-center gap-1.5 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {getEventAddonDetail(addon)}
                  </li>
                );
              })}
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

  const renderBookingDetails = () => {
    if (eventSpace || bookingType === 'event') {
      return renderEventBookingSummary();
    } else {
      return renderWellnessPackageSummary();
    }
  };

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
