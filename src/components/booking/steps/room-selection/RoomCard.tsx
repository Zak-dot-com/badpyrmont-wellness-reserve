
import React from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';
import { 
  Bed, 
  BedDouble, 
  CircleCheck, 
  BadgeDollarSign, 
  ArrowUpCircle,
  Image
} from 'lucide-react';
import { RoomType } from "@/types/bookingTypes";

type RoomCardProps = {
  room: RoomType;
  isSelected: boolean;
  isIncluded: boolean;
  isUpgrade: boolean;
  upgradePrice: number;
  roomImages: Record<string, string>;
  onRoomSelect: (roomId: string) => void;
  onViewDetails: (room: RoomType) => void;
};

const RoomCard = ({
  room,
  isSelected,
  isIncluded,
  isUpgrade,
  upgradePrice,
  roomImages,
  onRoomSelect,
  onViewDetails
}: RoomCardProps) => {
  const handleRoomSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Room card clicked for room:", room.id);
    onRoomSelect(room.id);
  };

  return (
    <Card 
      key={room.id}
      id={`room-card-${room.id}`}
      className={`overflow-hidden cursor-pointer transition-all room-option ${
        isSelected ? 'ring-2 ring-amber-500' : 'hover:shadow-lg'
      }`}
      onClick={handleRoomSelect}
    >
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img
            src={roomImages[room.id as keyof typeof roomImages] || room.image}
            alt={room.name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div>
            <h3 className="text-white text-lg font-bold">{room.name}</h3>
            <p className="text-white/80 text-sm">{room.type === 'single' ? 'For 1 person' : room.type === 'deluxe' ? 'For 2 persons' : 'Luxury for 2'}</p>
          </div>
        </div>
        {isIncluded && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-500 text-white">Included in Package</Badge>
          </div>
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <CircleCheck className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-gray-700">{room.description}</p>
        <div className="mt-3 flex items-center space-x-2">
          {room.type === 'single' ? (
            <Bed className="h-5 w-5 text-gray-500" />
          ) : (
            <BedDouble className="h-5 w-5 text-gray-500" />
          )}
          <span className="text-sm text-gray-500">
            {room.type === 'single' ? 'Single Bed' : 'King Size Bed'}
          </span>
        </div>
        
        {isIncluded ? (
          <div className="mt-4 flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-green-500" />
            <p className="text-green-600 font-medium">Included with your package</p>
          </div>
        ) : isUpgrade ? (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-amber-600">
              <ArrowUpCircle className="h-5 w-5" />
              <p className="font-medium">Upgrade fee:</p>
            </div>
            <p className="mt-1 text-xl font-bold text-amber-600">
              +{upgradePrice} € <span className="text-sm text-gray-500">/ night</span>
            </p>
          </div>
        ) : (
          <p className="mt-4 text-xl font-bold text-amber-600">
            {room.price} € <span className="text-sm text-gray-500">/ night</span>
          </p>
        )}

        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white py-2 px-4 rounded-md shadow transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(room);
            }}
          >
            <Image className="h-4 w-4" />
            See Room Details
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
