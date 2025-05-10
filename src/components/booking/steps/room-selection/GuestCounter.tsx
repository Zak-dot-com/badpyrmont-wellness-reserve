
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Users } from 'lucide-react';

type GuestCounterProps = {
  guestCount: number;
  onGuestCountChange: (value: number[]) => void;
};

const GuestCounter = ({ guestCount, onGuestCountChange }: GuestCounterProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Users className="h-5 w-5" />
        <span>Number of Guests</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Slider
          defaultValue={[guestCount]}
          max={4}
          min={1}
          step={1}
          value={[guestCount]}
          onValueChange={onGuestCountChange}
          className="w-[200px]"
        />
        <span className="text-sm text-gray-600">
          {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
        </span>
      </div>
    </div>
  );
};

export default GuestCounter;
