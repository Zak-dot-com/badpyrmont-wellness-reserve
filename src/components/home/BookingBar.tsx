import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Package, Bed, CalendarCheck, RefreshCcw, Calendar } from 'lucide-react';
import DateSelector from './DateSelector';
type BookingBarProps = {
  className?: string;
};
const BookingBar = ({
  className = ""
}: BookingBarProps) => {
  const navigate = useNavigate();

  // Booking type state to track which flow is active
  const [bookingType, setBookingType] = useState<'package' | 'room' | 'event' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedEventSpace, setSelectedEventSpace] = useState("");
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // When booking type changes, reset all other selections
  useEffect(() => {
    if (bookingType === 'package') {
      setSelectedRoom("");
      setSelectedEventSpace("");
    } else if (bookingType === 'room') {
      setSelectedPackage("");
      setSelectedEventSpace("");
    } else if (bookingType === 'event') {
      setSelectedPackage("");
      setSelectedRoom("");
    }
    // Reset dates when changing booking type
    setStartDate(null);
    setEndDate(null);
    setShowDateSelector(false);
  }, [bookingType]);
  const handleProceedToBooking = () => {
    const queryParams = new URLSearchParams();
    if (bookingType === 'package' && selectedPackage) {
      queryParams.append('package', selectedPackage);
      queryParams.append('bookingType', 'package');
    } else if (bookingType === 'room' && selectedRoom) {
      queryParams.append('room', selectedRoom);
      queryParams.append('bookingType', 'room');
    } else if (bookingType === 'event' && selectedEventSpace) {
      queryParams.append('event', selectedEventSpace);
      queryParams.append('bookingType', 'event');
    }
    if (startDate) {
      queryParams.append('startDate', startDate.toISOString());
    }
    if (endDate) {
      queryParams.append('endDate', endDate.toISOString());
    }
    navigate(`/booking?${queryParams.toString()}`);
  };
  const handleReset = () => {
    // Reset all selections
    setBookingType(null);
    setSelectedPackage("");
    setSelectedRoom("");
    setSelectedEventSpace("");
    setStartDate(null);
    setEndDate(null);
    setShowDateSelector(false);
  };
  const handleSelectionChange = (type: 'package' | 'room' | 'event', value: string) => {
    // Set booking type first
    setBookingType(type);

    // Then set the specific selection
    if (type === 'package') {
      setSelectedPackage(value);
      setShowDateSelector(!!value);
    } else if (type === 'room') {
      setSelectedRoom(value);
      setShowDateSelector(!!value);
    } else if (type === 'event') {
      setSelectedEventSpace(value);
      setShowDateSelector(!!value);
    }
  };

  // Determine if any option is selected to show reset button
  const hasSelection = !!bookingType;

  // Determine if form is valid for submission
  const isFormValid = hasSelection && startDate;
  return <div className="py-0 my-0">
      <div className="flex flex-wrap md:flex-nowrap items-end gap-3 md:gap-4">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-white-700 mb-1">
            Package
          </label>
          <Select value={selectedPackage} onValueChange={value => handleSelectionChange('package', value)} disabled={bookingType !== null && bookingType !== 'package'}>
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${bookingType !== null && bookingType !== 'package' ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <SelectValue placeholder="Select package" className="text-gray-100" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relaxation">Relaxation Retreat</SelectItem>
              <SelectItem value="detox">Detox & Revitalize</SelectItem>
              <SelectItem value="luxury">Luxury Wellness Escape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Room
          </label>
          <Select value={selectedRoom} onValueChange={value => handleSelectionChange('room', value)} disabled={bookingType !== null && bookingType !== 'room'}>
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${bookingType !== null && bookingType !== 'room' ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <SelectValue placeholder="Select room" className="text-gray-100" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Room</SelectItem>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Executive Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Event
          </label>
          <Select value={selectedEventSpace} onValueChange={value => handleSelectionChange('event', value)} disabled={bookingType !== null && bookingType !== 'event'}>
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${bookingType !== null && bookingType !== 'event' ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                <SelectValue placeholder="Select venue" className="text-gray-100" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="garden-pavilion">Garden Pavilion</SelectItem>
              <SelectItem value="grand-ballroom">Grand Ballroom</SelectItem>
              <SelectItem value="executive-hall">Executive Hall</SelectItem>
              <SelectItem value="rooftop-terrace">Rooftop Terrace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date
          </label>
          {showDateSelector ? <DateSelector showRange={bookingType === 'room'} startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} /> : <Button variant="outline" className="w-full flex justify-start items-center gap-2 bg-blue-900 text-white hover:bg-blue-800" onClick={() => setShowDateSelector(true)} disabled={!hasSelection}>
              <Calendar className="h-4 w-4" />
              <span>Select dates</span>
            </Button>}
        </div>

        <div className="w-full md:w-auto flex items-center gap-3">
          {hasSelection && <button onClick={handleReset} className="flex items-center text-xs text-gray-500 hover:text-hotel-primary">
              <RefreshCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </button>}
          
          <Button onClick={handleProceedToBooking} disabled={!isFormValid} className="w-full md:w-auto whitespace-nowrap text-white bg-orange-500 hover:bg-orange-400">
            Proceed to Booking
          </Button>
        </div>
      </div>
    </div>;
};
export default BookingBar;