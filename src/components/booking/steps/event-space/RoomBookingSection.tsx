
import { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableRooms } from '@/data/roomsData';

interface RoomBookingSectionProps {
  attendees: number;
  onRoomBookingChange: (booking: {
    enabled: boolean;
    numberOfRooms: number;
    roomType: string;
    nights: number;
  }) => void;
  required?: boolean;
}

const RoomBookingSection = ({ attendees, onRoomBookingChange, required = false }: RoomBookingSectionProps) => {
  const recommendedRooms = Math.max(1, Math.round(attendees * 0.1));
  
  useEffect(() => {
    // If required, automatically set initial values
    if (required) {
      onRoomBookingChange({
        enabled: true,
        numberOfRooms: recommendedRooms,
        roomType: availableRooms[0].id,
        nights: 1
      });
    }
  }, [required, recommendedRooms, onRoomBookingChange]);

  const handleRoomTypeChange = (roomType: string) => {
    onRoomBookingChange({
      enabled: true,
      numberOfRooms: recommendedRooms,
      roomType,
      nights: 1
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label>Recommended Rooms</Label>
          <div className="text-lg font-semibold text-amber-600">
            {recommendedRooms} {recommendedRooms === 1 ? 'room' : 'rooms'}
          </div>
          <p className="text-sm text-gray-500">Based on {attendees} attendees</p>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingSection;
