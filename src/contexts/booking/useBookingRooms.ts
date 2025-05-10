
import { BookingType, BookingData, RoomAddOn } from "../../types/bookingTypes";

export function useBookingRooms() {
  const handleSelectRoom = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    setBookingType: (type: BookingType) => void,
    roomId: string, 
    roomSelector: Function
  ) => {
    setBookingType('room');
    
    const selected = roomSelector(roomId);
    setState(prev => ({
      ...prev,
      selectedRoom: selected
    }));
  };

  const resetRoom = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    bookingType: BookingType,
    setBookingType: (type: BookingType) => void
  ) => {
    setState(prev => ({
      ...prev,
      selectedRoom: null,
      roomAddOns: prev.roomAddOns.map(addon => ({ ...addon, selected: false }))
    }));
    
    // Only reset booking type if it's a room booking
    if (bookingType === 'room') {
      setBookingType(null);
    }
  };

  const handleToggleRoomAddOn = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    addOnId: string, 
    toggleRoomAddOn: (roomAddOns: RoomAddOn[], addOnId: string) => RoomAddOn[]
  ) => {
    setState(prev => {
      const updatedAddOns = toggleRoomAddOn(prev.roomAddOns, addOnId);
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  const handleRemoveRoomAddOn = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>, 
    addOnId: string, 
    removeRoomAddOn: (roomAddOns: RoomAddOn[], addOnId: string) => RoomAddOn[]
  ) => {
    setState(prev => {
      const updatedAddOns = removeRoomAddOn(prev.roomAddOns, addOnId);
      return { ...prev, roomAddOns: updatedAddOns };
    });
  };

  return {
    handleSelectRoom,
    resetRoom,
    handleToggleRoomAddOn,
    handleRemoveRoomAddOn
  };
}
