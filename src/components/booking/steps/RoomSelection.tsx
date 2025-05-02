
import { useBooking } from '@/contexts/BookingContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Bed, 
  BedDouble,
  CircleCheck,
  Wifi,
  CircleParking,
  BadgeDollarSign,
  ArrowUpCircle,
  Users,
  Sparkles,
  Star,
  Info
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import WellnessPackageDialog from "./WellnessPackageDialog";
import LearnMoreDialog from '@/components/dialogs/LearnMoreDialog';
import CancellationPolicy from '../CancellationPolicy';

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
    setCurrentStep,
    getRoomUpgradePrice,
    getStandardRoom
  } = useBooking();
  
  const { selectedPackage, selectedRoom, roomAddOns } = bookingData;
  const standardRoom = getStandardRoom();

  const [guestCount, setGuestCount] = useState(1);
  const [wellnessDialogOpen, setWellnessDialogOpen] = useState(false);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<string | null>(null);

  const handleGuestChange = (value: number[]) => {
    setGuestCount(value[0]);
  };

  const roomImages = {
    'single-standard': [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    'deluxe-room': [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800'
    ],
    'vip-suite': [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
    ]
  };

  const getRoomDetails = (roomId: string) => {
    const room = availableRooms.find(r => r.id === roomId);
    if (!room) return null;

    const amenities = [];
    if (room.type === 'single') {
      amenities.push('Single bed (90x200cm)');
      amenities.push('20m² room size');
      amenities.push('Mountain view');
      amenities.push('En-suite bathroom');
      amenities.push('Free WiFi');
    } else if (room.type === 'deluxe') {
      amenities.push('King-size bed (180x200cm)');
      amenities.push('35m² room size');
      amenities.push('Panoramic view');
      amenities.push('Luxury bathroom with bathtub');
      amenities.push('Free WiFi & minibar');
      amenities.push('Work desk');
    } else {
      amenities.push('Super king-size bed (200x200cm)');
      amenities.push('60m² room size');
      amenities.push('Separate living area');
      amenities.push('Premium bathroom with jacuzzi');
      amenities.push('Private balcony');
      amenities.push('Complimentary services');
    }

    const details = [
      { label: 'Room Type', value: room.type.charAt(0).toUpperCase() + room.type.slice(1) },
      { label: 'Maximum Occupancy', value: room.type === 'single' ? '1 Person' : '2 Persons' },
      { label: 'Price per Night', value: `€${room.price}` },
      { label: 'Room Size', value: room.type === 'single' ? '20m²' : room.type === 'deluxe' ? '35m²' : '60m²' },
      { label: 'Bed Type', value: room.type === 'single' ? 'Single Bed' : room.type === 'deluxe' ? 'King Size Bed' : 'Super King Size Bed' }
    ];
    
    const additionalContent = (
      <>
        <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
          Room Amenities
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        
        {selectedPackage && (
          <div className="mt-4">
            <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide mb-2">
              Package Inclusions
            </h3>
            <div className="border rounded-md p-3 bg-amber-50">
              <h4 className="font-medium">{selectedPackage.name}</h4>
              <p className="text-sm text-gray-600">{selectedPackage.description}</p>
              <div className="mt-2 text-amber-700 font-medium">€{selectedPackage.basePrice}/day</div>
            </div>
          </div>
        )}
      </>
    );

    return {
      details,
      additionalContent,
      images: roomImages[roomId as keyof typeof roomImages] || []
    };
  };

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

  const isRoomOnlyBooking = !selectedPackage;
  
  const selectedRoomDetails = selectedRoomForDetails ? getRoomDetails(selectedRoomForDetails) : null;

  return (
    <div className="space-y-8">
      {!isEditMode && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-black uppercase tracking-wide">Select Your Accommodation</h2>
            <p className="text-gray-600">
              {selectedPackage?.includesStandardRoom 
                ? "Your package includes a Standard Room. You can upgrade to a better room for an additional fee." 
                : "Choose the perfect room for your wellness retreat"}
            </p>
          </div>

          {isRoomOnlyBooking && (
            <>
              <Button 
                variant="outline"
                onClick={() => setWellnessDialogOpen(true)}
                className="flex items-center gap-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold transition px-4 py-2 border-[1.5px] rounded-lg"
              >
                <Star className="h-4 w-4 text-amber-500" />
                Add Wellness Package
              </Button>
              <WellnessPackageDialog open={wellnessDialogOpen} onOpenChange={setWellnessDialogOpen} />
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {availableRooms.map((room) => {
          const upgradePrice = getRoomUpgradePrice(room.id);
          const isIncluded = room.isStandard && selectedPackage?.includesStandardRoom;
          const isUpgrade = !room.isStandard && selectedPackage?.includesStandardRoom;
          
          return (
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
                    src={roomImages[room.id as keyof typeof roomImages]?.[0] || room.image}
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
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs border-amber-500 text-amber-700 hover:bg-amber-50 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoomForDetails(room.id);
                  }}
                >
                  <Info className="mr-1 h-3 w-3" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedRoom && (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Users className="h-5 w-5" />
            <span>Number of Guests</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Slider
              defaultValue={[1]}
              max={selectedRoom.type === 'single' ? 1 : 2}
              min={1}
              step={1}
              value={[guestCount]}
              onValueChange={handleGuestChange}
              className="w-[200px]"
            />
            <span className="text-sm text-gray-600">
              {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
            </span>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Room Add-ons</h3>
        <p className="text-gray-600 mb-6">Enhance your stay with these premium services</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roomAddOns.map((addon) => {
            const [showAddonDetails, setShowAddonDetails] = useState(false);
            
            return (
              <React.Fragment key={addon.id}>
                <div 
                  className={`relative p-4 border rounded-lg cursor-pointer transition ${
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
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddonDetails(true);
                    }}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <LearnMoreDialog
                  open={showAddonDetails}
                  onOpenChange={setShowAddonDetails}
                  title={addon.name}
                  description={addon.description}
                  images={[
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
                  ]}
                  details={[
                    { label: 'Price', value: `€${addon.price}` },
                    { label: 'Duration', value: 'Entire stay' }
                  ]}
                  type="addon"
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {!isEditMode && <CancellationPolicy showFull={true} />}

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
          className="bg-amber-800 hover:bg-amber-900"
          size="lg"
        >
          {isEditMode ? "Save Changes" : "Continue to Checkout"}
        </Button>
      </div>

      {/* Room Details Dialog */}
      {selectedRoomDetails && (
        <LearnMoreDialog
          open={!!selectedRoomForDetails}
          onOpenChange={() => setSelectedRoomForDetails(null)}
          title={availableRooms.find(r => r.id === selectedRoomForDetails)?.name || ''}
          description={availableRooms.find(r => r.id === selectedRoomForDetails)?.description || ''}
          images={selectedRoomDetails.images}
          details={selectedRoomDetails.details}
          additionalContent={selectedRoomDetails.additionalContent}
          type="room"
          badge={selectedRoomForDetails === 'vip-suite' ? 'PREMIUM' : undefined}
        />
      )}
    </div>
  );
};

export default RoomSelection;
