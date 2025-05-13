
import { useBooking } from '@/contexts/BookingContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WellnessPackageDialog from "./WellnessPackageDialog";

// Newly created components
import RoomCard from './room-selection/RoomCard';
import GuestCounter from './room-selection/GuestCounter';
import RoomAddOns from './room-selection/RoomAddOns';
import NavigationButtons from './room-selection/NavigationButtons';
import RoomDetailDialog from './RoomDetailDialog';

type RoomSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
  isRoomBookingFlow?: boolean;
};

const RoomSelection = ({ isEditMode = false, onEditComplete, isRoomBookingFlow = false }: RoomSelectionProps) => {
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
  const [searchParams] = useSearchParams();

  const [guestCount, setGuestCount] = useState(1);
  const [wellnessDialogOpen, setWellnessDialogOpen] = useState(false);
  const [roomDetailDialogOpen, setRoomDetailDialogOpen] = useState(false);
  const [selectedRoomForDialog, setSelectedRoomForDialog] = useState<typeof availableRooms[0] | null>(null);

  // Effect to highlight the selected room when component mounts
  useEffect(() => {
    if (selectedRoom) {
      console.log(`RoomSelection: Selected room ID: ${selectedRoom.id}`);
      // If we have a selected room, scroll it into view if possible
      const roomElement = document.getElementById(`room-card-${selectedRoom.id}`);
      if (roomElement) {
        roomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      console.log('RoomSelection: No room selected');
    }
  }, [selectedRoom]);

  // Log room selection on mount
  useEffect(() => {
    console.log('RoomSelection: Component mounted', { selectedRoom, isRoomBookingFlow });
  }, []);

  const handleGuestChange = (value: number[]) => {
    setGuestCount(value[0]);
  };

  const roomImages = {
    'single-standard': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1470&auto=format&fit=crop',
    'deluxe-room': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop',
    'vip-suite': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop'
  };

  const openRoomDetails = (room: typeof availableRooms[0]) => {
    setSelectedRoomForDialog(room);
    setRoomDetailDialogOpen(true);
  };

  const handleRoomSelect = () => {
    if (selectedRoomForDialog) {
      selectRoom(selectedRoomForDialog.id);
      console.log(`RoomSelection: Selected room from dialog: ${selectedRoomForDialog.id}`);
    }
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

  const isRoomOnlyBooking = !selectedPackage;

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

          {isRoomOnlyBooking && !isRoomBookingFlow && (
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
            <RoomCard 
              key={room.id}
              room={room}
              isSelected={selectedRoom?.id === room.id}
              isIncluded={isIncluded}
              isUpgrade={isUpgrade}
              upgradePrice={upgradePrice}
              roomImages={roomImages}
              onRoomSelect={selectRoom}
              onViewDetails={openRoomDetails}
            />
          );
        })}
      </div>

      {selectedRoom && (
        <GuestCounter 
          guestCount={guestCount}
          onGuestCountChange={handleGuestChange}
        />
      )}

      <RoomAddOns 
        addOns={roomAddOns}
        onToggleAddOn={toggleRoomAddOn}
      />

      {!isRoomBookingFlow && (
        <NavigationButtons 
          isEditMode={isEditMode}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      )}

      {/* Room Detail Dialog - Fixed to properly handle notifications */}
      <RoomDetailDialog
        open={roomDetailDialogOpen}
        onOpenChange={setRoomDetailDialogOpen}
        room={selectedRoomForDialog}
        onSelectRoom={handleRoomSelect}
        isSelected={selectedRoom?.id === selectedRoomForDialog?.id}
      />
    </div>
  );
};

export default RoomSelection;
