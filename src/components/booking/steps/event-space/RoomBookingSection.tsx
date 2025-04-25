
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableRooms } from '@/data/roomsData';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomBookingSectionProps {
  attendees: number;
  onRoomBookingChange: (booking: {
    enabled: boolean;
    numberOfRooms: number;
    roomType: string;
    nights: number;
    dates?: DateRange;
  }) => void;
  required?: boolean;
}

const RoomBookingSection = ({ attendees, onRoomBookingChange, required = false }: RoomBookingSectionProps) => {
  const recommendedRooms = Math.max(1, Math.round(attendees * 0.1));
  const [selectedRoomType, setSelectedRoomType] = useState(availableRooms[0].id);
  const [numberOfRooms, setNumberOfRooms] = useState(recommendedRooms);
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  });
  
  const calculateNights = () => {
    if (date?.from && date?.to) {
      const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const calculateSubtotal = () => {
    const selectedRoom = availableRooms.find(room => room.id === selectedRoomType);
    if (!selectedRoom) return 0;
    return selectedRoom.price * numberOfRooms * calculateNights();
  };

  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomType(roomType);
    onRoomBookingChange({
      enabled: true,
      numberOfRooms,
      roomType,
      nights: calculateNights(),
      dates: date
    });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      onRoomBookingChange({
        enabled: true,
        numberOfRooms,
        roomType: selectedRoomType,
        nights: calculateNights(),
        dates: range
      });
    }
  };

  const incrementRooms = () => {
    const newNumber = numberOfRooms + 1;
    setNumberOfRooms(newNumber);
    updateRoomBooking(newNumber);
  };

  const decrementRooms = () => {
    if (numberOfRooms > 1) {
      const newNumber = numberOfRooms - 1;
      setNumberOfRooms(newNumber);
      updateRoomBooking(newNumber);
    }
  };

  const updateRoomBooking = (rooms: number) => {
    onRoomBookingChange({
      enabled: true,
      numberOfRooms: rooms,
      roomType: selectedRoomType,
      nights: calculateNights(),
      dates: date
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label>Room Type</Label>
          <Select onValueChange={handleRoomTypeChange} defaultValue={availableRooms[0].id}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {availableRooms.map(room => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name} - €{room.price}/night
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Number of Rooms</Label>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={decrementRooms}
              disabled={numberOfRooms <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[2rem] text-center">
              {numberOfRooms}
            </span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={incrementRooms}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Stay Duration</Label>
          <DatePickerWithRange
            date={date}
            setDate={handleDateChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Recommended Rooms</Label>
          <div className="text-lg font-semibold text-amber-600">
            {recommendedRooms} {recommendedRooms === 1 ? 'room' : 'rooms'}
          </div>
          <p className="text-sm text-gray-500">Based on {attendees} attendees</p>
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-amber-800 font-medium">Room Booking Subtotal:</span>
            <span className="text-lg font-semibold text-amber-800">€{calculateSubtotal().toFixed(2)}</span>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            {numberOfRooms} {numberOfRooms === 1 ? 'room' : 'rooms'} × {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingSection;
