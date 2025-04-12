
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
    // We can pass selected values as query parameters if needed
    navigate('/booking');
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
    <div className={`bg-white rounded-md shadow-lg p-6 ${className}`}>
      <div className="flex justify-end mb-2">
        {hasSelection && (
          <button 
            onClick={handleReset}
            className="flex items-center text-sm text-gray-500 hover:text-hotel-primary"
          >
            <RefreshCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Your Wellness Package
          </label>
          <Select 
            value={selectedPackage} 
            onValueChange={(value) => handleSelectionChange('package', value)}
            disabled={selectedRoom !== "" || selectedEventSpace !== ""}
          >
            <SelectTrigger className={`w-full ${(selectedRoom !== "" || selectedEventSpace !== "") ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <SelectValue placeholder="e.g., Relaxation Retreat" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relaxation">Relaxation Retreat</SelectItem>
              <SelectItem value="detox">Detox & Revitalize</SelectItem>
              <SelectItem value="luxury">Luxury Wellness Escape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Your Room Type
          </label>
          <Select 
            value={selectedRoom} 
            onValueChange={(value) => handleSelectionChange('room', value)}
            disabled={selectedPackage !== "" || selectedEventSpace !== ""}
          >
            <SelectTrigger className={`w-full ${(selectedPackage !== "" || selectedEventSpace !== "") ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <SelectValue placeholder="e.g., Deluxe Room" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Room</SelectItem>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Executive Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Event Space
          </label>
          <Select 
            value={selectedEventSpace} 
            onValueChange={(value) => handleSelectionChange('event', value)}
            disabled={selectedPackage !== "" || selectedRoom !== ""}
          >
            <SelectTrigger className={`w-full ${(selectedPackage !== "" || selectedRoom !== "") ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                <SelectValue placeholder="e.g., Garden Pavilion" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="garden">Garden Pavilion</SelectItem>
              <SelectItem value="ballroom">Grand Ballroom</SelectItem>
              <SelectItem value="terrace">Rooftop Terrace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showDateSelector ? (
          <DateSelector 
            showRange={selectedRoom !== ""}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date / Range
            </label>
            <Button 
              variant="outline" 
              className="w-full flex justify-start items-center gap-2"
              onClick={() => setShowDateSelector(true)}
              disabled={!hasSelection}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-gray-500">Select dates</span>
            </Button>
          </div>
        )}
        
        <div className="col-span-1 lg:col-span-4 mt-4 flex justify-center">
          <Button 
            onClick={handleProceedToBooking}
            className="w-full md:w-auto whitespace-nowrap text-hotel-primary bg-hotel-gold hover:bg-hotel-gold/90"
          >
            Proceed to Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;
