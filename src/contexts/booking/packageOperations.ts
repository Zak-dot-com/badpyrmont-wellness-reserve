
import { BookingData, PackageType, RoomType } from "@/types/bookingTypes";

export const handleSelectPackage = (
  packageId: string, 
  getPackage: (id: string) => PackageType | null,
  getStandardRoom: () => RoomType | null,
  currentRoom: RoomType | null
) => {
  const selected = getPackage(packageId);
  
  if (selected && selected.includesStandardRoom) {
    const standardRoom = getStandardRoom();
    
    return {
      selectedPackage: selected,
      selectedRoom: currentRoom?.isStandard ? standardRoom : currentRoom
    };
  }
  
  return {
    selectedPackage: selected,
    selectedRoom: currentRoom
  };
};
