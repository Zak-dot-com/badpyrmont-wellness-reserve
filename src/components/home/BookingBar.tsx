
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Package, Bed, CalendarCheck, RefreshCcw, Calendar } from 'lucide-react';
import DateSelector from './DateSelector';

type BookingBarProps = {
  className?: string;
};

const BookingBar = ({ className = "" }: BookingBarProps) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedEventSpace, setSelectedEventSpace] = useState("");
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleProceedToBooking = () => {
    const queryParams = new URLSearchParams();
    
    if (selectedPackage) {
      queryParams.append('package', selectedPackage);
    }
    if (selectedRoom) {
      queryParams.append('room', selectedRoom);
    }
    if (selectedEventSpace) {
      queryParams.append('event', selectedEventSpace);
      queryParams.append('bookingType', 'event');
    } else if (selectedRoom && !selectedPackage) {
      queryParams.append('bookingType', 'room');
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
    setSelectedPackage("");
    setSelectedRoom("");
    setSelectedEventSpace("");
    setStartDate(null);
    setEndDate(null);
    setShowDateSelector(false);
  };

  // When any selection changes, update the date selector visibility
  const handleSelectionChange = (type: 'package' | 'room' | 'event', value: string) => {
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
  const hasSelection = selectedPackage || selectedRoom || selectedEventSpace;

  return (
    <div className={`bg-white rounded-md shadow-lg p-4 ${className}`}>
      <div className="flex flex-wrap md:flex-nowrap items-end gap-3 md:gap-4">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Wellness Package
          </label>
          <Select 
            value={selectedPackage} 
            onValueChange={(value) => handleSelectionChange('package', value)}
            disabled={selectedRoom !== "" || selectedEventSpace !== ""}
          >
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${(selectedRoom !== "" || selectedEventSpace !== "") ? "opacity-50" : ""}`}>
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
            Room Type
          </label>
          <Select 
            value={selectedRoom} 
            onValueChange={(value) => handleSelectionChange('room', value)}
            disabled={selectedPackage !== "" || selectedEventSpace !== ""}
          >
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${(selectedPackage !== "" || selectedEventSpace !== "") ? "opacity-50" : ""}`}>
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
            Event Space
          </label>
          <Select 
            value={selectedEventSpace} 
            onValueChange={(value) => handleSelectionChange('event', value)}
            disabled={selectedPackage !== "" || selectedRoom !== ""}
          >
            <SelectTrigger className={`w-full bg-blue-900 text-white hover:bg-blue-800 ${(selectedPackage !== "" || selectedRoom !== "") ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                <SelectValue placeholder="Select venue" className="text-gray-100" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="garden">Garden Pavilion</SelectItem>
              <SelectItem value="ballroom">Grand Ballroom</SelectItem>
              <SelectItem value="terrace">Rooftop Terrace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date / Range
          </label>
          {showDateSelector ? (
            <DateSelector 
              showRange={selectedRoom !== ""}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          ) : (
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center gap-2 bg-blue-900 text-white hover:bg-blue-800"
              onClick={() => setShowDateSelector(true)}
              disabled={!hasSelection}
            >
              <Calendar className="h-4 w-4" />
              <span>Select dates</span>
            </Button>
          )}
        </div>

        <div className="w-full md:w-auto flex items-center gap-3">
          {hasSelection && (
            <button 
              onClick={handleReset}
              className="flex items-center text-xs text-gray-500 hover:text-hotel-primary"
            >
              <RefreshCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </button>
          )}
          
          <Button 
            onClick={handleProceedToBooking}
            className="w-full md:w-auto whitespace-nowrap text-white bg-amber-800 hover:bg-amber-900"
            disabled={!hasSelection || !startDate}
          >
            Proceed to Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;
