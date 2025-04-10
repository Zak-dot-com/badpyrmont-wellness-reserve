
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Bed, 
  BedDouble,
  CircleCheck,
  Wifi,
  CircleParking,
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type RoomSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
};

const RoomSelection = ({ isEditMode = false, onEditComplete }: RoomSelectionProps) => {
  const { 
    bookingData, 
    availableRooms, 
    selectRoom, 
    toggleRoomAddOn, 
    setCurrentStep 
  } = useBooking();
  
  const { selectedRoom, roomAddOns } = bookingData;

  const handleContinue = () => {
    if (!selectedRoom) {
      toast.error("Please select a room type");
      return;
    }
    
    if (isEditMode && onEditComplete) {
      onEditComplete();
      toast.success("Room selection updated successfully");
    } else {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (isEditMode && onEditComplete) {
      onEditComplete();
    } else {
      setCurrentStep(2);
    }
  };

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
    <div className="space-y-8">
      {!isEditMode && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Select Your Accommodation</h2>
          <p className="text-gray-600">Choose the perfect room for your wellness retreat</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {availableRooms.map((room) => (
          <Card 
            key={room.id}
            className={`overflow-hidden cursor-pointer transition-all room-option ${
              selectedRoom?.id === room.id 
                ? 'ring-2 ring-amber-500' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => selectRoom(room.id)}
          >
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img
                  src={room.image}
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
              {selectedRoom?.id === room.id && (
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
              <p className="mt-4 text-xl font-bold text-amber-600">
                {room.price} € <span className="text-sm text-gray-500">/ night</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Room Add-ons</h3>
        <p className="text-gray-600 mb-6">Enhance your stay with these premium services</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roomAddOns.map((addon) => (
            <div 
              key={addon.id}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                addon.selected 
                  ? 'bg-amber-50 border-amber-500' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleRoomAddOn(addon.id)}
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

      <div className="flex justify-between pt-6">
        <Button 
          onClick={handleBack}
          variant="outline"
          size="lg"
        >
          {isEditMode ? "Cancel" : "Back"}
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-amber-500 hover:bg-amber-600"
          size="lg"
        >
          {isEditMode ? "Save Changes" : "Continue to Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default RoomSelection;
