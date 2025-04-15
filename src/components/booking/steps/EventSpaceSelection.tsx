
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

const EventSpaceSelection = () => {
  const { eventSpace, setEventSpace, eventDate, setEventDate, attendees, setAttendees, 
          eventType, setEventType, eventDuration, setEventDuration, 
          eventAddons, setEventAddons, calculateTotalPrice, goToNextStep, setBookingType } = useBooking();
  
  const [selectedVenue, setSelectedVenue] = useState(eventSpace || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(eventDate || null);
  const [guestCount, setGuestCount] = useState<number>(attendees || 50);
  const [selectedEventType, setSelectedEventType] = useState(eventType || '');
  const [selectedDuration, setSelectedDuration] = useState<number>(eventDuration || 4);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(eventAddons || []);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
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
    
    // Update context immediately to reflect price changes
    setEventAddons(newAddons);
  };
  
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setEventDate(date); // Update context immediately
  };

  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
    setAttendees(count); // Update context immediately
  };
  
  const handleDurationChange = (hours: string) => {
    const duration = Number(hours);
    setSelectedDuration(duration);
    setEventDuration(duration); // Update context immediately
  };
  
  const handleEventTypeChange = (type: string) => {
    setSelectedEventType(type);
    setEventType(type); // Update context immediately
  };
  
  const handleVenueSelect = (venueId: string) => {
    setSelectedVenue(venueId);
    setEventSpace(venueId); // Update context immediately
  };
  
  const handleSubmit = () => {
    if (!selectedVenue || !selectedEventType || !selectedDate) {
      toast.error("Please select venue, event type, and date to continue.");
      return;
    }
    
    // Save all selections to context
    setEventSpace(selectedVenue);
    setEventDate(selectedDate);
    setAttendees(guestCount);
    setEventType(selectedEventType);
    setEventDuration(selectedDuration);
    setEventAddons(selectedAddons);
    setBookingType('event'); // Set booking type to 'event'
    
    // Move to checkout step (step 4)
    goToNextStep();
  };
  
  const selectedVenueData = venues.find(venue => venue.id === selectedVenue);
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Select Your Event Space</h2>
      
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
                            {addon.pricePerPerson && `€${addon.pricePerPerson} per person`}
                            {addon.flatPrice && `€${addon.flatPrice} flat fee`}
                            {addon.pricePerHour && `€${addon.pricePerHour} per hour`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
