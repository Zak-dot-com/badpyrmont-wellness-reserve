import { useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CalendarClock, Users, Music, Utensils, Clock, Calendar } from 'lucide-react';
import RoomBookingSection from './event-space/RoomBookingSection';
import { availableRooms } from '@/data/roomsData';
import { useNavigate } from 'react-router-dom';

const EventSpaceSelection = () => {
  const navigate = useNavigate();
  const { eventSpace, setEventSpace, eventDate, setEventDate, attendees, setAttendees, 
          eventType, setEventType, eventDuration, setEventDuration, 
          eventAddons, setEventAddons, calculateTotalPrice, goToNextStep, setBookingType, bookingData } = useBooking();
  
  const [selectedVenue, setSelectedVenue] = useState(eventSpace || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(eventDate || null);
  const [guestCount, setGuestCount] = useState<number>(attendees || 50);
  const [selectedEventType, setSelectedEventType] = useState(eventType || '');
  const [selectedDuration, setSelectedDuration] = useState<number>(eventDuration || 4);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(eventAddons || []);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [gatheringMode, setGatheringMode] = useState<string>('parliamentary');
  const [startTime, setStartTime] = useState<string>('10:00');

  const [roomBooking, setRoomBooking] = useState<{
    enabled: boolean;
    numberOfRooms: number;
    roomType: string;
    nights: number;
  }>({
    enabled: false,
    numberOfRooms: 0,
    roomType: "",
    nights: 1
  });
  
  const venues = [
    { 
      id: 'garden-pavilion', 
      name: 'Garden Pavilion', 
      basePrice: 1200, 
      isOutdoor: true, 
      capacity: 150, 
      description: 'An elegant outdoor venue surrounded by manicured gardens and water features.',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=400&h=250'
    },
    { 
      id: 'grand-ballroom', 
      name: 'Grand Ballroom', 
      basePrice: 2000, 
      isOutdoor: false, 
      capacity: 300, 
      description: 'A sophisticated indoor venue with crystal chandeliers and premium finishes.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&h=250'
    },
    { 
      id: 'executive-hall', 
      name: 'Executive Hall', 
      basePrice: 1500, 
      isOutdoor: false, 
      capacity: 100, 
      description: 'A modern corporate event space with state-of-the-art technology.',
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=400&h=250'
    },
    { 
      id: 'rooftop-terrace', 
      name: 'Rooftop Terrace', 
      basePrice: 1800, 
      isOutdoor: true, 
      capacity: 120, 
      description: 'A stunning rooftop venue with panoramic views of the cityscape.',
      image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=400&h=250'
    },
  ];
  
  const eventTypes = [
    { id: 'wedding', name: 'Wedding', priceMultiplier: 1.2 },
    { id: 'corporate', name: 'Corporate Event', priceMultiplier: 1.0 },
    { id: 'birthday', name: 'Birthday Party', priceMultiplier: 0.9 },
    { id: 'conference', name: 'Conference', priceMultiplier: 1.1 },
    { id: 'social', name: 'Social Gathering', priceMultiplier: 0.8 }
  ];
  
  const availableAddons = [
    { id: 'catering', name: 'Premium Catering', pricePerPerson: 45, icon: Utensils },
    { id: 'liveMusic', name: 'Live Music', flatPrice: 800, icon: Music },
    { id: 'decoration', name: 'Deluxe Decoration', pricePerPerson: 15, icon: Users },
    { id: 'extendedHours', name: 'Extended Hours', pricePerHour: 300, icon: Clock }
  ];
  
  const toggleAddon = (addonId: string) => {
    let newAddons;
    if (selectedAddons.includes(addonId)) {
      newAddons = selectedAddons.filter(id => id !== addonId);
    } else {
      newAddons = [...selectedAddons, addonId];
    }
    setSelectedAddons(newAddons);
    
    setEventAddons(newAddons);
  };
  
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setEventDate(date);
  };

  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
    setAttendees(count);
  };
  
  const handleDurationChange = (hours: string) => {
    const duration = Number(hours);
    setSelectedDuration(duration);
    setEventDuration(duration);
  };
  
  const handleEventTypeChange = (type: string) => {
    setSelectedEventType(type);
    setEventType(type);
  };
  
  const handleVenueSelect = (venueId: string) => {
    setSelectedVenue(venueId);
    setEventSpace(venueId);
  };

  const handleRoomBookingChange = (booking: {
    enabled: boolean;
    numberOfRooms: number;
    roomType: string;
    nights: number;
  }) => {
    setRoomBooking(booking);
    
    // Add the room cost to the total price by updating addons
    const updatedAddons = [...selectedAddons];
    const roomAddonId = 'room-booking';
    
    if (booking.enabled && booking.roomType) {
      const selectedRoom = availableRooms.find(room => room.id === booking.roomType);
      if (selectedRoom) {
        if (!updatedAddons.includes(roomAddonId)) {
          updatedAddons.push(roomAddonId);
        }
      }
    } else {
      const index = updatedAddons.indexOf(roomAddonId);
      if (index > -1) {
        updatedAddons.splice(index, 1);
      }
    }
    
    setEventAddons(updatedAddons);
  };
  
  // Generate time slots from 06:00 to 22:00 in 30-minute intervals
  const timeSlots = [];
  for (let hour = 6; hour < 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute === 30) continue; // Skip 22:30 as events can't start this late
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      timeSlots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  const calculateEndTime = () => {
    if (!startTime) return '';
    
    // Parse the start time (format: HH:MM)
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Calculate end time
    let endHours = hours + selectedDuration;
    const endMinutes = minutes;
    
    // Handle overflow to next day
    if (endHours >= 24) {
      endHours = endHours - 24;
    }
    
    // Format the result as HH:MM
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };
  
  const handleSubmit = () => {
    if (!selectedVenue || !selectedEventType || !selectedDate || !startTime) {
      toast.error("Please select venue, event type, date, and time to continue.");
      return;
    }
    
    // Save all the selected data into the booking context
    setEventSpace(selectedVenue);
    setEventDate(selectedDate);
    setAttendees(guestCount);
    setEventType(selectedEventType);
    setEventDuration(selectedDuration);
    setEventAddons(selectedAddons);
    setBookingType('event');
    
    // Store time information in session storage since our context doesn't have a field for it
    const eventDetails = {
      startTime: startTime,
      endTime: calculateEndTime(),
      date: selectedDate
    };
    sessionStorage.setItem('eventTimeDetails', JSON.stringify(eventDetails));
    
    // Store room booking data if enabled
    if (roomBooking.enabled && roomBooking.roomType && roomBooking.numberOfRooms > 0) {
      // We're already handling this in the roomBooking change handler
      console.log("Room booking enabled:", roomBooking);
    }
    
    // Clear any existing event booking data from sessionStorage
    // to prevent conflicts with our current booking flow
    sessionStorage.removeItem('eventBooking');
    
    // Navigate directly to checkout instead of using goToNextStep
    // This ensures we're triggering the right step in the booking flow
    navigate('/booking?bookingType=event&step=checkout');
  };
  
  const selectedVenueData = venues.find(venue => venue.id === selectedVenue);
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Select Your Event Space</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {venues.map(venue => (
          <Card 
            key={venue.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${selectedVenue === venue.id ? 'ring-2 ring-amber-500' : ''}`}
            onClick={() => handleVenueSelect(venue.id)}
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {venue.isOutdoor && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Outdoor
                </span>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{venue.name}</CardTitle>
              <CardDescription>{venue.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2"><span className="font-medium">Type:</span> {venue.isOutdoor ? 'Outdoor' : 'Indoor'}</div>
              <div className="mb-2"><span className="font-medium">Capacity:</span> Up to {venue.capacity} guests</div>
              <div className="font-medium text-lg text-amber-700">€{venue.basePrice} base price</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedVenue && (
        <>
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-xl font-bold">Event Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select value={selectedEventType} onValueChange={handleEventTypeChange}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <SelectValue placeholder="Select event type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <div className="relative">
                  <Input
                    id="eventDate"
                    type="date"
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startTime">Event Time</Label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger className="w-full pl-10">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative flex-1">
                    <Input 
                      value={calculateEndTime()} 
                      disabled 
                      className="pl-10 bg-gray-50"
                    />
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guestCount">Number of Attendees</Label>
                <div className="relative">
                  <Input
                    id="guestCount"
                    type="number"
                    min="10"
                    max={selectedVenueData?.capacity || 300}
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                    className="pl-10"
                  />
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {selectedVenueData && (
                  <p className="text-xs text-gray-500">Maximum capacity: {selectedVenueData.capacity}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <div className="relative">
                  <Select 
                    value={selectedDuration.toString()} 
                    onValueChange={handleDurationChange}
                  >
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[4, 5, 6, 7, 8, 9, 10].map(hours => (
                        <SelectItem key={hours} value={hours.toString()}>{hours} hours</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CalendarClock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gatheringMode">Gathering Mode</Label>
                <Select value={gatheringMode} onValueChange={setGatheringMode}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gathering mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parliamentary">Parliamentary</SelectItem>
                    <SelectItem value="banquet">Banquet</SelectItem>
                    <SelectItem value="standing">Standing</SelectItem>
                    <SelectItem value="lounge">Lounge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Add-ons & Services</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableAddons.map(addon => {
                  const isSelected = selectedAddons.includes(addon.id);
                  const AddonIcon = addon.icon;
                  
                  return (
                    <div 
                      key={addon.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        isSelected ? 'bg-amber-50 border-amber-500' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-amber-100' : 'bg-gray-100'}`}>
                          <AddonIcon className={`h-5 w-5 ${isSelected ? 'text-amber-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-gray-500">
                            Add this option and the Event Manager will contact you for details
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Room Booking Required</h4>
                <p className="text-sm text-amber-700 mb-4">
                  For events, we require booking rooms to ensure the best experience for your guests
                </p>
                <RoomBookingSection 
                  attendees={guestCount} 
                  onRoomBookingChange={handleRoomBookingChange}
                  required={true}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any special requirements or requests for your event..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8"
            >
              Continue to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventSpaceSelection;
