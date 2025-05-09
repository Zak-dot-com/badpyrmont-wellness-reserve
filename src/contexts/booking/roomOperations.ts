
import { RoomAddOn } from "@/types/bookingTypes";

export const toggleRoomAddOn = (roomAddOns: RoomAddOn[], addOnId: string): RoomAddOn[] => {
  return roomAddOns.map(addon => {
    if (addon.id === addOnId) {
      return { ...addon, selected: !addon.selected };
    }
    return addon;
  });
};

export const removeRoomAddOn = (roomAddOns: RoomAddOn[], addOnId: string): RoomAddOn[] => {
  return roomAddOns.map(addon => {
    if (addon.id === addOnId) {
      return { ...addon, selected: false };
    }
    return addon;
  });
};
