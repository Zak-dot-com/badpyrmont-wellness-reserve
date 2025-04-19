
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { availableRooms } from "@/data/roomsData";
import { Bed, Clock } from "lucide-react";

interface RoomBookingProps {
  attendees: number;
  onRoomBookingChange: (roomBooking: {
    enabled: boolean;
    numberOfRooms: number;
    roomType: string;
    nights: number;
  }) => void;
}

const RoomBookingSection = ({ attendees, onRoomBookingChange }: RoomBookingProps) => {
  const [bookRooms, setBookRooms] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [nights, setNights] = useState(1);

  useEffect(() => {
    // Calculate 10% of attendees rounded to nearest number
    const suggestedRooms = Math.round(attendees * 0.1);
    setNumberOfRooms(suggestedRooms);
  }, [attendees]);

  useEffect(() => {
    onRoomBookingChange({
      enabled: bookRooms,
      numberOfRooms,
      roomType: selectedRoomType,
      nights
    });
  }, [bookRooms, numberOfRooms, selectedRoomType, nights, onRoomBookingChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="bookRooms" 
          checked={bookRooms}
          onCheckedChange={(checked) => setBookRooms(checked as boolean)}
        />
        <label
          htmlFor="bookRooms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Book Rooms for this Event
        </label>
      </div>

      {bookRooms && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="numberOfRooms">Number of Rooms</Label>
                <div className="relative">
                  <Input
                    id="numberOfRooms"
                    type="number"
                    min="1"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                    className="pl-10"
                  />
                  <Bed className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Suggested rooms based on attendees: {Math.round(attendees * 0.1)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                  <SelectTrigger className="w-full pl-10">
                    <div className="relative w-full">
                      <Bed className="absolute left-0 top-0.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select room type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        <div className="flex justify-between w-full">
                          <span>{room.name}</span>
                          <span className="text-amber-600">€{room.price}/night</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nights">Number of Nights</Label>
                <Select value={nights.toString()} onValueChange={(value) => setNights(Number(value))}>
                  <SelectTrigger className="w-full pl-10">
                    <div className="relative w-full">
                      <Clock className="absolute left-0 top-0.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select number of nights" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} {n === 1 ? 'night' : 'nights'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomBookingSection;
