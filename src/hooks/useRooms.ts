
import { useCallback, useMemo } from "react";
import { RoomType, RoomAddOn } from "../types/bookingTypes";
import { availableRooms } from "../data/roomsData";

export function useRooms() {
  const getAvailableRooms = useMemo(() => availableRooms, []);
  
  const getStandardRoom = useCallback(() => {
    return availableRooms.find(room => room.isStandard) || null;
  }, []);

  const getRoomUpgradePrice = useCallback((roomId: string): number => {
    const standardRoom = getStandardRoom();
    const selectedRoom = availableRooms.find(r => r.id === roomId);
    
    if (!standardRoom || !selectedRoom || selectedRoom.isStandard) {
      return 0;
    }
    
    return selectedRoom.price - standardRoom.price;
  }, [getStandardRoom]);

  const selectRoom = useCallback((roomId: string): RoomType | null => {
    return availableRooms.find(r => r.id === roomId) || null;
  }, []);

  const toggleRoomAddOn = useCallback((roomAddOns: RoomAddOn[], addOnId: string): RoomAddOn[] => {
    return roomAddOns.map(addon => {
      if (addon.id === addOnId) {
        return { ...addon, selected: !addon.selected };
      }
      return addon;
    });
  }, []);

  const removeRoomAddOn = useCallback((roomAddOns: RoomAddOn[], addOnId: string): RoomAddOn[] => {
    return roomAddOns.map(addon => {
      if (addon.id === addOnId) {
        return { ...addon, selected: false };
      }
      return addon;
    });
  }, []);

  return {
    availableRooms: getAvailableRooms,
    getStandardRoom,
    getRoomUpgradePrice,
    selectRoom,
    toggleRoomAddOn,
    removeRoomAddOn
  };
}
