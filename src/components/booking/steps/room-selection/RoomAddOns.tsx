
import React from 'react';
import { 
  Wifi,
  CircleParking,
  CircleCheck,
  Bed
} from 'lucide-react';
import { RoomAddOn } from '@/types/bookingTypes';

type RoomAddOnsProps = {
  addOns: RoomAddOn[];
  onToggleAddOn: (addOnId: string) => void;
};

const RoomAddOns = ({ addOns, onToggleAddOn }: RoomAddOnsProps) => {
  const getIconForAddOn = (iconName: string) => {
    switch (iconName) {
      case 'wifi':
        return <Wifi className="h-6 w-6" />;
      case 'circle-parking':
        return <CircleParking className="h-6 w-6" />;
      case 'bed':
        return <Bed className="h-6 w-6" />;
      case 'circle-check':
        return <CircleCheck className="h-6 w-6" />;
      default:
        return <CircleCheck className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Room Add-ons</h3>
      <p className="text-gray-600 mb-6">Enhance your stay with these premium services</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {addOns.map((addon) => (
          <div 
            key={addon.id}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              addon.selected 
                ? 'bg-amber-50 border-amber-500' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onToggleAddOn(addon.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${
                addon.selected ? 'bg-amber-500 text-white' : 'bg-gray-100'
              }`}>
                {getIconForAddOn(addon.icon)}
              </div>
              <h4 className="font-medium mt-2">{addon.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{addon.price} €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAddOns;
